'use client';

import { useState, useEffect } from 'react';
import { hiringScoreQuestions, hiringCostQuestions } from '@/data/hiringQuestions';
import type { ScoringQuestion, CostQuestion } from '@/data/hiringQuestions';
import { calcHiringScore, getScoreLevel } from '@/lib/scoring';
import { saveProgress, loadProgress, clearProgress } from '@/lib/progressStorage';
import type { SavedProgress } from '@/lib/progressStorage';
import LeadCaptureForm from './LeadCaptureForm';

interface ModalProps { isOpen: boolean; onClose: () => void; }
type StepNumber = 1 | 2 | 3 | 4;

interface StepProps {
  answers: Record<string, string | number | undefined>;
  updateAnswer: (id: string, value: string | number) => void;
  onNext: () => void;
  onPrev?: () => void;
  errors: Record<string, boolean>;
  clearError: (id: string) => void;
}

function InputField({ label, value, onChange, hasError }: { label: string; value?: string | number; onChange: (v: string) => void; hasError?: boolean }) {
  return (
    <div>
      <label className="text-sm text-[#1b2e1b]/70">{label}</label>
      <input type="number" value={value ?? ''} onChange={e => onChange(e.target.value)}
        onWheel={e => (e.target as HTMLElement).blur()}
        className={`w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b] ${hasError ? 'border-red-500' : ''}`} />
    </div>
  );
}

function Step1({ answers, updateAnswer, onNext, errors, clearError }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif font-light text-2xl text-[#1b2e1b] mb-4">基本情報</h2>
      <InputField label="正社員数" value={answers.employeeCount} onChange={v => { updateAnswer('employeeCount', v); clearError('employeeCount'); }} hasError={errors.employeeCount} />
      <InputField label="契約社員数" value={answers.contractCount} onChange={v => updateAnswer('contractCount', v)} />
      <InputField label="パート・アルバイト数" value={answers.partTimeCount} onChange={v => updateAnswer('partTimeCount', v)} />
      <InputField label="外国人材数" value={answers.foreignCount} onChange={v => updateAnswer('foreignCount', v)} />
      <div>
        <label className="text-sm text-[#1b2e1b]/70">年間採用予算</label>
        <select value={typeof answers.budget === 'string' ? answers.budget : ''} onChange={e => updateAnswer('budget', e.target.value)} className="w-full border-b border-[#e5e0d9] bg-transparent py-2 text-[#1b2e1b] focus:outline-none focus:border-[#1b2e1b]">
          <option value="">選択</option>
          <option>〜50万</option><option>50-100万</option><option>100-300万</option><option>300万以上</option>
        </select>
      </div>
      <InputField label="直近1年の離職者数（任意）" value={answers.turnover} onChange={v => updateAnswer('turnover', v)} />
      <button onClick={onNext} className="w-full bg-[#1b2e1b] text-white font-['Zen_Old_Mincho'] py-3 text-sm tracking-widest hover:bg-[#2d4a2d] transition-colors mt-8">次へ</button>
    </div>
  );
}

