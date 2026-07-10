#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const productCategories = loadJsonSafe("../data/productCategories.json", []);
const productsData = loadJsonSafe("../data/products.json", []);
const vendorsData = loadJsonSafe("../data/vendors.json", []);

const config = {
  baseUrl: "https://thermapeak-test-925569592209.us-east1.run.app",
  outputDir: "audits",
  maxPages: 250,
  knownLegacyTerms: [
    "Pool Lab",
    "ThePoolLab",
    "robotic pool cleaner",
    "localhost",
    "ThePoolLabOG.png",
  ],
  ctaKeywords: [
    "buy",
    "shop",
    "check price",
    "check current price",
    "see price",
    "view deal",
    "view on",
    "view at",
    "view on official website",
    "learn more",
    "get",
    "compare",
    "read review",
  ],
  merchantCtaKeywords: [
    "check current price",
    "buy here",
    "buy on",
    "buy at",
    "check price on amazon",
    "view on official website",
    "view at best buy",
    "view at walmart",
    "view at rei",
  ],
  affiliateLinkIndicators: [
    "amazon.com",
    "amzn.to",
    "shareasale",
    "impact.com",
    "awin1.com",
    "avantlink",
    "cj.com",
    "partner",
    "affiliate",
    "ref=",
    "tag=",
    "utm_",
  ],
  expectedContentTypes: ["home", "best-of", "comparison", "guide", "science", "review", "about"],
};

const ISSUE_WEIGHTS = { high: 24, medium: 12, low: 5 };

function loadJsonSafe(relativePath, fallback) {
  try {
    return require(path.join(__dirname, relativePath));
  } catch {
    return fallback;
  }
}

function normalizePrimaryCategory(value) {
  const normalized = String(value || "").trim().toLowerCase();
  const legacyMap = {
    "cold-plunge": "cold-exposure",
    "ice-bath": "cold-exposure",
    "infrared-sauna": "sauna-heat-therapy",
    "traditional-sauna": "sauna-heat-therapy",
    "sauna-blanket": "sauna-heat-therapy",
    "hybrid-sauna": "sauna-heat-therapy",
  };
  return productCategories.some((category) => category.slug === normalized) ? normalized : legacyMap[normalized] || "";
}

function expectedNonEmptyReviewCategorySlugs() {
  const counts = {};
  productCategories.forEach((category) => {
    counts[category.slug] = 0;
  });
  productsData.forEach((product) => {
    const slug = normalizePrimaryCategory(product.primaryCategory) || normalizePrimaryCategory(product.category);
    if (slug && Object.prototype.hasOwnProperty.call(counts, slug)) counts[slug] += 1;
  });
  return Object.entries(counts).filter(([, count]) => count > 0).map(([slug]) => slug);
}

function isValidUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim()) && value.trim() !== "#";
}

function vendorById(vendorId) {
  return vendorsData.find((vendor) => vendor.vendorId === vendorId) || null;
}

function productAffiliateUrls(product) {
  const links = product.affiliateLinks && typeof product.affiliateLinks === "object" ? product.affiliateLinks : {};
  return Object.values(links).filter(isValidUrl);
}

function knownAffiliateUrlVendorMap() {
  const entries = [];
  productsData.forEach((product) => {
    const vendor = vendorById(product.vendorId);
    productAffiliateUrls(product).forEach((url) => {
      entries.push({ url, product, vendor });
    });
  });
  vendorsData.forEach((vendor) => {
    const url = vendor.tracking?.defaultAffiliateUrl;
    if (isValidUrl(url)) entries.push({ url, product: null, vendor });
  });
  return entries;
}

function isVendorApprovedForOutbound(vendor) {
  return vendor?.affiliateStatus === "approved" &&
    vendor.tracking?.usesAffiliateLinks === true &&
    vendor.displayRules?.showOutboundButtons === true;
}

function vendorReadinessIssues() {
  const vendorIds = new Set(vendorsData.map((vendor) => vendor.vendorId));
  const issues = [];

  productsData.forEach((product) => {
    if (!product.vendorId) {
      issues.push(issue("high", "production", `Product ${product.sku || product.name} is missing vendorId.`, "Add a vendorId that maps to data/vendors.json."));
      return;
    }
    if (!vendorIds.has(product.vendorId)) {
      issues.push(issue("high", "production", `Product ${product.sku || product.name} has unmapped vendorId: ${product.vendorId}.`, "Create a matching vendor entry in data/vendors.json."));
    }
  });

  vendorsData.forEach((vendor) => {
    if (!["not_applied", "pending", "approved", "rejected", "paused", "unknown"].includes(vendor.affiliateStatus)) {
      issues.push(issue("high", "production", `Vendor ${vendor.name} has invalid affiliateStatus: ${vendor.affiliateStatus}.`, "Use one of the approved affiliate status values."));
    }
    const vendorProducts = productsData.filter((product) => product.vendorId === vendor.vendorId);
    const hasAffiliateUrl = isValidUrl(vendor.tracking?.defaultAffiliateUrl) || vendorProducts.some((product) => productAffiliateUrls(product).length > 0);
    if (vendor.affiliateStatus === "approved" && !hasAffiliateUrl) {
      issues.push(issue("high", "conversion", `Vendor ${vendor.name} is approved but has no affiliate URL.`, "Add product affiliateLinks or vendor tracking.defaultAffiliateUrl before enabling outbound CTAs."));
    }
    if (vendor.affiliateStatus === "approved" && vendor.tracking?.usesAffiliateLinks !== true) {
      issues.push(issue("medium", "conversion", `Vendor ${vendor.name} is approved but tracking.usesAffiliateLinks is not enabled.`, "Set tracking.usesAffiliateLinks to true only after affiliate links are ready."));
    }
  });

  return issues;
}

function normalizeBase(value) {
  const url = new URL(value || config.baseUrl);
  url.hash = "";
  url.search = "";
  return url.toString().replace(/\/$/, "");
}

function isNonProductionAuditHost(baseUrl) {
  const hostname = new URL(baseUrl).hostname;
  return hostname.includes("run.app") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1";
}

