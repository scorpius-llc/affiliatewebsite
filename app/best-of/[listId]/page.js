import Link from 'next/link';
import { notFound } from 'next/navigation';
import bestLists from '../../../data/best-lists.json';
import products from '../../../data/products.json';
import config from '../../../data/config.json';
import FaqSection from '../../../components/FaqSection';
import ProductImage from '../../../components/ProductImage';

const FALLBACK_IMAGE = '/images/ThermaPeakLogo.png';

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

const getPrimaryCta = (product) => {
  if (product.asin) {
    return {
      href: `https://www.amazon.com/dp/${product.asin}?tag=${config.amazonAffiliateTag}`,
      label: 'Check Price',
      external: true,
    };
  }

  if (product.image_url && product.image_url.startsWith('http')) {
    return {
      href: product.image_url,
      label: 'Check Price',
      external: true,
    };
  }

  return {
    href: `/reviews/${product.sku}`,
    label: 'Check Price',
    external: false,
  };
};

const renderCta = (product, className = 'btn btn-primary-cta') => {
  const cta = getPrimaryCta(product);

  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={className}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
};

const getFaqsForList = (listId) => {
  if (listId !== 'best-cold-plunge-tubs') {
    return [];
  }

  return [
    {
      question: 'Are cold plunge tubs worth it?',
      answer:
        'Cold plunge tubs are worth it for people who plan to use them consistently. The higher-end systems reduce setup friction, hold temperature better, and make long-term ownership much easier than constantly buying ice.',
    },
    {
      question: 'What temperature should a cold plunge be?',
      answer:
        'Most home users target roughly 50 to 59 degrees Fahrenheit when starting out, then move colder as tolerance improves. The right temperature is the coldest range you can use consistently with safe, controlled sessions.',
    },
    {
      question: 'Do you need a chiller for a cold plunge tub?',
      answer:
        'You do not need a chiller to start, but a chiller matters if you want repeatable temperatures with less effort. Ice-based tubs are cheaper upfront, while electric chillers are the better fit for frequent use.',
    },
    {
      question: 'How much do cold plunge tubs cost?',
      answer:
        'Portable ice tubs can start under a few hundred dollars, while premium integrated systems can run several thousand dollars or more. The main pricing jump comes from insulation, integrated chilling, filtration, and overall build quality.',
    },
    {
      question: 'How often should you use a cold plunge?',
      answer:
        'Many users start with two to four sessions per week and adjust based on recovery goals and tolerance. Consistency matters more than extreme session length or very low temperatures.',
    },
    {
      question: 'What is the difference between a cold plunge and an ice bath?',
      answer:
        'In practice, the terms overlap, but buyers usually use ice bath for manual ice-filled tubs and cold plunge for more purpose-built systems. The key ownership difference is whether you rely on bagged ice or a powered chilling setup.',
    },
  ];
};

const scoreCriteria = [
  { title: 'Build Quality', description: 'Materials, finish quality, insulation, and long-term durability.' },
  { title: 'Cooling Performance', description: 'How reliably the tub reaches and holds target temperatures.' },
  { title: 'Ease of Setup', description: 'Installation friction, portability, and how quickly you can start using it.' },
  { title: 'Maintenance', description: 'Cleaning effort, drainage, filtration, and water-care demands.' },
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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: list.title,
    description: list.description,
    itemListElement: listProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://${config.domain}/reviews/${product.sku}`,
      name: product.name,
    })),
  };

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
    },
    twitter: {
      title: list.title,
      description: list.description,
    },
    other: {
      'script[type="application/ld+json"]': JSON.stringify(itemListSchema),
    },
  };
}

