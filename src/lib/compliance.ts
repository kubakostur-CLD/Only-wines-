/**
 * Automated compliance checks for editorial content (Polish alcohol advertising law).
 *
 * Two severities:
 *  - "error":   commercial / sales language that is never allowed (build fails).
 *  - "warning": lifestyle or health associations that need a human editor's judgement.
 *
 * This is a safety net, NOT a substitute for the checklist in docs/content-guidelines.md.
 */

export type Severity = "error" | "warning";

export interface ComplianceIssue {
  severity: Severity;
  rule: string;
  match: string;
  line: number;
  message: string;
}

interface WordRule {
  rule: string;
  severity: Severity;
  message: string;
  /** Exact lowercase word forms. */
  words?: string[];
  /** Lowercase word prefixes (stems). */
  prefixes?: string[];
}

const WORD_RULES: WordRule[] = [
  {
    rule: "zakup",
    severity: "error",
    message: "Wezwanie do zakupu jest niedozwolone (art. 13¹ ustawy o wychowaniu w trzeźwości).",
    words: [
      "kup", "kupić", "kupisz", "kupię", "kupcie", "kupuj", "kupujcie", "kupując", "kupno", "kupna",
      "zakup", "zakupu", "zakupy", "zakupów", "zakupić", "kupowania",
      "zamów", "zamówić", "zamówienie", "zamówienia", "zamawiaj", "zamawiać",
    ],
  },
  {
    rule: "cena",
    severity: "error",
    message: "Nie podajemy cen ani informacji handlowych.",
    words: ["cena", "ceny", "cenie", "cenę", "ceną", "cenach", "cenowy", "cenowa", "zł", "złotych", "pln", "eur", "usd"],
    prefixes: ["promocj", "rabat", "zniżk", "przecen", "okazyjn"],
  },
  {
    rule: "sklep",
    severity: "error",
    message: "Brak linków i odniesień do sklepów z alkoholem.",
    prefixes: ["sklep", "e-sklep", "winiarni-online"],
  },
  {
    rule: "ocena-produktu",
    severity: "error",
    message: "Nie oceniamy ani nie polecamy konkretnych butelek i marek.",
    words: ["rekomendujemy", "bestseller", "bestsellery"],
    prefixes: ["najlepsze wino", "najlepszych win", "punktów parkera", "100-punkt", "wino roku"],
  },
  {
    rule: "polecenie",
    severity: "warning",
    message: "Sprawdź, czy „polecamy” nie dotyczy konkretnego wina lub marki.",
    words: ["polecamy", "polecam", "polecane", "polecana", "polecany"],
  },
  {
    rule: "zdrowie",
    severity: "warning",
    message: "Sprawdź, czy tekst nie łączy wina ze zdrowiem lub korzyściami zdrowotnymi.",
    prefixes: ["zdrow", "leczni", "leczy", "odporno", "resweratrol", "antyoksydan", "przeciwutlenia"],
  },
  {
    rule: "relaks-sukces",
    severity: "warning",
    message:
      "Sprawdź, czy tekst nie łączy alkoholu z relaksem, sukcesem, atrakcyjnością, seksualnością lub sportem.",
    prefixes: ["relaks", "odpręż", "zrelaks", "sukces", "atrakcyjn", "seks", "sport", "uwodz", "stres"],
  },
  {
    rule: "prowadzenie-pojazdu",
    severity: "warning",
    message: "Sprawdź kontekst odniesień do prowadzenia pojazdów.",
    prefixes: ["kierowc", "samochod", "prowadzeni"],
  },
  {
    rule: "nieletni",
    severity: "warning",
    message: "Treści nie mogą być kierowane do osób niepełnoletnich.",
    prefixes: ["dzieci", "dziecko", "nastolat", "młodzież", "uczni"],
  },
  {
    rule: "zachęta",
    severity: "warning",
    message: "Sprawdź, czy tekst nie zachęca do picia (tryb rozkazujący, „spróbuj”, „napij się”).",
    words: ["spróbuj", "spróbujcie", "napij", "wypij", "wypijcie", "skosztuj", "skosztujcie", "sięgnij"],
  },
];

/** Price-like patterns, e.g. "49 zł", "€12", "19,99". */
const PRICE_PATTERNS: RegExp[] = [/\d+[.,]?\d*\s?(zł|pln|€|eur|\$|usd)\b/iu, /[€$]\s?\d+/u];

/** Outbound domains that sell alcohol. */
const SHOP_LINK_PATTERNS: RegExp[] = [/https?:\/\/[^\s)]*(vivino|wine-searcher|winezja|ceneo|allegro|sklep|shop|store)[^\s)]*/iu];

/** Strip frontmatter, code and URLs so that e.g. "sklep" inside a slug does not trigger. */
function prepare(md: string): string[] {
  return md.split("\n").map((line) =>
    line
      .replace(/\]\([^)]*\)/g, "]") // remove link targets (checked separately)
      .replace(/`[^`]*`/g, " "),
  );
}

export function checkText(markdown: string, lineOffset = 0): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  const rawLines = markdown.split("\n");
  const lines = prepare(markdown);

  lines.forEach((line, idx) => {
    const lineNo = idx + 1 + lineOffset;
    const lower = line.toLowerCase();
    const words = lower.match(/[\p{L}\p{N}-]+/gu) ?? [];

    for (const r of WORD_RULES) {
      for (const w of words) {
        const hit =
          r.words?.includes(w) ||
          r.prefixes?.some((p) => (p.includes(" ") ? false : w.startsWith(p)));
        if (hit) issues.push({ severity: r.severity, rule: r.rule, match: w, line: lineNo, message: r.message });
      }
      for (const p of r.prefixes?.filter((x) => x.includes(" ")) ?? []) {
        if (lower.includes(p)) issues.push({ severity: r.severity, rule: r.rule, match: p, line: lineNo, message: r.message });
      }
    }

    for (const re of PRICE_PATTERNS) {
      const m = re.exec(line);
      if (m) issues.push({ severity: "error", rule: "cena", match: m[0], line: lineNo, message: "Wykryto cenę." });
    }
    for (const re of SHOP_LINK_PATTERNS) {
      const m = re.exec(rawLines[idx]);
      if (m) issues.push({ severity: "error", rule: "sklep", match: m[0], line: lineNo, message: "Link do sklepu jest niedozwolony." });
    }
  });

  return issues;
}

/** Image checks: every Markdown image needs descriptive alt text. */
export function checkImages(markdown: string, lineOffset = 0): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  markdown.split("\n").forEach((line, idx) => {
    for (const m of line.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
      if (m[1].trim().length < 10) {
        issues.push({
          severity: "error",
          rule: "alt",
          match: m[0],
          line: idx + 1 + lineOffset,
          message: "Obraz musi mieć opisowy tekst alternatywny (min. 10 znaków).",
        });
      }
    }
  });
  return issues;
}
