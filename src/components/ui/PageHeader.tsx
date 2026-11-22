import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

/** Standard header for static and listing pages. */
export function PageHeader({
  title,
  lead,
  eyebrow,
  crumbs,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="border-b border-cream-300 bg-cream-50">
      <div className="container-page py-10 md:py-16">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className={`${eyebrow ? "mt-3" : "mt-8"} max-w-4xl text-4xl leading-[1.1] font-semibold md:text-6xl`}>
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>}
      </div>
    </header>
  );
}
