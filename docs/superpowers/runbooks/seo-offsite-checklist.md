# AESTA SEO/AEO — Off-site action checklist

**For: Hari.** These are the manual, off-site actions that the code cannot do for you. They matter more than any on-page change right now, because the root cause of "no inquiries" is that **Google has never indexed the site** (`site:aesta.co.in` returns nothing) and there is **no Google Business Profile** to appear in the local map pack.

Do them roughly in this order — items 1–3 are the unblockers and should happen the day the latest deploy goes live.

The on-page/code side (verification meta tag, analytics, schema, tier-2 city pages, cost guides, llms.txt) is already done and committed on the `seo-aeo-recovery` branch. Several steps below plug values into env vars that the code is already waiting for.

---

## 1. Google Search Console — verify + submit sitemap (do first; ~30 min)

This is the single most important step. Without it Google has no reliable signal to crawl and index the site.

1. Go to https://search.google.com/search-console and add a property for `aesta.co.in`.
2. **Verification — pick one:**
   - **Domain property (best):** add the TXT record Google gives you to GoDaddy DNS. Covers all subdomains and both http/https.
   - **URL-prefix property (easiest with our code):** choose the **HTML tag** method, copy the `content="..."` token, set it as `GOOGLE_SITE_VERIFICATION` in Vercel (Project → Settings → Environment Variables), and redeploy. The site renders the tag automatically.
3. Once verified, open **Sitemaps** and submit: `https://aesta.co.in/sitemap.xml`
4. Use **URL Inspection** → "Request indexing" on the key pages so they queue immediately:
   - `https://aesta.co.in/`
   - `/pricing`, `/services`, `/locations`
   - `/guides/construction-cost-per-sqft-tamil-nadu`
   - `/locations/pudukkottai`, `/locations/karaikudi`, `/locations/trichy`
5. Check back in 1–2 weeks: URL Inspection should say "URL is on Google", and `site:aesta.co.in` should start returning pages.

---

## 2. Google Business Profile — create + verify (do first; biggest local-search lever)

GBP is what puts you in the Google Maps "3-pack" for "builders near me" / "construction company Pudukkottai". The site cannot rank there; only a verified GBP can.

1. Create at https://business.google.com.
2. **Name:** `AESTA — Architects & Builders` (match the website exactly).
3. **Primary category:** `Construction company`. **Secondary:** `Architect`, `Building design company`, `General contractor`.
4. **Address:** Padmavathy Apartments, 1595 North Second Street, Pudukkottai, Tamil Nadu 622001.
5. **Service area:** add the cities — Pudukkottai, Karaikudi, Aranthangi, Trichy, Thanjavur (+ tier-2 towns).
6. **Phone:** +91-9176137043. **Website:** https://aesta.co.in.
7. **Hours**, and **10+ photos** (use the Padmavathy Apartments project photos already in the repo; add site and team photos).
8. Complete verification (video or postcard).
9. After it's live, copy the GBP URL and Instagram/Facebook URLs into the `NEXT_PUBLIC_SOCIAL_PROFILES` env var in Vercel (comma-separated) and redeploy — the code adds them to the Organization `sameAs` schema, which links your site and your GBP into one entity for Google.

---

## 3. Bing Webmaster Tools — verify + submit (feeds ChatGPT/Copilot)

Bing's index feeds Microsoft Copilot and parts of ChatGPT search — a direct AEO win.

1. Go to https://www.bing.com/webmasters. You can import the property straight from Google Search Console once #1 is done.
2. If verifying by meta tag: set `BING_SITE_VERIFICATION` in Vercel and redeploy (the code renders it).
3. Submit the sitemap: `https://aesta.co.in/sitemap.xml`.
4. (Optional) IndexNow is pre-wired: the key file `public/154ab2f087eb1ad1598c13543d71bf29.txt` is live, so you can submit changed URLs via Bing's IndexNow tab without extra setup.

---

## 4. Directory citations (week 1–2; backlinks + page-1 coverage)

Directories dominate page 1 for "builders in {city}" and double as backlinks. Create listings with **NAP that exactly matches the site footer** (Name, Address, Phone — identical formatting).

- JustDial, Sulekha, Houzz, IndiaMART, 99acres (these are the ones already ranking for our target queries).
- Use the same description, categories, and photos as GBP for consistency.
- Inconsistent NAP across directories actively hurts local ranking — copy-paste, don't retype.

---

## 5. Reviews engine (ongoing; rating shows in the map pack)

1. From GBP, get the "review link" and WhatsApp it to past happy clients (you have 100+ delivered projects — this is your biggest untapped asset).
2. Target **10+ Google reviews in month 1.** The star rating shows in the map pack and influences ranking.
3. As reviews accrue, the site's `/reviews` page and the LocalBusiness `aggregateRating` schema activate automatically once there are 3+ (already coded).

---

## 6. Backlinks from the Neram ecosystem (week 2+)

Link to `aesta.co.in` from any related sites you control (Neram, partner orgs). A handful of relevant links accelerates Google trusting a new domain.

---

## 7. Confirm Vercel env vars match real NAP (carry-over from launch checklist)

The site reads business phone/email/WhatsApp from env vars, falling back to code defaults. Production currently shows a placeholder phone in some builds. Either set these correctly in Vercel or unset them so the code defaults apply, then redeploy:

- `NEXT_PUBLIC_BUSINESS_PHONE` = `+91-9176137043`
- `NEXT_PUBLIC_BUSINESS_WHATSAPP` = `+91-9176137043`
- `NEXT_PUBLIC_BUSINESS_EMAIL` = `aestabuilders@gmail.com`
- `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` — from steps 1 & 3
- `NEXT_PUBLIC_SOCIAL_PROFILES` — from step 2
- `NEXT_PUBLIC_LOGO_URL` — once a square logo asset exists (feeds Organization `logo`)

---

## What to expect (timeline)

- **Week 1–2:** GSC shows pages getting indexed; `site:aesta.co.in` starts returning results.
- **Week 2–4:** GBP appears in Maps for Pudukkottai searches; first impressions show in GSC's Performance report for "builders in pudukkottai"-type queries.
- **Month 2–3:** cost-guide pages begin ranking for "house construction cost in {city}" queries; first AI-engine citations (test by asking ChatGPT/Perplexity "construction companies in Pudukkottai").

## 30-day checkpoint — what to measure

- Indexed page count in GSC (target: most of the ~60 sitemap URLs).
- Map-pack presence for "construction company Pudukkottai" / "builders in Pudukkottai".
- GSC Performance: impressions and the queries you're appearing for.
- AEO spot-check: ask ChatGPT and Perplexity "who are the architects/builders in Pudukkottai" and see if AESTA is named.
