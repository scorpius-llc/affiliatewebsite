import Link from 'next/link';
import config from '../../data/config.json';
import { getScienceArticlePath, getScienceCategoryPath } from '../../lib/routes';
import {
  getEvidenceBadge,
  getPublishedScienceArticles,
  getRecentStudies,
  getScienceCategories,
  getScienceFaqs,
  getSciencePage,
} from '../../lib/scienceLibrary';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;
const sciencePage = getSciencePage();
const categories = getScienceCategories();
const publishedArticles = getPublishedScienceArticles();
const featuredArticles = (sciencePage.featured_articles || [])
  .map((slug) => publishedArticles.find((article) => article.slug === slug || article.id === slug))
  .filter(Boolean)
  .slice(0, 6);
const recentStudies = getRecentStudies(5);
const faqs = getScienceFaqs(sciencePage.faq_ids || []);

export const metadata = {
  title: `${sciencePage.title} | ${config.siteName}`,
  description: sciencePage.subtitle,
  alternates: {
    canonical: `${URL}/science`,
  },
  openGraph: {
    title: sciencePage.title,
    description: sciencePage.subtitle,
    url: `${URL}/science`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: sciencePage.title,
    description: sciencePage.subtitle,
    images: [OG_IMAGE_URL],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: config.siteName,
  url: URL,
  logo: `${URL}${config.logoPath}`,
};

const faqSchema = faqs.length > 0 ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
} : null;

export default function ScienceIndexPage() {
  return (
    <div className="science-page py-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="science-shell">
        <header className="science-hero text-center">
          <p className="best-of-eyebrow">The Science</p>
          <h1 className="section-title">{sciencePage.title}</h1>
          <p className="section-subtitle science-subtitle mx-auto">{sciencePage.subtitle}</p>
          <div className="science-trust-statement">ThermaPeak summarizes research in plain English and avoids overstating claims.</div>
        </header>

        <section className="science-intro-panel">
          <p>{sciencePage.intro}</p>
        </section>

        <section className="money-section">
          <div className="section-heading">
            <h2>Featured Research</h2>
            <p>Evidence-focused explainers built from the central ThermaPeak study library.</p>
          </div>
          <div className="science-article-grid">
            {featuredArticles.map((article) => (
              <article key={`${article.categorySlug}-${article.slug}`} className="science-article-card">
                <p className="science-card-kicker">{article.categoryName}</p>
                <h3>{article.title}</h3>
                <p>{article.subtitle}</p>
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

        <section className="money-section">
          <div className="section-heading">
            <h2>Browse by Category</h2>
            <p>Use the research library by topic instead of scrolling a chronological blog feed.</p>
          </div>
          <div className="science-category-grid">
            {categories.map((category) => (
              <article key={category.slug} className="science-category-card">
                <h2>{category.name}</h2>
                <p>{category.description}</p>
                <Link href={getScienceCategoryPath(category.slug)} className="btn btn-primary-cta">
                  Explore Research
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="money-section science-recent-studies-section">
          <div className="section-heading">
            <h2>Recently Added Studies</h2>
            <p>Each study is stored once and can support reviews, guides, comparisons, and buying pages.</p>
          </div>
          <div className="science-study-list">
            {recentStudies.map((study) => {
              const badge = getEvidenceBadge(study.evidence_level);
              return (
                <article key={study.id} className="science-study-card">
                  <div className="science-study-heading">
                    <h3>{study.title}</h3>
                    <span className={`science-evidence-label ${badge.className}`}>{badge.stars} {badge.label}</span>
                  </div>
                  <p className="science-study-source">{study.journal} · {study.publication_year}</p>
                  <p>{study.consumer_takeaway}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="science-method-grid">
          <article className="science-method-card">
            <h2>Why Trust Our Research</h2>
            <p>{sciencePage.why_this_matters}</p>
          </article>
          <article className="science-method-card">
            <h2>How We Evaluate Scientific Evidence</h2>
            <ul>
              {(sciencePage.methodology || []).map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </section>

        {faqs.length > 0 && (
          <section className="science-faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="science-faq-list">
              {faqs.map((faq) => (
                <article key={faq.question} className="science-faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="science-newsletter-placeholder">
          <p className="best-of-eyebrow">Future Research Brief</p>
          <h2>Newsletter placeholder</h2>
          <p>A future newsletter module can summarize new studies and category updates without changing the page template.</p>
        </section>
      </div>
    </div>
  );
}
