#!/usr/bin/env bash

set -u
set -o pipefail

CONFIG_FILE="data/config.json"
PRODUCT_CATEGORIES_FILE="data/productCategories.json"
SITE_NAME="Affiliate Site"
CONFIG_DOMAIN=""
CONFIG_APEX_DOMAIN=""
TEST_DEPLOYMENT_BASE=""
CRAWL_BASE=""
TIMEOUT=30
MAX_REDIRECTS=10
OUTPUT_DIR=""
TARGET_URLS=()
PASS_COUNT=0
FAIL_COUNT=0
REQUEST_COUNT=0

SEED_PATHS=(
  "/"
  "/about"
  "/guides"
  "/reviews"
  "/best-of"
  "/comparisons"
  "/science"
)

config_value() {
  local key="$1"
  if [ -f "$CONFIG_FILE" ] && command -v python3 >/dev/null 2>&1; then
    python3 -c 'import json, sys; data=json.load(open(sys.argv[1])); print(data.get(sys.argv[2], ""))' "$CONFIG_FILE" "$key"
  fi
}

is_review_category_path() {
  local path="$1"
  if [ ! -f "$PRODUCT_CATEGORIES_FILE" ] || ! command -v python3 >/dev/null 2>&1; then
    return 1
  fi

  python3 - "$PRODUCT_CATEGORIES_FILE" "$path" <<'PY'
import json
import sys

categories_path, raw_path = sys.argv[1], sys.argv[2]
slug = raw_path.strip("/").split("/")[-1]
try:
    categories = json.load(open(categories_path))
except Exception:
    sys.exit(1)

sys.exit(0 if any(category.get("slug") == slug for category in categories) else 1)
PY
}

normalize_base() {
  local value="${1%/}"
  case "$value" in
    http://*|https://*) printf '%s' "$value" ;;
    "") printf '' ;;
    *) printf 'https://%s' "$value" ;;
  esac
}

SITE_NAME="$(config_value siteName)"
[ -n "$SITE_NAME" ] || SITE_NAME="Affiliate Site"
CONFIG_DOMAIN="$(config_value domain)"
CONFIG_APEX_DOMAIN="$(config_value apexDomain)"
CANONICAL_BASE="$(normalize_base "$CONFIG_DOMAIN")"
APEX_BASE="$(normalize_base "$CONFIG_APEX_DOMAIN")"
TEST_DEPLOYMENT_BASE="$(normalize_base "$(config_value testDeploymentUrl)")"

usage() {
  cat <<EOF
Usage: bash scripts/seo-smoke-test.sh [options] [URL ...]

Audits indexing health, redirects, canonicals, sitemap URLs,
robots.txt, and Googlebot accessibility. With no URL arguments, the script
audits the canonical domain from data/config.json plus core section URLs.

Options:
  --canonical-base URL  Canonical production origin.
                        Default: $CANONICAL_BASE
  --crawl-base URL      Origin to fetch. Defaults to --canonical-base.
                        Use this for test deployments that should still emit
                        production canonicals.
  --test-deployment     Fetch the configured Cloud Run test deployment:
                        $TEST_DEPLOYMENT_BASE
  --test-base URL       Test deployment origin used by --test-deployment.
  --apex-base URL       Apex origin used for non-www redirect checks.
                        Default: $APEX_BASE
  --output-dir DIR      Directory for report, raw log, and response artifacts.
                        Default: reports/seo-smoke/<timestamp>
  --timeout SECONDS     Per-request timeout. Default: 30
  -h, --help            Show this help.

Examples:
  bash scripts/seo-smoke-test.sh
  bash scripts/seo-smoke-test.sh --test-deployment
  npm run seo:smoke
  bash scripts/seo-smoke-test.sh --output-dir reports/seo-smoke/production
  bash scripts/seo-smoke-test.sh --crawl-base https://example-test-service.run.app
  bash scripts/seo-smoke-test.sh "$CANONICAL_BASE/best-of"
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --canonical-base)
      [ "$#" -ge 2 ] || { echo "Missing value for --canonical-base" >&2; exit 2; }
      CANONICAL_BASE="${2%/}"
      shift 2
      ;;
    --crawl-base)
      [ "$#" -ge 2 ] || { echo "Missing value for --crawl-base" >&2; exit 2; }
      CRAWL_BASE="${2%/}"
      shift 2
      ;;
    --test-deployment)
      if [ -z "$TEST_DEPLOYMENT_BASE" ]; then
        echo "No testDeploymentUrl configured in $CONFIG_FILE. Pass --test-base or --crawl-base." >&2
        exit 2
      fi
      CRAWL_BASE="$TEST_DEPLOYMENT_BASE"
      shift
      ;;
    --test-base)
      [ "$#" -ge 2 ] || { echo "Missing value for --test-base" >&2; exit 2; }
      TEST_DEPLOYMENT_BASE="$(normalize_base "$2")"
      shift
      ;;
    --apex-base)
      [ "$#" -ge 2 ] || { echo "Missing value for --apex-base" >&2; exit 2; }
      APEX_BASE="${2%/}"
      shift 2
      ;;
    --output-dir)
      [ "$#" -ge 2 ] || { echo "Missing value for --output-dir" >&2; exit 2; }
      OUTPUT_DIR="$2"
      shift 2
      ;;
    --timeout)
      [ "$#" -ge 2 ] || { echo "Missing value for --timeout" >&2; exit 2; }
      TIMEOUT="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --*)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 2
      ;;
    *)
      TARGET_URLS+=("${1%/}")
      shift
      ;;
  esac
