# design.md

Source of truth for the Badminton NZ Team Events UI. Read it before building any screen. If a decision is not here, add it here rather than deciding ad hoc in a component.

Non-negotiables:

1. Tokens, never raw values. No hex, pixel sizes, or ad hoc colours in a component.
2. Accessibility is a floor: WCAG AA contrast and keyboard operability are required.
3. The frontend is never the security boundary. It may hide what a role cannot do; the backend enforces every rule.

---

## 1. Audience and context

Two roles, two contexts.

- **Officials** (Technical Officials) run tournaments from a venue under time pressure, reading tables of teams and lineups. Their screens (dashboard, slot detail, lineup review) are data dense and mainly used on a computer: optimise for glanceability, density, speed.
- **Teams** (managers, coaches) build and submit a lineup, usually on a phone at the venue. Their screens (my slots, builder) are mobile first and adaptive: optimise for large touch targets, one action at a time, forgiveness.

When a rule differs by area, it says so.

## 2. Principles

- **Clarity over cleverness.** The fastest readable layout wins; no decoration that does not aid comprehension.
- **Glanceable status.** State is readable in under a second, always carried by colour plus an icon or label, never colour alone.
- **Errors are guidance.** A failed check or rejected action says what is wrong and how to fix it, plainly, without blame.
- **Calm canvas, brand as accent.** Neutral surfaces carry content; teal and gold direct attention, never compete with it.
- **One definition, one place.** Every repeated thing has a single source; change it once, it changes everywhere.

## 3. Foundations (tokens)

### 3.1 Colour

Locked. Primitives are the raw ramp; semantic tokens are what components use. Light and dark share semantic names pointing at different steps, so theming is one switch.

**Brand teal** (`#00a99d` and `#00e2d3` are the exact Badminton NZ cyans)

| Token | Hex | Job |
| --- | --- | --- |
| `teal-bright` | `#00E2D3` | hover and active; accents on dark |
| `teal` | `#00A99D` | primary fills, focus ring |
| `teal-deep` | `#0E7A6E` | teal text, links, outlines on light (AA 5.2) |

**Brand gold** (`#b5985a` exact; accent only, never a status)

| Token | Hex | Job |
| --- | --- | --- |
| `gold` | `#B5985A` | accent and headings on dark |
| `gold-deep` | `#8A7036` | gold text on light (AA 4.7) |

**Neutrals** (anchored on BNZ greys, faintly cool to sit under the teal)

| Token | Hex | Token | Hex |
| --- | --- | --- | --- |
| `ink` | `#16191A` | `neutral-400` | `#99A3A3` |
| `neutral-900` | `#1B1F20` | `neutral-300` | `#C6D0D0` |
| `neutral-800` | `#262C2C` | `neutral-200` | `#DEE6E6` |
| `neutral-700` | `#3B4142` | `neutral-100` | `#EDF2F2` |
| `neutral-600` | `#566060` | `neutral-50` | `#F4F8F8` |
| `neutral-500` | `#6E7878` | `white` | `#FFFFFF` |

**Functional** (one recipe: a `solid` that passes AA for text and fills, and a `subtle` tint for backgrounds)

| Meaning | Solid | Subtle |
| --- | --- | --- |
| Danger / block | `#C62A3B` | `#FBEAEC` |
| Warning / flag | `#A05E12` | `#F6EDDC` |
| Success / approved | `#178052` | `#E4F1EA` |

**Semantic tokens** (what components use; dark remaps the same names)

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | `neutral-50` | `neutral-900` |
| `--surface` (`--card`, `--popover`) | `white` | `#232827` |
| `--foreground` | `ink` | `#E8EDEC` |
| `--muted` | `neutral-100` | `#262C2C` |
| `--muted-foreground` | `neutral-600` | `neutral-400` |
| `--border` / `--input` | `neutral-200` | `#313736` |
| `--primary` | `teal` | `teal` |
| `--primary-hover` | `teal-bright` | `teal-bright` |
| `--primary-foreground` | `ink` | `ink` |
| `--ring` (focus) | `teal` | `teal-bright` |
| `--link` | `teal-deep` | `teal-bright` |
| `--gold` (brand accent) | `gold-deep` | `gold` |
| `--danger` / `--warning` / `--success` | solids above | brightened one step |
| `--danger-subtle` etc. | subtle tints | dark tints |

