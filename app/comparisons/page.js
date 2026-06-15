import Link from 'next/link';
import comparisons from '../../data/comparisons.json';
import config from '../../data/config.json';

const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;
const featuredComparisonSlugs = [
  'cold-plunge-vs-ice-bath',
  'infrared-vs-traditional-sauna',
  'sauna-vs-steam-room',
  'cold-plunge-vs-cryotherapy',
  'plunge-standard-vs-plunge-all-in',
];

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  alternates: {
    canonical: `https://${config.domain}/comparisons`,
  },
  title: `Recovery Equipment Comparisons | ${config.siteName}`,
  description: `Direct, decision-focused comparisons for cold plunge tubs, saunas, and recovery gear.`,
  openGraph: {
    title: `Recovery Equipment Comparisons | ${config.siteName}`,
    description: `Direct, decision-focused comparisons for cold plunge tubs, saunas, and recovery gear.`,
    url: `https://${config.domain}/comparisons`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Recovery Equipment Comparisons | ${config.siteName}`,
    description: `Direct, decision-focused comparisons for cold plunge tubs, saunas, and recovery gear.`,
    images: [ogImageUrl],
  },
};

export default function ComparisonsPage() {
  const featuredComparisons = featuredComparisonSlugs
    .map((slug) => comparisons.find((comparison) => comparison.slug === slug))
    .filter(Boolean);
  const remainingComparisons = comparisons.filter((comparison) => !featuredComparisonSlugs.includes(comparison.slug));

  return (
    <div className="comparison-index-page py-5">
      <div className="container">
        <header className="commercial-index-hero text-center">
          <p className="best-of-eyebrow">Decision Hub</p>
          <h1 className="section-title">Recovery Equipment Comparisons</h1>
          <p className="section-subtitle mx-auto">
            Direct, decision-focused comparisons for cold plunge tubs and home saunas. Use these pages when you are choosing between two formats, products, or ownership paths.
          </p>
          <div className="cta-row center-cta-row">
            <Link href="/comparisons/cold-plunge-vs-ice-bath" className="btn btn-primary-cta">
              Compare Cold Plunge Options
            </Link>
            <Link href="/comparisons/infrared-vs-traditional-sauna" className="btn btn-secondary-cta">
              Compare Sauna Types
            </Link>
          </div>
        </header>

        <section className="money-section">
          <div className="section-heading text-center">
            <p className="inline-cta-label">Start Here</p>
            <h2>Most Useful Decisions</h2>
            <p>These comparisons answer the questions buyers usually need to settle before choosing a ranked guide or review.</p>
          </div>
          <div className="decision-card-grid">
            {featuredComparisons.map((comparison, index) => (
              <article key={comparison.slug} className={`decision-card ${index === 0 ? 'decision-card-primary' : ''}`}>
                <p className="comparison-card-label">{comparison.eyebrow || 'Comparison'}</p>
                <h2>{comparison.title}</h2>
                <p>{comparison.description}</p>
                <Link href={`/comparisons/${comparison.slug}`} className="btn btn-primary-cta">
                  View Comparison
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="money-section">
          <div className="section-heading text-center">
            <h2>All Comparisons</h2>
            <p>Use the full comparison library to narrow product formats, ownership tradeoffs, and buying paths.</p>
          </div>
          <div className="row g-4">
            {remainingComparisons.map((comparison) => (
              <div key={comparison.slug} className="col-md-6 col-lg-4">
                <article className="card h-100 comparison-index-card">
                  <div className="card-body d-flex flex-column">
                    <p className="comparison-card-label">{comparison.eyebrow || 'Comparison'}</p>
                    <h2 className="card-title h4">{comparison.title}</h2>
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
      </div>
    </div>
  );
}
