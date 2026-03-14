import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

const W = 1200;
const H = 630;
const GRID = 40;
const BG = "#F5F0E4";
const GRID_COLOR = "rgba(0,0,0,0.06)";

// Create grid SVG
const gridLines = [];
for (let x = 0; x <= W; x += GRID) {
  gridLines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${GRID_COLOR}" stroke-width="1"/>`);
}
for (let y = 0; y <= H; y += GRID) {
  gridLines.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${GRID_COLOR}" stroke-width="1"/>`);
}

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${gridLines.join("\n  ")}
</svg>`;

async function generate() {
  // Create base with grid
  const base = await sharp(Buffer.from(svg)).png().toBuffer();

  // Load and resize logo
  const logo = await sharp(path.join(publicDir, "comma-logo.png"))
    .resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Composite logo onto base
  const result = await sharp(base)
    .composite([
      {
        input: logo,
        left: Math.round(W / 2 - 80),
        top: Math.round(H / 2 - 80),
      },
    ])
    .png()
    .toFile(path.join(publicDir, "og-image.png"));

  console.log("✅ OG image generated:", result);
}

generate().catch(console.error);
