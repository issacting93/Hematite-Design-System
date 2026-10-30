# Hematite

An editorial, data-driven case-study design system — originally extracted from
a design portfolio's case-study layout, generalized into a standalone,
themeable library.

**Live showcase:** run `npm run dev` and open the app — every component in
the library is cataloged there, rendered through the real code (not a copy).

## What it is

Hematite is two things:

1. **A typed content-block vocabulary** (`src/hematite/types.ts`) — a case
   study page is a `CaseStudyData` made of numbered `CaseStudySection`s, each
   holding an array of typed `SectionContent` blocks (`tldr`, `feature`,
   `gallery`, `heatmap`, `scatter-chart`, etc.). You write data, not markup.
2. **A renderer + stylesheet** (`src/hematite/RenderContent.tsx` +
   `src/hematite/hematite.css`) that turns that data into the actual page —
   cards, charts (heatmap, dumbbell, stacked bar, scatter — all hand-rolled
   SVG, no chart library), galleries, callouts, definitions, and more.

```tsx
import { Section } from "./hematite";
import type { CaseStudyData } from "./hematite";

const data: CaseStudyData = {
  meta: { /* title, role, duration, tools, ... */ },
  sections: [
    {
      id: "discovery",
      number: "01",
      kicker: "Discovery",
      title: "What we learned",
      content: [
        { type: "tldr", quote: "...", stats: [{ value: "42%", label: "..." }] },
        { type: "gallery", images: [{ src: "/img.png", caption: "..." }] },
      ],
    },
  ],
};

data.sections.map((s) => <Section key={s.id} section={s} />);
```

## Theming

Every color, font and rule-weight in `hematite.css` reads from CSS custom
properties declared once, at the top of the file:

```css
:root {
  --ht-background: #000;
  --ht-foreground: #fff;
  --ht-accent: #9cb2ff;        /* primary accent + data-viz series 1 */
  --ht-accent-secondary: #d95926; /* data-viz series 2 */
  --ht-muted: #666;
  --ht-rule: rgba(255, 255, 255, 0.08);
  --ht-rule-strong: rgba(255, 255, 255, 0.15);
  --ht-font-display: "Space Grotesk", sans-serif;
  --ht-font-mono: "PT Mono", monospace;
}
```

Override them in your own stylesheet, loaded after `hematite.css` — no class
names change. Hematite ships dark by default; a light theme is just a
different set of values for the same variables.

## Content block reference

| Type | Renders | Key fields |
|------|---------|------------|
| `tldr` | Pull quote + stat row | `quote`, `stats` |
| `problem-cards` | HMW statement + pain-point cards | `hmw`, `cards` |
| `journey` | Journey map with emotion icons | `steps` |
| `strategies` | Strategy/persona cards | `items` |
| `feature` | Text + optional image, side by side | `data` (`tag`, `title`, `lede`, `items`, `insight`, `image?`, `flip?`) |
| `image` | Single figure with caption | `src`, `caption?`, `fullWidth?` |
| `gallery` | Multi-image grid | `images` |
| `prose` | Raw HTML (tables, custom layouts) | `html` |
| `video` | Video with controls | `src`, `poster?`, `caption?` |
| `figma-embed` | Embedded Figma prototype | `url`, `height?` |
| `callout` | Icon + message | `icon`, `body` |
| `columns` | N-up text columns | `columns` |
| `definitions` | Glossary table | `title?`, `items`, `panel?` |
| `steps-list` | Numbered steps | `items` |
| `checklist` | Checked items | `items` |
| `stat-grid` | Large stat tiles, toned | `items`, `size?` |
| `heatmap` | Confusion-matrix style heatmap | `data` |
| `dumbbell-chart` | Two-value-per-row comparison | `data` |
| `stacked-bar-chart` | Stacked horizontal bars | `data` |
| `scatter-chart` | Log-x scatter plot | `data` |

Icons use [Material Symbols Outlined](https://fonts.google.com/icons) (loaded
via Google Fonts in `index.html`) — pass any symbol name as `icon`.

## Project layout

```
src/
  hematite/
    hematite.css        # all component styles + theme tokens
    types.ts             # SectionContent / CaseStudyData types
    RenderContent.tsx    # the content-block switch + chart components + <Section>
    Reveal.tsx            # scroll-into-view fade/slide wrapper
    index.ts              # barrel export
  App.tsx, App.css        # the showcase — a live catalog of every block type
  placeholder.ts           # inline-SVG placeholder images used by the showcase
```

## Using Hematite in another project

There's no published package yet — the library is plain source, so the
straightforward path is:

1. Copy `src/hematite/` into the target project.
2. Import `hematite.css` once, near your app root.
3. Build `CaseStudyData` objects and render them with `<Section>` (or render
   single blocks with `<RenderContent block={...} />`).
4. Override the `--ht-*` CSS variables to match your brand.

## Development

```sh
npm install
npm run dev      # showcase at localhost:5173
npm run build    # typecheck + production build
```

## Origin

Extracted from the case-study system built for a design portfolio
([Naomi Jo — Portfolio](https://naomi-portfolio-rho.vercel.app)), where the
same CSS and renderer power five live case studies. Hematite is that system,
generalized and re-themed so it isn't tied to one site's content or brand.
