import Link from 'next/link';
import { notFound } from 'next/navigation';
import config from '../../../data/config.json';
import AffiliateButtons from '../../../components/AffiliateButtons';
import ProductImage from '../../../components/ProductImage';
import {
  getAllProductCategories,
  getProductCategory,
  getProductsByPrimaryCategory,
  getRelatedBestListsForCategory,
  getRelatedComparisonsForCategory,
  getRelatedGuidesForCategory,
  getRelatedScienceArticlesForCategory,
} from '../../../lib/categoryRegistry';
import { getProductCategoryPath, getReviewPath, getScienceArticlePath } from '../../../lib/routes';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;

export async function generateStaticParams() {
  return getAllProductCategories().map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }) {
  const category = getProductCategory(params.categorySlug);
  if (!category) return {};

  const canonicalUrl = `${URL}${getProductCategoryPath(category.slug)}`;

  return {
    title: `${category.heroTitle || category.name} | ${config.siteName}`,
    description: category.heroSubtitle || category.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.heroTitle || category.name,
      description: category.heroSubtitle || category.description,
      url: canonicalUrl,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.heroTitle || category.name,
      description: category.heroSubtitle || category.description,
      images: [OG_IMAGE_URL],
    },
  };
}

function RelatedLinkSection({ title, items, getHref, getLabel }) {
  if (!items.length) return null;

  return (
    <section className="product-related-section">
      <h2>{title}</h2>
      <div className="product-related-grid">
        {items.slice(0, 6).map((item) => (
          <Link key={getHref(item)} href={getHref(item)} className="product-related-card">
            {getLabel(item)}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProductCategoryPage({ params }) {
  const category = getProductCategory(params.categorySlug);
  if (!category) notFound();

  const categoryProducts = getProductsByPrimaryCategory(category.slug);
  const relatedBestLists = getRelatedBestListsForCategory(category.slug);
  const relatedComparisons = getRelatedComparisonsForCategory(category.slug);
  const relatedGuides = getRelatedGuidesForCategory(category.slug);
  const relatedScienceArticles = getRelatedScienceArticlesForCategory(category.slug);

  return (
    <div className="product-category-page py-5">
      <div className="science-shell">
        <header className="product-category-hero">
          <Link href="/products" className="science-back-link">Products</Link>
          <p className="best-of-eyebrow">Product Category</p>
          <h1>{category.heroTitle || category.name}</h1>
          <p className="lead">{category.heroSubtitle || category.description}</p>
          <div className="product-count-pill">{categoryProducts.length} products currently listed</div>
        </header>

        {categoryProducts.length === 0 ? (
          <section className="product-empty-state">
            <h2>Products in this category are coming soon.</h2>
            <p>
              ThermaPeak only shows categories in navigation after products are available. This placeholder keeps the category route stable for future coverage.
            </p>
            <Link href="/products" className="btn btn-secondary-cta">View Active Product Categories</Link>
          </section>
        ) : (
          <>
            <section className="money-section">
              <div className="section-heading">
                <h2>{category.name} Products</h2>
                <p>{category.description}</p>
              </div>
              <div className="product-card-grid">
                {categoryProducts.map((product) => (
                  <article key={product.sku} className="product-category-product-card">
                    <div className="product-category-image-wrap">
                      <ProductImage
                        src={product.image || product.image_url}
                        fallbackSrc={product.image_fallback || ''}
                        alt={product.name}
                        className="product-category-image"
                      />
                    </div>
                    <div className="product-category-card-body">
                      <p className="comparison-card-label">{product.brand}</p>
                      <h2>{product.name}</h2>
                      <p>{product.reviewSummary || product.description}</p>
                      <div className="product-card-meta-row">
                        {product.bestFor && <span>Best for: {product.bestFor}</span>}
                        {product.overallScore && <span>Score: {product.overallScore}/10</span>}
                      </div>
                      <div className="product-card-actions">
                        <Link href={getReviewPath(product.sku)} className="btn btn-secondary-cta">Read Review</Link>
                        <AffiliateButtons product={product} size="sm" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="product-category-related-content">
              <div className="section-heading">
                <h2>Related Buying Paths</h2>
                <p>Move from product discovery into guides, comparisons, rankings, and research context.</p>
              </div>
              <RelatedLinkSection
                title="Best Of Guides"
                items={relatedBestLists}
                getHref={(item) => `/best-of/${item.id}`}
                getLabel={(item) => item.title}
              />
              <RelatedLinkSection
                title="Comparisons"
                items={relatedComparisons}
                getHref={(item) => `/comparisons/${item.slug}`}
                getLabel={(item) => item.title}
              />
              <RelatedLinkSection
                title="Guides"
                items={relatedGuides}
                getHref={(item) => item.link || `/guides/${item.id}`}
                getLabel={(item) => item.title}
              />
              <RelatedLinkSection
                title="Science Articles"
                items={relatedScienceArticles}
                getHref={(item) => getScienceArticlePath(item.categorySlug, item.slug)}
                getLabel={(item) => item.title}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
