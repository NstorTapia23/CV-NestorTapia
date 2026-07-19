"use client"

import { useLang } from "@/lib/i18n/context"

export function LanguageToggle() {
  const { lang, setLang } = useLang()

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={() => setLang("es")}
        className={`w-8 h-5 text-[10px] rounded font-medium transition-colors ${
          lang === "es" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLang("en")}
        className={`w-8 h-5 text-[10px] rounded font-medium transition-colors ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
    </div>
  )
}
