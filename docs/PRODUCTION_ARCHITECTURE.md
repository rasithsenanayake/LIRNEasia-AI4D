# Proposed Production Architecture

This is an implementation recommendation for discussion with LIRNEasia, not a mandated stack. The current application remains a static-data prototype.

## Environments and release path

Use separate development, staging and production environments. Staging should run the release candidate with production-like configuration and anonymised or approved test content; it must use separate credentials, database and storage, and must not send real newsletter or gated-download messages. Editors can review content and workflows there before an authorised production release. Promotion should use a tagged, reproducible build and a documented rollback point. No staging or production environment is deployed by this prototype.

## Initial deployment

- Client-owned VPS in Singapore or another suitable Asian region: Ubuntu LTS, 2 vCPU, 4 GB RAM and approximately 80 GB SSD as a modest launch baseline for roughly five CMS users and initial traffic. Monitor usage and scale vertically when measured demand requires it; this size does not imply unlimited capacity.
- Cloudflare or a Client-controlled equivalent for DNS, TLS and CDN protection, in front of Docker Compose on the VPS.
- Next.js public interface and Payload CMS, PostgreSQL, object storage and privacy-conscious analytics such as Client-approved Umami. Use Nginx or Caddy as reverse proxy.
- Keep email and newsletter delivery behind a provider adapter. Use MapLibre GL JS or a comparable open mapping library only for pages that need it.

The Client should own infrastructure accounts, source code, data and operational credentials. Keep deployment reproducible, database and file exports portable, content types expandable and the architecture compatible with future multilingual content.

Launch content is expected to be primarily English. Resource records can link to individual Sinhala or Tamil versions without requiring locale routing; missing translations should be shown as unavailable until supplied.

## Geographic boundary and regional scope

For country-level administrative boundaries, use a versioned Natural Earth Admin 0 boundary dataset or a Client-approved equivalent, subject to its source and redistribution terms. Keep the boundary data replaceable and identify its version in map metadata. Define the included countries/territories and regional groupings with LIRNEasia; use UN M49 country and region identifiers as the initial crosswalk where applicable, recording any Observatory-specific scope decisions. Do not treat map geometry as a policy/data source. Final boundaries, disputed areas, subnational coverage and attribution require Client approval. Production maps need verified observations, source, year and missing-data handling; prototype index values are illustrative.

## Third-party service governance

Maintain a service register for any selected mapping library, boundary dataset, object-storage provider, analytics tool, newsletter provider, DNS/CDN and monitoring service. For each, record its purpose, account owner, data handled, hosting region, licence/terms, cost basis, export path and replacement plan. Select services with the Client during implementation; the architecture names candidates only and is not a purchase commitment or price quotation. Prefer Client-owned accounts and portable formats to reduce lock-in.

## Search and documents

Uploaded PDF/document → validated text extraction → index extracted body text with CMS metadata → PostgreSQL full-text search → ranked result and snippet → existing Explore filters. Start with PostgreSQL full-text search; add a separate search service only if measured scale or relevance needs justify it.

## Security controls

### Current prototype

Static illustrative content and client-side interactions only. The admin is intentionally unprotected for evaluator access. There is no real account system, persistent storage, upload processing, email submission, production analytics or access-control boundary.

### Production implementation

Use HTTPS and secure headers; protect administration with role-based access and strong account handling. Validate input at server boundaries, encode output, consider CSRF for state-changing requests, restrict upload extensions, MIME types and sizes, and rate-limit exposed forms. Add revision/audit history, least-privilege database accounts, environment-managed secrets, dependency updates, security logging, backup encryption and a documented vulnerability patch process.

## Backup and recovery proposal

Nightly database backups, daily or incremental file/object-storage backups, weekly server snapshots, 30 daily and 12 monthly restore points, and an offsite copy. Run a restore test quarterly. Assign an operator to monitor job completion and alerts, protect backup keys, and document restore order for database, files and application configuration. Refine the schedule and retention with LIRNEasia.

This is a proposed operating baseline, not a deployed backup service. Final frequency and retention depend on the selected hosting platform and agreed recovery objectives.

## Operations and handover

Document deployment, restore, dependency updates and ownership. Keep code, database exports, files and DNS transferable to another competent operator. Avoid Kubernetes at the initial scale; revisit infrastructure only when operational evidence requires it.

Routine incident response and monthly maintenance are described in [SUPPORT_AND_MAINTENANCE.md](./SUPPORT_AND_MAINTENANCE.md); proposed administrator/editor knowledge transfer is in [TRAINING_PLAN.md](./TRAINING_PLAN.md).
