import Link from 'next/link';

export const metadata = {
  title: 'Guides & Resources - Robot Pool Cleaner Reviews',
  description: 'Your complete resource for robot pool cleaner guides. Learn how to buy, clean, and maintain your robotic pool cleaner.',
};

export default function Guides() {
  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Pool Cleaner Guides & Resources</h1>
      <p class="lead text-center mb-5">Everything you need to know about owning, operating, and maintaining a robot pool cleaner.</p>

      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">Buying Guides</h5>
              <p className="card-text">How to choose the right cleaner for your pool type and budget. We break down the key features you need.</p>
              <Link href="/guides/buying-guides" className="btn btn-outline-primary mt-auto">Read Guide</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">Cleaning & Operation</h5>
              <p className="card-text">Best practices for daily use. Learn how to launch, run, and retrieve your robot for maximum efficiency.</p>
              <Link href="/guides/cleaning-operation" className="btn btn-outline-primary mt-auto">Read Guide</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">Maintenance & Care</h5>
              <p className="card-text">Protect your investment. Tips on filter cleaning, cable management, and proper storage to extend your robot's life.</p>
              <Link href="/guides/maintenance-care" className="btn btn-outline-primary mt-auto">Read Guide</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h3>Why Read Our Guides?</h3>
          <p class="text-muted">A robot pool cleaner is a significant investment. Our guides are written by experts to help you avoid common mistakes, save money on repairs, and get the best possible cleaning results for years to come.</p>
        </div>
      </div>
    </div>
  );
}