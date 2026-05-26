import VersionInfo from './VersionInfo';
import config from '../data/config.json';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="container text-center">
        <p className="mb-1">{config.siteName} specializes in cold plunge and sauna recovery recommendations.</p>
        <ul className="list-inline mb-3">
          <li className="list-inline-item"><Link href="/best-of/best-cold-plunge-tubs">Best Cold Plunge Tubs</Link></li>
          <li className="list-inline-item"><Link href="/best-of/best-home-saunas">Best Home Saunas</Link></li>
          <li className="list-inline-item"><Link href="/comparisons">Comparisons</Link></li>
          <li className="list-inline-item"><Link href="/guides">Guides</Link></li>
          <li className="list-inline-item"><Link href="/reviews">Reviews</Link></li>
        </ul>
        <ul className="list-inline mb-3 footer-subnav">
          <li className="list-inline-item"><Link href="/comparisons/cold-plunge-vs-ice-bath">Cold Plunge vs Ice Bath</Link></li>
          <li className="list-inline-item"><Link href="/comparisons/infrared-vs-traditional-sauna">Infrared vs Traditional Sauna</Link></li>
          <li className="list-inline-item"><Link href="/comparisons/cold-plunge-vs-cryotherapy">Cold Plunge vs Cryotherapy</Link></li>
          <li className="list-inline-item"><Link href="/comparisons/sauna-vs-steam-room">Sauna vs Steam Room</Link></li>
        </ul>
        <p className="mb-1">&copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
        <VersionInfo />
      </div>
    </footer>
  );
}