function timestampParts(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  return {
    iso: date.toISOString(),
    slug: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}-${pad(date.getMinutes())}`,
  };
}

function stripTags(html) {
  return decodeEntities(html.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "));
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttr(tag, attr) {
  const pattern = new RegExp(`${attr}\\s*=\\s*(["'])(.*?)\\1`, "i");
  const match = tag.match(pattern);
  return match ? decodeEntities(match[2]) : "";
}

function firstMatch(html, pattern) {
  const match = html.match(pattern);
  return match ? decodeEntities(match[1]) : "";
}

function allMatches(html, pattern) {
  const values = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    values.push(decodeEntities(match[1]));
  }
  return values;
}

function metaContent(html, selectorName, selectorValue) {
  const pattern = new RegExp(`<meta\\b(?=[^>]*(?:${selectorName})\\s*=\\s*["']${escapeRegExp(selectorValue)}["'])[^>]*>`, "i");
  const tag = html.match(pattern)?.[0] || "";
  return tag ? getAttr(tag, "content") : "";
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function inferPageType(pathname) {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  if (cleanPath === "/") return "home";
  if (cleanPath === "/about") return "about";
  if (cleanPath === "/best-of" || cleanPath.startsWith("/best-of/")) return "best-of";
  if (cleanPath === "/comparisons" || cleanPath.startsWith("/comparisons/")) return "comparison";
  if (cleanPath === "/guides" || cleanPath.startsWith("/guides/")) return "guide";
  if (cleanPath === "/science" || cleanPath.startsWith("/science/")) return "science";
  if (cleanPath === "/reviews" || cleanPath.startsWith("/reviews/")) return "review";
  return "other";
}

function reviewPathSlug(page) {
  const segments = page.path.split("/").filter(Boolean);
  return page.pageType === "review" && segments.length === 2 ? segments[1] : "";
}

function isReviewCategoryPage(page) {
  const slug = reviewPathSlug(page);
  return productCategories.some((category) => category.slug === slug);
}

function isProductReviewPage(page) {
  return page.pageType === "review" && page.path !== "/reviews" && !isReviewCategoryPage(page);
}

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productForReviewPath(page) {
  const slug = reviewPathSlug(page);
  return productsData.find((product) => slugify(product.sku) === slug) || null;
}

function productVendorApprovedForOutbound(product) {
  const vendor = vendorById(product?.vendorId);
  if (!isVendorApprovedForOutbound(vendor)) return false;
  return productAffiliateUrls(product || {}).length > 0 || isValidUrl(vendor?.tracking?.defaultAffiliateUrl);
}

function isBestOfIndex(page) {
  return page.pageType === "best-of" && page.path === "/best-of";
}

function isBestOfDetail(page) {
  return page.pageType === "best-of" && page.path !== "/best-of";
}

function isComparisonIndex(page) {
  return page.pageType === "comparison" && page.path === "/comparisons";
}

function isComparisonDetail(page) {
  return page.pageType === "comparison" && page.path !== "/comparisons";
}

function isGuideDetail(page) {
  return page.pageType === "guide" && page.path !== "/guides";
}

function sciencePathSegments(page) {
  return page.path.split("/").filter(Boolean);
}

function isScienceIndex(page) {
  return page.pageType === "science" && page.path === "/science";
}

function isScienceCategory(page) {
  const segments = sciencePathSegments(page);
  return page.pageType === "science" && segments.length === 2;
}

function isScienceArticle(page) {
  const segments = sciencePathSegments(page);
  return page.pageType === "science" && segments.length === 3;
}

function absoluteUrl(rawUrl, sourceUrl) {
  try {
    const url = new URL(rawUrl, sourceUrl);
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function extractSitemapUrls(xml, baseUrl) {
  const urls = allMatches(xml, /<loc>\s*([^<\s]+)\s*<\/loc>/gi)
    .map((value) => absoluteUrl(value, baseUrl))
    .filter(Boolean);
  return unique(urls);
}

function mapUrlToBaseOrigin(url, baseUrl) {
  const source = new URL(url);
  const base = new URL(baseUrl);
  return `${base.origin}${source.pathname}${source.search}`.replace(/\/$/, source.pathname === "/" ? "/" : "");
}

function extractJsonLd(html) {
  const blocks = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1].trim()));
    } catch {
      blocks.push({ parseError: true, rawSnippet: match[1].trim().slice(0, 200) });
    }
  }
  return blocks;
}

function collectSchemaTypes(value, output = []) {
  if (!value || typeof value !== "object") return output;
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, output));
    return output;
  }
  if (value["@type"]) {
    if (Array.isArray(value["@type"])) output.push(...value["@type"]);
    else output.push(value["@type"]);
  }
  if (value["@graph"]) collectSchemaTypes(value["@graph"], output);
  Object.keys(value).forEach((key) => {
    if (key !== "@graph" && typeof value[key] === "object") collectSchemaTypes(value[key], output);
  });
  return output;
}

function countPattern(html, pattern) {
  return (html.match(pattern) || []).length;
}

function hasText(html, patterns) {
  const text = stripTags(html).toLowerCase();
  return patterns.some((pattern) => text.includes(pattern));
}

function hasAllText(html, patterns) {
  const text = stripTags(html).toLowerCase();
  return patterns.every((pattern) => text.includes(pattern));
}

function domPosition(html, needleTag) {
  const index = html.indexOf(needleTag);
  if (index < 0 || html.length === 0) return null;
  return Number((index / html.length).toFixed(3));
}

function classifyRelatedLinks(links) {
  const result = {
    home: 0,
    products: 0,
    "best-of": 0,
    comparison: 0,
    guide: 0,
    science: 0,
    review: 0,
    about: 0,
    other: 0,
  };
  links.forEach((link) => {
    result[inferPageType(new URL(link).pathname)] += 1;
  });
  return result;
}

