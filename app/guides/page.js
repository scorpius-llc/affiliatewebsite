import Link from 'next/link';
import guides from '../../data/guides.json';
import pageContent from '../../data/guides-page.json';
import config from '../../data/config.json';

const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;

// Function to replace topic placeholders
const replacePlaceholders = (text) => {
  return text
    .replace(/{topicPlural}/g, config.topicPlural)
    .replace(/{topicSingular}/g, config.topicSingular);
};

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  alternates: {
    canonical: `https://${config.domain}/guides`,
  },
  title: `Recovery Equipment Guides & Resources - ${config.siteName}`,
  description: `Buying and setup guides for cold plunge tubs, home saunas, red light therapy, and recovery tools.`,
  openGraph: {
    title: `Recovery Equipment Guides & Resources - ${config.siteName}`,
    description: `Buying and setup guides for cold plunge tubs, home saunas, red light therapy, and recovery tools.`,
    url: `https://${config.domain}/guides`,
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
    title: `Recovery Equipment Guides & Resources - ${config.siteName}`,
    description: `Buying and setup guides for cold plunge tubs, home saunas, red light therapy, and recovery tools.`,
    images: [ogImageUrl],
  },
};

export default function Guides() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">{replacePlaceholders(pageContent.title)}</h1>
      <p className="lead text-center mb-5">{replacePlaceholders(pageContent.subtitle)}</p>

      <div className="row mb-5">
        {guides.map(guide => (
          <div key={guide.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title">{guide.title}</h5>
                <p className="card-text">{replacePlaceholders(guide.description)}</p>
                <Link href={`/guides/${guide.id}`} className="btn btn-outline-primary mt-auto">Read Guide</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h3>{pageContent.whyReadTitle}</h3>
          <p className="text-muted">{replacePlaceholders(pageContent.whyReadContent)}</p>
        </div>
      </div>
    </div>
  );
}
