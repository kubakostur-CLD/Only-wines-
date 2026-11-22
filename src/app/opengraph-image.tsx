import { renderOg, ogSize } from "@/lib/og";
import { siteConfig } from "@/config/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;

export default function Image() {
  return renderOg({ title: "Opowieści o winie: kultura, historia i rzemiosło", eyebrow: "Magazyn o świecie wina" });
}
