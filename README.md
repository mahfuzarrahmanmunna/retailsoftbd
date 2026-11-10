# Retail Soft - marketing website

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/lib/content.ts` | **All site copy** (solutions, industries, services, FAQ, contact). Edit here. |
| `src/app/` | Routes: `/`, `/solutions[/slug]`, `/industries[/slug]`, `/services`, `/work`, `/about`, `/contact`, `/privacy-policy`, `/terms`, plus `sitemap.xml`, `robots.txt`, OG image, icon |
| `src/components/home/` | Homepage chapters (hero, human value, sticky ecosystem, solutions, industries, approach, engineering, growth, capabilities, CTA) |
| `src/components/three/` | WebGL scenes (lazy-loaded, poster-first, paused offscreen) |
| `src/components/mockups/` | Conceptual UI (labelled "Concept UI · sample data") |
| `src/app/contact/actions.ts`, `src/lib/leads.ts` | Lead pipeline: Zod validation, honeypot + min fill time, rate limit, idempotency, delivery |

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin for canonical URLs, sitemap, OG and schema |
| `LEADS_WEBHOOK_URL` | POST target for inquiries (CRM / automation). JSON body, `idempotency-key` header, 3 retries |
| `LEADS_WEBHOOK_SECRET` | Optional bearer token sent with the webhook |
| `SMTP_USER` / `SMTP_PASS` | Gmail address + **App Password** used by nodemailer to email every demo-popup and contact-form lead |
| `SMTP_HOST` / `SMTP_PORT` | Optional, default `smtp.gmail.com` / `465` |
| `LEADS_EMAIL_TO` | Inbox(es) that receive leads, comma-separated. Defaults to `SMTP_USER` |

Without a webhook (and always in development), leads are appended to `.data/leads.ndjson` (git-ignored).
For production, replace with PostgreSQL + Prisma and a shared rate-limit store (Redis) if running multiple instances.

## Design language - "Trusted Local Partner"

Built for Bangladeshi business owners: light and familiar, fast on mobile data.

- Palette: Retail Soft brand colours - ink, navy, teal, iris, cloud, mist, slate. Navy for dark sections, teal for main buttons and highlights, iris for accents; a darker `teal-text` keeps teal text readable on white. Tokens and role mapping in `src/app/globals.css`.
- Type: Hind Siliguri for both English and Bangla; every key heading has a Bangla line (`bn` fields in `src/lib/content.ts`).
- Contact always visible: top hotline bar, "Call Now" / "Get a Demo" in the header, floating WhatsApp + call buttons (`components/layout/FloatingContact.tsx`), hotline card in every page CTA.
- Simple sticky header with dropdowns; slide-in mobile drawer with call / WhatsApp buttons.
- No preloader, custom cursor, WebGL or scroll-jacking. The previous "Kinetic Editorial" design is archived in `../retailsoftbd-kinetic-design-backup.tar.gz`.

## Before launch (VERIFY)

- [ ] Approved SVG logo (current mark in `src/components/layout/Logo.tsx` and `src/app/icon.svg` is interim)
- [ ] Contact details, office hours, map link, response-time promise, budget ranges and "Why us" claims in `src/lib/content.ts`
- [ ] Bangla copy reviewed by a native editor
- [ ] Real product screenshots / workplace photography to replace or sit beside the concept UI
- [ ] Approved case studies → add `/work/[slug]`
- [ ] Legal review of `/privacy-policy` and `/terms`
- [x] Email notification via Gmail SMTP (`SMTP_USER` / `SMTP_PASS` in `.env.local`) - set the same vars on the hosting server
- [ ] Optional: `LEADS_WEBHOOK_URL` for a CRM
- [ ] Consent-aware analytics
