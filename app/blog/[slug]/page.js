import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles from '../../../data/articles.json';
import products from '../../../data/products.json';
import PageFaqs from '../../../components/PageFaqs';
import config from '../../../data/config.json';

// Generate segments for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: `${article.title} - ${config.siteName}`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default function BlogPost({ params }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Create a map of product SKUs to their ASINs for easy lookup
  const productAsinMap = products.reduce((acc, product) => {
    acc[product.sku] = product.asin;
    return acc;
  }, {});

  // Function to process placeholders in a string
  const processPlaceholders = (text) => {
    let processedText = text || '';
    const placeholders = processedText.match(/\{\{.*?\}\}/g) || [];
    placeholders.forEach(placeholder => {
      const key = placeholder.replace(/\{\{AFFILIATE_|\}\}/g, '');
      const sku = Object.keys(productAsinMap).find(k => k.toUpperCase().includes(key));
      if (sku) {
        const asin = productAsinMap[sku];
        const url = `https://www.amazon.com/dp/${asin}?tag=${config.amazonAffiliateTag}`;
        processedText = processedText.replace(placeholder, url);
      }
    });
    return processedText;
  };

  const processedContent = processPlaceholders(article.content);

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Blog</li>
        </ol>
      </nav>

      <article>
        <h1 className="mb-4">{article.title}</h1>
        <p className="text-muted mb-5">Posted on {article.date}</p>

        <div className="row">
          <div className="col-lg-8">
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            
            <PageFaqs />

            <div className="mt-5">
              <Link href="/reviews" className="btn btn-primary btn-lg">Find Your Perfect Robot</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}