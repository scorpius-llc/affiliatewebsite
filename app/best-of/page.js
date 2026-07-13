import Link from 'next/link';
import PageFaqs from '../../components/PageFaqs';
import pageContent from '../../data/best-of-page.json';
import bestLists from '../../data/best-lists.json';
import config from '../../data/config.json';

// Helper function to replace placeholders
const replacePlaceholders = (text) => {
  if (!text) return '';
  return text
    .replace(/{topicPlural}/g, config.topicPlural)
    .replace(/{topicSingular}/g, config.topicSingular);
};

const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;
const featuredListIds = [
  'best-cold-plunge-tubs',
  'best-cold-plunge-with-chiller',
  'best-home-saunas',
  'best-infrared-saunas',
  'best-red-light-therapy-devices',
  'best-recovery-tools',
  'best-outdoor-saunas',
];

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  alternates: {
    canonical: `https://${config.domain}/best-of`,
  },
  title: `Best Cold Plunges, Saunas & Recovery Equipment (2026) | ${config.siteName}`,
  description: `Explore research-informed rankings of cold plunge tubs, home saunas, red light therapy devices, and recovery tools for different budgets, spaces, and goals.`,
  openGraph: {
    title: `Best Cold Plunges, Saunas & Recovery Equipment (2026) | ${config.siteName}`,
    description: `Explore research-informed rankings of cold plunge tubs, home saunas, red light therapy devices, and recovery tools for different budgets, spaces, and goals.`,
    url: `https://${config.domain}/best-of`,
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
    title: `Best Cold Plunges, Saunas & Recovery Equipment (2026) | ${config.siteName}`,
    description: `Explore research-informed rankings of cold plunge tubs, home saunas, red light therapy devices, and recovery tools for different budgets, spaces, and goals.`,
    images: [ogImageUrl],
  },
};

export default function BestOf() {
  const featuredLists = featuredListIds
    .map((id) => bestLists.find((list) => list.id === id))
    .filter(Boolean);
  const remainingLists = bestLists.filter((list) => list?.id && !featuredListIds.includes(list.id));

  return (
    <div className="best-of-index-page py-5">
      <div className="container">
        <header className="commercial-index-hero text-center">
          <p className="best-of-eyebrow">Buyer Guides</p>
          <h1 className="section-title">{replacePlaceholders(pageContent.title)}</h1>
          <p className="section-subtitle mx-auto">{replacePlaceholders(pageContent.subtitle)}</p>
          <div className="cta-row center-cta-row">
            <Link href="/best-of/best-cold-plunge-tubs" className="btn btn-primary-cta">
              Start With Cold Plunges
            </Link>
            <Link href="/best-of/best-home-saunas" className="btn btn-secondary-cta">
              Start With Saunas
            </Link>
            <Link href="/best-of/best-red-light-therapy-devices" className="btn btn-secondary-cta">
              Compare Red Light Devices
            </Link>
          </div>
        </header>

        <section className="money-section">
          <div className="section-heading text-center">
            <p className="inline-cta-label">Start Here</p>
            <h2>Most Popular Rankings</h2>
            <p>Use these buyer guides first if you are still deciding what type of recovery setup belongs in your home.</p>
          </div>
          <div className="featured-category-grid">
            {featuredLists.map((list, index) => (
              <article key={list.id} className={`featured-category-card ${index === 0 ? 'featured-category-card-primary' : ''}`}>
                <p className="comparison-card-label">{index === 0 ? 'Most Popular' : 'Featured Guide'}</p>
                <h2>{list.title}</h2>
                <p>{list.description}</p>
                <Link href={`/best-of/${list.id}`} className="btn btn-primary-cta">
                  View Rankings
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="money-section">
          <div className="section-heading text-center">
            <h2>All ThermaPeak Rankings</h2>
            <p>Browse focused lists by budget, format, space, ownership style, and recovery use case.</p>
          </div>
          <div className="row g-4">
            {remainingLists.map((list) => (
              <div key={list.id} className="col-md-6 col-lg-4">
                <article className="card h-100 comparison-index-card">
                  <div className="card-body d-flex flex-column">
                    <p className="comparison-card-label">Best Of</p>
                    <h2 className="card-title h4">{list.title}</h2>
                    <p className="card-text flex-grow-1">{list.description}</p>
                    <Link href={`/best-of/${list.id}`} className="btn btn-outline-primary mt-3">
                      View Rankings
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section className="money-section info-grid-section">
          <div className="info-card">
            <div className="section-heading">
              <h2>{pageContent.whyTrustTitle}</h2>
            </div>
            <p>{replacePlaceholders(pageContent.whyTrustContent)}</p>
          </div>
          <div className="info-card">
            <div className="section-heading">
              <h2>{pageContent.howToUseTitle}</h2>
            </div>
            <p>{replacePlaceholders(pageContent.howToUseContent)}</p>
          </div>
          <div className="info-card">
            <div className="section-heading">
              <h2>{pageContent.howWeEvaluateTitle}</h2>
            </div>
            <p>{replacePlaceholders(pageContent.howWeEvaluateContent)}</p>
          </div>
        </section>

        <PageFaqs />
      </div>
    </div>
  );
}
