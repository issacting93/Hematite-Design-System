import type { ReactNode } from "react";
import { RenderContent } from "./hematite";
import type { SectionContent } from "./hematite";
import { placeholder } from "./placeholder";
import "./hematite/hematite.css";
import "./App.css";

/* Hematite showcase — every example renders through the real RenderContent
   switch (src/hematite/RenderContent.tsx), so this page can't drift from
   what the library actually ships. */

function Block({
  title,
  type,
  note,
  children,
}: {
  title: string;
  type?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-block">
      <div className="ds-block-head">
        <h3 className="ds-block-title">{title}</h3>
        {type && <code className="ds-block-type">{type}</code>}
      </div>
      {note && <p className="ds-block-note">{note}</p>}
      <div className="ds-block-body">{children}</div>
    </div>
  );
}

const COLORS = [
  { name: "Background", value: "--ht-background", css: "var(--ht-background)" },
  { name: "Foreground", value: "--ht-foreground", css: "var(--ht-foreground)" },
  { name: "Accent", value: "--ht-accent", css: "var(--ht-accent)" },
  { name: "Accent secondary", value: "--ht-accent-secondary", css: "var(--ht-accent-secondary)" },
  { name: "Muted", value: "--ht-muted", css: "var(--ht-muted)" },
  { name: "Rule", value: "--ht-rule", css: "var(--ht-rule)" },
  { name: "Rule strong", value: "--ht-rule-strong", css: "var(--ht-rule-strong)" },
];

const demoTldr: SectionContent = {
  type: "tldr",
  quote: "A one-sentence summary of the outcome sits here, in the author's own words.",
  stats: [
    { value: "42%", label: "Key metric" },
    { value: "3.2x", label: "Secondary metric" },
    { value: "500+", label: "Scale metric" },
  ],
};

const demoProblemCards: SectionContent = {
  type: "problem-cards",
  hmw: "How might we help [user] accomplish [goal] despite [constraint]?",
  cards: [
    { title: "Pain point one", body: "A short description of a specific, observed user frustration." },
    { title: "Pain point two", body: "A second pain point, ideally sourced from research, not assumption." },
    { title: "Pain point three", body: "A third pain point rounding out the problem space." },
  ],
};

const demoJourney: SectionContent = {
  type: "journey",
  steps: [
    { title: "Discover", emotion: "sentiment_neutral", body: "User becomes aware of the problem.", keys: ["Awareness"] },
    { title: "Evaluate", emotion: "sentiment_dissatisfied", body: "User weighs options, hits friction.", keys: ["Friction", "Trust"] },
    { title: "Resolve", emotion: "sentiment_satisfied", body: "User completes the task successfully.", keys: ["Relief"] },
  ],
};

const demoStrategies: SectionContent = {
  type: "strategies",
  items: [
    { title: "Strategy one", objective: "Objective it serves", body: "What this strategy does and why it was chosen." },
    { title: "Strategy two", objective: "Objective it serves", body: "A second strategy, parallel in structure to the first." },
  ],
};

const demoFeature: SectionContent = {
  type: "feature",
  data: {
    tag: "Feature",
    title: "A named feature or decision",
    lede: "One sentence framing why this feature exists.",
    items: [
      { label: "Detail one", body: "Supporting detail about the feature." },
      { label: "Detail two", body: "A second supporting detail." },
    ],
    insight: "The insight or research finding that justified this feature.",
    image: placeholder(640, 480, "640×480"),
  },
};

const demoImage: SectionContent = {
  type: "image",
  src: placeholder(1200, 600, "1200×600"),
  caption: "Image block — full-width figure with an optional caption underneath.",
  fullWidth: true,
};

const demoGallery: SectionContent = {
  type: "gallery",
  images: [
    { src: placeholder(400, 300, "Screen 1"), caption: "Caption one" },
    { src: placeholder(400, 300, "Screen 2"), caption: "Caption two" },
    { src: placeholder(400, 300, "Screen 3"), caption: "Caption three" },
  ],
};

