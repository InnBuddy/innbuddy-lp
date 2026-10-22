'use client';

import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectRevenue: () => void;
  onSelectHiring: () => void;
}

export default function DiagnosticSelectorModal({
  isOpen,
  onClose,
  onSelectRevenue,
  onSelectHiring,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背後の暗転オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 不透明なカード背景で背後の透けを防止 */}
      <div className="relative z-10 w-full max-w-sm rounded-xl bg-[#FAF8F5] p-8 text-center shadow-2xl border border-[#E5DECF]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700 transition-colors text-xl leading-none"
          aria-label="閉じる"
        >
          ✕
        </button>

        <h3 className="font-serif font-light text-2xl text-neutral-800 mb-2">
          診断を選択
        </h3>
        <p className="text-xs text-neutral-500 mb-6 tracking-wider">
          ご希望の診断メニューをお選びください
        </p>

        <div className="space-y-4">
          <button
            type="button"
            onClick={onSelectRevenue}
            className="w-full py-3.5 px-6 rounded-lg bg-white border border-[#D8CFC0] text-neutral-800 font-serif text-sm tracking-widest shadow-sm hover:border-[#ABBAA9] hover:bg-[#F2EFE9] transition-all duration-300"
          >
            売上期待値測定
          </button>

          <button
            type="button"
            onClick={onSelectHiring}
            className="w-full py-3.5 px-6 rounded-lg bg-white border border-[#D8CFC0] text-neutral-800 font-serif text-sm tracking-widest shadow-sm hover:border-[#ABBAA9] hover:bg-[#F2EFE9] transition-all duration-300"
          >
            採用スコア診断
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 text-xs text-neutral-400 hover:text-neutral-700 tracking-wider transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}