function parseHtmlPage(html, url, baseUrl) {
  const parsedUrl = new URL(url);
  const baseOrigin = new URL(baseUrl).origin;
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const canonicalTag = html.match(/<link\b(?=[^>]*rel\s*=\s*["']canonical["'])[^>]*>/i)?.[0] || "";
  const anchors = [];
  const anchorPattern = /<a\b[^>]*href\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
  let anchorMatch;
  while ((anchorMatch = anchorPattern.exec(html)) !== null) {
    const href = absoluteUrl(anchorMatch[2], url);
    if (!href || !href.startsWith("http")) continue;
    anchors.push({
      href,
      text: stripTags(anchorMatch[3]),
      tag: anchorMatch[0],
    });
  }

  const internalLinks = unique(anchors
    .filter((link) => new URL(link.href).origin === baseOrigin)
    .map((link) => link.href));
  const externalLinks = unique(anchors
    .filter((link) => new URL(link.href).origin !== baseOrigin)
    .map((link) => link.href));
  const ctaAnchors = anchors.filter((link) => {
    const text = link.text.toLowerCase();
    const classes = getAttr(link.tag, "class").toLowerCase();
    return config.ctaKeywords.some((keyword) => text.includes(keyword) || classes.includes("cta") || classes.includes("button"));
  });
  const affiliateLinks = anchors.filter((link) => {
    const href = link.href.toLowerCase();
    const text = link.text.toLowerCase();
    const rel = getAttr(link.tag, "rel").toLowerCase();
    const isOutbound = new URL(link.href).origin !== baseOrigin;
    const looksCommercial = config.affiliateLinkIndicators.some((indicator) => href.includes(indicator)) ||
      rel.includes("sponsored") ||
      config.merchantCtaKeywords.some((keyword) => text.includes(keyword));
    return isOutbound && looksCommercial;
  });
  const knownVendorLinks = knownAffiliateUrlVendorMap();
  const knownVendorOutboundLinks = anchors
    .map((link) => {
      const match = knownVendorLinks.find((entry) => entry.url.toLowerCase() === link.href.toLowerCase());
      if (!match) return null;
      return {
        href: link.href,
        text: link.text,
        rel: getAttr(link.tag, "rel"),
        vendorId: match.vendor?.vendorId || "",
        vendorName: match.vendor?.name || "",
        affiliateStatus: match.vendor?.affiliateStatus || "",
        approvedForOutbound: isVendorApprovedForOutbound(match.vendor),
      };
    })
    .filter(Boolean);
  const imageTags = html.match(/<img\b[^>]*>/gi) || [];
  const jsonLd = extractJsonLd(html);
  const schemaTypes = unique(jsonLd.flatMap((block) => collectSchemaTypes(block)));
  const h1s = allMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
  const h2s = allMatches(html, /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi);
  const h3s = allMatches(html, /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi);
  const fullText = stripTags(html);
  const lowerHtml = html.toLowerCase();
  const reviewCategoryLinkSlugs = unique(anchors
    .map((link) => {
      try {
        const pathname = new URL(link.href).pathname;
        const match = pathname.match(/^\/reviews\/([^/]+)\/?$/);
        const slug = match ? match[1] : "";
        return productCategories.some((category) => category.slug === slug) ? slug : "";
      } catch {
        return "";
      }
    })
    .filter(Boolean));
  const legacyFindings = config.knownLegacyTerms
    .filter((term) => html.toLowerCase().includes(term.toLowerCase()))
    .map((term) => ({ term, count: countPattern(html, new RegExp(escapeRegExp(term), "gi")) }));
  const expectedReviewSlugs = expectedNonEmptyReviewCategorySlugs();

  return {
    url,
    path: parsedUrl.pathname,
    pageType: inferPageType(parsedUrl.pathname),
    title,
    metaDescription: metaContent(html, "name", "description"),
    canonicalUrl: canonicalTag ? absoluteUrl(getAttr(canonicalTag, "href"), url) : "",
    robotsMeta: metaContent(html, "name", "robots"),
    openGraphTitle: metaContent(html, "property", "og:title"),
    openGraphDescription: metaContent(html, "property", "og:description"),
    openGraphImage: metaContent(html, "property", "og:image"),
    twitterCard: metaContent(html, "name", "twitter:card"),
    twitterTitle: metaContent(html, "name", "twitter:title"),
    twitterDescription: metaContent(html, "name", "twitter:description"),
    twitterImage: metaContent(html, "name", "twitter:image"),
    h1s,
    h2s,
    h3s,
    wordCount: fullText ? fullText.split(/\s+/).filter(Boolean).length : 0,
    internalLinks,
    externalLinks,
    imageCount: imageTags.length,
    imagesMissingAltText: imageTags.filter((tag) => !getAttr(tag, "alt")).length,
    schemaTypes,
    faqSchemaPresent: schemaTypes.includes("FAQPage"),
    productSchemaPresent: schemaTypes.includes("Product"),
    articleSchemaPresent: schemaTypes.includes("Article") || schemaTypes.includes("BlogPosting"),
    breadcrumbSchemaPresent: schemaTypes.includes("BreadcrumbList"),
    scholarlyArticleSchemaPresent: schemaTypes.includes("ScholarlyArticle"),
    itemListSchemaPresent: schemaTypes.includes("ItemList"),
    ctaCount: ctaAnchors.length,
    ctaTexts: unique(ctaAnchors.map((link) => link.text)).slice(0, 20),
    firstCtaDomPosition: ctaAnchors[0] ? domPosition(html, ctaAnchors[0].tag) : null,
    affiliateOrMerchantLinkCount: affiliateLinks.length,
    knownVendorOutboundLinks,
    internalLinksToRelatedContentTypes: classifyRelatedLinks(internalLinks),
    reviewCategoryLinkSlugs,
    legacyFindings,
    hasTrustStrip: lowerHtml.includes("trust-strip") || lowerHtml.includes("science-trust-statement") || hasText(html, ["why trust", "how we evaluate", "affiliate disclosure", "avoids overstating claims"]),
    hasFeaturedCategoryCards: lowerHtml.includes("featured-category-card") || lowerHtml.includes("science-category-card") || lowerHtml.includes("product-category-card") || lowerHtml.includes("decision-card") || lowerHtml.includes("comparison-index-card"),
    hasHomepageResearchPositioning: hasText(html, ["science-backed recovery equipment reviews"]) && hasText(html, ["research-informed criteria", "research-informed reviews"]),
    hasHomepageCommercialIntent: hasAllText(html, ["cold plunge tubs", "home saunas", "recovery equipment", "red light therapy", "reviews", "comparisons", "buying guides"]),
    hasBestOfCta: internalLinks.some((link) => new URL(link).pathname.replace(/\/$/, "") === "/best-of"),
    hasScienceCta: internalLinks.some((link) => new URL(link).pathname.replace(/\/$/, "") === "/science"),
    hasDynamicHomeReviewCategorySection: lowerHtml.includes("data-home-active-review-categories") && expectedReviewSlugs.every((slug) => reviewCategoryLinkSlugs.includes(slug)),
    hasReviewsDropdown: lowerHtml.includes("all reviews") && productCategories.some((category) => lowerHtml.includes(`/reviews/${category.slug}`)),
    hasReviewCategoryCards: lowerHtml.includes("review-category-card") || lowerHtml.includes("product-category-card") || lowerHtml.includes("featured-category-card"),
    hasReviewCards: lowerHtml.includes("review-category-card") || lowerHtml.includes("product-category-product-card") || lowerHtml.includes("featured-card"),
    hasComingSoonPlaceholder: hasText(html, ["reviews in this category are coming soon"]),
    hasComparisonTable: lowerHtml.includes("<table") || hasText(html, ["comparison table", "compare features", "side-by-side"]),
    hasTopPickOrBestOverall: hasText(html, ["top pick", "best overall"]),
    hasFaqSection: hasText(html, ["frequently asked questions", "faq"]),
    hasSideBySideComparison: hasText(html, ["side-by-side", "versus", " vs "]) || lowerHtml.includes("<table"),
    hasProductCtaCards: hasText(html, ["check price", "check current price", "view on official website", "view at best buy", "view at walmart", "view at rei", "shop", "view deal", "buy now"]),
    hasProsAndCons: hasText(html, ["pros", "cons"]),
    hasScoreOrVerdict: hasText(html, ["score", "verdict", "rating", "bottom line"]),
    hasBottomCta: hasText(html, ["final verdict", "bottom line", "final step", "best overall recommendation"]),
    hasEducationalSignals: hasText(html, ["how to", "guide", "benefits", "risks", "maintenance", "setup", "choose"]),
    hasKeyTakeaways: hasText(html, ["key takeaways"]),
    hasStudySnapshot: hasText(html, ["study snapshot"]),
    hasStudiesReviewed: hasText(html, ["studies reviewed"]),
    hasEvidenceStrength: hasText(html, ["strength of the evidence"]),
    hasStudyLimitations: hasText(html, ["study limitations"]),
    hasConsumerMeaning: hasText(html, ["what this means for consumers"]),
    hasReferencesSection: hasText(html, ["references", "pubmed/source", "doi:"]),
    scienceLongFormSectionCount: countPattern(html, /science-longform-section/gi),
    hasScienceToc: lowerHtml.includes("science-toc") || hasText(html, ["table of contents"]),
    hasRecentStudies: hasText(html, ["recently added studies"]),
    hasScienceMethodology: hasText(html, ["how we evaluate scientific evidence"]),
    hasScienceDisclaimer: hasText(html, ["not medical advice", "informational purposes only", "consult a qualified health professional"]),
  };
}

function issue(severity, category, message, recommendation) {
  return { severity, category, message, recommendation };
}

function addCommonIssues(page, issues) {
  if (page.statusCode !== 200) {
    issues.push(issue("high", "production", `Page returned HTTP ${page.statusCode}.`, "Ensure every sitemap URL returns HTTP 200."));
    return;
  }
  if (!page.title) issues.push(issue("high", "seo", "Page is missing a title tag.", "Add a concise, keyword-aligned title tag."));
  if (!page.metaDescription) issues.push(issue("high", "seo", "Page is missing a meta description.", "Add a conversion-focused meta description."));
  if (!page.canonicalUrl) issues.push(issue("high", "seo", "Page is missing a canonical URL.", "Add a self-referencing canonical URL."));
  if (page.h1s.length === 0) issues.push(issue("high", "seo", "Page is missing an H1.", "Add one descriptive H1."));
  if (page.h1s.length > 1) issues.push(issue("medium", "seo", "Page has multiple H1s.", "Keep one primary H1 and demote secondary headings."));
  if (page.imagesMissingAltText > 0) issues.push(issue("medium", "trust", `${page.imagesMissingAltText} image(s) are missing alt text.`, "Add descriptive alt text to meaningful images."));
  page.legacyFindings.forEach((finding) => {
    issues.push(issue("high", "production", `Legacy reference found: ${finding.term}.`, "Remove Pool Lab, localhost, or unrelated legacy references before launch."));
  });
}

function addTypeSpecificIssues(page, issues) {
  if (page.statusCode !== 200) return;
  page.knownVendorOutboundLinks.forEach((link) => {
    if (!link.approvedForOutbound) {
      issues.push(issue("high", "production", `Outbound vendor link shown for unapproved vendor: ${link.vendorName || link.vendorId}.`, "Hide outbound vendor links until the vendor is approved and display rules allow outbound buttons."));
    }
    const rel = String(link.rel || "").toLowerCase();
    if (link.approvedForOutbound && (!rel.includes("sponsored") || !rel.includes("nofollow"))) {
      issues.push(issue("high", "production", `Approved affiliate link is missing sponsored nofollow rel: ${link.href}.`, "Use rel=\"sponsored nofollow noopener noreferrer\" for outbound affiliate links."));
    }
  });
  const expectedReviewSlugs = expectedNonEmptyReviewCategorySlugs();
  const emptyReviewSlugs = productCategories
    .map((category) => category.slug)
    .filter((slug) => !expectedReviewSlugs.includes(slug));
  const renderedEmptyReviewSlugs = page.reviewCategoryLinkSlugs.filter((slug) => emptyReviewSlugs.includes(slug));

  if (page.pageType === "home") {
    if (page.ctaCount < 2) issues.push(issue("high", "conversion", "Homepage has too few CTAs.", "Add clear paths into Best Of, Comparisons, or Reviews."));
    if (!page.hasHomepageResearchPositioning) issues.push(issue("high", "trust", "Homepage does not communicate research-informed recovery equipment positioning.", "Lead with science-backed recovery equipment review language and explain the research-informed criteria."));
    if (!page.hasHomepageCommercialIntent) issues.push(issue("medium", "seo", "Homepage is missing key commercial recovery-equipment intent terms.", "Include cold plunge tubs, home saunas, red light therapy, recovery equipment, reviews, comparisons, and buying guides naturally."));
    if (!page.hasBestOfCta) issues.push(issue("high", "conversion", "Homepage is missing a CTA to /best-of.", "Keep Browse Top Picks or another primary CTA pointed at /best-of."));
    if (!page.hasScienceCta) issues.push(issue("medium", "trust", "Homepage is missing a CTA to /science.", "Add a concise Science pathway without displacing commercial buyer paths."));
    if (!page.hasTrustStrip) issues.push(issue("medium", "trust", "Homepage lacks clear trust or evaluation signals.", "Add visible trust, methodology, or editorial standards near the top."));
    if (!page.hasFeaturedCategoryCards || !page.hasDynamicHomeReviewCategorySection) issues.push(issue("medium", "conversion", "Homepage lacks a dynamic active review category section.", "Render active review categories from the shared taxonomy and hide categories without products."));
    if (!page.hasReviewsDropdown) issues.push(issue("medium", "internal-linking", "Reviews dropdown is not visible in navigation.", "Add a Reviews dropdown populated from active review categories."));
    if (renderedEmptyReviewSlugs.length > 0) issues.push(issue("high", "production", `Empty review categories are linked: ${renderedEmptyReviewSlugs.join(", ")}.`, "Only render review categories with at least one reviewable product."));
  }
  if (page.path === "/reviews") {
    if (!page.hasReviewsDropdown) issues.push(issue("medium", "internal-linking", "Reviews index is missing category-driven Reviews navigation.", "Render active review categories from shared taxonomy."));
    if (renderedEmptyReviewSlugs.length > 0) issues.push(issue("high", "production", `Reviews navigation links empty categories: ${renderedEmptyReviewSlugs.join(", ")}.`, "Hide empty review categories from navigation and category grids."));
  }
  if (isReviewCategoryPage(page)) {
    if (!page.hasReviewCards && !page.hasComingSoonPlaceholder) issues.push(issue("high", "conversion", "Review category page has no review cards.", "Render review cards for categories with reviewable products."));
    if (
      page.internalLinksToRelatedContentTypes.review < 1 &&
      page.internalLinksToRelatedContentTypes["best-of"] < 1 &&
      page.internalLinksToRelatedContentTypes.comparison < 1 &&
      page.internalLinksToRelatedContentTypes.guide < 1 &&
      page.internalLinksToRelatedContentTypes.science < 1
    ) {
      issues.push(issue("medium", "internal-linking", "Review category page has too few internal links.", "Link review category pages to reviews, Best Of pages, comparisons, guides, or science articles."));
    }
  }
  if (isBestOfIndex(page)) {
    if (page.ctaCount < 5) issues.push(issue("high", "conversion", "Best Of index has too few guide CTAs.", "Add prominent View Rankings CTAs to featured guide cards."));
    if (!page.hasFeaturedCategoryCards) issues.push(issue("high", "conversion", "Best Of index lacks featured category cards.", "Add commercial guide cards for the most important buyer paths."));
    if (!page.hasTrustStrip) issues.push(issue("medium", "trust", "Best Of index lacks evaluation or trust context.", "Explain how rankings are evaluated and how buyers should use the lists."));
  }
  if (isBestOfDetail(page)) {
    if (!page.hasComparisonTable) issues.push(issue("medium", "conversion", "Best Of page does not appear to have a comparison table.", "Add a product comparison table near the top."));
    if (!page.hasTopPickOrBestOverall) issues.push(issue("medium", "conversion", "Best Of page does not identify a Top Pick or Best Overall.", "Add a clear top recommendation section."));
    if (page.ctaCount < 3) issues.push(issue("high", "conversion", "Best Of page has too few product CTAs.", "Add multiple product CTAs across the ranked recommendations."));
    if (page.internalLinksToRelatedContentTypes.review < 1) issues.push(issue("medium", "internal-linking", "Best Of page does not link to review pages.", "Link ranked products to the corresponding review pages."));
    if (!page.hasScoreOrVerdict) issues.push(issue("medium", "trust", "Best Of page lacks scoring or verdict language.", "Add score, verdict, or recommendation language for ranked products."));
    if (!page.hasFaqSection) issues.push(issue("medium", "trust", "Best Of page is missing an FAQ section.", "Add buyer-intent FAQs near the bottom."));
    if (!page.faqSchemaPresent) issues.push(issue("medium", "schema", "Best Of page is missing FAQ schema.", "Add FAQPage JSON-LD when FAQs are present."));
    if (!page.itemListSchemaPresent) issues.push(issue("high", "schema", "Best Of page is missing ItemList schema.", "Add ItemList JSON-LD for ranked product lists."));
  }
  if (isComparisonIndex(page)) {
    if (page.ctaCount < 5) issues.push(issue("high", "conversion", "Comparisons index has too few comparison CTAs.", "Add clear View Comparison CTAs for key decision pages."));
    if (!page.hasFeaturedCategoryCards) issues.push(issue("high", "conversion", "Comparisons index lacks featured comparison cards.", "Add prominent cards for the highest-value decisions."));
  }
  if (isComparisonDetail(page)) {
    if (!page.hasSideBySideComparison) issues.push(issue("medium", "conversion", "Comparison page lacks a side-by-side comparison section.", "Add a direct comparison section or table."));
    if (page.ctaCount < 2) issues.push(issue("high", "conversion", "Comparison page has fewer than two CTA buttons.", "Add CTA buttons for both options."));
    if (!page.hasBottomCta) issues.push(issue("high", "conversion", "Comparison page lacks a Bottom Line CTA section.", "Add CTAs in or near the bottom-line recommendation."));
    if (page.internalLinksToRelatedContentTypes["best-of"] < 1) issues.push(issue("medium", "internal-linking", "Comparison page does not link to a related Best Of page.", "Link to the relevant Best Of buying guide."));
    if (page.internalLinksToRelatedContentTypes.review < 1) issues.push(issue("medium", "internal-linking", "Comparison page does not link to review pages.", "Link compared products to full reviews where available."));
    if (!page.hasFaqSection) issues.push(issue("medium", "trust", "Comparison page is missing an FAQ section.", "Add decision-stage FAQs."));
    if (!page.faqSchemaPresent) issues.push(issue("medium", "schema", "Comparison page is missing FAQ schema.", "Add FAQPage JSON-LD."));
  }
  if (isProductReviewPage(page)) {
    const reviewProduct = productForReviewPath(page);
    const shouldHaveOutboundMerchantLink = productVendorApprovedForOutbound(reviewProduct);
    if (page.firstCtaDomPosition === null || page.firstCtaDomPosition > 0.35) issues.push(issue("high", "conversion", "Review page lacks a product CTA above the fold.", "Add a merchant CTA near the product summary."));
    if (shouldHaveOutboundMerchantLink && page.affiliateOrMerchantLinkCount < 1) issues.push(issue("high", "conversion", "Review page has no affiliate or merchant outbound link for an approved vendor.", "Render the approved tracked merchant link with sponsored nofollow rel."));
    if (!page.hasProsAndCons) issues.push(issue("medium", "trust", "Review page is missing pros and cons.", "Add a concise pros and cons section."));
    if (!page.hasScoreOrVerdict) issues.push(issue("medium", "trust", "Review page is missing score or verdict language.", "Add a verdict or score summary."));
    if (!page.hasBottomCta) issues.push(issue("high", "conversion", "Review page lacks a bottom CTA section.", "Add a final verdict CTA near the conclusion."));
    if (page.internalLinksToRelatedContentTypes["best-of"] < 1) issues.push(issue("medium", "internal-linking", "Review page does not link back to a relevant Best Of page.", "Link to a related buying guide."));
    if (page.internalLinksToRelatedContentTypes.comparison < 1) issues.push(issue("medium", "internal-linking", "Review page does not link to related comparisons.", "Link to relevant comparison pages where available."));
    if (!page.productSchemaPresent) issues.push(issue("high", "schema", "Review page is missing Product schema.", "Add Product JSON-LD when product data is stable."));
  }
  if (isGuideDetail(page)) {
    if (!page.hasEducationalSignals) issues.push(issue("medium", "trust", "Guide page lacks clear evergreen educational signals.", "Frame the page around durable guidance, benefits, risks, setup, or maintenance."));
    if (page.internalLinksToRelatedContentTypes["best-of"] < 1) issues.push(issue("high", "internal-linking", "Guide page does not link to a Best Of page.", "Add a contextual link to the relevant Best Of buying guide."));
    if (page.internalLinksToRelatedContentTypes.comparison < 1) issues.push(issue("medium", "internal-linking", "Guide page does not link to a Comparison page.", "Add a relevant comparison link when it supports the topic."));
    if (!page.articleSchemaPresent) issues.push(issue("high", "schema", "Guide page is missing Article schema.", "Add Article JSON-LD to guide pages."));
    if (page.hasFaqSection && !page.faqSchemaPresent) issues.push(issue("medium", "schema", "Guide page has FAQs but no FAQ schema.", "Add FAQPage JSON-LD for visible FAQs."));
  }
  if (isScienceIndex(page)) {
    if (page.ctaCount < 5) issues.push(issue("medium", "conversion", "Science index has too few category CTAs.", "Link clearly to each science category."));
    if (!page.hasFeaturedCategoryCards) issues.push(issue("medium", "trust", "Science index lacks visible category cards.", "Surface the research categories as structured cards."));
    if (!page.hasTrustStrip) issues.push(issue("medium", "trust", "Science index lacks a research trust statement.", "Explain how ThermaPeak summarizes research and avoids overstating claims."));
    if (!page.hasRecentStudies) issues.push(issue("medium", "trust", "Science index lacks a Recently Added Studies section.", "Surface recent study records from the central study library."));
    if (!page.hasScienceMethodology) issues.push(issue("medium", "trust", "Science index lacks evidence methodology language.", "Explain how ThermaPeak evaluates scientific evidence."));
  }
  if (isScienceCategory(page)) {
    if (page.ctaCount < 1) issues.push(issue("medium", "internal-linking", "Science category page has no article CTAs.", "Link to science article pages from each category."));
  }
  if (isScienceArticle(page)) {
    if (!page.articleSchemaPresent) issues.push(issue("high", "schema", "Science article is missing Article schema.", "Add Article JSON-LD to science article templates."));
    if (!page.breadcrumbSchemaPresent) issues.push(issue("medium", "schema", "Science article is missing Breadcrumb schema.", "Add BreadcrumbList JSON-LD to science article templates."));
    if (!page.scholarlyArticleSchemaPresent && !page.hasReferencesSection) issues.push(issue("medium", "schema", "Science article does not expose citation data.", "Include study citation data from data/studies.json in Article schema and visible references."));
    if (!page.hasKeyTakeaways) issues.push(issue("medium", "trust", "Science article is missing a Key Takeaways section.", "Add a visible Key Takeaways box near the top."));
    if (!page.hasStudySnapshot) issues.push(issue("medium", "trust", "Science article is missing a Study Snapshot section.", "Show journal, publication year, study type, evidence level, participants, population, DOI, and PubMed where available."));
    if (!page.hasStudiesReviewed) issues.push(issue("medium", "trust", "Science article is missing a Studies Reviewed section.", "Summarize reviewed studies with evidence-strength labels."));
    if (!page.hasEvidenceStrength) issues.push(issue("medium", "trust", "Science article is missing a Strength of the Evidence section.", "Explain the level and limits of the supporting evidence."));
    if (!page.hasStudyLimitations) issues.push(issue("medium", "trust", "Science article is missing Study Limitations.", "List limitations from the referenced study records."));
    if (!page.hasConsumerMeaning) issues.push(issue("medium", "trust", "Science article is missing consumer interpretation.", "Explain what the evidence means for buyers without overstating claims."));
    if (!page.hasReferencesSection) issues.push(issue("medium", "trust", "Science article is missing References.", "Render visible references from the central studies library."));
    if (page.scienceLongFormSectionCount >= 4 && !page.hasScienceToc) issues.push(issue("medium", "internal-linking", "Science article has long-form sections but no table of contents.", "Render a simple anchored table of contents when a Science article has four or more custom sections."));
    if (!page.hasScienceDisclaimer) issues.push(issue("high", "trust", "Science article is missing the medical disclaimer.", "Add the standard informational-only medical disclaimer."));
    if (
      page.internalLinksToRelatedContentTypes.guide < 1 &&
      page.internalLinksToRelatedContentTypes.comparison < 1 &&
      page.internalLinksToRelatedContentTypes["best-of"] < 1
    ) {
      issues.push(issue("medium", "internal-linking", "Science article does not link to a relevant guide, comparison, or Best Of page.", "Add contextual next-step links into the funnel."));
    }
    if (page.hasFaqSection && !page.faqSchemaPresent) issues.push(issue("medium", "schema", "Science article has FAQs but no FAQ schema.", "Add FAQPage JSON-LD when visible FAQs exist."));
  }
}

function scoreFromIssues(issues, category) {
  const penalty = issues
    .filter((entry) => !category || entry.category === category)
    .reduce((sum, entry) => sum + ISSUE_WEIGHTS[entry.severity], 0);
  return Math.max(0, 100 - penalty);
}

function scorePage(page) {
  const issues = [];
  addCommonIssues(page, issues);
  addTypeSpecificIssues(page, issues);
  return {
    ...page,
    issues,
    seoScore: scoreFromIssues(issues, "seo"),
    conversionScore: scoreFromIssues(issues, "conversion"),
    trustScore: scoreFromIssues(issues, "trust"),
    internalLinkingScore: scoreFromIssues(issues, "internal-linking"),
    productionReadinessScore: scoreFromIssues(issues, "production"),
  };
}

async function fetchText(url) {
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "ThermaPeakSiteAuditor/1.0" },
      redirect: "follow",
    });
    const text = await response.text();
    return {
      ok: response.ok,
      statusCode: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type") || "",
      text,
      error: "",
    };
  } catch (error) {
    return {
      ok: false,
      statusCode: 0,
      finalUrl: "",
      contentType: "",
      text: "",
      error: error.message,
    };
  }
}

