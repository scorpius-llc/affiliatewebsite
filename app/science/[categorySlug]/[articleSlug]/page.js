import Link from 'next/link';
import { notFound } from 'next/navigation';
import config from '../../../../data/config.json';
import { getScienceArticlePath, getScienceCategoryPath } from '../../../../lib/routes';
import {
  getArticleStudies,
  getPublishedScienceArticles,
  getRelatedBestListsForScienceArticle,
  getRelatedComparisonsForScienceArticle,
  getRelatedGuidesForScienceArticle,
  getRelatedProductsForScienceArticle,
  getRelatedScienceArticles,
  getScienceArticle,
  getScienceCategory,
  getScienceFaqs,
} from '../../../../lib/scienceLibrary';

const URL = `https://${config.domain}`;
const OG_IMAGE_URL = `${URL}/images/ThermaPeakOG.png`;
const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const slugify = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getArticleSections = (article) =>
  Array.isArray(article.sections)
    ? article.sections
        .filter((section) => section && section.heading && section.body)
        .map((section, index) => ({
          ...section,
          anchorId: `section-${slugify(section.heading) || index + 1}`,
        }))
    : [];

export async function generateStaticParams() {
  return getPublishedScienceArticles().map((article) => ({
    categorySlug: article.categorySlug,
    articleSlug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const article = getScienceArticle(params.categorySlug, params.articleSlug);
  if (!article) return {};

  const canonicalUrl = `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`;

  return {
    title: article.meta_title || `${article.title} | ${config.siteName}`,
    description: article.meta_description || article.subtitle,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.meta_description || article.subtitle,
      url: canonicalUrl,
      images: [{ url: article.heroImage || OG_IMAGE_URL, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.meta_description || article.subtitle,
      images: [article.heroImage || OG_IMAGE_URL],
    },
  };
}

const buildArticleSchema = (article, studies) => {
  const canonicalUrl = `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.subtitle,
    url: canonicalUrl,
    dateModified: article.lastUpdated,
    image: article.heroImage || OG_IMAGE_URL,
    publisher: {
      '@type': 'Organization',
      name: config.siteName,
      url: URL,
      logo: `${URL}${config.logoPath}`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    citation: studies.map((study) => ({
      '@type': 'ScholarlyArticle',
      name: study.title,
      author: study.authors,
      isPartOf: study.journal,
      datePublished: String(study.publication_year),
      identifier: [study.doi ? `doi:${study.doi}` : null, study.pubmed_id ? `pubmed:${study.pubmed_id}` : null].filter(Boolean),
      url: study.url,
    })),
  };
};

const buildBreadcrumbSchema = (article, category) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'The Science',
      item: `${URL}/science`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: category?.name || article.categoryName,
      item: `${URL}${getScienceCategoryPath(article.categorySlug)}`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: article.title,
      item: `${URL}${getScienceArticlePath(article.categorySlug, article.slug)}`,
    },
  ],
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

function RelatedResourceInset({ title, items, getHref, getLabel, cardLabel }) {
  if (!items.length) return null;

  return (
    <aside className="science-related-commerce-inset" aria-label={title}>
      <h2>{title}</h2>
      <div className="science-related-commerce-list">
        {items.map((item) => (
          <Link key={getHref(item)} href={getHref(item)} className="science-related-commerce-card">
            <span>{cardLabel}</span>
            <strong>{getLabel(item)}</strong>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function ScienceTableOfContents({ sections }) {
  if (sections.length < 4) return null;

  return (
    <nav className="science-toc" aria-label="Science article table of contents">
      <p className="best-of-eyebrow">Article Guide</p>
      <h2>Table of Contents</h2>
      <ol>
        {sections.map((section) => (
          <li key={section.anchorId}>
            <a href={`#${section.anchorId}`}>{section.heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ScienceLongFormSections({ sections, insets = [] }) {
  if (!sections.length) return null;

  const insetsByIndex = insets.reduce((acc, inset) => {
    const sectionIndex = Math.max(0, Math.min(inset.sectionIndex, sections.length - 1));
    acc[sectionIndex] = acc[sectionIndex] || [];
    acc[sectionIndex].push(inset.node);
    return acc;
  }, {});

  return (
    <section className="science-longform-sections" aria-label="Article sections">
      {sections.map((section, index) => (
        <section key={section.anchorId} id={section.anchorId} className="science-content-section science-longform-section">
          <h2>{section.heading}</h2>
          {(insetsByIndex[index] || [])}
          <div
            className="science-section-body rich-copy"
            dangerouslySetInnerHTML={{ __html: section.body }}
          />
        </section>
      ))}
    </section>
  );
}

export default function ScienceArticlePage({ params }) {
  const article = getScienceArticle(params.categorySlug, params.articleSlug);
  if (!article) notFound();

  const category = getScienceCategory(article.categorySlug);
  const studies = getArticleStudies(article);
  const faqs = getScienceFaqs(article.faq_ids || []);
  const relatedProducts = getRelatedProductsForScienceArticle(article);
  const relatedGuides = getRelatedGuidesForScienceArticle(article);
  const relatedBestLists = getRelatedBestListsForScienceArticle(article);
  const relatedComparisons = getRelatedComparisonsForScienceArticle(article);
  const relatedScienceArticles = getRelatedScienceArticles(article);
  const sections = getArticleSections(article);
  const lastSectionIndex = Math.max(0, sections.length - 1);
  const bestListInsetIndex = Math.min(lastSectionIndex, Math.max(1, Math.floor(sections.length * 0.35)));
  const comparisonInsetIndex = Math.min(lastSectionIndex, Math.max(bestListInsetIndex + 2, Math.floor(sections.length * 0.7)));
  const longFormRelatedInsets = sections.length > 0
    ? [
        {
          sectionIndex: 0,
          node: (
            <RelatedResourceInset
              key="related-buying-guides-inset"
              title="Related Buying Guides"
              items={relatedGuides}
              getHref={(item) => item.href}
              getLabel={(item) => item.title}
              cardLabel="Guide"
            />
          ),
        },
        ...(sections.length > 1
          ? [{
              sectionIndex: bestListInsetIndex,
              node: (
                <RelatedResourceInset
                  key="related-best-lists-inset"
                  title="Related Best Of Lists"
                  items={relatedBestLists}
                  getHref={(item) => item.href}
                  getLabel={(item) => item.title}
                  cardLabel="Best Of"
                />
              ),
            }]
          : []),
        ...(sections.length > 2
          ? [{
              sectionIndex: comparisonInsetIndex,
              node: (
                <RelatedResourceInset
                  key="related-comparisons-inset"
                  title="Related Comparisons"
                  items={relatedComparisons}
                  getHref={(item) => `/comparisons/${item.slug}`}
                  getLabel={(item) => item.title}
                  cardLabel="Comparison"
                />
              ),
            }]
          : []),
      ]
    : [];

  const fallbackRelatedInsets = [
    ...(sections.length === 0
      ? [{
          node: (
            <RelatedResourceInset
              key="related-buying-guides-fallback"
              title="Related Buying Guides"
              items={relatedGuides}
              getHref={(item) => item.href}
              getLabel={(item) => item.title}
              cardLabel="Guide"
            />
          ),
        }]
      : []),
    ...(sections.length < 2
      ? [{
          node: (
            <RelatedResourceInset
              key="related-best-lists-fallback"
              title="Related Best Of Lists"
              items={relatedBestLists}
              getHref={(item) => item.href}
              getLabel={(item) => item.title}
              cardLabel="Best Of"
            />
          ),
        }]
      : []),
    ...(sections.length < 3
      ? [{
          node: (
            <RelatedResourceInset
              key="related-comparisons-fallback"
              title="Related Comparisons"
              items={relatedComparisons}
              getHref={(item) => `/comparisons/${item.slug}`}
              getLabel={(item) => item.title}
              cardLabel="Comparison"
            />
          ),
        }]
      : []),
  ];

  return (
    <div className="science-page science-article-page py-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(article, studies)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(article, category)) }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqs)) }} />}

      <div className="science-article-shell">
        <nav className="science-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/science">The Science</Link>
          <span>/</span>
          <Link href={getScienceCategoryPath(article.categorySlug)}>{category?.name || article.categoryName}</Link>
        </nav>

        <header className="science-article-hero">
          <p className="best-of-eyebrow">Research Analysis</p>
          <h1>{article.title}</h1>
          <p className="lead">{article.subtitle}</p>
          <div className="science-article-meta">
            <span>Updated {article.lastUpdated}</span>
            <span>{article.readingTime}</span>
            <span>{studies.length} studies referenced</span>
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

          <section className="science-content-section">
            <h2>Introduction</h2>
            <RelatedResourceInset
              title="Related Products"
              items={relatedProducts}
              getHref={(item) => item.href}
              getLabel={(item) => item.name}
              cardLabel="Review"
            />
            <p>{article.intro}</p>
          </section>

          <section className="science-content-section">
            <h2>Research Summary</h2>
            <p>{article.research_summary}</p>
          </section>

          <section className="science-content-section">
            <h2>What This Means for Consumers</h2>
            <p>{article.consumer_meaning}</p>
          </section>

          <ScienceTableOfContents sections={sections} />
          <ScienceLongFormSections sections={sections} insets={longFormRelatedInsets} />

          {fallbackRelatedInsets.map((inset) => inset.node)}

          {relatedScienceArticles.length > 0 && (
            <section className="science-related-section">
              <h2>Related Science Articles</h2>
              <div className="science-related-grid">
                {relatedScienceArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.slug} href={getScienceArticlePath(relatedArticle.categorySlug, relatedArticle.slug)} className="science-related-card">
                    <span>{relatedArticle.categoryName}</span>
                    <strong>{relatedArticle.title}</strong>
                  </Link>
                ))}
              </div>
            </section>
          )}

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

          {studies.length > 0 && (
            <section className="science-references-section">
              <h2>References</h2>
              <ol>
                {studies.map((study) => (
                  <li key={study.id}>
                    {study.authors}. {study.title}. <em>{study.journal}</em>. {study.publication_year}.
                    {study.doi && <> DOI: {study.doi}.</>}
                    {study.url && <> <a href={study.url} target="_blank" rel="noopener noreferrer">PubMed/source</a></>}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
