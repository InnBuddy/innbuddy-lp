"use client";

interface FloatingOtaBannerProps {
  visible: boolean;
  onClick: () => void;
}

export function FloatingOtaBanner({ visible, onClick }: FloatingOtaBannerProps) {
  if (!visible) return null;

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      href="#"
      className="side-banner"
      style={{
        position: "fixed",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)",
        zIndex: 50,
        cursor: "pointer",
        textDecoration: "none",
        // すりガラス背景
        background: "rgba(20,22,20,0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        // 細い白枠
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: "2px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        // コンパクトなサイズ
        padding: "24px 10px",
        transition: "background 0.45s ease",
        // 横幅を固定
        width: "44px",
        minHeight: "160px",
        display: "flex",        // ← flex のみに統一
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(20,22,20,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(20,22,20,0.3)";
      }}
    >
      <span
        className="main-text"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          color: "#f5f4ef",
          fontSize: "13px",
          letterSpacing: "0.15em",
          lineHeight: "1.6",
          fontFamily: "'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
        }}
      >
        OTA代行メニュー詳細
      </span>

      {/* スマホ用スタイル */}
      <style jsx>{`
        @media (max-width: 600px) {
          .side-banner {
            padding: 18px 7px !important;
            width: 36px !important;
            min-height: 130px !important;
          }
          .main-text {
            font-size: 11px !important;
            letter-spacing: 0.12em !important;
          }
        }
      `}</style>
    </a>
  );
}
