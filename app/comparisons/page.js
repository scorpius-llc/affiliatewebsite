import Link from 'next/link';
import comparisons from '../../data/comparisons.json';
import config from '../../data/config.json';

const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;

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
  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <p className="best-of-eyebrow">Comparisons</p>
        <h1 className="section-title">Recovery Equipment Comparisons</h1>
        <p className="section-subtitle">
          Direct, decision-focused comparisons for cold plunge tubs, saunas, and recovery gear.
        </p>
      </header>

      <div className="row g-4">
        {comparisons.map((comparison) => (
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
    </div>
  );
}
