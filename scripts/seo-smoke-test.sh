#!/usr/bin/env bash

set -u
set -o pipefail

CANONICAL_BASE="https://www.the-pool-lab.com"
TIMEOUT=30
OUTPUT_DIR=""
DEFAULT_TARGETS=(
  "https://the-pool-lab-test-797634543823.us-east1.run.app"
  "https://www.the-pool-lab.com"
)
TARGETS=()
PASS_COUNT=0
FAIL_COUNT=0
REQUEST_COUNT=0

usage() {
  cat <<'EOF'
Usage: bash scripts/seo-smoke-test.sh [options] [ORIGIN ...]

Tests public indexing and technical SEO behavior for The Pool Lab deployments.
When no ORIGIN is supplied, both the Cloud Run test service and production
site are tested.

Options:
  --canonical-base URL  Canonical production origin.
                        Default: https://www.the-pool-lab.com
  --output-dir DIR      Directory for report, raw log, and response artifacts.
                        Default: reports/seo-smoke/<timestamp>
  --timeout SECONDS     Per-request timeout. Default: 30
  -h, --help            Show this help.

Examples:
  bash scripts/seo-smoke-test.sh
  bash scripts/seo-smoke-test.sh https://the-pool-lab-test-797634543823.us-east1.run.app
  bash scripts/seo-smoke-test.sh --output-dir /tmp/poollab-seo https://www.the-pool-lab.com
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --canonical-base)
      [ "$#" -ge 2 ] || { echo "Missing value for --canonical-base" >&2; exit 2; }
      CANONICAL_BASE="${2%/}"
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
      TARGETS+=("${1%/}")
      shift
      ;;
  esac
done

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to run SEO smoke tests." >&2
  exit 2
fi

if [ "${#TARGETS[@]}" -eq 0 ]; then
  TARGETS=("${DEFAULT_TARGETS[@]}")
fi

TIMESTAMP="$(date -u '+%Y%m%dT%H%M%SZ')"
if [ -z "$OUTPUT_DIR" ]; then
  OUTPUT_DIR="reports/seo-smoke/$TIMESTAMP"
fi

REPORT="$OUTPUT_DIR/report.md"
LOG="$OUTPUT_DIR/full-test.log"
RESULTS="$OUTPUT_DIR/.results.tmp"
ISSUES="$OUTPUT_DIR/.issues.tmp"
BODIES_DIR="$OUTPUT_DIR/responses"

mkdir -p "$BODIES_DIR"
: > "$RESULTS"
: > "$ISSUES"
: > "$LOG"

cleanup() {
  rm -f "$RESULTS" "$ISSUES"
}
trap cleanup EXIT

escape_markdown() {
  printf '%s' "$1" | tr '\r\n' '  ' | sed 's/|/\\|/g'
}

record_result() {
  local status="$1"
  local target="$2"
  local test_name="$3"
  local details="$4"
  local target_md test_md details_md
  target_md="$(escape_markdown "$target")"
  test_md="$(escape_markdown "$test_name")"
  details_md="$(escape_markdown "$details")"
  printf '| %s | `%s` | %s | %s |\n' "$status" "$target_md" "$test_md" "$details_md" >> "$RESULTS"
  if [ "$status" = "PASS" ]; then
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    FAIL_COUNT=$((FAIL_COUNT + 1))
    printf -- '- `%s` `%s`: %s\n' "$target_md" "$test_md" "$details_md" >> "$ISSUES"
  fi
  printf '[%s] %s | %s | %s\n' "$status" "$target" "$test_name" "$details" >> "$LOG"
}

safe_name() {
  printf '%s' "$1" | sed 's#^https\?://##; s#[^A-Za-z0-9._-]#_#g'
}

LAST_STATUS=""
LAST_CONTENT_TYPE=""
LAST_BODY=""
LAST_HEADERS=""
LAST_ERROR=""

request() {
  local target="$1"
  local path="$2"
  local user_agent="$3"
  local label="$4"
  local target_dir error_file meta rc url
  target_dir="$BODIES_DIR/$(safe_name "$target")"
  mkdir -p "$target_dir"
  REQUEST_COUNT=$((REQUEST_COUNT + 1))
  LAST_BODY="$target_dir/$(printf '%03d' "$REQUEST_COUNT")-$(safe_name "$label").body"
  LAST_HEADERS="$target_dir/$(printf '%03d' "$REQUEST_COUNT")-$(safe_name "$label").headers"
  error_file="$target_dir/$(printf '%03d' "$REQUEST_COUNT")-$(safe_name "$label").stderr"
  url="${target}${path}"

  printf '\n===== REQUEST %03d: %s =====\n' "$REQUEST_COUNT" "$label" >> "$LOG"
  printf 'URL: %s\nUser-Agent: %s\n' "$url" "$user_agent" >> "$LOG"

  set +e
  meta="$(curl --silent --show-error --max-time "$TIMEOUT" \
    --user-agent "$user_agent" --dump-header "$LAST_HEADERS" \
    --output "$LAST_BODY" --write-out '%{http_code}|%{content_type}|%{url_effective}' \
    "$url" 2>"$error_file")"
  rc=$?
  set +e

  LAST_ERROR=""
  if [ "$rc" -ne 0 ]; then
    LAST_ERROR="$(cat "$error_file")"
    LAST_STATUS="curl-error-$rc"
    LAST_CONTENT_TYPE=""
  else
    LAST_STATUS="${meta%%|*}"
    meta="${meta#*|}"
    LAST_CONTENT_TYPE="${meta%%|*}"
  fi

  printf 'Curl exit: %s\nHTTP status: %s\nContent-Type: %s\nHeaders: %s\nBody: %s\n' \
    "$rc" "$LAST_STATUS" "$LAST_CONTENT_TYPE" "$LAST_HEADERS" "$LAST_BODY" >> "$LOG"
  if [ -s "$error_file" ]; then
    printf 'Stderr:\n' >> "$LOG"
    cat "$error_file" >> "$LOG"
  fi
  printf 'Response headers:\n' >> "$LOG"
  cat "$LAST_HEADERS" >> "$LOG" 2>/dev/null || true
  rm -f "$error_file"
}

