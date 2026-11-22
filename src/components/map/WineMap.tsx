import { geoMercator, geoNaturalEarth1, type GeoProjection } from "d3-geo";
import type { Region } from "@/lib/content";
import { mapViews } from "./world-paths";
import { WineMapClient, type MapViewData } from "./WineMapClient";

type View = (typeof mapViews)[keyof typeof mapViews];

/** Rebuild the exact projection used by scripts/generate-map.ts. */
function projectionFor(view: View): GeoProjection {
  const base = view.name === "world" ? geoNaturalEarth1() : geoMercator();
  return base
    .rotate(view.rotate as unknown as [number, number, number])
    .center(view.center as unknown as [number, number])
    .scale(view.scale)
    .translate(view.translate as unknown as [number, number]);
}

/**
 * Interactive map of wine regions (server part).
 * Land shapes are rendered on the server as static SVG; markers and the info panel are
 * handled by the client component. Regions come from content/regiony.json.
 */
export function WineMap({ regions }: { regions: Region[] }) {
  const views: MapViewData[] = (["europe", "world"] as const).map((key) => {
    const view = mapViews[key];
    const projection = projectionFor(view);
    const markers = regions
      .map((r) => {
        const xy = projection([r.lon, r.lat]);
        return xy
          ? { id: r.id, x: (xy[0] / view.width) * 100, y: (xy[1] / view.height) * 100 }
          : null;
      })
      .filter((m): m is NonNullable<typeof m> => !!m && m.x > 1 && m.x < 99 && m.y > 1 && m.y < 99);
    return {
      key,
      label: key === "europe" ? "Europa" : "Świat",
      ratio: view.width / view.height,
      markers,
      background: (
        <svg
          viewBox={`0 0 ${view.width} ${view.height}`}
          className="block h-auto w-full"
          aria-hidden="true"
          focusable="false"
        >
          <rect width={view.width} height={view.height} fill="#fdfbf7" />
          <path d={view.graticule} fill="none" stroke="#efe6d6" strokeWidth="0.8" />
          <path
            d={view.land}
            fill="#e9dcc4"
            stroke="#cdb994"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
  });

  return <WineMapClient views={views} regions={regions} />;
}
