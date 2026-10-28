# Codebase Structure

**Analysis Date:** 2026-10-27

## Directory Layout

```
CV-NestorTapia/
├── app/                        # Next.js App Router: routes, root layout, global CSS
│   ├── layout.tsx              # Root layout (server component), fonts, metadata
│   ├── page.tsx                # Route "/" (client component composing sections)
│   ├── globals.css             # Tailwind import, theme tokens, base styles
│   ├── favicon.ico
│   └── docs/                   # Reference docs (not routable)
│       ├── portfolio-spec.md   # Project specification (Spanish)
│       └── disenio.svg         # Design asset
├── components/                 # Flat folder of UI components (no subfolders)
├── lib/
│   └── i18n/                   # Language state and copy
│       ├── context.tsx         # I18nProvider, useLang
│       └── translations.ts     # Lang type, translations object
├── public/                     # Static files served from /
│   └── *.svg                   # Default create-next-app assets (unused in source)
├── .planning/codebase/         # Generated analysis documents (this folder)
├── .git/
├── .gitignore
├── README.md                   # Short project description (Spanish)
├── package.json                # Scripts and dependency manifest
├── pnpm-lock.yaml              # pnpm lockfile (committed)
├── pnpm-workspace.yaml         # pnpm build-script allowlist
├── next.config.ts              # Next.js config (empty)
├── tsconfig.json               # TypeScript config, "@/*" alias
├── eslint.config.mjs           # ESLint flat config
└── postcss.config.mjs          # PostCSS with Tailwind plugin
```

No `src/` directory, no `tests/` or `__tests__/`, no `api/` or `route.ts` files, no `.env` files, no `components.json`.

## Directory Purposes

