'use client';

import { useState } from 'react';
import Link from 'next/link';
import products from '../../data/products.json';
import config from '../../data/config.json';

export default function Reviews() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  // Initialize with a value higher than any product price to show "Any" by default
  const [maxPrice, setMaxPrice] = useState(2000);

  const brands = [...new Set(products.map(p => p.brand))].sort();

  // Define the maximum value for the slider
  const SLIDER_MAX = 2000;

  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    // If maxPrice is at the slider's max, consider it "Any" (no price filter)
    const priceMatch = maxPrice >= SLIDER_MAX ? true : product.approx_price <= maxPrice;
    return brandMatch && priceMatch;
  });

  return (
    <div className="container my-5">
      <h1 className="mb-4">Robot Pool Cleaner Reviews</h1>

      <div className="row mb-4 p-3 bg-light rounded">
        <div className="col-md-4">
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
        <div className="col-md-4">
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
                      src={product.image_url || 'https://via.placeholder.com/100x100'} 
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
                <div className="d-flex gap-2">
                  <Link href={`/reviews/${product.sku}`} className="btn btn-outline-primary flex-grow-1">Read Review</Link>
                  <a 
                    href={product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=${config.amazonAffiliateTag}` : '#'}
                    target="_blank" 
                    className={`btn btn-warning flex-grow-1 fw-bold ${!product.asin ? 'disabled' : ''}`}
                  >
                    Check Price
                  </a>
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
              onClick={() => { setSelectedBrand('all'); setMaxPrice(SLIDER_MAX); }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}