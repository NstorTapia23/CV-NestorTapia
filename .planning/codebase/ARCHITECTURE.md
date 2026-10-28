<!-- refreshed: 2026-10-27 -->
# Architecture

**Analysis Date:** 2026-10-27

## Pattern Overview

**Overall:** Single-route Next.js 16 App Router application. A server-rendered root layout wraps one client page (`app/page.tsx`) that composes independent section components. All content is static, bilingual (es/en), and lives in one typed object.

**Key Characteristics:**
- One route (`/`). No route handlers, server actions, or data fetching.
- Copy is hard-coded in `lib/i18n/translations.ts`; there is no CMS, API, or database.
- Language is global client state (`I18nProvider`), persisted to `localStorage`.
- Each section reads `lang` via `useLang()` and renders `translations.<section>[lang]`.
- Scroll behavior is client-side: `IntersectionObserver` for the sidebar highlight, framer-motion `useInView` for reveal animations.
- Styling is Tailwind v4 utilities over CSS variables in `app/globals.css`.

## System Overview

```text
app/layout.tsx  (SERVER)  fonts, metadata, <html lang="en">
└── I18nProvider  lib/i18n/context.tsx  (CLIENT)
    └── app/page.tsx  (CLIENT, route "/")
        ├── NavRail  components/nav-rail.tsx  (fixed left rail, w-14)
        │   └── LanguageToggle  components/language-toggle.tsx
        └── <main class="ml-14">
            ├── Hero        components/hero.tsx        #home
            ├── Skills      components/skills.tsx      #skills
            ├── Experience  components/experience.tsx  #experience
            ├── Education   components/education.tsx   #education
            ├── Languages   components/languages.tsx   #languages
            └── Contact     components/contact.tsx     #contact
                (every section body wrapped in ScrollReveal, components/scroll-reveal.tsx)

Shared data: lib/i18n/translations.ts  (translations object, type Lang)
```

## Layers

**Root shell:**
- Location: `app/layout.tsx`
- Contains: `RootLayout`, `metadata` export (title "Nestor Tapia | Portfolio"), Geist font instances.
- Depends on: `next/font/google`, `app/globals.css`, `lib/i18n/context.tsx`.

**Page composition:**
- Location: `app/page.tsx`
- Contains: `Home`, which renders `NavRail` and the six sections inside `<main class="ml-14">`.
- Depends on: `components/*`.

**Sections (presentation):**
- Location: `components/hero.tsx`, `skills.tsx`, `experience.tsx`, `education.tsx`, `languages.tsx`, `contact.tsx`
- Depends on: `useLang` (`lib/i18n/context.tsx`), `translations` (`lib/i18n/translations.ts`), `ScrollReveal`, `lucide-react`.

**Navigation:**
- Location: `components/nav-rail.tsx`, `components/language-toggle.tsx`
- Depends on: section DOM IDs; `useLang` (toggle only).

**Primitive:**
- Location: `components/scroll-reveal.tsx`
- Depends on: `framer-motion` (`motion`, `useInView`). Used by every section.

**i18n state:**
- Location: `lib/i18n/context.tsx` (provider and `useLang` hook), `lib/i18n/translations.ts` (data and `Lang` type).
- Depends on: React context, `localStorage`.

**Styling:**
- Location: `app/globals.css`, `postcss.config.mjs`
- Contains: `@import "tailwindcss"`, `@theme inline` mapping `--color-*` and `--font-*` to CSS variables, a light-only `:root` palette, and `html { scroll-behavior: smooth; }`.

## Data Flow

### Language selection

1. `I18nProvider` (`lib/i18n/context.tsx`) initializes `lang` in a `useState` initializer. When `window` exists it reads `localStorage.getItem("lang")` and accepts only `"es"` or `"en"`; otherwise it defaults to `"es"`.
2. `LanguageToggle` (`components/language-toggle.tsx`) calls `setLang("es" | "en")`.
3. `handleSetLang` in `lib/i18n/context.tsx` updates state and writes `localStorage["lang"]`.
4. The context value `{ lang, setLang }` re-renders every consumer.

### Content rendering

1. A section imports the `translations` constant (module-level, no fetch).
2. It reads `lang` from `useLang()` and selects strings with `t.title[lang]`, `item.role[lang]`, and so on.
3. Arrays such as `translations.experience.items` are mapped to markup. Technology tags are plain strings in the same object.

### Section reveal

1. `ScrollReveal` calls `useInView(ref, { once: true, margin: "-100px" })`.
2. On entry, `animate` changes from `{ opacity: 0, y: 40 }` to `{ opacity: 1, y: 0 }` (0.6s, `easeOut`).
3. `once: true` means the reveal does not reverse.

### Active section highlight

1. `NavRail` (`components/nav-rail.tsx`) creates one `IntersectionObserver` in `useEffect` with `rootMargin: "-50% 0px -50% 0px"`, so the element crossing the viewport's vertical midline is treated as active.
2. Targets are resolved with `document.getElementById` for `home`, `skills`, `experience`, `education`, `languages`, `contact`.
3. Intersecting entries set `activeSection`, which switches the button class to `text-primary bg-primary/10`.
4. Button clicks call `scrollIntoView({ behavior: "smooth" })`. The observer disconnects on unmount.

