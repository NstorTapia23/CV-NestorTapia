"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"
import { LangText } from "./lang-text"

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
  {
    key: "ai" as const,
    skills: ["Claude Code", "OpenCode", "Skills", "AGENTS.md"],
  },
]

export function Skills() {
  const { lang } = useLang()
  const t = translations.skills
  const reduce = useReducedMotion()

  return (
    <section id="skills" className="py-20">
      <ScrollReveal>
        <h2 className="text-3xl font-bold mb-10"><LangText text={t.title[lang]} /></h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.key} delay={i * 0.08}>
              <h3 className="text-lg font-semibold mb-3">
                <LangText text={t.categories[cat.key][lang]} />
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 + j * 0.05 }}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground border transition-colors hover:border-primary/40"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