done

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to run SEO smoke tests." >&2
  exit 2
fi

if [ -z "$CANONICAL_BASE" ]; then
  echo "Unable to infer canonical base. Set data/config.json domain or pass --canonical-base." >&2
  exit 2
fi

if [ -z "$CRAWL_BASE" ]; then
  CRAWL_BASE="$CANONICAL_BASE"
fi

TIMESTAMP="$(date -u '+%Y%m%dT%H%M%SZ')"
if [ -z "$OUTPUT_DIR" ]; then
  OUTPUT_DIR="reports/seo-smoke/$TIMESTAMP"
fi

REPORT="$OUTPUT_DIR/report.md"
LOG="$OUTPUT_DIR/full-test.log"
RESULTS="$OUTPUT_DIR/.results.tmp"
ISSUES="$OUTPUT_DIR/.issues.tmp"
SITEMAP_URLS="$OUTPUT_DIR/sitemap-urls.txt"
ALL_URLS="$OUTPUT_DIR/tested-urls.txt"
BODIES_DIR="$OUTPUT_DIR/responses"

mkdir -p "$BODIES_DIR"
: > "$RESULTS"
: > "$ISSUES"
: > "$LOG"
: > "$ALL_URLS"

cleanup() {
  rm -f "$RESULTS" "$ISSUES"
}
trap cleanup EXIT

escape_markdown() {
  printf '%s' "$1" | tr '\r\n' '  ' | sed 's/|/\\|/g'
}

record_result() {
  local status="$1"
  local category="$2"
  local url="$3"
  local problem="$4"
  local recommendation="$5"
  local category_md url_md problem_md recommendation_md
  category_md="$(escape_markdown "$category")"
  url_md="$(escape_markdown "$url")"
  problem_md="$(escape_markdown "$problem")"
  recommendation_md="$(escape_markdown "$recommendation")"

  printf '| %s | %s | `%s` | %s | %s |\n' "$status" "$category_md" "$url_md" "$problem_md" "$recommendation_md" >> "$RESULTS"
  if [ "$status" = "PASS" ]; then
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    FAIL_COUNT=$((FAIL_COUNT + 1))
    printf -- '- **%s** `%s`: %s Recommended fix: %s\n' "$category_md" "$url_md" "$problem_md" "$recommendation_md" >> "$ISSUES"
  fi
  printf '[%s] %s | %s | %s | %s\n' "$status" "$category" "$url" "$problem" "$recommendation" >> "$LOG"
}

safe_name() {
  printf '%s' "$1" | sed 's#^https\?://##; s#[^A-Za-z0-9._-]#_#g'
}

url_path() {
  local url="$1"
  local path
  path="$(printf '%s' "$url" | sed -E 's#^https?://[^/]+##')"
  if [ -z "$path" ]; then
    path="/"
  fi
  printf '%s' "$path"
}

canonical_for_url() {
  local url="$1"
  local path
  path="$(url_path "$url")"
  if [ "$path" = "/" ]; then
    printf '%s/' "$CANONICAL_BASE"
  else
    printf '%s%s' "$CANONICAL_BASE" "$path"
  fi
}