const demoColumns: SectionContent = {
  type: "columns",
  columns: [
    { heading: "Column one", body: "Short paragraph of supporting text." },
    { heading: "Column two", body: "A parallel paragraph, same length and structure." },
  ],
};

const demoDefinitions: SectionContent = {
  type: "definitions",
  title: "Glossary",
  panel: true,
  items: [
    { term: "Term", abbr: "ABBR", body: "What the term means, in plain language." },
    { term: "Second term", body: "A definition without an abbreviation." },
  ],
};

const demoSteps: SectionContent = {
  type: "steps-list",
  items: ["First step in a sequence.", "Second step, numbered automatically.", "Third and final step."],
};

const demoChecklist: SectionContent = {
  type: "checklist",
  items: ["Item that was verified.", "A second completed item.", "A third completed item."],
};

const demoStatGrid: SectionContent = {
  type: "stat-grid",
  items: [
    { value: "87%", label: "Accent stat", tone: "accent" },
    { value: "13%", label: "Secondary stat", tone: "secondary" },
    { value: "500+", label: "Neutral stat", tone: "neutral", note: "Optional footnote" },
  ],
};

const demoCallout: SectionContent = {
  type: "callout",
  icon: "lightbulb",
  body: "A callout box pairs an icon with a short, single point — a takeaway, a warning, or an aside.",
};

const demoHeatmap: SectionContent = {
  type: "heatmap",
  data: {
    rowLabels: [
      { code: "A", label: "Category A" },
      { code: "B", label: "Category B" },
      { code: "C", label: "Category C" },
    ],
    colLabels: ["A", "B", "C", "None"],
    matrix: [
      [82, 4, 2, 12],
      [6, 74, 8, 12],
      [3, 5, 88, 4],
    ],
    caption: "Heatmap block — confusion-matrix style, diagonal highlighted as a match.",
  },
};

const demoDumbbell: SectionContent = {
  type: "dumbbell-chart",
  data: {
    items: [
      { label: "Category A", a: 20, b: 65 },
      { label: "Category B", a: 35, b: 40 },
      { label: "Category C", a: 55, b: 58 },
    ],
    legendA: "Before",
    legendB: "After",
  },
};

const demoStackedBar: SectionContent = {
  type: "stacked-bar-chart",
  data: {
    rows: [
      { label: "Group A", segments: [{ value: 60, label: "Share 1" }, { value: 30, label: "Share 2" }, { value: 10, label: "Share 3" }] },
      { label: "Group B", segments: [{ value: 40, label: "Share 1" }, { value: 45, label: "Share 2" }, { value: 15, label: "Share 3" }] },
    ],
    legend: ["Share 1", "Share 2", "Share 3"],
  },
};

const demoScatter: SectionContent = {
  type: "scatter-chart",
  data: {
    points: [
      { x: 2, y: 20, group: 0 }, { x: 15, y: 45, group: 0 }, { x: 120, y: 60, group: 0 },
      { x: 5, y: 30, group: 1 }, { x: 40, y: 70, group: 1 }, { x: 800, y: 90, group: 1 },
    ],
    legend: ["Group 0", "Group 1"],
    xLabel: "Scale (log)",
    yLabel: "Score",
    xMax: 1000,
  },
};

const demoTableProse: SectionContent = {
  type: "prose",
  html: `<div class="ht-table-scroll"><table style="width:100%; border-collapse:collapse;">
<thead><tr style="border-bottom:2px solid #333;"><th style="text-align:left;padding:0.5rem;">Phase</th><th style="text-align:left;padding:0.5rem;">What Happens</th></tr></thead>
<tbody>
<tr style="border-bottom:1px solid #ddd;"><td style="padding:0.5rem;"><strong>Phase one</strong></td><td style="padding:0.5rem;">Description of what happens in this phase.</td></tr>
<tr><td style="padding:0.5rem;"><strong>Phase two</strong></td><td style="padding:0.5rem;">Description of the second phase.</td></tr>
</tbody></table></div>`,
};

