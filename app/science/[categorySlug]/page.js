import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles from '../../../data/scienceArticles.json';
import config from '../../../data/config.json';
import { getScienceArticlePath, getScienceCategoryPath } from '../../../lib/routes';
import { getAllProductCategories } from '../../../lib/categoryRegistry';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;
const publishedArticles = articles.filter((article) => article.status === 'published');
const categories = getAllProductCategories();

export async function generateStaticParams() {
  return categories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }) {
  const category = categories.find((entry) => entry.slug === params.categorySlug);
  if (!category) return {};

  return {
    title: `${category.name} Research | ${config.siteName}`,
    description: category.scienceDescription || category.description,
    alternates: {
      canonical: `${URL}${getScienceCategoryPath(category.slug)}`,
    },
    openGraph: {
      title: `${category.name} Research`,
      description: category.scienceDescription || category.description,
      url: `${URL}${getScienceCategoryPath(category.slug)}`,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Research`,
      description: category.scienceDescription || category.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default function ScienceCategoryPage({ params }) {
  const category = categories.find((entry) => entry.slug === params.categorySlug);
  if (!category) notFound();

  const categoryArticles = publishedArticles.filter((article) => article.categorySlug === category.slug);

  return (
    <div className="science-page py-5">
      <div className="science-shell">
        <header className="science-hero">
          <Link href="/science" className="science-back-link">The Science</Link>
          <p className="best-of-eyebrow">Research Category</p>
          <h1 className="section-title">{category.name}</h1>
          <p className="section-subtitle science-subtitle">{category.scienceDescription || category.description}</p>
        </header>

        <section className="money-section mt-4">
          <div className="section-heading">
            <h2>{category.name} Articles</h2>
            <p>Plain-English analysis with evidence limits, practical context, and relevant next-step links.</p>
          </div>

          <div className="science-article-grid">
            {categoryArticles.map((article) => (
              <article key={article.slug} className="science-article-card">
                <p className="science-card-kicker">{article.readingTime}</p>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <div className="science-card-meta">
                  <span>Updated {article.lastUpdated}</span>
                  <span>{article.status}</span>
                </div>
                <Link href={getScienceArticlePath(article.categorySlug, article.slug)} className="btn btn-primary-cta">
                  Read Analysis
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
