import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapClient from '../components/BootstrapClient';
import config from '../data/config.json';

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  title: `${config.siteName} - ${config.tagline}`,
  description: `Find the best ${config.siteName.toLowerCase()} for your home. We provide in-depth reviews, top 10 lists, and maintenance guides.`,
  openGraph: {
    title: `${config.siteName} - Expert Reviews`,
    description: `Find the best ${config.siteName.toLowerCase()} for your home.`,
    url: `https://${config.domain}`,
    siteName: config.siteName,
    images: [
      {
        url: `https://via.placeholder.com/1200x630?text=${config.siteName.replace(/ /g, '+')}`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}