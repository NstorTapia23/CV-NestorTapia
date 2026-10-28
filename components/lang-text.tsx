"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface Props {
  text: string
  className?: string
}

interface State {
  text: string
  prev: string
  phase: "out" | "in"
  version: number
}

// Cada letra recibe un retraso propio: la salida y la entrada recorren el texto en cascada
const stepFor = (length: number) => Math.min(0.02, 0.6 / Math.max(length, 1))
const OUT_DURATION = 0.25

function Letters({ text, animation, step }: { text: string; animation: string; step: number }) {
  let index = 0
  const words = text.split(" ")

  return (
    <>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((char) => {
            const i = index++
            return (
              <span
                key={i}
                className={`inline-block ${animation}`}
                style={{ animationDelay: `${i * step}s` }}
              >
                {char}
              </span>
            )
          })}
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  )
}

export function LangText({ text, className }: Props) {
  const reduce = useReducedMotion()
  const [state, setState] = useState<State>({ text, prev: text, phase: "in", version: 0 })

  // Al cambiar el texto empieza la fase de salida con el texto anterior
  if (state.text !== text) {
    setState({ text, prev: state.text, phase: "out", version: state.version + 1 })
  }

  // Cuando terminan de salir las letras viejas, entran las nuevas
  useEffect(() => {
    if (state.phase !== "out") return
    const step = stepFor(state.prev.length)
    const wait = (state.prev.length * step + OUT_DURATION) * 1000
    const timer = setTimeout(() => setState((s) => ({ ...s, phase: "in" })), wait)
    return () => clearTimeout(timer)
  }, [state.phase, state.prev])

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  const animated = state.version > 0

  return (
    <span className={className} role="text" aria-label={state.phase === "out" ? state.prev : text}>
      <span aria-hidden>
        {state.phase === "out" ? (
          <Letters
            text={state.prev}
            animation={animated ? "lang-letter-out" : ""}
            step={stepFor(state.prev.length)}
          />
        ) : (
          <Letters
            text={text}
            animation={animated ? "lang-letter-in" : ""}
            step={stepFor(text.length)}
          />
        )}
      </span>
    </span>
  )
}
