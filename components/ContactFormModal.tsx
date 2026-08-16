"use client";

import { useState } from "react";
import { submitDiagnostic } from "@/lib/submitToSheet";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isPage?: boolean;
}

const facilityTypes = ['ホテル', '旅館', '民宿', 'その他'];
const roomCounts = ['5室未満', '5〜20室', '21〜50室', '51〜100室', '100室超'];
const otas = [
  '楽天トラベル', 'じゃらん', '一休', 'Booking.com', 'Agoda', 'Trip.com',
  'Traveloka', 'Expedia', 'その他', '未掲載',
];
const concerns = [
  'OTA運用代行を検討している',
  '販売戦略・価格調整を見直したい',
  '海外OTAへ掲載したい',
  'サイトコントローラーの導入を検討している',
  'インバウンド集客を強化したい',
  '2ヶ月無料トライアルについて知りたい',
  'その他',
];

export function ContactFormModal({ isOpen, onClose, isPage = false }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#fdfbf7]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[#fdfbf7] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-xl p-6 md:p-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#1b2e1b]/40 hover:text-[#1b2e1b] text-2xl">&times;</button>
        <h2 className="font-serif font-light text-2xl md:text-3xl text-[#1b2e1b] mb-8 text-center">お問い合わせフォーム</h2>
        <ContactFormContent onClose={onClose} />
      </div>
    </div>
  );
}

function ContactFormContent({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    facilityName: '', name: '', email: '', phone: '',
    facilityType: '', roomCount: '',
    currentOtas: [] as string[], concerns: [] as string[],
    message: '', agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleArray = (key: 'currentOtas' | 'concerns', value: string) => {
    setForm((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ★★★ ここが修正ポイント ★★★
      await submitDiagnostic({
        facilityName: form.facilityName,
        prefecture: '',
        contactName: form.name,
        email: form.email,
        phone: form.phone,
        diagnosticType: 'contact',
        payload: {
          facilityType: form.facilityType,
          roomCount: form.roomCount,
          currentOtas: form.currentOtas,
          concerns: form.concerns,
          message: form.message,
        },
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || '送信に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <h3 className="font-serif font-light text-2xl text-[#1b2e1b] mb-4">お問い合わせありがとうございます</h3>
        <p className="text-[#1b2e1b]/60 mb-8">担当者より2営業日以内にご連絡いたします。</p>
        <button onClick={onClose} className="text-sm text-[#1b2e1b] underline">閉じる</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 施設名 */}
      <div>
        <label className="block text-sm text-[#1b2e1b]/70 mb-1">施設名 *</label>
        <input
          key="facility-name-input"
          type="text"
          inputMode="text"
          required
          value={form.facilityName}
          onChange={(e) => setForm((p) => ({ ...p, facilityName: e.target.value }))}
          className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]"
        />
      </div>

      {/* ご担当者名 */}
      <div>
        <label className="block text-sm text-[#1b2e1b]/70 mb-1">ご担当者名 *</label>
        <input type="text" required value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" />
      </div>

      {/* メール・電話 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#1b2e1b]/70 mb-1">メールアドレス *</label>
          <input type="email" required value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" />
        </div>
        <div>
          <label className="block text-sm text-[#1b2e1b]/70 mb-1">電話番号</label>
          <input type="tel" value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]" />
        </div>
      </div>

      {/* 施設の種類・部屋数 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#1b2e1b]/70 mb-1">施設の種類 *</label>
          <select required value={form.facilityType}
            onChange={(e) => setForm((p) => ({ ...p, facilityType: e.target.value }))}
            className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]">
            <option value="">選択してください</option>
            {facilityTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#1b2e1b]/70 mb-1">部屋数</label>
          <select value={form.roomCount}
            onChange={(e) => setForm((p) => ({ ...p, roomCount: e.target.value }))}
            className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]">
            <option value="">選択してください</option>
            {roomCounts.map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
      </div>

      {/* OTA */}
      <div>
        <label className="block text-sm text-[#1b2e1b]/70 mb-2">現在利用中のOTA（複数選択可）</label>
        <div className="flex flex-wrap gap-2">
          {otas.map((ota) => (
            <button key={ota} type="button" onClick={() => toggleArray('currentOtas', ota)}
              className={`px-3 py-1 text-xs border transition-all ${
                form.currentOtas.includes(ota)
                  ? 'border-[#1b2e1b] bg-[#1b2e1b]/5 text-[#1b2e1b] font-semibold'
                  : 'border-[#e5e0d9] text-[#1b2e1b]/60'
              }`}>{ota}</button>
          ))}
        </div>
      </div>

      {/* 相談内容 */}
      <div>
        <label className="block text-sm text-[#1b2e1b]/70 mb-2">ご相談内容 *（複数選択可）</label>
        <div className="space-y-2">
          {concerns.map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer text-sm text-[#1b2e1b]/80">
              <input type="checkbox" checked={form.concerns.includes(c)}
                onChange={() => toggleArray('concerns', c)}
                className="w-4 h-4 accent-[#1b2e1b]" />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* 詳細メッセージ */}
      <div>
        <label className="block text-sm text-[#1b2e1b]/70 mb-1">その他、詳細があればご記入ください</label>
        <textarea rows={5} value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b] resize-none" />
      </div>

      {/* 同意 */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer text-xs text-[#1b2e1b]/60 leading-relaxed">
          <input type="checkbox" required checked={form.agreed}
            onChange={(e) => setForm((p) => ({ ...p, agreed: e.target.checked }))}
            className="w-4 h-4 mt-0.5 accent-[#1b2e1b] flex-shrink-0" />
          <span><a href="#" className="text-[#1b2e1b] underline">個人情報保護方針</a>に同意します *</span>
        </label>
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      {/* 送信ボタン */}
      <div>
        <button type="submit" disabled={loading}
          className="w-full bg-[#1b2e1b] text-white font-['Zen_Old_Mincho'] py-3 text-sm tracking-widest hover:bg-[#2d4a2d] transition-colors disabled:opacity-50">
          {loading ? '送信中...' : '送信する'}
        </button>
      </div>
    </form>
  );
}
