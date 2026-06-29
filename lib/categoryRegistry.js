import categories from '../data/productCategories.json';
import products from '../data/products.json';
import bestLists from '../data/best-lists.json';
import comparisons from '../data/comparisons.json';
import guides from '../data/guides.json';
import scienceArticles from '../data/science-articles.json';

const LEGACY_CATEGORY_MAP = {
  'cold-plunge': 'cold-exposure',
  'ice-bath': 'cold-exposure',
  'infrared-sauna': 'sauna-heat-therapy',
  'traditional-sauna': 'sauna-heat-therapy',
  'sauna-blanket': 'sauna-heat-therapy',
  'hybrid-sauna': 'sauna-heat-therapy',
};

const CATEGORY_KEYWORDS = {
  'cold-exposure': ['cold', 'plunge', 'ice bath', 'ice barrel', 'chiller', 'cryotherapy'],
  'sauna-heat-therapy': ['sauna', 'infrared', 'heat therapy', 'steam room', 'barrel sauna'],
  'red-light-therapy': ['red light', 'near-infrared', 'photobiomodulation'],
  'sleep-recovery': ['sleep', 'hrv', 'readiness'],
  'performance-longevity': ['performance', 'longevity', 'hormesis', 'contrast therapy'],
};

export const getAllProductCategories = () => categories;

export const getReviewCategoryPath = (categorySlug) => `/reviews/${categorySlug}`;

export const getProductCategory = (categorySlug) =>
  categories.find((category) => category.slug === categorySlug) || null;

export const normalizePrimaryCategory = (value) => {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  return categories.some((category) => category.slug === normalized)
    ? normalized
    : LEGACY_CATEGORY_MAP[normalized] || null;
};

export const getProductPrimaryCategory = (product) =>
  normalizePrimaryCategory(product.primaryCategory) || normalizePrimaryCategory(product.category);

export const getProductCategoryCounts = () => {
  const counts = Object.fromEntries(categories.map((category) => [category.slug, 0]));

  products.forEach((product) => {
    const categorySlug = getProductPrimaryCategory(product);
    if (categorySlug && Object.prototype.hasOwnProperty.call(counts, categorySlug)) {
      counts[categorySlug] += 1;
    }
  });

  return counts;
};

export const getActiveProductCategories = () => {
  const counts = getProductCategoryCounts();
  return categories
    .map((category) => ({ ...category, productCount: counts[category.slug] || 0 }))
    .filter((category) => category.productCount > 0);
};

export const getReviewCategoryCounts = getProductCategoryCounts;

export const getActiveReviewCategories = getActiveProductCategories;

export const getProductsByPrimaryCategory = (categorySlug) =>
  products.filter((product) => getProductPrimaryCategory(product) === categorySlug);

export const textMatchesCategory = (text, categorySlug) => {
  const haystack = String(text || '').toLowerCase();
  return (CATEGORY_KEYWORDS[categorySlug] || []).some((keyword) => haystack.includes(keyword));
};

const combinedText = (entry) => JSON.stringify(entry).toLowerCase();

export const getRelatedBestListsForCategory = (categorySlug) =>
  bestLists.filter((list) =>
    normalizePrimaryCategory(list.primaryCategory) === categorySlug ||
    normalizePrimaryCategory(list.primary_category) === categorySlug ||
    textMatchesCategory(`${list.id} ${list.title} ${list.description}`, categorySlug) ||
    combinedText(list.products || []).includes(categorySlug)
  );

export const getRelatedComparisonsForCategory = (categorySlug) =>
  comparisons.filter((comparison) =>
    normalizePrimaryCategory(comparison.primaryCategory) === categorySlug ||
    textMatchesCategory(`${comparison.slug} ${comparison.title} ${comparison.description} ${combinedText(comparison)}`, categorySlug)
  );

export const getRelatedGuidesForCategory = (categorySlug) =>
  guides.filter((guide) =>
    normalizePrimaryCategory(guide.primaryCategory) === categorySlug ||
    textMatchesCategory(`${guide.id} ${guide.title} ${guide.description} ${guide.lead} ${guide.content}`, categorySlug)
  );

export const getRelatedScienceArticlesForCategory = (categorySlug) =>
  scienceArticles
    .filter((article) => article.status === 'published')
    .filter((article) => {
      const relatedScienceCategories = {
        'cold-exposure': ['cold-water-immersion', 'contrast-therapy', 'metabolism', 'mental-health'],
        'sauna-heat-therapy': ['saunas', 'contrast-therapy', 'cardiovascular-health', 'longevity'],
        'red-light-therapy': ['red-light-therapy', 'inflammation'],
        'sleep-recovery': ['sleep-recovery', 'mental-health'],
        'performance-longevity': ['athletic-performance', 'longevity', 'contrast-therapy'],
      };

      return (relatedScienceCategories[categorySlug] || []).includes(article.category);
    })
    .map((article) => ({
      ...article,
      categorySlug: article.category,
      categoryName: article.category,
      lastUpdated: article.last_updated,
      readingTime: article.reading_time,
    }));
