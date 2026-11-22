import type { Crumb } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "./PageHeader";
import { formatDate } from "@/lib/utils";

/** Layout for text pages (about, legal…). */
export function ProsePage({
  title,
  lead,
  eyebrow,
  crumbs,
  updated,
  children,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs: Crumb[];
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} lead={lead} eyebrow={eyebrow} crumbs={crumbs} />
      <div className="container-page pt-12">
        <div className="prose prose-lg prose-wine max-w-3xl">
          {updated && (
            <p className="text-ink-muted text-sm">Ostatnia aktualizacja: {formatDate(updated)}</p>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
