"use client"

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-14 right-0 h-0.5 origin-left bg-primary z-40"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  )
}
