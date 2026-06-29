import vendors from '../data/vendors.json';
import { getAffiliateDestinations, isValidAffiliateUrl } from './affiliateLinks';
import { getReviewPath } from './routes';

const RETAILER_AFFILIATE_KEYS = new Set(['amazon', 'bestBuy', 'walmart', 'rei']);

const CATEGORY_RANKING_PATHS = {
  'cold-exposure': '/best-of/best-cold-plunge-tubs',
  'sauna-heat-therapy': '/best-of/best-home-saunas',
  'red-light-therapy': '/science/red-light-therapy',
  'sleep-recovery': '/science/sleep-recovery',
  'performance-longevity': '/science/performance-longevity',
};

const CATEGORY_COMPARISON_PATHS = {
  'cold-exposure': '/comparisons/cold-plunge-vs-ice-bath',
  'sauna-heat-therapy': '/comparisons/infrared-vs-traditional-sauna',
  'red-light-therapy': '/science/red-light-therapy',
  'sleep-recovery': '/guides',
  'performance-longevity': '/science/performance-longevity',
};

export const getVendorById = (vendorId) =>
  vendors.find((vendor) => vendor.vendorId === vendorId) || null;

export const getVendorForProduct = (product = {}) =>
  product.vendorId ? getVendorById(product.vendorId) : null;

export const isVendorAffiliateApproved = (vendor) =>
  vendor?.affiliateStatus === 'approved';

const buyHereLabelForDestination = (destination) => {
  const labels = {
    amazon: 'Buy Here on Amazon',
    bestBuy: 'Buy Here at Best Buy',
    walmart: 'Buy Here at Walmart',
    rei: 'Buy Here at REI',
    manufacturer: 'Buy Here',
  };

  return labels[destination?.key] || 'Buy Here';
};

const getRetailerAffiliateDestinations = (product = {}) =>
  getAffiliateDestinations(product).filter((destination) =>
    RETAILER_AFFILIATE_KEYS.has(destination.key) &&
    isValidAffiliateUrl(destination.url)
  );

const getVendorApprovedDestinations = (product = {}, vendor = getVendorForProduct(product)) => {
  if (!vendor) return [];
  if (!isVendorAffiliateApproved(vendor)) return [];
  if (vendor.tracking?.usesAffiliateLinks !== true) return [];
  if (vendor.displayRules?.showOutboundButtons !== true) return [];

  return getAffiliateDestinations(product).filter((destination) =>
    isValidAffiliateUrl(destination.url)
  );
};

export const getPrimaryProductCta = (product = {}, vendor = getVendorForProduct(product)) => {
  if (!canShowOutboundVendorButton(product, vendor)) return null;

  const destinations = getApprovedAffiliateDestinations(product, vendor);
  const primaryDestination = destinations[0];
  const vendorDefaultUrl = vendor?.tracking?.defaultAffiliateUrl;
  const url = primaryDestination?.url || vendorDefaultUrl;

  if (!isValidAffiliateUrl(url)) return null;

  return {
    key: primaryDestination?.key || 'vendor-default',
    label: primaryDestination?.label || vendor?.displayRules?.preferredCtaLabel || 'Buy Here',
    url,
  };
};

export const canShowOutboundVendorButton = (product = {}, vendor = getVendorForProduct(product)) => {
  const hasRetailerAffiliateUrl = getRetailerAffiliateDestinations(product).length > 0;
  if (hasRetailerAffiliateUrl) return true;

  const destinations = getVendorApprovedDestinations(product, vendor);
  const hasProductAffiliateUrl = destinations.length > 0;
  const hasVendorDefaultUrl = isValidAffiliateUrl(vendor?.tracking?.defaultAffiliateUrl);

  return hasProductAffiliateUrl || hasVendorDefaultUrl;
};

export const getApprovedAffiliateDestinations = (product = {}, vendor = getVendorForProduct(product)) => {
  const retailerDestinations = getRetailerAffiliateDestinations(product);
  const vendorDestinations = getVendorApprovedDestinations(product, vendor)
    .filter((destination) => !RETAILER_AFFILIATE_KEYS.has(destination.key));
  const destinations = [...retailerDestinations, ...vendorDestinations];

  if (destinations.length > 0) {
    return destinations.map((destination) => ({
      ...destination,
      label: buyHereLabelForDestination(destination),
    }));
  }

  const defaultAffiliateUrl = vendor?.tracking?.defaultAffiliateUrl;
  return canShowOutboundVendorButton(product, vendor) && isValidAffiliateUrl(defaultAffiliateUrl)
    ? [{ key: 'vendor-default', label: vendor?.displayRules?.preferredCtaLabel || 'Buy Here', url: defaultAffiliateUrl }]
    : [];
};

export const getVendorDisclosureText = (vendor) => {
  if (!vendor?.displayRules?.showAffiliateDisclosure) return '';
  return `${vendor.name} has an approved affiliate relationship with ThermaPeak. We may earn a commission from qualifying purchases.`;
};

export const getInternalFallbackCtas = (product = {}, { includeReview = false } = {}) => {
  const category = product.primaryCategory || '';
  const ctas = [];

  if (includeReview && product.sku) {
    ctas.push({ key: 'review', label: 'Read Review', href: getReviewPath(product.sku) });
  }

  if (CATEGORY_RANKING_PATHS[category]) {
    ctas.push({ key: 'rankings', label: 'See Rankings', href: CATEGORY_RANKING_PATHS[category] });
  }

  if (CATEGORY_COMPARISON_PATHS[category]) {
    ctas.push({ key: 'compare', label: 'Compare Alternatives', href: CATEGORY_COMPARISON_PATHS[category] });
  }

  return ctas;
};
