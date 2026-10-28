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

// Textos largos se animan como un bloque: letra por letra crearían miles de nodos
const LETTER_LIMIT = 60
const OUT_DURATION = 0.18

const stepFor = (length: number, budget: number) => Math.min(0.012, budget / Math.max(length, 1))

function Letters({ text, animation, step }: { text: string; animation: string; step: number }) {
  if (text.length > LETTER_LIMIT) {
    return <span className={`inline-block ${animation}`}>{text}</span>
  }

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

  // Cuando salen las letras viejas, entran las nuevas
  useEffect(() => {
    if (state.phase !== "out") return
    const step = stepFor(state.prev.length, 0.12)
    const wait = (OUT_DURATION + step * state.prev.length) * 1000
    const timer = setTimeout(() => setState((s) => ({ ...s, phase: "in" })), wait)
    return () => clearTimeout(timer)
  }, [state.phase, state.prev])

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  const animated = state.version > 0
  const shown = state.phase === "out" ? state.prev : text

  return (
    <span className={className} role="text" aria-label={shown}>
      <span aria-hidden>
        {state.phase === "out" ? (
          <Letters text={state.prev} animation={animated ? "lang-letter-out" : ""} step={stepFor(state.prev.length, 0.12)} />
        ) : (
          <Letters text={text} animation={animated ? "lang-letter-in" : ""} step={stepFor(text.length, 0.25)} />
        )}
      </span>
    </span>
  )
}
