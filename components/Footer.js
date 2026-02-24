import VersionInfo from './VersionInfo';
import config from '../data/config.json';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
        <small className="text-white-50">
          {config.siteName} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </small>
        <VersionInfo />
      </div>
    </footer>
  );
}