Rules: `--primary` carries ink text, not white (brand-true, AA ~6:1), brightening to `teal-bright` on hover. Teal and gold as text on light always use the `-deep` step. Gold never signals status. Prefer borders over shadows on light surfaces.

### 3.2 Typography

Inter (Google Fonts), with `tabular-nums` on all numeric and tabular data so columns align.

One definition per level, delivered through a single `Typography` component (one variant per level). Components choose a variant; they never set their own size, weight, or line height. Change a level here and in the component, and every instance updates.

| Variant | Element | Size (mobile to desktop) | Weight | Line height | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `h1` | `h1` | 28 to 32 | 700 | 1.2 | -0.01em | page title, one per page |
| `h2` | `h2` | 22 to 24 | 600 | 1.3 | -0.005em | section |
| `h3` | `h3` | 18 | 600 | 1.35 | 0 | subsection, card title |
| `h4` | `h4` | 16 | 600 | 1.4 | 0 | group label |
| `body` | `p` | 16 | 400 | 1.5 | 0 | default text |
| `body-sm` | `p`/`span` | 14 | 400 | 1.45 | 0 | secondary text, dense tables |
| `label` | `label`/`span` | 13 | 500 | 1.3 | 0 | form labels, table headers |
| `caption` | `span` | 12 | 400 | 1.4 | 0 | meta, timestamps (muted) |
| `data` | `span` | 14 | 500 | 1.4 | 0 | numeric values, tabular-nums |

Only these levels exist: no h5 or h6, no one-off sizes. Add a level here first if one is genuinely needed.

### 3.3 Spacing and sizing

Base 4px; use the Tailwind scale (`1`=4 to `12`=48). Conventions:

- Related items gap `2`; form field gap `4`.
- Card padding `4` (mobile) / `6` (desktop).
- Section gap `6` / `8`. Page gutter `4` / `6` to `8`.
- Minimum touch target 44px in the team flows.

### 3.4 Radius, borders, elevation

- `--radius` `0` (square), matching the Badminton NZ brand. shadcn derives sm/md/lg/xl from it, so inputs, badges, and cards are all square. Avoid `rounded-full`; borders, not rounding, separate elements.
- Borders 1px `--border`, the primary separator on light.
- Elevation restrained: `shadow-sm` for lifted cards, `shadow-md` for popovers, dialogs, sheets. No heavy shadows.

### 3.5 Layout and responsive

Mobile first. Tailwind breakpoints (sm 640, md 768, lg 1024, xl 1280).

- **Official area** (dashboard, slot detail, lineup review): built for lg and up, data tables, multi-column; below md, tables collapse to stacked cards, never sideways scroll. Container max about 1200px.
- **Team area** (my slots, builder, submit): designed at 390px first, single column, one primary action, a sticky bottom bar for Submit; scales to a centred column (max about 480px). 44px touch targets.
- **Forms**: max about 480 to 560px, single column, labels above fields.
- **App shell**: top bar with brand, identity, sign out. Officials get top-bar navigation; the team shell stays minimal.

### 3.6 Motion

Minimal and purposeful: 150 to 200ms ease for hovers, dialogs, sheets, skeletons. No decorative animation. Respect `prefers-reduced-motion`.

## 4. shadcn/ui

We use shadcn to move faster.

- The CLI copies each component's source into our repo (`components/ui`); we own and can edit it.
- A visual customisation step exists and we can use it: shadcn's Themes page (base colour, radius, preview) and third-party editors (tweakcn, shadcnstudio) that add typography, shadows, and live previews. All output the same thing: a block of CSS variables. Customising means choosing token values that components inherit; it does not pre-build component code. We have exact values (3.1), so we write the variables directly, optionally previewing our palette in tweakcn first.
- Consistency comes from that theme: components read semantic variables (`--primary`, `--background`, `--border`, `--ring`), defined once in `globals.css`. Change a token and every component reskins, light and dark.

