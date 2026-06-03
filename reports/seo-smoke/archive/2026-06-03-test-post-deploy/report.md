# The Pool Lab SEO Smoke Test Report

- Generated: `20260603T142309Z` UTC
- Canonical base: `https://www.the-pool-lab.com`
- Crawl base: `https://the-pool-lab-test-797634543823.us-east1.run.app`
- Apex base: `https://the-pool-lab.com`
- Requests executed: `98`
- Passed assertions: `819`
- Failed assertions: `0`

## Executive Summary

No active SEO smoke-test failures were found. The historical Google Search Console 401 reports are likely stale unless GSC still shows fresh crawl dates after this report timestamp.

## A. Redirect Issues

No redirect failures found. Severity: Low. Impact: canonical redirect behavior appears stable. Recommended fix: none.


## B. Canonical Issues

No canonical failures found. Severity: Low. Impact: canonical tags appear consistent with production www HTTPS URLs. Recommended fix: none.


## C. Sitemap Issues

No sitemap failures found. Severity: Low. Impact: sitemap URLs appear crawlable and canonical. Recommended fix: none.


## D. Googlebot Accessibility Issues

No Googlebot-specific failures found. Severity: Low. Impact: Googlebot receives the same crawlable responses as browser requests. Recommended fix: none.


## E. Potential Causes Of Historical GSC 401 Errors

Severity: Low if GSC crawl dates are old; High if GSC shows fresh crawl attempts. Impact: no active 401 was detected by this run, so historical reports may reflect a prior protected deployment, non-www/apex host behavior, CDN/IAP rules, or a temporary preview-service authorization state. Recommended fix: validate latest GSC crawl dates and keep this smoke test in the post-deploy pipeline.


## PASS/FAIL Detail

