// Hematite content types — the typed vocabulary of blocks a case-study
// page is composed from. An app using Hematite defines its own data
// (matching CaseStudyData) and renders it with <Section>/<RenderContent>
// from "./RenderContent".

export interface CaseStudyMeta {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  designer: string;
  role: string;
  duration: string;
  discipline: string;
  tools: string[];
  heroImage?: string;
  heroVideo?: string;
  heroCaption?: string;
  year: string;
  tags: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface PainCard {
  title: string;
  body: string;
}

export interface JourneyStep {
  title: string;
  emotion: string;
  body: string;
  keys: string[];
}

export interface StrategyItem {
  title: string;
  objective: string;
  body: string;
}

export interface FeatureItem {
  label: string;
  body: string;
}

export interface FeatureShowcase {
  tag: string;
  title: string;
  lede: string;
  items: FeatureItem[];
  insight: string;
  image?: string;
  flip?: boolean;
}

export interface GalleryImage {
  src: string;
  caption?: string;
}

/* ── Data / research content types ── */

export interface ColumnBlock {
  heading?: string;
  body: string;
}

export interface DefinitionItem {
  term: string;
  abbr?: string;
  body: string;
}

export interface StatGridItem {
  value: string;
  label: string;
  note?: string;
  /** Ties a headline number to a chart series below it. Omit for a plain (white) stat. */
  tone?: "accent" | "secondary" | "neutral";
}

export interface HeatmapData {
  rowLabels: { code: string; label: string }[];
  colLabels: string[];
  /** last column is treated as "no match"; cell[i][i] is treated as "match" */
  matrix: number[][];
  caption?: string;
}

export interface DumbbellItem {
  label: string;
  a: number;
  b: number;
}

export interface DumbbellChartData {
  items: DumbbellItem[];
  legendA: string;
  legendB: string;
  unit?: string;
}

export interface StackedBarSegment {
  value: number;
  label: string;
}

export interface StackedBarRow {
  label: string;
  segments: StackedBarSegment[];
}

export interface StackedBarChartData {
  rows: StackedBarRow[];
  legend: string[];
}

export interface ScatterPoint {
  x: number;
  y: number;
  group: 0 | 1;
}

export interface ScatterChartData {
  points: ScatterPoint[];
  legend: [string, string];
  xLabel: string;
  yLabel: string;
  xMax: number;
}

export type SectionContent =
  | { type: "tldr"; quote: string; stats?: StatItem[] }
  | { type: "problem-cards"; hmw: string; cards: PainCard[] }
  | { type: "journey"; steps: JourneyStep[] }
  | { type: "strategies"; items: StrategyItem[] }
  | { type: "feature"; data: FeatureShowcase }
  | { type: "image"; src: string; caption?: string; fullWidth?: boolean }
  | { type: "gallery"; images: GalleryImage[] }
  | { type: "prose"; html: string }
  | { type: "figma-embed"; url: string; height?: string; caption?: string }
  | { type: "callout"; icon: string; body: string }
  | { type: "video"; src: string; poster?: string; caption?: string }
  | { type: "columns"; columns: ColumnBlock[] }
  | { type: "definitions"; title?: string; items: DefinitionItem[]; panel?: boolean }
  | { type: "steps-list"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "stat-grid"; items: StatGridItem[]; size?: "lg" | "sm" }
  | { type: "heatmap"; data: HeatmapData }
  | { type: "dumbbell-chart"; data: DumbbellChartData }
  | { type: "stacked-bar-chart"; data: StackedBarChartData }
  | { type: "scatter-chart"; data: ScatterChartData };

export interface CaseStudySection {
  id: string;
  number: string;
  kicker: string;
  title: string;
  lede?: string;
  content: SectionContent[];
}

export interface CaseStudyData {
  meta: CaseStudyMeta;
  sections: CaseStudySection[];
  nextProject?: { slug: string; title: string };
}
