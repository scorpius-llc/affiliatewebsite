import Link from 'next/link';
import { notFound } from 'next/navigation';
import guides from '../../../data/guides.json';
import config from '../../../data/config.json';
import MaintenanceGuide from '../../../components/guides/MaintenanceGuide';

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
  };
}

export default function GuidePage({ params }) {
  const guide = guides.find((g) => g.id === params.slug);

  if (!guide) {
    notFound();
  }

  const isMaintenanceGuide = guide.id === 'maintenance-care';

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/guides/">Guides</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{guide.title}</li>
        </ol>
      </nav>

      <h1 className="mb-4">{guide.title}</h1>
      <p className="lead mb-5">{replacePlaceholders(guide.lead)}</p>

      <div className="row">
        <div className="col-lg-8">
          {isMaintenanceGuide ? (
            <MaintenanceGuide />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: replacePlaceholders(guide.content) }} />
          )}
        </div>
      </div>
    </div>
  );
}