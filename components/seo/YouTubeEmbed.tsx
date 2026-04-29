import type { WithContext, VideoObject } from 'schema-dts';
import { JsonLd } from './JsonLd';

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
  durationISO8601: string;
};

export function YouTubeEmbed({
  videoId,
  title,
  description,
  uploadDate,
  durationISO8601,
}: YouTubeEmbedProps) {
  const data: WithContext<VideoObject> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    uploadDate,
    duration: durationISO8601,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };

  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
      <JsonLd data={data} />
    </div>
  );
}
