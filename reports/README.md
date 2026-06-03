# SEO Report Retention

Use the `latest-*` directories as the current source of truth:

- `seo-smoke/latest-production`
- `seo-smoke/latest-test`
- `seo-crawl/latest-production`
- `seo-crawl/latest-test`

Use `archive/` only for meaningful historical snapshots tied to a deployment,
GSC issue, audit, or fix verification.

Do not keep ad hoc quick checks, debug runs, or stale failed reports in the
top-level report directories. If a failed report explains a fix, move it under
`archive/` with a descriptive date-based name.
