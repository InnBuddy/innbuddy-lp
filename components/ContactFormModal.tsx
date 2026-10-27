
"use client";

import { useState } from "react";
import { submitDiagnostic } from "@/lib/submitToSheet";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isPage?: boolean;
}

const facilityTypes = ["ホテル", "旅館", "民宿", "その他"];

const roomCounts = [
  "5室未満",
  "5〜20室",
  "21〜50室",
  "51〜100室",
  "100室超",
];

const otas = [
  "楽天トラベル",
  "じゃらん",
  "一休",
  "Booking.com",
  "Agoda",
  "Trip.com",
  "Traveloka",
  "Expedia",
  "その他",
  "未掲載",
];

const concerns = [
  "OTA運用代行を検討している",
  "販売戦略・価格調整を見直したい",
  "海外OTAへ掲載したい",
  "サイトコントローラーの導入を検討している",
  "インバウンド集客を強化したい",
  "無料トライアルについて知りたい",
  "その他",
];

export function ContactFormModal({
  isOpen,
  onClose,
  isPage = false,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#fdfbf7] ${
        isPage ? "p-0" : "p-3 sm:p-4"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`relative bg-[#fdfbf7] w-full max-w-2xl max-h-[92dvh] overflow-y-auto rounded-sm shadow-xl ${
          isPage
            ? "p-5 pt-6 sm:p-8 md:p-10"
            : "p-5 pt-5 sm:p-8 md:p-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 上部ナビゲーション */}
        <div className="relative flex min-h-10 items-center justify-between gap-3 mb-5 sm:mb-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-1 text-sm text-[#1b2e1b]/60 hover:text-[#1b2e1b] transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>戻る</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-3xl leading-none text-[#1b2e1b]/40 hover:text-[#1b2e1b] transition-colors"
          >
            &times;
          </button>
        </div>

        {/* 見出し：スマートフォンだけ約1行分下げる */}
        <h2 className="mx-auto mb-8 mt-6 max-w-full text-center font-serif font-light text-2xl leading-relaxed text-[#1b2e1b] sm:mb-10 sm:mt-1 sm:text-3xl">
          お問い合わせフォーム
        </h2>

        <ContactFormContent onClose={onClose} />
      </div>
    </div>
  );
}

function ContactFormContent({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    facilityName: "",
    name: "",
    email: "",
    phone: "",
    facilityType: "",
    roomCount: "",
    currentOtas: [] as string[],
    concerns: [] as string[],
    message: "",
    agreed: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleArray = (
    key: "currentOtas" | "concerns",
    value: string
  ) => {
    setForm((prev) => {
      const arr = prev[key];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];

      return {
        ...prev,
        [key]: next,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agreed) {
      setError("個人情報保護方針への同意が必要です。");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitDiagnostic({
        facilityName: form.facilityName,
        prefecture: "",
        contactName: form.name,
        email: form.email,
        phone: form.phone,
        diagnosticType: "contact",
        payload: {
          facilityType: form.facilityType,
          roomCount: form.roomCount,
          currentOtas: form.currentOtas,
          concerns: form.concerns,
          message: form.message,
        },
      });

      setSubmitted(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "送信に失敗しました。もう一度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <h3 className="mb-4 font-serif font-light text-2xl text-[#1b2e1b]">
          お問い合わせありがとうございます
        </h3>

        <p className="mb-8 text-[#1b2e1b]/60">
          担当者より2営業日以内にご連絡いたします。
        </p>

        <button
          type="button"
          onClick={onClose}
          className="text-sm text-[#1b2e1b] underline"
        >
          閉じる
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 施設名 */}
      <div>
        <label className="mb-1 block text-sm text-[#1b2e1b]/70">
          施設名 *
        </label>

        <input
          type="text"
          inputMode="text"
          autoComplete="organization"
          required
          value={form.facilityName}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              facilityName: e.target.value,
            }))
          }
          className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
        />
      </div>

      {/* ご担当者名 */}
      <div>
        <label className="mb-1 block text-sm text-[#1b2e1b]/70">
          ご担当者名 *
        </label>

        <input
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              name: e.target.value,
            }))
          }
          className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
        />
      </div>

      {/* メール・電話 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-[#1b2e1b]/70">
            メールアドレス *
          </label>

          <input
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                email: e.target.value,
              }))
            }
            className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-[#1b2e1b]/70">
            電話番号
          </label>

          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                phone: e.target.value,
              }))
            }
            className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
          />
        </div>
      </div>

      {/* 施設の種類・部屋数 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-[#1b2e1b]/70">
            施設の種類 *
          </label>

          <select
            required
            value={form.facilityType}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                facilityType: e.target.value,
              }))
            }
            className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
          >
            <option value="">選択してください</option>
            {facilityTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-[#1b2e1b]/70">
            部屋数
          </label>

          <select
            value={form.roomCount}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                roomCount: e.target.value,
              }))
            }
            className="w-full border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
          >
            <option value="">選択してください</option>
            {roomCounts.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* OTA */}
      <div>
        <label className="mb-2 block text-sm text-[#1b2e1b]/70">
          現在利用中のOTA（複数選択可）
        </label>

        <div className="flex flex-wrap gap-2">
          {otas.map((ota) => (
            <button
              key={ota}
              type="button"
              onClick={() => toggleArray("currentOtas", ota)}
              aria-pressed={form.currentOtas.includes(ota)}
              className={`border px-3 py-2 text-xs transition-all ${
                form.currentOtas.includes(ota)
                  ? "border-[#1b2e1b] bg-[#1b2e1b]/5 font-semibold text-[#1b2e1b]"
                  : "border-[#e5e0d9] text-[#1b2e1b]/60"
              }`}
            >
              {ota}
            </button>
          ))}
        </div>
      </div>

      {/* 相談内容 */}
      <div>
        <label className="mb-2 block text-sm text-[#1b2e1b]/70">
          ご相談内容（複数選択可）
        </label>

        <div className="space-y-3">
          {concerns.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[#1b2e1b]/80"
            >
              <input
                type="checkbox"
                checked={form.concerns.includes(c)}
                onChange={() => toggleArray("concerns", c)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#1b2e1b]"
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 詳細メッセージ */}
      <div>
        <label className="mb-1 block text-sm text-[#1b2e1b]/70">
          その他、詳細があればご記入ください
        </label>

        <textarea
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              message: e.target.value,
            }))
          }
          className="w-full resize-y border-b border-[#e5e0d9] bg-transparent py-3 text-base text-[#1b2e1b] focus:border-[#1b2e1b] focus:outline-none"
        />
      </div>

      {/* 個人情報保護方針 */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#1b2e1b]/60">
          <input
            type="checkbox"
            required
            checked={form.agreed}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                agreed: e.target.checked,
              }))
            }
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#1b2e1b]"
          />

          <span>
            <a
              href="/privacy-policy"
              className="text-[#1b2e1b] underline transition-opacity hover:opacity-70"
            >
              個人情報保護方針
            </a>
            に同意します *
          </span>
        </label>
      </div>

      {/* エラー */}
      {error && (
        <p role="alert" className="text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {/* 送信ボタン */}
      <div className="pb-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1b2e1b] py-4 text-sm tracking-widest text-white transition-colors hover:bg-[#2d4a2d] disabled:opacity-50"
        >
          {loading ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
}