**Configuration** (`components.json`, generated by `shadcn init`): component library Base UI; preset Lyra (square, 0 radius); cssVariables `true`; iconLibrary `phosphor`. Icons import from `@phosphor-icons/react` with the `Icon` suffix (the canonical export, for example `FlagIcon`; the bare `Flag` name is a deprecated alias). Our tokens in `globals.css` override the preset's palette, and `--radius` is `0`. Stack: Next App Router, React 19, Tailwind v4. The v4 setup keeps CSS variables in `globals.css` with `@theme inline`, not a legacy `tailwind.config` theme.

**Token mapping, two traps:**

- `--primary-foreground` is `ink`, not white.
- shadcn's `--accent` / `--accent-foreground` are a neutral hover background (`--muted` / `--foreground`), not our brand gold. Gold is its own `--gold` token, never wired into `--accent`.
- `--destructive` maps to `--danger` (white foreground). Add `--success`, `--warning`, `--gold`, and the `-subtle` tints beyond shadcn's defaults.

**Components** (add as needed, not in bulk): Button, Input, Textarea, Label, Select, Checkbox, RadioGroup, Form (react-hook-form + zod), Card, Table, Badge, Dialog, AlertDialog, Sheet, Tabs, Tooltip, DropdownMenu, Popover, Calendar, Separator, Breadcrumb, Skeleton, Alert, Sonner.

**Button variants:** `default` is the teal primary with ink text; `secondary` a neutral fill; `outline` and `ghost` for lower emphasis; `destructive` for dangerous actions; `link` for inline navigation. Sizes sm/default/lg; use lg for primary actions in the team (touch) flows.

## 5. Components

All UI is built from one internal library: `components/ui` (shadcn primitives) and `components/` (domain components). Before building anything, check whether it already exists and reuse it. There is one canonical implementation per component (one Button, one Dialog, one StatusBadge); extend it through variants and props, never fork it or build a near-duplicate. A need an existing component almost meets is a variant to add, not a second component.

### 5.1 Primitives

Use the shadcn primitives as the base. Each must show its full state set where relevant: default, hover, focus-visible (2px `--ring`, offset), active, disabled, loading, and long content (truncate or wrap, never overflow); inputs show an error state bound to validation. Never restyle inline; add a missing variant to the component.

### 5.2 Domain components

Built on the primitives; each is the single source for its concern.

- **StatusBadge**: the only place a status maps to a colour, label, and icon (section 10).
- **FindingList** and **FindingItem**: the only place severity maps to style. Renders a ValidationResult; each finding shows a severity icon and colour (block red, flag amber), the message, the how-to-fix text, and the location. Never colour alone.
- **SubmissionsTable**: admitted teams with submitted or outstanding state, status badge, version, time; outstanding marked. Cards on mobile.
- **LineupLayout** (read) and **LineupGrid** (editable): entries in canonical event order (section 10), laid out as entered into Tournament Software; the grid constrains picks to the Approved Team List.
- **TieFormatSummary**: matches required per event.
- **PageHeader**: the h1 and an actions slot, consistent gutters.
- **EmptyState**, **ErrorState**: section 7.

## 6. Patterns

**Page scaffold**: PageHeader (h1 and actions), then the content container at the area's gutter and max width. One h1 per page.

**Forms and validation**: shadcn Form (react-hook-form and zod). Client validation mirrors the server for speed; the server is the authority. Map responses:

- 422 on a form: inline on the field, or an Alert above the form if not field specific.
- 422 on a lineup check or submit: render the ValidationResult via FindingList. This is the heart of the product; give it room.
- 409 (slot closed, superseded lineup, copy before approve): a toast or inline message in plain words.
- 401: redirect to the matching sign-in.
- 403: the action should already be hidden for the role; if reached, show a short "no permission" and do not retry.

**Tables**: shadcn Table, sticky header, no zebra (borders separate), row hover `--muted`. Always define empty, loading, and error states. Collapse to cards below md.

**Status**: always StatusBadge; never a raw status string or a bare colour dot.