async function crawl(baseUrl) {
  const robotsUrl = `${baseUrl}/robots.txt`;
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  const [robots, sitemap] = await Promise.all([fetchText(robotsUrl), fetchText(sitemapUrl)]);
  const sitemapUrls = sitemap.ok ? extractSitemapUrls(sitemap.text, baseUrl) : [];
  const sameOriginUrls = unique(sitemapUrls.map((url) => mapUrlToBaseOrigin(url, baseUrl)))
    .filter((url) => new URL(url).origin === new URL(baseUrl).origin)
    .slice(0, config.maxPages);
  const sourceUrls = sameOriginUrls.length > 0 ? sameOriginUrls : [baseUrl];
  const pages = [];

  for (const url of sourceUrls) {
    const response = await fetchText(url);
    if (!response.ok) {
      pages.push(scorePage({
        url,
        path: new URL(url).pathname,
        statusCode: response.statusCode,
        error: response.error,
        pageType: inferPageType(new URL(url).pathname),
        title: "",
        metaDescription: "",
        canonicalUrl: "",
        robotsMeta: "",
        openGraphTitle: "",
        openGraphDescription: "",
        openGraphImage: "",
        twitterCard: "",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        h1s: [],
        h2s: [],
        h3s: [],
        wordCount: 0,
        internalLinks: [],
        externalLinks: [],
        imageCount: 0,
        imagesMissingAltText: 0,
        schemaTypes: [],
        faqSchemaPresent: false,
        productSchemaPresent: false,
        articleSchemaPresent: false,
        breadcrumbSchemaPresent: false,
        scholarlyArticleSchemaPresent: false,
        itemListSchemaPresent: false,
        ctaCount: 0,
        ctaTexts: [],
        firstCtaDomPosition: null,
        affiliateOrMerchantLinkCount: 0,
        knownVendorOutboundLinks: [],
        internalLinksToRelatedContentTypes: classifyRelatedLinks([]),
        reviewCategoryLinkSlugs: [],
        legacyFindings: [],
      }));
      continue;
    }
    const parsed = parseHtmlPage(response.text, url, baseUrl);
    pages.push(scorePage({ ...parsed, statusCode: response.statusCode, error: response.error }));
  }

  return { robots, sitemap, sitemapUrls, pages };
}

