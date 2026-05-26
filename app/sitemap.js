import articles from '../data/articles.json';
import bestLists from '../data/best-lists.json';
import products from '../data/products.json';
import config from '../data/config.json';

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
      url: `${URL}/reviews`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/best-of`,
      lastModified: new Date(),
    },
  ];

  const articleRoutes = articles.map((article) => ({
    url: `${URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  const bestOfRoutes = bestLists.map((list) => ({
    url: `${URL}/best-of/${list.id}`,
    lastModified: new Date(),
  }));

  const reviewRoutes = products.map((product) => ({
    url: `${URL}/reviews/${product.sku}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...bestOfRoutes, ...reviewRoutes];
}