const demoAppScreensProse: SectionContent = {
  type: "prose",
  html: `<div class="ht-app-screens">
<div class="ht-app-screen"><img src="${placeholder(300, 600, "Screen")}" alt="Screen one" /><div class="ht-gallery-caption">Screen one — caption</div></div>
<div class="ht-app-screen"><img src="${placeholder(300, 600, "Screen")}" alt="Screen two" /><div class="ht-gallery-caption">Screen two — caption</div></div>
</div>`,
};

const demoReflectionProse: SectionContent = {
  type: "prose",
  html: `<div class="ht-reflection-grid">
<div class="ht-reflection-item"><h4>Reflection heading</h4><p>What was learned or what would change next time.</p></div>
<div class="ht-reflection-item"><h4>Another reflection</h4><p>A second, parallel reflection item.</p></div>
</div>`,
};

export default function App() {
  return (
    <div className="ht-page ds-page">
      <header className="ds-topbar">
        <span className="ds-logo">HEMATITE</span>
        <span className="ds-tagline">An editorial, data-driven case-study design system</span>
      </header>

      <header className="ds-intro">
        <div className="ht-hero-eyebrow">Design System</div>
        <h1 className="ht-hero-title">Hematite</h1>
        <p className="ht-hero-subtitle">
          Every component below is generated from the two files that make up the library —{" "}
          <code>src/hematite/hematite.css</code> and the content-block renderer in{" "}
          <code>src/hematite/RenderContent.tsx</code>. Nothing on this page is a separate copy.
        </p>
      </header>

      {/* ── Foundations ── */}
      <section className="ds-section">
        <h2 className="ds-section-title">Foundations</h2>

        <Block title="Color" note="Defined as CSS variables in hematite.css. Override them after importing the stylesheet to re-skin the whole system — no class names change.">
          <div className="ds-swatches">
            {COLORS.map((c) => (
              <div className="ds-swatch" key={c.name}>
                <div className="ds-swatch-fill" style={{ background: c.css, border: c.value === "--ht-background" ? "1px solid var(--ht-rule-strong)" : "none" }} />
                <div className="ds-swatch-name">{c.name}</div>
                <code className="ds-swatch-value">{c.value}</code>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Typography" note="Space Grotesk for display type, PT Mono for body copy and uppercase labels. Both load from Google Fonts in index.html.">
          <div className="ds-type-specimens">
            <div className="ds-type-row">
              <h1 className="ht-hero-title" style={{ fontSize: "3rem" }}>Hero title</h1>
              <code className="ds-swatch-value">.ht-hero-title — var(--ht-font-display)</code>
            </div>
            <div className="ds-type-row">
              <h2 className="ht-section-title">Section title</h2>
              <code className="ds-swatch-value">.ht-section-title — var(--ht-font-display)</code>
            </div>
            <div className="ds-type-row">
              <p className="ht-section-lede">Lede paragraph — one or two sentences introducing a section.</p>
              <code className="ds-swatch-value">.ht-section-lede — var(--ht-font-mono)</code>
            </div>
            <div className="ds-type-row">
              <div className="ht-meta-label">Uppercase label</div>
              <code className="ds-swatch-value">.ht-meta-label — var(--ht-font-mono), letter-spaced</code>
            </div>
          </div>
        </Block>

        <Block title="Layout" note="Case study pages cap at 1214px and use clamp()-based side padding so copy never touches the viewport edge.">
          <div className="ds-layout-note">
            <code>max-width: 1214px</code> · <code>padding: clamp(24px, 5vw, 64px)</code> · rules at <code>var(--ht-rule)</code> (subtle) and <code>var(--ht-rule-strong)</code> (strong)
          </div>
        </Block>
      </section>

      {/* ── Page patterns ── */}
      <section className="ds-section">
        <h2 className="ds-section-title">Page patterns</h2>

        <Block title="Hero + meta grid" note="Used once per page, at the top.">
          <header className="ht-hero ds-hero-demo">
            <div className="ht-hero-eyebrow">Case Study / 2026</div>
            <h1 className="ht-hero-title">Project Title</h1>
            <p className="ht-hero-subtitle">A one-line subtitle describing the project.</p>
            <div className="ht-meta-grid">
              <div><div className="ht-meta-label">Role</div><div className="ht-meta-value">Product Designer</div></div>
              <div><div className="ht-meta-label">Duration</div><div className="ht-meta-value">8 weeks</div></div>
              <div><div className="ht-meta-label">Discipline</div><div className="ht-meta-value">UX Research</div></div>
              <div><div className="ht-meta-label">Tools</div><div className="ht-meta-value">Figma, React</div></div>
            </div>
          </header>
        </Block>

        <Block title="Section header" note="Numbered section marker + kicker + title, repeated at the top of every numbered section. Use <Section> to wire this up automatically.">
          <div className="ht-section-header">
            <div className="ht-section-number">01</div>
            <div>
              <div className="ht-section-kicker">Discovery</div>
              <h2 className="ht-section-title">Section title.</h2>
            </div>
          </div>
        </Block>

        <Block title="Table scroll" type="prose" note="Any table wrapped in .ht-table-scroll becomes horizontally scrollable instead of overflowing at narrow widths.">
          <RenderContent block={demoTableProse} />
        </Block>

        <Block title="App screens" type="prose" note="Grid of device screenshots with captions — built from .ht-app-screens inside a prose block.">
          <RenderContent block={demoAppScreensProse} />
        </Block>

        <Block title="Reflection grid" type="prose" note="Closing retrospective grid — built from .ht-reflection-grid inside a prose block.">
          <RenderContent block={demoReflectionProse} />
        </Block>

        <Block title="Next project" note="Footer link to the next page in a sequence.">
          <div className="ht-next ds-next-demo">
            <div className="ht-next-label">Next Project</div>
            <div className="ht-next-title"><a href="#">Project Name →</a></div>
          </div>
        </Block>
      </section>

      {/* ── Content blocks ── */}
      <section className="ds-section">
        <h2 className="ds-section-title">Content blocks</h2>
        <p className="ht-section-lede">
          Every case-study section is built from these typed blocks (see <code>types.ts</code>).
          Add a new section by composing blocks, not by writing new CSS.
        </p>

        <Block title="TL;DR" type="tldr"><RenderContent block={demoTldr} /></Block>
        <Block title="Problem cards" type="problem-cards"><RenderContent block={demoProblemCards} /></Block>
        <Block title="Journey" type="journey"><RenderContent block={demoJourney} /></Block>
        <Block title="Strategies" type="strategies"><RenderContent block={demoStrategies} /></Block>
        <Block title="Feature showcase" type="feature"><RenderContent block={demoFeature} /></Block>
        <Block title="Image" type="image"><RenderContent block={demoImage} /></Block>
        <Block title="Gallery" type="gallery"><RenderContent block={demoGallery} /></Block>
        <Block title="Columns" type="columns"><RenderContent block={demoColumns} /></Block>
        <Block title="Definitions" type="definitions"><RenderContent block={demoDefinitions} /></Block>
        <Block title="Steps list" type="steps-list"><RenderContent block={demoSteps} /></Block>
        <Block title="Checklist" type="checklist"><RenderContent block={demoChecklist} /></Block>
        <Block title="Stat grid" type="stat-grid"><RenderContent block={demoStatGrid} /></Block>
        <Block title="Callout" type="callout"><RenderContent block={demoCallout} /></Block>
        <Block title="Heatmap" type="heatmap"><RenderContent block={demoHeatmap} /></Block>
        <Block title="Dumbbell chart" type="dumbbell-chart"><RenderContent block={demoDumbbell} /></Block>
        <Block title="Stacked bar chart" type="stacked-bar-chart"><RenderContent block={demoStackedBar} /></Block>
        <Block title="Scatter chart" type="scatter-chart"><RenderContent block={demoScatter} /></Block>
      </section>

      <footer className="ds-footer">
        <a href="https://github.com/issacting93/Hematite-Design-System" target="_blank" rel="noopener noreferrer">
          github.com/issacting93/Hematite-Design-System
        </a>
      </footer>
    </div>
  );
}
