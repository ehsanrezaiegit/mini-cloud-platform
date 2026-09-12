import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const width = 1600;
const height = 900;
const coversDir = path.join(process.cwd(), "public", "covers");

function grid() {
  const vertical = Array.from({ length: 17 }, (_, index) => {
    const x = index * 100;
    return `<path d="M${x} 0V900" stroke="#F5F5F7" stroke-opacity="0.045"/>`;
  }).join("");
  const horizontal = Array.from({ length: 10 }, (_, index) => {
    const y = index * 100;
    return `<path d="M0 ${y}H1600" stroke="#F5F5F7" stroke-opacity="0.045"/>`;
  }).join("");

  return `${vertical}${horizontal}`;
}

function nodes(seed, count) {
  return Array.from({ length: count }, (_, index) => {
    const x = 90 + ((index * 197 + seed * 83) % 1420);
    const y = 80 + ((index * 131 + seed * 47) % 740);
    const color = index % 3 === 0 ? "#FF6B35" : "#4F9CFF";
    const opacity = index % 4 === 0 ? 0.62 : 0.34;
    const targetX = 80 + ((index * 311 + seed * 29) % 1440);
    const targetY = 90 + ((index * 173 + seed * 71) % 720);

    return `
      <path d="M${x} ${y}L${targetX} ${targetY}" stroke="${color}" stroke-opacity="${opacity * 0.42}" stroke-width="${index % 5 === 0 ? 4 : 2}"/>
      <circle cx="${x}" cy="${y}" r="${index % 4 === 0 ? 6 : 4}" fill="${color}" fill-opacity="${opacity}"/>
    `;
  }).join("");
}

