// app/components/diagnostics/ProgressBar.tsx
export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs text-foreground/60 mb-2">
        <span>Step {current} / {total}</span><span>{pct}%</span>
      </div>
      <div className="w-full h-1 bg-hairline rounded-full overflow-hidden">
        <div className="h-full bg-accent-rust transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

