/**
 * Shared Open Graph image renderer (1200×630) using next/og.
 * Fonts are bundled locally (assets/fonts) and include latin-ext for Polish characters.
 */
import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

const font = (file: string) => fs.readFile(path.join(process.cwd(), "assets", "fonts", file));

export async function renderOg({ title, eyebrow }: { title: string; eyebrow: string }) {
  const [serif, serifExt, sans, sansExt] = await Promise.all([
    font("playfair-display-latin-600-normal.woff"),
    font("playfair-display-latin-ext-600-normal.woff"),
    font("inter-latin-500-normal.woff"),
    font("inter-latin-ext-500-normal.woff"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#4a1420",
        padding: "72px 80px",
        color: "#faf6ef",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 24,
          letterSpacing: 4,
          color: "#d8bc88",
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: 56, height: 2, background: "#d8bc88" }} />
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Playfair",
          fontSize: title.length > 60 ? 58 : 70,
          lineHeight: 1.12,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{ display: "flex", alignItems: "baseline", fontFamily: "Playfair", fontSize: 38 }}
      >
        Only<span style={{ fontStyle: "normal" }}>Wines</span>
        <span style={{ fontSize: 26, color: "#d8bc88" }}>.pl</span>
        <span style={{ marginLeft: "auto", fontFamily: "Inter", fontSize: 20, color: "#e6d8c0" }}>
          Magazyn o kulturze i historii wina
        </span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Playfair", data: serif, weight: 600, style: "normal" },
        { name: "Playfair", data: serifExt, weight: 600, style: "normal" },
        { name: "Inter", data: sans, weight: 500, style: "normal" },
        { name: "Inter", data: sansExt, weight: 500, style: "normal" },
      ],
    },
  );
}