export default function BestOfPage({ params }) {
  const list = bestLists.find((entry) => entry.id === params.listId);
  if (!list) notFound();

  const listProducts = list.products
    .map((item) => {
      const productData = products.find((product) => product.sku === item.sku);
      if (!productData) return null;

      const mergedProduct = { ...productData, ...item };
      return {
        ...mergedProduct,
        overallScore: getAverageScore(mergedProduct),
      };
    })
    .filter(Boolean);

  const topPick = listProducts[0];
  const comparisonProducts = list.featured_skus
    ? list.featured_skus.map((sku) => listProducts.find((product) => product.sku === sku)).filter(Boolean)
    : listProducts;
  const faqs = getFaqsForList(params.listId);

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

  return (
    <div className="best-of-page py-5">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="best-of-shell">
        <header className="best-of-hero text-center">
          <p className="best-of-eyebrow">Best Cold Plunge Tubs</p>
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
                  <div className={`score-pill ${getScoreBadgeClass(topPick.overallScore || 0)}`}>
                    {topPick.overallScore ? `${topPick.overallScore}/10` : 'N/A'}
                  </div>
                </div>
                <h2>{topPick.name}</h2>
                <p className="top-pick-summary">
                  {topPick.description} It stands out because it reduces the biggest ownership pain points:
                  inconsistent water temperature, repeated ice buying, and higher-effort upkeep. For most buyers
                  who want a serious at-home setup, this is the fastest path to a reliable long-term plunge routine.
                </p>
                <div className="top-pick-meta">
                  <span><strong>Best For:</strong> {getBestForLabel(topPick)}</span>
                  <span><strong>Price Range:</strong> {getPriceLabel(topPick)}</span>
                  <span><strong>Cooling:</strong> {getCoolingLabel(topPick.cooling_type)}</span>
                </div>
                <div className="cta-row">
                  {renderCta(topPick)}
                  <Link href={`/reviews/${topPick.sku}`} className="btn btn-secondary-cta">
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
              <h2>{list.comparison_table_title || 'Cold Plunge Comparison'}</h2>
              {list.comparison_table_intro && <p>{list.comparison_table_intro}</p>}
            </div>

            <div className="comparison-table-desktop">
              <div className="comparison-scroll">
                <table className="table comparison-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price Range</th>
                      <th>Cooling Type</th>
                      <th>Size / Capacity</th>
                      <th>Best For</th>
                      <th>Score</th>
                      <th>CTA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonProducts.map((product) => (
                      <tr key={product.sku}>
                        <td>
                          <div className="comparison-product-cell">
                            <strong>{product.name}</strong>
                            <Link href={`/reviews/${product.sku}`}>Read review</Link>
                          </div>
                        </td>
                        <td>{getPriceLabel(product)}</td>
                        <td>{getCoolingLabel(product.cooling_type)}</td>
                        <td>{getSizeLabel(product)}</td>
                        <td>{getBestForLabel(product)}</td>
                        <td>
                          <span className={`score-pill ${getScoreBadgeClass(product.overallScore || 0)}`}>
                            {product.overallScore ? `${product.overallScore}/10` : 'N/A'}
                          </span>
                        </td>
                        <td>{renderCta(product, 'btn btn-primary-cta btn-sm comparison-cta')}</td>
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
                    <span className={`score-pill ${getScoreBadgeClass(product.overallScore || 0)}`}>
                      {product.overallScore ? `${product.overallScore}/10` : 'N/A'}
                    </span>
                  </div>
                  <dl className="comparison-mobile-grid">
                    <div>
                      <dt>Price Range</dt>
                      <dd>{getPriceLabel(product)}</dd>
                    </div>
                    <div>
                      <dt>Cooling Type</dt>
                      <dd>{getCoolingLabel(product.cooling_type)}</dd>
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
                    {renderCta(product)}
                    <Link href={`/reviews/${product.sku}`} className="btn btn-secondary-cta">
                      Read Review
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="money-section">
          <div className="section-heading">
            <h2>Best Cold Plunge Tubs Ranked</h2>
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
                      <span className={`score-pill ${getScoreBadgeClass(product.overallScore || 0)}`}>
                        {product.overallScore ? `${product.overallScore}/10` : 'N/A'}
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
                      {renderCta(product)}
                      <Link href={`/reviews/${product.sku}`} className="btn btn-secondary-cta">
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
                      {renderCta(topPick)}
                      <Link href={`/reviews/${topPick.sku}`} className="btn btn-secondary-cta">
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
              <h2>How We Score Cold Plunge Tubs</h2>
              <p>Scores are meant to help you compare buyers' tradeoffs quickly, not hide them behind marketing language.</p>
            </div>
            <div className="score-grid">
              {scoreCriteria.map((criterion) => (
                <div key={criterion.title} className="score-grid-card">
                  <h3>{criterion.title}</h3>
                  <p>{criterion.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="section-heading">
              <h2>How We Evaluate Cold Plunge Tubs</h2>
            </div>
            <div className="rich-copy">
              <p>
                We evaluate cold plunge tubs by comparing specifications, design tradeoffs, maintenance demands,
                user-fit considerations, and overall category value.
              </p>
              <p>
                For this page, the heaviest weighting goes to temperature consistency, insulation, ease of cleaning,
                and whether the tub realistically supports repeat use for the buyer it targets.
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
              <p>
                If budget is the main constraint, start with our{' '}
                <Link href="/best-of/best-budget-cold-plunge">Best Budget Cold Plunge</Link>{' '}
                picks before paying premium-system prices.
              </p>
              <p>
                If you are new to cold exposure, the{' '}
                <Link href="/best-of/best-cold-plunge-for-beginners">Best Cold Plunge for Beginners</Link>{' '}
                page is the fastest way to narrow the field to easy-to-live-with options.
              </p>
              <p>
                Buyers deciding between manual ice use and powered systems should compare the ownership tradeoffs
                in our{' '}
                <Link href="/best-of/best-cold-plunge-with-chiller">cold plunge vs. ice bath decision path</Link>{' '}
                before spending chiller-system money.
              </p>
              <p>
                For upkeep and ownership basics, review the{' '}
                <Link href="/guides/maintenance-care">maintenance guide</Link>{' '}
                and the general{' '}
                <Link href="/guides/buying-guides">setup and buying guide</Link>{' '}
                before choosing your final shortlist.
              </p>
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
                {renderCta(topPick)}
                <Link href={`/reviews/${topPick.sku}`} className="btn btn-secondary-cta">
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
