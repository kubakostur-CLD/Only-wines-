import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Callout } from "./Callout";
import { Figure } from "./Figure";
import { PartnerBox } from "@/components/monetization/PartnerBox";
import type { PartnerId } from "@/config/partners";

/**
 * Components available inside MDX articles. JavaScript expressions are blocked in MDX
 * (safer for editors), so all props are plain strings.
 */
const components = {
  Callout,
  Figure,
  PartnerBox: (props: {
    partner: PartnerId;
    query?: string;
    title?: string;
    label?: string;
    description?: string;
  }) => <PartnerBox {...props} />,
  // Internal links use next/link; external links open in a new tab.
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  // Plain Markdown images: lazy-loaded
  img: ({ src = "", alt = "" }: { src?: string; alt?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" className="rounded-sm" />
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
    />
  );
}
