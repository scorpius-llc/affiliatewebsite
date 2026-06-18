import Link from 'next/link';
import {
  getApprovedAffiliateDestinations,
  getInternalFallbackCtas,
  getVendorDisclosureText,
  getVendorForProduct,
} from '../lib/vendorUtils';

export default function AffiliateButtons({
  product,
  size = 'md',
  className = '',
  buttonClassName = '',
  showDisclosure = false,
}) {
  const vendor = getVendorForProduct(product);
  const destinations = getApprovedAffiliateDestinations(product, vendor);
  const sizeClass = size ? `affiliate-button-group-${size}` : '';

  if (destinations.length > 0) {
    const disclosure = getVendorDisclosureText(vendor);

    return (
      <div className={`affiliate-button-group ${sizeClass} ${className}`.trim()}>
        {destinations.map((destination, index) => {
          const variantClass = index === 0 ? 'btn-primary-cta' : 'btn-secondary-cta';

          return (
            <a
              key={`${destination.key}-${destination.url}`}
              href={destination.url}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className={`btn ${variantClass} ${buttonClassName}`.trim()}
            >
              {destination.label}
            </a>
          );
        })}
        {showDisclosure && disclosure && <small className="review-disclosure">{disclosure}</small>}
      </div>
    );
  }

  const fallbackCtas = getInternalFallbackCtas(product).slice(0, 2);
  if (fallbackCtas.length === 0) return null;

  return (
    <div className={`affiliate-button-group ${sizeClass} ${className}`.trim()}>
      {fallbackCtas.map((cta, index) => {
        const variantClass = index === 0 ? 'btn-primary-cta' : 'btn-secondary-cta';

        return (
          <Link
            key={`${cta.key}-${cta.href}`}
            href={cta.href}
            className={`btn ${variantClass} ${buttonClassName}`.trim()}
          >
            {cta.label}
          </Link>
        );
      })}
    </div>
  );
}
