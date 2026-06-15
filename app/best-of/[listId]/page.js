import Link from 'next/link';
import { notFound } from 'next/navigation';
import bestLists from '../../../data/best-lists.json';
import comparisons from '../../../data/comparisons.json';
import products from '../../../data/products.json';
import config from '../../../data/config.json';
import AffiliateButtons from '../../../components/AffiliateButtons';
import FaqSection from '../../../components/FaqSection';
import ProductImage from '../../../components/ProductImage';
import { getReviewPath } from '../../../lib/routes';

const FALLBACK_IMAGE = '/images/ThermaPeakLogo.png';
const OG_IMAGE_URL = `https://${config.domain}/images/ThermaPeakOG.png`;

const formatTitle = (str) =>
  str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getAverageScore = (product) => {
  const values = Object.values(product.score || {});
  if (!values.length) return null;

  const total = values.reduce((sum, value) => sum + value, 0);
  return Number((total / values.length).toFixed(1));
};

const clampScore = (value) => Math.max(0, Math.min(10, value));

const getBudgetFitScore = (product) => {
  const price = product.approx_price;
  if (price == null) {
    if (product.price_range === 'budget') return 8.5;
    if (product.price_range === 'mid-range') return 5.5;
    return 3.5;
  }

  if (price <= 200) return 10;
  if (price <= 500) return 9;
  if (price <= 1000) return 7;
  if (price <= 3000) return 5;
  if (price <= 8000) return 3.5;
  return 2;
};

const getChillerFitScore = (product) => {
  const type = product.cooling_type;
  if (['integrated-chiller', 'integrated_chiller', 'external-chiller', 'external_chiller', 'hybrid'].includes(type)) {
    return 10;
  }
  if (['external-chiller-compatible', 'external_chiller_compatible'].includes(type)) {
    return 8.5;
  }
  return 2.5;
};

const getFeatureScore = (product, key) => {
  const baseScore = product.score || {};
  const suitability = product.suitability || {};

  const featureMap = {
    temperature_control: baseScore.temperature_control,
    insulation: baseScore.insulation,
    durability: baseScore.durability,
    ease_of_use: baseScore.ease_of_use,
    maintenance: baseScore.maintenance,
    value: baseScore.value,
    beginner_friendly: suitability.beginner_friendly ? 10 : getBudgetFitScore(product),
    small_space_friendly: suitability.small_space_friendly ? 10 : product.footprint === 'small' ? 8 : product.footprint === 'medium' ? 5.5 : 3,
    tall_user_friendly: suitability.tall_user_friendly ? 10 : product.footprint === 'large' ? 7 : 4,
    outdoor_ready: suitability.outdoor_ready ? 10 : 3,
    portable: suitability.portable ? 10 : 2.5,
    budget_fit: getBudgetFitScore(product),
    chiller_fit: getChillerFitScore(product),
  };

  return featureMap[key];
};

const contextualScoreWeights = {
  'best-cold-plunge-tubs': {
    temperature_control: 0.24,
    insulation: 0.2,
    durability: 0.18,
    ease_of_use: 0.16,
    maintenance: 0.1,
    value: 0.12,
  },
  'best-cold-plunge-with-chiller': {
    chiller_fit: 0.15,
    temperature_control: 0.25,
    insulation: 0.2,
    maintenance: 0.12,
    durability: 0.13,
    ease_of_use: 0.08,
    value: 0.07,
  },
  'best-budget-cold-plunge': {
    budget_fit: 0.24,
    value: 0.24,
    maintenance: 0.16,
    ease_of_use: 0.14,
    portable: 0.1,
    beginner_friendly: 0.12,
  },
  'best-budget-cold-plunge-tubs-under-200': {
    budget_fit: 0.32,
    value: 0.24,
    maintenance: 0.14,
    ease_of_use: 0.12,
    portable: 0.08,
    beginner_friendly: 0.1,
  },
  'best-cold-plunge-for-tall-people': {
    tall_user_friendly: 0.34,
    durability: 0.16,
    insulation: 0.12,
    temperature_control: 0.12,
    maintenance: 0.1,
    ease_of_use: 0.08,
    value: 0.08,
  },
  'best-cold-plunge-for-small-spaces': {
    small_space_friendly: 0.3,
    portable: 0.2,
    maintenance: 0.15,
    value: 0.15,
    ease_of_use: 0.12,
    budget_fit: 0.08,
  },
  'best-cold-plunge-outdoor': {
    outdoor_ready: 0.24,
    insulation: 0.24,
    durability: 0.2,
    temperature_control: 0.14,
    maintenance: 0.08,
    value: 0.1,
  },
  'best-cold-plunge-for-beginners': {
    beginner_friendly: 0.28,
    ease_of_use: 0.24,
    maintenance: 0.16,
    value: 0.16,
    budget_fit: 0.1,
    portable: 0.06,
  },
};

