import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4">Dive into a Cleaner Pool</h1>
          <p className="lead">Your ultimate guide to robot pool cleaners, reviews, and maintenance tips.</p>
          <Link href="/reviews" className="btn btn-primary btn-lg">Read Reviews</Link>
        </div>
      </header>

      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Latest Articles</h2>
            <article className="mb-4">
              <h3><Link href="#">Why You Need a Robot Pool Cleaner</Link></h3>
              <p className="text-muted">Posted on October 25, 2023</p>
              <p>Robot pool cleaners are changing the way we maintain our pools. Learn why they are worth the investment...</p>
              <Link href="#" className="btn btn-outline-primary btn-sm">Read More</Link>
            </article>
            <article class="mb-4">
              <h3><Link href="#">Top 5 Features to Look For</Link></h3>
              <p className="text-muted">Posted on October 20, 2023</p>
              <p>Not all pool cleaners are created equal. Here are the top features you should consider before buying...</p>
              <Link href="#" className="btn btn-outline-primary btn-sm">Read More</Link>
            </article>
          </div>
          <div className="col-md-4">
            <div className="p-4 mb-3 bg-light rounded">
              <h4>About Us</h4>
              <p className="mb-0">We are passionate about keeping pools sparkling clean with the latest technology. Our reviews are unbiased and thorough.</p>
            </div>
            <div className="p-4">
              <h4>Quick Links</h4>
              <ul className="list-unstyled">
                <li><Link href="/top-lists">Best of 2023</Link></li>
                <li><Link href="/guides">Troubleshooting</Link></li>
                <li><Link href="/guides">Daily Routine</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}