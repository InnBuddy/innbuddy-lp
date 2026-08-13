'use client';

import { useState } from 'react';

interface AssetTagProps {
  label: string;
  description: string;
  colorClass: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AssetTag({ label, description, colorClass, isOpen, onToggle }: AssetTagProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'inline-block',
        maxWidth: '100%',
        margin: 0,
      }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'inline-block',
          whiteSpace: 'normal', // 折り返しを許可
          wordBreak: 'break-word',
          padding: 'clamp(3px, 0.8vw, 8px) clamp(6px, 1.2vw, 14px)',
          fontSize: 'clamp(10px, 1.1vw, 13px)',
          fontWeight: 500,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          color: '#1a1a1a',
          backgroundColor: isOpen ? colorClass : '#f5f0e8',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          letterSpacing: '0.02em',
          maxWidth: '100%',
          boxSizing: 'border-box',
          opacity: isHovered ? 0.85 : 1,
          lineHeight: 1.4,
          textAlign: 'left',
          margin: 0,
        }}
      >
        {label}
      </button>

      {/* 説明文（開いているときのみ表示） */}
      {isOpen && (
        <div
          style={{
            marginTop: 'clamp(4px, 0.8vw, 8px)',
            padding: 'clamp(6px, 1vw, 12px)',
            backgroundColor: '#fafaf8',
            borderRadius: '4px',
            fontSize: 'clamp(11px, 1.2vw, 14px)',
            color: '#4a3728',
            maxWidth: '100%',
            wordBreak: 'break-word',
            lineHeight: 1.6,
            border: '1px solid #e8e3dc',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