function average(values) {
  const usable = values.filter((value) => Number.isFinite(value));
  if (usable.length === 0) return 0;
  return Math.round(usable.reduce((sum, value) => sum + value, 0) / usable.length);
}

function siteScores(pages) {
  return {
    seoScore: average(pages.map((page) => page.seoScore)),
    conversionScore: average(pages.map((page) => page.conversionScore)),
    trustScore: average(pages.map((page) => page.trustScore)),
    internalLinkingScore: average(pages.map((page) => page.internalLinkingScore)),
    productionReadinessScore: average(pages.map((page) => page.productionReadinessScore)),
  };
}

function summarize(baseUrl, crawlResult, auditTimestamp) {
  const pages = crawlResult.pages;
  const vendorIssues = vendorReadinessIssues().map((entry) => ({ ...entry, url: "data/vendors.json", pageType: "vendor-data" }));
  const allIssues = [
    ...pages.flatMap((page) => page.issues.map((entry) => ({ ...entry, url: page.url, pageType: page.pageType }))),
    ...vendorIssues,
  ];
  const pageTypeCounts = pages.reduce((counts, page) => {
    counts[page.pageType] = (counts[page.pageType] || 0) + 1;
    return counts;
  }, {});
  const moneyPages = pages.filter((page) => isBestOfDetail(page) || isComparisonDetail(page) || isProductReviewPage(page));
  const keyPages = pages.filter((page) => config.expectedContentTypes.includes(page.pageType));
  const legacyReferenceFindings = pages.flatMap((page) => page.legacyFindings.map((finding) => ({ url: page.url, ...finding })));
  const missingMetadataCounts = {
    title: pages.filter((page) => !page.title).length,
    metaDescription: pages.filter((page) => !page.metaDescription).length,
    canonical: pages.filter((page) => !page.canonicalUrl).length,
    h1: pages.filter((page) => page.h1s.length === 0).length,
  };
  const missingSchemaCounts = {
    faq: pages.filter((page) => page.hasFaqSection && !page.faqSchemaPresent).length,
    product: pages.filter((page) => isProductReviewPage(page) && !page.productSchemaPresent).length,
    article: pages.filter((page) => (isGuideDetail(page) || isScienceArticle(page)) && !page.articleSchemaPresent).length,
    itemList: pages.filter((page) => isBestOfDetail(page) && !page.itemListSchemaPresent).length,
  };
  const missingCtaCounts = {
    pagesWithoutCtas: pages.filter((page) => page.ctaCount === 0).length,
    moneyPagesWithoutCtas: moneyPages.filter((page) => page.ctaCount === 0).length,
    approvedVendorReviewPagesWithoutMerchantLinks: pages.filter((page) => {
      if (!isProductReviewPage(page)) return false;
      return productVendorApprovedForOutbound(productForReviewPath(page)) && page.affiliateOrMerchantLinkCount === 0;
    }).length,
  };
  const statusFailures = pages.filter((page) => page.statusCode >= 400 || page.statusCode === 0);
  const schemaFailures = pages.filter((page) =>
    (isProductReviewPage(page) && !page.productSchemaPresent) ||
    (isBestOfDetail(page) && !page.itemListSchemaPresent) ||
    (isGuideDetail(page) && !page.articleSchemaPresent) ||
    (isScienceArticle(page) && !page.articleSchemaPresent)
  );
  const keyMetadataCoverage = keyPages.length === 0 ? 0 : keyPages.filter((page) => page.title && page.metaDescription && page.canonicalUrl && page.h1s.length > 0).length / keyPages.length;
  const moneyPageCtaCoverage = moneyPages.length === 0 ? 0 : moneyPages.filter((page) => page.ctaCount > 0).length / moneyPages.length;
  const productionChecks = {
    robotsAccessible: crawlResult.robots.ok,
    sitemapAccessible: crawlResult.sitemap.ok,
    noLegacyReferences: legacyReferenceFindings.length === 0,
    noLocalhostMetadata: pages.every((page) => ![
      page.title,
      page.metaDescription,
      page.canonicalUrl,
      page.openGraphImage,
      page.openGraphTitle,
      page.openGraphDescription,
    ].join(" ").toLowerCase().includes("localhost")),
    noLegacyPoolLabUrlsInSitemap: !crawlResult.sitemapUrls.some((url) => /pool\s*lab|thepoollab/i.test(url)),
    sitemapUsesBaseOriginWhenProduction: isNonProductionAuditHost(baseUrl) ||
      crawlResult.sitemapUrls.every((url) => new URL(url).origin === new URL(baseUrl).origin),
    mostMoneyPagesHaveCtas: moneyPageCtaCoverage >= 0.8,
    mostKeyPagesHaveMetadata: keyMetadataCoverage >= 0.9,
    requiredSchemaPresent: schemaFailures.length === 0,
    noMajorSitemap404s: statusFailures.length === 0,
  };
  const blockingLaunchIssues = [
    !productionChecks.robotsAccessible && "robots.txt is not accessible.",
    !productionChecks.sitemapAccessible && "sitemap.xml is not accessible.",
    !productionChecks.sitemapUsesBaseOriginWhenProduction && "Production sitemap URLs do not use the audited production origin.",
    !productionChecks.noLegacyReferences && "Legacy Pool Lab or localhost references are present.",
    !productionChecks.noLegacyPoolLabUrlsInSitemap && "Sitemap contains legacy Pool Lab URLs.",
    !productionChecks.requiredSchemaPresent && "Required guide, review, or Best Of schema is missing.",
    !productionChecks.noMajorSitemap404s && "One or more sitemap URLs return errors.",
  ].filter(Boolean);
  const highPriorityIssues = allIssues.filter((entry) => entry.severity === "high");
  const mediumPriorityIssues = allIssues.filter((entry) => entry.severity === "medium");
  const scores = siteScores(pages);
  const productionReadinessStatus = blockingLaunchIssues.length > 0
    ? "Do not launch yet"
    : scores.productionReadinessScore >= 90 &&
      productionChecks.mostMoneyPagesHaveCtas &&
      productionChecks.mostKeyPagesHaveMetadata &&
      highPriorityIssues.length === 0
      ? "Ready"
      : "Launch after minor fixes";

  return {
    auditTimestamp,
    baseUrl,
    totalPagesCrawled: pages.length,
    sitemapUrlCount: crawlResult.sitemapUrls.length,
    scores,
    summaryScore: average(Object.values(scores)),
    productionReadinessStatus,
    productionChecks,
    blockingLaunchIssues,
    highPriorityIssues,
    mediumPriorityIssues,
    pageTypeCounts,
    missingMetadataCounts,
    missingSchemaCounts,
    missingCtaCounts,
    legacyReferenceFindings,
    vendorIssues,
    recommendedNextActions: recommendedNextActions(blockingLaunchIssues, highPriorityIssues, mediumPriorityIssues),
  };
}

