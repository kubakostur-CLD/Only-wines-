/**
 * Generates elegant, brand-coloured SVG cover illustrations for the starter articles.
 * Run:  npx tsx scripts/generate-covers.ts
 *
 * They are placeholders that are 100% compliant (no bottles, labels or people drinking).
 * Replace them with your own photos any time: put a JPG/WebP in /public/images/ and change
 * `cover.src` in the article's frontmatter.
 */
import fs from "node:fs";
import path from "node:path";

const W = 1600;
const H = 900;
const C = {
  burgundy: "#6b1e2e",
  burgundyDark: "#4a1420",
  burgundyDeep: "#2e0c14",
  burgundyLight: "#8c2a40",
  cream: "#faf6ef",
  creamDeep: "#f1e8d9",
  sand: "#e6d8c0",
  gold: "#b08d57",
  goldLight: "#d8bc88",
  ink: "#2a2626",
  olive: "#5f6b45",
  oliveDark: "#3f4a2d",
};

const svg = (body: string, bg: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>\n`;

/** Rows of vines converging on rolling hills. */
function hills(opts: {
  sky: string;
  far: string;
  mid: string;
  near: string;
  line: string;
  sun?: boolean;
  cypress?: boolean;
}) {
  let rows = "";
  for (let i = 0; i < 22; i++) {
    const x0 = -200 + i * 95;
    rows += `<path d="M${x0} ${H} C ${x0 + 120} 780 ${x0 + 260} 700 ${x0 + 420} 650" stroke="${opts.line}" stroke-width="2" fill="none" opacity="0.55"/>`;
  }
  let cypresses = "";
  if (opts.cypress) {
    [
      [1060, 470],
      [1100, 455],
      [1140, 480],
      [300, 520],
      [1300, 500],
    ].forEach(([x, y]) => {
      cypresses += `<path d="M${x} ${y} C ${x - 14} ${y - 60} ${x - 6} ${y - 120} ${x} ${y - 150} C ${x + 6} ${y - 120} ${x + 14} ${y - 60} ${x} ${y}Z" fill="${C.oliveDark}"/>`;
    });
  }
  return svg(
    `${opts.sun ? `<circle cx="1250" cy="230" r="90" fill="${C.goldLight}" opacity="0.85"/>` : ""}
     <path d="M0 520 C 260 400 520 430 760 480 S 1240 380 1600 450 L1600 900 L0 900Z" fill="${opts.far}"/>
     ${cypresses}
     <path d="M0 620 C 300 540 600 600 900 610 S 1350 540 1600 580 L1600 900 L0 900Z" fill="${opts.mid}"/>
     <path d="M0 720 C 380 660 760 700 1050 720 S 1450 680 1600 700 L1600 900 L0 900Z" fill="${opts.near}"/>
     ${rows}`,
    opts.sky,
  );
}

/** Stacked oak barrels in a cellar. */
function barrels() {
  let b = "";
  const barrel = (cx: number, cy: number, r: number) => `
    <g>
      <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r}" fill="${C.burgundyLight}" stroke="${C.goldLight}" stroke-width="3"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.82}" ry="${r * 0.82}" fill="none" stroke="${C.goldLight}" stroke-width="2" opacity="0.7"/>
      ${Array.from({ length: 7 }, (_, i) => `<line x1="${cx - r * 0.78 + i * r * 0.26}" y1="${cy - Math.sqrt(Math.max(0, (r * 0.8) ** 2 - (-r * 0.78 + i * r * 0.26) ** 2))}" x2="${cx - r * 0.78 + i * r * 0.26}" y2="${cy + Math.sqrt(Math.max(0, (r * 0.8) ** 2 - (-r * 0.78 + i * r * 0.26) ** 2))}" stroke="${C.burgundyDark}" stroke-width="2" opacity="0.6"/>`).join("")}
      <circle cx="${cx}" cy="${cy}" r="${r * 0.08}" fill="${C.burgundyDeep}"/>
    </g>`;
  for (let i = 0; i < 6; i++) b += barrel(190 + i * 245, 700, 120);
  for (let i = 0; i < 5; i++) b += barrel(312 + i * 245, 480, 120);
  // Cellar arch
  const arch = `<path d="M0 900 L0 300 Q 800 -120 1600 300 L1600 900" fill="none" stroke="${C.gold}" stroke-width="3" opacity="0.5"/>
    <path d="M60 900 L60 330 Q 800 -50 1540 330 L1540 900" fill="none" stroke="${C.gold}" stroke-width="1.5" opacity="0.35"/>`;
  return svg(
    `${arch}<rect y="820" width="${W}" height="80" fill="${C.burgundyDeep}"/>${b}`,
    C.burgundyDark,
  );
}

/** Qvevri – a large clay vessel buried in the ground. */
function qvevri() {
  const soil = `<rect y="430" width="${W}" height="470" fill="#7a4a34"/><rect y="430" width="${W}" height="12" fill="${C.oliveDark}"/>`;
  const layers = Array.from(
    { length: 8 },
    (_, i) =>
      `<path d="M0 ${480 + i * 55} Q 800 ${470 + i * 55 + (i % 2 ? 14 : -14)} 1600 ${480 + i * 55}" stroke="#5d3626" stroke-width="2" fill="none" opacity="0.6"/>`,
  ).join("");
  const vessel = (cx: number, s: number) =>
    `<path d="M${cx - 60 * s} ${430} C ${cx - 210 * s} ${520} ${cx - 220 * s} ${700} ${cx} ${860} C ${cx + 220 * s} ${700} ${cx + 210 * s} ${520} ${cx + 60 * s} ${430}Z" fill="#c07a52" stroke="${C.goldLight}" stroke-width="3"/>
     <ellipse cx="${cx}" cy="430" rx="${62 * s}" ry="${16 * s}" fill="${C.burgundyDeep}" stroke="${C.goldLight}" stroke-width="3"/>`;
  return svg(
    `<circle cx="1300" cy="180" r="80" fill="${C.goldLight}" opacity="0.8"/>
     <path d="M0 430 L 220 250 L 420 380 L 640 200 L 900 360 L 1150 230 L 1400 340 L 1600 260 L1600 430Z" fill="${C.creamDeep}" opacity="0.6"/>
     ${soil}${layers}${vessel(560, 1.15)}${vessel(1060, 0.95)}`,
    "#e9dcc6",
  );
}

/** Grape cluster (optionally dusted with noble rot). */
function grapes(opts: { bg: string; berry: string; rot?: boolean; leaf?: string }) {
  let g = "";
  const rows = [5, 6, 6, 5, 5, 4, 3, 2, 1];
  rows.forEach((n, row) => {
    for (let i = 0; i < n; i++) {
      const cx = 800 - ((n - 1) * 70) / 2 + i * 70 + (row % 2 ? 6 : -6);
      const cy = 300 + row * 62;
      g += `<circle cx="${cx}" cy="${cy}" r="40" fill="${opts.berry}" stroke="${C.burgundyDeep}" stroke-width="2"/>`;
      g += `<circle cx="${cx - 12}" cy="${cy - 14}" r="8" fill="#fff" opacity="0.25"/>`;
      if (opts.rot) {
        for (let k = 0; k < 6; k++) {
          g += `<circle cx="${cx - 25 + ((k * 37 + row * 13) % 50)}" cy="${cy - 22 + ((k * 23 + i * 17) % 44)}" r="${2 + (k % 3)}" fill="${C.sand}" opacity="0.8"/>`;
        }
      }
    }
  });
  const leaf = opts.leaf
    ? `<path d="M820 250 C 900 120 1080 100 1180 160 C 1120 190 1150 260 1230 290 C 1130 330 1060 300 1020 260 C 990 330 900 330 820 250Z" fill="${opts.leaf}"/>
       <path d="M820 250 C 940 220 1060 200 1180 160" stroke="${C.cream}" stroke-width="2" fill="none" opacity="0.5"/>`
    : "";
  return svg(
    `${leaf}<path d="M800 300 C 790 220 760 170 720 130" stroke="${C.oliveDark}" stroke-width="10" fill="none" stroke-linecap="round"/>${g}`,
    opts.bg,
  );
}

/** Chalk cellar with rising bubbles – traditional method. */
function bubbles() {
  let b = "";
  for (let i = 0; i < 70; i++) {
    const x = 120 + ((i * 197) % 1360);
    const y = 120 + ((i * 113) % 700);
    const r = 4 + ((i * 7) % 16);
    b += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${C.goldLight}" stroke-width="${r > 12 ? 2 : 1.5}" opacity="${0.3 + (i % 5) * 0.12}"/>`;
  }
  const arches = Array.from(
    { length: 4 },
    (_, i) =>
      `<path d="M${-100 + i * 450} 900 L${-100 + i * 450} 420 Q ${125 + i * 450} 200 ${350 + i * 450} 420 L${350 + i * 450} 900" fill="none" stroke="${C.cream}" stroke-width="2" opacity="0.18"/>`,
  ).join("");
  return svg(`${arches}${b}`, C.burgundyDeep);
}

