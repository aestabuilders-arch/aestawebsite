import type { WithContext, BreadcrumbList } from 'schema-dts';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/navigation';
import { NAP } from '@/lib/constants/nap';

export type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const data: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem' as const,
      position: idx + 1,
      name: item.name,
      item: `${NAP.siteUrl}${item.href === '/' ? '' : item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="my-4 text-sm text-neutral-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-charcoal-900">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-neutral-400">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={data} />
    </nav>
  );
}
