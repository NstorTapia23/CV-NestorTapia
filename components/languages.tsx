"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"

export function Languages() {
  const { lang } = useLang()
  const t = translations.languages

  return (
    <section id="languages" className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-bold mb-10">{t.title[lang]}</h2>
        <div className="space-y-3 max-w-md">
          {t.items.map((item, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-medium">{item.language[lang]}</span>
              <span className="text-muted-foreground">—</span>
              <span className="text-sm text-muted-foreground">{item.level[lang]}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
