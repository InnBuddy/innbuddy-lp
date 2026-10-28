import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/journal/articles";
import "../../style.css";

const categoryMap: Record<
  string,
  { ja: string; en: string; label: string; desc: string }
> = {
  web: {
    ja: "WEB集客",
    en: "WEB Acquisition",
    label: "CATEGORY 01",
    desc: "Booking.com / Agoda / 自社直予約で選ばれるためのマーケティングと導線設計",
  },
  operation: {
    ja: "ホテル運営",
    en: "Hotel Operations",
    label: "CATEGORY 02",
    desc: "現場のオペレーション標準化、清掃、アップセル、サービスリカバリーの実践知",
  },
  branding: {
    ja: "ブランディング",
    en: "Branding",
    label: "CATEGORY 03",
    desc: "価格競争から抜け出し、宿の世界観と「呼ばれたい名前」で選ばれるための設計",
  },
  experience: {
    ja: "体験設計",
    en: "Experience Design",
    label: "CATEGORY 04",
    desc: "地域の魅力と五感を活かした宿泊体験づくり",
  },
  revenue: {
    ja: "収益改善",
    en: "Revenue Growth",
    label: "CATEGORY 05",
    desc: "ADR・稼働率・RevPARを最大化するプライシングと収益管理",
  },
  fnb: {
    ja: "フード＆ベバレッジ",
    en: "Food & Beverage",
    label: "CATEGORY 06",
    desc: "朝食・レストラン・カフェによる付帯収益と体験価値の向上",
  },
  sustainability: {
    ja: "サステナブル",
    en: "Sustainability",
    label: "CATEGORY 07",
    desc: "省エネ・食品ロス削減・地域共生による持続可能な宿運営",
  },
  talent: {
    ja: "人材・採用",
    en: "Talent & Hiring",
    label: "CATEGORY 08",
    desc: "スタッフ定着・採用広報・多文化共生の組織づくり",
  },
};

const img = (name: string) => {
  if (!name) return "";
  const filename = name.split("/").pop() || name;
  return `/library/journal/${filename}`;
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((cat) => ({ cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const info = categoryMap[cat.toLowerCase()];
  if (!info) return {};
  return {
    title: `${info.ja} 記事一覧 | InnBuddy JOURNAL`,
    description: info.desc,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const catKey = cat.toLowerCase();
  const info = categoryMap[catKey];

  if (!info) {
    notFound();
  }

  const allArticles = typeof getArticles === "function" ? getArticles() : [];

  const filteredArticles = allArticles.filter((a: any) => {
    const itemCat = a.meta?.cat || a.cat || a.category;
    const itemCatEn = a.meta?.catEn || a.catEn;
    return (
      itemCat === info.ja ||
      itemCatEn?.toLowerCase() === info.en.toLowerCase()
    );
  });

  return (
    <div id="articleView">
      <header className="article-headbar container">
        <Link className="logo serif" href="/journal">
          InnBuddy <span className="logo-pill">JOURNAL</span>
        </Link>
        <div className="head-right">
          <Link className="back" href="/journal">
            ← TOPに戻る
          </Link>
          <div className="lang">
            <button className="on" type="button">日本語</button>
            <button type="button">EN</button>
            <button type="button">中文</button>
          </div>
        </div>
      </header>

      <main className="container category-main">
        <div className="category-intro">
          <div className="category-meta-label">
            {info.label} — {info.en.toUpperCase()}
          </div>
          <h1 className="serif category-heading">
            {info.ja}
          </h1>
          <p className="category-desc">
            {info.desc}
          </p>
          <div className="category-count">
            全 {filteredArticles.length} 件の記事
          </div>
        </div>

        <div className="category-grid">
          {filteredArticles.map((article: any) => {
            const rawImg =
              article.meta?.image ||
              article.image ||
              article.imageThumb ||
              article.meta?.imageThumb ||
              "";
            const title =
              typeof article.title === "string"
                ? article.title
                : article.title?.ja;
            const date = article.meta?.date || article.date;

            return (
              <Link
                key={article.slug}
                className="n-card category-card"
                href={`/journal/articles/${article.slug}`}
              >
                <div className="thumb">
                  <img
                    src={img(rawImg)}
                    alt={title || ""}
                    loading="lazy"
                  />
                </div>
                <div className="date">
                  {date?.replace(/-/g, ".")}
                </div>
                <h4>{title}</h4>
              </Link>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="empty-message">
            記事が見つかりませんでした。
          </div>
        )}
      </main>

      <footer>
        <div className="f1">InnBuddy</div>
        <div className="f2">WEB × OPERATION × BRANDING — ホテル運営の知恵を、もっと身近に。</div>
        <div className="f3">© 2026 InnBuddy</div>
        <div className="f4">
          記事内の数値は一般的な情報に基づく参考値・一例であり、InnBuddyの実績を示すものではありません。
        </div>
      </footer>
    </div>
  );
}