function Step2({ answers, updateAnswer, onNext, onPrev, errors, clearError }: StepProps) {
  return (
    <div className="space-y-8">
      <h2 className="font-serif font-light text-2xl text-[#1b2e1b] mb-4">採用体制チェック</h2>
      {hiringScoreQuestions.map((q: ScoringQuestion) => (
        <div key={q.id} className={`p-3 rounded-sm transition-colors ${errors[q.id] ? 'border-2 border-red-500' : 'border-2 border-transparent'}`}>
          <p className="text-sm text-[#1b2e1b]/80 mb-2">{q.text}</p>
          <div className="flex gap-2 flex-wrap">
            {q.options.map((opt: string, idx: number) => (
              <button key={idx} onClick={() => { updateAnswer(q.id, idx); clearError(q.id); }}
                className={`px-3 py-1 text-xs border transition-all ${answers[q.id] === idx ? 'border-[#1b2e1b] bg-[#1b2e1b]/5 text-[#1b2e1b] font-semibold' : 'border-[#e5e0d9] text-[#1b2e1b]/60'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="text-sm text-[#1b2e1b]/50 hover:text-[#1b2e1b] transition-colors">← 前のステップへ</button>
        <button onClick={onNext} className="bg-[#1b2e1b] text-white font-['Zen_Old_Mincho'] py-3 px-8 text-sm tracking-widest hover:bg-[#2d4a2d] transition-colors">次へ</button>
      </div>
    </div>
  );
}

function Step3({ answers, updateAnswer, onNext, onPrev, errors, clearError }: StepProps) {
  return (
    <div className="space-y-8">
      <h2 className="font-serif font-light text-2xl text-[#1b2e1b] mb-4">採用コスト・感覚値</h2>
      {hiringCostQuestions.map((q: CostQuestion) => (
        <div key={q.id} className={`p-3 rounded-sm transition-colors ${errors[q.id] ? 'border-2 border-red-500' : 'border-2 border-transparent'}`}>
          <p className="text-sm text-[#1b2e1b]/80 mb-2">{q.text}</p>
          <div className="flex gap-2 flex-wrap">
            {q.options.map((opt: string, idx: number) => (
              <button key={idx} onClick={() => { updateAnswer(q.id, opt); clearError(q.id); }}
                className={`px-3 py-1 text-xs border transition-all ${answers[q.id] === opt ? 'border-[#1b2e1b] bg-[#1b2e1b]/5 text-[#1b2e1b] font-semibold' : 'border-[#e5e0d9] text-[#1b2e1b]/60'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button onClick={onPrev} className="text-sm text-[#1b2e1b]/50 hover:text-[#1b2e1b] transition-colors">← 前のステップへ</button>
        <button onClick={onNext} className="bg-[#1b2e1b] text-white font-['Zen_Old_Mincho'] py-3 px-8 text-sm tracking-widest hover:bg-[#2d4a2d] transition-colors">診断結果を見る</button>
      </div>
    </div>
  );
}

function ResultScreen({ answers, onClose }: { answers: Record<string, any>; onClose: () => void }) {
  const score = calcHiringScore(answers);
  const level = getScoreLevel(score);
  const payload = {
    step1: { employeeCount: answers.employeeCount, contractCount: answers.contractCount, partTimeCount: answers.partTimeCount, foreignCount: answers.foreignCount, budget: answers.budget, turnover: answers.turnover },
    step2: { ...answers },
    step3: { ...answers },
    score,
    level,
  };

  return (
    <div className="text-center space-y-6">
      <p className="text-xs tracking-[0.2em] text-[#1b2e1b]">採用診断結果</p>
      <p className="text-6xl font-light text-[#1b2e1b]">{score}点</p>
      {score < 40 && <span className="inline-block px-3 py-1 text-xs rounded-full text-white bg-[#cf2b0e]">警告</span>}
      <p className="font-serif text-xl text-[#1b2e1b]">{level}</p>
      <LeadCaptureForm diagnosticType="hiring" payload={payload} onClose={onClose} />
    </div>
  );
}

export default function HiringDiagnosticModal({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState<StepNumber>(1);
  const [answers, setAnswers] = useState<Record<string, string | number | undefined>>({});
  const [showResume, setShowResume] = useState(false);
  const [saved, setSaved] = useState<SavedProgress | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      const data = loadProgress();
      if (data) { setSaved(data); setShowResume(true); }
      else resetState();
    }
  }, [isOpen]);

  const resetState = () => { setStep(1); setAnswers({}); setShowResume(false); setSaved(null); setErrors({}); };
  const handleResumeYes = () => { if (saved) { setAnswers(saved.answers); setStep(saved.currentStep as StepNumber); } setShowResume(false); };
  const handleResumeNo = () => { clearProgress(); resetState(); };

  const updateAnswer = (id: string, value: string | number) => {
    const updated = { ...answers, [id]: value };
    setAnswers(updated);
    saveProgress(step, updated);
  };

  const clearError = (id: string) => {
    if (errors[id]) {
      setErrors(prev => { const next = { ...prev }; delete next[id]; return next; });
    }
  };

  const handleNext = () => {
    if (step === 1) { if (answers.employeeCount !== undefined) { setErrors({}); setStep(2); } else setErrors({ employeeCount: true }); }
    else if (step === 2) {
      const newErrors: Record<string, boolean> = {};
      hiringScoreQuestions.forEach(q => { if (answers[q.id] === undefined) newErrors[q.id] = true; });
      if (Object.keys(newErrors).length === 0) { setErrors({}); setStep(3); } else setErrors(newErrors);
    }
    else if (step === 3) {
      const newErrors: Record<string, boolean> = {};
      hiringCostQuestions.forEach(q => { if (answers[q.id] === undefined) newErrors[q.id] = true; });
      if (Object.keys(newErrors).length === 0) { setErrors({}); setStep(4); clearProgress(); } else setErrors(newErrors);
    }
  };

  const handlePrev = () => { if (step > 1) setStep(prev => (prev - 1) as StepNumber); };
  const handleMainBack = () => { if (step === 1) onClose(); else handlePrev(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#fdfbf7] p-4">
      <div className="relative bg-[#fdfbf7] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-sm shadow-xl overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleMainBack} className="text-sm text-[#1b2e1b]/50 hover:text-[#1b2e1b] transition-colors">
              ← 前のページに戻る
            </button>
            <button onClick={onClose} className="text-[#1b2e1b]/40 hover:text-[#1b2e1b] text-2xl leading-none">
              ×
            </button>
          </div>

          {showResume ? (
            <div className="text-center py-12">
              <p className="font-serif text-xl text-[#1b2e1b] mb-4">前回の続きから再開しますか？</p>
              <p className="text-sm text-[#1b2e1b]/60 mb-8">Step {saved?.currentStep} まで入力されています。</p>
              <div className="flex justify-center gap-4">
                <button onClick={handleResumeYes} className="bg-[#1b2e1b] text-white font-['Zen_Old_Mincho'] px-8 py-2 text-sm tracking-widest hover:bg-[#2d4a2d] transition-colors">再開する</button>
                <button onClick={handleResumeNo} className="border border-[#e5e0d9] px-8 py-2 text-sm tracking-widest text-[#1b2e1b]/60 hover:border-[#1b2e1b]">最初からやり直す</button>
              </div>
            </div>
          ) : (
            <div>
              {step <= 3 && (
                <div className="text-sm text-[#1b2e1b]/60 font-medium tracking-wide mb-2">
                  Step {step} / 4
                </div>
              )}
              {step <= 3 && (
                <div className="w-full bg-[#e5e0d9] rounded-full h-1.5 mb-6">
                  <div
                    className="bg-[#1b2e1b] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              )}
              {step === 1 && <Step1 answers={answers} updateAnswer={updateAnswer} onNext={handleNext} errors={errors} clearError={clearError} />}
              {step === 2 && <Step2 answers={answers} updateAnswer={updateAnswer} onNext={handleNext} onPrev={handlePrev} errors={errors} clearError={clearError} />}
              {step === 3 && <Step3 answers={answers} updateAnswer={updateAnswer} onNext={handleNext} onPrev={handlePrev} errors={errors} clearError={clearError} />}
              {step === 4 && <ResultScreen answers={answers} onClose={onClose} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
