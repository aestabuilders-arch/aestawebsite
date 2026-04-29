import { JsonLd } from './JsonLd';
import { buildLocalBusiness } from '@/lib/schema/localBusiness';

type LocationHeroProps = {
  cityName: string;
  cityNameTa?: string;
  citySlug: string;
  lat: number;
  lng: number;
};

const BBOX_DELTA = 0.05; // ~5km square around the marker

function buildOsmEmbedUrl(lat: number, lng: number): string {
  const minLng = lng - BBOX_DELTA;
  const minLat = lat - BBOX_DELTA;
  const maxLng = lng + BBOX_DELTA;
  const maxLat = lat + BBOX_DELTA;
  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
  const marker = `${lat},${lng}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox,
  )}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
}

export function LocationHero({ cityName, cityNameTa, citySlug, lat, lng }: LocationHeroProps) {
  const schema = buildLocalBusiness({ cityName, cityNameTa, lat, lng, citySlug });

  return (
    <section className="my-8 grid gap-6 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">
          AESTA — Building in {cityName}
          {cityNameTa ? <span className="ml-2 text-neutral-500">/ {cityNameTa}</span> : null}
        </h1>
        <p className="mt-3 text-lg text-neutral-700">since 2010</p>
      </div>
      <div className="aspect-video overflow-hidden rounded-lg border border-neutral-200">
        <iframe
          src={buildOsmEmbedUrl(lat, lng)}
          title={`${cityName} location map`}
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <JsonLd data={schema} />
    </section>
  );
}
