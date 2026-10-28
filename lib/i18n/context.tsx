"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Lang } from "./translations"

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang") as Lang | null
      if (stored === "es" || stored === "en") return stored
    }
    return "es"
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem("lang", l)
  }

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLang() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useLang must be used within I18nProvider")
  return context
}
