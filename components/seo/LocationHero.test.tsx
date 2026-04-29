import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LocationHero } from './LocationHero';

const props = {
  cityName: 'Pudukkottai',
  cityNameTa: 'புதுக்கோட்டை',
  citySlug: 'pudukkottai',
  lat: 10.3833,
  lng: 78.8001,
};

describe('LocationHero', () => {
  it('renders the city name and tagline', () => {
    render(<LocationHero {...props} />);
    expect(screen.getByRole('heading', { name: /Pudukkottai/ })).toBeInTheDocument();
    expect(screen.getByText(/since 2010/i)).toBeInTheDocument();
  });

  it('renders an iframe with OSM embed URL containing the marker', () => {
    render(<LocationHero {...props} />);
    const iframe = screen.getByTitle(/Pudukkottai location/i) as HTMLIFrameElement;
    expect(iframe.src).toContain('openstreetmap.org/export/embed.html');
    expect(iframe.src).toContain('marker=10.3833%2C78.8001');
  });

  it('iframe lazy-loads', () => {
    render(<LocationHero {...props} />);
    const iframe = screen.getByTitle(/Pudukkottai location/i);
    expect(iframe).toHaveAttribute('loading', 'lazy');
  });

  it('emits LocalBusiness JSON-LD with correct geo and citySlug-keyed @id', () => {
    const { container } = render(<LocationHero {...props} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.geo.latitude).toBe(10.3833);
    expect(data.geo.longitude).toBe(78.8001);
    expect(data['@id']).toContain('pudukkottai');
  });
});
