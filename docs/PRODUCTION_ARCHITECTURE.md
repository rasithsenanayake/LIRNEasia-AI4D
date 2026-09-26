# Proposed Production Architecture

This is an implementation recommendation for discussion with LIRNEasia, not a mandated stack. The current application remains a static-data prototype.

## Initial deployment

- Client-owned VPS in Singapore or another suitable Asian region: Ubuntu LTS, 2 vCPU, 4 GB RAM and approximately 80 GB SSD as a modest launch baseline for roughly five CMS users and initial traffic. Monitor usage and scale vertically when measured demand requires it; this size does not imply unlimited capacity.
- Cloudflare or a Client-controlled equivalent for DNS, TLS and CDN protection, in front of Docker Compose on the VPS.
- Next.js public interface and Payload CMS, PostgreSQL, object storage and privacy-conscious analytics such as Client-approved Umami. Use Nginx or Caddy as reverse proxy.
- Keep email and newsletter delivery behind a provider adapter. Use MapLibre GL JS or a comparable open mapping library only for pages that need it.

The Client should own infrastructure accounts, source code, data and operational credentials. Keep deployment reproducible, database and file exports portable, content types expandable and the architecture compatible with future multilingual content.

## Search and documents

Uploaded PDF/document → validated text extraction → index extracted body text with CMS metadata → PostgreSQL full-text search → ranked result and snippet → existing Explore filters. Start with PostgreSQL full-text search; add a separate search service only if measured scale or relevance needs justify it.

## Security controls

### Current prototype

Static illustrative content and client-side interactions only. The admin is intentionally unprotected for evaluator access. There is no real account system, persistent storage, upload processing, email submission, production analytics or access-control boundary.

### Production implementation

Use HTTPS and secure headers; protect administration with role-based access and strong account handling. Validate input at server boundaries, encode output, consider CSRF for state-changing requests, restrict upload extensions, MIME types and sizes, and rate-limit exposed forms. Add revision/audit history, least-privilege database accounts, environment-managed secrets, dependency updates, security logging, backup encryption and a documented vulnerability patch process.

## Backup and recovery proposal

Nightly database backups, daily or incremental file/object-storage backups, weekly server snapshots, 30 daily and 12 monthly restore points, and an offsite copy. Run a restore test quarterly. Assign an operator to monitor job completion and alerts, protect backup keys, and document restore order for database, files and application configuration. Refine the schedule and retention with LIRNEasia.

## Operations and handover

Document deployment, restore, dependency updates and ownership. Keep code, database exports, files and DNS transferable to another competent operator. Avoid Kubernetes at the initial scale; revisit infrastructure only when operational evidence requires it.
