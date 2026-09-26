# Third-Party Services Register

This is a proposal-stage register of candidate services, not a record of deployed integrations or purchases. Confirm providers, terms and account ownership with LIRNEasia during implementation. No exact prices are quoted.

| Service area | Candidate / approach | Purpose and data | Ownership and cost basis | Exit path |
| --- | --- | --- | --- | --- |
| CMS | Payload CMS | Editorial content and metadata | Client-owned source and infrastructure; hosting cost | Structured exports and application source |
| Database | PostgreSQL | Content and search records | Client-controlled; infrastructure cost | Standard SQL/database export |
| Maps | MapLibre GL JS | Interactive visualisation | Open-source library; no assumed licence fee | Replaceable renderer and GeoJSON |
| Boundaries | Natural Earth Admin 0 or approved alternative | Country/region outlines | Open/public source; verify terms and attribution | Versioned, replaceable GeoJSON |
| File storage | S3-compatible provider | PDFs, images and datasets | Client-owned account; usage-based | S3-compatible export and checksums |
| Analytics | Umami or approved equivalent | Aggregate visits and engagement | Self-hosted or provider-dependent | Portable event exports |
| Newsletter | Client-selected provider | Subscription and delivery | Provider-dependent | Export consented list; adapter boundary |
| DNS/CDN/security | Cloudflare or approved equivalent | DNS, TLS, caching and edge protection | Client-owned account; plan-dependent | DNS zone and configuration export |
| Monitoring/email | Client-approved service | Availability alerts and operational messages | Provider-dependent | Replaceable alert configuration |

Before procurement, assess data location, subprocessors, privacy terms, retention, account recovery, accessibility impact and service continuity. No third-party service is connected by the current prototype.
