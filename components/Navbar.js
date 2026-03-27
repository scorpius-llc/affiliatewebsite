import Link from 'next/link';
import config from '../data/config.json';

export default function Navbar() {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/best-of', label: 'Best Of' },
    { href: '/comparisons', label: 'Comparisons' },
    { href: '/guides', label: 'Guides' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          {/* Logo - 16:9 Aspect Ratio */}
          <div style={{ width: '160px', height: '90px', position: 'relative' }}>
            <img 
              src={config.logoPath}
              alt={`${config.siteName} Logo`} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span className="visually-hidden">{config.siteName}</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li key={item.href} className="nav-item">
                <Link href={item.href} className="nav-link">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
