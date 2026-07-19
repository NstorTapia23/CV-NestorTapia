"use client"

import { NavRail } from "@/components/nav-rail"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Languages } from "@/components/languages"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavRail />

      <main className="ml-14">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Hero />
          <Skills />
          <Experience />
          <Education />
          <Languages />
          <Contact />
        </div>
      </main>
    </div>
  )
}
