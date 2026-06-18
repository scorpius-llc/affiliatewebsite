import bestLists from '../data/best-lists.json';
import comparisons from '../data/comparisons.json';
import guides from '../data/guides.json';
import scienceArticles from '../data/scienceArticles.json';
import products from '../data/products.json';
import config from '../data/config.json';
import { getReviewCategoryPath, getReviewPath, getScienceArticlePath, getScienceCategoryPath } from '../lib/routes';
import { getActiveReviewCategories, getAllProductCategories } from '../lib/categoryRegistry';

const URL = `https://${config.domain}`;

export default function sitemap() {
  const staticRoutes = [
    {
      url: URL,
      lastModified: new Date(),
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/guides`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/best-of`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/reviews`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/comparisons`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/science`,
      lastModified: new Date(),
    },
  ];

  const guideRoutes = guides.map((guide) => ({
    url: `${URL}/guides/${guide.id}`,
    lastModified: new Date(),
  }));

  const bestOfRoutes = bestLists.map((list) => ({
    url: `${URL}/best-of/${list.id}`,
    lastModified: new Date(),
  }));

  const reviewRoutes = products.map((product) => ({
    url: `${URL}${getReviewPath(product.sku)}`,
    lastModified: new Date(),
  }));

  const comparisonRoutes = comparisons.map((comparison) => ({
    url: `${URL}/comparisons/${comparison.slug}`,
    lastModified: new Date(),
  }));

  const reviewCategoryRoutes = getActiveReviewCategories().map((category) => ({
    url: `${URL}${getReviewCategoryPath(category.slug)}`,
    lastModified: new Date(),
  }));

  const scienceCategoryRoutes = getAllProductCategories().map((category) => ({
    url: `${URL}${getScienceCategoryPath(category.slug)}`,
    lastModified: new Date(),
  }));

  const scienceArticleRoutes = scienceArticles
    .filter((article) => article.status === 'published')
    .map((article) => ({
      url: `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`,
      lastModified: new Date(article.lastUpdated || Date.now()),
    }));

  return [
    ...staticRoutes,
    ...guideRoutes,
    ...bestOfRoutes,
    ...reviewRoutes,
    ...comparisonRoutes,
    ...reviewCategoryRoutes,
    ...scienceCategoryRoutes,
    ...scienceArticleRoutes,
  ];
}