check_public_response() {
  local target="$1"
  local path="$2"
  local user_agent="$3"
  local agent_label="$4"
  local expected_type="$5"
  local challenge
  request "$target" "$path" "$user_agent" "${agent_label}${path}"

  if [ "$LAST_STATUS" = "200" ]; then
    record_result "PASS" "$target" "$agent_label $path status" "HTTP 200"
  else
    record_result "FAIL" "$target" "$agent_label $path status" "expected HTTP 200, received $LAST_STATUS ${LAST_ERROR}"
    return
  fi

  challenge="$(grep -i '^www-authenticate:' "$LAST_HEADERS" 2>/dev/null || true)"
  if [ -z "$challenge" ]; then
    record_result "PASS" "$target" "$agent_label $path authentication" "no WWW-Authenticate challenge"
  else
    record_result "FAIL" "$target" "$agent_label $path authentication" "unexpected authentication challenge: $challenge"
  fi

  case "$LAST_CONTENT_TYPE" in
    *"$expected_type"*)
      record_result "PASS" "$target" "$agent_label $path content-type" "$LAST_CONTENT_TYPE"
      ;;
    *)
      record_result "FAIL" "$target" "$agent_label $path content-type" "expected $expected_type, received ${LAST_CONTENT_TYPE:-none}"
      ;;
  esac
}

extract_canonical() {
  grep -o '<link rel="canonical"[^>]*href="[^"]*"[^>]*>' "$1" 2>/dev/null \
    | sed -n 's/.*href="\([^"]*\)".*/\1/p' \
    | head -1
}

check_canonical_body() {
  local target="$1"
  local path="$2"
  local expected="$3"
  local canonical
  canonical="$(extract_canonical "$LAST_BODY")"
  if [ "$canonical" = "$expected" ]; then
    record_result "PASS" "$target" "canonical $path" "$canonical"
  elif [ -z "$canonical" ]; then
    record_result "FAIL" "$target" "canonical $path" "canonical link not found"
  else
    record_result "FAIL" "$target" "canonical $path" "expected $expected, received $canonical"
  fi
}

check_redirect() {
  local target="$1"
  local path="$2"
  local expected_location="$target$path"
  local location
  request "$target" "${path}/" "Mozilla/5.0 SEO-Smoke-Test" "redirect${path}/"
  location="$(grep -i '^location:' "$LAST_HEADERS" 2>/dev/null | tail -1 | sed 's/^[Ll]ocation:[[:space:]]*//; s/\r$//')"
  case "$LAST_STATUS" in
    301|308)
      if [ "$location" = "$expected_location" ]; then
        record_result "PASS" "$target" "redirect ${path}/" "$LAST_STATUS to $location"
      else
        record_result "FAIL" "$target" "redirect ${path}/" "expected $expected_location, received ${location:-no Location header}"
      fi
      ;;
    *)
      record_result "FAIL" "$target" "redirect ${path}/" "expected 301/308 to $expected_location, received $LAST_STATUS"
      ;;
  esac
}

BASELINE_PATHS=(
  "/"
  "/about"
  "/guides"
  "/reviews"
  "/best-of"
  "/reviews/Hayward-SharkVac-XL"
  "/blog/dolphin-nautilus-cc-plus-vs-dolphin-premier"
  "/blog/polaris-vs-dolphin-robotic-pool-cleaners"
  "/best-of/leaves"
)

