import Link from 'next/link';
import config from '../../data/config.json';
import { getActiveProductCategories } from '../../lib/categoryRegistry';
import { getProductCategoryPath } from '../../lib/routes';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;

export const metadata = {
  title: `Recovery Product Categories | ${config.siteName}`,
  description: 'Browse ThermaPeak recovery product categories by cold exposure, sauna and heat therapy, and future recovery equipment coverage.',
  alternates: {
    canonical: `${URL}/products`,
  },
  openGraph: {
    title: 'Recovery Product Categories',
    description: 'Browse ThermaPeak recovery product categories by cold exposure, sauna and heat therapy, and future recovery equipment coverage.',
    url: `${URL}/products`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recovery Product Categories',
    description: 'Browse ThermaPeak recovery product categories by cold exposure, sauna and heat therapy, and future recovery equipment coverage.',
    images: [OG_IMAGE_URL],
  },
};

export default function ProductsIndexPage() {
  const activeCategories = getActiveProductCategories();

  return (
    <div className="product-category-page py-5">
      <div className="science-shell">
        <header className="science-hero text-center">
          <p className="best-of-eyebrow">Products</p>
          <h1 className="section-title">Recovery Product Categories</h1>
          <p className="section-subtitle science-subtitle">
            Browse the product categories ThermaPeak currently covers, with reviews, buying guides, comparisons, and research context for each path.
          </p>
        </header>

        <section className="money-section">
          <div className="section-heading">
            <h2>Active Product Categories</h2>
            <p>Only categories with current products are shown here. New categories appear automatically when products are added.</p>
          </div>
          <div className="product-category-grid">
            {activeCategories.map((category) => (
              <article key={category.slug} className="product-category-card">
                <div>
                  <p className="comparison-card-label">{category.productCount} products</p>
                  <h2>{category.heroTitle || category.name}</h2>
                  <p>{category.description}</p>
                </div>
                <Link href={getProductCategoryPath(category.slug)} className="btn btn-primary-cta">
                  Explore Products
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