const getContextualScore = (listId, product) => {
  const weights = contextualScoreWeights[listId];
  if (!weights) {
    return getAverageScore(product);
  }

  let weightedTotal = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([key, weight]) => {
    const featureScore = getFeatureScore(product, key);
    if (typeof featureScore === 'number') {
      weightedTotal += clampScore(featureScore) * weight;
      totalWeight += weight;
    }
  });

  if (!totalWeight) {
    return getAverageScore(product);
  }

  return Number((weightedTotal / totalWeight).toFixed(1));
};

const getScoreBadgeClass = (score) => {
  if (score >= 8.5) return 'score-high';
  if (score >= 7) return 'score-medium';
  return 'score-low';
};

const getPriceLabel = (product) => {
  if (product.approx_price) {
    return `$${product.approx_price.toLocaleString()}+`;
  }

  const priceMap = {
    budget: 'Under $500',
    mid_range: '$500-$3,000',
    'mid-range': '$500-$3,000',
    premium: '$3,000-$8,000',
    luxury: '$8,000+',
  };

  return priceMap[product.price_range] || formatTitle(product.price_range || 'varies');
};

const getCoolingLabel = (coolingType) => {
  const coolingMap = {
    ice: 'Ice',
    ice_only: 'Ice',
    integrated_chiller: 'Electric chiller',
    'integrated-chiller': 'Electric chiller',
    external_chiller: 'Electric chiller',
    'external-chiller': 'Electric chiller',
    external_chiller_compatible: 'Electric chiller compatible',
    'external-chiller-compatible': 'Electric chiller compatible',
    hybrid: 'Heated + chilled',
  };

  return coolingMap[coolingType] || formatTitle((coolingType || 'varies').replace(/-/g, '_'));
};

const getSizeLabel = (product) => {
  const footprintMap = {
    small: 'Small footprint',
    medium: 'Medium footprint',
    large: 'Large footprint',
  };

  const baseLabel = footprintMap[product.footprint] || 'Varies';

  if (product.suitability?.tall_user_friendly) {
    return `${baseLabel} / Tall-user friendly`;
  }

  if (product.suitability?.small_space_friendly) {
    return `${baseLabel} / Small-space friendly`;
  }

  return baseLabel;
};

const getBestForLabel = (product) => {
  if (product.badge) return product.badge;
  if (product.suitability?.beginner_friendly) return 'Best for beginners';
  if (product.suitability?.small_space_friendly) return 'Best for small spaces';
  if (product.suitability?.portable) return 'Best for portability';
  if (product.suitability?.outdoor_ready) return 'Best for outdoor setups';
  return 'Best for home recovery';
};

const scoreCriteria = [
  { title: 'Build Quality', description: 'Materials, finish quality, insulation, and long-term durability.' },
  { title: 'Cooling Performance', description: 'How reliably the tub reaches and holds target temperatures.' },
  { title: 'Ease of Setup', description: 'Installation friction, portability, and how quickly you can start using it.' },
  { title: 'Maintenance', description: 'Cleaning effort, drainage, filtration, and water-care demands.' },
  { title: 'Value for Price', description: 'Whether the ownership experience justifies the total spend.' },
];
const saunaScoreCriteria = [
  { title: 'Heat Experience', description: 'Heat format, performance, comfort, and suitability for repeat sessions.' },
  { title: 'Installation', description: 'Electrical, assembly, placement, and outdoor-readiness demands.' },
  { title: 'Build Quality', description: 'Materials, cabin comfort, durability, and finish quality.' },
  { title: 'Maintenance', description: 'Cleaning, material care, and long-term ownership effort.' },
  { title: 'Value for Price', description: 'Whether the ownership experience justifies the total spend.' },
];

export async function generateStaticParams() {
  return bestLists
    .filter((list) => list && list.id)
    .map((list) => ({
      listId: list.id,
    }));
}

