import Link from 'next/link';

export const metadata = {
  title: 'Buying Guides - The Pool Lab',
  description: 'How to choose the right robot pool cleaner for your pool type and budget.',
};

export default function BuyingGuides() {
  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/guides">Guides</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Buying Guides</li>
        </ol>
      </nav>

      <h1 className="mb-4">Buying Guides</h1>
      <p className="lead mb-5">Choosing the right robot pool cleaner can be overwhelming. Here are the key factors to consider to make the best decision for your pool.</p>

      <div className="row">
        <div className="col-lg-8">
          <section className="mb-5">
            <h2>1. Know Your Pool Surface</h2>
            <p>The material of your pool dictates the type of tracks or brushes you need.</p>
            <ul>
              <li><strong>Gunite/Concrete:</strong> Most standard tracks work fine. You might want a model with a wire brush for better scrubbing.</li>
              <li><strong>Vinyl:</strong> Requires non-abrasive brushes (like foam or vibrating brushes) and tracks that won't leave black marks.</li>
              <li><strong>Fiberglass:</strong> Can be slippery. Look for robots with "super-grip" tracks or specific foam rollers to ensure they can climb walls.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2>2. Determine Your Pool Size</h2>
            <p>Cable length is critical. A robot with a 40-foot cable won't work in a 40-foot pool because the power supply sits away from the edge.</p>
            <div className="alert alert-info">
              <strong>Rule of Thumb:</strong> Measure the distance from your power outlet to the furthest corner of the pool, then add 10 feet. This is your minimum required cable length.
            </div>
          </section>

          <section className="mb-5">
            <h2>3. Cleaning Coverage Needs</h2>
            <p>Not all robots clean the same areas. Decide what matters most to you:</p>
            <ul>
              <li><strong>Floor Only:</strong> The cheapest option. Good for above-ground pools or if you brush walls manually.</li>
              <li><strong>Floor & Wall:</strong> The standard for in-ground pools. Climbs the wall but might not scrub the tile line.</li>
              <li><strong>Waterline Scrubbing:</strong> The premium feature. The robot climbs to the top and moves laterally to scrub the oil and pollen ring. Highly recommended.</li>
            </ul>
          </section>

          <section className="mb-5">
            <h2>4. Filtration Type</h2>
            <p>How you empty the debris matters for your sanity.</p>
            <ul>
              <li><strong>Top-Load Cartridges:</strong> The gold standard. Easy to lift out and rinse.</li>
              <li><strong>Filter Bags:</strong> Can hold a lot of fine dust but are messy to clean.</li>
              <li><strong>Bottom-Access:</strong> Requires flipping the heavy robot over. Avoid if you have back issues.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}