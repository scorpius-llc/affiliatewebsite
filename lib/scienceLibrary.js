import sciencePage from '../data/science-page.json';
import scienceArticles from '../data/science-articles.json';
import studies from '../data/studies.json';
import products from '../data/products.json';
import guides from '../data/guides.json';
import bestLists from '../data/best-lists.json';
import comparisons from '../data/comparisons.json';
import { getReviewPath, getScienceArticlePath } from './routes';
import { getProductPrimaryCategory } from './categoryRegistry';

const categoryMap = new Map((sciencePage.featured_categories || []).map((category) => [category.slug, category]));
const studyMap = new Map(studies.map((study) => [study.id, study]));
const articleMap = new Map(scienceArticles.map((article) => [article.id || article.slug, article]));

const productCategoryToScienceCategories = {
  'cold-exposure': ['cold-water-immersion', 'contrast-therapy', 'metabolism', 'mental-health', 'athletic-performance'],
  'sauna-heat-therapy': ['saunas', 'contrast-therapy', 'cardiovascular-health', 'longevity'],
  'red-light-therapy': ['red-light-therapy', 'inflammation', 'athletic-performance'],
  'sleep-recovery': ['sleep-recovery', 'mental-health', 'athletic-performance'],
  'performance-longevity': ['athletic-performance', 'longevity', 'contrast-therapy'],
};

const faqLibrary = {
  'science-medical-advice': {
    question: 'Is ThermaPeak medical advice?',
    answer: 'No. ThermaPeak summarizes research for informational purposes only and does not diagnose, treat, cure, or prevent medical conditions.',
  },
  'strongest-evidence': {
    question: 'What kind of evidence carries the most weight?',
    answer: 'Meta-analyses, systematic reviews, randomized controlled trials, and large human cohort studies usually carry more weight than isolated mechanistic or animal research.',
  },
  'how-studies-used': {
    question: 'How does ThermaPeak use studies across the site?',
    answer: 'Studies live in a central research library so reviews, comparisons, guides, and Best Of lists can reference the same evidence without duplicating claims.',
  },
  'cold-plunge-recovery-proof': {
    question: 'Do cold plunges prove better recovery?',
    answer: 'Research suggests cold water immersion may reduce perceived soreness in some settings, but protocols, timing, and training goals affect the trade-offs.',
  },
  'cold-after-lifting': {
    question: 'Should I cold plunge after lifting?',
    answer: 'If hypertrophy is the priority, avoid making cold exposure the default immediately after lifting because some evidence suggests it may blunt adaptation.',
  },
  'cold-mood-medical': {
    question: 'Can cold exposure treat mood disorders?',
    answer: 'No consumer cold plunge claim should be framed as treatment. Some users report alertness or mood effects, but clinical evidence is not strong enough for treatment claims.',
  },
  'cold-dopamine-proof': {
    question: 'Is the dopamine claim settled?',
    answer: 'No. Cold exposure may affect arousal and catecholamine pathways, but popular dopamine claims often go beyond the available consumer evidence.',
  },
  'brown-fat-fat-loss': {
    question: 'Will cold exposure cause fat loss through brown fat?',
    answer: 'Cold can activate brown fat biology, but that does not prove meaningful or reliable fat loss from consumer cold plunge use.',
  },
  'sauna-longevity-proof': {
    question: 'Do saunas prove longevity benefits?',
    answer: 'Sauna use has encouraging association data, especially in Finnish cohorts, but association does not prove sauna use alone causes longevity benefits.',
  },
  'sauna-safety': {
    question: 'Who should be cautious with sauna use?',
    answer: 'People with cardiovascular concerns, heat intolerance, pregnancy, or relevant medical conditions should consult a qualified health professional before intense heat exposure.',
  },
  'sauna-heart-rate': {
    question: 'Why does sauna affect heart rate?',
    answer: 'Heat exposure shifts blood flow toward cooling the body and can raise heart rate, making sauna sessions a meaningful physiological stressor.',
  },
  'contrast-therapy-proof': {
    question: 'Is contrast therapy proven?',
    answer: 'Contrast therapy has supportive evidence for some recovery outcomes, but protocols vary and sauna-plus-plunge routines may not match research water-bath protocols.',
  },
  'contrast-beginner': {
    question: 'How should beginners approach contrast therapy?',
    answer: 'Beginners should use conservative temperatures, shorter sessions, and gradual progression instead of chasing extreme heat or cold exposure.',
  },
  'red-light-proof': {
    question: 'Is red light therapy evidence strong?',
    answer: 'Some photobiomodulation research is promising, but outcomes depend on wavelength, dose, timing, treatment distance, and device output.',
  },
  'red-light-device-specs': {
    question: 'What red light device specs matter?',
    answer: 'Look for transparent wavelength, irradiance, treatment distance, dosing guidance, and safety information instead of relying on generic wellness claims.',
  },
  'sleep-recovery-foundation': {
    question: 'Why is sleep covered in a recovery tech site?',
    answer: 'Sleep is one of the strongest recovery foundations, so recovery devices should be evaluated against whether they support or distract from consistent sleep habits.',
  },
  'hrv-meaning': {
    question: 'What does HRV mean for recovery?',
    answer: 'HRV can reflect autonomic stress and recovery status, but it is noisy and should be interpreted as a trend rather than a single-day verdict.',
  },
  'hormesis-safe': {
    question: 'Is more stress always better for hormesis?',
    answer: 'No. Hormesis depends on dose and recovery. Extreme protocols can create unnecessary risk without improving outcomes.',
  },
};

