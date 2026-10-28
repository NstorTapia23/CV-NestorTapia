"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

const ease = [0.22, 1, 0.36, 1] as const

export function ScrollReveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