export async function generateMetadata({ params }) {
  const list = bestLists.find((entry) => entry.id === params.listId);
  if (!list) return {};

  const listProducts = list.products
    .map((item) => products.find((product) => product.sku === item.sku))
    .filter(Boolean);

  return {
    title: `${list.title} | ${config.siteName}`,
    description: list.description,
    alternates: {
      canonical: `https://${config.domain}/best-of/${params.listId}`,
    },
    openGraph: {
      title: list.title,
      description: list.description,
      url: `https://${config.domain}/best-of/${params.listId}`,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: list.title,
      description: list.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default function BestOfPage({ params }) {
  const list = bestLists.find((entry) => entry.id === params.listId);
  if (!list) notFound();

  const listProducts = list.products
    .map((item, index) => {
      const productData = products.find((product) => product.sku === item.sku);
      if (!productData) return null;

      const mergedProduct = { ...productData, ...item };
      return {
        ...mergedProduct,
        originalIndex: index,
        contextualScore: getContextualScore(params.listId, mergedProduct),
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const scoreDiff = (b.contextualScore || 0) - (a.contextualScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return a.originalIndex - b.originalIndex;
    });

  const topPick = listProducts[0];
  const comparisonProducts = list.featured_skus
    ? listProducts.filter((product) => list.featured_skus.includes(product.sku))
    : listProducts;
  const faqs = list.faqs || [];
  const relatedComparisons = comparisons.filter((comparison) =>
    (comparison.related_best_of || []).includes(list.id)
  );
  const isSaunaList = list.primary_category === 'sauna';
  const categoryLabel = isSaunaList ? 'Saunas' : 'Cold Plunge Tubs';
  const evaluationFocus = isSaunaList
    ? 'heat performance, installation practicality, comfort, material quality, and realistic repeat use'
    : 'temperature consistency, insulation, ease of cleaning, and realistic repeat use';
  const topPickContext = isSaunaList
    ? 'It stands out for a practical home heat experience, ownership fit, and the likelihood that buyers can use it consistently.'
    : 'It stands out because it reduces common ownership friction around temperature control, ice use, and upkeep.';
  const displayedScoreCriteria = isSaunaList ? saunaScoreCriteria : scoreCriteria;

  const faqJsonLd = faqs.length
    ? {
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
      }
    : null;
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: list.title,
    description: list.description,
    itemListElement: listProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: `https://${config.domain}${getReviewPath(product.sku)}`,
    })),
  };

  return (
    <div className="best-of-page py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="best-of-shell">
        <header className="best-of-hero text-center">
          <p className="best-of-eyebrow">Best {categoryLabel}</p>
          <h1 className="section-title">{list.title}</h1>
          <p className="section-subtitle best-of-subtitle">{list.description}</p>
        </header>

        <section className="money-section">
          {list.intro && (
            <div
              className="best-of-intro rich-copy"
              dangerouslySetInnerHTML={{ __html: list.intro }}
            />
          )}

          {topPick && (
            <div className="top-pick-card">
              <div className="top-pick-media">
                <div className="top-pick-image-wrap">
                  <ProductImage
                    src={topPick.image_url}
                    fallbackSrc={topPick.image_fallback || FALLBACK_IMAGE}
                    alt={topPick.name}
                    className="top-pick-image"
                  />
                </div>
              </div>
              <div className="top-pick-content">
                <div className="top-pick-header">
                  <span className="top-pick-badge">Top Pick</span>
                  <div className={`score-pill ${getScoreBadgeClass(topPick.contextualScore || 0)}`}>
                    {topPick.contextualScore ? `${topPick.contextualScore}/10` : 'N/A'}
                  </div>
                </div>
                <h2>{topPick.name}</h2>
                <p className="top-pick-summary">
                  {topPick.description} {topPickContext}
                </p>
                <div className="top-pick-meta">
                  <span><strong>Best For:</strong> {getBestForLabel(topPick)}</span>
                  <span><strong>Price Range:</strong> {getPriceLabel(topPick)}</span>
                  <span><strong>Format:</strong> {getCoolingLabel(topPick.cooling_type || topPick.heating_type)}</span>
                </div>
                <div className="cta-row">
                  <AffiliateButtons product={topPick} size="md" />
                  <Link href={getReviewPath(topPick.sku)} className="btn btn-secondary-cta">
                    Read Review
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {comparisonProducts.length > 0 && (
          <section className="money-section">
            <div className="section-heading">
              <h2>{list.comparison_table_title || `${categoryLabel} Comparison`}</h2>
              {list.comparison_table_intro && <p>{list.comparison_table_intro}</p>}
            </div>

            <div className="comparison-table-desktop">
              <div className="comparison-scroll">
                <table className="table comparison-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price Range</th>
                      <th>System Type</th>
                      <th>Size / Capacity</th>
                      <th>Best For</th>
                      <th>Score</th>
                      <th>Buying Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonProducts.map((product) => (
                      <tr key={product.sku}>
                        <td>
                          <div className="comparison-product-cell">
                            <strong>{product.name}</strong>
                            <Link href={getReviewPath(product.sku)}>Read review</Link>
                          </div>
                        </td>
                        <td>{getPriceLabel(product)}</td>
                        <td>{getCoolingLabel(product.cooling_type || product.heating_type)}</td>
                        <td>{getSizeLabel(product)}</td>
                        <td>{getBestForLabel(product)}</td>
                        <td>
                          <span className={`score-pill ${getScoreBadgeClass(product.contextualScore || 0)}`}>
                            {product.contextualScore ? `${product.contextualScore}/10` : 'N/A'}
                          </span>
                        </td>
                        <td>
                          <AffiliateButtons product={product} size="sm" className="comparison-affiliate-buttons" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="comparison-table-mobile">
              {comparisonProducts.map((product) => (
                <article key={product.sku} className="comparison-mobile-card">
                  <div className="comparison-mobile-header">
                    <h3>{product.name}</h3>
                    <span className={`score-pill ${getScoreBadgeClass(product.contextualScore || 0)}`}>
                      {product.contextualScore ? `${product.contextualScore}/10` : 'N/A'}
                    </span>
                  </div>
                  <dl className="comparison-mobile-grid">
                    <div>
                      <dt>Price Range</dt>
                      <dd>{getPriceLabel(product)}</dd>
                    </div>
                    <div>
                      <dt>System Type</dt>
                      <dd>{getCoolingLabel(product.cooling_type || product.heating_type)}</dd>
                    </div>
                    <div>
                      <dt>Size / Capacity</dt>
                      <dd>{getSizeLabel(product)}</dd>
                    </div>
                    <div>
                      <dt>Best For</dt>
                      <dd>{getBestForLabel(product)}</dd>
                    </div>
                  </dl>
                  <div className="cta-row mobile-cta-row">
                    <AffiliateButtons product={product} size="md" />
                    <Link href={getReviewPath(product.sku)} className="btn btn-secondary-cta">
                      Read Review
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {relatedComparisons.length > 0 && (
          <section className="money-section">
            <div className="section-heading">
              <h2>Compare Options</h2>
              <p>Still deciding between two directions? These direct comparisons can help you narrow the field before you choose a ranked product list.</p>
            </div>
            <div className="row g-4">
              {relatedComparisons.map((comparison) => (
                <div key={comparison.slug} className="col-md-6">
                  <article className="card h-100 comparison-index-card">
                    <div className="card-body d-flex flex-column">
                      <p className="comparison-card-label">{comparison.eyebrow || 'Comparison'}</p>
                      <h3 className="card-title h5">{comparison.title}</h3>
                      <p className="card-text flex-grow-1">{comparison.description}</p>
                      <Link href={`/comparisons/${comparison.slug}`} className="btn btn-outline-primary mt-3">
                        View Comparison
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="money-section">
          <div className="section-heading">
            <h2>Best {categoryLabel} Ranked</h2>
            <p>
              Start with the option that fits your budget and ownership style, then use the review links to confirm
              the tradeoffs before you click through.
            </p>
          </div>

          <div className="product-card-stack">
            {listProducts.map((product, index) => (
              <div key={product.sku}>
                <article className="money-product-card" id={`review-${product.sku}`}>
                  <div className="money-product-media">
                    <div className="money-product-image-wrap">
                      <ProductImage
                        src={product.image_url}
                        fallbackSrc={product.image_fallback || FALLBACK_IMAGE}
                        alt={product.name}
                        className="money-product-image"
                      />
                    </div>
                  </div>
                  <div className="money-product-body">
                    <div className="money-product-topline">
                      <span className="product-rank">#{index + 1}</span>
                      <span className="best-for-chip">{getBestForLabel(product)}</span>
                      <span className={`score-pill ${getScoreBadgeClass(product.contextualScore || 0)}`}>
                        {product.contextualScore ? `${product.contextualScore}/10` : 'N/A'}
                      </span>
                    </div>
                    <h3>{product.name}</h3>
                    <p className="product-summary">{product.description}</p>
                    <div className="money-product-meta">
                      <span><strong>Price:</strong> {getPriceLabel(product)}</span>
                      <span><strong>Cooling:</strong> {getCoolingLabel(product.cooling_type)}</span>
                      <span><strong>Size:</strong> {getSizeLabel(product)}</span>
                    </div>
                    <div className="product-copy rich-copy" dangerouslySetInnerHTML={{ __html: product.reason }} />
                    <div className="pros-cons-grid">
                      <div className="pros-card">
                        <h4>Pros</h4>
                        <ul>
                          {(product.pros || []).slice(0, 5).map((pro) => (
                            <li key={pro}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="cons-card">
                        <h4>Cons</h4>
                        <ul>
                          {(product.cons || []).slice(0, 3).map((con) => (
                            <li key={con}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="cta-row">
                      <AffiliateButtons product={product} size="md" />
                      <Link href={getReviewPath(product.sku)} className="btn btn-secondary-cta">
                        Read Review
                      </Link>
                    </div>
                  </div>
                </article>

                {index === 1 && topPick && (
                  <div className="inline-cta-banner">
                    <div>
                      <p className="inline-cta-label">Need the quick answer?</p>
                      <h3>Most buyers should start with {topPick.name}</h3>
                      <p>
                        It gives buyers the best mix of performance, convenience, and lower day-to-day friction.
                        If you want one recommendation to start with, this is the one.
                      </p>
                    </div>
                    <div className="cta-row banner-cta-row">
                      <AffiliateButtons product={topPick} size="md" />
                      <Link href={getReviewPath(topPick.sku)} className="btn btn-secondary-cta">
                        Read Review
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="money-section info-grid-section">
          <div className="info-card">
            <div className="section-heading">
              <h2>How We Score {categoryLabel}</h2>
              <p>Scores are meant to help you compare buyers' tradeoffs quickly, not hide them behind marketing language.</p>
            </div>
            <div className="score-grid">
              {displayedScoreCriteria.map((criterion) => (
                <div key={criterion.title} className="score-grid-card">
                  <h3>{criterion.title}</h3>
                  <p>{criterion.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="section-heading">
              <h2>How We Evaluate {categoryLabel}</h2>
            </div>
            <div className="rich-copy">
              <p>
                We evaluate {categoryLabel.toLowerCase()} by comparing specifications, design tradeoffs, maintenance demands,
                user-fit considerations, and overall category value.
              </p>
              <p>
                For this page, the heaviest weighting goes to {evaluationFocus}.
              </p>
              <p>
                We do not claim hands-on testing when it has not occurred. Rankings are based on available product
                information, comparative analysis, and the ownership factors most likely to affect buying satisfaction.
              </p>
              {list.ranking_methodology && (
                <div dangerouslySetInnerHTML={{ __html: list.ranking_methodology }} />
              )}
            </div>
          </div>
        </section>

        <section className="money-section">
          <div className="info-card">
            <div className="section-heading">
              <h2>Buying Advice</h2>
            </div>
            <div className="rich-copy">
              {list.buying_advice && <div dangerouslySetInnerHTML={{ __html: list.buying_advice }} />}
              {isSaunaList ? (
                <p>
                  Before choosing a review, use our{' '}
                  <Link href="/guides/how-to-choose-a-home-sauna">home sauna buying guide</Link>{' '}
                  and{' '}
                  <Link href="/comparisons/infrared-vs-traditional-sauna">infrared vs traditional sauna comparison</Link>.
                </p>
              ) : (
                <>
                  <p>
                    If budget is the main constraint, start with our{' '}
                    <Link href="/best-of/best-budget-cold-plunge">Best Budget Cold Plunge</Link>{' '}
                    picks before paying premium-system prices.
                  </p>
                  <p>
                    Buyers deciding between manual ice use and powered systems should compare{' '}
                    <Link href="/comparisons/cold-plunge-vs-ice-bath">Cold Plunge vs Ice Bath</Link>{' '}
                    before spending chiller-system money.
                  </p>
                  <p>
                    For upkeep basics, review the{' '}
                    <Link href="/guides/cold-plunge-maintenance-guide">cold plunge maintenance guide</Link>{' '}
                    before choosing your final shortlist.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {topPick && (
          <section className="money-section">
            <div className="final-cta-panel">
              <p className="inline-cta-label">Best Overall Recommendation</p>
              <h2>{topPick.name}</h2>
              <p>
                If you want the shortest path to a confident purchase decision, start here and use the review to
                confirm fit, footprint, and maintenance expectations.
              </p>
              <div className="cta-row center-cta-row">
                <AffiliateButtons product={topPick} size="md" />
                <Link href={getReviewPath(topPick.sku)} className="btn btn-secondary-cta">
                  Read Review
                </Link>
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="money-section">
            <FaqSection questions={faqs} />
          </section>
        )}
      </div>
    </div>
  );
}