/** Vine leaf and a magnified insect – phylloxera. */
function phylloxera() {
  const leaf = `<path d="M560 700 C 380 560 360 360 470 250 C 520 330 600 330 640 260 C 660 340 760 360 800 300 C 860 380 840 470 780 520 C 860 540 900 610 880 680 C 780 700 700 690 640 640 C 640 700 610 730 560 700Z" fill="${C.olive}" stroke="${C.oliveDark}" stroke-width="4"/>
    <path d="M560 700 L 470 300 M560 700 L 790 330 M560 700 L 860 650 M560 700 L 640 280" stroke="${C.creamDeep}" stroke-width="3" opacity="0.6" fill="none"/>`;
  const lens = `<circle cx="1120" cy="420" r="230" fill="${C.cream}" stroke="${C.gold}" stroke-width="10"/>
    <line x1="1280" y1="590" x2="1420" y2="760" stroke="${C.gold}" stroke-width="26" stroke-linecap="round"/>
    <ellipse cx="1120" cy="420" rx="70" ry="45" fill="${C.goldLight}" stroke="${C.ink}" stroke-width="3"/>
    ${[-1, 1].map((s) => [0, 1, 2].map((k) => `<path d="M${1120 + s * 30 - 30 + k * 30} ${420 + s * 40} l ${s * 10} ${s * 40}" stroke="${C.ink}" stroke-width="3"/>`).join("")).join("")}
    <circle cx="1060" cy="410" r="6" fill="${C.ink}"/>`;
  return svg(`${leaf}${lens}`, C.creamDeep);
}

