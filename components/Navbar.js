import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">PoolBot Reviews</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/reviews" className="nav-link">Reviews</Link>
            </li>
            <li className="nav-item">
              <Link href="/best-of" className="nav-link">Best of</Link>
            </li>
            <li className="nav-item">
              <Link href="/guides" className="nav-link">Guides</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}