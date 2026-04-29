import type { WithContext, Person } from 'schema-dts';
import { JsonLd } from './JsonLd';
import { NAP } from '@/lib/constants/nap';

export type AuthorInfo = {
  name: string;
  credentials?: string;
  slug: string;
  photoUrl?: string;
};

type AuthorBylineProps = {
  author: AuthorInfo;
  publishedAt?: string;
};

export function AuthorByline({ author, publishedAt }: AuthorBylineProps) {
  const data: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${NAP.siteUrl}/about/team/${author.slug}`,
    name: author.name,
    jobTitle: author.credentials,
    image: author.photoUrl,
  };

  return (
    <div className="flex items-center gap-3">
      {author.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={author.photoUrl}
          alt={author.name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : null}
      <div className="text-sm">
        <p className="font-semibold">{author.name}</p>
        {author.credentials ? <p className="text-neutral-600">{author.credentials}</p> : null}
        {publishedAt ? (
          <p className="text-neutral-500">
            <time dateTime={publishedAt}>{publishedAt}</time>
          </p>
        ) : null}
      </div>
      <JsonLd data={data} />
    </div>
  );
}
