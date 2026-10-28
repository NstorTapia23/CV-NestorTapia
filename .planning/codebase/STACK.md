# Technology Stack

**Analysis Date:** 2026-10-27

## Languages

**Primary:**
- TypeScript ^5 (resolved 5.9.3 in `pnpm-lock.yaml`) - all application code: `app/layout.tsx`, `app/page.tsx`, `components/*.tsx`, `lib/i18n/context.tsx`, `lib/i18n/translations.ts`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`
- TSX (React JSX via `"jsx": "react-jsx"` in `tsconfig.json`) - all UI components

**Secondary:**
- CSS (Tailwind v4 directives + plain CSS variables) - `app/globals.css`
- Markdown - `app/docs/portfolio-spec.md` (project specification, not consumed by the build)
- SVG - `app/docs/disenio.svg` (design reference), `public/*.svg` (default create-next-app assets, not referenced by any source file)

## Runtime

**Environment:**
- Node.js: minimum **>=20.9.0**, inherited from the `next` 16.2.10 `engines` field in `pnpm-lock.yaml`. No `.nvmrc`, `.node-version`, or `engines` field in `package.json`. Type definitions are `@types/node` ^20 (resolved 20.19.43).
- Browser runtime: React 19 client components. Most of the page is client-rendered (see `ARCHITECTURE.md`).

**Package Manager:**
- pnpm (lockfile `pnpm-lock.yaml`, `lockfileVersion: '9.0'`) - present and committed
- Workspace file: `pnpm-workspace.yaml` (no packages list; only `allowBuilds` for `sharp: true` and `unrs-resolver: true`, plus `ignoredBuiltDependencies` for the same two)
- No `package-lock.json` or `yarn.lock` present.

## Frameworks

**Core:**
- Next.js 16.2.10 (exact pin in `package.json`) - App Router framework, build and dev server (`next dev`, `next build`, `next start` scripts)
- React 19.2.4 and react-dom 19.2.4 (exact pins) - UI rendering
- Tailwind CSS ^4 (resolved 4.3.3) - utility styling, loaded via `@import "tailwindcss";` in `app/globals.css`
- lucide-react ^1.25.0 (resolved 1.25.0) - icon set used in `components/nav-rail.tsx`, `components/hero.tsx`, `components/contact.tsx`, `components/education.tsx`

**Animation:**
- framer-motion ^12.42.2 (lockfile resolves 12.34.3) - the only motion library actually imported: `components/scroll-reveal.tsx` (`motion`, `useInView`)
- framer ^3.0.4 - declared in `package.json` `dependencies` but no source file imports it

**Testing:**
- Not detected. No test runner, no test files, no test script in `package.json`.

**Build/Dev:**
- TypeScript ^5 - type checking only (`"noEmit": true` in `tsconfig.json`)
- `@tailwindcss/postcss` ^4 - PostCSS plugin, configured in `postcss.config.mjs`
- ESLint ^9 (resolved 9.39.5) with `eslint-config-next` 16.2.10 - linting via `eslint.config.mjs` (flat config)
- Next.js compiler (SWC, implicit in Next 16) - no custom Babel config detected

## Key Dependencies

**Critical:**
- `next` 16.2.10 - routing, rendering, font loading (`next/font/google`), metadata API. Every other part of the app depends on it.
- `react` / `react-dom` 19.2.4 - component model; context API used for i18n.
- `framer-motion` ^12.42.2 - scroll-triggered fade/slide animations (`components/scroll-reveal.tsx`).
- `lucide-react` ^1.25.0 - all navigation and contact icons.
- `tailwindcss` ^4 with `@tailwindcss/postcss` ^4 - all styling; theme tokens defined with `@theme inline` in `app/globals.css`.

**Infrastructure:**
- `eslint-config-next` 16.2.10 with `eslint/config` (`defineConfig`, `globalIgnores`) - lint rules `core-web-vitals` and `typescript` presets.
- `@types/react` ^19, `@types/react-dom` ^19, `@types/node` ^20 - type definitions.
- `sharp` (0.34.5) - optional dependency of `next` in `pnpm-lock.yaml`; `unrs-resolver` (1.12.2) is a transitive dependency. Neither is a direct dependency; both appear in `allowBuilds` / `ignoredBuiltDependencies` in `pnpm-workspace.yaml`.

## Configuration

**Environment:**
- No `.env*` files present in the repository root. `.gitignore` excludes `.env*.local` and `.env`.
- No environment variables are read by application code (no `process.env` references in `app/`, `components/`, or `lib/`).

**TypeScript (`tsconfig.json`):**
- `strict: true`, `target: "ES2017"`, `module: "esnext"`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `isolatedModules: true`, `incremental: true`, `noEmit: true`
- Path alias: `"@/*": ["./*"]` - used as `@/lib/i18n/context`, `@/components/...`
- Next plugin registered: `"plugins": [{ "name": "next" }]`
- `include` covers `**/*.ts`, `**/*.tsx`, `.next/types/**` and `next-env.d.ts`

**Next.js (`next.config.ts`):**
- Default config. The `nextConfig` object is empty (only a commented placeholder). No redirects, rewrites, headers, image domains, or experimental flags.

**Lint (`eslint.config.mjs`):**
- Flat config composing `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

**PostCSS (`postcss.config.mjs`):**
- Single plugin: `"@tailwindcss/postcss": {}`

**Build:**
- No Dockerfile, no CI workflow files, no `vercel.json` detected. `.vercel` is git-ignored, so Vercel deployment is implied but not configured in the repo.

## Platform Requirements

**Development:**
- Node.js >=20.9.0 (required by Next 16.2.10)
- pnpm installed; run `pnpm install`, then `pnpm dev`
- Network access required at build time: `next/font/google` downloads Geist and Geist Mono

**Production:**
- Next.js server or static hosting. No deployment target is configured in the repository.

---

*Stack analysis: 2026-10-27*
