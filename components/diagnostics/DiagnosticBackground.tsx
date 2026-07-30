// components/diagnostics/DiagnosticBackground.tsx
export default function DiagnosticBackground({
  showContourOverlay = true,
}: {
  showContourOverlay?: boolean;
}) {
  const dots = [
    { color: 'var(--diag-yellow)', top: '10%', left: '5%', size: 3 },
    { color: 'var(--diag-red)', top: '20%', right: '8%', size: 2 },
    { color: 'var(--diag-accent)', bottom: '15%', left: '12%', size: 4 },
    { color: 'var(--diag-yellow)', bottom: '10%', right: '10%', size: 2.5 },
    { color: 'var(--diag-red)', top: '60%', left: '4%', size: 3 },
    { color: 'var(--diag-accent)', top: '80%', right: '6%', size: 2 },
    { color: 'var(--diag-yellow)', top: '40%', left: '80%', size: 3 },
    { color: 'var(--diag-red)', bottom: '30%', right: '15%', size: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* オリーブベース＋黄色グラデーション */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(180, 188, 78, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(180, 188, 78, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #F0F2E9 0%, #E8ECD8 30%, #FDF6E8 70%, #F5F0E0 100%)
          `,
          opacity: 0.6,
        }}
      />

      {/* 等高線オーバーレイ */}
      {showContourOverlay && (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M0 200 Q200 150 400 250 T800 200"
            fill="none"
            stroke="var(--diag-brown1)"
            strokeWidth="1"
            opacity="0.15"
          />
          <path
            d="M0 350 Q150 300 350 400 T700 350 T1000 300"
            fill="none"
            stroke="var(--diag-brown2)"
            strokeWidth="1.5"
            opacity="0.1"
          />
          <path
            d="M0 100 Q250 50 500 150 T1000 100"
            fill="none"
            stroke="var(--diag-dark)"
            strokeWidth="0.8"
            opacity="0.15"
          />
          <path
            d="M0 450 Q300 400 550 500 T900 450"
            fill="none"
            stroke="var(--diag-yellow)"
            strokeWidth="1"
            opacity="0.1"
          />
        </svg>
      )}

      {/* 散りばめドット */}
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}