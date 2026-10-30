import React from "react";
import type {
  CaseStudySection,
  SectionContent,
  HeatmapData,
  DumbbellChartData,
  StackedBarChartData,
  ScatterChartData,
} from "./types";
import Reveal from "./Reveal";

function RevealBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Reveal baseClassName="ht-reveal" className={className}>{children}</Reveal>;
}

/* ── Content Block Renderers ──
   One switch statement, one block per SectionContent type. Compose a page
   by passing blocks to <Section>, or render a single block directly. */
export function RenderContent({ block }: { block: SectionContent }) {
  switch (block.type) {
    case "tldr":
      return (
        <RevealBlock>
          <div className="ht-tldr">
            <div className="ht-tldr-quote">{block.quote}</div>
            {block.stats && block.stats.length > 0 && (
              <div className="ht-tldr-stats">
                {block.stats.map((s, i) => (
                  <div key={i}><div className="ht-stat-value">{s.value}</div><div className="ht-stat-label">{s.label}</div></div>
                ))}
              </div>
            )}
          </div>
        </RevealBlock>
      );

    case "problem-cards":
      return (
        <RevealBlock>
          <div className="ht-hmw">{block.hmw}</div>
          <div className="ht-pain-grid ht-reveal-stagger">
            {block.cards.map((c, i) => (
              <RevealBlock key={i}><div className="ht-pain-card"><h4>{c.title}</h4><p>{c.body}</p></div></RevealBlock>
            ))}
          </div>
        </RevealBlock>
      );

    case "journey":
      return (
        <RevealBlock>
          <div className="ht-journey">
            {block.steps.map((s, i) => (
              <div key={i} className="ht-journey-step">
                <div className="ht-journey-emotion"><span className="material-symbols-outlined">{s.emotion}</span></div>
                <div className="ht-journey-title">{s.title}</div>
                <div className="ht-journey-body">{s.body}</div>
                <div className="ht-journey-keys">
                  {s.keys.map((k, j) => <span key={j} className="ht-journey-key">{k}</span>)}
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>
      );

    case "strategies":
      return (
        <div className="ht-strategies ht-reveal-stagger">
          {block.items.map((s, i) => (
            <RevealBlock key={i}>
              <div className="ht-strategy-card">
                <h4>{s.title}</h4>
                <div className="ht-strategy-objective">{s.objective}</div>
                <p>{s.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      );

    case "feature":
      return (
        <RevealBlock>
          <div className={`ht-feature ${block.data.flip ? "flip" : ""}`}>
            <div className="ht-feature-text">
              <div className="ht-feature-tag">{block.data.tag}</div>
              <div className="ht-feature-title">{block.data.title}</div>
              <div className="ht-feature-lede">{block.data.lede}</div>
              <div className="ht-feature-items">
                {block.data.items.map((item, i) => (
                  <div key={i}>
                    <div className="ht-feature-item-label">{item.label}</div>
                    <div className="ht-feature-item-body">{item.body}</div>
                  </div>
                ))}
              </div>
              <div className="ht-feature-insight">{block.data.insight}</div>
            </div>
            {block.data.image && (
              <div className="ht-feature-image"><img src={block.data.image} alt={block.data.title} loading="lazy" /></div>
            )}
          </div>
        </RevealBlock>
      );

    case "image":
      return (
        <RevealBlock>
          <div className={`ht-image ${block.fullWidth ? "full-width" : ""}`}>
            <img src={block.src} alt={block.caption || ""} loading="lazy" />
            {block.caption && <div className="ht-image-caption">{block.caption}</div>}
          </div>
        </RevealBlock>
      );

    case "gallery":
      return (
        <RevealBlock>
          <div className="ht-gallery">
            {block.images.map((img, i) => (
              <div key={i} className="ht-gallery-item">
                <img src={img.src} alt={img.caption || ""} loading="lazy" />
                {img.caption && <div className="ht-gallery-caption">{img.caption}</div>}
              </div>
            ))}
          </div>
        </RevealBlock>
      );

    case "prose":
      return (
        <RevealBlock>
          <div className="ht-prose" dangerouslySetInnerHTML={{ __html: block.html }} />
        </RevealBlock>
      );

    case "figma-embed":
      return (
        <RevealBlock>
          <div className="ht-figma">
            <iframe src={block.url} style={{ height: block.height || "500px" }} allowFullScreen title="Figma Prototype" />
          </div>
          {block.caption && <div className="ht-image-caption">{block.caption}</div>}
        </RevealBlock>
      );

    case "callout":
      return (
        <RevealBlock>
          <div className="ht-callout">
            <div className="ht-callout-icon"><span className="material-symbols-outlined">{block.icon}</span></div>
            <div className="ht-callout-body">{block.body}</div>
          </div>
        </RevealBlock>
      );

    case "video":
      return (
        <RevealBlock>
          <div className="ht-video">
            <video controls playsInline preload="metadata" poster={block.poster}>
              <source src={block.src} type="video/mp4" />
            </video>
            {block.caption && <div className="ht-image-caption">{block.caption}</div>}
          </div>
        </RevealBlock>
      );

    case "columns":
      return (
        <RevealBlock>
          <div className="ht-columns">
            {block.columns.map((c, i) => (
              <div key={i} className="ht-column">
                {c.heading && <h4>{c.heading}</h4>}
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      );

    case "definitions":
      return (
        <RevealBlock>
          <div className={`ht-definitions ${block.panel ? "panel" : ""}`}>
            {block.title && <div className="ht-definitions-title">{block.title}</div>}
            <table>
              <tbody>
                {block.items.map((d, i) => (
                  <tr key={i}>
                    <th>
                      {d.term}
                      {d.abbr && <span className="ht-definitions-abbr">{d.abbr}</span>}
                    </th>
                    <td>{d.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealBlock>
      );

    case "steps-list":
      return (
        <RevealBlock>
          <ol className="ht-steps-list">
            {block.items.map((s, i) => (
              <li key={i}>
                <span className="ht-steps-list-num">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </RevealBlock>
      );

    case "checklist":
      return (
        <RevealBlock>
          <ul className="ht-checklist">
            {block.items.map((item, i) => (
              <li key={i}>
                <span className="material-symbols-outlined">check</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </RevealBlock>
      );

    case "stat-grid":
      return (
        <RevealBlock>
          <div className={`ht-stat-grid ${block.size === "sm" ? "sm" : ""}`}>
            {block.items.map((s, i) => (
              <div key={i} className="ht-stat-grid-item">
                <div className="ht-stat-grid-label">{s.label}</div>
                <div className={`ht-stat-grid-value ${s.tone ?? "accent"}`}>{s.value}</div>
                {s.note && <div className="ht-stat-grid-note">{s.note}</div>}
              </div>
            ))}
          </div>
        </RevealBlock>
      );

    case "heatmap":
      return (
        <RevealBlock>
          <Heatmap data={block.data} />
        </RevealBlock>
      );

    case "dumbbell-chart":
      return (
        <RevealBlock>
          <DumbbellChart data={block.data} />
        </RevealBlock>
      );

    case "stacked-bar-chart":
      return (
        <RevealBlock>
          <StackedBarChart data={block.data} />
        </RevealBlock>
      );

    case "scatter-chart":
      return (
        <RevealBlock>
          <ScatterChart data={block.data} />
        </RevealBlock>
      );

    default:
      return null;
  }
}

/* ── Heatmap (confusion-matrix style) ── */
export function Heatmap({ data }: { data: HeatmapData }) {
  const { rowLabels, colLabels, matrix, caption } = data;
  return (
    <div className="ht-heatmap">
      <table>
        <thead>
          <tr>
            <th className="corner" />
            {colLabels.map((c, i) => (
              <th key={i} scope="col">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => {
            const total = row.reduce((a, b) => a + b, 0) || 1;
            return (
              <tr key={i}>
                <th scope="row" title={rowLabels[i]?.label}>{rowLabels[i]?.code}</th>
                {row.map((v, j) => {
                  const share = v / total;
                  const isMatch = j === i;
                  const isNone = j === row.length - 1 && j !== i;
                  const mix = v === 0 ? 4 : Math.round(8 + share * (isMatch ? 90 : isNone ? 25 : 55));
                  // periwinkle = match, orange = mislabelled, grey = no tag (absence, not a 3rd hue)
                  const rgb = isMatch ? "var(--ht-accent-rgb)" : isNone ? "255,255,255" : "var(--ht-accent-secondary-rgb)";
                  // The periwinkle accent is light, so white text on an
                  // alpha-blended cell loses 4.5:1 contrast earlier than it
                  // would on the orange kind (measured crossover ~65%, vs.
                  // ~88% for orange, which never reaches that intensity here).
                  const strong = isMatch && mix >= 65;
                  return (
                    <td
                      key={j}
                      className={strong ? "strong" : ""}
                      style={{ background: `rgba(${rgb},${mix / 100})` }}
                      title={`${rowLabels[i]?.label} → ${isNone ? "no tag" : colLabels[j]}: ${v.toLocaleString()} (${(share * 100).toFixed(1)}%)`}
                    >
                      {v.toLocaleString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {caption && <div className="ht-heatmap-caption">{caption}</div>}
    </div>
  );
}

/* ── Dumbbell chart: two values per row ── */
export function DumbbellChart({ data }: { data: DumbbellChartData }) {
  const { items, legendA, legendB, unit = "%" } = data;
  const W = 720, L = 220, R = 60, T = 20, RH = 44;
  const H = T + items.length * RH + 10;
  const x = (v: number) => L + ((W - L - R) * v) / 100;

  return (
    <div className="ht-fig ht-dumbbell">
      <div className="ht-fig-legend">
        <span><i className="ht-dot accent" /> {legendA}</span>
        <span><i className="ht-dot secondary" /> {legendB}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${legendA} and ${legendB} by category`}>
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={T - 8} y2={H - 6} className="ht-fig-grid" />
            <text x={x(t)} y={T - 12} textAnchor="middle" className="ht-fig-axis">{t}{unit}</text>
          </g>
        ))}
        {items.map((d, i) => {
          const y = T + i * RH + RH / 2;
          const same = d.a === d.b;
          return (
            <g key={i}>
              <text x={L - 14} y={y + 5} textAnchor="end" className="ht-fig-label">{d.label}</text>
              <line x1={x(d.a)} x2={x(d.b)} y1={y} y2={y} className="ht-fig-connector" />
              <circle cx={x(d.b)} cy={y} r={6} className="ht-fig-dot secondary" />
              <circle cx={x(d.a)} cy={y} r={6} className="ht-fig-dot accent" />
              {same ? (
                <text x={x(d.b) + 14} y={y + 5} className="ht-fig-value">{d.a}{unit}</text>
              ) : (
                <>
                  <text x={x(d.a) - (x(d.a) - L < 40 ? -0 : 12)} y={y - 12} textAnchor={x(d.a) - L < 40 ? "middle" : "end"} className="ht-fig-value accent">{d.a}{unit}</text>
                  <text x={x(d.b) + 12} y={y + 5} className="ht-fig-value secondary">{d.b}{unit}</text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Stacked horizontal bar chart ── */
export function StackedBarChart({ data }: { data: StackedBarChartData }) {
  const { rows, legend } = data;
  const colors = ["accent", "secondary", "neutral"];
  const W = 720, L = 220, R = 10, T = 6, RH = 40, BH = 26;
  const H = T + rows.length * RH;
  const bw = W - L - R;

  return (
    <div className="ht-fig ht-bars">
      <div className="ht-fig-legend">
        {legend.map((l, i) => (
          <span key={i}><i className={`ht-dot ${colors[i % colors.length]}`} /> {l}</span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Stacked share by category">
        {rows.map((row, i) => {
          const total = row.segments.reduce((a, s) => a + s.value, 0) || 1;
          const y = T + i * RH;
          let x0 = L;
          return (
            <g key={i}>
              <text x={L - 14} y={y + BH / 2 + 5} textAnchor="end" className="ht-fig-label">{row.label}</text>
              {row.segments.map((seg, j) => {
                const w = (bw * seg.value) / total;
                const pct = Math.round((seg.value / total) * 100);
                const rect = (
                  <g key={j}>
                    <rect x={x0} y={y} width={Math.max(w, 0)} height={BH} className={`ht-bar-seg ${colors[j % colors.length]}`}>
                      <title>{`${row.label}: ${seg.label} ${((seg.value / total) * 100).toFixed(1)}% (${seg.value.toLocaleString()})`}</title>
                    </rect>
                    {w > 40 && (
                      <text x={x0 + w / 2} y={y + BH / 2 + 5} textAnchor="middle" className={`ht-fig-seg-label ${j < 2 ? "on-color" : ""}`}>{pct}%</text>
                    )}
                  </g>
                );
                x0 += w;
                return rect;
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Scatter chart (log-x) ── */
export function ScatterChart({ data }: { data: ScatterChartData }) {
  const { points, legend, xLabel, yLabel, xMax } = data;
  const W = 560, H = 360, L = 48, R = 14, T = 14, B = 40;
  const lx = (v: number) => L + ((W - L - R) * Math.log10(Math.max(v, 1))) / Math.log10(xMax);
  const ly = (v: number) => T + ((H - T - B) * (1 - v / 100));
  const ticks = [1, 10, 100, 1000].filter((t) => t <= xMax);

  return (
    <div className="ht-fig ht-scatter">
      <div className="ht-fig-legend">
        <span><i className="ht-dot secondary" /> {legend[0]}</span>
        <span><i className="ht-dot accent" /> {legend[1]}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${yLabel} vs ${xLabel}`}>
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={ly(t)} y2={ly(t)} className="ht-fig-grid" />
            <text x={L - 8} y={ly(t) + 4} textAnchor="end" className="ht-fig-axis">{t}%</text>
          </g>
        ))}
        {ticks.map((t) => (
          <text key={t} x={lx(t)} y={H - B + 18} textAnchor="middle" className="ht-fig-axis">{t.toLocaleString()}</text>
        ))}
        <text x={W - R} y={H - 6} textAnchor="end" className="ht-fig-axis-title">{xLabel}</text>
        <text
          x={12}
          y={(T + H - B) / 2}
          textAnchor="middle"
          transform={`rotate(-90 12 ${(T + H - B) / 2})`}
          className="ht-fig-axis-title"
        >
          {yLabel}
        </text>
        {points
          .slice()
          .sort((a, b) => a.group - b.group)
          .map((p, i) => (
            <circle
              key={i}
              cx={lx(p.x)}
              cy={ly(p.y)}
              r={5}
              className={`ht-scatter-dot ${p.group ? "accent" : "secondary"}`}
            >
              <title>{`${p.group ? legend[1] : legend[0]} · ~${Math.round(p.x).toLocaleString()} · ${Math.round(p.y)}%`}</title>
            </circle>
          ))}
      </svg>
    </div>
  );
}

/* ── Section Component ── */
export function Section({ section }: { section: CaseStudySection }) {
  return (
    <section id={section.id} className="ht-section">
      <RevealBlock>
        <div className="ht-section-header">
          <div className="ht-section-number">{section.number}</div>
          <div>
            <div className="ht-section-kicker">{section.kicker}</div>
            <h2 className="ht-section-title" dangerouslySetInnerHTML={{ __html: section.title }} />
          </div>
        </div>
      </RevealBlock>
      {section.lede && <RevealBlock><p className="ht-section-lede">{section.lede}</p></RevealBlock>}
      {section.content.map((block, i) => <RenderContent key={i} block={block} />)}
    </section>
  );
}
