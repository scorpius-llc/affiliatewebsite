import Link from 'next/link';
import { notFound } from 'next/navigation';
import bestLists from '../../../data/best-lists.json';
import products from '../../../data/products.json';
import config from '../../../data/config.json';
import PageFaqs from '../../../components/PageFaqs';

// Helper function to format titles from snake_case
const formatTitle = (str) => {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export async function generateStaticParams() {
  return bestLists.map((list) => ({
    listId: list.id,
  }));
}

export async function generateMetadata({ params }) {
  const list = bestLists.find((l) => l.id === params.listId);
  if (!list) return {};

  const listProducts = list.products.map(item => products.find(p => p.sku === item.sku)).filter(Boolean);
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: list.title,
    description: list.description,
    itemListElement: listProducts.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://${config.domain}/reviews/${product.sku}`,
      name: product.name,
    })),
  };

  return {
    title: `${list.title} | ${config.siteName}`,
    description: list.description,
    alternates: {
      canonical: `https://${config.domain}/best-of/${params.listId}`,
    },
    openGraph: {
      title: list.title,
      description: list.description,
      url: `https://${config.domain}/best-of/${params.listId}`,
    },
    twitter: {
      title: list.title,
      description: list.description,
    },
    other: {
      'script[type="application/ld+json"]': JSON.stringify(itemListSchema),
    },
  };
}

export default function BestOfPage({ params }) {
  const list = bestLists.find((l) => l.id === params.listId);
  if (!list) notFound();

  const listProducts = list.products.map(item => {
    const productData = products.find(p => p.sku === item.sku);
    return productData ? { ...productData, ...item } : null;
  }).filter(Boolean);

  const comparisonProducts = list.featured_skus 
    ? list.featured_skus.map(sku => listProducts.find(p => p.sku === sku)).filter(Boolean)
    : listProducts;

  return (
    <div className="container my-5">
      <header className="mb-5 text-center">
        <h1 className="section-title">{list.title}</h1>
        <p className="section-subtitle">{list.description}</p>
      </header>

      <div className="row">
        <div className="col-lg-10 mx-auto">
          {list.intro && <div className="mb-5" dangerouslySetInnerHTML={{ __html: list.intro }} />}
          
          {list.comparison_table_title && list.comparison_columns && (
            <section className="mb-5">
              <h2 className="text-center section-title">{list.comparison_table_title}</h2>
              {list.comparison_table_intro && <p className="text-center text-muted mb-4">{list.comparison_table_intro}</p>}
              <div className="table-responsive">
                <table className="table table-striped table-hover border">
                  <thead className="table-dark">
                    <tr>
                      <th>Product</th>
                      {list.comparison_columns.map(col => <th key={col}>{formatTitle(col)}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonProducts.map(product => (
                      <tr key={product.sku}>
                        <td className="fw-bold"><Link href={`/reviews/${product.sku}`}>{product.name}</Link></td>
                        {list.comparison_columns.map(col => {
                          const value = product[col] || (product.score ? product.score[col] : undefined);
                          return <td key={col}>{value !== undefined ? String(value) : 'N/A'}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <h2 className="text-center section-title mt-5">Our Top Picks</h2>
          
          {listProducts.map((product, index) => (
            <div key={product.sku} id={`review-${product.sku}`} className="card mb-4">
              <div className="row g-0">
                <div className="col-md-4 text-center p-4 d-flex align-items-center justify-content-center bg-white">
                  <img 
                    src={product.image_url || (product.category === 'cold-plunge' ? product.image_fallback : '')} 
                    onError={(e) => { if (product.category === 'cold-plunge') e.currentTarget.src = product.image_fallback }}
                    className="img-fluid rounded-start" 
                    alt={product.name} 
                    style={{ maxHeight: '200px', objectFit: 'contain' }} 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="card-title h4">{`${index + 1}. ${product.name}`}</h3>
                        <span className="badge bg-primary mb-2">{product.badge}</span>
                      </div>
                      <div className="text-end">
                        <div className="h4 mb-0 text-primary">${product.approx_price}</div>
                      </div>
                    </div>
                    <div className="card-text mt-3" dangerouslySetInnerHTML={{ __html: product.reason }} />
                    <div className="d-flex gap-2 mt-4">
                      <Link href={`/reviews/${product.sku}`} className="btn btn-outline-primary">Read Full Review</Link>
                      {product.asin && <a href={`https://www.amazon.com/dp/${product.asin}?tag=${config.amazonAffiliateTag}`} target="_blank" className="btn btn-warning fw-bold">Check Price</a>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {list.ranking_methodology_title && (
            <section className="my-5 py-5 bg-card rounded">
              <div className="container">
                <h3 className="text-center section-title">{list.ranking_methodology_title}</h3>
                <div className="text-muted" dangerouslySetInnerHTML={{ __html: list.ranking_methodology }} />
              </div>
            </section>
          )}

          {list.buying_advice && (
            <section className="my-5">
              <div className="container">
                <h3 className="text-center section-title">Buying Advice</h3>
                <div className="text-muted" dangerouslySetInnerHTML={{ __html: list.buying_advice }} />
              </div>
            </section>
          )}

          <PageFaqs />
        </div>
      </div>
    </div>
  );
}
