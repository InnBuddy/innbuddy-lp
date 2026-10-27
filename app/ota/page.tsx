'use client'

import React, { useState } from 'react'
import { submitDiagnostic, LeadFormData } from '@/lib/submitToSheet'
import './ota.css'
import './ota-mobile-fixes.css'

/* ===================================================
   スマホ専用ボトムナビゲーション
   5つすべて同じ丸枠デザイン（直径48px・黄色枠）で均等配置
=================================================== */
function MobileBottomNav({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  const iconProps = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  return (
    <div className="ota-mobile-bottom-nav md:hidden fixed bottom-2 left-2 right-2 z-[100] pb-[env(safe-area-inset-bottom)]">
      <style>{`
        @media (max-width: 767px) {
          .ota-mobile-bottom-nav .ota-nav-inner {
            display: flex !important;
            align-items: center !important;
            justify-content: space-evenly !important;
            padding: 0 4px !important;
          }
          .ota-mobile-bottom-nav .ota-nav-item {
            box-sizing: border-box !important;
            flex: 0 0 48px !important;
            width: 48px !important;
            min-width: 48px !important;
            height: 48px !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 2px !important;
            border-radius: 9999px !important;
            border: 2px solid #FCAF17 !important;
            background: transparent !important;
            color: #334155 !important;
            text-decoration: none !important;
            font-family: inherit !important;
            -webkit-appearance: none !important;
            appearance: none !important;
          }
          .ota-mobile-bottom-nav .ota-nav-item:active { color: #0284c7 !important; }
          .ota-mobile-bottom-nav .ota-nav-item svg { width: 18px !important; height: 18px !important; }
          .ota-mobile-bottom-nav .ota-nav-item span {
            font-size: 9px !important;
            line-height: 1 !important;
            font-weight: 700 !important;
            white-space: nowrap !important;
          }
        }
      `}</style>

      <div className="ota-nav-inner w-full bg-[#E0F2FE]/95 backdrop-blur-xl border border-white/60 shadow-[0_4px_24px_rgba(14,165,233,0.15)] rounded-[2rem] h-[58px]">
        {/* 問合せ */}
        <a href="https://innbuddy-japan.com/contact" className="ota-nav-item">
          <svg {...iconProps}>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 6 10 7 10-7" />
          </svg>
          <span>問合せ</span>
        </a>

        {/* 私たち */}
        <a href="https://innbuddy-japan.com/team" className="ota-nav-item">
          <svg {...iconProps}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>私たち</span>
        </a>

        {/* ブランド */}
        <a href="https://innbuddy-japan.com/" className="ota-nav-item">
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>ブランド</span>
        </a>

        {/* メディア */}
        <a href="https://innbuddy-japan.com/library" className="ota-nav-item">
          <svg {...iconProps}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span>メディア</span>
        </a>

        {/* 無料診断：他の4つと同じ見た目（診断モーダルを開く） */}
        <button
          type="button"
          onClick={onOpenDiagnostic}
          aria-haspopup="dialog"
          aria-label="無料診断"
          className="ota-nav-item"
        >
          <svg {...iconProps}>
            <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
          </svg>
          <span>無料診断</span>
        </button>
      </div>
    </div>
  )
}

/* ===================================================
   SVG イラスト本体（PC・スマホ共通化）
=================================================== */
function OtaIllustrationSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 540 440" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="110" y="70" width="320" height="200" rx="8" fill="#2d3748" stroke="#111d2b" strokeWidth="3" />
      <rect x="122" y="82" width="296" height="176" rx="4" fill="#ffffff" />
      <path d="M245 270 L235 310 L305 310 L295 270 Z" fill="#718096" stroke="#111d2b" strokeWidth="2.5" />
      <rect x="210" y="310" width="120" height="10" rx="3" fill="#4a5568" stroke="#111d2b" strokeWidth="2.5" />
      <text x="140" y="145" fill="#4a5568" fontSize="38" fontWeight="900" fontFamily="Arial, sans-serif">OTA</text>
      <rect x="200" y="210" width="26" height="36" fill="#fef3c7" stroke="#111d2b" strokeWidth="2" rx="2" />
      <rect x="238" y="190" width="26" height="56" fill="#fde68a" stroke="#111d2b" strokeWidth="2" rx="2" />
      <rect x="276" y="165" width="26" height="81" fill="#fcd34d" stroke="#111d2b" strokeWidth="2" rx="2" />
      <rect x="314" y="140" width="26" height="106" fill="#FCAF17" stroke="#111d2b" strokeWidth="2" rx="2" />
      <rect x="352" y="115" width="26" height="131" fill="#FCAF17" stroke="#111d2b" strokeWidth="2" rx="2" />
      <path d="M140 220 Q 250 200 375 105" stroke="#FCAF17" strokeWidth="9" strokeLinecap="round" fill="none" />
      <polygon points="375,90 395,115 365,120" fill="#FCAF17" stroke="#111d2b" strokeWidth="2" />
      <g transform="translate(60, 20)">
        <circle cx="36" cy="36" r="34" fill="#ffffff" stroke="#111d2b" strokeWidth="2.5" strokeDasharray="4 3" />
        <path d="M22 48 L22 26 L36 14 L50 26 L50 48 Z" fill="#f8fafc" stroke="#111d2b" strokeWidth="2" />
        <rect x="31" y="34" width="10" height="14" fill="#e2e8f0" stroke="#111d2b" strokeWidth="1.5" />
        <line x1="36" y1="34" x2="36" y2="48" stroke="#111d2b" strokeWidth="1" />
        <rect x="40" y="22" width="5" height="5" fill="#FCAF17" />
        <rect x="27" y="22" width="5" height="5" fill="#FCAF17" />
      </g>
      <g transform="translate(400, 25)">
        <circle cx="36" cy="36" r="34" fill="#ffffff" stroke="#111d2b" strokeWidth="2.5" strokeDasharray="4 3" />
        <circle cx="36" cy="36" r="16" fill="#f8fafc" stroke="#111d2b" strokeWidth="2" />
        <circle cx="36" r="10" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
        <path d="M16 22 L16 34 M13 22 L13 28 Q13 32 16 34 M19 22 L19 28 Q19 32 16 34 M16 34 L16 50" stroke="#111d2b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M56 22 Q52 26 52 30 Q52 35 56 36 L56 50 M56 22 Q60 26 60 30 Q60 35 56 36" stroke="#111d2b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(240, 290)">
        <circle cx="34" cy="34" r="32" fill="#ffffff" stroke="#111d2b" strokeWidth="2.5" strokeDasharray="4 3" />
        <path d="M16 44 L16 24 Q16 20 20 20 L48 20 Q52 20 52 24 L52 44" fill="#f8fafc" stroke="#111d2b" strokeWidth="2" />
        <rect x="18" y="32" width="32" height="10" fill="#FCAF17" stroke="#111d2b" strokeWidth="1.5" rx="1" />
        <rect x="22" y="24" width="10" height="6" rx="2" fill="#e2e8f0" stroke="#111d2b" strokeWidth="1.5" />
        <rect x="36" y="24" width="10" height="6" rx="2" fill="#e2e8f0" stroke="#111d2b" strokeWidth="1.5" />
        <line x1="14" y1="44" x2="54" y2="44" stroke="#111d2b" strokeWidth="2.5" />
      </g>
      <g transform="translate(15, 120)">
        <path d="M25 280 L40 180 Q65 140 110 145 L155 185 L165 280 Z" fill="#FCAF17" stroke="#111d2b" strokeWidth="3" />
        <path d="M85 145 L100 210 L115 145" fill="#ffffff" stroke="#111d2b" strokeWidth="2" />
        <polygon points="98,160 102,160 104,225 96,225" fill="#111d2b" />
        <circle cx="102" cy="100" r="32" fill="#FEEBD0" stroke="#111d2b" strokeWidth="2.5" />
        <path d="M72 95 Q85 65 115 70 Q135 75 130 92 Q125 78 105 78 Q85 80 75 105 Z" fill="#111d2b" />
        <path d="M88 95 Q94 93 98 96" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M108 96 Q112 93 118 96" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="94" cy="101" r="2" fill="#111d2b" />
        <circle cx="112" cy="101" r="2" fill="#111d2b" />
        <path d="M98 114 Q104 120 110 114" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M150 195 L158 135 Q160 120 166 120 Q172 120 172 135 L172 170" stroke="#111d2b" strokeWidth="3" fill="#FEEBD0" strokeLinejoin="round" />
      </g>
      <g transform="translate(325, 120)">
        <path d="M45 280 L35 185 Q75 140 125 155 L165 200 L155 280 Z" fill="#FCAF17" stroke="#111d2b" strokeWidth="3" />
        <circle cx="95" cy="105" r="32" fill="#FEEBD0" stroke="#111d2b" strokeWidth="2.5" />
        <path d="M68 95 Q80 65 115 72 Q130 78 128 95 Q120 78 100 80 Q80 82 72 105 Z" fill="#d97706" stroke="#111d2b" strokeWidth="2" />
        <path d="M82 98 Q87 94 92 98" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M102 98 Q107 94 112 98" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="87" cy="103" r="2" fill="#111d2b" />
        <circle cx="107" cy="103" r="2" fill="#111d2b" />
        <path d="M92 115 Q98 122 104 115" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M72 175 Q68 135 80 125 Q88 120 90 130 L90 150" stroke="#111d2b" strokeWidth="3" fill="#FEEBD0" strokeLinejoin="round" />
        <line x1="128" y1="70" x2="135" y2="55" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="140" y1="80" x2="155" y2="72" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="142" y1="95" x2="158" y2="98" stroke="#111d2b" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 10h1M9 14h1M9 18h1M16 13h1M16 17h1"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/><circle cx="6" cy="11" r="1.5"/><path d="m17 4 1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L14 6.3l2-.3z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9h6M9 15h6"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="12" r="4"/><path d="m12 12 8-8M17 4l3 3M15 6l2 2"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 11 18-5v12L3 13v-2zM11.6 16.8a3 3 0 1 1-5.8-1.6M21 9v6"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="m12 7 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M18 9l-5 5-4-4-3 3"/><circle cx="18" cy="9" r="1.5"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  ]
  return <span className="service-icon-wrap">{icons[index]}</span>
}

