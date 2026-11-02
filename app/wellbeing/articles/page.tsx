'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import articlesData from '@/data/wellbeingarticles.json';

interface Article {
  filename: string;
  base_id: string;
  no: string;
  id: string;
  title: string;
  category: string;
  subcategory: string;
  type: string;
  intent: string;
  reader: string;
  wb_theme: string;
  mg_theme: string;
  html: string;
}

export default function ArticlesIndexPage() {
  const articles = articlesData as Article[];
  
  // 大分類（category）でグループ化
  const groupedByCategory = useMemo(() => {
    return articles.reduce((acc, article) => {
      const cat = article.category || 'その他';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(article);
      return acc;
    }, {} as Record<string, Article[]>);
  }, [articles]);
  
  const categories = Object.keys(groupedByCategory);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  // URLのクエリパラメータ(?cat=...)で指定されたカテゴリーを初期選択
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('cat');
      if (catParam && categories.includes(catParam)) {
        setActiveCategory(catParam);
      }
    }
  }, [categories]);

  // 選択中の大カテゴリに属するサブカテゴリ一覧を抽出
  const currentSubcategories = useMemo(() => {
    const currentArticles = groupedByCategory[activeCategory] || [];
    const subs = new Set(currentArticles.map((a) => a.subcategory).filter(Boolean));
    return Array.from(subs);
  }, [activeCategory, groupedByCategory]);

  // 表示する記事をフィルタリング
  const displayedArticles = useMemo(() => {
    const baseArticles = groupedByCategory[activeCategory] || [];
    if (activeSubcategory) {
      return baseArticles.filter((a) => a.subcategory === activeSubcategory);
    }
    return baseArticles;
  }, [activeCategory, activeSubcategory, groupedByCategory]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubcategory(null);
  };

  return (
    <div className="bg-[#f4f5f4] min-h-screen text-[#1a231c] font-sans flex flex-col">
      {/* #C7DC68 アクセントヘッダー */}
      <header className="bg-[#C7DC68] sticky top-0 z-50 shadow-sm border-b border-[#3a5a40]/15 py-3.5 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/wellbeing" 
              className="text-xs md:text-sm font-bold text-[#1a231c] hover:text-[#3a5a40] flex items-center gap-1.5 transition-colors bg-white/70 hover:bg-white px-3 py-1.5 rounded-full shadow-sm"
            >
              <span>←</span> LPトップへ戻る
            </Link>
            <span className="hidden sm:inline-block text-[#1a231c]/20 font-light">|</span>
            <Link href="/wellbeing" className="hidden sm:inline-block text-base font-bold text-[#1a231c] tracking-tight">
              InnBuddy <span className="font-light opacity-80">Well-being</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#1a231c] bg-white/80 px-3 py-1 rounded-full shadow-sm border border-[#1a231c]/10">
              ナレッジハブ ({articles.length}記事)
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-8 md:pt-12 pb-24 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#3a5a40] tracking-tight mb-3">
              ナレッジハブ <span className="text-2xl text-gray-400 font-normal">({articles.length}記事)</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              組織づくりや採用のヒントを、カテゴリ別にお探しいただけます。
            </p>
          </div>

          {/* カテゴリー選択コンソール（6列×2行） */}
          <div className="bg-white rounded-3xl p-5 md:p-7 border border-gray-200/80 shadow-sm mb-10">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
              カテゴリーを選択（全12カテゴリー）
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {categories.map((cat: string) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-3 text-xs font-bold rounded-2xl transition-all duration-200 flex flex-col justify-between items-start text-left border ${
                      isActive
                        ? 'bg-[#3a5a40] text-white shadow-md border-[#3a5a40] scale-[1.02]'
                        : 'bg-gray-50 text-gray-700 hover:bg-[#e8eedd] hover:text-[#3a5a40] border-gray-200/70'
                    }`}
                  >
                    <span className="line-clamp-2 leading-snug mb-2">{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200/80 text-gray-600'
                    }`}>
                      {groupedByCategory[cat].length}件
                    </span>
                  </button>
                );
              })}
            </div>

            {/* サブカテゴリのロール絞り込み */}
            {currentSubcategories.length > 0 && (
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[11px] font-bold text-gray-400 shrink-0 mr-1">絞り込み:</span>
                <button
                  onClick={() => setActiveSubcategory(null)}
                  className={`whitespace-nowrap px-3.5 py-1 text-xs font-bold rounded-full transition-all shrink-0 ${
                    activeSubcategory === null
                      ? 'bg-[#e8eedd] text-[#3a5a40] border border-[#3a5a40]/30 font-bold'
                      : 'bg-transparent text-gray-500 border border-gray-200 hover:border-[#3a5a40]/30 hover:text-[#3a5a40]'
                  }`}
                >
                  すべて
                </button>
                {currentSubcategories.map((sub: string) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcategory(sub)}
                    className={`whitespace-nowrap px-3.5 py-1 text-xs font-bold rounded-full transition-all shrink-0 ${
                      activeSubcategory === sub
                        ? 'bg-[#e8eedd] text-[#3a5a40] border border-[#3a5a40]/30 font-bold'
                        : 'bg-transparent text-gray-500 border border-gray-200 hover:border-[#3a5a40]/30 hover:text-[#3a5a40]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 記事一覧グリッド（カーソルを合わせた際に #C7DC68 に変化） */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedArticles.map((article: Article) => (
              <Link
                key={article.base_id}
                href={`/wellbeing/articles/${article.base_id}`}
                className="flex flex-col p-6 bg-white rounded-2xl border-2 border-gray-200/80 hover:border-[#C7DC68] hover:bg-[#C7DC68]/5 hover:shadow-xl hover:shadow-[#C7DC68]/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-[#3a5a40] bg-[#e8eedd] group-hover:bg-[#C7DC68] group-hover:text-[#1a231c] px-2.5 py-1 rounded transition-colors duration-200">
                    {article.no}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">{article.subcategory}</span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#1a231c] leading-relaxed group-hover:text-[#2d4632] transition-colors flex-grow mb-4">
                  {article.title}
                </h3>
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-100 group-hover:border-[#C7DC68]/30 transition-colors">
                  <span className="text-[9px] font-medium text-gray-500 border border-gray-200 px-2 py-1 rounded-full flex items-center gap-1 bg-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a5a40]/40 group-hover:bg-[#C7DC68] transition-colors"></span>
                    {article.wb_theme}
                  </span>
                  <span className="text-[9px] font-medium text-gray-500 border border-gray-200 px-2 py-1 rounded-full flex items-center gap-1 bg-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a5a40]/40 group-hover:bg-[#C7DC68] transition-colors"></span>
                    {article.mg_theme}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* フッター (LPと共通) */}
      <footer className="bg-[#3a5a40] text-white pt-16 pb-14 px-6 relative mt-auto overflow-hidden">
        <div className="absolute right-[-40px] md:right-8 bottom-[-20px] w-[340px] md:w-[480px] h-[300px] md:h-[400px] pointer-events-none opacity-15 select-none z-0">
          <svg viewBox="0 0 400 320" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M200 320 V110" />
            <path d="M200 110 L160 70 M200 110 L240 70" />
            <path d="M200 150 L150 110 M200 150 L250 110" />
            <path d="M200 190 L140 150 M200 190 L260 150" />
            <path d="M200 230 L130 190 M200 230 L270 190" />
            <path d="M200 70 L200 40 M200 40 L180 20 M200 40 L220 20" />
            <path d="M90 320 V150" />
            <path d="M90 150 L60 120 M90 150 L120 120" />
            <path d="M90 190 L50 160 M90 190 L130 160" />
            <path d="M90 230 L45 200 M90 230 L135 200" />
            <path d="M310 320 V140" />
            <path d="M310 140 L280 110 M310 140 L340 110" />
            <path d="M310 180 L270 150 M310 180 L350 150" />
            <path d="M310 220 L265 190 M310 220 L355 190" />
            <path d="M10 320 C100 300, 250 310, 390 320" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/wellbeing#top" className="text-2xl font-bold text-[#f4f1de] flex items-center gap-2 mb-4">
                <span>InnBuddy <span className="font-light opacity-80">Well-being</span></span>
              </Link>
              <p className="text-xs sm:text-sm text-gray-200 max-w-sm mb-6 font-medium leading-relaxed">
                宿泊業界の未来を創る、HRと組織づくりのための専門メディア。スタッフの充足感が、最高のサービスを生み出します。
              </p>
            </div>
            <div className="pt-2 text-[10px] sm:text-xs text-white/50 font-medium">
              &copy; 2026 InnBuddy Well-being. All rights reserved.
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-semibold">
            <div>
              <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider border-b border-[#f4f1de]/30 pb-2 inline-block">MENU</h4>
              <ul className="space-y-3 font-medium text-gray-200">
                <li><a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">InnBuddyとは</a></li>
                <li><a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">運営チーム</a></li>
                <li><a href="https://innbuddy-japan.com/library" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">他のメディアも見る</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider border-b border-[#f4f1de]/30 pb-2 inline-block">SUPPORT</h4>
              <ul className="space-y-3 font-medium text-gray-200">
                <li><a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h4 className="font-bold text-[#f4f1de] mb-4 uppercase tracking-wider border-b border-[#f4f1de]/30 pb-2 inline-block">AUDIT</h4>
              <Link
                href="/wellbeing#top"
                className="inline-block bg-[#f4f1de] text-[#3a5a40] border-2 border-[#f4f1de] hover:bg-[#3a5a40] hover:text-[#f4f1de] px-6 py-2.5 rounded-full font-bold transition-all text-xs shadow-md"
              >
                無料診断を受ける
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}