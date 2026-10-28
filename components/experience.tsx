"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"
import { LangText } from "./lang-text"

export function Experience() {
  const { lang } = useLang()
  const t = translations.experience

  return (
    <section id="experience" className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-bold mb-10"><LangText text={t.title[lang]} /></h2>
        <div className="space-y-10">
          {t.items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group relative pl-8 border-l-2 border-border transition-transform duration-300 hover:translate-x-1">
              <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl font-semibold"><LangText text={item.role[lang]} /></h3>
                  <span className="text-sm text-muted-foreground">— <LangText text={item.company[lang]} /></span>
                </div>
                <p className="text-sm text-muted-foreground"><LangText text={item.period[lang]} /></p>
                <p className="text-muted-foreground leading-relaxed"><LangText text={item.description[lang]} /></p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground border transition-colors hover:border-primary/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
