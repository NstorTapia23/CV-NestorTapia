"use client"

import { useEffect, useState } from "react"
import { Home, Code2, Briefcase, GraduationCap, Languages, Mail } from "lucide-react"
import { LanguageToggle } from "./language-toggle"

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
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 h-full w-14 border-r bg-background flex flex-col items-center py-4 z-50">
      <div className="mb-6">
        <span className="text-sm font-bold tracking-tight text-primary">NT</span>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4">
        {sections.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`p-2 rounded-lg transition-colors ${
              activeSection === id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            aria-label={id}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      <LanguageToggle />
    </nav>
  )
}
