'use client';

interface Props {
  onDiagnosticClick: () => void;
  visible: boolean;
}

export default function FloatingCta({ onDiagnosticClick, visible }: Props) {
  return (
    <div className={`fixed bottom-6 right-6 z-40 flex flex-col gap-2 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button
        onClick={onDiagnosticClick}
        className="px-5 py-3 rounded-full bg-[#FDF7F5] text-[#515D46] font-['Zen_Old_Mincho'] text-sm tracking-wide hover:bg-[#B4BC4E] hover:text-white transition-colors shadow-lg"
      >
        宿の伸びしろを測定
      </button>
      <a
        href="https://timerex.net/s/InnBuddy_ESG/386fd946"
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-3 rounded-full bg-[#FDF7F5] text-[#515D46] font-['Zen_Old_Mincho'] text-sm tracking-wide text-center hover:bg-[#B4BC4E] hover:text-white transition-colors shadow-lg"
      >
        無料相談
      </a>
    </div>
  );
}
