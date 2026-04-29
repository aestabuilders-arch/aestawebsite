import type { Thing, WithContext } from 'schema-dts';

type JsonLdProps = {
  data: WithContext<Thing> | Record<string, unknown>;
};

function safeStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStringify(data) }} />
  );
}
