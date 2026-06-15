import Link from 'next/link';
import { notFound } from 'next/navigation';
import products from '../../../data/products.json';
import bestLists from '../../../data/best-lists.json';
import comparisons from '../../../data/comparisons.json';
import guides from '../../../data/guides.json';
import config from '../../../data/config.json';
import AffiliateButtons from '../../../components/AffiliateButtons';
import { getPrimaryAffiliateUrl } from '../../../lib/affiliateLinks';
import { getReviewPath, getReviewSlug } from '../../../lib/routes';

const OG_IMAGE_URL = `https://${config.domain}/images/ThermaPeakOG.png`;
const FALLBACK_IMAGE = '/images/ThermaPeakLogo.png';

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getAverageScore = (score) => {
  if (typeof score === 'number') return score;
  const values = Object.values(score || {}).filter((value) => typeof value === 'number');
  if (values.length === 0) return null;
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1));
};

const getDisplayScore = (product) => product.overallScore || getAverageScore(product.score);

const getProductImage = (product) => product.image || product.imageUrl || product.image_url || FALLBACK_IMAGE;

const getBestFor = (product) => {
  if (product.bestFor) return product.bestFor;
  if (product.suitability?.beginner_friendly) return 'Beginners building a repeatable recovery routine';
  if (product.suitability?.small_space_friendly) return 'Small spaces and flexible home setups';
  if (product.suitability?.outdoor_ready) return 'Outdoor recovery spaces and frequent use';
  if (product.category === 'sauna') return 'Home sauna buyers comparing premium recovery options';
  return 'Home recovery buyers comparing long-term ownership value';
};

const getReviewSummary = (product) => product.reviewSummary || product.description || product.verdict;

const getRelatedBestLists = (product) =>
  bestLists
    .filter((list) =>
      list.primary_category === product.category ||
      list.featured_skus?.includes(product.sku) ||
      list.products?.some((entry) => entry.sku === product.sku)
    )
    .slice(0, 4);

const getRelatedComparisons = (product) => {
  const reviewPath = getReviewPath(product.sku);
  const terms = [product.name, product.brand, product.product_type]
    .filter(Boolean)
    .map((term) => slugify(term));

  return comparisons
    .filter((comparison) => {
      const payload = JSON.stringify(comparison).toLowerCase();
      return payload.includes(reviewPath) ||
        terms.some((term) => term && slugify(`${comparison.slug} ${comparison.title} ${payload}`).includes(term));
    })
    .slice(0, 4);
};

const getRelatedGuides = (product) => {
  const categoryHints = product.category === 'sauna'
    ? ['sauna', 'infrared', 'traditional']
    : ['cold-plunge', 'ice', 'chiller'];

  return guides
    .filter((guide) => categoryHints.some((hint) => `${guide.id} ${guide.title}`.toLowerCase().includes(hint)))
    .slice(0, 4);
};

const getReviewFaqs = (product) => [
  {
    question: `Is ${product.name} worth it?`,
    answer: product.verdict || `${product.name} is worth considering if its strengths match your space, budget, and recovery routine.`,
  },
  {
    question: `Who is ${product.name} best for?`,
    answer: getBestFor(product),
  },
  {
    question: `Where should I check the current price for ${product.name}?`,
    answer: 'Use the current-price or official-website links on this review page so you can verify availability, current offers, and merchant terms before buying.',
  },
];

const buildProductSchema = (product) => {
  const canonicalUrl = `https://${config.domain}${getReviewPath(product.sku)}`;
  const score = getDisplayScore(product);
  const merchantUrl = getPrimaryAffiliateUrl(product);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.reviewSummary,
    image: getProductImage(product).startsWith('http')
      ? getProductImage(product)
      : `https://${config.domain}${getProductImage(product)}`,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    url: canonicalUrl,
    review: {
      '@type': 'Review',
      name: `${product.name} Review`,
      reviewBody: stripHtml(product.verdict || product.description),
      author: {
        '@type': 'Person',
        name: config.author,
      },
      publisher: {
        '@type': 'Organization',
        name: config.siteName,
      },
      reviewRating: score ? {
        '@type': 'Rating',
        ratingValue: score,
        bestRating: 10,
        worstRating: 1,
      } : undefined,
    },
    aggregateRating: score ? {
      '@type': 'AggregateRating',
      ratingValue: score,
      bestRating: 10,
      worstRating: 1,
      ratingCount: 1,
    } : undefined,
    offers: merchantUrl ? {
      '@type': 'Offer',
      url: merchantUrl,
      availability: 'https://schema.org/InStock',
    } : undefined,
  };

  return JSON.parse(JSON.stringify(schema));
};

