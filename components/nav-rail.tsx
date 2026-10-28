"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Home, Code2, Briefcase, GraduationCap, Languages, Mail } from "lucide-react"
import { LanguageToggle } from "./language-toggle"
import { ThemeToggle } from "./theme-toggle"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"

const sections = [
  { id: "home", icon: Home },
  { id: "skills", icon: Code2 },
  { id: "experience", icon: Briefcase },
  { id: "education", icon: GraduationCap },
  { id: "languages", icon: Languages },
  { id: "contact", icon: Mail },
]

export function NavRail() {
  const [activeSection, setActiveSection] = useState("home")
  const reduce = useReducedMotion()
  const { lang } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 h-full w-14 border-r bg-background flex flex-col items-center py-4 z-50">
      <div className="mb-6">
        <span className="text-sm font-bold tracking-tight text-primary">NT</span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-3">
        {sections.map(({ id, icon: Icon }) => {
          const active = activeSection === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`group relative p-2 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={id}
              aria-current={active ? "location" : undefined}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative w-4 h-4" />
              <span
                role="tooltip"
                className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border bg-card px-2 py-1 text-xs text-card-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {translations.nav[id as keyof typeof translations.nav][lang]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </nav>
  )
}
