import Link from 'next/link';

export default function Guides() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Pool Cleaner Guides & Resources</h1>
      <p class="lead text-center mb-5">Everything you need to know about owning, operating, and maintaining a robot pool cleaner.</p>

      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Buying Guides</h5>
              <p class="card-text">How to choose the right cleaner for your pool type and budget.</p>
              <Link href="#buying-guides" className="btn btn-outline-primary">Read More</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Cleaning & Operation</h5>
              <p class="card-text">Best practices for daily use and maximizing cleaning cycles.</p>
              <Link href="#cleaning-guide" className="btn btn-outline-primary">Read More</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Maintenance & Care</h5>
              <p class="card-text">Tips to extend the life of your robot and keep it running smoothly.</p>
              <Link href="#maintenance-guide" className="btn btn-outline-primary">Read More</Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <section id="buying-guides" className="mb-5">
        <h2>Buying Guides</h2>
        <p>Choosing the right robot pool cleaner can be overwhelming. Here are the key factors to consider:</p>
        <ul>
          <li><strong>Pool Surface:</strong> Ensure the cleaner's tracks/wheels are compatible with your pool (gunite, vinyl, fiberglass).</li>
          <li><strong>Pool Size:</strong> Check the cable length. It should be at least 10 feet longer than your pool's length.</li>
          <li><strong>Cleaning Coverage:</strong> Do you need just floor cleaning, or walls and waterline too?</li>
          <li><strong>Filtration:</strong> Consider top-load cartridges for ease of use versus bags for capacity.</li>
        </ul>
      </section>

      <hr className="my-5" />

      <section id="cleaning-guide" className="mb-5">
        <h2>Cleaning & Operation Guide</h2>
        <div className="row">
          <div className="col-md-6">
            <h3>Before You Start</h3>
            <ul className="list-group mb-4">
              <li className="list-group-item">Remove large debris like branches or toys from the pool manually.</li>
              <li className="list-group-item">Check the chemical balance of your pool water. High chlorine or low pH can damage the cleaner over time.</li>
              <li className="list-group-item">Ensure the filters are clean and installed correctly.</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h3>During Operation</h3>
            <ul className="list-group mb-4">
              <li className="list-group-item">Place the cleaner in the pool and let it sink to the bottom before turning it on.</li>
              <li className="list-group-item">Spread the cable out over the water surface to prevent tangling.</li>
              <li className="list-group-item">Let the cleaner run its full cycle for the best results.</li>
            </ul>
          </div>
        </div>
        <div className="alert alert-info mt-3" role="alert">
          <strong>Pro Tip:</strong> If your pool is exceptionally dirty, you might need to run two cycles, cleaning the filters in between.
        </div>
      </section>

      <hr className="my-5" />

      <section id="maintenance-guide" className="mb-5">
        <h2>Maintenance & Care</h2>
        <div className="accordion" id="maintenanceAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Cleaning the Filters
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#maintenanceAccordion">
              <div className="accordion-body">
                <strong>Regularly clean the filters.</strong> After every cleaning cycle, remove the filter cartridges or bags and rinse them thoroughly with a garden hose. This prevents clogging and ensures optimal suction power.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Checking the Brushes
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#maintenanceAccordion">
              <div className="accordion-body">
                <strong>Inspect brushes for wear.</strong> Over time, the scrubbing brushes can wear down. Check them periodically and replace them if they look worn or if the cleaner is having trouble climbing walls.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                Cable Care
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#maintenanceAccordion">
              <div className="accordion-body">
                <strong>Prevent cable tangling.</strong> To avoid tangles, fully unwind the cable before use. After the cycle, coil the cable loosely. If your cleaner has a swivel, make sure it's rotating freely.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                Proper Storage
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#maintenanceAccordion">
              <div className="accordion-body">
                <strong>Store in a cool, dry place.</strong> When not in use, store your robot cleaner and its power supply out of direct sunlight and rain. A caddy is a great investment for easy storage and transport.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}