'use client';

import { useState } from 'react';
import { submitDiagnostic, LeadFormData } from '@/lib/submitToSheet';

interface Props {
  diagnosticType: 'revenue' | 'hiring' | 'analysis';
  payload: Record<string, any>;
  onClose: () => void;
  analysisMode?: boolean;
}

const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

export default function LeadCaptureForm({ diagnosticType, payload, onClose, analysisMode }: Props) {
  const [form, setForm] = useState({ facilityName: '', prefecture: '', contactName: '', email: '', phone: '', address: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitDiagnostic({
        ...form,
        diagnosticType,
        payload,
      } as LeadFormData);
      setDone(true);
    } catch {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-12">
        <p className="font-serif text-2xl text-foreground mb-4">送信完了</p>
        <p className="text-sm text-foreground/60 mb-8">担当者よりご連絡いたします。</p>
        <button onClick={onClose} className="text-accent-rust underline text-sm">閉じる</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="font-serif text-xl text-center mb-4 font-bold">
        {analysisMode ? '資料ダウンロード（無料）' : 'コンサルタントに共有してフィードバックを待つ'}
      </h3>

      <div>
        <label className="block text-xs text-foreground/60 mb-1">施設名 *</label>
        <input
          type="text"
          required
          value={form.facilityName}
          onChange={(e) => setForm({ ...form, facilityName: e.target.value })}
          className="w-full border-b border-hairline bg-transparent py-2 text-foreground focus:outline-none focus:border-accent-rust"
        />
      </div>

      <div>
        <label className="block text-xs text-foreground/60 mb-1">都道府県 *</label>
        <select
          required
          value={form.prefecture}
          onChange={(e) => setForm({ ...form, prefecture: e.target.value })}
          className="w-full border-b border-hairline bg-transparent py-2 text-foreground focus:outline-none focus:border-accent-rust"
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((pref) => (
            <option key={pref} value={pref}>{pref}</option>
          ))}
        </select>
      </div>

      {analysisMode && (
        <div>
          <label className="block text-xs text-foreground/60 mb-1">住所 *</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border-b border-hairline bg-transparent py-2 text-foreground focus:outline-none focus:border-accent-rust"
          />
        </div>
      )}

      <div>
        <label className="block text-xs text-foreground/60 mb-1">担当者名 *</label>
        <input
          type="text"
          required
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className="w-full border-b border-hairline bg-transparent py-2 text-foreground focus:outline-none focus:border-accent-rust"
        />
      </div>

      <div>
        <label className="block text-xs text-foreground/60 mb-1">メールアドレス *</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-hairline bg-transparent py-2 text-foreground focus:outline-none focus:border-accent-rust"
        />
      </div>

      <div>
        <label className="block text-xs text-foreground/60 mb-1">電話番号</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border-b border-hairline bg-transparent py-2 text-foreground focus:outline-none focus:border-accent-rust"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-[#ABBAA9] text-black font-['Zen_Old_Mincho'] py-3 text-sm tracking-widest hover:bg-[#B4BC4E] hover:text-white transition-colors disabled:opacity-50"
      >
        {sending ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}
