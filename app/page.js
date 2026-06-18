import Link from 'next/link';
import config from '../data/config.json';
import products from '../data/products.json';
import AffiliateButtons from '../components/AffiliateButtons';
import ProductImage from '../components/ProductImage';
import { getReviewCategoryPath, getReviewPath } from '../lib/routes';
import { getActiveReviewCategories } from '../lib/categoryRegistry';

const siteTitle = `${config.siteName} - ${config.tagline}`;
const siteDescription = config.tagline;
const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  alternates: {
    canonical: `https://${config.domain}/`,
  },
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: `https://${config.domain}/`,
    siteName: config.siteName,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

// Helper function to replace placeholders
const replacePlaceholders = (text) => {
  if (!text) return '';
  return text
    .replace(/{topicPlural}/g, config.topicPlural)
    .replace(/{topicSingular}/g, config.topicSingular);
};

// --- Trust Signal Icons ---
const CheckmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
  </svg>
);
const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);

// Function to shuffle an array and get the first n items
const getShuffledItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Home() {
  // Get 3 random products to feature
  const featuredProducts = getShuffledItems(products, 3);
  const activeReviewCategories = getActiveReviewCategories();

  return (
    <>
      {/* --- Hero Section --- */}
      <header className="hero-section">
        <div className="container">
          <h1 className="hero-title">{replacePlaceholders(config.heroTitle)}</h1>
          <p className="hero-subtitle">{replacePlaceholders(config.heroSubtitle)}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center cta-buttons">
            <Link href="/best-of" className="btn btn-primary-cta btn-lg">Browse Top Picks</Link>
            <Link href="/reviews" className="btn btn-secondary-cta btn-lg">View All Reviews</Link>
          </div>
        </div>
      </header>

      {/* --- Trust Signals --- */}
      <section className="trust-strip">
        <div className="container">
          <div className="row">
            <div className="col-md-3 trust-item">
              <CheckmarkIcon />
              <span>Independent Reviews</span>
            </div>
            <div className="col-md-3 trust-item">
              <CalendarIcon />
              <span>Updated for 2026</span>
            </div>
            <div className="col-md-3 trust-item">
              <ChartIcon />
              <span>Data-Driven Rankings</span>
            </div>
            <div className="col-md-3 trust-item">
              <ShieldIcon />
              <span>Affiliate Transparency</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Featured Category Paths --- */}
      <section className="featured-section pt-0">
        <div className="container">
          <div className="section-heading text-center">
            <p className="inline-cta-label">Start With the Right Buying Path</p>
            <h2>Featured Recovery Categories</h2>
            <p>Choose the product category that matches the recovery setup you are actively comparing.</p>
          </div>
          <div className="featured-category-grid">
            {activeReviewCategories.map((category, index) => (
              <article
                key={category.slug}
                className={`featured-category-card ${index === 0 ? 'featured-category-card-primary' : ''}`}
              >
                <p className="comparison-card-label">{category.productCount} Products</p>
                <h2>{category.heroTitle || category.name}</h2>
                <p>{category.description}</p>
                <Link href={getReviewCategoryPath(category.slug)} className="btn btn-primary-cta">
                  Explore Reviews
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Products --- */}
      <section className="featured-section">
        <div className="container">
          <h2 className="text-center section-title">Top Rated Products</h2>
          <div className="row">
            {featuredProducts.map(product => (
              <div key={product.sku} className="col-lg-4 mb-4 d-flex">
                <div className="featured-card h-100 w-100 d-flex flex-column">
                  <div className="featured-card-img-container">
                    <ProductImage 
                      src={product.image} 
                      fallbackSrc={product.category === 'cold-plunge' ? product.image_fallback : ''}
                      alt={product.name}
                      className="featured-card-img"
                    />
                  </div>
                  <div className="card-body d-flex flex-column flex-grow-1">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted flex-grow-1">{product.description}</p>
                    <ul className="list-unstyled text-muted small mt-auto">
                      <li><strong>Price Range:</strong> ${product.approx_price}</li>
                      <li><strong>Key Feature:</strong> High Performance</li>
                    </ul>
                    <div className="featured-product-actions mt-3">
                      <Link href={getReviewPath(product.sku)} className="btn btn-outline-primary">View Review</Link>
                      <AffiliateButtons product={product} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
