import type { WithContext, Service } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { LOCAL_BUSINESS_ID, buildLocalBusiness } from '@/lib/schema/localBusiness';
import { NAP } from '@/lib/constants/nap';

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
  // One business entity sitewide (office geo); this page's city relevance is
  // carried by a Service scoped to the city and provided by that entity.
  const business = buildLocalBusiness();
  const cityService: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${NAP.siteUrl}/locations/${citySlug}#service`,
    name: `House construction, architecture and civil engineering in ${cityName}`,
    serviceType: 'Building construction',
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: {
      '@type': 'City',
      name: cityName,
      ...(cityNameTa ? { alternateName: cityNameTa } : {}),
      geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
    },
  };

  return (
    <section className="my-8 grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-terracotta-600">
          AESTA · Design-build architects &amp; builders
        </p>
        <h1 className="mt-2 text-4xl font-bold">
          Builders, Architects &amp; Civil Engineers in {cityName}
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
      <JsonLd data={business} />
      <JsonLd data={cityService} />
    </section>
  );
}
