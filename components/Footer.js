import VersionInfo from './VersionInfo';
import config from '../data/config.json';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="container text-center">
        <p className="mb-1">{config.siteName} specializes in cold plunge and sauna recovery recommendations.</p>
        <ul className="list-inline mb-3">
          <li className="list-inline-item"><Link href="/best-of/cold-plunge-tubs">Best Cold Plunge Tubs</Link></li>
          <li className="list-inline-item"><Link href="/best-of/home-saunas">Best Home Saunas</Link></li>
          <li className="list-inline-item"><Link href="/guides/recovery-tools">Recovery Tools</Link></li>
        </ul>
        <p className="mb-1">&copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
        <VersionInfo />
      </div>
    </footer>
  );
}