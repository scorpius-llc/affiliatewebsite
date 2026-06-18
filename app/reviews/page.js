'use client';

import { useState } from 'react';
import Link from 'next/link';
import products from '../../data/products.json';
import AffiliateButtons from '../../components/AffiliateButtons';
import { getReviewPath } from '../../lib/routes';

const FALLBACK_IMAGE = '/images/ThermaPeakLogo.png';

const getProductImage = (product) => {
  const image = product.image || FALLBACK_IMAGE;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/${image}`;
};

export default function Reviews() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('all');
  // Initialize with a value higher than any product price to show "Any" by default
  const [maxPrice, setMaxPrice] = useState(2000);

  const brands = [...new Set(products.map(p => p.brand))].sort();
  const productTypes = [...new Set(products.map(p => p.product_type).filter(Boolean))].sort();

  // Define the maximum value for the slider
  const SLIDER_MAX = 2000;

  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    const productTypeMatch = selectedProductType === 'all' || product.product_type === selectedProductType;
    // If maxPrice is at the slider's max, consider it "Any" (no price filter)
    const priceMatch = maxPrice >= SLIDER_MAX ? true : product.approx_price <= maxPrice;
    return brandMatch && productTypeMatch && priceMatch;
  });
  return (
    <div className="container my-5">
      <h1 className="mb-4">Cold Plunge & Sauna Reviews</h1>

      <div className="review-filter-panel row mb-4 p-3 rounded">
        <div className="col-md-4 col-lg-3">
          <label htmlFor="brandFilter" className="form-label">Brand</label>
          <select 
            id="brandFilter" 
            className="form-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 col-lg-3">
          <label htmlFor="productTypeFilter" className="form-label">Product Type</label>
          <select
            id="productTypeFilter"
            className="form-select"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
          >
            <option value="all">All Product Types</option>
            {productTypes.map(productType => (
              <option key={productType} value={productType}>{productType}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4 col-lg-3">
          <label htmlFor="priceFilter" className="form-label">
            Max Price: <span>{maxPrice >= SLIDER_MAX ? 'Any' : `$${maxPrice}`}</span>
          </label>
          <input 
            type="range" 
            className="form-range" 
            min="500" 
            max={SLIDER_MAX} 
            step="100" 
            id="priceFilter"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.sku} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0 me-3" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={getProductImage(product)} 
                      alt={product.name} 
                      className="img-fluid rounded"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text small text-muted">{product.description}</p>
                  </div>
                </div>
                
                <p className="card-text fw-bold mt-auto">Approx. Price: ${product.approx_price}</p>
                <div className="review-card-actions">
                  <Link href={getReviewPath(product.sku)} className="btn btn-outline-primary review-card-read-review">Read Review</Link>
                  <AffiliateButtons product={product} size="sm" className="review-card-secondary-actions" />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="lead text-muted">No products found matching your criteria.</p>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => { setSelectedBrand('all'); setSelectedProductType('all'); setMaxPrice(SLIDER_MAX); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
