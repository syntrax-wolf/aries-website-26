# ARIES Website — Page Plan

Detailed build plan for every page/route, derived from the Figma file
[`aries-copy-website`](https://www.figma.com/design/B8nZo0h4lzjN5zm8pO0Xmr/aries-copy-website)
(file key `B8nZo0h4lzjN5zm8pO0Xmr`, page "Page 1").

> **Read this with `AGENTS.md`** — the design language (colors, type, spacing,
> components) lives there. This file is the *sitemap + per-page spec*.

> **⚠ LANDING REDESIGN (2026 refresh).** The `/` home page was **rebuilt from
> scratch** against a new Figma direction supplied as reference images (sunset /
> mountains / deer hero, violet accent). The old cream+navy+light-blue landing
> spec that used to live in §2.1 is **superseded** — see the rewritten §2.1
> below for the current build. The other pages (`/team`, `/events`, `/projects`,
> `/contact`, `/alumni`, `/about`) still follow the older primary system and were
> **not** re-skinned in this pass; expect a visual mismatch between the new home
> page and the inner pages until they're migrated to the new direction.

> **Status: P0 + P1 built, P2 skipped.** `/`, `/team`, `/events` (+ detail),
> `/projects` (+ detail), `/contact`, `/alumni`, `/about` are implemented with
> placeholder data. Portal/auth (§2.9), audience-CTA overlay (§2.10), and the
> two-nav-context layout (§3) were **not** built — see AGENTS.md
> "Implementation status" for the full list of deviations and why. Treat the
> specs below (except the rewritten §2.1) as the original design intent, not a
> live checklist.

---

## 0. Important context about the Figma file

The file is a **working design doc, not a clean handoff**. It contains:

1. **Primary design system** — cream `#f9f3ec` + navy `#121854` + light-blue
   `#a9cbf7`, Inter font. This is the most complete direction and covers Landing,
   Events, Team, Projects, Portal/Profile, and the audience CTA screens. **Treat
   this as canonical** unless the team says otherwise.
2. **A "Design Ideas" exploration cluster** (frames titled `Main`, `Background`,
   `Frame`, `page1`, `Section - Contact page`, `alumni`, `Section frame page-hero`)
   using a *different, lighter/cleaner* visual language with an `ARIES / IIT DELHI`
   wordmark lockup and glyph icons. Contact, Alumni, and the richest Profile layout
   **only exist here**. Flagged per-page below as `style: exploration`.
3. **Designer notes-to-implementer** embedded as text boxes (addressed to "@Aira"
   / "claude"). These are captured as **⚠ Notes** on the relevant pages.
4. **Duplicate iterations** — several `MacBook Pro 14" - N` frames are earlier
   versions of the same screen. The plan references the most complete node.

**Open decision:** unify on the primary (cream/navy) system, or migrate everything
to the exploration system. Recommendation: build primary system first; port the
Contact/Alumni/Profile *content* into it.

---

## 1. Sitemap → routes

TanStack Start file-based routes under `src/routes/`.

| Route | Page | Figma node | Priority |
|---|---|---|---|
| `/` | Home / Landing | `1:6480` | P0 |
| `/events` | Events listing | `1:6156` (also `39:2`) | P0 |
| `/events/$eventId` | Individual event | `1:6393` | P1 |
| `/projects` | Projects archive | `127:2` (also `159:289`) | P0 |
| `/projects/$projectId` | Project detail | `127:2` detail block | P1 |
| `/team` | Meet the Team | `1:6097` (FullTeam) | P0 |
| `/alumni` | Alumni | `291:1453` *(exploration)* | P1 |
| `/contact` | Contact / Let's Talk | `291:1330` *(exploration)* | P1 |
| `/portal` | Project Portal home (auth) | `1:6266` | P2 |
| `/portal/profile` | Member profile | `1:6312`, `170:3`, `291:681` | P2 |
| `/login` | Portal login + OAuth | `1:6251`, `1:6368` | P2 |
| `/for-organisations` | Audience CTA | `1:6231` | P2 |
| `/for-learners` | Audience CTA | `1:6371` | P2 |

Two navigation contexts exist — see **§3 Shared layout**.

---

## 2. Page specs

### 2.1 `/` — Home / Landing  ·  **REBUILT (2026 refresh)**  ·  `src/routes/index.tsx`
**Purpose:** Front door. Communicate what ARIES is + headline stats + value props +
FAQs, with a cinematic parallax hero.

**Design direction (new):** sunset/pastel sky, layered mountains, an antelope on a
cliff, cream page body, **violet `#5b28d9` accent** (icon tiles, links, highlights),
deep-navy `#171343` type, lavender `#efe7f9` FAQ section, purple-mountain footer.
Font stays **Inter**. Tokens live in `src/styles.css` `@theme` (`--color-accent`,
`--color-lavender`, `--color-navy`, `--color-cream`). The old light-blue accent and
the light/dark theme toggle were **removed** — the site is now single (light) theme.

**Sections (top→bottom):**
1. **Fixed transparent navbar** (`src/components/Header.tsx`, 88px) over the hero —
   **`ARIES / IIT DELHI` logo lockup** (antelope `AriesMark` + stacked wordmark) left;
   links `Events · Projects · Team · Resources · Contact Us`; **`Join Us →` navy pill**
   right. Text is dark-navy over the light sky. On scroll (>24px) the bar gains a
   `bg-cream/85` blur backdrop + bottom border. Mobile: hamburger → cream dropdown.
   *(Resources → `/about`, Contact → `/contact` until dedicated routes exist.)*
2. **Parallax hero** (`src/components/hero/Hero.tsx`, full `100svh`) — multi-layer
   scroll parallax via framer-motion `useScroll`/`useTransform`:
   - **Sky** = `public/background.png` (the supplied sunset PNG), slowest drift.
   - **3 mountain ridges** = `hero/MountainRange.tsx` SVG (`depth` 0/1/2), increasing speed.
   - **Foreground cliff + deer** = `hero/Cliff.tsx` SVG + `AriesEmblem` antelope,
     bottom-right, fastest drift.
   - **Copy** (left): kicker "Official AI & ML Club of IIT Delhi", H1
     "**Building the / Future with AI.**", subhead "Research. Build. Deploy. Impact.",
     buttons **Explore Events** (navy) + **View Projects** (outline). Copy lifts +
     fades out on scroll. All motion respects `prefers-reduced-motion`.
3. **Stat strip** — white rounded card overlapping the hero base (`-mt`), 4 columns
   (icon · big number · label), lucide icons (Users/Calendar/Rocket/Handshake):
   **3000+** Students Reached · **50+** Events Conducted · **20+** Projects Built ·
   **10+** Industry Collaborations. Data: `headlineStats` in `src/data/stats.ts`.
4. **What we do + Aries dictionary** (2-col):
   - **Left:** violet `WHAT WE DO` eyebrow, heading "More than a club, a track record
     you can **Ctrl + F**" (violet highlight), then 4 white rows each with a
     violet-gradient `.icon-tile`, label, and a circular arrow affordance:
     Shipping cool projects · Discussing Interesting Topics · Hosting Industry Events ·
     Researching cool stuff.
   - **Right:** navy **"Aries / noun"** dictionary card — pronunciation, the zodiac
     definition, then bullets (student-led AI collective · founded at IIT Delhi ·
     driven by curiosity, powered by collaboration). Violet glow accents.
5. **FAQ** — lavender section, sticky left column (`FAQS` eyebrow + "Frequently Asked
   **Questions**" + blurb) and a right accordion (`src/components/FaqList.tsx`):
   numbered violet badge, question, +/− toggle, animated lavender answer panel.
   First item open by default. Data: `faqs` in `src/data/stats.ts`.

**Data:** `headlineStats`, `faqs`, `valuePills` in `src/data/stats.ts` (static).
**Components:** `Header`, `hero/Hero`, `hero/MountainRange`, `hero/Cliff`,
`Reveal` (scroll-reveal wrapper), `FaqList`, `Footer`, `icons/AriesMark`,
`icons/AriesEmblem`.
**⚠ Notes:**
- Hero art is currently the single supplied `public/background.png` (sky only) +
  SVG mountains/cliff + the vector antelope emblem. If a fully layered raster
  hero (separate sky/mountain/deer PNGs) is exported later, swap the SVG layers
  in `Hero.tsx` for `<img>` layers keeping the same `useTransform` speeds.
- Header is **fixed** (not sticky). `__root.tsx` adds `pt-[88px]` to every route
  **except** `/` so inner pages clear the fixed bar; the home hero renders under it.
- Old landing assets (`stats` blurbs, `.accent-underline`, `ThemeToggle`) are now
  unused by `/` — `ThemeToggle.tsx` is dead code kept on disk.

---

### 2.2 `/events` — Events  ·  node `1:6156` (primary) / `39:2` (alt)
**Purpose:** Everything happening + archive of past events.

**Sections:**
1. Navbar (portal-style links seen here: `Event Calendar`, `Meet the Team`,
   `Project Archive`, `--> Let's Talk`).
2. **Most Recent Event** — large feature card: name, photo, write-up, "Read More".
3. **Upcoming Events** — horizontal cards (Rave Night, Paper Trails #12, ScAI Visitor
   Talk…), each with date + "Read More", plus "View the Full Calendar ↗".
4. **Major / Annual Events** — a compact table (per designer note, keep horizontal):
   Tryst (IIT Delhi's annual tech fest), CAIC GC, Inter IIT, Shipathon — each with a
   "View Aries @ <event> 2025" link.
5. **Past Events** — filter tabs: `workshops` · `seminars` · `hackathons` · `field trips`
   (alt frame uses Workshops/Visits/Hackathons/Seminars/Annual Activities). Grid of
   past-event cards (title, date, blurb, thumbnail).
6. **"↗ Save all events to Google Calendar"** CTA.
7. Footer.

**Data:** events list (upcoming vs past), categories, Google Calendar link.
**⚠ Notes (designer, verbatim intent):**
- "Keep only *Save to Google Calendar*."
- "Let the upcoming-events row be **scrollable**."
- "Consider formatting current events like past events; reconsider the past-events
   colour scheme — it currently looks too distinctive."
- "Major events aren't that major — keep them **horizontally listed as a table**,
   add a `View Aries @ TechGC 2025-26` link per event."
- Upcoming events have **no photo** yet; past events **do**.

---

### 2.3 `/events/$eventId` — Individual Event  ·  node `1:6393`
**Purpose:** One event's detail page. Each talk/event links to its own page.
**Sections:** navbar → event title + full write-up (e.g. "ScAI Visitor Talk …") →
"Organise an Event with us" / "View More Events" / "Calendar of future events" CTAs → footer.
**⚠ Notes:** "Footer is **not sticky**, sits at the very end." "Handle the empty state
(not enough events) elegantly." "Upcoming events don't have a photograph yet; past ones do."

---

### 2.4 `/projects` — Projects Archive  ·  node `127:2` (also `159:289`)
**Purpose:** Showcase + searchable repository of member/club projects.
**Sections:**
1. Navbar (portal-style: `Project Archive`, `Meet the Team`, `Event Calendar`).
2. **Featured project** — large: vertical image, `// computer_vision · nlp` kicker,
   Project Name, description, tag chips (NLP, Multi-agent), `GitHub ↗` / `Visit site ↗`.
3. **Search bar** — "⚲ Search projects by name, tag, or description".
4. **Filter tags:** Hackathon, Industry project, Product design, AI tools, Publication,
   Research, Computer vision, Robotics, Learning on graphs, LangGraph…
5. **Project grid** — cards: name, 1–2 line description, tags, contributors
   ("with Contributor A, Contributor B"), links.
**Data:** projects (title, desc, tags, contributors, github/site links, image, category).
Sourced from the **ARIES Project Portal / DB** eventually.

---

### 2.5 `/projects/$projectId` — Project detail
Detail view of a single project (expanded card from the archive). Some projects are
`openable`, some `not openable` (per `1:6266` notes) → gate detail route on that flag.

---

### 2.6 `/team` — Meet the Team  ·  node `1:6097` (FullTeam)
**Purpose:** The people. Photos + roles + rotating directory.
**Sections:**
1. Navbar (`Events and the like`, `Meet the Team`, `View Our Work`, `--> Let's Talk`).
2. **Full team photo** per year (e.g. "2026 - 27").
3. **Coordinators** ("BADE LOG") — cards: NAME, role (OC, co-OC, Research Lead, Panelist).
4. **Executives** — split into **BRAIN** (research/tech) and **CANVAS** (design/media).
5. **"scroll for more"** + a **rotating search wheel** (search stops the wheel; every
   icon links to that person's profile).
6. **Alumni** entry point → `/alumni`.
**⚠ Notes:** "Coordinators all together (total coordis ≈ brain exes ≈ canvas exes)."
"Rotating; search stops the wheel." "All icons link to the actual profile."
"Profiles drawn **completely from the ARIES Project Portal**." "Static alumni = past Bade Log."
**Data:** members (name, role, wing BRAIN/CANVAS, year, photo, profile link) from portal.

---

### 2.7 `/alumni` — Alumni  ·  node `291:1453`  ·  `style: exploration`
**Purpose:** Alumni wall. Grid of alumni: name, role, company (Aditi Sharma — Product
Manager, Google; Rohan Verma — SWE, Microsoft; … Meta, Amazon, Adobe, BCG, Flipkart,
IIT Bombay, FluxAI, Nexora Labs). Includes **"Search alumni…"**, `in` (LinkedIn) links,
and a **"Are you an alumnus? … Get Featured →"** CTA.
**Note:** only designed in the exploration style — needs porting to the primary system.

---

### 2.8 `/contact` — Contact / Let's Connect  ·  node `291:1330`  ·  `style: exploration`
**Purpose:** Get in touch. Content:
- Heading "Let's Connect! / Get in touch"
- **Email:** `aries@iiitd.ac.in` *(⚠ verify — likely should be `@iitd.ac.in`)*
- **Location:** Student Activity Centre (SAC), IIT Delhi, Hauz Khas, New Delhi – 110016
- **Response Time:** "We typically respond within 24–48 hours."
- Pull quote: "We're here to collaborate, create and make an impact — together."
- Full footer with nav + "© 2025 ARIES, IIT Delhi".
**Note:** exploration style; port to primary system. This is the target of the
`--> Let's Talk` nav CTA everywhere.

---

### 2.9 Project Portal (auth-gated) — P2

- **`/login`** (`1:6251`, `1:6368`) — "LOGIN to the Project Portal": *as an ARIES member*
  vs *as an external viewer*. Auth via **Microsoft OAuth** ("proceed" button).
  **⚠ Permission levels** (from `1:6368`): 0 = DB owner; Manager (most Coordis + few Exes)
  can push/edit; members; external viewers. Model this as RBAC.
- **`/portal`** (`1:6266`) — Project Homepage: tabs **Ongoing Projects**, **Past Industry
  Projects**, **Learning Initiatives**, **Published Research**. Portal nav: `Back to Main
  Website`. Some projects `openable`, some not.
- **`/portal/profile`** (`1:6312`, richer at `170:3` / `291:681`) — Member profile:
  header (name, role e.g. "Executive, ARIES", year+branch "3rd Year, MAE", IIT Delhi),
  socials (LinkedIn/GitHub/email), **Resume ↓**, **Interests** chips, **Projects** grid
  (with GitHub/Demo/Report links), Achievements, Coursework, Skills & Tools.
  **⚠ Notes:** "Automatically drawn from Database." "GitHub/paper link shown if strong."
  "On the portal, two things change vs public: *Your Projects* (active) and *Your Profile*."

---

### 2.10 Audience CTA screens — P2
- **`/for-organisations`** (`1:6231`) — "Want to Organise an Event at IIT Delhi?" /
  "Want to have a Project built?" → View Past Events Hosted · Event Calendar · Contact Us ·
  View our Members' Research · View our Best Projects.
- **`/for-learners`** (`1:6371`) — "Looking to step into the world of AI/ML" →
  Resources · Upcoming Events · Contact Us.
These may render as a **hover-split landing overlay** ("hovering on Students side vs
Project side leads to the two screens") rather than standalone routes — confirm with team.

---

## 3. Shared layout & navigation

There are **two nav contexts** — model as nested layout routes:

- **Public / marketing nav** (navy sticky bar): `Find out about us` · `Look for Events` ·
  `Meet the Team` · `View Our Work` · `--> Let's Talk`.
- **Portal nav:** `Project Homepage` / `Project Archive` · `Meet the Team` ·
  `Event Calendar` · `Back to Main Website`.

**Footer (rebuilt, 2026):** purple **mountain-silhouette** background
(`hero/MountainRange` baked in at low opacity), brand `ARIES / IIT DELHI` lockup +
tagline, and columns **Navigate** (Events/Projects/Team/Resources) · **Connect**
(Contact Us/Join Us/Newsletter) · **Legal** (Privacy Policy/Terms of Service) ·
**Stay in the loop** newsletter email input with a violet arrow submit. Centered
`© <year> Aries, IIT Delhi. All rights reserved.` The newsletter form is inert
(prevents default) — wire a real handler when a backend exists.
**⚠ Footer is NOT sticky.** **⚠ Navbar is now `fixed`** (transparent over the hero,
cream-blur on scroll) rather than the old navy sticky bar — see §2.1. The home hero
is a full `100svh` layer under the fixed header; inner routes get `pt-[88px]`.

---

## 4. Cross-cutting data model (eventual)

Everything member/project/profile-related is meant to be **drawn from the ARIES Project
Portal database**. Likely entities:
- **Member** — name, role, wing (BRAIN/CANVAS), year, branch, photo, socials, resume,
  interests, achievements, coursework, skills, alumnus?/past-role.
- **Project** — title, description, tags, category, contributors, github/site/report,
  image, openable flag, published-research flag.
- **Event** — name, date, category (workshop/seminar/hackathon/field-trip/annual),
  upcoming|past, photo (past only), write-up, calendar link.
- **Auth/RBAC** — Microsoft OAuth; roles: DB-owner, Manager, Member, External viewer.

Start with static/JSON fixtures in `src/data/`, swap for TanStack Start server functions
+ portal API later. Load intent skills `start-core/server-functions`,
`router-core/auth-and-guards`, `start-core/auth-server-primitives` before building auth.

---

## 5. Build order (suggested)

1. **P0 shared:** `Navbar`, `Footer`, design tokens in `styles.css`, fonts (Inter).
2. **P0 pages:** `/` (refine existing) → `/team` → `/events` → `/projects`.
3. **P1:** `/events/$eventId`, `/projects/$projectId`, `/contact`, `/alumni`
   (port exploration content into primary system).
4. **P2:** portal + auth (`/login`, `/portal`, `/portal/profile`), audience CTA screens.
5. Decide unify-vs-migrate on the two design systems **before** P1.

---

## 6. Assets to pull from Figma (7-day expiry on MCP asset URLs)

- Antelope + circuit hero logo (masked PNG) — Landing.
- Stat icons: team-member, paper, terminal, workshop (svgrepo SVGs).
- Per-page photos (event features, team photos) — export from their nodes as needed.
Store under `public/`. Re-fetch via `get_design_context` / `download_assets` when URLs expire.
