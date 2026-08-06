'use client';
import { useEffect, useState } from 'react';

interface Props {
  onClick: () => void;
  visible: boolean;
}

export function FloatingOtaBanner({ onClick, visible }: Props) {
  return (
    <div
      onClick={onClick}
      className={`fixed top-1/2 -translate-y-1/2 right-0 z-40 cursor-pointer transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center group">
        {/* バナーの縦長エリア */}
        <div className="w-12 bg-[#1c1712]/90 backdrop-blur-sm border-l border-t border-b border-[#E8B93C] rounded-l-md py-6 px-2 text-center shadow-lg group-hover:bg-[#1c1712] transition-colors">
          <div className="[writing-mode:vertical-rl] text-[#f0e2c0] text-xs tracking-[0.2em] font-serif leading-relaxed">
            OTA代行メニュー＆期間限定無料特典
          </div>
        </div>
        {/* 横に飛び出る目印 */}
        <div className="w-2 h-16 bg-[#E8B93C] rounded-r-sm opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
