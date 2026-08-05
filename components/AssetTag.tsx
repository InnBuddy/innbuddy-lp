// components/AssetTag.tsx
'use client';

import { useEffect, useRef } from 'react';

interface AssetTagProps {
  label: string;
  description: string;
  colorClass: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AssetTag({ label, description, colorClass, isOpen, onToggle }: AssetTagProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={onToggle}
        className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full ${colorClass} hover:opacity-80 transition-opacity`}
      >
        #{label}
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-64 max-w-[90vw] rounded-lg bg-white shadow-lg p-4 text-left border border-hairline">
          <p className="text-sm font-medium text-foreground mb-1">#{label}とは</p>
          <p className="text-sm leading-relaxed text-foreground/70">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
