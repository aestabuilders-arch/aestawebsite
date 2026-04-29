import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YouTubeEmbed } from './YouTubeEmbed';

const props = {
  videoId: 'dQw4w9WgXcQ',
  title: 'Pushparaj Sustainable House Walkthrough',
  description: 'A 5-minute Tamil walkthrough of our 2400 sqft Onnangudi project.',
  uploadDate: '2026-03-15',
  durationISO8601: 'PT5M30S',
};

describe('YouTubeEmbed', () => {
  it('renders an iframe with the youtube embed URL', () => {
    render(<YouTubeEmbed {...props} />);
    const iframe = screen.getByTitle(props.title) as HTMLIFrameElement;
    expect(iframe.src).toContain('youtube.com/embed/dQw4w9WgXcQ');
  });

  it('lazy-loads the iframe', () => {
    render(<YouTubeEmbed {...props} />);
    const iframe = screen.getByTitle(props.title);
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('emits VideoObject JSON-LD with required fields', () => {
    const { container } = render(<YouTubeEmbed {...props} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('VideoObject');
    expect(data.name).toBe(props.title);
    expect(data.description).toBe(props.description);
    expect(data.uploadDate).toBe(props.uploadDate);
    expect(data.duration).toBe(props.durationISO8601);
    expect(data.contentUrl).toContain(props.videoId);
    expect(data.thumbnailUrl).toContain(props.videoId);
  });
});
