import Image from "next/image";

/**
 * Image with caption and credit, for use inside MDX:
 * <Figure src="/images/winnica.jpg" alt="…" caption="…" credit="Fot. …" width="1600" height="1067" />
 */
export function Figure({
  src,
  alt,
  caption,
  credit,
  width = "1600",
  height = "1000",
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: string | number;
  height?: string | number;
}) {
  return (
    <figure className="not-prose my-10">
      <Image
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        sizes="(min-width: 768px) 720px, 100vw"
        className="h-auto w-full rounded-sm"
      />
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-ink-muted">
          {caption}
          {credit && <span className="ml-1 text-xs">({credit})</span>}
        </figcaption>
      )}
    </figure>
  );
}