**Confirmations**: destructive or irreversible actions (close a slot, flag a lineup) use AlertDialog with a clear verb. Reversible actions need no confirm.

## 7. States

Every data view handles four states:

- **Loading**: Skeletons shaped like the content, not a spinner, for lists and tables.
- **Empty**: EmptyState with a short message and, where useful, the action that fills it.
- **Error**: ErrorState with a plain message and retry.
- **Success**: a Sonner toast for actions; inline confirmation for a submit (show the recorded result).

## 8. Accessibility

- AA contrast throughout (the palette is tuned); never teal or gold text on light without the `-deep` step.
- Visible focus on every interactive element (2px `--ring`, offset); never remove outlines.
- Full keyboard operability; logical tab order; Escape closes overlays.
- Every input has a programmatic label; custom controls carry correct ARIA roles and names.
- Status and severity never colour alone: always an icon or label.
- Touch targets at least 44px in the team flows.
- Honour `prefers-reduced-motion` and `prefers-color-scheme`.

## 9. Content and formatting

- Terse, plain language.
- Buttons are verbs: Open slot, Close, Extend cut-off, Submit lineup, Approve, Flag, Mark copied.
- Use domain terms exactly: Tie, Round Slot, Approved Team List, Event, Tie Lineup, cut-off. No synonyms.
- Dates and times in the NZ style and the venue zone (Pacific/Auckland): `d MMM yyyy, h:mm a` (for example `11 Nov 2026, 2:30 PM`). Tabular figures for numbers.

## 10. Domain to UI mapping

**Slot status**

| Status | Label | Style |
| --- | --- | --- |
| open | Open | success |
| closed | Closed | neutral |

**Lineup status**

| Status | Label | Style |
| --- | --- | --- |
| submitted | Submitted | teal |
| flagged | Flagged | warning (amber) |
| approved | Approved | success (green) |
| superseded | Superseded | neutral, muted |
| draft | Draft | neutral, muted |

**Event order** (always, in every lineup layout and summary): Men's Singles, Women's Singles, Men's Doubles, Women's Doubles, Mixed Doubles.

**Roles and routes**: see `phase-b-ui-plan.md` for the full route map and per-page components. Officials sign in with an account; teams with access details.

## 11. Code conventions

- Structure: `components/ui` (shadcn), `components/` (domain), `app/` (routes and groups), `lib/api` (generated client and query hooks), `lib/` (utilities).
- Tokens only: semantic Tailwind classes (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary text-primary-foreground`, `border-border`, `text-destructive`). No raw hex or ad hoc sizes.
- Single sources: Typography owns text levels; StatusBadge owns status styling; FindingList owns severity styling. Nothing else sets them.
- Icons: Phosphor via `@phosphor-icons/react`, always the `Icon`-suffixed export (`FlagIcon`, not `Flag`).
- Data: TanStack Query hooks wrap the typed `openapi-fetch` client; types from the generated `schema.ts`. Never hand-write API types or calls; regenerate when the backend changes.
- Security: hide actions a role cannot take, but always assume the server enforces the rule.

## 12. Do and Don't

- Do carry status with an icon plus colour. Don't rely on colour alone.
- Do use the teal `-deep` and gold `-deep` steps for text on light. Don't put `#00a99d` or `#b5985a` text on white.
- Do reach for a token or an existing component. Don't paste a hex value or a one-off font size into a component.
- Do give the validation findings room and plain how-to-fix text. Don't reduce a failed check to a red border.
- Do design the team flows for a thumb on a phone. Don't ship an official-width table to a 390px screen without collapsing it.

## 13. To-do (later milestones, not needed now)

Deferred until the relevant milestone:

- Data-visualisation tokens (`--chart-1` to `--chart-5`) and a charting system, for reporting screens.
- Dark-mode palette fine-tuning and the in-app theme toggle UI (the token architecture is ready).
- A fuller motion and transition system.
- Notification UI (team slot-opening alerts, reminders), with any future notification stories.
- Print and export styling for an approved lineup.
- Full tonal ramps (50 to 900) per hue, added as components demand steps.
- A component gallery or Storybook with visual regression checks, if the set grows enough to warrant it.
