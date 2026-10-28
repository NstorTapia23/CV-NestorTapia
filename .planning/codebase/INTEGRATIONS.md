# External Integrations

**Analysis Date:** 2026-10-27

## Summary

The application is a static-content portfolio. No runtime API calls, database connections, authentication, webhooks, or analytics were found in the source tree. All content is hard-coded in `lib/i18n/translations.ts`. The only external network dependencies are outbound links and the Google Fonts download performed at build time.

## APIs & External Services

**GitHub REST API (specified, NOT implemented):**
- `app/docs/portfolio-spec.md` states: "Los proyectos se obtienen mediante la API de GitHub. No utilizar datos estáticos." (projects must be fetched from the GitHub API, no static data).
- Verified: no `fetch(`, `octokit`, `api/` route, `route.ts`, or `process.env` reference exists in `app/`, `components/`, or `lib/`.
- The "Proyectos" section listed in the spec is absent. `app/page.tsx` renders only: `Hero`, `Skills`, `Experience`, `Education`, `Languages`, `Contact` (no `Projects` component exists in `components/`).
- Status: not implemented. Any project-listing work would start from scratch (no client, no types, no env var reference).

**Outbound links only (no SDK, no API calls):**
- GitHub profile: `https://github.com/NstorTapia` - built from `translations.contact.github` in `lib/i18n/translations.ts`; rendered as anchor tags in `components/hero.tsx` (line ~55) and `components/contact.tsx` (line ~53). Uses an inline SVG icon (`GitHubIcon`) defined in each file.
- LinkedIn profile - URL stored in `translations.contact.linkedin` (`lib/i18n/translations.ts`); rendered in `components/hero.tsx` (line ~63) and `components/contact.tsx` (line ~62). Uses an inline SVG icon (`LinkedInIcon`). The visible label in `contact.tsx` is hard-coded as `linkedin.com/in/néstor-tapia`, which differs in form from the stored URL.
- Mail and telephone links: `mailto:` and `tel:` anchors built from `translations.contact.email` and `translations.contact.phone` in `components/contact.tsx`.
- All external anchors use `target="_blank" rel="noopener noreferrer"`.

**Design system:**
- `shadcn/ui` is named in `app/docs/portfolio-spec.md` but not used: no `components.json`, no `components/ui/` directory, no `@radix-ui/*` dependencies.

## Fonts

**Google Fonts via `next/font/google`:**
- Geist (sans) - `app/layout.tsx`: `Geist({ variable: "--font-geist-sans", subsets: ["latin"] })`
- Geist Mono - `app/layout.tsx`: `Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })`
- Both are self-hosted by Next at build time; the CSS variables are applied to `<html>` and mapped to `--font-sans` / `--font-mono` in `app/globals.css`.
- Network access to Google Fonts is required during `next build` / font resolution.

## Data Storage

**Databases:**
- Not applicable. No database client, ORM, or connection string is present.

**File Storage:**
- Local filesystem only, read-only static assets: `public/*.svg` (default create-next-app files, not referenced in source), `app/favicon.ico`, `app/docs/disenio.svg` (documentation asset).

**Caching:**
- None. No service worker, no `localStorage` caching of remote data.

**Browser storage (client only):**
- `localStorage` key `"lang"` stores the selected language (`"es"` or `"en"`). Read and written in `lib/i18n/context.tsx` (`I18nProvider`). Only the language preference is persisted; the value is validated against `"es" | "en"` on read.

## Authentication & Identity

- Not applicable. No auth provider, sessions, cookies, or protected routes.

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry or similar SDK).

**Analytics:**
- None detected (no Google Analytics, Vercel Analytics, or tracking script in `app/layout.tsx`).

**Logs:**
- No logging library. No `console.*` calls were found in application source.

## CI/CD & Deployment

**Hosting:**
- Not configured in the repository. `.vercel` is listed in `.gitignore`, which suggests a Vercel deployment, but no `vercel.json` or project link file is committed.

**CI Pipeline:**
- None detected. No `.github/workflows/`, no `.gitlab-ci.yml`, no Dockerfile.

## Environment Configuration

**Required env vars:**
- None. No `process.env` references exist in application code. No `.env` file is present in the repository root.

**Secrets location:**
- Not applicable. The app contains no secrets. Personal contact data (email, phone, GitHub handle, LinkedIn URL) is stored in plain text in `lib/i18n/translations.ts` and is public by design.

## Webhooks & Callbacks

**Incoming:**
- None. No route handlers or API endpoints exist under `app/`.

**Outgoing:**
- None. The app makes no programmatic outbound requests.

---

*Integration audit: 2026-10-27*
