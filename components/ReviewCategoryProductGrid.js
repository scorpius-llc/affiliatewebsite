'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AffiliateButtons from './AffiliateButtons';
import { getReviewPath } from '../lib/routes';

const FALLBACK_IMAGE = '/images/ThermaPeakLogo.png';

const getProductImage = (product) => {
  const image = product.image || FALLBACK_IMAGE;
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/${image}`;
};

const getAverageScore = (score) => {
  if (typeof score === 'number') return score;
  const values = Object.values(score || {}).filter((value) => typeof value === 'number');
  if (values.length === 0) return null;
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1));
};

const getDisplayScore = (product) => product.overallScore || getAverageScore(product.score);

const getBestFor = (product) => {
  if (product.bestFor) return product.bestFor;
  if (product.suitability?.beginner_friendly) return 'Beginners building a repeatable recovery routine';
  if (product.suitability?.small_space_friendly) return 'Small spaces and flexible home setups';
  if (product.suitability?.outdoor_ready) return 'Outdoor recovery spaces and frequent use';
  if (product.category === 'sauna') return 'Home sauna buyers comparing premium recovery options';
  return 'Home recovery buyers comparing long-term ownership value';
};

const getReviewSummary = (product) => product.reviewSummary || product.description || product.verdict;

export default function ReviewCategoryProductGrid({ products = [], categoryName = 'Category' }) {
  const [selectedBrand, setSelectedBrand] = useState('all');

  const brands = useMemo(() => [...new Set(products.map((product) => product.brand).filter(Boolean))].sort(), [products]);
  const filteredProducts = selectedBrand === 'all'
    ? products
    : products.filter((product) => product.brand === selectedBrand);

  return (
    <>
      {brands.length > 1 && (
        <div className="review-filter-panel review-category-filter-panel row mb-4 p-3 rounded">
          <div className="col-md-5 col-lg-4">
            <label htmlFor="categoryBrandFilter" className="form-label">Filter by Brand</label>
            <select
              id="categoryBrandFilter"
              className="form-select"
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
            >
              <option value="all">All {categoryName} Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="product-card-grid">
        {filteredProducts.map((product) => {
          const score = getDisplayScore(product);

          return (
            <article key={product.sku} className="product-category-product-card review-category-card">
              <div className="product-category-image-wrap">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="product-category-image"
                />
              </div>
              <div className="product-category-card-body">
                <p className="comparison-card-label">{product.brand}</p>
                <h2>{product.name}</h2>
                <p>{getReviewSummary(product)}</p>
                <div className="product-card-meta-row">
                  {getBestFor(product) && <span>Best for: {getBestFor(product)}</span>}
                  {score && <span>Score: {score}/10</span>}
                </div>
                <div className="product-card-actions">
                  <Link href={getReviewPath(product.sku)} className="btn btn-secondary-cta">Read Review</Link>
                  <AffiliateButtons product={product} size="sm" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="product-empty-state mt-4">
          <h2>No reviews match that brand.</h2>
          <p>Clear the brand filter to see every {categoryName.toLowerCase()} review.</p>
          <button type="button" className="btn btn-secondary-cta" onClick={() => setSelectedBrand('all')}>Clear Filter</button>
        </div>
      )}
    </>
  );
}
