// lib/submitToSheet.ts

export interface LeadFormData {
  facilityName: string;
  prefecture: string;
  contactName: string;
  email: string;
  phone: string;
  diagnosticType: 'revenue' | 'hiring' | 'contact'; // ← 'contact' を追加
  payload: Record<string, any>;
}

// Apps Script の Web App URL（本番環境のURLに差し替えてください）
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/XXXXX/exec';

export async function submitDiagnostic(data: LeadFormData) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'text/plain' },
  });
  if (!res.ok) throw new Error('送信に失敗しました');
  return res.json();
}