**State management:**
- Global: `lang` only (React context, mirrored to `localStorage`).
- Local: `activeSection` in `NavRail`; `isInView` inside `ScrollReveal`.
- No Redux, Zustand, or server state.

## Key Abstractions

**`translations` object and `Lang` type:**
- Purpose: single source of truth for all copy. Strings are `{ es, en }` pairs, or arrays of such objects.
- Location: `lib/i18n/translations.ts` (exports `Lang`, `translations`, `TranslationKeys`).

**`useLang()` hook:**
- Purpose: read `{ lang, setLang }` below `I18nProvider`.
- Location: `lib/i18n/context.tsx`. Throws `"useLang must be used within I18nProvider"` outside the provider.

**`ScrollReveal`:**
- Purpose: reusable reveal-on-scroll wrapper accepting `children` and `className`.
- Location: `components/scroll-reveal.tsx`. `Hero` wraps only its inner `div`, while the other sections wrap their heading and body.

**Inline brand icons:**
- `GitHubIcon` and `LinkedInIcon` are local SVG function components, duplicated in `components/hero.tsx` and `components/contact.tsx`.

## Entry Points

- `app/layout.tsx`: root layout for every request; sets fonts, metadata, and `I18nProvider`.
- `app/page.tsx`: the `/` route.
- `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`: build and tooling config.
- `app/docs/portfolio-spec.md` and `app/docs/disenio.svg`: reference documents. Files under `app/` without `page.tsx` or `route.ts` are not served as routes.

## Client / Server Boundaries

**Server (no directive):** `app/layout.tsx` only.

**Client (`"use client"` at top):** `app/page.tsx`, `lib/i18n/context.tsx`, `components/nav-rail.tsx`, `components/language-toggle.tsx`, `components/scroll-reveal.tsx`, `components/hero.tsx`, `components/skills.tsx`, `components/experience.tsx`, `components/education.tsx`, `components/languages.tsx`, `components/contact.tsx`.

**Boundary notes:**
- `RootLayout` (server) renders `I18nProvider` (client) with server-rendered `children`.
- Because `app/page.tsx` is a client component, the page body is client-rendered after hydration. The server HTML still contains each component's initial render.
- `I18nProvider` reads `localStorage` during its initial render on the client. The server renders `"es"`, so a user with a stored `"en"` gets a first client render that differs from the server HTML. The code has no guard for this, so a hydration mismatch is possible.

## Architectural Constraints

- **Threading:** single-threaded browser event loop. No workers. Server code is limited to the layout.
- **Global state:** `I18nContext` in `lib/i18n/context.tsx` and the `translations` constant in `lib/i18n/translations.ts`.
- **Browser-only APIs:** `localStorage` (`lib/i18n/context.tsx`), `IntersectionObserver` and `document` (`components/nav-rail.tsx`). Keep them out of server-executed paths.
- **Circular imports:** none detected. Direction is `app/page.tsx` → `components/*` → `lib/i18n/*`, and `components/*` → `components/scroll-reveal.tsx`.
- **DOM ID contract:** `NavRail` depends on `id` values set on each `<section>`. Renaming an ID requires updating `sections` in `components/nav-rail.tsx`.
- **Light theme only:** `:root` in `app/globals.css` has no dark variant.
- **Document language:** `app/layout.tsx` hard-codes `<html lang="en">` while the default visible language is `"es"`.

## Anti-Patterns

### Duplicated brand icons
**What happens:** `GitHubIcon` and `LinkedInIcon` are copy-pasted in `components/hero.tsx` and `components/contact.tsx`, and the LinkedIn path data already differs between them.
**Why it's wrong:** the copies drift out of sync.
**Do this instead:** move both into one shared module (for example `components/icons.tsx`) and import from there.

### Visible text not derived from translations
**What happens:** `components/contact.tsx` renders the literal label `linkedin.com/in/néstor-tapia`, while its `href` comes from `translations.contact.linkedin`. The `skillCategories` array in `components/skills.tsx` is also defined inline rather than in `lib/i18n/translations.ts`.
**Why it's wrong:** editing the URL in translations does not update the label, and data is split across two files.
**Do this instead:** derive the label from the translations value and keep content arrays in `lib/i18n/translations.ts`.

### Page-wide client boundary
**What happens:** `app/page.tsx` is `"use client"` only because `NavRail` needs state, so all static section markup is client-rendered.
**Why it's wrong:** larger client bundle and no server rendering benefit for static sections.
**Do this instead:** keep `page.tsx` as a server component and isolate interactive parts (`NavRail`, `ScrollReveal`, `LanguageToggle`) as client leaves.

## Error Handling

- `useLang` throws when used outside `I18nProvider`.
- `NavRail` null-checks DOM lookups (`if (el) ...`).
- The stored language is validated before use; invalid values fall back to `"es"`.
- No error boundaries. `localStorage` access is not wrapped in `try/catch`, so a browser with storage disabled would throw in the provider.

## Cross-Cutting Concerns

- **Logging:** none. No `console` calls in application source.
- **Validation:** only the stored language value. No forms; contact uses `mailto:` and `tel:` links.
- **Accessibility:** rail buttons use `aria-label={id}` (internal IDs such as `home`, not translated labels), in `components/nav-rail.tsx`.
- **i18n routing:** manual and client-only. No `[lang]` URL segment and no i18n library.

---

*Architecture analysis: 2026-10-27*