function recommendedNextActions(blockingLaunchIssues, highPriorityIssues, mediumPriorityIssues) {
  const actions = [];
  if (blockingLaunchIssues.length > 0) actions.push("Resolve blocking production-readiness issues before launch.");
  if (highPriorityIssues.some((entry) => entry.category === "conversion")) actions.push("Prioritize CTA and merchant-link fixes on money pages.");
  if (highPriorityIssues.some((entry) => entry.category === "seo")) actions.push("Fill missing title, meta description, canonical, and H1 fields.");
  if (mediumPriorityIssues.some((entry) => entry.category === "internal-linking")) actions.push("Strengthen the Guides -> Comparisons -> Best Of -> Reviews funnel.");
  if (mediumPriorityIssues.some((entry) => entry.category === "schema")) actions.push("Add missing FAQ, Product, Article, or ItemList schema where page content supports it.");
  if (actions.length === 0) actions.push("Keep running this audit before deploys and after major content changes.");
  return unique(actions);
}

function bucketOutputs(pages, summary) {
  return {
    "summary.json": summary,
    "pages.json": pages,
    "seo.json": pages.map((page) => pickPage(page, ["seoScore"], ["seo"])),
    "conversion.json": pages.map((page) => pickPage(page, ["conversionScore", "ctaCount", "ctaTexts", "firstCtaDomPosition", "affiliateOrMerchantLinkCount"], ["conversion"])),
    "schema.json": pages.map((page) => pickPage(page, ["schemaTypes", "faqSchemaPresent", "productSchemaPresent", "articleSchemaPresent", "breadcrumbSchemaPresent", "scholarlyArticleSchemaPresent", "itemListSchemaPresent"], ["schema"])),
    "internal-links.json": pages.map((page) => pickPage(page, ["internalLinkingScore", "internalLinks", "externalLinks", "internalLinksToRelatedContentTypes"], ["internal-linking"])),
    "production-readiness.json": {
      status: summary.productionReadinessStatus,
      checks: summary.productionChecks,
      blockingLaunchIssues: summary.blockingLaunchIssues,
      pages: pages.map((page) => pickPage(page, ["productionReadinessScore", "statusCode", "legacyFindings", "error"], ["production"])),
    },
  };
}

