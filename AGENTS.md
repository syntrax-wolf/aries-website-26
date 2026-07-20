<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `pnpm dlx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Project Context (aries-website-26)

Durable notes for anyone (human or agent) picking up this project.

### What this is
A blank **TanStack Start** app (React, file-based routing, SSR). Scaffolded fresh
with no partner integrations or feature add-ons — just the default starter, so it
serves as a clean base to build the Aries website on.

### How it was scaffolded (exact commands)
```bash
# 1. Scaffold (run once; created a `my-tanstack-app/` folder that was then
#    flattened into this repo root, since the repo was empty).
npx @tanstack/cli@latest create my-tanstack-app --agent --package-manager pnpm --tailwind

# 2. Wire up / refresh TanStack Intent skill mappings in AGENTS.md
npx @tanstack/intent@latest install

# 3. List available local TanStack Intent skills
npx @tanstack/intent@latest list
```
Notes:
- `--tailwind` is now **deprecated and ignored** — Tailwind (v4) is always on in
  TanStack Start scaffolds.
- The CLI creates a named subfolder; here it was `my-tanstack-app`, which was
  moved up so this repo root *is* the app. No files were dropped.

### Stack & toolchain
- **Framework:** TanStack Start + TanStack Router (file-based routes in `src/routes/`)
- **UI:** React 19, Tailwind CSS v4 (`@tailwindcss/vite`), `@tailwindcss/typography`, `lucide-react` icons
- **Build:** Vite 8 (`vite.config.ts` wires `devtools`, `tailwindcss`, `tanstackStart`, `viteReact`)
- **Language:** TypeScript 6 (path alias `#/*` → `./src/*`)
- **Testing:** Vitest 4 + Testing Library + jsdom (`pnpm test`)
- **Devtools:** `@tanstack/react-devtools` (stripped from production builds automatically)
- **Package manager:** pnpm
- **Integrations/add-ons:** none — blank starter as requested.

### Scripts
- `pnpm dev` — dev server on http://localhost:3000
- `pnpm build` — production build (client + SSR bundles into `dist/`)
- `pnpm preview` — preview the production build
- `pnpm test` — run Vitest once
- `pnpm generate-routes` — regenerate `src/routeTree.gen.ts` (usually automatic)

### Environment variables
- **None required** to run the blank starter today.
- When adding any: client-exposed vars **must** be prefixed `VITE_`; anything
  without that prefix stays server-only. Put local values in `.env` (already
  gitignored). Load the `start-core/execution-model` intent skill before wiring
  env vars so client/server boundaries are handled correctly.

### Deployment
- Default target is a Node SSR server (`dist/server/server.js` after `pnpm build`).
- For other targets (Cloudflare Workers, Netlify, Vercel, Bun, static/SPA), load
  the `@tanstack/start-client-core#start-core/deployment` intent skill first — it
  documents the per-host config. Not configured yet.

### Key decisions
- Repo flattened so the TanStack app lives at the root (no nested app folder).
- Kept the generated project structure intact (`src/routes`, `src/components`,
  `src/router.tsx`, `src/styles.css`).
- Use TanStack **Intent** skills (`intent list` → `intent load`) before any
  library-specific or architectural change instead of guessing patterns.

### Known gotchas
- Running `npx @tanstack/intent@latest install` (v0.3.5) **overwrote** the richer
  ~14 KB AGENTS.md the `create` CLI had generated, replacing it with the minimal
  skill-loading block above. The `intent list`/`intent load` workflow is the
  durable path for per-library guidance, so the mappings weren't lost — but don't
  expect the detailed inline mappings the CLI first wrote.
- pnpm warns that the `pnpm.onlyBuiltDependencies` field in `package.json` is no
  longer read; harmless. Native deps `esbuild`/`lightningcss` still build fine.
- `--tailwind` flag is deprecated/ignored (see above).

### Figma
- Design file: https://www.figma.com/design/B8nZo0h4lzjN5zm8pO0Xmr/aries-copy-website
  (file key `B8nZo0h4lzjN5zm8pO0Xmr`, single page "Page 1").
- **Access status: OK** via the Figma MCP (authenticated as `devanshkandpal54@gmail.com`).
- **Rate limit:** the account is on the Figma **Starter** plan — MCP tool calls
  (`get_screenshot`, `get_design_context`, …) are capped and exhaust quickly. Batch
  carefully; the full page metadata XML is cached at
  `.claude/.../tool-results/…get_metadata….txt` and can be mined without new calls.
- **Full page-by-page plan → [`docs/PAGES.md`](docs/PAGES.md).** Read it before
  building any page.
- The file is a **working design doc**, not a clean handoff: it mixes a primary
  design system, a secondary "Design Ideas" exploration cluster, duplicate
  iterations, and embedded designer notes. See `docs/PAGES.md §0`.

## Design Language (ARIES)