| Status | Category | URL | Problem | Recommendation |
| --- | --- | --- | --- | --- |
| PASS | Crawlability | `https://the-pool-lab-test-797634543823.us-east1.run.app/robots.txt` | HTTP 200 | No action needed. |
| PASS | Crawlability | `https://the-pool-lab-test-797634543823.us-east1.run.app/robots.txt` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Crawlability | `https://the-pool-lab-test-797634543823.us-east1.run.app/robots.txt` | No authentication challenge | No action needed. |
| PASS | Crawlability | `https://the-pool-lab-test-797634543823.us-east1.run.app/robots.txt` | robots.txt does not block the entire site | No action needed. |
| PASS | Crawlability | `https://the-pool-lab-test-797634543823.us-east1.run.app/robots.txt` | Correct sitemap declaration found | No action needed. |
| PASS | Sitemap Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/sitemap.xml` | HTTP 200 | No action needed. |
| PASS | Sitemap Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/sitemap.xml` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Sitemap Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/sitemap.xml` | No authentication challenge | No action needed. |
| PASS | Sitemap Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/sitemap.xml` | 39 sitemap URLs found | No action needed. |
| PASS | Sitemap Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/sitemap.xml` | All sitemap URLs use HTTPS | No action needed. |
| PASS | Sitemap Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/sitemap.xml` | All sitemap URLs use canonical host | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/ | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical found: https://www.the-pool-lab.com/ | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/ | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/about | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical found: https://www.the-pool-lab.com/about | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/about | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/about` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical found: https://www.the-pool-lab.com/best-of | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Canonical found: https://www.the-pool-lab.com/best-of/above-ground | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/above-ground` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of/above-ground` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Canonical found: https://www.the-pool-lab.com/best-of/inground | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/inground` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of/inground` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Canonical found: https://www.the-pool-lab.com/best-of/leaves | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/leaves` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of/leaves` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical found: https://www.the-pool-lab.com/best-of/overall | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of/overall` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical found: https://www.the-pool-lab.com/best-of/value | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of/value` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Canonical found: https://www.the-pool-lab.com/best-of/vinyl | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/vinyl` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/best-of/vinyl` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Canonical found: https://www.the-pool-lab.com/blog/best-robotic-pool-cleaner-for-deep-pools | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-deep-pools` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/best-robotic-pool-cleaner-for-deep-pools` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Canonical found: https://www.the-pool-lab.com/blog/best-robotic-pool-cleaner-for-large-pools | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/best-robotic-pool-cleaner-for-large-pools` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/best-robotic-pool-cleaner-for-large-pools` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Canonical found: https://www.the-pool-lab.com/blog/corded-vs-cordless-robotic-pool-cleaners | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/corded-vs-cordless-robotic-pool-cleaners` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Canonical found: https://www.the-pool-lab.com/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/corded-vs-cordless-robotic-pool-cleaners-for-large-pools` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Canonical found: https://www.the-pool-lab.com/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/do-robotic-pool-cleaners-clean-walls-and-waterlines` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical found: https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Canonical found: https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-polaris-9650iq-sport` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Canonical found: https://www.the-pool-lab.com/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/how-to-choose-the-right-robotic-pool-cleaner-for-your-pool` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical found: https://www.the-pool-lab.com/blog/polaris-vs-dolphin-robotic-pool-cleaners | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Canonical found: https://www.the-pool-lab.com/blog/robotic-pool-cleaner-weight-why-it-matters | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaner-weight-why-it-matters` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/robotic-pool-cleaner-weight-why-it-matters` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Canonical found: https://www.the-pool-lab.com/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/robotic-pool-cleaners-for-leaves-vs-fine-debris` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Canonical found: https://www.the-pool-lab.com/blog/top-5-features-to-look-for | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/top-5-features-to-look-for` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/top-5-features-to-look-for` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Canonical found: https://www.the-pool-lab.com/blog/why-you-need-a-robot-pool-cleaner | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/why-you-need-a-robot-pool-cleaner` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/blog/why-you-need-a-robot-pool-cleaner` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/guides | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical found: https://www.the-pool-lab.com/guides | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/guides | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/guides` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical found: https://www.the-pool-lab.com/reviews | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1 | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Canonical found: https://www.the-pool-lab.com/reviews/Aiper-Scuba-S1 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Scuba-S1` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Aiper-Scuba-S1` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Canonical found: https://www.the-pool-lab.com/reviews/Aiper-Seagull-Pro | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Aiper-Seagull-Pro` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Aiper-Seagull-Pro` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Canonical found: https://www.the-pool-lab.com/reviews/BWT-Pool-Robot-ES-Nano | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/BWT-Pool-Robot-ES-Nano` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/BWT-Pool-Robot-ES-Nano` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2 | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Canonical found: https://www.the-pool-lab.com/reviews/Beatbot-AquaSense-2 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Beatbot-AquaSense-2` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Beatbot-AquaSense-2` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Canonical found: https://www.the-pool-lab.com/reviews/Dolphin-Nautilus-CC-Plus | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-CC-Plus` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Dolphin-Nautilus-CC-Plus` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Canonical found: https://www.the-pool-lab.com/reviews/Dolphin-Nautilus-Titan | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Nautilus-Titan` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Dolphin-Nautilus-Titan` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Canonical found: https://www.the-pool-lab.com/reviews/Dolphin-Premier | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Premier` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Dolphin-Premier` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Canonical found: https://www.the-pool-lab.com/reviews/Dolphin-Sigma | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Dolphin-Sigma` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Dolphin-Sigma` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Canonical found: https://www.the-pool-lab.com/reviews/Hayward-SharkVac-XL | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-SharkVac-XL` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Hayward-SharkVac-XL` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Canonical found: https://www.the-pool-lab.com/reviews/Hayward-TigerShark-QC | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-TigerShark-QC` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Hayward-TigerShark-QC` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Canonical found: https://www.the-pool-lab.com/reviews/Hayward-W3PVS20JST-Poolvergnuegen | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Hayward-W3PVS20JST-Poolvergnuegen` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930 | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Canonical found: https://www.the-pool-lab.com/reviews/Pentair-Prowler-930 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Pentair-Prowler-930` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Pentair-Prowler-930` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Canonical found: https://www.the-pool-lab.com/reviews/Polaris-9650iQ-Sport | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-9650iQ-Sport` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Polaris-9650iQ-Sport` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Canonical found: https://www.the-pool-lab.com/reviews/Polaris-F9550-Sport | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-F9550-Sport` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Polaris-F9550-Sport` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39 | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Canonical found: https://www.the-pool-lab.com/reviews/Polaris-P39 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews/Polaris-P39` | Googlebot matches browser response | No action needed. |
| PASS | Sitemap Issues | `https://www.the-pool-lab.com/reviews/Polaris-P39` | Mapped crawl URL does not redirect | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/ | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical found: https://www.the-pool-lab.com/ | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/ | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/about | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical found: https://www.the-pool-lab.com/about | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/about | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/about` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/guides | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical found: https://www.the-pool-lab.com/guides | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/guides | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/guides` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical found: https://www.the-pool-lab.com/reviews | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/reviews | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/reviews` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical found: https://www.the-pool-lab.com/best-of | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical found: https://www.the-pool-lab.com/best-of/value | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/value` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical found: https://www.the-pool-lab.com/best-of/overall | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/best-of/overall` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical found: https://www.the-pool-lab.com/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier` | Googlebot matches browser response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | HTTP 200 | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Page Accessibility | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No authentication challenge | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Redirect chain length 0 | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical found: https://www.the-pool-lab.com/blog/polaris-vs-dolphin-robotic-pool-cleaners | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical is absolute | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical uses HTTPS | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical uses www host | No action needed. |
| PASS | Canonical Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Canonical matches expected URL | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | HTTP 200 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No 401, 403, 404, or 5xx response | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | No authentication challenge | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Final URL resolves to https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Redirect chain length 0 | No action needed. |
| PASS | Googlebot Accessibility Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app/blog/polaris-vs-dolphin-robotic-pool-cleaners` | Googlebot matches browser response | No action needed. |
| PASS | Redirect Issues | `https://the-pool-lab-test-797634543823.us-east1.run.app` | Skipped production apex/http redirect checks for non-production crawl base | Run without --test-deployment to validate production redirects. |

## Artifacts

- Complete request log: `reports/seo-smoke/latest-test-deployment-review/full-test.log`
- Response headers and bodies: `reports/seo-smoke/latest-test-deployment-review/responses`
- Sitemap URLs: `reports/seo-smoke/latest-test-deployment-review/sitemap-urls.txt`
- Tested canonical URLs: `reports/seo-smoke/latest-test-deployment-review/tested-urls.txt`
