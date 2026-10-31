import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// ビルド時に静的XMLとして生成（Workers CPU消費 0ms）
export const dynamic = 'force-static';

const BASE_URL = 'https://innbuddy-japan.com';

/**
 * appディレクトリ内を再帰的に探索し、
 * VSCで作成された通常ページのパスを自動抽出する関数
 */
function getAppRoutes(dir: string, baseRoute = ''): string[] {
  let routes: string[] = [];

  if (!fs.existsSync(dir)) return routes;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    // 除外対象：api、プライベートフォルダ(_)、特殊フォルダ
    if (
      entry.name.startsWith('_') ||
      entry.name.startsWith('.') ||
      entry.name === 'api'
    ) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 動的ルーティング [slug] などは個別取得するためスキップ
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        continue;
      }

      // ルートグループ (group) はURLパスに含めない
      const routeSegment = entry.name.startsWith('(') && entry.name.endsWith(')')
        ? ''
        : `/${entry.name}`;

      routes = routes.concat(getAppRoutes(fullPath, `${baseRoute}${routeSegment}`));
    } else if (
      entry.isFile() &&
      (entry.name === 'page.tsx' || entry.name === 'page.jsx' || entry.name === 'page.js')
    ) {
      // 404ページなど除外したいものはスキップ
      if (baseRoute !== '/_not-found') {
        routes.push(baseRoute === '' ? '/' : baseRoute);
      }
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const appDirectory = path.join(process.cwd(), 'app');

  // 1. VSC で作成された既存・新規の全固定ページを自動検出
  const autoDetectedPaths = getAppRoutes(appDirectory);
  const staticRoutes: MetadataRoute.Sitemap = autoDetectedPaths.map((routePath) => ({
    url: `${BASE_URL}${routePath === '/' ? '' : routePath}`,
    lastModified: now,
    changeFrequency: routePath === '/' ? 'daily' : 'weekly',
    priority: routePath === '/' ? 1.0 : 0.8,
  }));

  // 2. サステナブル記事（001〜500件）
  const sustainableRoutes: MetadataRoute.Sitemap = Array.from({ length: 500 }, (_, i) => {
    const id = String(i + 1).padStart(3, '0');
    return {
      url: `${BASE_URL}/sustainable/articles/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  // 3. 将来 microCMS などから動的取得する記事一覧があればここに合体
  // const microCmsRoutes: MetadataRoute.Sitemap = ...

  return [
    ...staticRoutes,
    ...sustainableRoutes,
  ];
}