# Asia AI4D Observatory

Next.js App Router prototype for the Asia AI4D Observatory. It preserves the existing proposal visual language while demonstrating the proposed home, repository, research, use-case, country, dataset and data-map journeys.

## Stack

Next.js, React, TypeScript and Tailwind CSS. Content is currently local typed demo data; no CMS or database is included.

## Commands

```bash
npm install
npm run dev
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the production origin when deploying so the generated sitemap, robots file and canonical metadata use absolute URLs.

## Structure

- `src/app`: App Router routes and metadata entry points
- `src/components`: reusable layout, cards, filters, maps and content UI
- `src/data`: typed illustrative records
- `src/views`: page-level compositions reused by routes
- `src/utils`: search and repository helpers

## Prototype disclaimer

The visual design represents the proposed direction. Content, statistics, profiles, publications, events and datasets are illustrative unless explicitly identified as verified. Final substantive content will be supplied and approved by the Client. Search, filtering, relationships and navigation demonstrate proposed functional behavior.

## Routes

`/`, `/explore`, `/research`, `/publications/[slug]`, `/use-cases/[slug]`, `/datasets/[slug]`, `/countries`, `/countries/[slug]`, `/data-maps`, `/news`, `/about`, `/opportunities`, `/events`, `/people`, `/organizations`, `/learning-resources`, `/newsletter`, `/partners`, `/contact`, `/accessibility`, `/privacy`.

## Future production architecture

The intended production boundary is Next.js + Payload CMS or equivalent + PostgreSQL + client-controlled file storage + client-controlled hosting + analytics. This prototype does not represent the final CMS, database or provider integration. Local data access can be replaced with CMS/database-backed functions without changing the page contract.
