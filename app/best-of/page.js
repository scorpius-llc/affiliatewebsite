import Link from 'next/link';

export default function BestOf() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Best Robot Pool Cleaners: Curated Lists</h1>
      <p class="lead text-center mb-5">We've tested dozens of models to help you find the perfect cleaner for your specific pool and budget.</p>

      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100 border-primary">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Best Overall</h5>
              <p className="card-text">The top performers that balance price, features, and reliability.</p>
              <Link href="/bestof/overall" className="btn btn-primary mt-auto">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Best Value</h5>
              <p className="card-text">Great cleaning performance without breaking the bank.</p>
              <Link href="/bestof/value" className="btn btn-outline-primary mt-auto">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Best for Leaves</h5>
              <p className="card-text">Models with large baskets and powerful suction designed specifically for heavy debris.</p>
              <Link href="/bestof/leaves" className="btn btn-outline-primary mt-auto">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Best for Above-Ground</h5>
              <p className="card-text">Lightweight, compact cleaners perfect for smaller pools and flat floors.</p>
              <Link href="/bestof/above-ground" className="btn btn-outline-primary mt-auto">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Best for Vinyl Liners</h5>
              <p className="card-text">Gentle cleaners that won't damage or stretch your delicate pool liner.</p>
              <Link href="/bestof/vinyl" className="btn btn-outline-primary mt-auto">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Best for In-Ground</h5>
              <p className="card-text">Powerful machines built to handle deep ends, diving wells, and vertical walls.</p>
              <Link href="/bestof/inground" className="btn btn-outline-primary mt-auto">View List</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h3>Why Trust Our Lists?</h3>
          <p class="text-muted">Our rankings are based on real-world performance metrics, including cleaning cycle efficiency, filtration capacity, and long-term durability. We don't just look at the spec sheet; we look at how these robots perform in actual pools.</p>
        </div>
      </div>
    </div>
  );
}