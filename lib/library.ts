import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostData {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  lang?: string;
  contentHtml: string;
}

function getDirectory(folder: string): string {
  return path.join(process.cwd(), 'content', 'library', folder);
}

export function getSortedPostsData(folder: string): Omit<PostData, 'contentHtml'>[] {
  const postsDirectory = getDirectory(folder);
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { title: string; description: string; category: string; date: string; image: string; lang?: string }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(folder: string) {
  const postsDirectory = getDirectory(folder);
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') },
  }));
}

export async function getPostData(folder: string, slug: string): Promise<PostData | null> {
  const fullPath = path.join(getDirectory(folder), `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; description: string; category: string; date: string; image: string; lang?: string }),
  };
}
