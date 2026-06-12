import { JsonLd } from '@/components/seo/JsonLd';
import { NAP } from '@/lib/constants/nap';
import type { ProjectContent } from '@/lib/content/projects';

type ProjectsListJsonLdProps = {
  projects: ProjectContent[];
  pageUrl: string;
};

export function ProjectsListJsonLd({ projects, pageUrl }: ProjectsListJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AESTA Projects',
    description: 'Architectural and construction projects by AESTA Architects & Builders.',
    url: pageUrl,
    itemListElement: projects.map((project, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${NAP.siteUrl}/projects/${project.slug}`,
      item: {
        '@type': 'Article',
        headline: project.name,
        description: project.tagline,
        url: `${NAP.siteUrl}/projects/${project.slug}`,
        about: {
          '@type': 'Place',
          name: project.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: project.city,
            addressRegion: 'Tamil Nadu',
            addressCountry: 'IN',
          },
        },
      },
    })),
  };

  return <JsonLd data={data} />;
}
