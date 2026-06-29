export const getReviewSlug = (sku) =>
  String(sku)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getReviewPath = (sku) => `/reviews/${getReviewSlug(sku)}`;

export const getReviewCategoryPath = (categorySlug) => `/reviews/${categorySlug}`;

export const getScienceCategoryPath = (categorySlug) => `/science/${categorySlug}`;

export const getScienceArticlePath = (categorySlug, articleSlug) =>
  `/science/${categorySlug}/${articleSlug}`;
