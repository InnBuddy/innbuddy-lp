'use client';

import { useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import DiagnosticBackground from './DiagnosticBackground';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const otaOptions = [
  '自社WEB', '楽天トラベル', 'じゃらん', '一休', 'Yahoo!トラベル', 'るるぶトラベル',
  'Booking.com', 'Expedia', 'Agoda', 'Airbnb', 'Hotels.com', 'Trip.com',
  'Meituan', 'Fliggy', 'Qunar', 'Klook', 'KKday', 'Traveloka', 'MakeMyTrip', 'その他'
];

export default function RevenueDiagnosticModal({ isOpen, onClose }: Props) {
  const [totalRooms, setTotalRooms] = useState('');
  const [adr, setAdr] = useState('');
  const [occ, setOcc] = useState(50);
  const [selectedOta, setSelectedOta] = useState<string[]>([]);
  const [primaryOta, setPrimaryOta] = useState('');
  const [primaryOtaShare, setPrimaryOtaShare] = useState('');
  const [adrUp, setAdrUp] = useState(500);
  const [occUp, setOccUp] = useState(5);
  const [showResult, setShowResult] = useState(false);

  const toggleOta = (ota: string) => {
    setSelectedOta(prev => prev.includes(ota) ? prev.filter(o => o !== ota) : (prev.length < 3 ? [...prev, ota] : prev));
  };

  const handleSubmit = () => {
    if (!totalRooms || !adr || !primaryOta) return;
    setShowResult(true);
  };

  const currentADR = adr ? parseInt(adr) : 0;
  const currentOCC = occ;
  const newOCC = Math.min(100, currentOCC + occUp);
  const newADR = currentADR + adrUp;
  const currentAnnualRevenue = totalRooms ? (parseInt(totalRooms) * 365 * (currentOCC / 100) * currentADR) : 0;
  const newAnnualRevenue = totalRooms ? (parseInt(totalRooms) * 365 * (newOCC / 100) * newADR) : 0;
  const annualUpAmount = newAnnualRevenue - currentAnnualRevenue;
  const formattedUpAmount = annualUpAmount.toLocaleString('ja-JP');

  const handleBack = () => {
    if (showResult) setShowResult(false);
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-sm shadow-xl overflow-hidden">
        <DiagnosticBackground showContourOverlay={false} />
        <div className="relative z-10">
          {/* ★ トップバー：Flexレイアウトに変更（絶対配置を解除） */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleBack} 
              className="text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              ← 前のページに戻る
            </button>
            <button 
              onClick={onClose} 
              className="text-foreground/40 hover:text-foreground text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {!showResult ? (
            <div className="space-y-8">
              {/* ★ タイトル：pt-8 を削除し、上部余白をトップバーの mb-4 で調整 */}
              <h2 className="font-serif font-light text-2xl md:text-3xl text-foreground">売上期待値測定</h2>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">総客室数</label>
                <input type="number" value={totalRooms} onChange={e => setTotalRooms(e.target.value)}
                  onWheel={e => (e.target as HTMLElement).blur()}
                  className="w-full border-b border-hairline bg-transparent py-2 focus:outline-none focus:border-accent-rust" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">現在のADR（客室単価・円）</label>
                <input type="number" value={adr} onChange={e => setAdr(e.target.value)}
                  onWheel={e => (e.target as HTMLElement).blur()}
                  className="w-full border-b border-hairline bg-transparent py-2 focus:outline-none focus:border-accent-rust" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">現在の稼働率（%）：{occ}%</label>
                <input type="range" min="0" max="100" value={occ} onChange={e => setOcc(parseInt(e.target.value))} className="w-full accent-accent-rust" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-2">メイン利用OTA（最大3つ）</label>
                <div className="flex flex-wrap gap-2">
                  {otaOptions.map(ota => (
                    <button key={ota} onClick={() => toggleOta(ota)}
                      className={`px-3 py-1 text-xs border transition-all ${selectedOta.includes(ota) ? 'border-foreground bg-black/5 text-black font-semibold' : 'border-hairline text-foreground/60'}`}>
                      {ota}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">一番予約数の多いOTA</label>
                <select value={primaryOta} onChange={e => setPrimaryOta(e.target.value)} className="w-full border-b border-hairline bg-transparent py-2 focus:outline-none focus:border-accent-rust">
                  <option value="">選択</option>
                  {otaOptions.map(ota => <option key={ota} value={ota}>{ota}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">そのOTAの売上構成比（%）</label>
                <input type="number" value={primaryOtaShare} onChange={e => setPrimaryOtaShare(e.target.value)}
                  onWheel={e => (e.target as HTMLElement).blur()}
                  className="w-full border-b border-hairline bg-transparent py-2 focus:outline-none focus:border-accent-rust" />
              </div>
              <div className="pt-6 border-t border-hairline">
                <p className="text-sm text-foreground/60 mb-4">改善シミュレーション</p>
                <label className="block text-xs mb-2">ADR上昇額：+{adrUp.toLocaleString()}円</label>
                <input type="range" min="0" max="30000" step="100" value={adrUp} onChange={e => setAdrUp(parseInt(e.target.value))} className="w-full accent-accent-rust" />
                <label className="block text-xs mt-4 mb-2">稼働率上昇：+{occUp}%</label>
                <input type="range" min="0" max="50" step="1" value={occUp} onChange={e => setOccUp(parseInt(e.target.value))} className="w-full accent-accent-rust" />
              </div>
              <button onClick={handleSubmit} className="w-full bg-[var(--diag-accent)] text-white font-['Zen_Old_Mincho'] py-3 text-sm tracking-widest hover:opacity-90 transition-opacity">
                シミュレーション結果を見る
              </button>
            </div>
          ) : (
            <div className="text-center pt-8">
              <div className="py-12 space-y-6">
                <p className="text-6xl font-light" style={{ color: 'var(--diag-accent)' }}>{formattedUpAmount}円</p>
                <p className="text-xl text-foreground">年間売上UP</p>
                <p className="text-sm text-foreground/60">
                  稼働率{occUp}%UP ＆ ADR{adrUp.toLocaleString()}円UP
                </p>
              </div>
              <LeadCaptureForm diagnosticType="revenue" payload={{
                totalRooms, adr, occ, selectedOta, primaryOta, primaryOtaShare, adrUp, occUp,
                result: { annualUpAmount, formattedUpAmount, currentAnnualRevenue, newAnnualRevenue }
              }} onClose={onClose} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}