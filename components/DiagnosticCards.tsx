"use client";

interface DiagnosticCardsProps {
  onRevenue: () => void;
  onHiring: () => void;
}

export function DiagnosticCards({ onRevenue, onHiring }: DiagnosticCardsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 売上期待値測定 カード */}
        <div
          className="relative overflow-hidden h-[200px] rounded-xl border border-[#e8e0cc] shadow-md"
          style={{
            backgroundImage: "url('/images/IMG_2126.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "inherit",
              backgroundSize: "cover",
              backgroundPosition: "inherit",
              filter: "saturate(0.9) brightness(1.05)",
              transform: "scale(1.02)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(253,251,246,0.82) 10%, rgba(253,251,246,0.92) 60%, rgba(232,237,224,0.86) 100%)",
              backdropFilter: "blur(0.5px)",
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
            <h2 className="font-serif text-2xl font-bold text-[#2d2a26] leading-relaxed mb-2">
              売上期待値測定
            </h2>
            <p className="text-sm font-medium text-[#6b6258] leading-relaxed max-w-[270px] mb-5">
              OTA運用最適化で年間売上UPをシミュレーション（所要時間20秒）
            </p>
            <button
              onClick={onRevenue}
              className="appearance-none border-none bg-[#fffcf4] border border-[#c9b8a0] text-[#5e5449] font-['Zen_Kaku_Gothic_New'] text-sm font-medium tracking-[0.14em] uppercase px-7 py-3 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffef9] hover:shadow-md"
            >
              診断を始める
            </button>
          </div>
        </div>

        {/* 採用スコア診断 カード */}
        <div
          className="relative overflow-hidden h-[200px] rounded-xl border border-[#e8e0cc] shadow-md"
          style={{
            backgroundImage: "url('/images/IMG_2126.JPG')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "inherit",
              backgroundSize: "cover",
              backgroundPosition: "inherit",
              filter: "saturate(0.9) brightness(1.05)",
              transform: "scale(1.02)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(253,251,246,0.82) 10%, rgba(253,251,246,0.92) 60%, rgba(232,237,224,0.86) 100%)",
              backdropFilter: "blur(0.5px)",
            }}
          />
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
            <h2 className="font-serif text-2xl font-bold text-[#2d2a26] leading-relaxed mb-2">
              採用スコア診断
            </h2>
            <p className="text-sm font-medium text-[#6b6258] leading-relaxed max-w-[270px] mb-5">
              28問のチェックで採用体制スコアを可視化
            </p>
            <button
              onClick={onHiring}
              className="appearance-none border-none bg-[#fffcf4] border border-[#c9b8a0] text-[#5e5449] font-['Zen_Kaku_Gothic_New'] text-sm font-medium tracking-[0.14em] uppercase px-7 py-3 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffef9] hover:shadow-md"
            >
              診断を始める
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
