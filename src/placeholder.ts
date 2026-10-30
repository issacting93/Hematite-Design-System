// Inline SVG data URIs so the showcase has real <img> sources without
// shipping binary assets. Swap for real images in a consuming app.
export function placeholder(width: number, height: number, label: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#14161c"/>
    <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="none" stroke="#2a2d38" stroke-width="1"/>
    <text x="50%" y="50%" fill="#666" font-family="monospace" font-size="14" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