function vendorStatusRows() {
  return vendorsData
    .map((vendor) => {
      const vendorProducts = productsData.filter((product) => product.vendorId === vendor.vendorId);
      const missingAffiliateUrls = vendorProducts.filter((product) => productAffiliateUrls(product).length === 0);
      return {
        vendor,
        productCount: vendorProducts.length,
        missingAffiliateUrls,
        outboundButtonsEnabled: isVendorApprovedForOutbound(vendor),
      };
    })
    .sort((a, b) => a.vendor.name.localeCompare(b.vendor.name));
}

function vendorStatusMarkdown() {
  const rows = vendorStatusRows();
  const tableRows = rows.map(({ vendor, productCount, missingAffiliateUrls, outboundButtonsEnabled }) => {
    const commission = vendor.commission?.defaultRate || "";
    const cookieWindow = vendor.commission?.cookieWindowDays ?? "";
    const notes = vendor.affiliateNotes || vendor.compliance?.notes || "";
    return `| ${vendor.name} | ${vendor.affiliateStatus} | ${vendor.affiliateNetwork || ""} | ${commission} | ${cookieWindow} | ${outboundButtonsEnabled ? "yes" : "no"} | ${productCount} | ${missingAffiliateUrls.length} | ${notes.replace(/\|/g, "\\|")} |`;
  }).join("\n");

  return `# Vendor Affiliate Status\n\n| Vendor | Status | Network | Commission | Cookie Window | Outbound Buttons Enabled? | Products | Missing Affiliate URLs | Notes |\n| --- | --- | --- | --- | --- | --- | ---: | ---: | --- |\n${tableRows}\n`;
}

