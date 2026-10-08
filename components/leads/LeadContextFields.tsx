'use client';

import { useEffect, useState } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;
const STORAGE_KEY = 'aesta_utm';

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

// UTM tags only appear on the landing URL; visitors usually reach the form a
// page or two later. Remember the first-touch tags for the session.
function readUtm(): Utm {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) fromUrl[key] = v;
  }
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}') as Utm;
  } catch {
    return fromUrl;
  }
}

/**
 * Hidden inputs every lead form carries: the page the enquiry came from, any
 * campaign UTM tags, and a honeypot ("website") that only bots fill in.
 */
export function LeadContextFields() {
  const [page, setPage] = useState('');
  const [utm, setUtm] = useState<Utm>({});

  useEffect(() => {
    setPage(window.location.pathname);
    setUtm(readUtm());
  }, []);

  return (
    <>
      <input type="hidden" name="page" value={page} />
      {UTM_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={utm[key] ?? ''} />
      ))}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}
