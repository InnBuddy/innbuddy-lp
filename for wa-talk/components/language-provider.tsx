'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { DICT, type Lang } from '@/lib/content'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (typeof DICT)['ja']
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ja')
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: DICT[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
