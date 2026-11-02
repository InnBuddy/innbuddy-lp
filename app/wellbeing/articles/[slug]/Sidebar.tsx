'use client';
import React, { useState } from 'react';
import Link from 'next/link';

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

export default function Sidebar({ articles }: { articles: Article[] }) {
  const groupedByCategory = articles.reduce((acc, article) => {
    const cat = article.category || 'その他';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  const categories = Object.keys(groupedByCategory);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setOpenCategory(prev => prev === cat ? null : cat);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#E1E5DC]">
      <h3 className="text-sm font-extrabold text-[#2C3830] mb-5 border-b border-[#E1E5DC] pb-3">
        カテゴリから探す
      </h3>
      <ul className="space-y-2">
        {categories.map((cat, idx) => (
          <li key={idx} className="border-b border-[#F3F5F0] last:border-0 pb-2 last:pb-0">
            <button
              onClick={() => toggleCategory(cat)}
              className="w-full text-left text-[13px] font-bold text-[#627264] hover:text-[#8C7560] py-2 flex items-center justify-between transition-colors"
            >
              {cat}
              <span className={`transform transition-transform text-[#D5DCD0] ${openCategory === cat ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openCategory === cat ? 'max-h-[500px] mt-2 mb-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200' : 'max-h-0'}`}>
              <ul className="space-y-1 pl-2 border-l-2 border-[#E1E5DC]/50">
                {groupedByCategory[cat].map((article: Article) => (
                  <li key={article.id}>
                    <Link 
                      href={`/wellbeing/articles/${article.base_id}`}
                      className="block text-[11px] font-medium text-[#627264] hover:text-[#8C7560] py-1.5 pl-3 hover:bg-[#F3F5F0] rounded transition-colors truncate"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