final_for_url() {
  local url="$1"
  local path
  path="$(url_path "$url")"
  if [ "$path" = "/" ]; then
    printf '%s/' "$CRAWL_BASE"
  else
    printf '%s%s' "$CRAWL_BASE" "$path"
  fi
}

host_for_url() {
  printf '%s' "$1" | sed -E 's#^https?://([^/:]+).*#\1#'
}

scheme_for_url() {
  printf '%s' "$1" | sed -E 's#^(https?)://.*#\1#'
}

LAST_STATUS=""
LAST_CONTENT_TYPE=""
LAST_BODY=""
LAST_HEADERS=""
LAST_ERROR=""
LAST_EFFECTIVE_URL=""
LAST_REDIRECTS=""

request_url() {
  local url="$1"
  local user_agent="$2"
  local label="$3"
  local target_dir error_file meta rc
  target_dir="$BODIES_DIR/$(safe_name "$url")"
  mkdir -p "$target_dir"
  REQUEST_COUNT=$((REQUEST_COUNT + 1))
  LAST_BODY="$target_dir/$(printf '%03d' "$REQUEST_COUNT")-$(safe_name "$label").body"
  LAST_HEADERS="$target_dir/$(printf '%03d' "$REQUEST_COUNT")-$(safe_name "$label").headers"
  error_file="$target_dir/$(printf '%03d' "$REQUEST_COUNT")-$(safe_name "$label").stderr"

  printf '\n===== REQUEST %03d: %s =====\n' "$REQUEST_COUNT" "$label" >> "$LOG"
  printf 'URL: %s\nUser-Agent: %s\n' "$url" "$user_agent" >> "$LOG"

  set +e
  meta="$(curl --silent --show-error --location --max-redirs "$MAX_REDIRECTS" --max-time "$TIMEOUT" \
    --user-agent "$user_agent" --dump-header "$LAST_HEADERS" \
    --output "$LAST_BODY" --write-out '%{http_code}|%{content_type}|%{url_effective}|%{num_redirects}' \
    "$url" 2>"$error_file")"
  rc=$?
  set +e

  LAST_ERROR=""
  if [ "$rc" -ne 0 ]; then
    LAST_ERROR="$(cat "$error_file")"
    LAST_STATUS="curl-error-$rc"
    LAST_CONTENT_TYPE=""
    LAST_EFFECTIVE_URL=""
    LAST_REDIRECTS=""
  else
    LAST_STATUS="${meta%%|*}"
    meta="${meta#*|}"
    LAST_CONTENT_TYPE="${meta%%|*}"
    meta="${meta#*|}"
    LAST_EFFECTIVE_URL="${meta%%|*}"
    LAST_REDIRECTS="${meta#*|}"
  fi

  printf 'Curl exit: %s\nHTTP status: %s\nContent-Type: %s\nEffective URL: %s\nRedirects: %s\nHeaders: %s\nBody: %s\n' \
    "$rc" "$LAST_STATUS" "$LAST_CONTENT_TYPE" "$LAST_EFFECTIVE_URL" "$LAST_REDIRECTS" "$LAST_HEADERS" "$LAST_BODY" >> "$LOG"
  if [ -s "$error_file" ]; then
    printf 'Stderr:\n' >> "$LOG"
    cat "$error_file" >> "$LOG"
  fi
  printf 'Response headers:\n' >> "$LOG"
  cat "$LAST_HEADERS" >> "$LOG" 2>/dev/null || true
  rm -f "$error_file"
}

extract_canonical() {
  grep -io '<link[^>]*rel=["'\'']canonical["'\''][^>]*>' "$1" 2>/dev/null \
    | sed -n 's/.*href=["'\'']\([^"'\'']*\)["'\''].*/\1/p' \
    | head -1
}

assert_ok_status() {
  local category="$1"
  local url="$2"
  if [ "$LAST_STATUS" = "200" ]; then
    record_result "PASS" "$category" "$url" "HTTP 200" "No action needed."
  else
    record_result "FAIL" "$category" "$url" "Expected HTTP 200, received $LAST_STATUS ${LAST_ERROR}" "Fix deployment, routing, redirects, or access controls so crawlers receive a public 200."
  fi

  case "$LAST_STATUS" in
    401|403|404|5*)
      record_result "FAIL" "$category" "$url" "Crawler-blocking or broken status $LAST_STATUS" "Remove authorization gates, bot blocking, broken route handling, or origin errors for this URL."
      ;;
    200)
      record_result "PASS" "$category" "$url" "No 401, 403, 404, or 5xx response" "No action needed."
      ;;
  esac

  if grep -qi '^www-authenticate:' "$LAST_HEADERS" 2>/dev/null; then
    record_result "FAIL" "$category" "$url" "WWW-Authenticate challenge found" "Remove basic auth or identity-aware proxy protection from public crawlable pages."
  else
    record_result "PASS" "$category" "$url" "No authentication challenge" "No action needed."
  fi
}

