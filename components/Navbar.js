import Link from 'next/link';
import config from '../data/config.json';
import { getActiveReviewCategories, getAllProductCategories } from '../lib/categoryRegistry';
import { getReviewCategoryPath, getScienceCategoryPath } from '../lib/routes';

export default function Navbar() {
  const reviewCategories = getActiveReviewCategories();
  const scienceCategories = getAllProductCategories();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/best-of', label: 'Best Of' },
    { href: '/comparisons', label: 'Comparisons' },
    { href: '/guides', label: 'Guides' },
    {
      href: '/science',
      label: 'The Science',
      dropdown: scienceCategories,
      dropdownHomeLabel: 'The Science Home',
      getDropdownHref: (category) => getScienceCategoryPath(category.slug),
    },
    {
      href: '/reviews',
      label: 'Reviews',
      dropdown: reviewCategories,
      dropdownHomeLabel: 'All Reviews',
      getDropdownHref: (category) => getReviewCategoryPath(category.slug),
    },
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
              <li key={item.href} className={`nav-item ${item.dropdown ? 'dropdown' : ''}`}>
                <Link
                  href={item.href}
                  className={`nav-link ${item.dropdown ? 'dropdown-toggle' : ''}`}
                  role={item.dropdown ? 'button' : undefined}
                  data-bs-toggle={item.dropdown ? 'dropdown' : undefined}
                  aria-expanded={item.dropdown ? 'false' : undefined}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <ul className="dropdown-menu dropdown-menu-dark science-nav-dropdown">
                    <li>
                      <Link href={item.href} className="dropdown-item">{item.dropdownHomeLabel}</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {item.dropdown.map((category) => (
                      <li key={category.slug}>
                        <Link href={item.getDropdownHref(category)} className="dropdown-item">
                          {category.navLabel || category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