const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripHtml(faq.answer),
    },
  })),
});

function ReviewCtaCard({ product }) {
  const score = getDisplayScore(product);

  return (
    <section className="review-hero-card mb-5">
      <div className="review-hero-media">
        <img src={getProductImage(product)} alt={product.name} />
      </div>
      <div className="review-hero-copy">
        <div className="review-kicker">Review Snapshot</div>
        <h2>{product.name}</h2>
        <p className="review-best-for"><strong>Best for:</strong> {getBestFor(product)}</p>
        {score && <div className="review-score"><span>{score}</span><small>/10 overall score</small></div>}
        <p>{getReviewSummary(product)}</p>
        <AffiliateButtons product={product} size="lg" className="review-cta-buttons" />
        <small className="review-disclosure">We may earn a commission when you buy through qualifying links.</small>
      </div>
    </section>
  );
}

function MidArticleCta({ product }) {
  const bullets = (product.pros?.length ? product.pros : [
    'Strong long-term ownership fit',
    'Clear category positioning',
    'Worth comparing before you buy',
  ]).slice(0, 3);

  return (
    <section className="review-mid-cta my-5">
      <div>
        <p className="review-kicker mb-2">Still considering this product?</p>
        <h2 className="h4 mb-3">{product.name} is strongest when these priorities matter:</h2>
        <ul className="mb-0">
          {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </div>
      <AffiliateButtons product={product} size="md" className="review-cta-buttons" />
    </section>
  );
}

function LinkListSection({ title, items, getHref, getLabel }) {
  if (!items.length) return null;

  return (
    <section className="mt-5">
      <h2 className="h3 mb-3">{title}</h2>
      <div className="review-link-grid">
        {items.map((item) => (
          <Link key={getHref(item)} href={getHref(item)} className="review-link-card">
            {getLabel(item)}
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    sku: getReviewSlug(product.sku),
  }));
}

export async function generateMetadata({ params }) {
  const product = products.find((p) => getReviewSlug(p.sku) === params.sku);
  if (!product) return {};

  return {
    title: `${product.name} Review - ${config.siteName}`,
    description: product.reviewSummary || product.description,
    alternates: {
      canonical: `https://${config.domain}${getReviewPath(product.sku)}`,
    },
    openGraph: {
      title: `${product.name} Review`,
      description: product.reviewSummary || product.description,
      url: `https://${config.domain}${getReviewPath(product.sku)}`,
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
      title: `${product.name} Review`,
      description: product.reviewSummary || product.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default function ReviewPage({ params }) {
  const product = products.find((p) => getReviewSlug(p.sku) === params.sku);

  if (!product) {
    notFound();
  }

  const alternatives = product.alternatives?.map((alt) => {
    const fullAlt = products.find((p) => p.sku === alt.sku);
    return fullAlt ? { ...alt, price: fullAlt.approx_price } : alt;
  }) || [];
  const score = getDisplayScore(product);
  const relatedBestLists = getRelatedBestLists(product);
  const relatedComparisons = getRelatedComparisons(product);
  const relatedGuides = getRelatedGuides(product);
  const faqs = product.faqs || getReviewFaqs(product);

  return (
    <div className="review-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProductSchema(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
      />

      <div className="container my-5">
        <div className="review-hero mb-4">
          <p className="review-kicker">ThermaPeak Review</p>
          <h1>{product.name}: In-Depth Review</h1>
          <p className="lead mb-0">{getReviewSummary(product)}</p>
        </div>

        <ReviewCtaCard product={product} />

        <div className="row g-5">
          <article className="col-lg-8">
            <section>
              <h2>Quick Verdict</h2>
              <p>{product.verdict || getReviewSummary(product)}</p>
              {score && <p className="review-score-line"><strong>Overall score:</strong> {score}/10</p>}
            </section>

            <div className="row mt-4 g-4">
              <div className="col-md-6">
                <div className="review-procon-card review-pro-card h-100">
                  <h2 className="h4">Pros</h2>
                  <ul>
                    {(product.pros || ['Clear category fit']).map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="review-procon-card review-con-card h-100">
                  <h2 className="h4">Cons</h2>
                  <ul>
                    {(product.cons || ['Confirm fit, price, and setup requirements before buying']).map((con) => (
                      <li key={con}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <section className="mt-5">
              <h2>Who It's Best For</h2>
              <p>{getBestFor(product)}</p>
              {product.who_is_this_for && <div dangerouslySetInnerHTML={{ __html: product.who_is_this_for }} />}
            </section>

            <section className="mt-5">
              <h2>Key Features</h2>
              <div dangerouslySetInnerHTML={{ __html: product.features || '<p>Feature details are being expanded as product data is updated.</p>' }} />
            </section>

            <MidArticleCta product={product} />

            <section className="mt-5">
              <h2>Performance</h2>
              <div dangerouslySetInnerHTML={{ __html: product.detailed_analysis || '<p>Performance notes are being expanded as product data is updated.</p>' }} />
            </section>

            <section className="mt-5">
              <h2>Ownership Experience</h2>
              <p>{product.ownershipExperience || stripHtml(product.who_should_skip) || 'Plan for routine setup, cleaning, space, and maintenance before choosing this product.'}</p>
            </section>

            {alternatives.length > 0 && (
              <section className="mt-5">
                <h2>Alternatives</h2>
                <div className="review-link-grid">
                  {alternatives.map((alt) => (
                    <Link key={alt.sku} href={getReviewPath(alt.sku)} className="review-link-card">
                      <span>{alt.name}</span>
                      {alt.price && <small>{moneyFormatter.format(alt.price)}</small>}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <LinkListSection
              title="Related Comparisons"
              items={relatedComparisons}
              getHref={(comparison) => `/comparisons/${comparison.slug}`}
              getLabel={(comparison) => comparison.title}
            />

            <LinkListSection
              title="Related Best Of Guides"
              items={relatedBestLists}
              getHref={(list) => `/best-of/${list.id}`}
              getLabel={(list) => list.title}
            />

            <LinkListSection
              title="Related Guides"
              items={relatedGuides}
              getHref={(guide) => guide.link || `/guides/${guide.id}`}
              getLabel={(guide) => guide.title}
            />

            <section className="review-final-cta mt-5">
              <p className="review-kicker">Final Verdict</p>
              <h2>{product.name} Review: Bottom Line</h2>
              <p>{product.verdict || getReviewSummary(product)}</p>
              <AffiliateButtons product={product} size="lg" className="review-cta-buttons" />
            </section>

            <section className="mt-5">
              <h2>FAQ</h2>
              <div className="accordion" id="reviewFaq">
                {faqs.map((faq, index) => (
                  <div className="accordion-item" key={faq.question}>
                    <h3 className="accordion-header">
                      <button
                        className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#reviewFaq${index}`}
                      >
                        {faq.question}
                      </button>
                    </h3>
                    <div
                      id={`reviewFaq${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                      data-bs-parent="#reviewFaq"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </article>

          <aside className="col-lg-4">
            <div className="review-sidebar sticky-top">
              <img src={getProductImage(product)} alt={product.name} />
              <h2 className="h5">{product.name}</h2>
              <p>{getBestFor(product)}</p>
              {score && <div className="review-score mb-3"><span>{score}</span><small>/10</small></div>}
              <AffiliateButtons product={product} size="md" className="review-cta-buttons" />
              <small className="review-disclosure">Affiliate disclosure: we may earn a commission on qualifying purchases.</small>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