function baseSvg(title, motif) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <defs>
        <radialGradient id="${title}-blue" cx="63%" cy="43%" r="54%">
          <stop offset="0%" stop-color="#4F9CFF" stop-opacity="0.28"/>
          <stop offset="58%" stop-color="#4F9CFF" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#4F9CFF" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${title}-orange" cx="42%" cy="57%" r="58%">
          <stop offset="0%" stop-color="#FF6B35" stop-opacity="0.24"/>
          <stop offset="62%" stop-color="#FF6B35" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#FF6B35" stop-opacity="0"/>
        </radialGradient>
        <filter id="${title}-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="1600" height="900" fill="#0A0A0B"/>
      <rect width="1600" height="900" fill="url(#${title}-blue)"/>
      <rect width="1600" height="900" fill="url(#${title}-orange)"/>
      <g opacity="0.9">${grid()}</g>
      ${motif}
      <rect width="1600" height="900" fill="none" stroke="#F5F5F7" stroke-opacity="0.05"/>
    </svg>
  `;
}

const covers = [
  {
    file: "ca-ai-provenance.png",
    svg: baseSvg(
      "policy",
      `
        <g>${nodes(3, 34)}</g>
        <g transform="translate(800 450)" filter="url(#policy-soft-glow)">
          <circle r="230" fill="#131316" fill-opacity="0.46" stroke="#FF6B35" stroke-opacity="0.58" stroke-width="3"/>
          <circle r="175" fill="none" stroke="#4F9CFF" stroke-opacity="0.56" stroke-width="3"/>
          <circle r="106" fill="none" stroke="#F5F5F7" stroke-opacity="0.16" stroke-width="2" stroke-dasharray="10 16"/>
          ${Array.from({ length: 28 }, (_, index) => {
            const angle = (index / 28) * Math.PI * 2;
            const x1 = Math.cos(angle) * 206;
            const y1 = Math.sin(angle) * 206;
            const x2 = Math.cos(angle) * 236;
            const y2 = Math.sin(angle) * 236;
            return `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="${index % 2 ? "#4F9CFF" : "#FF6B35"}" stroke-opacity="0.6" stroke-width="2"/>`;
          }).join("")}
          <path d="M-62 18L-18 64L78 -58" fill="none" stroke="#FF6B35" stroke-opacity="0.88" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <g opacity="0.44">
          <path d="M260 210C455 142 610 180 752 238" fill="none" stroke="#4F9CFF" stroke-width="3"/>
          <path d="M850 660C1035 726 1214 705 1370 640" fill="none" stroke="#FF6B35" stroke-width="4"/>
        </g>
      `,
    ),
  },
  {
    file: "deepseek-v4-flash.png",
    svg: baseSvg(
      "deepseek",
      `
        <g>${nodes(9, 38)}</g>
        <g transform="translate(810 455)" filter="url(#deepseek-soft-glow)">
          <path d="M-360 160C-162 64 -44 28 128 -32C222 -64 315 -108 390 -176" fill="none" stroke="#FF6B35" stroke-opacity="0.72" stroke-width="10" stroke-linecap="round"/>
          <path d="M-310 210C-106 112 30 72 244 2" fill="none" stroke="#4F9CFF" stroke-opacity="0.46" stroke-width="5" stroke-linecap="round"/>
          <circle cx="-210" cy="118" r="88" fill="#FF6B35" fill-opacity="0.12" stroke="#FF6B35" stroke-opacity="0.54" stroke-width="3"/>
          <circle cx="-58" cy="62" r="118" fill="#4F9CFF" fill-opacity="0.11" stroke="#4F9CFF" stroke-opacity="0.5" stroke-width="3"/>
          <circle cx="136" cy="-6" r="154" fill="#FF6B35" fill-opacity="0.1" stroke="#FF6B35" stroke-opacity="0.44" stroke-width="3"/>
          <path d="M266 -198L292 -124L368 -126L306 -80L330 -8L266 -52L202 -8L226 -80L164 -126L240 -124Z" fill="#4F9CFF" fill-opacity="0.32" stroke="#4F9CFF" stroke-opacity="0.72" stroke-width="3"/>
          <path d="M-420 -120L-308 -76L-204 -100L-92 -42L16 -64L112 -18L238 -40L358 8" fill="none" stroke="#F5F5F7" stroke-opacity="0.14" stroke-width="3" stroke-dasharray="18 18"/>
        </g>
      `,
    ),
  },
  {
    file: "google-ai-studio-gemini.png",
    svg: baseSvg(
      "gemini",
      `
        <g>${nodes(15, 36)}</g>
        <g transform="translate(800 455)" filter="url(#gemini-soft-glow)">
          <path d="M-430 -165C-236 -210 -82 -146 28 -28C-136 -38 -284 -4 -426 88Z" fill="#4F9CFF" fill-opacity="0.16" stroke="#4F9CFF" stroke-opacity="0.58" stroke-width="3"/>
          <path d="M430 165C236 210 82 146 -28 28C136 38 284 4 426 -88Z" fill="#FF6B35" fill-opacity="0.16" stroke="#FF6B35" stroke-opacity="0.58" stroke-width="3"/>
          <path d="M-126 -118L34 -178L158 -76L112 98L-44 158L-166 58Z" fill="#131316" fill-opacity="0.54" stroke="#F5F5F7" stroke-opacity="0.14" stroke-width="2"/>
          <path d="M-126 -118L34 -178L22 -22L-166 58Z" fill="#4F9CFF" fill-opacity="0.18"/>
          <path d="M34 -178L158 -76L112 98L22 -22Z" fill="#FF6B35" fill-opacity="0.18"/>
          <path d="M-166 58L22 -22L112 98L-44 158Z" fill="#F5F5F7" fill-opacity="0.05"/>
          <path d="M-520 0C-346 -92 -180 -64 22 -22C218 18 354 88 520 0" fill="none" stroke="#F5F5F7" stroke-opacity="0.16" stroke-width="3" stroke-dasharray="16 20"/>
        </g>
      `,
    ),
  },
];

await mkdir(coversDir, { recursive: true });

await Promise.all(
  covers.map(async (cover) => {
    await sharp(Buffer.from(cover.svg)).png().toFile(path.join(coversDir, cover.file));
  }),
);

console.log(`Generated ${covers.length} covers in ${coversDir}`);
