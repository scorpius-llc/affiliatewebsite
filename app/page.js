import Link from 'next/link';
import articles from '../data/articles.json';

export default function Home() {
  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <>
      <header className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4">Dive into a Cleaner Pool</h1>
          <p className="lead">Your ultimate guide to robot pool cleaners, reviews, and maintenance tips.</p>
          <Link href="/reviews/" className="btn btn-primary btn-lg">Read Reviews</Link>
        </div>
      </header>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Latest Articles</h2>
            {sortedArticles.map((article) => (
              <article key={article.slug} className="mb-4">
                <h3><Link href={`/blog/${article.slug}/`}>{article.title}</Link></h3>
                <p className="text-muted">Posted on {article.date}</p>
                <p>{article.description}</p>
                <Link href={`/blog/${article.slug}/`} className="btn btn-outline-primary btn-sm">Read More</Link>
              </article>
            ))}
          </div>
          <div className="col-md-4">
            <div className="p-4 mb-3 bg-light rounded">
              <h4>About Us</h4>
              <p className="mb-0">We are passionate about keeping pools sparkling clean with the latest technology. Our reviews are unbiased and thorough.</p>
            </div>
            <div className="p-4">
              <h4>Quick Links</h4>
              <ul className="list-unstyled">
                <li><Link href="/best-of/">Best of 2023</Link></li>
                <li><Link href="/guides/maintenance-care/">Troubleshooting</Link></li>
                <li><Link href="/guides/cleaning-operation/">Daily Routine</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}