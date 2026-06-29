#!/usr/bin/env python3
"""
Branch-agnostic technical SEO crawler for the affiliate site template.

It reads data/config.json by default, so the same script can run on any branch
that defines domain/apexDomain there.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import html.parser
import json
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_UA = "AffiliateSiteSEOSpider/1.0"
PRODUCT_CATEGORY_SLUGS = {
    category.get("slug")
    for category in json.loads((ROOT / "data" / "productCategories.json").read_text())
    if category.get("slug")
} if (ROOT / "data" / "productCategories.json").exists() else set()
SCIENCE_CATEGORY_SLUGS = {
    category.get("slug")
    for category in json.loads((ROOT / "data" / "science-page.json").read_text()).get("featured_categories", [])
    if category.get("slug")
} if (ROOT / "data" / "science-page.json").exists() else set()


class LinkParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []
        self.canonicals: list[str] = []
        self.meta_robots: list[str] = []
        self.titles: list[str] = []
        self.h1_count = 0
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = {k.lower(): (v or "") for k, v in attrs}
        tag = tag.lower()
        if tag == "a" and attrs_dict.get("href"):
            self.links.append(attrs_dict["href"])
        elif tag == "link" and attrs_dict.get("rel", "").lower() == "canonical":
            if attrs_dict.get("href"):
                self.canonicals.append(attrs_dict["href"])
        elif tag == "meta" and attrs_dict.get("name", "").lower() == "robots":
            self.meta_robots.append(attrs_dict.get("content", ""))
        elif tag == "title":
            self._in_title = True
        elif tag == "h1":
            self.h1_count += 1

    def handle_endtag(self, tag):
        if tag.lower() == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.titles.append(data.strip())


class TrackingRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        chain = getattr(req, "redirect_chain", [])
        chain.append({"status": code, "from": req.full_url, "to": newurl})
        new_req = super().redirect_request(req, fp, code, msg, headers, newurl)
        if new_req:
            new_req.redirect_chain = chain
        return new_req


def read_config() -> dict:
    config_path = ROOT / "data" / "config.json"
    if not config_path.exists():
        return {}
    return json.loads(config_path.read_text())


def normalize_base(url: str) -> str:
    url = url.strip().rstrip("/")
    if not url.startswith(("http://", "https://")):
        url = f"https://{url}"
    return url


def same_host(url: str, allowed_hosts: set[str]) -> bool:
    return urllib.parse.urlparse(url).netloc.lower() in allowed_hosts


def strip_fragment(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    return urllib.parse.urlunsplit((parts.scheme, parts.netloc, parts.path or "/", parts.query, ""))


def normalize_internal_url(raw_url: str, source_url: str, canonical_host: str, allowed_hosts: set[str]) -> str | None:
    if raw_url.startswith(("mailto:", "tel:", "javascript:", "#")):
        return None
    absolute = urllib.parse.urljoin(source_url, raw_url)
    absolute = strip_fragment(absolute)
    parsed = urllib.parse.urlparse(absolute)
    if parsed.scheme not in {"http", "https"} or not same_host(absolute, allowed_hosts):
        return None
    path = parsed.path or "/"
    return urllib.parse.urlunparse(("https", canonical_host, path, "", parsed.query, ""))


def url_path(url: str) -> str:
    path = urllib.parse.urlparse(url).path or "/"
    query = urllib.parse.urlparse(url).query
    return f"{path}?{query}" if query else path


def map_to_base(url: str, base_url: str) -> str:
    base = urllib.parse.urlparse(base_url)
    parsed = urllib.parse.urlparse(url)
    path = parsed.path or "/"
    return urllib.parse.urlunparse((base.scheme, base.netloc, path, "", parsed.query, ""))


def safe_name(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]+", "_", value).strip("_") or "crawl"


def fetch(url: str, timeout: int, user_agent: str, max_redirects: int, ssl_context=None) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": user_agent})
    request.redirect_chain = []
    handlers = [TrackingRedirectHandler()]
    if ssl_context is not None:
        handlers.append(urllib.request.HTTPSHandler(context=ssl_context))
    opener = urllib.request.build_opener(*handlers)
    start = time.time()
    try:
        with opener.open(request, timeout=timeout) as response:
            body = response.read()
            chain = getattr(response, "redirect_chain", getattr(request, "redirect_chain", []))
            if len(chain) > max_redirects:
                raise urllib.error.HTTPError(url, 599, "Too many redirects", {}, None)
            return {
                "url": url,
                "status": response.status,
                "final_url": response.geturl(),
                "content_type": response.headers.get("content-type", ""),
                "headers": dict(response.headers.items()),
                "body": body,
                "redirect_chain": chain,
                "elapsed_ms": int((time.time() - start) * 1000),
                "error": "",
            }
    except urllib.error.HTTPError as exc:
        body = exc.read() if exc.fp else b""
        return {
            "url": url,
            "status": exc.code,
            "final_url": exc.geturl(),
            "content_type": exc.headers.get("content-type", "") if exc.headers else "",
            "headers": dict(exc.headers.items()) if exc.headers else {},
            "body": body,
            "redirect_chain": getattr(request, "redirect_chain", []),
            "elapsed_ms": int((time.time() - start) * 1000),
            "error": str(exc),
        }
    except Exception as exc:
        return {
            "url": url,
            "status": "ERROR",
            "final_url": "",
            "content_type": "",
            "headers": {},
            "body": b"",
            "redirect_chain": getattr(request, "redirect_chain", []),
            "elapsed_ms": int((time.time() - start) * 1000),
            "error": str(exc),
        }


def parse_html(body: bytes) -> LinkParser:
    parser = LinkParser()
    text = body.decode("utf-8", errors="replace")
    parser.feed(text)
    return parser


def extract_sitemap_urls(body: bytes) -> list[str]:
    text = body.decode("utf-8", errors="replace")
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", text, flags=re.I)


def is_review_url(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.rstrip("/")
    if not path.startswith("/reviews/") or path == "/reviews":
        return False
    slug = path.rsplit("/", 1)[-1]
    return slug not in PRODUCT_CATEGORY_SLUGS


def is_science_url(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.rstrip("/")
    return path == "/science" or path.startswith("/science/")


def is_science_index_url(url: str) -> bool:
    return urllib.parse.urlparse(url).path.rstrip("/") == "/science"


def is_science_category_url(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.rstrip("/")
    if not path.startswith("/science/"):
        return False
    parts = [part for part in path.split("/") if part]
    return len(parts) == 2 and parts[-1] in SCIENCE_CATEGORY_SLUGS


def is_science_article_url(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.rstrip("/")
    parts = [part for part in path.split("/") if part]
    return len(parts) == 3 and parts[0] == "science"


def review_monetization_checks(body: bytes) -> dict:
    html = body.decode("utf-8", errors="replace")
    cta_pattern = r"Buy Here|Buy Here on Amazon|Buy Here at Best Buy|Buy Here at Walmart|Buy Here at REI|Check Current Price|Check Price on Amazon|View on Official Website|View at Best Buy|View at Walmart|View at REI"
    fallback_pattern = r"See Rankings|Compare Alternatives|Read Review"
    return {
        "product_schema": bool(re.search(r'"@type"\s*:\s*"Product"', html, flags=re.I)),
        "primary_cta": bool(re.search(cta_pattern, html, flags=re.I)),
        "merchant_cta": bool(re.search(rf'<a\b[^>]+href=["\']https?://[^"\']+["\'][^>]*(?:sponsored|{cta_pattern})', html, flags=re.I)),
        "fallback_cta": bool(re.search(fallback_pattern, html, flags=re.I)),
    }


def science_architecture_checks(body: bytes, url: str) -> dict:
    html = body.decode("utf-8", errors="replace")
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text).lower()
    return {
        "landing_sections": all(phrase in text for phrase in [
            "featured research",
            "browse by category",
            "recently added studies",
            "why trust our research",
            "how we evaluate scientific evidence",
        ]),
        "category_links": all(path in html for path in [
            "/science/cold-water-immersion",
            "/science/saunas",
            "/science/contrast-therapy",
        ]),
        "category_cards": "read analysis" in text or "research library" in text,
        "article_schema": bool(re.search(r'"@type"\s*:\s*"Article"', html, flags=re.I)),
        "breadcrumb_schema": bool(re.search(r'"@type"\s*:\s*"BreadcrumbList"', html, flags=re.I)),
        "faq_schema": bool(re.search(r'"@type"\s*:\s*"FAQPage"', html, flags=re.I)),
        "citation_schema": bool(re.search(r'"@type"\s*:\s*"ScholarlyArticle"', html, flags=re.I)) or "doi:" in text or "pubmed/source" in text,
        "key_sections": all(phrase in text for phrase in [
            "key takeaways",
            "study snapshot",
            "studies reviewed",
            "strength of the evidence",
            "study limitations",
            "what this means for consumers",
            "references",
        ]),
        "disclaimer": "not medical advice" in text and "informational purposes only" in text,
        "funnel_links": any(path in html for path in ["/guides/", "/comparisons/", "/best-of/", "/reviews/"]),
    }


def write_csv(path: Path, fieldnames: list[str], rows: list[dict]) -> None:
    with path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def add_issue(issues: list[dict], severity: str, category: str, url: str, problem: str, recommendation: str) -> None:
    issues.append({
        "severity": severity,
        "category": category,
        "url": url,
        "problem": problem,
        "recommendation": recommendation,
    })


def main() -> int:
    config = read_config()
    default_base = normalize_base(config.get("domain", ""))
    default_apex = normalize_base(config.get("apexDomain", "")) if config.get("apexDomain") else ""
    default_test_base = normalize_base(config.get("testDeploymentUrl", "")) if config.get("testDeploymentUrl") else ""

    parser = argparse.ArgumentParser(description="Run a branch-agnostic Screaming-Frog-style SEO crawl.")
    parser.add_argument("--base-url", default="", help="Origin to crawl. Defaults to --canonical-url.")
    parser.add_argument("--canonical-url", default=default_base, help="Canonical production origin. Defaults to data/config.json domain.")
    parser.add_argument("--test-deployment", action="store_true", help=f"Crawl the configured test deployment: {default_test_base or 'not configured'}")
    parser.add_argument("--test-base", default=default_test_base, help="Test deployment origin used by --test-deployment. Defaults to data/config.json testDeploymentUrl.")
    parser.add_argument("--apex-url", default=default_apex, help="Apex/non-www origin for redirect checks. Defaults to data/config.json apexDomain.")
    parser.add_argument("--output-dir", default="", help="Output directory. Defaults to reports/seo-crawl/<timestamp>.")
    parser.add_argument("--max-pages", type=int, default=250, help="Maximum internal HTML pages to crawl.")
    parser.add_argument("--timeout", type=int, default=30, help="Per-request timeout in seconds.")
    parser.add_argument("--max-redirects", type=int, default=2, help="Maximum acceptable redirect hops.")
    parser.add_argument("--user-agent", default=DEFAULT_UA, help="Crawler user agent.")
    parser.add_argument("--insecure", action="store_true", help="Disable TLS certificate verification for local diagnostics.")
    parser.add_argument("--no-fail", action="store_true", help="Always exit 0 even when high/critical issues are found.")
    args = parser.parse_args()

    if args.test_deployment and not args.base_url:
        if not args.test_base:
            print("No test deployment URL configured. Set data/config.json testDeploymentUrl or pass --test-base/--base-url.", file=sys.stderr)
            return 2
        args.base_url = args.test_base
    if not args.canonical_url:
        print("Unable to infer --canonical-url. Set data/config.json domain or pass --canonical-url.", file=sys.stderr)
        return 2
    if not args.base_url:
        args.base_url = args.canonical_url

    base_url = normalize_base(args.base_url)
    canonical_base = normalize_base(args.canonical_url)
    crawl_host = urllib.parse.urlparse(base_url).netloc.lower()
    canonical_host = urllib.parse.urlparse(canonical_base).netloc.lower()
    allowed_hosts = {crawl_host, canonical_host}
    if args.apex_url:
        allowed_hosts.add(urllib.parse.urlparse(normalize_base(args.apex_url)).netloc.lower())

    timestamp = dt.datetime.now(dt.UTC).strftime("%Y%m%dT%H%M%SZ")
    output_dir = Path(args.output_dir) if args.output_dir else ROOT / "reports" / "seo-crawl" / timestamp
    output_dir.mkdir(parents=True, exist_ok=True)
    ssl_context = ssl._create_unverified_context() if args.insecure else None

    crawl_rows: list[dict] = []
    redirect_rows: list[dict] = []
    canonical_rows: list[dict] = []
    internal_link_rows: list[dict] = []
    sitemap_rows: list[dict] = []
    issues: list[dict] = []

    robots_url = f"{base_url}/robots.txt"
    sitemap_url = f"{base_url}/sitemap.xml"
    canonical_sitemap_url = f"{canonical_base}/sitemap.xml"
    sitemap_fetch = fetch(sitemap_url, args.timeout, args.user_agent, args.max_redirects, ssl_context)
    sitemap_urls = []
    if sitemap_fetch["status"] == 200:
        sitemap_urls = extract_sitemap_urls(sitemap_fetch["body"])
    else:
        add_issue(issues, "High", "Sitemap", sitemap_url, f"Sitemap returned {sitemap_fetch['status']}", "Ensure sitemap.xml is public and returns 200.")

    queue: list[str] = [base_url + "/"]
    inlink_sources: dict[str, set[str]] = {base_url + "/": {"seed"}}
    for url in sitemap_urls:
        normalized = map_to_base(url, base_url)
        if normalized and normalized not in queue:
            queue.append(normalized)
        if normalized:
            inlink_sources.setdefault(normalized, set()).add("sitemap")

    crawled: set[str] = set()
    discovered: set[str] = set(queue)
    sitemap_set = set(strip_fragment(url) for url in sitemap_urls)
    sitemap_crawl_set = {map_to_base(url, base_url) for url in sitemap_urls}

    robots_fetch = fetch(robots_url, args.timeout, args.user_agent, args.max_redirects, ssl_context)
    if robots_fetch["status"] != 200:
        add_issue(issues, "Medium", "Robots", robots_url, f"robots.txt returned {robots_fetch['status']}", "Serve robots.txt with HTTP 200.")
    elif f"Sitemap: {canonical_sitemap_url}" not in robots_fetch["body"].decode("utf-8", errors="replace"):
        add_issue(issues, "Low", "Robots", robots_url, "robots.txt does not declare the canonical sitemap", f"Add `Sitemap: {canonical_sitemap_url}`.")

    while queue and len(crawled) < args.max_pages:
        url = queue.pop(0)
        if url in crawled:
            continue
        crawled.add(url)

        result = fetch(url, args.timeout, args.user_agent, args.max_redirects, ssl_context)
        chain = result["redirect_chain"]
        status = result["status"]
        final_url = strip_fragment(result["final_url"]) if result["final_url"] else ""
        content_type = result["content_type"]
        is_html = "text/html" in content_type

        for hop_index, hop in enumerate(chain, start=1):
            redirect_rows.append({
                "source_url": url,
                "hop": hop_index,
                "status": hop["status"],
                "from": hop["from"],
                "to": hop["to"],
            })

        if len(chain) > args.max_redirects:
            add_issue(issues, "High", "Redirects", url, f"Redirect chain has {len(chain)} hops", "Reduce redirect chains to two hops or fewer.")

        sample_inlinks = ", ".join(sorted(inlink_sources.get(url, set()))[:3])

        if status in {401, 403, 404} or (isinstance(status, int) and status >= 500):
            source_detail = f" Sample inlinks: {sample_inlinks}." if sample_inlinks else ""
            add_issue(issues, "Critical", "Status Codes", url, f"URL returned {status}.{source_detail}", "Fix crawl-blocking or broken public URL.")

        parser_result = parse_html(result["body"]) if is_html and status == 200 else LinkParser()
        canonical = parser_result.canonicals[0] if parser_result.canonicals else ""
        meta_robots = ",".join(parser_result.meta_robots)
        title = " ".join(t for t in parser_result.titles if t).strip()
        noindex = "noindex" in meta_robots.lower()
        expected_canonical = map_to_base(final_url or url, canonical_base)
        indexability = "Indexable"

        if status != 200:
            indexability = "Non-indexable: status"
        elif noindex:
            indexability = "Non-indexable: noindex"
        elif canonical and canonical != expected_canonical:
            indexability = "Non-indexable: canonicalized"

        if is_html and status == 200:
            if not canonical:
                add_issue(issues, "High", "Canonicals", url, "Missing canonical tag", "Add an absolute self-referencing canonical.")
            else:
                parsed_canonical = urllib.parse.urlparse(canonical)
                if parsed_canonical.scheme != "https" or parsed_canonical.netloc.lower() != canonical_host:
                    add_issue(issues, "High", "Canonicals", url, f"Canonical is not on https canonical host: {canonical}", f"Use {canonical_base} canonicals.")
                if canonical != expected_canonical:
                    add_issue(issues, "Medium", "Canonicals", url, f"Canonical does not match expected production URL: {canonical}", "Align canonical with the production URL for this path.")
            if parser_result.h1_count != 1:
                add_issue(issues, "Low", "HTML", url, f"H1 count is {parser_result.h1_count}", "Use exactly one primary H1 per page.")
            if is_review_url(url):
                review_checks = review_monetization_checks(result["body"])
                if not review_checks["product_schema"]:
                    add_issue(issues, "High", "Review Monetization", url, "Review page is missing Product schema", "Add Product JSON-LD to the reusable review template.")
                if review_checks["primary_cta"] and not review_checks["merchant_cta"]:
                    add_issue(issues, "High", "Review Monetization", url, "Review page shows merchant CTA text without an outbound affiliate CTA", "Only show merchant CTA text when approved vendor affiliate links render.")
                if not review_checks["primary_cta"] and not review_checks["fallback_cta"]:
                    add_issue(issues, "High", "Review Monetization", url, "Review page is missing affiliate or internal fallback CTAs", "Add approved affiliate CTAs or internal funnel fallback CTAs.")
            if is_science_url(url):
                science_checks = science_architecture_checks(result["body"], url)
                if is_science_index_url(url):
                    if not science_checks["landing_sections"]:
                        add_issue(issues, "High", "Science Architecture", url, "Science landing page is missing research-library sections", "Render Featured Research, Browse by Category, Recently Added Studies, trust, and methodology sections.")
                    if not science_checks["category_links"]:
                        add_issue(issues, "High", "Science Architecture", url, "Science landing page is missing core category links", "Populate Science category cards and navigation from the Science taxonomy.")
                elif is_science_category_url(url):
                    if not science_checks["category_cards"]:
                        add_issue(issues, "Medium", "Science Architecture", url, "Science category page lacks article cards", "Render Science article cards for categories with published research.")
                elif is_science_article_url(url):
                    if not science_checks["article_schema"]:
                        add_issue(issues, "High", "Science Architecture", url, "Science article is missing Article schema", "Generate Article JSON-LD from the Science article template.")
                    if not science_checks["breadcrumb_schema"]:
                        add_issue(issues, "Medium", "Science Architecture", url, "Science article is missing Breadcrumb schema", "Generate BreadcrumbList JSON-LD for Science articles.")
                    if not science_checks["citation_schema"]:
                        add_issue(issues, "Medium", "Science Architecture", url, "Science article does not expose central study citations", "Render references from data/studies.json and include citation data in JSON-LD.")
                    if not science_checks["key_sections"]:
                        add_issue(issues, "Medium", "Science Architecture", url, "Science article is missing required research-library sections", "Render key takeaways, study snapshot, studies reviewed, evidence strength, limitations, consumer meaning, and references.")
                    if not science_checks["disclaimer"]:
                        add_issue(issues, "High", "Science Architecture", url, "Science article is missing the medical disclaimer", "Add the standard informational-only medical disclaimer.")
                    if not science_checks["funnel_links"]:
                        add_issue(issues, "Medium", "Science Architecture", url, "Science article lacks internal funnel links", "Link relevant Science articles to guides, comparisons, Best Of lists, or reviews.")

        crawl_rows.append({
            "url": url,
            "status": status,
            "final_url": final_url,
            "redirect_hops": len(chain),
            "content_type": content_type,
            "indexability": indexability,
            "canonical": canonical,
            "title": title,
            "h1_count": parser_result.h1_count,
            "meta_robots": meta_robots,
            "in_sitemap": "yes" if url in sitemap_crawl_set or final_url in sitemap_crawl_set else "no",
            "inlink_count": len(inlink_sources.get(url, set())),
            "sample_inlinks": sample_inlinks,
            "elapsed_ms": result["elapsed_ms"],
            "error": result["error"],
        })
        canonical_rows.append({
            "url": url,
            "final_url": final_url,
            "canonical": canonical,
            "expected_canonical": expected_canonical,
            "matches_expected_canonical": "yes" if canonical == expected_canonical else "no",
            "indexability": indexability,
        })

        for href in parser_result.links:
            normalized = normalize_internal_url(href, final_url or url, crawl_host, allowed_hosts)
            if not normalized:
                continue
            internal_link_rows.append({"source_url": url, "dest_url": normalized, "raw_href": href})
            inlink_sources.setdefault(normalized, set()).add(url)
            if normalized not in crawled and normalized not in discovered and len(discovered) < args.max_pages * 3:
                discovered.add(normalized)
                queue.append(normalized)

    crawled_urls = {row["url"] for row in crawl_rows}
    for sitemap_entry in sitemap_urls:
        normalized = map_to_base(sitemap_entry, base_url)
        sitemap_rows.append({
            "sitemap_url": sitemap_entry,
            "normalized_url": normalized,
            "crawled": "yes" if normalized in crawled_urls else "no",
            "canonical_host": "yes" if urllib.parse.urlparse(sitemap_entry).netloc.lower() == canonical_host else "no",
            "https": "yes" if urllib.parse.urlparse(sitemap_entry).scheme == "https" else "no",
            "trailing_slash": "yes" if urllib.parse.urlparse(sitemap_entry).path.endswith("/") and urllib.parse.urlparse(sitemap_entry).path != "/" else "no",
        })
        if urllib.parse.urlparse(sitemap_entry).netloc.lower() != canonical_host:
            add_issue(issues, "High", "Sitemap", sitemap_entry, "Sitemap URL is not on canonical host", f"Use {canonical_base} URLs only.")
        if urllib.parse.urlparse(sitemap_entry).scheme != "https":
            add_issue(issues, "High", "Sitemap", sitemap_entry, "Sitemap URL is not HTTPS", "Use HTTPS sitemap URLs only.")

    crawl_was_limited = bool(queue and len(crawled) >= args.max_pages)
    if not crawl_was_limited:
        orphan_candidates = sorted(sitemap_crawl_set - {row["url"] for row in crawl_rows if row["in_sitemap"] == "yes"})
        for url in orphan_candidates[:50]:
            add_issue(issues, "Low", "Internal Links", url, "Sitemap URL was not reached by the crawl", "Review internal linking from crawlable pages.")

    redirect_test_paths = ["/", "/about", "/guides", "/reviews", "/best-of", "/comparisons", "/science"]
    if args.apex_url and base_url == canonical_base:
        apex_base = normalize_base(args.apex_url)
        for path in redirect_test_paths:
            for variant in (f"http://{canonical_host}{path}", f"http://{urllib.parse.urlparse(apex_base).netloc}{path}", f"{apex_base}{path}"):
                result = fetch(variant, args.timeout, args.user_agent, args.max_redirects, ssl_context)
                expected = f"{canonical_base}{path}" if path != "/" else f"{canonical_base}/"
                redirect_rows.append({
                    "source_url": variant,
                    "hop": "final",
                    "status": result["status"],
                    "from": variant,
                    "to": result["final_url"],
                })
                if strip_fragment(result["final_url"]) != expected:
                    add_issue(issues, "High", "Redirects", variant, f"Expected final URL {expected}, got {result['final_url']}", "Normalize HTTP/apex variants to the canonical URL.")

    write_csv(output_dir / "crawl.csv", ["url", "status", "final_url", "redirect_hops", "content_type", "indexability", "canonical", "title", "h1_count", "meta_robots", "in_sitemap", "inlink_count", "sample_inlinks", "elapsed_ms", "error"], crawl_rows)
    write_csv(output_dir / "redirects.csv", ["source_url", "hop", "status", "from", "to"], redirect_rows)
    write_csv(output_dir / "canonicals.csv", ["url", "final_url", "canonical", "expected_canonical", "matches_expected_canonical", "indexability"], canonical_rows)
    write_csv(output_dir / "internal_links.csv", ["source_url", "dest_url", "raw_href"], internal_link_rows)
    write_csv(output_dir / "sitemap.csv", ["sitemap_url", "normalized_url", "crawled", "canonical_host", "https", "trailing_slash"], sitemap_rows)
    write_csv(output_dir / "issues.csv", ["severity", "category", "url", "problem", "recommendation"], issues)

    severity_counts = {severity: sum(1 for issue in issues if issue["severity"] == severity) for severity in ("Critical", "High", "Medium", "Low")}
    summary = [
        f"# SEO Crawl Report",
        "",
        f"- Generated: `{timestamp}` UTC",
        f"- Site: `{config.get('siteName', canonical_host)}`",
        f"- Crawl base: `{base_url}`",
        f"- Canonical base: `{canonical_base}`",
        f"- Apex base: `{args.apex_url or 'not configured'}`",
        f"- Pages crawled: `{len(crawl_rows)}`",
        f"- Crawl limit reached: `{'yes' if crawl_was_limited else 'no'}`",
        f"- Sitemap URLs: `{len(sitemap_urls)}`",
        f"- Internal links discovered: `{len(internal_link_rows)}`",
        f"- Issues: Critical `{severity_counts['Critical']}`, High `{severity_counts['High']}`, Medium `{severity_counts['Medium']}`, Low `{severity_counts['Low']}`",
        "",
        "## Outputs",
        "",
        "- `crawl.csv`",
        "- `redirects.csv`",
        "- `canonicals.csv`",
        "- `internal_links.csv`",
        "- `sitemap.csv`",
        "- `issues.csv`",
        "",
        "## Top Issues",
        "",
    ]
    if issues:
        for issue in issues[:25]:
            summary.append(f"- **{issue['severity']} / {issue['category']}** `{issue['url']}`: {issue['problem']} Recommendation: {issue['recommendation']}")
    else:
        summary.append("No issues found.")
    (output_dir / "summary.md").write_text("\n".join(summary) + "\n")

    print(f"SEO crawl report: {output_dir / 'summary.md'}")
    print(f"Pages crawled: {len(crawl_rows)}")
    print(f"Sitemap URLs: {len(sitemap_urls)}")
    print(f"Issues: Critical {severity_counts['Critical']}, High {severity_counts['High']}, Medium {severity_counts['Medium']}, Low {severity_counts['Low']}")

    if not args.no_fail and (severity_counts["Critical"] or severity_counts["High"]):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
