import Link from 'next/link';
import { notFound } from 'next/navigation';
import comparisons from '../../../data/comparisons.json';
import config from '../../../data/config.json';
import ComparisonFAQ, { getComparisonFaqs } from '../../../components/ComparisonFAQ';
import ProductImage from '../../../components/ProductImage';

const FALLBACK_IMAGE = '/images/ThermaPeakLogo.png';

const renderComparisonButton = (href, label, variant = 'primary') => {
  if (!href) return null;

  const className = variant === 'secondary' ? 'btn btn-secondary-cta' : 'btn btn-primary-cta';
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer sponsored" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
};

export async function generateStaticParams() {
  return comparisons.map((comparison) => ({
    slug: comparison.slug,
  }));
}

export async function generateMetadata({ params }) {
  const comparison = comparisons.find((entry) => entry.slug === params.slug);
  if (!comparison) return {};

  return {
    title: `${comparison.title} | ${config.siteName}`,
    description: comparison.description,
    alternates: {
      canonical: `https://${config.domain}/comparisons/${params.slug}`,
    },
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      url: `https://${config.domain}/comparisons/${params.slug}`,
    },
  };
}

export default function ComparisonPage({ params }) {
  const comparison = comparisons.find((entry) => entry.slug === params.slug);
  if (!comparison) notFound();

  const faqs = getComparisonFaqs(comparison);
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
  const isColdPlungeComparison = comparison.slug.includes('cold-plunge') || comparison.slug.includes('ice-bath');

  return (
    <div className="container my-5 comparison-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header className="comparison-hero text-center mb-5">
        <p className="best-of-eyebrow">{comparison.eyebrow || 'Comparison'}</p>
        <h1 className="section-title">{comparison.title}</h1>
        <p className="section-subtitle">{comparison.description}</p>
      </header>

      <div className="comparison-content mx-auto">
        <section className="money-section mt-0">
          <div className="rich-copy" dangerouslySetInnerHTML={{ __html: comparison.intro }} />
        </section>

        <section className="money-section">
          <div className="section-heading">
            <h2>Shop These Options</h2>
            <p>Use the quick decision cards below if you already know the type of ownership experience you want.</p>
          </div>
          <div className="comparison-vs-grid">
            <article className="comparison-shop-card">
              {comparison.optionAImage && (
                <div className="comparison-shop-image-wrap">
                  <ProductImage
                    src={comparison.optionAImage}
                    fallbackSrc={FALLBACK_IMAGE}
                    alt={comparison.left_option.title}
                    className="comparison-shop-image"
                  />
                </div>
              )}
              <p className="comparison-side-label">Option A</p>
              <h2>{comparison.left_option.title}</h2>
              <p className="comparison-shop-summary">{comparison.left_option.summary}</p>
              {comparison.optionABullets?.length > 0 && (
                <ul className="comparison-bullet-list">
                  {comparison.optionABullets.slice(0, 3).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              <div className="cta-row mt-auto">
                {renderComparisonButton(comparison.optionAProductUrl, comparison.optionAProductLabel || 'Check Price')}
                {renderComparisonButton(comparison.optionAReviewUrl, 'Read Full Review', 'secondary')}
              </div>
            </article>
            <article className="comparison-shop-card">
              {comparison.optionBImage && (
                <div className="comparison-shop-image-wrap">
                  <ProductImage
                    src={comparison.optionBImage}
                    fallbackSrc={FALLBACK_IMAGE}
                    alt={comparison.right_option.title}
                    className="comparison-shop-image"
                  />
                </div>
              )}
              <p className="comparison-side-label">Option B</p>
              <h2>{comparison.right_option.title}</h2>
              <p className="comparison-shop-summary">{comparison.right_option.summary}</p>
              {comparison.optionBBullets?.length > 0 && (
                <ul className="comparison-bullet-list">
                  {comparison.optionBBullets.slice(0, 3).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              <div className="cta-row mt-auto">
                {renderComparisonButton(comparison.optionBProductUrl, comparison.optionBProductLabel || 'Check Price')}
                {renderComparisonButton(comparison.optionBReviewUrl, 'Read Full Review', 'secondary')}
              </div>
            </article>
          </div>
        </section>

        <section className="money-section">
          <div className="section-heading">
            <h2>Key Differences</h2>
            <p>Use the side-by-side breakdown below to identify which option better matches your budget, routine, and ownership preferences.</p>
          </div>
          <div className="comparison-detail-table">
            <div className="comparison-detail-head">
              <div>Decision Factor</div>
              <div>{comparison.left_option.title}</div>
              <div>{comparison.right_option.title}</div>
            </div>
            {comparison.comparison_points.map((point) => (
              <div key={point.label} className="comparison-detail-row">
                <div className="comparison-factor">{point.label}</div>
                <div>{point.left}</div>
                <div>{point.right}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="money-section">
          <div className="inline-cta-banner">
            <div>
              <p className="inline-cta-label">Ready to pick one?</p>
              <h3>{comparison.left_option.title} vs {comparison.right_option.title}</h3>
              <p className="comparison-helper-text mb-0">
                Choose the option that best matches your budget, convenience preferences, and long-term ownership style.
              </p>
            </div>
            <div className="cta-row banner-cta-row">
              {renderComparisonButton(comparison.optionAProductUrl, `View ${comparison.left_option.title}`)}
              {renderComparisonButton(comparison.optionBProductUrl, `View ${comparison.right_option.title}`)}
            </div>
          </div>
        </section>

        <section className="money-section">
          <div className="final-cta-panel text-start">
            <p className="inline-cta-label">{comparison.verdict_title || 'Bottom Line'}</p>
            <div className="rich-copy" dangerouslySetInnerHTML={{ __html: comparison.verdict }} />
            <div className="cta-row mt-4">
              {renderComparisonButton(comparison.optionAProductUrl, `Check Price: ${comparison.left_option.title}`)}
              {renderComparisonButton(comparison.optionBProductUrl, `Check Price: ${comparison.right_option.title}`)}
            </div>
            <p className="comparison-helper-text mt-3">Still unsure? See our ranked buyer guides below.</p>
          </div>
        </section>

        <section className="money-section">
          <div className="section-heading">
            <h2>How to Choose From Here</h2>
            <p>Choose the next step based on what you want to decide next.</p>
          </div>
          <div className="row g-4">
            {isColdPlungeComparison ? (
              <>
                <div className="col-md-6">
                  <article className="card h-100 comparison-index-card">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5">Want the best overall cold plunge options?</h3>
                      <p className="card-text flex-grow-1">Go to our ranked buyer guide to compare the strongest overall picks across price points and ownership styles.</p>
                      <Link href="/best-of/best-cold-plunge-tubs" className="btn btn-outline-primary mt-3">
                        View Best Cold Plunge Tubs
                      </Link>
                    </div>
                  </article>
                </div>
                <div className="col-md-6">
                  <article className="card h-100 comparison-index-card">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5">Want a chiller-based setup?</h3>
                      <p className="card-text flex-grow-1">Use the dedicated ranked guide for buyers prioritizing temperature consistency and lower day-to-day effort.</p>
                      <Link href="/best-of/best-cold-plunge-with-chiller" className="btn btn-outline-primary mt-3">
                        View Best Cold Plunge With Chiller
                      </Link>
                    </div>
                  </article>
                </div>
              </>
            ) : (
              (comparison.related_best_of?.length ? comparison.related_best_of : []).map((listId) => (
                <div key={listId} className="col-md-6">
                  <article className="card h-100 comparison-index-card">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h5">Continue to ranked sauna picks</h3>
                      <p className="card-text flex-grow-1">Use a ranked buyer guide after comparing the sauna formats that fit your home and heat preference.</p>
                      <Link href={`/best-of/${listId}`} className="btn btn-outline-primary mt-3">
                        View {listId.replaceAll('-', ' ')}
                      </Link>
                    </div>
                  </article>
                </div>
              ))
            )}
            {(comparison.optionAReviewUrl || comparison.optionBReviewUrl) && (
              <>
                {comparison.optionAReviewUrl && (
                  <div className="col-md-6">
                    <article className="card h-100 comparison-index-card">
                      <div className="card-body d-flex flex-column">
                        <h3 className="card-title h5">Want more detail on {comparison.left_option.title}?</h3>
                        <p className="card-text flex-grow-1">Read the full product review before you click through to pricing.</p>
                        <Link href={comparison.optionAReviewUrl} className="btn btn-outline-primary mt-3">
                          Read {comparison.left_option.title} Review
                        </Link>
                      </div>
                    </article>
                  </div>
                )}
                {comparison.optionBReviewUrl && (
                  <div className="col-md-6">
                    <article className="card h-100 comparison-index-card">
                      <div className="card-body d-flex flex-column">
                        <h3 className="card-title h5">Want more detail on {comparison.right_option.title}?</h3>
                        <p className="card-text flex-grow-1">Read the full product review before you click through to pricing.</p>
                        <Link href={comparison.optionBReviewUrl} className="btn btn-outline-primary mt-3">
                          Read {comparison.right_option.title} Review
                        </Link>
                      </div>
                    </article>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <ComparisonFAQ faqs={faqs} />

        <section className="money-section">
          <div className="inline-cta-banner">
            <div>
              <p className="inline-cta-label">Final Step</p>
              <h3>{comparison.left_option.title} or {comparison.right_option.title}</h3>
              <p className="comparison-helper-text mb-0">
                Move to pricing or review detail for the option that fits your decision best.
              </p>
            </div>
            <div className="cta-row banner-cta-row">
              {renderComparisonButton(comparison.optionAProductUrl, `See Latest Pricing: ${comparison.left_option.title}`)}
              {renderComparisonButton(comparison.optionBProductUrl, `See Latest Pricing: ${comparison.right_option.title}`)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
