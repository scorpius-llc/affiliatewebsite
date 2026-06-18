import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles from '../../../../data/scienceArticles.json';
import config from '../../../../data/config.json';
import { getScienceArticlePath, getScienceCategoryPath } from '../../../../lib/routes';
import { getAllProductCategories } from '../../../../lib/categoryRegistry';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;
const publishedArticles = articles.filter((article) => article.status === 'published');
const categories = getAllProductCategories();
const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const evidenceClass = (strength) => {
  if (strength === 'strong') return 'science-evidence-strong';
  if (strength === 'moderate') return 'science-evidence-moderate';
  return 'science-evidence-limited';
};

const findArticle = (categorySlug, articleSlug) =>
  publishedArticles.find((article) => article.categorySlug === categorySlug && article.slug === articleSlug);

export async function generateStaticParams() {
  return publishedArticles.map((article) => ({
    categorySlug: article.categorySlug,
    articleSlug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = findArticle(params.categorySlug, params.articleSlug);
  if (!article) return {};

  const canonicalUrl = `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`;

  return {
    title: `${article.title} | ${config.siteName}`,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      images: [{ url: article.heroImage || OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.heroImage || OG_IMAGE_URL],
    },
  };
}

const buildArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  url: `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`,
  dateModified: article.lastUpdated,
  image: article.heroImage || OG_IMAGE_URL,
  publisher: {
    '@type': 'Organization',
    name: config.siteName,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`,
  },
});

const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripHtml(faq.answer),
    },
  })),
});

function RelatedScienceLinks({ article }) {
  const related = (article.relatedScienceArticles || [])
    .map((slug) => publishedArticles.find((entry) => entry.slug === slug))
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section className="science-related-section">
      <h2>Related Science Articles</h2>
      <div className="science-related-grid">
        {related.map((relatedArticle) => (
          <Link
            key={relatedArticle.slug}
            href={getScienceArticlePath(relatedArticle.categorySlug, relatedArticle.slug)}
            className="science-related-card"
          >
            <span>{relatedArticle.categoryName}</span>
            <strong>{relatedArticle.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ScienceArticlePage({ params }) {
  const article = findArticle(params.categorySlug, params.articleSlug);
  if (!article) notFound();

  const category = categories.find((entry) => entry.slug === article.categorySlug);
  const faqs = article.faqs || [];

  return (
    <div className="science-page science-article-page py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(article)) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }}
        />
      )}

      <div className="science-article-shell">
        <header className="science-article-hero">
          <Link href={getScienceCategoryPath(article.categorySlug)} className="science-back-link">
            {category?.name || article.categoryName}
          </Link>
          <p className="best-of-eyebrow">Research Analysis</p>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <div className="science-article-meta">
            <span>Updated {article.lastUpdated}</span>
            <span>{article.readingTime}</span>
          </div>
        </header>

        <aside className="science-takeaways-box">
          <h2>Key Takeaways</h2>
          <ul>
            {(article.keyTakeaways || []).map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
          </ul>
        </aside>

        <article className="science-rich-article">
          <section className="science-disclaimer">
            <strong>Medical disclaimer:</strong> ThermaPeak is not medical advice. Research summaries are for informational purposes only. Consult a qualified health professional before beginning intense cold exposure, heat exposure, or recovery protocols.
          </section>

          {(article.sections || []).map((section) => (
            <section key={section.heading} className="science-content-section">
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.body }} />
            </section>
          ))}

          <section className="science-studies-section">
            <h2>Studies Reviewed</h2>
            <div className="science-study-list">
              {(article.studies || []).map((study) => (
                <article key={`${study.title}-${study.year}`} className="science-study-card">
                  <div className="science-study-heading">
                    <h3>{study.title}</h3>
                    <span className={`science-evidence-label ${evidenceClass(study.strength)}`}>
                      {study.strength || 'limited'} evidence
                    </span>
                  </div>
                  <p className="science-study-source">
                    {study.authors} · {study.publication} · {study.year}
                  </p>
                  <p>{study.summary}</p>
                  {study.url && <a href={study.url} target="_blank" rel="noopener noreferrer">View study</a>}
                </article>
              ))}
            </div>
          </section>

          {article.relatedCommercialLinks?.length > 0 && (
            <section className="science-related-section">
              <h2>Next Steps</h2>
              <p>Use these practical pages when you are ready to move from research context into buying or protocol decisions.</p>
              <div className="science-commercial-links">
                {article.relatedCommercialLinks.map((link) => (
                  <Link key={link.url} href={link.url} className="btn btn-primary-cta">
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <RelatedScienceLinks article={article} />

          {faqs.length > 0 && (
            <section className="science-faq-section">
              <h2>FAQ</h2>
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
        </article>
      </div>
    </div>
  );
}
