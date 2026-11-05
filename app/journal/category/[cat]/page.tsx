import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/journal/articles";
import "../../style.css";

const getVal = (obj: any, lang: 'ja' | 'en' | 'zh') => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.ja || "";
};

const categoryMap: Record<string, { ja: string; en: string; zh: string; label: string; desc_ja: string; desc_en: string; desc_zh: string; }> = {
  web: {
    ja: "WEB集客", en: "WEB Acquisition", zh: "网络获客", label: "CATEGORY 01",
    desc_ja: "Booking.com / Agoda / 自社直予約で選ばれるためのマーケティングと導線設計",
    desc_en: "Marketing and pathway design to be chosen on Booking.com / Agoda / Direct Booking",
    desc_zh: "在 Booking.com / Agoda / 直接预订中脱颖而出的营销与路径设计",
  },
  operation: {
    ja: "ホテル運営", en: "Hotel Operations", zh: "酒店运营", label: "CATEGORY 02",
    desc_ja: "現場のオペレーション標準化、清掃、アップセル、サービスリカバリーの実践知",
    desc_en: "Practical knowledge of on-site operation standardization, cleaning, upselling, and service recovery",
    desc_zh: "现场运营标准化、清洁、追加销售和服务恢复的实践知识",
  },
  branding: {
    ja: "ブランディング", en: "Branding", zh: "品牌塑造", label: "CATEGORY 03",
    desc_ja: "価格競争から抜け出し、宿の世界観と「呼ばれたい名前」で選ばれるための設計",
    desc_en: "Design to escape price competition and be chosen by the accommodation's worldview",
    desc_zh: "摆脱价格竞争，以住宿的世界观和品牌脱颖而出的设计",
  },
  experience: {
    ja: "体験設計", en: "Experience Design", zh: "体验设计", label: "CATEGORY 04",
    desc_ja: "地域の魅力と五感を活かした宿泊体験づくり",
    desc_en: "Creating accommodation experiences leveraging local charm and the five senses",
    desc_zh: "利用当地魅力和五感打造住宿体验",
  },
  revenue: {
    ja: "収益改善", en: "Revenue Growth", zh: "收益增长", label: "CATEGORY 05",
    desc_ja: "ADR・稼働率・RevPARを最大化するプライシングと収益管理",
    desc_en: "Pricing and revenue management to maximize ADR, occupancy, and RevPAR",
    desc_zh: "最大化 ADR、入住率和 RevPAR 的定价与收益管理",
  },
  fnb: {
    ja: "フード＆ベバレッジ", en: "Food & Beverage", zh: "餐饮", label: "CATEGORY 06",
    desc_ja: "朝食・レストラン・カフェによる付帯収益と体験価値の向上",
    desc_en: "Enhancing ancillary revenue and experience value through breakfast, restaurants, and cafes",
    desc_zh: "通过早餐、餐厅和咖啡馆提升附加收益和体验价值",
  },
  sustainability: {
    ja: "サステナブル", en: "Sustainability", zh: "可持续发展", label: "CATEGORY 07",
    desc_ja: "省エネ・食品ロス削減・地域共生による持続可能な宿運営",
    desc_en: "Sustainable operations through energy saving, food loss reduction, and community coexistence",
    desc_zh: "通过节能、减少食物浪费和社区共生实现可持续运营",
  },
  talent: {
    ja: "人材・採用", en: "Talent & Hiring", zh: "人才与招聘", label: "CATEGORY 08",
    desc_ja: "スタッフ定着・採用広報・多文化共生の組織づくり",
    desc_en: "Staff retention, recruitment PR, and building a multicultural organization",
    desc_zh: "员工留存、招聘公关和建立多元文化组织",
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

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const info = categoryMap[cat.toLowerCase()];
  if (!info) return {};
  return {
    title: `${info.ja} 記事一覧 | InnBuddy JOURNAL`,
    description: info.desc_ja,
  };
}

export default async function CategoryPage({ params }: any) {
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
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          try {
            var params = new URLSearchParams(window.location.search);
            var lang = params.get('lang');
            if (!lang) {
              lang = localStorage.getItem('journal_lang') || 'ja';
              var newUrl = new URL(window.location.href);
              newUrl.searchParams.set('lang', lang);
              window.history.replaceState({}, '', newUrl);
            } else {
              localStorage.setItem('journal_lang', lang);
            }
            document.documentElement.setAttribute('data-lang', lang);
          } catch(e) {}
        })();
      `}} />
      <style dangerouslySetInnerHTML={{ __html: `
        html:not([data-lang]) .en-only, html:not([data-lang]) .zh-only { display: none !important; }
        html[data-lang="ja"] .en-only, html[data-lang="ja"] .zh-only { display: none !important; }
        html[data-lang="en"] .ja-only, html[data-lang="en"] .zh-only { display: none !important; }
        html[data-lang="zh"] .ja-only, html[data-lang="zh"] .en-only { display: none !important; }
        
        .lang a { text-decoration: none; display: inline-block; }
        html[data-lang="ja"] .lang-ja, html[data-lang="en"] .lang-en, html[data-lang="zh"] .lang-zh {
          background-color: #1a1a1a !important; color: #fff !important; border-color: #1a1a1a !important; opacity: 1 !important;
        }

        /* スリム＆シンプルな黄色フッター */
        footer {
          background-color: #FFF04B !important;
          color: #1a1a1a !important;
          padding: 24px 20px 20px !important;
          text-align: center !important;
        }
        footer .f1 {
          font-size: 16px !important;
          font-weight: 800 !important;
          margin-bottom: 4px !important;
          color: #1a1a1a !important;
        }
        footer .f2 {
          font-size: 11px !important;
          color: rgba(26, 26, 26, 0.75) !important;
          margin-bottom: 12px !important;
        }
        .f-nav {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 6px 20px !important;
          margin: 0 0 12px !important;
        }
        .journal-clean-link {
          color: #1a1a1a !important;
          background: transparent !important;
          border: none !important;
          padding: 2px 6px !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          text-decoration: none !important;
          display: inline-block !important;
          transition: transform 0.2s ease, opacity 0.2s ease !important;
        }
        .journal-clean-link:hover {
          transform: translateY(-2px) !important;
          opacity: 0.6 !important;
        }
        footer .f3 {
          font-size: 11px !important;
          font-weight: 600 !important;
          margin: 0 0 4px !important;
          color: #1a1a1a !important;
        }
        footer .f4 {
          font-size: 10px !important;
          color: rgba(26, 26, 26, 0.55) !important;
          margin: 0 !important;
          line-height: 1.4 !important;
        }
      `}} />

      <header className="article-headbar container">
        <Link className="logo serif" href="/journal">
          InnBuddy <span className="logo-pill">JOURNAL</span>
        </Link>
        <div className="head-right">
          <Link className="back" href="/journal">
            TOPに戻る
          </Link>
          <div className="lang">
            <a href="?lang=ja"><button type="button" className="lang-ja" style={{ pointerEvents: 'none' }}>日本語</button></a>
            <a href="?lang=en"><button type="button" className="lang-en" style={{ pointerEvents: 'none' }}>EN</button></a>
            <a href="?lang=zh"><button type="button" className="lang-zh" style={{ pointerEvents: 'none' }}>中文</button></a>
          </div>
        </div>
      </header>
      
      <main className="container category-main">
        <div className="category-intro">
          <div className="category-meta-label">
            {info.label} | {info.en.toUpperCase()}
          </div>
          <h1 className="serif category-heading">
            <span className="ja-only">{info.ja}</span>
            <span className="en-only">{info.en}</span>
            <span className="zh-only">{info.zh}</span>
          </h1>
          <p className="category-desc">
            <span className="ja-only">{info.desc_ja}</span>
            <span className="en-only">{info.desc_en}</span>
            <span className="zh-only">{info.desc_zh}</span>
          </p>
          <div className="category-count">
            全{filteredArticles.length}件の記事
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
                    alt={getVal(article.title, 'ja')}
                    loading="lazy"
                  />
                </div>
                <div className="date">
                  {date?.replace(/-/g, ".")}
                </div>
                <h4>
                  <span className="ja-only">{getVal(article.title, 'ja')}</span>
                  <span className="en-only">{getVal(article.title, 'en')}</span>
                  <span className="zh-only">{getVal(article.title, 'zh')}</span>
                </h4>
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
        <div className="f2">WEB × OPERATION × BRANDING - ホテル運営の知恵を、もっと身近に。</div>
        
        <div className="f-nav">
          <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">InnBuddyとは</span>
            <span className="en-only">About InnBuddy</span>
            <span className="zh-only">关于InnBuddy</span>
          </a>
          <a href="https://innbuddy-japan.com/team/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">運営組織</span>
            <span className="en-only">Our Team</span>
            <span className="zh-only">运营组织</span>
          </a>
          <a href="https://innbuddy-japan.com/library/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">メディア一覧</span>
            <span className="en-only">Media List</span>
            <span className="zh-only">媒体一览</span>
          </a>
          <a href="https://innbuddy-japan.com/contact/" target="_blank" rel="noopener noreferrer" className="journal-clean-link">
            <span className="ja-only">お問い合わせ</span>
            <span className="en-only">Contact</span>
            <span className="zh-only">联系我们</span>
          </a>
        </div>

        <div className="f3">© 2026 InnBuddy</div>
        <div className="f4">記事内の数値は一般的な情報に基づく参考値・一例であり、InnBuddyの実績を示すものではありません。</div>
      </footer>
    </div>
  );
}