/** Cork oak tree with stripped trunk. */
function cork() {
  return svg(
    `<rect y="680" width="${W}" height="220" fill="#c9a86a"/>
     <path d="M0 690 C 400 650 900 700 1600 670 L1600 900 L0 900Z" fill="#b89558"/>
     <path d="M760 690 C 750 560 740 470 700 380 L 860 380 C 830 470 830 560 840 690Z" fill="#a0442a"/>
     <path d="M752 600 C 760 520 750 460 720 400 L 760 400 C 770 470 780 530 770 600Z" fill="#6b3a22" opacity="0.6"/>
     <ellipse cx="780" cy="300" rx="360" ry="170" fill="${C.oliveDark}"/>
     <ellipse cx="600" cy="320" rx="200" ry="110" fill="${C.olive}"/>
     <ellipse cx="960" cy="320" rx="210" ry="110" fill="${C.olive}"/>
     <circle cx="1350" cy="160" r="70" fill="${C.cream}" opacity="0.8"/>`,
    "#e8c98d",
  );
}

/** Misty river valley with terraces – Tokaj. */
function misty() {
  let terraces = "";
  for (let i = 0; i < 9; i++) {
    terraces += `<path d="M${200 + i * 20} ${380 + i * 38} Q 700 ${330 + i * 38} ${1200 - i * 20} ${390 + i * 38}" stroke="${C.goldLight}" stroke-width="2" fill="none" opacity="0.5"/>`;
  }
  return svg(
    `<path d="M0 520 C 200 380 380 300 640 260 C 900 230 1100 320 1300 420 C 1420 470 1520 500 1600 520 L1600 900 L0 900Z" fill="${C.burgundyLight}"/>
     ${terraces}
     <rect y="560" width="${W}" height="80" fill="${C.cream}" opacity="0.35"/>
     <rect y="610" width="${W}" height="60" fill="${C.cream}" opacity="0.25"/>
     <path d="M0 760 C 400 700 900 800 1600 730 L1600 900 L0 900Z" fill="${C.burgundyDark}"/>
     <path d="M0 800 C 500 760 1000 840 1600 790" stroke="${C.goldLight}" stroke-width="5" fill="none" opacity="0.6"/>`,
    "#c9a3a8",
  );
}

const covers: Record<string, string> = {
  "dlaczego-wino-dojrzewa-w-debowych-beczkach": barrels(),
  "qvevri-8000-lat-gruzinskiej-tradycji": qvevri(),
  "enoturystyka-w-polsce-szlaki-i-regiony-winiarskie": hills({
    sky: "#dfe6d8",
    far: "#9aa77e",
    mid: C.olive,
    near: C.oliveDark,
    line: C.goldLight,
    sun: true,
  }),
  "szlachetna-plesn-botrytis-cinerea": grapes({
    bg: C.creamDeep,
    berry: "#c39a4a",
    rot: true,
    leaf: C.olive,
  }),
  "metoda-tradycyjna-jak-powstaja-babelki": bubbles(),
  "filoksera-zaraza-ktora-zmienila-winnice-europy": phylloxera(),
  "szlak-winny-toskanii": hills({
    sky: "#f3dcc0",
    far: "#c9a46f",
    mid: "#9a8a52",
    near: C.oliveDark,
    line: C.cream,
    sun: true,
    cypress: true,
  }),
  "korek-ciekawostki-o-debie-korkowym": cork(),
  "pinot-noir-kaprysny-szczep": grapes({ bg: C.cream, berry: "#4b2a4a", leaf: C.oliveDark }),
  "tokaj-region-ktory-pokochala-dawna-polska": misty(),
  domyslna: hills({
    sky: C.creamDeep,
    far: C.sand,
    mid: C.burgundyLight,
    near: C.burgundy,
    line: C.goldLight,
  }),
};

const dir = path.join(process.cwd(), "public", "images", "okladki");
fs.mkdirSync(dir, { recursive: true });
for (const [name, content] of Object.entries(covers)) {
  fs.writeFileSync(path.join(dir, `${name}.svg`), content.replace(/\s{2,}/g, " "));
}
console.log(`Generated ${Object.keys(covers).length} covers in public/images/okladki/`);
