"use client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function OtaPromoModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[var(--background)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/40 hover:text-foreground text-2xl z-10"
        >
          &times;
        </button>

        {/* ★ iframe で HTML を表示 */}
        <iframe
          src="/innbuddy-modal.html"
          className="w-full border-0"
          style={{
            height: "80vh",
            maxHeight: "calc(90vh - 0px)",
            minHeight: "500px",
          }}
          title="OTA代行メニュー詳細"
        />
      </div>
    </div>
  );
}
