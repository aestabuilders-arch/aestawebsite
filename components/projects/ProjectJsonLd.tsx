import { JsonLd } from '@/components/seo/JsonLd';
import { NAP } from '@/lib/constants/nap';
import type { ProjectContent } from '@/lib/content/projects';

type ProjectJsonLdProps = {
  project: ProjectContent;
  pageUrl: string;
};

export function ProjectJsonLd({ project, pageUrl }: ProjectJsonLdProps) {
  const images: string[] = [];

  if (project.cover) images.push(absoluteUrl(project.cover.src));
  if (project.threeView) {
    images.push(absoluteUrl(project.threeView.design.src));
    images.push(absoluteUrl(project.threeView.render.src));
    images.push(absoluteUrl(project.threeView.site.src));
  }
  if (project.gallery) {
    project.gallery.forEach((g) => images.push(absoluteUrl(g.src)));
  }

  const description =
    project.seo?.description ??
    project.brief ??
    `${project.name} — case study by AESTA Architects & Builders.`;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.name,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    image: images.length > 0 ? images : undefined,
    author: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
      url: NAP.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${NAP.siteUrl}/#organization`,
      name: NAP.name,
      url: NAP.siteUrl,
    },
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
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
  };

  if (project.facts.completionYear) {
    data.datePublished = `${project.facts.completionYear}-01-01`;
  }

  return <JsonLd data={data} />;
}

function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const prefix = path.startsWith('/') ? '' : '/';
  return `${NAP.siteUrl}${prefix}${path}`;
}
