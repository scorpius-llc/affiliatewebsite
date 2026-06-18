import Link from 'next/link';
import scienceCategoryConfig from '../../data/scienceCategories.json';
import articles from '../../data/scienceArticles.json';
import config from '../../data/config.json';
import { getScienceArticlePath, getScienceCategoryPath } from '../../lib/routes';
import { getAllProductCategories } from '../../lib/categoryRegistry';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;
const publishedArticles = articles.filter((article) => article.status === 'published');
const categories = getAllProductCategories();

export const metadata = {
  title: `The Science Behind Recovery | ${config.siteName}`,
  description: 'Research-informed explainers on cold exposure, sauna use, red light therapy, sleep, recovery, and performance.',
  alternates: {
    canonical: `${URL}/science`,
  },
  openGraph: {
    title: 'The Science Behind Recovery',
    description: 'Research-informed explainers on cold exposure, sauna use, red light therapy, sleep, recovery, and performance.',
    url: `${URL}/science`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Science Behind Recovery',
    description: 'Research-informed explainers on cold exposure, sauna use, red light therapy, sleep, recovery, and performance.',
    images: [OG_IMAGE_URL],
  },
};

const featuredArticles = scienceCategoryConfig
  .flatMap((category) => category.featuredArticles || [])
  .map((slug) => publishedArticles.find((article) => article.slug === slug))
  .filter(Boolean)
  .slice(0, 6);

export default function ScienceIndexPage() {
  return (
    <div className="science-page py-5">
      <div className="science-shell">
        <header className="science-hero text-center">
          <p className="best-of-eyebrow">The Science</p>
          <h1 className="section-title">The Science Behind Recovery</h1>
          <p className="section-subtitle science-subtitle">
            Research-informed explainers on cold exposure, sauna use, red light therapy, sleep, recovery, and performance.
          </p>
          <div className="science-trust-statement">
            ThermaPeak summarizes research in plain English and avoids overstating claims.
          </div>
        </header>

        <section className="money-section">
          <div className="section-heading">
            <h2>Research Topics</h2>
            <p>Start with the subject area that matches the recovery protocol you are evaluating.</p>
          </div>
          <div className="science-category-grid">
            {categories.map((category) => (
              <article key={category.slug} className="science-category-card">
                <h2>{category.name}</h2>
                <p>{category.scienceDescription || category.description}</p>
                <Link href={getScienceCategoryPath(category.slug)} className="btn btn-primary-cta">
                  Explore Research
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="money-section">
          <div className="section-heading">
            <h2>Featured Science Articles</h2>
            <p>Evidence-focused explainers designed to support better buying and recovery decisions.</p>
          </div>
          <div className="science-article-grid">
            {featuredArticles.map((article) => (
              <article key={`${article.categorySlug}-${article.slug}`} className="science-article-card">
                <p className="science-card-kicker">{article.categoryName}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="science-card-meta">
                  <span>{article.readingTime}</span>
                  <span>Updated {article.lastUpdated}</span>
                </div>
                <Link href={getScienceArticlePath(article.categorySlug, article.slug)} className="btn btn-secondary-cta">
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
