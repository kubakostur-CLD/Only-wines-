# OnlyWines.pl

A Polish-language editorial magazine about the culture, history and craft of wine: facts, winemaking techniques, grape varieties, wine regions and wine tourism. The site is **educational and cultural only**. It does not sell or advertise alcohol, and it is built to comply with the Polish *Ustawa o wychowaniu w trzeźwości i przeciwdziałaniu alkoholizmowi*.

**Stack:** Next.js 16 (App Router, static generation) · TypeScript · Tailwind CSS v4 · MDX content · deployed on Vercel.

---

## Contents

1. [Quick start](#1-quick-start)
2. [Project structure](#2-project-structure)
3. [Adding and editing content](#3-adding-and-editing-content)
4. [Compliance safeguards](#4-compliance-safeguards)
5. [Affiliate partners and ads](#5-affiliate-partners-and-ads)
6. [Analytics, newsletter and forms](#6-analytics-newsletter-and-forms)
7. [Deployment on Vercel + the onlywines.pl domain](#7-deployment-on-vercel--the-onlywinespl-domain)
8. [Pre-launch checklist](#8-pre-launch-checklist)
9. [Scripts reference](#9-scripts-reference)

---

## 1. Quick start

Requirements: **Node.js 20.9+** (22 LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local   # optional – every feature works without it
npm run dev                  # http://localhost:3000
```

On first visit you will see the 18+ age gate, then the cookie banner. That's expected.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Content compliance check + production build |
| `npm start` | Serve the production build locally |
| `npm run check:content` | Check all articles/data against the compliance rules |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run format` | Prettier |

## 2. Project structure

```
content/
  artykuly/*.mdx          ← articles (one file per article; _szablon.mdx = template)
  ciekawostki-dnia.json   ← "Ciekawostka dnia" facts (rotates daily)
  slowniczek.json         ← glossary entries
  quiz.json               ← quiz questions
  regiony.json            ← points on the interactive map
  autorzy.json            ← author profiles
docs/content-guidelines.md ← editorial + legal checklist (READ THIS)
public/images/            ← images (okladki/ = generated cover illustrations)
scripts/
  check-content.ts        ← compliance checker (runs before every build)
  generate-covers.ts      ← regenerates the SVG cover illustrations
  generate-map.ts         ← regenerates the world/Europe map shapes
src/
  app/                    ← routes (pages, sitemap, robots, RSS, OG images)
  components/             ← UI, layout, article, compliance, monetization, map, quiz
  config/site.ts          ← site name, URL, navigation, categories, legal details
  config/partners.ts      ← ALL affiliate partners (single source of truth)
  lib/                    ← content loading, SEO/JSON-LD, consent, compliance rules
```

URLs are Polish and SEO-friendly: `/{kategoria}/{slug}`, e.g. `/enoturystyka/szlak-winny-toskanii`.

## 3. Adding and editing content

No coding needed, only text files. You can edit them directly on GitHub in the browser (open the file → pencil icon → "Commit changes"). Vercel redeploys automatically in about a minute.

### New article

1. Copy `content/artykuly/_szablon.mdx` and name it after the slug, e.g. `content/artykuly/winnice-mozeli.mdx`.
2. Fill in the frontmatter (the block between `---` lines):
   - `slug` must match the file name, use lowercase ASCII only (no ą, ę…) and hyphens.
   - `category`: one of `ciekawostki`, `jak-powstaje-wino`, `historia-wina`, `szczepy`, `regiony-winiarskie`, `enoturystyka`.
   - `cover.src` + a descriptive Polish `cover.alt`.
   - Optional: `faq` (adds FAQ rich results), `partners` (adds a partner box), `region` (links to the map).
3. Write the body in Markdown. `##` headings automatically build the table of contents.
4. Go through **`docs/content-guidelines.md`** and then set `complianceChecked: true`. Use `draft: true` to hide an unfinished article.
5. Run `npm run check:content` (or just push; the build runs it and will fail on errors).

Components you can use inside an article:

```mdx
<Callout type="ciekawostka">Short highlighted fact.</Callout>        {/* types: ciekawostka | info | definicja */}
<Figure src="/images/winnica.jpg" alt="Opis zdjęcia" caption="Podpis" credit="Fot. Autor" />
<PartnerBox partner="booking" query="Tokaj" title="Planujesz podróż?" label="Noclegi w regionie Tokaj" />
```

> JavaScript expressions are disabled in MDX for safety, so all component props are plain strings.

### Images

- Put photos in `public/images/` (JPG or WebP, around 1600×900 px, under 400 KB). `next/image` serves optimized AVIF/WebP automatically.
- Starter covers are generated SVG illustrations (`scripts/generate-covers.ts`). They are on-brand and compliant, but replacing them with real photos of vineyards, cellars and landscapes will make the site even better. Good sources: your own photos, regional tourism boards (ask for permission), Unsplash/Pexels (check the licence). **Never** use bottle close-ups with visible brands or people drinking.

### Facts, glossary, quiz, map

Edit the JSON files in `content/`. Each file is validated on build. A typo such as a missing comma shows a clear error message.

- **Fact of the day** (`ciekawostki-dnia.json`): one fact per day in rotation, based on the Warsaw date. The home page refreshes hourly (ISR), so no redeploy is needed.
- **Map** (`regiony.json`): add `lat`/`lon` (decimal degrees) and the point appears automatically. Points outside Europe appear in the "Świat" view.

## 4. Compliance safeguards

These are implemented as hard rules in the code:

| Requirement | Where |
| --- | --- |
| 18+ age gate on first visit, remembered 12 months | `src/components/compliance/AgeGate.tsx` |
| Responsible-approach note + help resource in footer | `ResponsibleNote.tsx`, `siteConfig.helpResource` |
| No prices / "kup" / shop links / bottle ratings | `src/lib/compliance.ts` + `npm run check:content` (runs before every build) |
| Health, success, sport, driving, minors wording flagged for review | same checker (warnings) |
| Alt text required on all images | content schema + checker |
| Editor sign-off on every article | `complianceChecked: true` is required by the schema |
| Partner links only in allowed, non-alcohol categories; blocked alcohol-shop domains | `src/config/partners.ts` |
| No Product/Offer/Review schema | `src/lib/seo.ts` |
| RODO/GDPR cookie consent, Consent Mode v2, nothing optional loads before consent | `CookieConsent.tsx`, `Analytics.tsx` |

> ⚠️ The automated checks are a safety net, not legal advice. Have the legal pages and your first articles reviewed by a Polish lawyer before launch.

## 5. Affiliate partners and ads

### How it works

All partners live in **`src/config/partners.ts`**. Each partner has a category (only `wycieczki`, `noclegi`, `podroze`, `edukacja`, `ksiazki` or `akcesoria` are possible, so alcohol shops cannot be added by mistake) and a `buildUrl()` function. Partner IDs come from environment variables, so no IDs are hard-coded.

Every partner link is rendered by `<AffiliateLink>` with `rel="sponsored nofollow noopener"`, opens in a new tab and appears inside a `<PartnerBox>` labelled **"Link partnerski"**, with a link to the disclosure page `/linki-partnerskie`.

### Configure an existing partner

Sign up for the programme, then add the ID in Vercel → Project → Settings → Environment Variables (and in `.env.local` for local testing):

| Partner | Variable | Programme |
| --- | --- | --- |
| GetYourGuide | `NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID` | partner.getyourguide.com |
| Viator | `NEXT_PUBLIC_VIATOR_PID`, `NEXT_PUBLIC_VIATOR_MCID` | partnerresources.viator.com |
| Booking.com | `NEXT_PUBLIC_BOOKING_AID` | Booking.com Affiliate Partner Programme |
| Amazon.pl | `NEXT_PUBLIC_AMAZON_TAG` | Amazon Associates (Program Partnerski Amazon) |
| Empik, Skyscanner, Rentalcars, WSET | `NEXT_PUBLIC_*_DEEPLINK_TEMPLATE` | via an affiliate network (e.g. Awin, Convertiser, Impact). Paste the network's deeplink with `{url}` where the target URL goes |

After changing environment variables, redeploy (Vercel → Deployments → ⋯ → Redeploy).

### Add a new partner

1. In `src/config/partners.ts`, add an entry to `partners`:

   ```ts
   mojpartner: {
     id: "mojpartner",
     name: "Mój Partner",
     category: "noclegi",
     defaultLabel: "Znajdź nocleg",
     buildUrl: (query) => `https://example.com/search?q=${q(query)}&aff=${process.env.NEXT_PUBLIC_MOJPARTNER_ID || ""}`,
   },
   ```

2. Add `NEXT_PUBLIC_MOJPARTNER_ID=` to `.env.example` and set it in Vercel.
3. Use it in an article: `partners: [{ id: mojpartner, query: "Tokaj" }]` or `<PartnerBox partner="mojpartner" query="Tokaj" />`.

`NEXT_PUBLIC_*` variables must be read literally, as `process.env.NEXT_PUBLIC_X`, so Next.js can inline them.

### Google AdSense

1. Apply at adsense.google.com once the site has content and the legal pages are complete.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…` and replace the placeholder `slot` values (`home-middle`, `listing-bottom`, `article-bottom`) in the `<AdSlot>` usages with real ad-unit IDs.
3. **Required in the EU:** Google only serves ads in the EEA through a Google-certified consent platform (IAB TCF). The simplest option is AdSense → Privacy & messaging → "European regulations" message, which is free. When you enable it, keep this site's banner for analytics only or switch fully to the certified one.
4. In AdSense → Blocking controls → Sensitive categories, **block "Alcohol"** (and gambling/dating) so no alcohol ads appear on the site.

Ads only render after the visitor accepts advertising cookies, are labelled "Reklama", and reserve space to avoid layout shift.

## 6. Analytics, newsletter and forms

| Feature | Variables | Notes |
| --- | --- | --- |
| Plausible (default) | `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=onlywines.pl` | Create the site at plausible.io. EU-hosted and cookieless, but still loaded only after consent |
| Google Analytics 4 | `NEXT_PUBLIC_ANALYTICS_PROVIDER=ga4`, `NEXT_PUBLIC_GA4_ID=G-…` | Consent Mode v2 defaults to "denied" |
| Newsletter | `NEXT_PUBLIC_NEWSLETTER_ACTION` | The form's POST URL from MailerLite / Brevo (embedded form → HTML code → `action="…"`). Field name is `email`. Without it the form shows "wkrótce" |
| Contact & Współpraca forms | `NEXT_PUBLIC_FORMSPREE_CONTACT` | Create a form at formspree.io and paste its endpoint. Without it, the form opens the visitor's e-mail app |
| Contact e-mail | `NEXT_PUBLIC_CONTACT_EMAIL` | Shown on the contact and legal pages |

## 7. Deployment on Vercel + the onlywines.pl domain

1. **Vercel account:** sign up at vercel.com with your GitHub account (the Hobby plan is free; note that Vercel's Hobby plan is for non-commercial use, so switch to Pro once you earn from ads or affiliates).
2. **Import the repo:** Add New → Project → select `Only-wines-` → Framework preset "Next.js" is detected → Deploy. No build settings need changing.
3. **Environment variables:** Project → Settings → Environment Variables. At minimum set `NEXT_PUBLIC_SITE_URL=https://onlywines.pl`. Add the others as you sign up for services.
4. **Domain:** Project → Settings → Domains → add `onlywines.pl` and `www.onlywines.pl`. Vercel shows the DNS records to create. At your domain registrar (e.g. OVH, home.pl, nazwa.pl) set:
   - `A` record for `@` → the IP shown by Vercel,
   - `CNAME` for `www` → the value shown by Vercel (e.g. `cname.vercel-dns.com`).

   Choose `onlywines.pl` as primary and redirect `www` to it. HTTPS certificates are automatic. DNS changes can take up to a few hours.
5. **Preview deployments:** every branch and pull request gets its own preview URL. `robots.txt` blocks indexing on previews automatically.
6. **Google Search Console:** add the domain property `onlywines.pl` (verify via a DNS TXT record), then submit `https://onlywines.pl/sitemap.xml`. Do the same in Bing Webmaster Tools.

## 8. Pre-launch checklist

- [ ] Fill in `legalConfig` in `src/config/site.ts` (operator name, address, NIP). Search the project for `[UZUPEŁNIJ`.
- [ ] Set up the `kontakt@onlywines.pl` mailbox (or change `NEXT_PUBLIC_CONTACT_EMAIL`).
- [ ] Verify the help resource in `siteConfig.helpResource` (KCPU website and the helpline number **800 199 990**). Check on kcpu.gov.pl that it is current.
- [ ] Choose the newsletter provider and update its name on the privacy policy page.
- [ ] Have a lawyer review: Polityka prywatności, Regulamin, Polityka cookies, Linki partnerskie and the content guidelines.
- [ ] Sign the data processing agreements (DPA/umowa powierzenia) offered by Vercel, Formspree, your newsletter provider and Plausible. Most are accepted in account settings.
- [ ] Replace starter cover illustrations with your own compliant photos (optional, but recommended).
- [ ] Set up Search Console and submit the sitemap.
- [ ] Plausible: create the site; then accept the cookie banner on your own visit and confirm data arrives.

## 9. Scripts reference

- `scripts/check-content.ts`: compliance and frontmatter validation. Errors fail the build, warnings need human review.
- `scripts/generate-covers.ts`: run `npx tsx scripts/generate-covers.ts` to regenerate cover SVGs (add new motifs in the `covers` map).
- `scripts/generate-map.ts`: `npm run gen:map` regenerates `src/components/map/world-paths.ts` from Natural Earth data (public domain). Only needed if you change the map projection or extent.

---

Code comments and docs are in English; all user-facing content is in Polish (pl-PL).
