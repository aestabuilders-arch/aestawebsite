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

  it('emits the single office-located business entity, not a per-city one', () => {
    const { container } = render(
      <LocationHero {...props} citySlug="karaikudi" lat={10.07} lng={78.78} />,
    );
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent!),
    );
    const business = scripts.find((d) => d['@type'] === 'GeneralContractor');
    expect(business.geo.latitude).toBe(10.3833);
    expect(business['@id']).toMatch(/#localbusiness$/);
  });

  it('emits a city-scoped Service provided by the business', () => {
    const { container } = render(<LocationHero {...props} />);
    const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent!),
    );
    const service = scripts.find((d) => d['@type'] === 'Service');
    expect(service.areaServed.name).toBe('Pudukkottai');
    expect(service.provider['@id']).toMatch(/#localbusiness$/);
  });
});