**⚠ 2026 landing redesign.** The `/` home page was rebuilt from scratch on a new
direction: **cream body + violet `#5b28d9` accent + deep-navy `#171343` type**, a
cinematic parallax hero (sunset sky `public/background.png` + SVG mountains + antelope
on a cliff), lavender FAQ section, and a purple-mountain footer. The light/dark theme
toggle was **removed** (single light theme). Tokens: `--color-accent` (violet),
`--color-accent-soft`, `--color-lavender`, `--color-navy`, `--color-cream` in
`src/styles.css` `@theme`. See `docs/PAGES.md §2.1` for the full landing spec.
**Inner pages** (`/events`, `/projects`, `/team`, `/contact`, `/alumni`, `/about`)
still use the older cream+navy+light-blue system below and were NOT re-skinned — they
share the new violet tokens only via `--color-accent`/`.tag`. Migrate them next.

The older canonical system (still governing inner pages) was the cream + navy + Inter
direction. A lighter "exploration" style also exists for Contact/Alumni/Profile
— treat it as secondary until the team decides to unify (see `docs/PAGES.md §0`).

### Color palette
Two sources: swatches the designer declared, and the values actually used on the
built screens. Prefer the **as-built** values; they're what the primary screens use.

| Role | Declared swatch | As-built (primary screens) |
|---|---|---|
| Deep navy (brand, nav bar, headings, wordmark) | `#0B1957` (DARK 1) | `#121854` |
| Cream / page background | `#F8F3EA` (LIGHT 2) | `#f9f3ec` |
| Light blue (accent: underlines, pill tint) | `#9ECCFA` (LIGHT 1) | `#a9cbf7` |
| Teal (secondary accent) | `#36D8C7` (DARK 2) | — (declared, rarely used yet) |
| Body text | — | `#000000` on cream; `#ffffff` on navy |
| Pill background | — | `rgba(169,203,247,0.28)` (light-blue @ 28%) |

**Implemented** as Tailwind v4 `@theme` tokens in `src/styles.css`
(`--color-navy`, `--color-cream`, `--color-accent`, `--color-teal`) — these
auto-generate `bg-navy`/`text-navy`/`bg-cream`/etc. utilities. Runtime-switchable
values (`--ink`, `--bg-base`, `--pill-bg`, `--line`, …) live in `:root` /
`:root[data-theme="dark"]` for the light/dark toggle inherited from the starter.

### Typography
- **Font family: Inter** (400/500/600/700/800), loaded via Google Fonts `@import`
  in `src/styles.css` and set as `--font-sans` in `@theme`. The "Aries — noun"
  dictionary card was left in the site's regular sans (Inter) rather than a serif
  — the Figma mock's serif rendering wasn't confirmed as intentional.
- **Type scale (desktop, from the 1512px canvas):**
  - Hero wordmark "ARIES": Bold ~**200px**, navy
  - Section headings: Bold **60px**, navy
  - Stat numbers: Regular **40px**
  - Subheads / large body / pills: Regular **30px**
  - Nav links, labels, body: Regular **20px**
  - These are absolute px on a 1512px frame — **scale down responsively** (they are
    not literal rem targets for small screens).

