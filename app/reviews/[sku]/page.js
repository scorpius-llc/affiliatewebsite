import Link from 'next/link';
import { notFound } from 'next/navigation';
import products from '../../../data/products.json';
import config from '../../../data/config.json';
import { getReviewPath, getReviewSlug } from '../../../lib/routes';

// Generate segments for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    sku: getReviewSlug(product.sku),
  }));
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const product = products.find((p) => getReviewSlug(p.sku) === params.sku);
  if (!product) return {};

  return {
    title: `${product.name} Review - ${config.siteName}`,
    description: product.description,
    alternates: {
      canonical: `https://${config.domain}${getReviewPath(product.sku)}`,
    },
    openGraph: {
      title: `${product.name} Review`,
      description: product.description,
      images: [product.image_url || 'https://via.placeholder.com/1200x630'],
    },
  };
}

export default function ReviewPage({ params }) {
  const product = products.find((p) => getReviewSlug(p.sku) === params.sku);
  const amazonTag = config.amazonAffiliateTag;

  if (!product) {
    notFound();
  }

  // Find alternatives with full details
  const alternatives = product.alternatives?.map(alt => {
    const fullAlt = products.find(p => p.sku === alt.sku);
    return fullAlt ? { ...alt, price: fullAlt.approx_price } : alt;
  }) || [];
  const merchantHref = product.asin
    ? `https://www.amazon.com/dp/${product.asin}?tag=${amazonTag}`
    : product.image_url;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-3">{product.name}: In-Depth Review</h1>

          <div className="text-center mb-4 p-3 bg-white rounded border" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Enforcing standard image container size */}
            <img 
              src={product.image_url || 'https://via.placeholder.com/600x400'} 
              alt={product.name} 
              className="img-fluid" 
              style={{ 
                maxHeight: '100%', 
                maxWidth: '100%', 
                objectFit: 'contain',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>

          <p className="lead">{product.long_description || product.description}</p>

          {product.who_is_this_for && (
            <>
              <h3 className="mt-5">Who This Is For</h3>
              <div dangerouslySetInnerHTML={{ __html: product.who_is_this_for }} />
            </>
          )}

          {product.who_should_skip && (
            <>
              <h3 className="mt-5">Who Should Skip It</h3>
              <div dangerouslySetInnerHTML={{ __html: product.who_should_skip }} />
            </>
          )}

          <h3 className="mt-5">Key Features</h3>
          <div dangerouslySetInnerHTML={{ __html: product.features || "Detailed feature list coming soon." }} />

          <h3 className="mt-5">Detailed Analysis</h3>
          <div dangerouslySetInnerHTML={{ __html: product.detailed_analysis || '<p class="text-muted">Detailed analysis coming soon.</p>' }} />

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card border-success h-100">
                <div className="card-header bg-success text-white">Pros</div>
                <ul className="list-group list-group-flush">
                  {product.pros?.map((pro, i) => (
                    <li key={i} className="list-group-item">{pro}</li>
                  )) || <li className="list-group-item">No pros listed.</li>}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-danger h-100">
                <div className="card-header bg-danger text-white">Cons</div>
                <ul className="list-group list-group-flush">
                  {product.cons?.map((con, i) => (
                    <li key={i} className="list-group-item">{con}</li>
                  )) || <li className="list-group-item">No cons listed.</li>}
                </ul>
              </div>
            </div>
          </div>

          <h3 className="mt-5">Final Verdict</h3>
          <p>{product.verdict || "Review coming soon."}</p>
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-body text-center">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Ready to buy? Get the best price online.</p>
              <a 
                href={merchantHref}
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className={`btn btn-warning btn-lg fw-bold w-100 ${!merchantHref ? 'disabled' : ''}`}
              >
                Check Current Price
              </a>
              
              <small className="text-muted d-block mt-2">We may earn a commission on qualifying purchases.</small>
            </div>

            {alternatives.length > 0 && (
              <div className="card mt-4">
                <div className="card-header bg-light fw-bold">Consider These Alternatives</div>
                <ul className="list-group list-group-flush">
                  {alternatives.map(alt => (
                    <li key={alt.sku} className="list-group-item d-flex justify-content-between align-items-center">
                      <Link href={getReviewPath(alt.sku)} className="text-decoration-none fw-bold">
                        {alt.name}
                      </Link>
                      <span className="badge bg-secondary rounded-pill">${alt.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