for target in "${TARGETS[@]}"; do
  printf '\n######## TARGET: %s ########\n' "$target" >> "$LOG"

  for path in "${BASELINE_PATHS[@]}"; do
    check_public_response "$target" "$path" "Mozilla/5.0 SEO-Smoke-Test" "browser" "text/html"
    expected_canonical="$CANONICAL_BASE$path"
    if [ "$path" = "/" ]; then
      expected_canonical="$CANONICAL_BASE/"
    fi
    check_canonical_body "$target" "$path" "$expected_canonical"
  done

  check_public_response "$target" "/sitemap.xml" "Mozilla/5.0 SEO-Smoke-Test" "browser" "xml"
  sitemap_body="$LAST_BODY"
  check_public_response "$target" "/sitemap.xml" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Googlebot" "xml"
  check_public_response "$target" "/robots.txt" "Mozilla/5.0 SEO-Smoke-Test" "browser" "text/plain"
  robots_body="$LAST_BODY"
  check_public_response "$target" "/robots.txt" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Googlebot" "text/plain"

  if grep -qi '^Disallow:[[:space:]]*/[[:space:]]*$' "$robots_body"; then
    record_result "FAIL" "$target" "robots crawling" "robots.txt blocks the entire site"
  else
    record_result "PASS" "$target" "robots crawling" "no site-wide Disallow rule"
  fi
  if grep -q "Sitemap: $CANONICAL_BASE/sitemap.xml" "$robots_body"; then
    record_result "PASS" "$target" "robots sitemap declaration" "$CANONICAL_BASE/sitemap.xml"
  else
    record_result "FAIL" "$target" "robots sitemap declaration" "expected Sitemap: $CANONICAL_BASE/sitemap.xml"
  fi

  sitemap_urls="$OUTPUT_DIR/$(safe_name "$target")-sitemap-urls.txt"
  grep -o '<loc>[^<]*</loc>' "$sitemap_body" | sed 's#<loc>##g; s#</loc>##g' > "$sitemap_urls"
  if [ -s "$sitemap_urls" ]; then
    record_result "PASS" "$target" "sitemap entries" "$(wc -l < "$sitemap_urls" | tr -d ' ') URLs discovered"
  else
    record_result "FAIL" "$target" "sitemap entries" "no <loc> URLs found"
    continue
  fi

  duplicates="$(sort "$sitemap_urls" | uniq -d)"
  if [ -z "$duplicates" ]; then
    record_result "PASS" "$target" "sitemap duplicates" "none"
  else
    record_result "FAIL" "$target" "sitemap duplicates" "duplicates found: $duplicates"
  fi

  while IFS= read -r sitemap_url; do
    case "$sitemap_url" in
      "$CANONICAL_BASE")
        path="/"
        ;;
      "$CANONICAL_BASE"/*)
        path="${sitemap_url#"$CANONICAL_BASE"}"
        ;;
      *)
        record_result "FAIL" "$target" "sitemap canonical host" "unexpected URL: $sitemap_url"
        continue
        ;;
    esac

    if [ "$path" != "/" ] && printf '%s' "$path" | grep -q '/$'; then
      record_result "FAIL" "$target" "sitemap slash style $path" "trailing slash URL found"
    else
      record_result "PASS" "$target" "sitemap slash style $path" "normalized"
    fi

    check_public_response "$target" "$path" "Mozilla/5.0 SEO-Smoke-Test" "sitemap browser" "text/html"
    if [ "$LAST_STATUS" = "200" ]; then
      expected_canonical="$sitemap_url"
      if [ "$path" = "/" ]; then
        expected_canonical="$CANONICAL_BASE/"
      fi
      check_canonical_body "$target" "$path" "$expected_canonical"
    fi
    check_public_response "$target" "$path" "Googlebot/2.1 (+http://www.google.com/bot.html)" "Googlebot" "text/html"
    if [ "$path" != "/" ] && ! printf '%s' "$path" | grep -q '/$'; then
      check_redirect "$target" "$path"
    fi
  done < "$sitemap_urls"
done

{
  printf '# The Pool Lab SEO Smoke Test Report\n\n'
  printf -- '- Generated: `%s` UTC\n' "$TIMESTAMP"
  printf -- '- Canonical base: `%s`\n' "$CANONICAL_BASE"
  printf -- '- Targets: `%s`\n' "$(printf '%s ' "${TARGETS[@]}" | sed 's/[[:space:]]*$//')"
  printf -- '- Requests executed: `%s`\n' "$REQUEST_COUNT"
  printf -- '- Passed assertions: `%s`\n' "$PASS_COUNT"
  printf -- '- Failed assertions: `%s`\n\n' "$FAIL_COUNT"
  printf '## Issues\n\n'
  if [ "$FAIL_COUNT" -eq 0 ]; then
    printf 'No issues found.\n\n'
  else
    cat "$ISSUES"
    printf '\n'
  fi
  printf '## Assertion Log\n\n'
  printf '| Status | Target | Test | Details |\n'
  printf '| --- | --- | --- | --- |\n'
  cat "$RESULTS"
  printf '\n## Artifacts\n\n'
  printf -- '- Complete request log: `%s`\n' "$LOG"
  printf -- '- Response headers and bodies: `%s`\n' "$BODIES_DIR"
} > "$REPORT"

printf 'SEO smoke report: %s\n' "$REPORT"
printf 'Full test log: %s\n' "$LOG"
printf 'Assertions: %s passed, %s failed across %s requests.\n' "$PASS_COUNT" "$FAIL_COUNT" "$REQUEST_COUNT"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