assert_redirects() {
  local category="$1"
  local input_url="$2"
  local expected_final="$3"
  if [ "$LAST_EFFECTIVE_URL" = "$expected_final" ]; then
    record_result "PASS" "$category" "$input_url" "Final URL resolves to $expected_final" "No action needed."
  else
    record_result "FAIL" "$category" "$input_url" "Expected final URL $expected_final, received ${LAST_EFFECTIVE_URL:-none}" "Normalize this URL to the canonical https www URL."
  fi

  if [ -n "$LAST_REDIRECTS" ] && [ "$LAST_REDIRECTS" -le 2 ]; then
    record_result "PASS" "$category" "$input_url" "Redirect chain length $LAST_REDIRECTS" "No action needed."
  else
    record_result "FAIL" "$category" "$input_url" "Redirect chain length ${LAST_REDIRECTS:-unknown}" "Keep redirect chains at two hops or fewer and remove loops."
  fi
}

assert_canonical() {
  local category="$1"
  local url="$2"
  local expected="$3"
  local canonical scheme host
  canonical="$(extract_canonical "$LAST_BODY")"

  if [ -n "$canonical" ]; then
    record_result "PASS" "$category" "$url" "Canonical found: $canonical" "No action needed."
  else
    record_result "FAIL" "$category" "$url" "Canonical tag not found" "Add an absolute canonical tag for this page."
    return
  fi

  case "$canonical" in
    http://*|https://*)
      record_result "PASS" "$category" "$url" "Canonical is absolute" "No action needed."
      ;;
    *)
      record_result "FAIL" "$category" "$url" "Canonical is relative: $canonical" "Use an absolute canonical URL."
      ;;
  esac

  scheme="$(scheme_for_url "$canonical")"
  if [ "$scheme" = "https" ]; then
    record_result "PASS" "$category" "$url" "Canonical uses HTTPS" "No action needed."
  else
    record_result "FAIL" "$category" "$url" "Canonical does not use HTTPS: $canonical" "Use https:// canonical URLs."
  fi

  host="$(host_for_url "$canonical")"
  if [ "$host" = "$(host_for_url "$CANONICAL_BASE")" ]; then
    record_result "PASS" "$category" "$url" "Canonical uses www host" "No action needed."
  else
    record_result "FAIL" "$category" "$url" "Canonical host is $host" "Use $(host_for_url "$CANONICAL_BASE") for canonical URLs."
  fi

  if [ "$canonical" = "$expected" ]; then
    record_result "PASS" "$category" "$url" "Canonical matches expected URL" "No action needed."
  else
    record_result "FAIL" "$category" "$url" "Expected canonical $expected, received $canonical" "Align page metadata with the canonical production URL."
  fi
}

