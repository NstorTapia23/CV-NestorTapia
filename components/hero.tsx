"use client";

import { useLang } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n/translations";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const { lang } = useLang();
  const t = translations;
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center py-20 overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative w-full"
      >
        <div className="max-w-2xl">
          <motion.div variants={item} className="mb-8">
            <div className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center text-3xl font-semibold text-primary-foreground mb-6">
              NT
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-primary"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                />
              )}
            </div>
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            Nestor Luis
            <br />
            <span className="text-muted-foreground">Tapia Triana</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="text-xl text-muted-foreground mb-6"
          >
            {t.hero.title[lang]}
          </motion.p>
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8"
          >
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> {t.contact.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" /> {t.contact.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {t.contact.location[lang]}
            </span>
            <a
              href={`https://github.com/${t.contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitHubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href={t.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" /> LinkedIn
            </a>
          </motion.div>
          <motion.h2 variants={item} className="text-2xl font-semibold mb-4">
            {t.hero.aboutLabel[lang]}
          </motion.h2>
          <motion.p
            variants={item}
            className="text-muted-foreground leading-relaxed max-w-xl"
          >
            {t.about.text[lang]}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