### Layout & spacing
- **Design canvas:** 1512 × N (14" MacBook). Mobile frames exist (`iPhone 17`, 402px)
  but are sparse — desktop is the source of truth; you own the responsive down-scale.
- **Side padding:** ~**64px** left gutter on content.
- **Sticky navbar:** **84px** tall, navy, full-bleed, white 20px Inter links, CTA
  `--> Let's Talk` far right. **⚠ The navbar is sticky and the footer is NOT.** The
  hero is exactly one viewport tall; subsequent sections are `viewport − 84px`.
- **Nav contexts:** built as a single unified public nav (see "Implementation
  status" below for why the portal nav wasn't built).

### Components / motifs
- **Value pills:** `.pill` class — `border-radius: 20px`, `--pill-bg`, hover lift.
- **Accent underline:** `.accent-underline` — 6px accent bar under emphasized text
  (e.g. "Control + F"), implemented via `::after` pseudo-element.
- **Stat strip:** 4 columns (2 on mobile) separated by dividers; lucide-react icons
  (Wrench/BookOpen/Users/Terminal) stand in for the original svgrepo icons.
- **Cards:** `.card` class — rounded rectangles for event/project/alumni/team cards.
- **Logo:** real antelope vector paths from Figma, see "Logo assets" above — not
  svgrepo icons or a raster image.
- **Brand lockup:** settled on the antelope+circuit mark (primary system) as
  canonical; the exploration screens' `ARIES / IIT DELHI` stacked wordmark was
  not used.

## Implementation status (what's actually built)

All of P0 and P1 from `docs/PAGES.md` are implemented and verified (typecheck +
build + Playwright screenshot pass of every route, including interactive filters
and mobile nav). P2 (auth/portal/OAuth, audience-CTA overlay) is **not** built —
see below.

### Routes implemented
- `/` — Home/Landing (hero, stat strip, "Control + F" section, dictionary card, CTA)
- `/team` — Coordinators + Executives (BRAIN/CANVAS split)
- `/events` (index) + `/events/$eventId` — feature, upcoming row, major-events
  table, filterable past events
- `/projects` (index) + `/projects/$projectId` — featured project, search,
  category filter, grid, detail
- `/contact` — email/location/response-time cards + mailto CTA
- `/alumni` — searchable grid + "get featured" CTA
- `/about` — repurposes the nav's "Find out about us" link (mission + values);
  **this route wasn't in the original sitemap** — added because the primary nav
  links to it and leaving it 404 would be worse than a simple mission page.

### Deviations from the original plan (and why)
- **Unified nav, not two contexts.** `docs/PAGES.md §3` called for separate
  public/portal navbars. Since the portal itself isn't built (see below), only
  the public nav exists — `src/components/Header.tsx` and `Footer.tsx`.
- **Portal/auth (P2) intentionally skipped**: `/login`, `/portal`,
  `/portal/profile`, Microsoft OAuth, RBAC, and the audience-CTA hover overlay
  (`/for-organisations`, `/for-learners`) are **not implemented**. They need a
  real backend/auth provider decision that wasn't made — load
  `start-core/auth-server-primitives` + `router-core/auth-and-guards` when
  picking that up.
- **Single design system.** Built entirely on the primary cream/navy system.
  Contact/Alumni content (originally only in the "exploration" style) was
  ported into the primary system rather than kept separate.
- **Content is placeholder/sample data**, not a real roster or project list —
  see `src/data/*.ts`. Names (team, alumni) are illustrative, matching what the
  Figma mock itself used as placeholder text. Replace from the real Portal DB
  before launch. Project `hasGithub`/`hasDemo`/`hasReport` are **presence
  flags, not real URLs** — those links aren't wired up (rendered as inert pill
  badges, not dead `href="#"` links).
- **Logo assets**: the antelope nav icon and hero emblem are real vector paths
  pulled from Figma (`get_design_context` on node `1:6480`) and hand-converted
  into `src/components/icons/AriesMark.tsx` (nav, viewBox 56×57) and
  `AriesEmblem.tsx` (hero, viewBox 423×499) — `fill="currentColor"` so they
  themeable via Tailwind text-color utilities. No image assets in `public/`.
- **Contact email**: standardized on `aries@iitd.ac.in` (the design mock had a
  typo'd `aries@iiitd.ac.in`) — still needs real confirmation from the team.

### Known gotchas (hit while building — read before touching routes/CSS)
- **TanStack Router: sibling list+detail pages need a layout+index split, not
  a bare leaf file.** Defining both `events.tsx` (full page component) and
  `events.$eventId.tsx` makes the router treat `$eventId` as a **child** of
  `events` (`getParentRoute: () => EventsRoute` in the generated tree) —
  because path nesting is purely path-based, regardless of intent. If the
  parent's component doesn't render `<Outlet />`, the child route matches and
  its loader runs, but **nothing renders** — it silently falls back to
  showing the parent's own JSX. Fix used here: split into `events.tsx` (thin
  layout: `component: () => <Outlet />`) + `events.index.tsx` (the actual
  listing page, path `/events/`) + `events.$eventId.tsx` (detail, unchanged).
  Same pattern applied to `projects.tsx` / `projects.index.tsx` /
  `projects.$projectId.tsx`. If you add another list+detail pair, follow this
  pattern from the start.
- **Tailwind v4 cascade layers**: utility classes Tailwind generates (`text-cream`,
  `text-navy`, etc.) live in `@layer utilities`. Any plain/unlayered CSS rule —
  e.g. a bare `a { color: inherit }` — **always beats a layered rule**,
  regardless of specificity or file order. This silently made every `<Link>`
  styled with a text-color utility render invisible text (navy-on-navy) until
  fixed by wrapping the reset/component CSS in `src/styles.css` in
  `@layer base { … }` / `@layer components { … }`. If you add global CSS,
  put it in one of those layers, not bare at the top level.
- **`networkidle` never fires** when Playwright-testing this dev server — the
  Vite HMR/TanStack Devtools websocket keeps the connection open. Use
  `waitUntil: 'load'` + a short explicit wait instead.
- Running `npx @tanstack/intent@latest install` (v0.3.5) **overwrote** the richer
  ~14 KB AGENTS.md the `create` CLI had generated, replacing it with the minimal
  skill-loading block above. The `intent list`/`intent load` workflow is the
  durable path for per-library guidance, so the mappings weren't lost — but don't
  expect the detailed inline mappings the CLI first wrote.
- pnpm warns that the `pnpm.onlyBuiltDependencies` field in `package.json` is no
  longer read; harmless. Native deps `esbuild`/`lightningcss` still build fine.
- `--tailwind` flag is deprecated/ignored (see above).

### Next steps
- [ ] Wire real content: replace `src/data/*.ts` placeholder team/alumni/project
  data with the real roster (ideally from the ARIES Project Portal DB per
  `docs/PAGES.md §4`).
- [ ] Build the portal/auth flow (P2) if/when a backend + auth provider is chosen.
- [ ] Wire real GitHub/demo/report links on projects (currently inert badges).
- [ ] Decide and configure a deployment target (load the `deployment` skill).
- [ ] Confirm the real contact email with the team.
- [ ] Consider a11y pass on the mobile nav (currently pushes content down
  instead of overlaying; functional but not the slickest pattern).
