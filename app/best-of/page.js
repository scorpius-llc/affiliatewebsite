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

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  alternates: {
    canonical: `https://${config.domain}/best-of`,
  },
  title: `Best Cold Plunges, Saunas & Recovery Gear (2026) | ${config.siteName}`,
  description: `Explore our curated lists of the best cold plunges, home saunas, sauna blankets, and recovery gear for different budgets, spaces, and goals.`,
  openGraph: {
    title: `Best Cold Plunges, Saunas & Recovery Gear (2026) | ${config.siteName}`,
    description: `Explore our curated lists of the best cold plunges, home saunas, sauna blankets, and recovery gear for different budgets, spaces, and goals.`,
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
    title: `Best Cold Plunges, Saunas & Recovery Gear (2026) | ${config.siteName}`,
    description: `Explore our curated lists of the best cold plunges, home saunas, sauna blankets, and recovery gear for different budgets, spaces, and goals.`,
    images: [ogImageUrl],
  },
};

export default function BestOf() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center section-title">{replacePlaceholders(pageContent.title)}</h1>
      <p className="lead text-center mb-5 section-subtitle">{replacePlaceholders(pageContent.subtitle)}</p>

      <div className="row mb-5">
        {bestLists.filter(list => list && list.id).map((list, index) => (
          <div key={list.id} className="col-md-4 mb-3">
            <div className={`card text-center h-100 ${index === 0 ? 'border-primary' : ''}`}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{list.title}</h5>
                <p className="card-text">{list.description}</p>
                <Link href={`/best-of/${list.id}`} className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline-primary'} mt-auto`}>View List</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h3 className="section-title">{pageContent.whyTrustTitle}</h3>
          <p className="text-muted">{replacePlaceholders(pageContent.whyTrustContent)}</p>
        </div>
      </div>

      {/* New Section: How to Use These Lists */}
      <section className="my-5 py-5 bg-card rounded">
        <div className="container">
          <h3 className="text-center section-title">{pageContent.howToUseTitle}</h3>
          <p className="text-muted text-center">{replacePlaceholders(pageContent.howToUseContent)}</p>
        </div>
      </section>

      {/* New Section: How We Evaluate Recovery Equipment */}
      <section className="my-5 py-5">
        <div className="container">
          <h3 className="text-center section-title">{pageContent.howWeEvaluateTitle}</h3>
          <p className="text-muted text-center">{replacePlaceholders(pageContent.howWeEvaluateContent)}</p>
        </div>
      </section>

      <PageFaqs />

    </div>
  );
}
