"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"

export function Experience() {
  const { lang } = useLang()
  const t = translations.experience

  return (
    <section id="experience" className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-bold mb-10">{t.title[lang]}</h2>
        <div className="space-y-10">
          {t.items.map((item, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-border">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl font-semibold">{item.role[lang]}</h3>
                  <span className="text-sm text-muted-foreground">— {item.company[lang]}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.period[lang]}</p>
                <p className="text-muted-foreground leading-relaxed">{item.description[lang]}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
