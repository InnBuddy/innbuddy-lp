'use client';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectRevenue: () => void;
  onSelectHiring: () => void;
}

export default function DiagnosticSelectorModal({ isOpen, onClose, onSelectRevenue, onSelectHiring }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-background w-full max-w-md p-8 md:p-10 rounded-sm shadow-xl text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-foreground/40 hover:text-foreground text-2xl">&times;</button>
        <h3 className="font-serif font-light text-2xl text-foreground mb-8">診断を選択</h3>
        <div className="space-y-4">
          <button onClick={onSelectRevenue} className="w-full border border-hairline py-4 text-foreground hover:border-accent-rust transition-colors font-serif">
            売上期待値測定
          </button>
          <button onClick={onSelectHiring} className="w-full border border-hairline py-4 text-foreground hover:border-accent-rust transition-colors font-serif">
            採用スコア診断
          </button>
        </div>
        <button onClick={onClose} className="mt-6 text-sm text-foreground/40 underline">閉じる</button>
      </div>
    </div>
  );
}
