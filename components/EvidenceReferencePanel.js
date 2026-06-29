import Link from 'next/link';
import { getScienceArticlePath } from '../lib/routes';
import { getEvidenceBadge, getScienceArticlesForProductCategory, getStudiesForProductCategory } from '../lib/scienceLibrary';

export default function EvidenceReferencePanel({ categorySlug, title = 'Research Context' }) {
  if (!categorySlug) return null;

  const studies = getStudiesForProductCategory(categorySlug, 3);
  const articles = getScienceArticlesForProductCategory(categorySlug, 3);

  if (!studies.length && !articles.length) return null;

  return (
    <section className="evidence-reference-panel mt-5">
      <p className="best-of-eyebrow">The Science</p>
      <h2>{title}</h2>
      <p>
        These references are pulled from ThermaPeak's central study library so research summaries stay consistent across reviews, guides, comparisons, and rankings.
      </p>
      {studies.length > 0 && (
        <div className="evidence-reference-list">
          {studies.map((study) => {
            const badge = getEvidenceBadge(study.evidence_level);
            return (
              <article key={study.id} className="evidence-reference-card">
                <span className={`science-evidence-label ${badge.className}`}>{badge.stars} {badge.label}</span>
                <h3>{study.title}</h3>
                <p>{study.consumer_takeaway}</p>
              </article>
            );
          })}
        </div>
      )}
      {articles.length > 0 && (
        <div className="science-commercial-links evidence-article-links">
          {articles.map((article) => (
            <Link key={article.slug} href={getScienceArticlePath(article.categorySlug, article.slug)} className="btn btn-secondary-cta">
              Read: {article.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