function pickPage(page, extraFields, issueCategories) {
  const base = {
    url: page.url,
    path: page.path,
    pageType: page.pageType,
    statusCode: page.statusCode,
    title: page.title,
    metaDescription: page.metaDescription,
    canonicalUrl: page.canonicalUrl,
    h1s: page.h1s,
    issues: page.issues.filter((entry) => issueCategories.includes(entry.category)),
  };
  extraFields.forEach((field) => {
    base[field] = page[field];
  });
  return base;
}

function formatIssueList(issues, limit = 20) {
  if (issues.length === 0) return "- None";
  return issues.slice(0, limit).map((entry) => `- ${entry.url ? `\`${entry.url}\`: ` : ""}${entry.message || entry}`).join("\n");
}

function formatObjectCounts(counts) {
  return Object.entries(counts).map(([key, value]) => `- ${key}: \`${value}\``).join("\n");
}

function markdownSummary(summary) {
  return `# ThermaPeak Site Audit

- Audit timestamp: \`${summary.auditTimestamp}\`
- Base URL: \`${summary.baseUrl}\`
- Total pages crawled: \`${summary.totalPagesCrawled}\`
- Sitemap URLs: \`${summary.sitemapUrlCount}\`
- Production readiness: **${summary.productionReadinessStatus}**
- Summary score: \`${summary.summaryScore}\`

## Site-Level Scores

${formatObjectCounts(summary.scores)}

## Blocking Launch Issues

${formatIssueList(summary.blockingLaunchIssues)}

## High-Priority Issues

${formatIssueList(summary.highPriorityIssues)}

## Medium-Priority Issues

${formatIssueList(summary.mediumPriorityIssues)}

## Page Type Counts

${formatObjectCounts(summary.pageTypeCounts)}

## Missing Metadata Counts

${formatObjectCounts(summary.missingMetadataCounts)}

## Missing Schema Counts

${formatObjectCounts(summary.missingSchemaCounts)}

## Missing CTA Counts

${formatObjectCounts(summary.missingCtaCounts)}

## Legacy Reference Findings

${summary.legacyReferenceFindings.length === 0 ? "- None" : summary.legacyReferenceFindings.map((entry) => `- \`${entry.url}\`: ${entry.term} (${entry.count})`).join("\n")}

## Recommended Next Actions

${summary.recommendedNextActions.map((entry) => `- ${entry}`).join("\n")}
`;
}

async function writeOutputs(baseDir, outputs, summaryMarkdown, vendorMarkdown) {
  await fs.rm(baseDir, { recursive: true, force: true });
  await fs.mkdir(baseDir, { recursive: true });
  await Promise.all(Object.entries(outputs).map(([filename, data]) => {
    return fs.writeFile(path.join(baseDir, filename), `${JSON.stringify(data, null, 2)}\n`);
  }));
  await fs.writeFile(path.join(baseDir, "summary.md"), summaryMarkdown);
  await fs.writeFile(path.join(baseDir, "vendor-affiliate-status.md"), vendorMarkdown);
}

async function main() {
  if (typeof fetch !== "function") {
    throw new Error("This script requires Node.js 18+ with built-in fetch.");
  }
  const baseUrl = normalizeBase(process.argv[2] || config.baseUrl);
  const { iso, slug } = timestampParts();
  const crawlResult = await crawl(baseUrl);
  const summary = summarize(baseUrl, crawlResult, iso);
  const outputs = bucketOutputs(crawlResult.pages, summary);
  const summaryMarkdown = markdownSummary(summary);
  const vendorMarkdown = vendorStatusMarkdown();
  const latestDir = path.join(config.outputDir, "latest");
  const historyDir = path.join(config.outputDir, "history", slug);
  await writeOutputs(latestDir, outputs, summaryMarkdown, vendorMarkdown);
  await writeOutputs(historyDir, outputs, summaryMarkdown, vendorMarkdown);
  console.log(`Site audit complete: ${latestDir}/summary.md`);
  console.log(`Pages crawled: ${summary.totalPagesCrawled}`);
  console.log(`Production readiness: ${summary.productionReadinessStatus}`);
  if (summary.blockingLaunchIssues.length > 0 || summary.highPriorityIssues.length > 0) {
    console.log(`Audit completed with ${summary.blockingLaunchIssues.length} blocking issue(s) and ${summary.highPriorityIssues.length} high-priority issue(s).`);
  }
}

main().catch((error) => {
  console.error(`Site audit failed: ${error.message}`);
  process.exit(1);
});