assert_review_monetization() {
  local url="$1"
  local path
  path="$(url_path "$url")"
  case "$path" in
    /reviews/*) ;;
    *) return ;;
  esac
  if is_review_category_path "$path"; then
    record_result "PASS" "Review Monetization" "$url" "Review category hub excluded from product-review checks" "No action needed."
    return
  fi

  if grep -q '"@type":"Product"\|"@type": "Product"' "$LAST_BODY" 2>/dev/null; then
    record_result "PASS" "Review Monetization" "$url" "Product schema found" "No action needed."
  else
    record_result "FAIL" "Review Monetization" "$url" "Product schema not found" "Add Product JSON-LD to review pages."
  fi

  if grep -Eqi 'Buy Here|Buy Here on Amazon|Buy Here at Best Buy|Buy Here at Walmart|Buy Here at REI|Check Current Price|Check Price on Amazon|View on Official Website|View at Best Buy|View at Walmart|View at REI' "$LAST_BODY" 2>/dev/null; then
    record_result "PASS" "Review Monetization" "$url" "Standard affiliate CTA found" "No action needed."
    if grep -Eqi '<a[^>]+href=["'\'']https?://[^"'\'']+["'\''][^>]*(sponsored|Buy Here|Buy Here on Amazon|Buy Here at Best Buy|Buy Here at Walmart|Buy Here at REI|Check Current Price|Check Price on Amazon|View on Official Website|View at Best Buy|View at Walmart|View at REI)' "$LAST_BODY" 2>/dev/null; then
      record_result "PASS" "Review Monetization" "$url" "Outbound merchant CTA found" "No action needed."
    else
      record_result "FAIL" "Review Monetization" "$url" "Outbound merchant CTA not found" "Add an approved affiliate CTA link or hide merchant CTA text."
    fi
  elif grep -Eqi 'See Rankings|Compare Alternatives|Read Review' "$LAST_BODY" 2>/dev/null; then
    record_result "PASS" "Review Monetization" "$url" "Internal fallback CTA found" "No action needed."
  else
    record_result "FAIL" "Review Monetization" "$url" "No affiliate or internal fallback CTA found" "Add approved affiliate CTAs or internal funnel fallback CTAs."
  fi
}

assert_science_architecture() {
  local url="$1"
  local path
  path="$(url_path "$url")"
  case "$path" in
    /science|/science/*) ;;
    *) return ;;
  esac

  if [ "$path" = "/science" ]; then
    if grep -Eqi 'Browse by Category|Featured Research|Recently Added Studies|How We Evaluate Scientific Evidence|Why Trust Our Research' "$LAST_BODY" 2>/dev/null; then
      record_result "PASS" "Science Architecture" "$url" "Science research-library landing sections found" "No action needed."
    else
      record_result "FAIL" "Science Architecture" "$url" "Science landing page is missing research-library sections" "Render Featured Research, Browse by Category, Recently Added Studies, trust, and methodology sections."
    fi
    if grep -Eqi '/science/cold-water-immersion|/science/saunas|/science/contrast-therapy' "$LAST_BODY" 2>/dev/null; then
      record_result "PASS" "Science Architecture" "$url" "Science category links found" "No action needed."
    else
      record_result "FAIL" "Science Architecture" "$url" "Science category links not found" "Populate Science navigation and category cards from the Science taxonomy."
    fi
    return
  fi

  case "$path" in
    /science/*/*)
      if grep -q '"@type":"Article"\|"@type": "Article"' "$LAST_BODY" 2>/dev/null; then
        record_result "PASS" "Science Architecture" "$url" "Article schema found" "No action needed."
      else
        record_result "FAIL" "Science Architecture" "$url" "Science article is missing Article schema" "Generate Article JSON-LD from the Science article template."
      fi
      if grep -q '"@type":"BreadcrumbList"\|"@type": "BreadcrumbList"' "$LAST_BODY" 2>/dev/null; then
        record_result "PASS" "Science Architecture" "$url" "Breadcrumb schema found" "No action needed."
      else
        record_result "FAIL" "Science Architecture" "$url" "Science article is missing Breadcrumb schema" "Generate BreadcrumbList JSON-LD for Science articles."
      fi
      if grep -Eqi 'Key Takeaways|Study Snapshot|Studies Reviewed|Strength of the Evidence|Study Limitations|What This Means for Consumers|References|not medical advice' "$LAST_BODY" 2>/dev/null; then
        record_result "PASS" "Science Architecture" "$url" "Science article research sections found" "No action needed."
      else
        record_result "FAIL" "Science Architecture" "$url" "Science article is missing required research-library sections" "Render key takeaways, study snapshot, studies reviewed, evidence strength, limitations, consumer meaning, references, and disclaimer."
      fi
      if grep -q 'ScholarlyArticle\|doi:\|PubMed/source' "$LAST_BODY" 2>/dev/null; then
        record_result "PASS" "Science Architecture" "$url" "Central study references found" "No action needed."
      else
        record_result "FAIL" "Science Architecture" "$url" "Science article does not expose central study references" "Render references from data/studies.json and include citation data in JSON-LD."
      fi
      if grep -Eqi '/guides/|/comparisons/|/best-of/|/reviews/' "$LAST_BODY" 2>/dev/null; then
        record_result "PASS" "Science Architecture" "$url" "Science article links into the commercial funnel" "No action needed."
      else
        record_result "FAIL" "Science Architecture" "$url" "Science article lacks internal funnel links" "Link relevant Science articles to guides, comparisons, Best Of lists, or reviews."
      fi
      ;;
    /science/*)
      if grep -Eqi 'Research Library|Read Analysis|studies referenced' "$LAST_BODY" 2>/dev/null; then
        record_result "PASS" "Science Architecture" "$url" "Science category page lists research articles" "No action needed."
      else
        record_result "FAIL" "Science Architecture" "$url" "Science category page lacks article cards" "Render Science article cards for categories that have published research."
      fi
      ;;
  esac
}

audit_page_url() {
  local url="$1"
  local expected_canonical="${2:-}"
  local expected_final="${3:-}"
  if [ -z "$expected_canonical" ]; then
    expected_canonical="$(canonical_for_url "$url")"
  fi
  if [ -z "$expected_final" ]; then
    expected_final="$(final_for_url "$url")"
  fi
  printf '%s\n' "$expected_canonical" >> "$ALL_URLS"

  request_url "$url" "Mozilla/5.0 SEO-Smoke-Test" "browser $(url_path "$url")"
  assert_ok_status "Page Accessibility" "$url"
  assert_redirects "Redirect Issues" "$url" "$expected_final"

  if [ "$LAST_STATUS" = "200" ]; then
    assert_canonical "Canonical Issues" "$url" "$expected_canonical"
    assert_review_monetization "$url"
    assert_science_architecture "$url"
  fi

  local browser_status browser_effective browser_redirects
  browser_status="$LAST_STATUS"
  browser_effective="$LAST_EFFECTIVE_URL"
  browser_redirects="$LAST_REDIRECTS"

  request_url "$url" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Googlebot $(url_path "$url")"
  assert_ok_status "Googlebot Accessibility Issues" "$url"
  assert_redirects "Googlebot Accessibility Issues" "$url" "$expected_final"

  if [ "$LAST_STATUS" = "$browser_status" ] && [ "$LAST_EFFECTIVE_URL" = "$browser_effective" ] && [ "$LAST_REDIRECTS" = "$browser_redirects" ]; then
    record_result "PASS" "Googlebot Accessibility Issues" "$url" "Googlebot matches browser response" "No action needed."
  else
    record_result "FAIL" "Googlebot Accessibility Issues" "$url" "Browser got $browser_status/$browser_effective/$browser_redirects redirects; Googlebot got $LAST_STATUS/$LAST_EFFECTIVE_URL/$LAST_REDIRECTS redirects" "Remove user-agent-specific routing, bot blocking, or CDN rules."
  fi
}

audit_redirect_variants_for_path() {
  local path="$1"
  local expected
  if [ "$path" = "/" ]; then
    expected="$CANONICAL_BASE/"
  else
    expected="$CANONICAL_BASE$path"
  fi

  local canonical_host apex_host
  canonical_host="$(host_for_url "$CANONICAL_BASE")"
  apex_host="$(host_for_url "$APEX_BASE")"

  request_url "http://$canonical_host$path" "Mozilla/5.0 SEO-Smoke-Test" "http-www $path"
  assert_redirects "Redirect Issues" "http://$canonical_host$path" "$expected"

  if [ -n "$apex_host" ]; then
    request_url "http://$apex_host$path" "Mozilla/5.0 SEO-Smoke-Test" "http-apex $path"
    assert_redirects "Redirect Issues" "http://$apex_host$path" "$expected"

    request_url "$APEX_BASE$path" "Mozilla/5.0 SEO-Smoke-Test" "https-apex $path"
    assert_redirects "Redirect Issues" "$APEX_BASE$path" "$expected"
  fi
}

audit_robots() {
  local robots_url="$CRAWL_BASE/robots.txt"
  request_url "$robots_url" "Mozilla/5.0 SEO-Smoke-Test" "robots"
  assert_ok_status "Crawlability" "$robots_url"
  if grep -qi '^Disallow:[[:space:]]*/[[:space:]]*$' "$LAST_BODY" 2>/dev/null; then
    record_result "FAIL" "Crawlability" "$robots_url" "robots.txt blocks the entire site" "Remove site-wide Disallow for production."
  else
    record_result "PASS" "Crawlability" "$robots_url" "robots.txt does not block the entire site" "No action needed."
  fi
  if grep -q "Sitemap: $CANONICAL_BASE/sitemap.xml" "$LAST_BODY" 2>/dev/null; then
    record_result "PASS" "Crawlability" "$robots_url" "Correct sitemap declaration found" "No action needed."
  else
    record_result "FAIL" "Crawlability" "$robots_url" "Expected Sitemap: $CANONICAL_BASE/sitemap.xml" "Update robots.txt to reference the canonical sitemap."
  fi
}