**`app/`:**
- Purpose: routing and the app shell only.
- Contains: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`, and `docs/`.
- Rule: a new route is a new folder with `page.tsx` here. Do not place components here.

**`app/docs/`:**
- Purpose: planning and design reference.
- Contains: `portfolio-spec.md`, `disenio.svg`.
- Not served: no `page.tsx` or `route.ts` is present, so these files are not routes.

**`components/`:**
- Purpose: every visual component, one component per file.
- Contains: `hero.tsx`, `skills.tsx`, `experience.tsx`, `education.tsx`, `languages.tsx`, `contact.tsx` (sections); `nav-rail.tsx`, `language-toggle.tsx` (navigation); `scroll-reveal.tsx` (animation wrapper).
- Rule: flat structure. Add new files directly here.

**`lib/i18n/`:**
- Purpose: internationalization: language state and all copy.
- Contains: `context.tsx` (client provider and hook), `translations.ts` (data).
- Note: `lib/` is only used for this module; there are no utilities, API clients, or types elsewhere.

**`public/`:**
- Purpose: static files at the site root.
- Contains: five default SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). None is referenced by source files.

## Key File Locations

**Entry points:**
- `app/layout.tsx`: root layout, fonts, metadata, `I18nProvider`.
- `app/page.tsx`: home page, section order.

**Configuration:**
- `package.json`: scripts (`dev`, `build`, `start`, `lint`) and dependencies.
- `tsconfig.json`: strict mode, `@/*` path alias to repository root.
- `next.config.ts`: Next.js options (empty).
- `eslint.config.mjs`: `core-web-vitals` and TypeScript presets.
- `postcss.config.mjs`: `@tailwindcss/postcss`.
- `pnpm-workspace.yaml`: build-script allowlist for `sharp` and `unrs-resolver`.

**Core logic:**
- `lib/i18n/context.tsx`: `I18nProvider`, `useLang`, `localStorage` persistence.
- `lib/i18n/translations.ts`: every visible string, including experience, education, skills labels, and contact data.
- `components/nav-rail.tsx`: section list (`sections` array) and scroll-spy.
- `components/scroll-reveal.tsx`: reveal animation.

**Styling:**
- `app/globals.css`: theme tokens (`--background`, `--primary`, `--muted-foreground`, and others) mapped to Tailwind colors.

**Testing:**
- Not present.

## Naming Conventions

**Files:**
- Components: kebab-case `.tsx`, one per file: `components/nav-rail.tsx`, `components/language-toggle.tsx`, `components/scroll-reveal.tsx`.
- Next.js special files: lowercase `layout.tsx`, `page.tsx`, `globals.css`.
- Library modules: lowercase `context.tsx`, `translations.ts`.
- Config files: tool-default names with `.mjs` or `.ts` extensions.

**Components and functions:**
- Exported components use PascalCase named exports: `export function Hero()` in `components/hero.tsx`, `export function NavRail()` in `components/nav-rail.tsx`.
- Exception: `app/layout.tsx` and `app/page.tsx` use default exports (required by Next.js).
- Local helper components (icons) are PascalCase and not exported: `GitHubIcon`, `LinkedInIcon`.

**Hooks and context:**
- Hooks use the `use` prefix: `useLang` in `lib/i18n/context.tsx`.

**Types:**
- `Lang` type exported from `lib/i18n/translations.ts`; props interfaces are named `Props` locally (`components/scroll-reveal.tsx`) or `I18nContextType` (`lib/i18n/context.tsx`).

**Data keys:**
- Translation object keys are lowercase camelCase per section: `hero`, `about`, `skills`, `experience`, `education`, `languages`, `contact`. Language codes are `es` and `en`.

**Section IDs:**
- `id` values match the nav entries exactly: `home`, `skills`, `experience`, `education`, `languages`, `contact`. The `Hero` section uses `home`.

**Code style observed:**
- Double quotes in `.tsx` and `.ts` source; semicolons mostly omitted in `components/` and `lib/`, but `next.config.ts` and config files use semicolons.
- Imports use the `@/` alias for `lib/` (`@/lib/i18n/context`) and relative `./` for sibling components (`./scroll-reveal`).
- Tailwind classes are inline `className` strings; no CSS modules.

## Where to Add New Code

**New section (for example, Projects):**
- Component: `components/projects.tsx`, named export, `"use client"` only if it uses hooks or browser APIs.
- Wrap body in `<ScrollReveal>` and set `<section id="...">` for the nav.
- Add the section to `app/page.tsx` in the desired order.
- Add copy to `lib/i18n/translations.ts` under a new key with `{ es, en }` pairs.
- Add an entry (`{ id, icon }`) to the `sections` array in `components/nav-rail.tsx`.

**New translated string:**
- Add to the matching section in `lib/i18n/translations.ts`; access via `t.<key>[lang]`.

**New shared UI primitive:**
- `components/<name>.tsx` (kebab-case file, PascalCase export).

**Shared icons (recommended location):**
- `components/icons.tsx`, to replace the duplicated `GitHubIcon` and `LinkedInIcon` in `components/hero.tsx` and `components/contact.tsx`.

**New route or page:**
- `app/<route>/page.tsx`. Keep route files thin and import components from `components/`.

**GitHub-backed projects (per `app/docs/portfolio-spec.md`, not implemented):**
- A server-side data module would fit in `lib/` (for example `lib/github.ts`), called from a server component or route handler under `app/`. Neither exists yet. Calls from a client component would expose any token to the browser.

**Utilities:**
- No shared utilities folder exists. Create `lib/<name>.ts` for non-UI helpers.

**Static assets:**
- `public/` for files served by URL; `app/` for the favicon and docs.

## Special Directories

**`.planning/codebase/`:**
- Purpose: generated codebase analysis documents.
- Generated: yes (by mapping tools).
- Committed: not decided by this repository; `.gitignore` does not exclude it.

**`.next/` and `node_modules/`:**
- Purpose: build output and installed packages.
- Generated: yes.
- Committed: no; both are git-ignored (`/.next/`, `/node_modules`).

**`.git/`:**
- Purpose: version control. Current branch `main`.

---

*Structure analysis: 2026-10-27*
