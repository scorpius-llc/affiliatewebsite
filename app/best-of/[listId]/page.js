import Link from 'next/link';
import { notFound } from 'next/navigation';
import bestLists from '../../../data/best-lists.json';
import products from '../../../data/products.json';

// Generate segments for all lists
export async function generateStaticParams() {
  return bestLists.map((list) => ({
    listId: list.id,
  }));
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const list = bestLists.find((l) => l.id === params.listId);
  if (!list) return {};

  return {
    title: `${list.title} - The Pool Lab`,
    description: list.description,
    openGraph: {
      title: list.title,
      description: list.description,
      images: ['https://via.placeholder.com/1200x630?text=The+Pool+Lab'],
    },
  };
}

export default function BestOfPage({ params }) {
  const list = bestLists.find((l) => l.id === params.listId);
  const amazonTag = "poolbotreviews-20";

  if (!list) {
    notFound();
  }

  // Merge list-specific product data with full product details
  const listProducts = list.products.map(item => {
    const productData = products.find(p => p.sku === item.sku);
    return productData ? { ...productData, ...item } : null;
  }).filter(Boolean);

  return (
    <div className="container my-5">
      {/* Header & Intro */}
      <header className="mb-5 text-center">
        <h1 className="display-4 mb-3">{list.title}</h1>
        <p className="lead">{list.description}</p>
      </header>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="mb-4" dangerouslySetInnerHTML={{ __html: list.intro }} />
          
          <div className="card bg-light mb-5">
            <div className="card-body">
              <h5 className="card-title">Selection Criteria</h5>
              <ul className="mb-0">
                {list.criteria.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Shortlist Summary (Cards) */}
      <h2 className="text-center mb-4">The Shortlist</h2>
      <div className="row mb-5">
        {listProducts.map(product => (
          <div key={product.sku} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 border-primary">
              <div className="card-header bg-primary text-white text-center fw-bold">
                {product.badge}
              </div>
              <div className="p-3 bg-white d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                <img 
                  src={product.image_url || 'https://via.placeholder.com/300x200'} 
                  className="img-fluid" 
                  alt={product.name}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title h6">{product.name}</h5>
                <p className="card-text small text-muted flex-grow-1">{product.reason}</p>
                <Link href={`#review-${product.sku}`} className="btn btn-outline-primary btn-sm mt-2">Read Mini-Review</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <h2 className="text-center mb-4">Comparison Table</h2>
      <div className="table-responsive mb-5">
        <table className="table table-striped table-hover border">
          <thead className="table-dark">
            <tr>
              <th>Model</th>
              <th>Best For</th>
              <th>Approx. Price</th>
              <th>Key Feature</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listProducts.map(product => {
              // Extract a key feature (first bullet point or generic)
              let keyFeature = "High Performance";
              if (product.features && product.features.includes('<li>')) {
                   const match = product.features.match(/<li><strong>(.*?)<\/strong>/);
                   if (match) keyFeature = match[1];
              }

              return (
                <tr key={product.sku}>
                  <td className="fw-bold">
                    <Link href={`/reviews/${product.sku}`} className="text-decoration-none">{product.name}</Link>
                  </td>
                  <td><span className="badge bg-info text-dark">{product.badge}</span></td>
                  <td>${product.approx_price}</td>
                  <td>{keyFeature}</td>
                  <td>
                    <a 
                      href={product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=${amazonTag}` : '#'} 
                      target="_blank" 
                      className={`btn btn-warning btn-sm fw-bold text-nowrap ${!product.asin ? 'disabled' : ''}`}
                    >
                      Check Price
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mini Reviews */}
      <h2 className="text-center mb-4">In-Depth Mini Reviews</h2>
      <div>
        {listProducts.map(product => (
          <div key={product.sku} id={`review-${product.sku}`} className="card mb-4">
            <div className="row g-0">
              <div className="col-md-4 text-center p-4 d-flex align-items-center justify-content-center bg-white">
                <img 
                  src={product.image_url || 'https://via.placeholder.com/300x200'} 
                  className="img-fluid rounded-start" 
                  alt={product.name} 
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h3 className="card-title h4">{product.name}</h3>
                      <span className="badge bg-primary mb-2">{product.badge}</span>
                    </div>
                    <div className="text-end">
                      <div className="h4 mb-0 text-primary">${product.approx_price}</div>
                    </div>
                  </div>
                  
                  <p className="card-text mt-3">{product.description}</p>
                  <p className="card-text"><strong>Why we picked it:</strong> {product.reason}</p>
                  
                  <div className="d-flex gap-2 mt-4">
                    <Link href={`/reviews/${product.sku}`} className="btn btn-outline-primary">Read Full Review</Link>
                    <a 
                      href={product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=${amazonTag}` : '#'} 
                      target="_blank" 
                      className={`btn btn-warning fw-bold ${!product.asin ? 'disabled' : ''}`}
                    >
                      Check Price on Amazon
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buying Advice */}
      <div className="row mt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card border-primary">
            <div className="card-header bg-primary text-white">
              <h3 class="h5 mb-0">Buying Advice</h3>
            </div>
            <div className="card-body" dangerouslySetInnerHTML={{ __html: list.buying_advice }} />
          </div>
        </div>
      </div>
    </div>
  );
}