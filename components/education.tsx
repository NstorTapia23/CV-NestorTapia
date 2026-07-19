"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"
import { GraduationCap } from "lucide-react"

export function Education() {
  const { lang } = useLang()
  const t = translations.education
  const item = t.items[0]

  return (
    <section id="education" className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-bold mb-10">{t.title[lang]}</h2>
        <div className="flex gap-4 p-6 rounded-xl border bg-card">
          <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{item.degree[lang]}</h3>
            <p className="text-sm text-muted-foreground">{item.institution[lang]}</p>
            <p className="text-muted-foreground leading-relaxed">{item.description[lang]}</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
