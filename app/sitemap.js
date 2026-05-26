import bestLists from '../data/best-lists.json';
import comparisons from '../data/comparisons.json';
import guides from '../data/guides.json';
import products from '../data/products.json';
import config from '../data/config.json';
import { getReviewPath } from '../lib/routes';

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

  return [...staticRoutes, ...guideRoutes, ...bestOfRoutes, ...reviewRoutes, ...comparisonRoutes];
}
