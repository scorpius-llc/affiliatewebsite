'use client';

import { useState } from 'react';
import Link from 'next/link';
import products from '../../data/products.json';

export default function Reviews() {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1500);

  const brands = [...new Set(products.map(p => p.brand))].sort();

  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    const priceMatch = product.approx_price <= maxPrice;
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
          <label htmlFor="priceFilter" className="form-label">Max Price: <span>${maxPrice}</span></label>
          <input 
            type="range" 
            className="form-range" 
            min="500" 
            max="1500" 
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
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold">Approx. Price: ${product.approx_price}</p>
                <div className="mt-auto d-flex gap-2">
                  <Link href={`/reviews/${product.sku}`} className="btn btn-outline-primary flex-grow-1">Read Review</Link>
                  <a 
                    href={product.asin ? `https://www.amazon.com/dp/${product.asin}?tag=poolbotreviews-20` : '#'} 
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
      </div>
    </div>
  );
}