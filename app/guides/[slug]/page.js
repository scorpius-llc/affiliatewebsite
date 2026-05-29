import Link from 'next/link';
import { notFound } from 'next/navigation';
import guides from '../../../data/guides.json';
import config from '../../../data/config.json';

const OG_IMAGE_URL = `https://${config.domain}/images/ThermaPeakOG.png`;

// Function to replace topic placeholders
const replacePlaceholders = (text) => {
  if (!text) return '';
  return text
    .replace(/{topicPlural}/g, config.topicPlural)
    .replace(/{topicSingular}/g, config.topicSingular);
};

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.id,
  }));
}

export async function generateMetadata({ params }) {
  const guide = guides.find((g) => g.id === params.slug);
  if (!guide) return {};

  return {
    title: `${guide.title} - ${config.siteName}`,
    description: replacePlaceholders(guide.description),
    alternates: {
      canonical: `https://${config.domain}/guides/${guide.id}`,
    },
    openGraph: {
      title: guide.title,
      description: replacePlaceholders(guide.description),
      url: `https://${config.domain}/guides/${guide.id}`,
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
      title: guide.title,
      description: replacePlaceholders(guide.description),
      images: [OG_IMAGE_URL],
    },
  };
}

export default function GuidePage({ params }) {
  const guide = guides.find((g) => g.id === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/guides">Guides</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{guide.title}</li>
        </ol>
      </nav>

      <h1 className="mb-4">{guide.title}</h1>
      <p className="lead mb-5">{replacePlaceholders(guide.lead)}</p>

      <div className="row">
        <div className="col-lg-8">
          <div dangerouslySetInnerHTML={{ __html: replacePlaceholders(guide.content) }} />
        </div>
      </div>
    </div>
  );
}
