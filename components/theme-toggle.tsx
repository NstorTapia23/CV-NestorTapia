"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { useLang } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"

type Theme = "light" | "dark"

function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme
  if (attr === "light" || attr === "dark") return attr
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

// Escucha cambios del atributo data-theme y del sistema operativo
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
  media.addEventListener("change", onChange)
  return () => {
    observer.disconnect()
    media.removeEventListener("change", onChange)
  }
}

export function ThemeToggle() {
  const { lang } = useLang()
  const t = translations.theme
  // En el servidor no conocemos el tema; el icono aparece al hidratar
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null)

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Sin almacenamiento disponible, el cambio dura solo esta visita
    }
  }

  const label = theme === "dark" ? t.toLight[lang] : t.toDark[lang]
  const Icon = theme === "dark" ? Sun : Moon

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
    >
      {theme && <Icon className="w-4 h-4" />}
    </button>
  )
}
