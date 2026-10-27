'use client';

import { useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';

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

  const currentADR = adr ? parseInt(adr, 10) : 0;
  const currentOCC = occ;
  const newOCC = Math.min(100, currentOCC + occUp);
  const newADR = currentADR + adrUp;
  const currentAnnualRevenue = totalRooms ? (parseInt(totalRooms, 10) * 365 * (currentOCC / 100) * currentADR) : 0;
  const newAnnualRevenue = totalRooms ? (parseInt(totalRooms, 10) * 365 * (newOCC / 100) * newADR) : 0;
  const annualUpAmount = newAnnualRevenue - currentAnnualRevenue;
  const formattedUpAmount = annualUpAmount.toLocaleString('ja-JP');

  const handleBack = () => {
    if (showResult) setShowResult(false);
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10010] flex items-center justify-center bg-[#fdfbf7]/95 p-3 sm:p-4" role="presentation" onClick={onClose}>
      <div className="relative bg-[#fdfbf7] text-left w-full max-w-2xl max-h-[92dvh] overflow-y-auto p-5 sm:p-8 md:p-12 rounded-xl shadow-2xl border border-[#e5e0d9]" role="dialog" aria-modal="true" aria-labelledby="ota-diagnostic-title" onClick={e => e.stopPropagation()}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <button type="button" onClick={handleBack} className="text-sm text-[#1b2e1b]/60 hover:text-[#1b2e1b] transition-colors min-h-11">
              ← {showResult ? '入力画面に戻る' : '前のページに戻る'}
            </button>
            <button type="button" onClick={onClose} aria-label="診断を閉じる" className="text-[#1b2e1b]/50 hover:text-[#1b2e1b] text-3xl leading-none w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#1b2e1b]/5">
              ×
            </button>
          </div>

          {!showResult ? (
            <div className="space-y-7">
              <div className="border-b border-[#e5e0d9] pb-5">
                <p className="text-xs tracking-[0.2em] uppercase text-[#9b7944] mb-2">Free Revenue Diagnosis</p>
                <h2 id="ota-diagnostic-title" className="font-serif font-light text-2xl md:text-3xl text-[#1b2e1b]">売上期待値測定</h2>
                <p className="text-sm text-[#1b2e1b]/60 mt-2">現在の施設情報を入力して、売上改善の可能性をシミュレーションします。</p>
              </div>
              <div>
                <label htmlFor="diag-total-rooms" className="block text-sm text-[#1b2e1b]/75 mb-1">総客室数</label>
                <input id="diag-total-rooms" type="number" min="1" inputMode="numeric" value={totalRooms} onChange={e => setTotalRooms(e.target.value)} onWheel={e => (e.target as HTMLElement).blur()} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" placeholder="例：15" />
              </div>
              <div>
                <label htmlFor="diag-adr" className="block text-sm text-[#1b2e1b]/75 mb-1">現在のADR（客室単価・円）</label>
                <input id="diag-adr" type="number" min="0" inputMode="numeric" value={adr} onChange={e => setAdr(e.target.value)} onWheel={e => (e.target as HTMLElement).blur()} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" placeholder="例：18000" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2"><label htmlFor="diag-occ" className="block text-sm text-[#1b2e1b]/75">現在の稼働率</label><span className="text-sm font-semibold text-[#1b2e1b]">{occ}%</span></div>
                <input id="diag-occ" type="range" min="0" max="100" value={occ} onChange={e => setOcc(parseInt(e.target.value, 10))} className="w-full accent-[#1b2e1b]" />
                <div className="flex justify-between text-xs text-[#1b2e1b]/40"><span>0%</span><span>100%</span></div>
              </div>
              <div>
                <label className="block text-sm text-[#1b2e1b]/75 mb-3">メイン利用OTA（最大3つ）</label>
                <div className="flex flex-wrap gap-2">
                  {otaOptions.map(ota => (
                    <button type="button" key={ota} aria-pressed={selectedOta.includes(ota)} onClick={() => toggleOta(ota)} className={`min-h-9 px-3 py-2 text-xs border rounded-full transition-all ${selectedOta.includes(ota) ? 'border-[#1b2e1b] bg-[#1b2e1b] text-white font-semibold' : 'border-[#e5e0d9] bg-white/60 text-[#1b2e1b]/70 hover:border-[#1b2e1b]/60'}`}>
                      {ota}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#1b2e1b]/45 mt-2">選択中：{selectedOta.length}/3</p>
              </div>
              <div>
                <label htmlFor="diag-primary-ota" className="block text-sm text-[#1b2e1b]/75 mb-1">一番予約数の多いOTA</label>
                <select id="diag-primary-ota" value={primaryOta} onChange={e => setPrimaryOta(e.target.value)} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]">
                  <option value="">選択してください</option>
                  {otaOptions.map(ota => <option key={ota} value={ota}>{ota}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="diag-ota-share" className="block text-sm text-[#1b2e1b]/75 mb-1">そのOTAの売上構成比（%）</label>
                <input id="diag-ota-share" type="number" min="0" max="100" inputMode="numeric" value={primaryOtaShare} onChange={e => setPrimaryOtaShare(e.target.value)} onWheel={e => (e.target as HTMLElement).blur()} className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" placeholder="例：45" />
              </div>
              <div className="pt-6 border-t border-[#e5e0d9]">
                <p className="text-sm text-[#1b2e1b]/70 mb-4 font-semibold">改善シミュレーション</p>
                <div className="mb-5"><label htmlFor="diag-adr-up" className="block text-xs mb-2 text-[#1b2e1b]/70">ADR上昇額：<strong>+{adrUp.toLocaleString()}円</strong></label><input id="diag-adr-up" type="range" min="0" max="30000" step="100" value={adrUp} onChange={e => setAdrUp(parseInt(e.target.value, 10))} className="w-full accent-[#1b2e1b]" /></div>
                <div><label htmlFor="diag-occ-up" className="block text-xs mb-2 text-[#1b2e1b]/70">稼働率上昇：<strong>+{occUp}%</strong></label><input id="diag-occ-up" type="range" min="0" max="50" step="1" value={occUp} onChange={e => setOccUp(parseInt(e.target.value, 10))} className="w-full accent-[#1b2e1b]" /></div>
              </div>
              <button type="button" onClick={handleSubmit} disabled={!totalRooms || Number(totalRooms) <= 0 || !adr || Number(adr) < 0 || !primaryOta} className="w-full min-h-12 bg-[#1b2e1b] text-white font-medium rounded-md py-3 px-4 text-sm tracking-widest hover:bg-[#2d4a2d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                シミュレーション結果を見る
              </button>
            </div>
          ) : (
            <div className="text-center pt-3">
              <p className="text-xs tracking-[0.2em] uppercase text-[#9b7944] mb-3">Your Revenue Potential</p>
              <div className="py-8 sm:py-12 space-y-5">
                <p className="text-4xl sm:text-6xl font-light text-[#1b2e1b] break-words">{formattedUpAmount}円</p>
                <p className="text-xl text-[#1b2e1b]">年間売上UP（試算）</p>
                <p className="text-sm text-[#1b2e1b]/60">稼働率 +{occUp}% ／ ADR +{adrUp.toLocaleString()}円</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
                  <div className="rounded-lg border border-[#e5e0d9] p-4"><p className="text-xs text-[#1b2e1b]/55 mb-1">現在の年間売上（概算）</p><p className="text-lg font-semibold text-[#1b2e1b]">{Math.round(currentAnnualRevenue).toLocaleString('ja-JP')}円</p></div>
                  <div className="rounded-lg border border-[#e5e0d9] p-4"><p className="text-xs text-[#1b2e1b]/55 mb-1">改善後の年間売上（概算）</p><p className="text-lg font-semibold text-[#1b2e1b]">{Math.round(newAnnualRevenue).toLocaleString('ja-JP')}円</p></div>
                </div>
                <p className="text-xs leading-6 text-[#1b2e1b]/50">※入力値をもとにした簡易試算です。実際の売上を保証するものではありません。</p>
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
