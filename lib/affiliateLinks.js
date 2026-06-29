export const AFFILIATE_DESTINATIONS = [
  {
    key: 'amazon',
    label: 'Check Price on Amazon',
  },
  {
    key: 'manufacturer',
    label: 'View on Official Website',
  },
  {
    key: 'bestBuy',
    label: 'View at Best Buy',
  },
  {
    key: 'walmart',
    label: 'View at Walmart',
  },
  {
    key: 'rei',
    label: 'View at REI',
  },
  {
    key: 'other',
    label: 'Check Current Price',
  },
];

const AFFILIATE_KEYS = AFFILIATE_DESTINATIONS.map((destination) => destination.key);

const cleanUrl = (value) => (typeof value === 'string' ? value.trim() : '');

export const isValidAffiliateUrl = (value) => {
  const url = cleanUrl(value);
  if (!url || url === '#') return false;
  if (/^(javascript:|mailto:|tel:)/i.test(url)) return false;
  return /^https?:\/\//i.test(url);
};

export const normalizeAffiliateLinks = (product = {}) => {
  const rawLinks = product.affiliateLinks && typeof product.affiliateLinks === 'object'
    ? product.affiliateLinks
    : {};
  return Object.fromEntries(AFFILIATE_KEYS.map((key) => [key, cleanUrl(rawLinks[key])]));
};

export const getAffiliateDestinations = (product = {}) => {
  const normalizedLinks = normalizeAffiliateLinks(product);
  const seenUrls = new Set();

  return AFFILIATE_DESTINATIONS
    .map((destination) => ({
      ...destination,
      url: normalizedLinks[destination.key],
    }))
    .filter((destination) => {
      if (!isValidAffiliateUrl(destination.url)) return false;
      const dedupeKey = destination.url.toLowerCase();
      if (seenUrls.has(dedupeKey)) return false;
      seenUrls.add(dedupeKey);
      return true;
    });
};

export const getPrimaryAffiliateUrl = (product = {}) =>
  getAffiliateDestinations(product)[0]?.url || '';