const evidenceBadges = {
  'Meta-analysis': { stars: '★★★★★', label: 'Meta-analysis', className: 'science-evidence-strong' },
  'Systematic Review': { stars: '★★★★☆', label: 'Systematic Review', className: 'science-evidence-strong' },
  'Randomized Controlled Trial': { stars: '★★★★☆', label: 'Randomized Controlled Trial', className: 'science-evidence-moderate' },
  'Cohort Study': { stars: '★★★☆☆', label: 'Cohort Study', className: 'science-evidence-moderate' },
  'Observational Study': { stars: '★★☆☆☆', label: 'Observational Study', className: 'science-evidence-limited' },
  'Animal Study': { stars: '★☆☆☆☆', label: 'Animal Study', className: 'science-evidence-limited' },
  'Mechanistic Study': { stars: '★☆☆☆☆', label: 'Mechanistic Study', className: 'science-evidence-limited' },
};

const normalizeArticle = (article) => ({
  ...article,
  categorySlug: article.category,
  categoryName: categoryMap.get(article.category)?.name || article.category,
  description: article.meta_description || article.subtitle,
  summary: article.subtitle,
  heroImage: article.hero_image,
  lastUpdated: article.last_updated,
  readingTime: article.reading_time,
  keyTakeaways: article.key_takeaways || [],
});

export const getSciencePage = () => sciencePage;

export const getScienceCategories = () => sciencePage.featured_categories || [];

export const getScienceCategory = (categorySlug) => categoryMap.get(categorySlug) || null;

export const getPublishedScienceArticles = () =>
  scienceArticles.filter((article) => article.status === 'published').map(normalizeArticle);

export const getScienceArticlesByCategory = (categorySlug) =>
  getPublishedScienceArticles().filter((article) => article.categorySlug === categorySlug);

export const getScienceArticle = (categorySlug, articleSlug) =>
  getPublishedScienceArticles().find((article) => article.categorySlug === categorySlug && article.slug === articleSlug) || null;

export const getScienceArticleById = (articleId) => {
  const article = articleMap.get(articleId);
  return article && article.status === 'published' ? normalizeArticle(article) : null;
};

export const getStudies = () => studies;

export const getStudyById = (studyId) => studyMap.get(studyId) || null;

export const getArticleStudies = (article) =>
  (article.related_studies || article.relatedStudies || [])
    .map((studyId) => getStudyById(studyId))
    .filter(Boolean);

export const getRecentStudies = (limit = 6) =>
  [...studies]
    .sort((a, b) => String(b.last_reviewed || '').localeCompare(String(a.last_reviewed || '')))
    .slice(0, limit);

export const getEvidenceBadge = (evidenceLevel) =>
  evidenceBadges[evidenceLevel] || { stars: '★☆☆☆☆', label: evidenceLevel || 'Emerging Evidence', className: 'science-evidence-limited' };

export const getScienceFaqs = (faqIds = []) => faqIds.map((id) => faqLibrary[id]).filter(Boolean);

export const getRelatedProductsForScienceArticle = (article) =>
  (article.related_products || [])
    .map((sku) => products.find((product) => product.sku === sku))
    .filter(Boolean)
    .map((product) => ({
      ...product,
      href: getReviewPath(product.sku),
    }));

export const getRelatedGuidesForScienceArticle = (article) =>
  (article.related_guides || [])
    .map((guideId) => guides.find((guide) => guide.id === guideId))
    .filter(Boolean)
    .map((guide) => ({ ...guide, href: guide.link || `/guides/${guide.id}` }));

export const getRelatedBestListsForScienceArticle = (article) =>
  (article.related_best_lists || [])
    .map((listId) => bestLists.find((list) => list.id === listId))
    .filter(Boolean)
    .map((list) => ({ ...list, href: `/best-of/${list.id}` }));

export const getRelatedScienceArticles = (article) => {
  const studyIds = new Set(article.related_studies || []);
  return getPublishedScienceArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) =>
      candidate.categorySlug === article.categorySlug ||
      (candidate.related_studies || []).some((studyId) => studyIds.has(studyId))
    )
    .slice(0, 4);
};

export const getScienceCategoriesForProductCategory = (productCategorySlug) =>
  productCategoryToScienceCategories[productCategorySlug] || [];

export const getScienceArticlesForProductCategory = (productCategorySlug, limit = 4) => {
  const scienceCategories = new Set(getScienceCategoriesForProductCategory(productCategorySlug));
  return getPublishedScienceArticles()
    .filter((article) => scienceCategories.has(article.categorySlug))
    .slice(0, limit);
};

export const getStudiesForProductCategory = (productCategorySlug, limit = 3) =>
  studies
    .filter((study) => (study.product_categories || []).includes(productCategorySlug))
    .slice(0, limit);

export const getStudiesForProduct = (product, limit = 3) => {
  const primaryCategory = getProductPrimaryCategory(product);
  return primaryCategory ? getStudiesForProductCategory(primaryCategory, limit) : [];
};

export const getRelatedComparisonsForScienceArticle = (article) => {
  const text = `${article.title} ${article.subtitle} ${article.categorySlug}`.toLowerCase();
  return comparisons
    .filter((comparison) => {
      const payload = `${comparison.slug} ${comparison.title} ${comparison.description || ''} ${JSON.stringify(comparison)}`.toLowerCase();
      if (article.categorySlug === 'cold-water-immersion') return payload.includes('cold') || payload.includes('ice');
      if (article.categorySlug === 'saunas') return payload.includes('sauna') || payload.includes('infrared');
      if (article.categorySlug === 'contrast-therapy') return payload.includes('cold') || payload.includes('sauna') || payload.includes('cryotherapy');
      return payload.includes(text.split(' ')[0]);
    })
    .slice(0, 3);
};

export const getScienceArticleUrl = (article) => getScienceArticlePath(article.categorySlug, article.slug);
