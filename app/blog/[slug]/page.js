import Link from 'next/link';
import { notFound } from 'next/navigation';
import articles from '../../../data/articles.json';

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
    title: `${article.title} - The Pool Lab`,
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
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            
            <div className="mt-5">
              <Link href="/reviews" className="btn btn-primary btn-lg">Find Your Perfect Robot</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}