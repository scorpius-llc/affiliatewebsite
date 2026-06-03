# The Pool Lab May 26 GSC Performance Analysis

- Export date: 2026-06-02
- Export filter: Web search, last 7 days
- Deployment evaluated: 2026-05-26 12:25 UTC production container
- Related live technical audit: `reports/seo-smoke/latest-poollab-audit/report.md`

## Conclusion

The May 26 changes appear effective for technical recovery and crawlability, but the Search Console performance window is too short to prove a durable traffic or ranking lift.

The strongest evidence is that the June 2 live smoke audit found 848 passing assertions, 0 failures, 39 sitemap URLs, no active 401s, no Googlebot/browser differences, and clean non-www to www redirects. The GSC performance export also shows impressions recovering after May 27 and rising through May 31.

## Daily Trend

| Date | Clicks | Impressions | Avg position |
| --- | ---: | ---: | ---: |
| 2026-05-25 | 0 | 18 | 10.7 |
| 2026-05-26 | 0 | 13 | 19.5 |
| 2026-05-27 | 0 | 10 | 25.8 |
| 2026-05-28 | 0 | 12 | 19.1 |
| 2026-05-29 | 0 | 22 | 27.3 |
| 2026-05-30 | 0 | 25 | 28.4 |
| 2026-05-31 | 0 | 31 | 8.3 |

Post-deploy window, treating May 27-31 as post-release:

- Clicks: 0
- Impressions: 100 total
- Average impressions per day: 20.0
- Weighted average position: 20.55

May 25 baseline:

- Clicks: 0
- Impressions: 18
- Average position: 10.7

May 26 deployment day:

- Clicks: 0
- Impressions: 13
- Average position: 19.5

## Signals That The Fix Worked

- Impressions did not disappear after the May 26 deployment.
- Impressions rose from 10 on May 27 to 31 on May 31.
- The 401 issue in GSC has already passed validation.
- The redirect issue examples are the same non-www URLs validated by the live smoke test.
- Current sitemap output uses canonical `https://www.the-pool-lab.com` URLs.
- Current sitemap output does not include trailing slash duplicates.
- Current production redirects the non-www examples to the www canonical URLs within acceptable redirect depth.

## Signals That Need More Time

- There were 0 clicks in the export, so CTR and conversion impact cannot be evaluated.
- The export covers only seven days and only one clean pre-deploy day.
- Search Console data is delayed and can include stale URL variants after canonical cleanup.
- Average position is volatile because the sample size is small.

## Page-Level Notes

Top visible pages in the export:

- `https://www.the-pool-lab.com/reviews/Hayward-SharkVac-XL`: 43 impressions, position 15.6
- `https://www.the-pool-lab.com/`: 36 impressions, position 3.33
- `https://www.the-pool-lab.com/reviews/Polaris-P39/`: 36 impressions, position 7.36
- `https://www.the-pool-lab.com/best-of/leaves`: 29 impressions, position 1
- `https://www.the-pool-lab.com/blog/polaris-vs-dolphin-robotic-pool-cleaners/`: 29 impressions, position 25.79

The GSC page export still includes some trailing-slash variants, including `Polaris-P39/`, `Hayward-SharkVac-XL/`, and `polaris-vs-dolphin-robotic-pool-cleaners/`. The current sitemap and smoke audit use non-trailing-slash canonicals, so these appear to be historical or alternate URL variants still represented in performance reporting.

## Query-Level Notes

The queries are relevant to the site topic, but most are still low-volume and low-position:

- `dolphin sigma`: 5 impressions, position 47.2
- `polaris p39 reviews`: 3 impressions, position 11
- `polaris vs dolphin`: 3 impressions, position 25
- `polaris p39`: 3 impressions, position 33.67
- `hayward sharkvac xl robotic pool cleaner`: 3 impressions, position 53.67

The site is getting impressions for commercial and comparison terms, which is directionally good, but there is not enough data yet to infer revenue impact.

## Recommendation

Treat the May 26 changes as technically effective, then monitor the next 14-28 days for performance confirmation.

Recommended follow-up checks:

- Let the GSC redirect validation run.
- Re-export GSC performance after at least two more weeks.
- Compare May 27-June 9 against the prior comparable period.
- Watch for clicks, not just impressions.
- If trailing-slash variants persist as separate URLs, add explicit trailing-slash checks to the smoke test and verify the live redirect behavior for those variants.
