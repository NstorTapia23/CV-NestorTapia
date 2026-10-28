"use client"

import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"
import { GitHubIcon } from "./contact"
import { LangText } from "@/components/lang-text"

export function Footer() {
  const { lang } = useLang()
  const t = translations
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t py-8 text-sm text-muted-foreground">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-foreground">Nestor Luis Tapia Triana</p>
          <p><LangText text={t.footer.rights[lang]} /> · © {year}</p>
        </div>
        <a
          href={`https://github.com/${t.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <GitHubIcon className="w-4 h-4" />
          github.com/{t.contact.github}
        </a>
      </div>
    </footer>
  )
}