audit_sitemap() {
  local sitemap_url="$CRAWL_BASE/sitemap.xml"
  request_url "$sitemap_url" "Mozilla/5.0 SEO-Smoke-Test" "sitemap"
  assert_ok_status "Sitemap Issues" "$sitemap_url"

  { grep -o '<loc>[^<]*</loc>' "$LAST_BODY" 2>/dev/null || true; } | sed 's#<loc>##g; s#</loc>##g' | sort -u > "$SITEMAP_URLS"
  if [ -s "$SITEMAP_URLS" ]; then
    record_result "PASS" "Sitemap Issues" "$sitemap_url" "$(wc -l < "$SITEMAP_URLS" | tr -d ' ') sitemap URLs found" "No action needed."
  else
    record_result "FAIL" "Sitemap Issues" "$sitemap_url" "No sitemap URLs found" "Ensure sitemap.xml contains absolute loc entries."
    return
  fi

  if [ "$(grep -c '^http://' "$SITEMAP_URLS" || true)" -eq 0 ]; then
    record_result "PASS" "Sitemap Issues" "$sitemap_url" "All sitemap URLs use HTTPS" "No action needed."
  else
    record_result "FAIL" "Sitemap Issues" "$sitemap_url" "Sitemap contains HTTP URLs" "Use only https sitemap URLs."
  fi

  if [ "$(grep -vc "^$CANONICAL_BASE" "$SITEMAP_URLS" || true)" -eq 0 ]; then
    record_result "PASS" "Sitemap Issues" "$sitemap_url" "All sitemap URLs use canonical host" "No action needed."
  else
    record_result "FAIL" "Sitemap Issues" "$sitemap_url" "Sitemap contains non-canonical hosts" "Use only $(host_for_url "$CANONICAL_BASE") sitemap URLs."
  fi

  while IFS= read -r sitemap_entry; do
    local path crawl_url expected_canonical expected_final
    case "$sitemap_entry" in
      "$CANONICAL_BASE")
        path="/"
        ;;
      "$CANONICAL_BASE"/*)
        path="${sitemap_entry#"$CANONICAL_BASE"}"
        ;;
      *)
        record_result "FAIL" "Sitemap Issues" "$sitemap_entry" "Sitemap URL is outside canonical base" "List only canonical production URLs in sitemap.xml."
        continue
        ;;
    esac

    if [ "$path" = "/" ]; then
      crawl_url="$CRAWL_BASE/"
      expected_canonical="$CANONICAL_BASE/"
      expected_final="$CRAWL_BASE/"
    else
      crawl_url="$CRAWL_BASE$path"
      expected_canonical="$sitemap_entry"
      expected_final="$CRAWL_BASE$path"
    fi

    audit_page_url "$crawl_url" "$expected_canonical" "$expected_final"
    if [ "$LAST_REDIRECTS" = "0" ]; then
      record_result "PASS" "Sitemap Issues" "$sitemap_entry" "Mapped crawl URL does not redirect" "No action needed."
    else
      record_result "FAIL" "Sitemap Issues" "$sitemap_entry" "Mapped crawl URL redirects $LAST_REDIRECTS time(s)" "List final canonical URLs in sitemap.xml and keep deployment routes direct."
    fi
  done < "$SITEMAP_URLS"
}

if [ "${#TARGET_URLS[@]}" -eq 0 ]; then
  for path in "${SEED_PATHS[@]}"; do
    if [ "$path" = "/" ]; then
      TARGET_URLS+=("$CRAWL_BASE/")
    else
      TARGET_URLS+=("$CRAWL_BASE$path")
    fi
  done
fi

audit_robots
audit_sitemap

for url in "${TARGET_URLS[@]}"; do
  audit_page_url "$url"
done

if [ "$CRAWL_BASE" = "$CANONICAL_BASE" ]; then
  for path in "${SEED_PATHS[@]}"; do
    audit_redirect_variants_for_path "$path"
  done
else
  record_result "PASS" "Redirect Issues" "$CRAWL_BASE" "Skipped production apex/http redirect checks for non-production crawl base" "Run without --test-deployment to validate production redirects."
fi

sort -u -o "$ALL_URLS" "$ALL_URLS"

{
  printf '# %s SEO Smoke Test Report\n\n' "$SITE_NAME"
  printf -- '- Generated: `%s` UTC\n' "$TIMESTAMP"
  printf -- '- Canonical base: `%s`\n' "$CANONICAL_BASE"
  printf -- '- Crawl base: `%s`\n' "$CRAWL_BASE"
  printf -- '- Apex base: `%s`\n' "$APEX_BASE"
  printf -- '- Requests executed: `%s`\n' "$REQUEST_COUNT"
  printf -- '- Passed assertions: `%s`\n' "$PASS_COUNT"
  printf -- '- Failed assertions: `%s`\n\n' "$FAIL_COUNT"

  printf '## Executive Summary\n\n'
  if [ "$FAIL_COUNT" -eq 0 ]; then
    printf 'No active SEO smoke-test failures were found. The historical Google Search Console 401 reports are likely stale unless GSC still shows fresh crawl dates after this report timestamp.\n\n'
  else
    printf 'Active SEO smoke-test failures were found. Treat any 401, 403, 404, 5xx, invalid canonical, redirect mismatch, or Googlebot/browser response mismatch as a release blocker.\n\n'
  fi

  printf '## A. Redirect Issues\n\n'
  if grep -q '| FAIL | Redirect Issues |' "$RESULTS"; then
    grep '| FAIL | Redirect Issues |' "$RESULTS"
  else
    printf 'No redirect failures found. Severity: Low. Impact: canonical redirect behavior appears stable. Recommended fix: none.\n'
  fi
  printf '\n\n## B. Canonical Issues\n\n'
  if grep -q '| FAIL | Canonical Issues |' "$RESULTS"; then
    grep '| FAIL | Canonical Issues |' "$RESULTS"
  else
    printf 'No canonical failures found. Severity: Low. Impact: canonical tags appear consistent with production www HTTPS URLs. Recommended fix: none.\n'
  fi
  printf '\n\n## C. Sitemap Issues\n\n'
  if grep -q '| FAIL | Sitemap Issues |' "$RESULTS"; then
    grep '| FAIL | Sitemap Issues |' "$RESULTS"
  else
    printf 'No sitemap failures found. Severity: Low. Impact: sitemap URLs appear crawlable and canonical. Recommended fix: none.\n'
  fi
  printf '\n\n## D. Googlebot Accessibility Issues\n\n'
  if grep -q '| FAIL | Googlebot Accessibility Issues |' "$RESULTS"; then
    grep '| FAIL | Googlebot Accessibility Issues |' "$RESULTS"
  else
    printf 'No Googlebot-specific failures found. Severity: Low. Impact: Googlebot receives the same crawlable responses as browser requests. Recommended fix: none.\n'
  fi
  printf '\n\n## E. Potential Causes Of Historical GSC 401 Errors\n\n'
  if grep '| FAIL |' "$RESULTS" | grep -Eq '401|WWW-Authenticate|authentication challenge'; then
    printf 'Severity: Critical. Impact: at least one audited URL still returned 401 or referenced an authorization challenge. Recommended fix: remove deployment, CDN, identity proxy, or basic-auth restrictions from public URLs.\n'
  else
    printf 'Severity: Low if GSC crawl dates are old; High if GSC shows fresh crawl attempts. Impact: no active 401 was detected by this run, so historical reports may reflect a prior protected deployment, non-www/apex host behavior, CDN/IAP rules, or a temporary preview-service authorization state. Recommended fix: validate latest GSC crawl dates and keep this smoke test in the post-deploy pipeline.\n'
  fi

  printf '\n\n## PASS/FAIL Detail\n\n'
  printf '| Status | Category | URL | Problem | Recommendation |\n'
  printf '| --- | --- | --- | --- | --- |\n'
  cat "$RESULTS"

  printf '\n## Artifacts\n\n'
  printf -- '- Complete request log: `%s`\n' "$LOG"
  printf -- '- Response headers and bodies: `%s`\n' "$BODIES_DIR"
  printf -- '- Sitemap URLs: `%s`\n' "$SITEMAP_URLS"
  printf -- '- Tested canonical URLs: `%s`\n' "$ALL_URLS"
} > "$REPORT"

printf 'SEO smoke report: %s\n' "$REPORT"
printf 'Full test log: %s\n' "$LOG"
printf 'Assertions: %s passed, %s failed across %s requests.\n' "$PASS_COUNT" "$FAIL_COUNT" "$REQUEST_COUNT"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
