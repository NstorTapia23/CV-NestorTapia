"use client"

import { ScrollReveal } from "./scroll-reveal"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"

const skillCategories = [
  {
    key: "languages" as const,
    skills: ["C#", "JavaScript", "TypeScript", "SQL"],
  },
  {
    key: "backend" as const,
    skills: ["NestJS", "ASP.NET Core", "REST APIs", "JWT Auth"],
  },
  {
    key: "frontend" as const,
    skills: ["Next.js", "React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    key: "tools" as const,
    skills: ["Git", "GitHub", "Docker", "Linux", "Postman"],
  },
  {
    key: "databases" as const,
    skills: ["PostgreSQL", "SQLServer"],
  },
]

export function Skills() {
  const { lang } = useLang()
  const t = translations.skills

  return (
    <section id="skills" className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-bold mb-10">{t.title[lang]}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat) => (
            <div key={cat.key}>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t.categories[cat.key][lang]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
