// app/lib/progressStorage.ts
const STORAGE_KEY = 'innbuddy_hiring_diagnostic_progress';
const EXPIRY_DAYS = 7;

export interface SavedProgress {
  currentStep: number;
  answers: Record<string, any>;
  updatedAt: string;
}

export function saveProgress(currentStep: number, answers: Record<string, any>) {
  const data: SavedProgress = { currentStep, answers, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadProgress(): SavedProgress | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data: SavedProgress = JSON.parse(raw);
    const daysSince = (Date.now() - new Date(data.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince > EXPIRY_DAYS) { clearProgress(); return null; }
    return data;
  } catch { clearProgress(); return null; }
}

export function clearProgress() { localStorage.removeItem(STORAGE_KEY); }