function ProblemIcon({ index }: { index: number }) {
  const icons = [
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M2 12h20"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  ]
  return <span className="problem-icon-wrap">{icons[index]}</span>
}

function WorkflowIcon({ index }: { index: number }) {
  const icons = [
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>,
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 20.66l7.65-7.65.77-.78a5.4 5.4 0 0 0 0-7.65z"/></svg>,
  ]
  return <span className="workflow-icon-wrap">{icons[index]}</span>
}


const services = [
  ['アカウント・掲載情報', 'OTAアカウント管理|施設情報更新|客室情報更新|設備・アメニティ更新|アクセス情報更新|チェックイン・アウト情報|キャンセルポリシー|注意事項|OTAからの通知確認|OTA仕様変更への対応'],
  ['宿泊プラン', '新規プラン作成|プラン内容変更|プラン名改善|プラン説明文改善|食事条件変更|特典設定|早割・直前割プラン|連泊プラン|季節・ターゲット別|販売期間設定'],
  ['料金設定', '基本料金設定|曜日別料金|繁忙期・閑散期対応|季節・連休料金|客室タイプ別料金|プラン別料金|早割・直前料金|料金変更・調整'],
  ['客室・在庫管理', '客室在庫管理|OTA別在庫確認|販売開始・停止|客室タイプ別在庫|日付別在庫|最低/最大宿泊日数|連泊制限|販売可能期間|キャンセル時の在庫確認'],
  ['キャンペーン・特集', 'OTAキャンペーン確認|セール情報確認|特集掲載確認|クーポン・ポイント施策|季節特集|インバウンド向け施策|キャンペーン参加設定|効果確認'],
  ['写真・コンテンツ', '写真更新|客室・食事・館内写真|周辺情報|写真掲載順|施設・客室紹介文|OTA別仕様対応'],
  ['口コミ・レビュー', '新着レビュー確認|口コミ返信|低評価レビュー確認|評価内容の整理|頻出コメント確認|口コミ傾向の把握|OTA別状況確認'],
  ['海外OTA', 'Booking.com / Agoda|Expedia / Trip.com 等|英語等の掲載情報|海外向けプラン|海外ユーザー向け情報|海外キャンペーン|国・地域別の販売状況'],
  ['販売状況分析', 'OTA別売上・予約数|ADR・稼働率|キャンセル率|リードタイム・滞在日数|客室・プラン別販売|OTA別比較|前月・前年との比較'],
  ['改善', 'プラン・料金調整|在庫調整|掲載内容・写真改善|キャンペーン見直し|OTA別運用改善|状況に応じた施策提案'],
  ['報告・ミーティング', '運用状況・販売実績共有|課題整理|改善施策共有|今後の対応方針|定期ミーティング'],
]

const painPoints = [
  'OTAの更新や在庫管理に時間を取られている',
  '宿泊プランを作りたいが、手が回らない',
  '料金をどう設定・変更すればいいかわからない',
  '複数OTAを管理するのが大変（海外OTAまで運用する余裕がない）',
  'OTAを運用しているが、何を改善すればいいかわからない',
  '担当者が退職してOTA運用を任せられる人がいない',
  '今の代行業者が全然提案/改善してくれない',
  '事業拡大をしたいが相談できる専門家がいない',
]

const frameworkCategories = [
  {
    category: 'STRATEGY｜戦略',
    catClass: 'tag-strategy',
    steps: [
      { num: '01', title: '現状把握', desc: '売上・予約数・\n稼働率などを\n確認', stepClass: 'step-1' },
      { num: '02', title: '市場分析', desc: '競合施設や\n市場の動向を\n把握', stepClass: 'step-2' },
      { num: '03', title: '課題発見', desc: '改善点と\n売上向上の機会を\n特定', stepClass: 'step-3' },
      { num: '04', title: '目標設定', desc: '売上・稼働率などの\n数値目標を\n設定', stepClass: 'step-4' },
    ],
  },
  {
    category: 'EXECUTION｜実行',
    catClass: 'tag-execution',
    steps: [
      { num: '05', title: '運用計画', desc: '料金・プラン・\n販売方法を\n策定', stepClass: 'step-5' },
      { num: '06', title: 'OTA運用', desc: '計画に基づき\n掲載内容を\n管理', stepClass: 'step-6' },
    ],
  },
  {
    category: 'OPTIMIZATION｜分析・改善',
    catClass: 'tag-optimization',
    steps: [
      { num: '07', title: '効果検証', desc: '施策の結果を\n数値で確認', stepClass: 'step-7' },
      { num: '08', title: '改善提案', desc: '検証結果をもとに\n改善策を\n提案', stepClass: 'step-8' },
      { num: '09', title: '再戦略化', desc: '結果を踏まえ、\n次の運用方針を\n決定', stepClass: 'step-9' },
      { num: '10', title: '運用の定着', desc: '改善サイクルを継続し、\n安定した運用体制を構築', stepClass: 'step-10' },
    ],
  },
]

const otas = ['楽天トラベル', 'じゃらんnet', '一休.com', 'Yahoo!トラベル / るるぶ 等']
const overseas = ['Booking.com', 'Agoda', 'Expedia', 'Trip.com / その他']

const faqs = [
  ['まだ契約するか決めていませんが、相談だけでもいいですか？', 'もちろんです。「自社の運用に問題があるか見てほしい」「どこまで任せられるのか知りたい」というご相談からでも構いません。'],
  ['1つのOTAだけでも依頼できますか？', 'はい、可能です。海外OTAのみ、特定の国内OTAのみなど、施設様の状況に合わせて柔軟に対応いたします。'],
  ['まだ登録していないOTAの新規開設からお願いできますか？', 'はい、新規アカウントの登録申請から、初期のページ作成・プラン設定までサポートいたします。'],
]

function Arrow() {
  return <span aria-hidden="true" className="arrow">＞</span>
}

export default function Page() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)
  const [isInboundMenuOpen, setIsInboundMenuOpen] = useState(false)

  return (
    <main className="ota-page-root">
      {/* HEADER */}
      <header className="site-header" style={{ position: 'relative', zIndex: 100020, pointerEvents: 'auto' }}>
        <a href="#top" className="logo">
          InnBuddy<small>OTA</small>
        </a>
        <nav style={{ pointerEvents: 'auto' }}>
          <button
            type="button"
            className="ota-shared-diagnostic-cta"
            aria-haspopup="dialog"
            aria-label="無料診断を開く"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              setIsDiagnosticOpen(true)
            }}
            onTouchStart={() => setIsDiagnosticOpen(true)}
            onPointerUp={() => setIsDiagnosticOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 100020,
              pointerEvents: 'auto',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 42,
              padding: '8px 14px',
              border: 0,
              borderRadius: 999,
              background: '#FCAF17',
              color: '#111d2b',
              fontSize: 12,
              fontWeight: 800,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            無料診断 <span aria-hidden="true">↗</span>
          </button>
          <a href="#services">対応業務</a>
          <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer">
            InnBuddyについて
          </a>
        </nav>
      </header>

      {/* 
        HERO
        スマホの時のみ max-md:!h-auto max-md:!pb-12 を指定し、ヒーローの高さ制限を解除。
        スマホ版のみ、ヒーローの文字を右揃えにしています（max-md: のみ）。
      */}
      <section id="top" className="hero max-md:!h-auto max-md:!py-12">
        
        {/* === PC版イラスト（スマホ版では強力に非表示） === */}
        <div className="max-md:!hidden hero-center-backdrop" aria-hidden="true">
          <OtaIllustrationSvg className="hero-svg-backdrop" />
        </div>

        <div className="wrap hero-2col-wrap">
          <div className="hero-left-content max-md:!w-full max-md:!pt-0 max-md:!flex max-md:!flex-col max-md:!items-center max-md:!text-center">
            <p className="eyebrow hero-script max-md:!self-center max-md:!mx-auto max-md:!w-fit max-md:!text-center max-md:!px-3 max-md:!py-1.5 max-md:!mt-0 max-md:!mb-4 max-md:!text-[12px] max-md:!leading-tight">ホテル・旅館のOTA運用代行</p>
            <h1>
              ホテル・旅館の<br />
              OTA運用を、<br />
              まるごと任せる。
            </h1>
            <p className="hero-copy hero-script">
              宿泊プラン、料金、在庫、<br />
              掲載情報、キャンペーン、<br />
              口コミ、海外OTAまで。<br />
              日々のOTA業務を、<br />
              InnBuddyがまとめてサポートします。
            </p>
            
            {/* CTAボタン（スマホ版ではボトムナビがあるため強力に非表示） */}
            <div className="max-md:!hidden md:block hero-cta-box">
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="button red-neon-btn">
                OTA運用について相談する <Arrow />
              </a>
            </div>
          </div>

          {/* 右側の01〜03パネル（スマホ版では不要なため強力に非表示） */}
          <div className="max-md:!hidden md:flex hero-editorial-panel-group">
            {/* ★ 01. ABOUT US */}
            <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer" className="square-glass-panel panel-about">
              <div className="panel-inner">
                <div className="panel-meta-row">
                  <span className="panel-num">01</span>
                  <span className="panel-label">ABOUT US</span>
                </div>
                <div className="panel-title-row">
                  <h3 className="panel-heading">InnBuddyとは？</h3>
                  <span className="panel-nav-symbol">↗</span>
                </div>
              </div>
            </a>

            {/* ★ 02. ONLINE CHECK */}
            <button type="button" onClick={() => setIsDiagnosticOpen(true)} className="square-glass-panel panel-check">
              <div className="panel-inner">
                <div className="panel-meta-row">
                  <span className="panel-num">02</span>
                  <span className="panel-label">ONLINE CHECK</span>
                  <span className="panel-pill-tag">RECOMMENDED</span>
                </div>
                <div className="panel-title-row">
                  <h3 className="panel-heading">無料診断で現状を把握しよう</h3>
                  <span className="panel-nav-symbol">▶</span>
                </div>
              </div>
            </button>

            {/* ★ 03. INBOUND */}
            <button type="button" onClick={() => setIsInboundMenuOpen(true)} className="square-glass-panel panel-inbound">
              <div className="panel-inner">
                <div className="panel-meta-row">
                  <span className="panel-num">03</span>
                  <span className="panel-label">INBOUND</span>
                </div>
                <div className="panel-title-row">
                  <h3 className="panel-heading">インバウンドをもっと取り込みたい</h3>
                  <span className="panel-nav-symbol">▶</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* === スマホ版イラスト（文字の下に独立して配置・他の操作を一切邪魔しない） === */}
        <div className="md:hidden flex justify-center w-full mt-6 px-4">
          <OtaIllustrationSvg className="w-full max-w-[320px] h-auto pointer-events-none" />
        </div>

        {/* スクロール位置（PC用） */}
        <div className="hero-index max-md:!hidden md:block">
          SCROLL<br />
          <span>↓</span>
        </div>
      </section>

      {/* 中央ポップアップ：インバウンド＆ハラル選択 */}
      {isInboundMenuOpen && (
        <div className="modal-overlay" onClick={() => setIsInboundMenuOpen(false)}>
          <div className="inbound-square-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsInboundMenuOpen(false)}
              aria-label="閉じる"
            >
              ✕
            </button>
            <div className="inbound-square-cards">
              <a
                href="https://innbuddy-japan.com/inbound"
                target="_blank"
                rel="noopener noreferrer"
                className="inbound-square-item img-card-1"
              >
                <div className="img-card-overlay"></div>
                <span className="square-num">1</span>
                <span className="square-title">インバウンド特設ページをみる</span>
              </a>
              <a
                href="https://innbuddy-japan.com/halal"
                target="_blank"
                rel="noopener noreferrer"
                className="inbound-square-item img-card-2"
              >
                <div className="img-card-overlay"></div>
                <span className="square-num">2</span>
                <span className="square-title">ハラル特設ページをみる</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PC・スマートフォン共通の売上期待値測定モーダル */}
      <RevenueDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />

      {/* PROBLEM */}
      <section className="dark section problem">
        <div className="wrap">
          <h2>
            こんなお悩みは<br />
            <span>ありませんか？</span>
          </h2>
          <div className="problem-cards-grid">
            {painPoints.map((p, i) => (
              <div className="problem-card" key={p}>
                <div className="problem-card-head">
                  <span className="problem-card-num">0{i + 1}</span>
                  <ProblemIcon index={i} />
                </div>
                <p className="problem-card-text">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE OF WORK — 全11業務を常時表示し、タップ操作なしでも内容を確認できるカードデザイン */}
      <section id="services" className="light section services">
        <div className="wrap">
          <div className="services-heading-row">
            <div>
              <p className="services-kicker">OUR SERVICES / 01—11</p>
              <h2>InnBuddy OTAが<br /><span>対応する11の業務</span></h2>
            </div>
            <p className="intro services-intro">
              施設ごとに異なる客室構成・ターゲットを踏まえ、OTA運用の準備から日々の実務、分析・改善まで一貫して支援します。
            </p>
          </div>

          <div className="services-cards-grid">
            {services.map(([title, items], idx) => (
              <article className="service-detail-card" key={`service-detail-${idx}`}>
                <div className="service-detail-card-top">
                  <span className="service-detail-number">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="service-detail-icon"><ServiceIcon index={idx} /></span>
                  {/* ＋マークはスマホ版のみ非表示（PCは今まで通り表示） */}
                  <span className="service-detail-mark max-md:!hidden" aria-hidden="true">＋</span>
                </div>
                <h3>{title}</h3>
                <ul>
                  {items.split('|').map((item, itemIndex) => (
                    <li key={`${idx}-${itemIndex}`}><span aria-hidden="true">✓</span>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="services-footnote">※ 対応範囲は施設の状況・ご契約内容に応じて調整します。</p>
        </div>
      </section>

      {/* DISTRIBUTION */}
      <section className="dark section ota">
        <div className="wrap">
          <h2>
            対応可能な<span>OTA</span>
          </h2>
          <p className="intro">
            複数の国内・海外OTAに対応。<br />
            現在ご利用中のOTAが対応可能か分からない場合も、お気軽にご相談ください。
          </p>
          <div className="ota-columns">
            <div>
              <h3 className="orange-heading">
                DOMESTIC OTA <small>国内OTA</small>
              </h3>
              {otas.map((x, i) => (
                <div className="ota-item" key={x}>
                  <span>0{i + 1}</span>
                  <span className="ota-item-text">{x}</span>
                  {i === 0 && <b>特に注力</b>}
                </div>
              ))}
            </div>
            <div>
              <h3 className="orange-heading">
                OVERSEAS OTA <small>海外OTA（インバウンド）</small>
              </h3>
              {overseas.map((x, i) => (
                <div className="ota-item" key={x}>
                  <span>0{i + 1}</span>
                  <span className="ota-item-text">{x}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="dark framework section">
        <div className="wrap">
          <h2>
            InnBuddyが<br />
            <span>大切にしていること</span>
          </h2>
          <p className="intro">
            OTAは、一度設定して終わりではありません。<br />
            決まった作業を繰り返すだけの代行ではなく、現状把握から運用の定着まで、改善サイクルを回し続けます。
          </p>

          <div className="framework-flow-wrapper">
            {frameworkCategories.map((cat) => (
              <div className={`framework-cat-group ${cat.catClass}`} key={cat.category}>
                <div className="framework-cat-header">
                  <span>{cat.category}</span>
                </div>
                <div className="framework-cat-steps">
                  {cat.steps.map((step) => (
                    <div className={`framework-step-card ${step.stepClass}`} key={step.num}>
                      <div className="fstep-top">
                        <span className="fstep-badge">{step.num}</span>
                        <h3 className="fstep-title">{step.title}</h3>
                      </div>
                      <div className="fstep-bottom">
                        <p className="fstep-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="light section workflow">
        <div className="workflow-watermarks" aria-hidden="true">
          <span className="wm wm-1">客室平均単価 (ADR)</span>
          <span className="wm wm-2">客室稼働率 (OCC)</span>
          <span className="wm wm-3">販売可能客室売上 (RevPAR)</span>
          <span className="wm wm-4">予約リードタイム</span>
          <span className="wm wm-5">キャンセル率</span>
          <span className="wm wm-6">平均滞在日数 (LOS)</span>
          <span className="wm wm-7">成約率 (CVR)</span>
          <span className="wm wm-8">直販比率</span>
          <span className="wm wm-9">広告費用対効果 (ROAS)</span>
          <span className="wm wm-10">クチコミ評価スコア</span>
          <span className="wm wm-11">予約ペース (Pacing)</span>
          <span className="wm wm-12">営業利益率 (GOPPAR)</span>
        </div>

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <h2>ご利用開始まで</h2>
          <div className="timeline">
            {[
              ['まずはご相談', '「どこまで任せられるのか知りたい」「複数OTAの管理を整理したい」といった段階でも構いません。'],
              ['現状確認', '施設ごとに異なる販売状況・客室構成を踏まえ、現在のOTA運用状況を無料で確認いたします。'],
              ['ご提案・ご契約', 'お任せいただく業務範囲を確認したうえで、最適なプラン・契約条件（初期無料期間など）をご提案します。'],
              ['運用開始', '面倒なOTA実務をInnBuddyに引き継ぎ、本来の業務に集中できる環境がスタートします。'],
            ].map(([t, d], i) => (
              <div className="timeline-item" key={t}>
                <div className="timeline-left">
                  <WorkflowIcon index={i} />
                  <b>0{i + 1}</b>
                </div>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="dark section pricing">
        <div className="wrap">
          <h2>料金・契約条件</h2>
          <p>
            各施設様の規模や現状の課題に応じて、<strong>月額固定</strong> もしくは <strong>成果報酬</strong> にて最適なプランをご提案します。
          </p>
          <div className="offer">
            <div className="offer-inner-border">
              <div className="offer-badge-wrap">
                <span className="label">LIMITED OFFER</span>
              </div>
              <p>
                現在、限定３社様に<br />
                <strong>「初月無料＆1ヶ月契約」</strong>から<br />
                使用できる特別プランもご提案しております。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="light section faq">
        <div className="wrap narrow">
          <h2>よくあるご質問</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                <span>Q.</span>
                {q}
              </summary>
              <p>
                <b>A.</b>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="dark section contact">
        <div className="wrap contact-grid-split">
          <div className="contact-split-left">
            <h2>
              「今のOTA運用、<br />
              どこまで任せられる？」<br />
              <span>からでも構いません。</span>
            </h2>
            <p>
              現在の運用状況をお聞きし、InnBuddyで対応できる業務範囲をご説明します。<br />
              右のボタンからお気軽にご相談ください。
            </p>
          </div>
          <div className="contact-split-right">
            <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer" className="huge-contact-cta red-neon-btn">
              <div className="japan-map-watermark-img" aria-hidden="true" />
              <span className="huge-cta-sub">InnBuddyへの無料相談・お問い合わせ</span>
              <span className="huge-cta-main">お問い合わせフォームへ</span>
              <span className="huge-cta-arrow">＞</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="ota-footer-new">
        <div className="ota-footer-wrap">
          <div className="ota-footer-brand-row">
            <div className="ota-footer-logo">
              InnBuddy
            </div>
            <span className="ota-footer-tag">ABOUT INNBUDDY</span>
          </div>

          <p className="ota-footer-desc">
            InnBuddyは、ホテル・旅館のオンライン販売を支援するサービスです。<br />
            OTA運用を中心に、施設ごとの課題や販売状況を理解しながら、必要なサポートを行っています。
          </p>

          <div className="ota-footer-links-row">
            <div className="ota-footer-links-group">
              <a href="https://innbuddy-japan.com/" target="_blank" rel="noopener noreferrer">
                InnBuddyブランドサイトへ ↗
              </a>
              <a href="https://innbuddy-japan.com/team" target="_blank" rel="noopener noreferrer">
                私たちについて ↗
              </a>
              <a href="https://innbuddy-japan.com/contact" target="_blank" rel="noopener noreferrer">
                お問い合わせ ↗
              </a>
            </div>
            <span className="ota-footer-copy">
              © InnBuddy All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* スマホでナビゲーションがフッターに被らないための余白 */}
      <div className="h-[100px] md:hidden"></div>

      {/* スマホ専用グラスモーフィズム・ボトムナビゲーション */}
      <MobileBottomNav onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />
    </main>
  )
}

/* ===================================================
   無料診断モーダル + 実際のLeadCaptureForm送信処理を統合
   submitDiagnostic経由で既存のApps Script連携を使用
=================================================== */

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

type LeadCaptureFormProps = {
  diagnosticType: 'revenue' | 'hiring' | 'contact';
  payload: Record<string, any>;
  onClose: () => void;
};

function LeadCaptureForm({ diagnosticType, payload, onClose }: LeadCaptureFormProps) {
  const [form, setForm] = useState({ facilityName: '', prefecture: '', contactName: '', email: '', phone: '', address: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setErrorMessage('');
    try {
      await submitDiagnostic({
        ...form,
        diagnosticType,
        payload,
      } as LeadFormData);
      setDone(true);
    } catch (error) {
      console.error('無料診断の送信に失敗しました:', error);
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <p className="font-serif text-2xl text-[#1b2e1b] mb-4">送信完了</p>
        <p className="text-sm text-[#1b2e1b]/60 mb-8">担当者よりご連絡いたします。</p>
        <button type="button" onClick={onClose} className="text-sm underline text-[#1b2e1b] min-h-11 px-4">閉じる</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="border-t border-[#e5e0d9] pt-6 mt-6">
        <p className="text-xs tracking-[0.18em] text-[#9b7944] mb-2">NEXT STEP</p>
        <h3 className="font-serif text-xl text-center mb-2 font-bold text-[#1b2e1b]">
          診断結果を担当者に共有する
        </h3>
        <p className="text-sm text-center leading-6 text-[#1b2e1b]/60 mb-5">
          入力内容とシミュレーション結果を送信すると、担当者からご連絡いたします。
        </p>
      </div>

      <div>
        <label htmlFor="lead-facility-name" className="block text-xs text-[#1b2e1b]/65 mb-1">施設名 *</label>
        <input id="lead-facility-name" type="text" required value={form.facilityName} onChange={e => setForm({ ...form, facilityName: e.target.value })} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" autoComplete="organization" />
      </div>

      <div>
        <label htmlFor="lead-prefecture" className="block text-xs text-[#1b2e1b]/65 mb-1">都道府県 *</label>
        <select id="lead-prefecture" required value={form.prefecture} onChange={e => setForm({ ...form, prefecture: e.target.value })} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]">
          <option value="">選択してください</option>
          {PREFECTURES.map(pref => <option key={pref} value={pref}>{pref}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="lead-contact-name" className="block text-xs text-[#1b2e1b]/65 mb-1">担当者名 *</label>
        <input id="lead-contact-name" type="text" required value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" autoComplete="name" />
      </div>

      <div>
        <label htmlFor="lead-email" className="block text-xs text-[#1b2e1b]/65 mb-1">メールアドレス *</label>
        <input id="lead-email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="lead-phone" className="block text-xs text-[#1b2e1b]/65 mb-1">電話番号（任意）</label>
        <input id="lead-phone" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" autoComplete="tel" />
      </div>

      {errorMessage && <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-md p-3">{errorMessage}</p>}
      <button type="submit" disabled={sending} className="w-full min-h-12 bg-[#1b2e1b] text-white font-medium py-3 px-4 text-sm tracking-widest hover:bg-[#2d4a2d] transition-colors disabled:opacity-50 disabled:cursor-wait rounded-md">
        {sending ? '送信中...' : '診断結果を送信する'}
      </button>
      <p className="text-xs text-center leading-5 text-[#1b2e1b]/45">送信すると、入力内容と診断結果が送信先に共有されます。</p>
    </form>
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const otaOptions = [
  '自社WEB', '楽天トラベル', 'じゃらん', '一休', 'Yahoo!トラベル', 'るるぶトラベル',
  'Booking.com', 'Expedia', 'Agoda', 'Airbnb', 'Hotels.com', 'Trip.com',
  'Meituan', 'Fliggy', 'Qunar', 'Klook', 'KKday', 'Traveloka', 'MakeMyTrip', 'その他'
];

function RevenueDiagnosticModal({ isOpen, onClose }: Props) {
  const [totalRooms, setTotalRooms] = useState('');
  const [adr, setAdr] = useState('');
  const [occ, setOcc] = useState(50);
  const [selectedOta, setSelectedOta] = useState<string[]>([]);
  const [primaryOta, setPrimaryOta] = useState('');
  const [primaryOtaShare, setPrimaryOtaShare] = useState('');
  const [adrUp, setAdrUp] = useState(500);
  const [occUp, setOccUp] = useState(5);
  const [showResult, setShowResult] = useState(false);

  const toggleOta = (ota: string) => {
    setSelectedOta(prev => prev.includes(ota) ? prev.filter(o => o !== ota) : (prev.length < 3 ? [...prev, ota] : prev));
  };

  const handleSubmit = () => {
    if (!totalRooms || !adr || !primaryOta) return;
    setShowResult(true);
  };

  const currentADR = adr ? parseInt(adr, 10) : 0;
  const currentOCC = occ;
  const newOCC = Math.min(100, currentOCC + occUp);
  const newADR = currentADR + adrUp;
  const currentAnnualRevenue = totalRooms ? (parseInt(totalRooms, 10) * 365 * (currentOCC / 100) * currentADR) : 0;
  const newAnnualRevenue = totalRooms ? (parseInt(totalRooms, 10) * 365 * (newOCC / 100) * newADR) : 0;
  const annualUpAmount = newAnnualRevenue - currentAnnualRevenue;
  const formattedUpAmount = annualUpAmount.toLocaleString('ja-JP');

  const handleBack = () => {
    if (showResult) setShowResult(false);
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10010] flex items-center justify-center bg-[#fdfbf7]/95 p-3 sm:p-4" role="presentation" onClick={onClose}>
      <div className="relative bg-[#fdfbf7] text-left w-full max-w-2xl max-h-[92dvh] overflow-y-auto p-5 sm:p-8 md:p-12 rounded-xl shadow-2xl border border-[#e5e0d9]" role="dialog" aria-modal="true" aria-labelledby="ota-diagnostic-title" onClick={e => e.stopPropagation()}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <button type="button" onClick={handleBack} className="text-sm text-[#1b2e1b]/60 hover:text-[#1b2e1b] transition-colors min-h-11">
              ← {showResult ? '入力画面に戻る' : '前のページに戻る'}
            </button>
            <button type="button" onClick={onClose} aria-label="診断を閉じる" className="text-[#1b2e1b]/50 hover:text-[#1b2e1b] text-3xl leading-none w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#1b2e1b]/5">
              ×
            </button>
          </div>

          {!showResult ? (
            <div className="space-y-7">
              <div className="border-b border-[#e5e0d9] pb-5">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b7944] mb-2">Free Revenue Diagnosis</p>
                <h2 id="ota-diagnostic-title" className="font-serif font-light text-2xl md:text-3xl text-[#1b2e1b]">売上期待値測定</h2>
                <p className="text-sm text-[#1b2e1b]/60 mt-2">現在の施設情報を入力して、売上改善の可能性をシミュレーションします。</p>
              </div>
              <div>
                <label htmlFor="diag-total-rooms" className="block text-sm text-[#1b2e1b]/75 mb-1">総客室数</label>
                <input id="diag-total-rooms" type="number" min="1" inputMode="numeric" value={totalRooms} onChange={e => setTotalRooms(e.target.value)} onWheel={e => (e.target as HTMLElement).blur()} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" placeholder="例：15" />
              </div>
              <div>
                <label htmlFor="diag-adr" className="block text-sm text-[#1b2e1b]/75 mb-1">現在のADR（客室単価・円）</label>
                <input id="diag-adr" type="number" min="0" inputMode="numeric" value={adr} onChange={e => setAdr(e.target.value)} onWheel={e => (e.target as HTMLElement).blur()} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" placeholder="例：18000" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2"><label htmlFor="diag-occ" className="block text-sm text-[#1b2e1b]/75">現在の稼働率</label><span className="text-sm font-semibold text-[#1b2e1b]">{occ}%</span></div>
                <input id="diag-occ" type="range" min="0" max="100" value={occ} onChange={e => setOcc(parseInt(e.target.value, 10))} className="w-full accent-[#1b2e1b]" />
                <div className="flex justify-between text-xs text-[#1b2e1b]/40"><span>0%</span><span>100%</span></div>
              </div>
              <div>
                <label className="block text-sm text-[#1b2e1b]/75 mb-3">メイン利用OTA（最大3つ）</label>
                <div className="flex flex-wrap gap-2">
                  {otaOptions.map(ota => (
                    <button type="button" key={ota} aria-pressed={selectedOta.includes(ota)} onClick={() => toggleOta(ota)} className={`min-h-9 px-3 py-2 text-xs border rounded-full transition-all ${selectedOta.includes(ota) ? 'border-[#1b2e1b] bg-[#1b2e1b] text-white font-semibold' : 'border-[#e5e0d9] bg-white/60 text-[#1b2e1b]/70 hover:border-[#1b2e1b]/60'}`}>
                      {ota}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#1b2e1b]/45 mt-2">選択中：{selectedOta.length}/3</p>
              </div>
              <div>
                <label htmlFor="diag-primary-ota" className="block text-sm text-[#1b2e1b]/75 mb-1">一番予約数の多いOTA</label>
                <select id="diag-primary-ota" value={primaryOta} onChange={e => setPrimaryOta(e.target.value)} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]">
                  <option value="">選択してください</option>
                  {otaOptions.map(ota => <option key={ota} value={ota}>{ota}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="diag-ota-share" className="block text-sm text-[#1b2e1b]/75 mb-1">そのOTAの売上構成比（%）</label>
                <input id="diag-ota-share" type="number" min="0" max="100" inputMode="numeric" value={primaryOtaShare} onChange={e => setPrimaryOtaShare(e.target.value)} onWheel={e => (e.target as HTMLElement).blur()} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" placeholder="例：45" />
              </div>
              <div className="pt-6 border-t border-[#e5e0d9]">
                <p className="text-sm text-[#1b2e1b]/70 mb-4 font-semibold">改善シミュレーション</p>
                <div className="mb-5"><label htmlFor="diag-adr-up" className="block text-xs mb-2 text-[#1b2e1b]/70">ADR上昇額：<strong>+{adrUp.toLocaleString()}円</strong></label><input id="diag-adr-up" type="range" min="0" max="30000" step="100" value={adrUp} onChange={e => setAdrUp(parseInt(e.target.value, 10))} className="w-full accent-[#1b2e1b]" /></div>
                <div><label htmlFor="diag-occ-up" className="block text-xs mb-2 text-[#1b2e1b]/70">稼働率上昇：<strong>+{occUp}%</strong></label><input id="diag-occ-up" type="range" min="0" max="50" step="1" value={occUp} onChange={e => setOccUp(parseInt(e.target.value, 10))} className="w-full accent-[#1b2e1b]" /></div>
              </div>
              <button type="button" onClick={handleSubmit} disabled={!totalRooms || Number(totalRooms) <= 0 || !adr || Number(adr) < 0 || !primaryOta} className="w-full min-h-12 bg-[#1b2e1b] text-white font-medium rounded-md py-3 px-4 text-sm tracking-widest hover:bg-[#2d4a2d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                シミュレーション結果を見る
              </button>
            </div>
          ) : (
            <div className="text-center pt-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b7944] mb-3">Your Revenue Potential</p>
              <div className="py-8 sm:py-12 space-y-5">
                <p className="text-4xl sm:text-6xl font-light text-[#1b2e1b] break-words">{formattedUpAmount}円</p>
                <p className="text-xl text-[#1b2e1b]">年間売上UP（試算）</p>
                <p className="text-sm text-[#1b2e1b]/60">稼働率 +{occUp}% ／ ADR +{adrUp.toLocaleString()}円</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
                  <div className="rounded-lg border border-[#e5e0d9] p-4"><p className="text-xs text-[#1b2e1b]/55 mb-1">現在の年間売上（概算）</p><p className="text-lg font-semibold text-[#1b2e1b]">{Math.round(currentAnnualRevenue).toLocaleString('ja-JP')}円</p></div>
                  <div className="rounded-lg border border-[#e5e0d9] p-4"><p className="text-xs text-[#1b2e1b]/55 mb-1">改善後の年間売上（概算）</p><p className="text-lg font-semibold text-[#1b2e1b]">{Math.round(newAnnualRevenue).toLocaleString('ja-JP')}円</p></div>
                </div>
                <p className="text-xs leading-6 text-[#1b2e1b]/50">※入力値をもとにした簡易試算です。実際の売上を保証するものではありません。</p>
              </div>
              <LeadCaptureForm diagnosticType="revenue" payload={{
                totalRooms, adr, occ, selectedOta, primaryOta, primaryOtaShare, adrUp, occUp,
                result: { annualUpAmount, formattedUpAmount, currentAnnualRevenue, newAnnualRevenue }
              }} onClose={onClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
