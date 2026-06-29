import Link from 'next/link';
import { notFound } from 'next/navigation';
import config from '../../../data/config.json';
import { getScienceArticlePath, getScienceCategoryPath } from '../../../lib/routes';
import { getScienceArticlesByCategory, getScienceCategories, getScienceCategory } from '../../../lib/scienceLibrary';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;

export async function generateStaticParams() {
  return getScienceCategories().map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }) {
  const category = getScienceCategory(params.categorySlug);
  if (!category) return {};

  return {
    title: `${category.name} Research | ${config.siteName}`,
    description: category.description,
    alternates: {
      canonical: `${URL}${getScienceCategoryPath(category.slug)}`,
    },
    openGraph: {
      title: `${category.name} Research`,
      description: category.description,
      url: `${URL}${getScienceCategoryPath(category.slug)}`,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Research`,
      description: category.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export default function ScienceCategoryPage({ params }) {
  const category = getScienceCategory(params.categorySlug);
  if (!category) notFound();

  const categoryArticles = getScienceArticlesByCategory(category.slug);

  return (
    <div className="science-page py-5">
      <div className="science-shell">
        <header className="science-hero">
          <Link href="/science" className="science-back-link">The Science</Link>
          <p className="best-of-eyebrow">Research Category</p>
          <h1 className="section-title">{category.name}</h1>
          <p className="section-subtitle science-subtitle">{category.description}</p>
        </header>

        <section className="money-section mt-4">
          <div className="section-heading">
            <h2>{category.name} Research Library</h2>
            <p>Structured research analysis with study snapshots, evidence limits, and practical consumer context.</p>
          </div>

          {categoryArticles.length > 0 ? (
            <div className="science-article-grid">
              {categoryArticles.map((article) => (
                <article key={article.slug} className="science-article-card">
                  <p className="science-card-kicker">{article.readingTime}</p>
                  <h2>{article.title}</h2>
                  <p>{article.subtitle}</p>
                  <div className="science-card-meta">
                    <span>Updated {article.lastUpdated}</span>
                    <span>{article.related_studies?.length || 0} studies referenced</span>
                  </div>
                  <Link href={getScienceArticlePath(article.categorySlug, article.slug)} className="btn btn-primary-cta">
                    Read Analysis
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <section className="science-empty-state">
              <h2>Research is being added.</h2>
              <p>This category exists in the ThermaPeak research taxonomy and will populate as studies and analysis are reviewed.</p>
            </section>
          )}
        </section>
      </div>
    </div>
  );
}
