import { ImageResponse } from 'next/og';
import { locales } from '@/i18n/config';
import { NAP } from '@/lib/constants/nap';

// Site-wide default social-share card. Applies to every route under [locale]
// unless a page sets its own openGraph.images (e.g. project case studies use
// their cover). System font only — no Tamil glyphs — so no font bundling.
export const runtime = 'edge';
export const alt = 'AESTA — Architects & Builders, Pudukkottai, Tamil Nadu';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const COLORS = {
  bg: '#1a1918', // charcoal-900
  accent: '#c45a3a', // terracotta-500
  cream: '#faf7f2', // limestone-50
  muted: '#e9dfcc', // limestone-200
};

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLORS.bg,
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: COLORS.accent,
            }}
          />
          <div style={{ fontSize: '34px', color: COLORS.cream, letterSpacing: '0.18em' }}>
            AESTA
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: '68px', fontWeight: 700, color: COLORS.cream, lineHeight: 1.05 }}>
            Architects &amp; Builders
          </div>
          <div style={{ fontSize: '34px', color: COLORS.muted }}>
            Design-build homes by NIT Trichy architects · since 2010
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ height: '4px', width: '64px', backgroundColor: COLORS.accent }} />
          <div style={{ fontSize: '30px', color: COLORS.muted }}>
            {`Pudukkottai · Karaikudi · Trichy · Thanjavur · ${NAP.siteUrl.replace('https://', '')}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
