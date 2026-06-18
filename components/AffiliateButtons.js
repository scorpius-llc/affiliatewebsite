import { getAffiliateDestinations } from '../lib/affiliateLinks';

export default function AffiliateButtons({
  product,
  size = 'md',
  className = '',
  buttonClassName = '',
}) {
  const destinations = getAffiliateDestinations(product);

  if (destinations.length === 0) return null;

  const sizeClass = size ? `affiliate-button-group-${size}` : '';

  return (
    <div className={`affiliate-button-group ${sizeClass} ${className}`.trim()}>
      {destinations.map((destination, index) => {
        const variantClass = index === 0 ? 'btn-primary-cta' : 'btn-secondary-cta';

        return (
          <a
            key={`${destination.key}-${destination.url}`}
            href={destination.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`btn ${variantClass} ${buttonClassName}`.trim()}
          >
            {destination.label}
          </a>
        );
      })}
    </div>
  );
}
