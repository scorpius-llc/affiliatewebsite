import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapClient from '../components/BootstrapClient';

export const metadata = {
  metadataBase: new URL('https://www.the-pool-lab.com'),
  title: 'The Pool Lab - Expert Robot Pool Cleaner Reviews',
  description: 'Find the best robot pool cleaner for your home. We provide in-depth reviews, top 10 lists, and maintenance guides.',
  openGraph: {
    title: 'The Pool Lab - Expert Robot Pool Cleaner Reviews',
    description: 'Find the best robot pool cleaner for your home.',
    url: 'https://www.the-pool-lab.com',
    siteName: 'The Pool Lab',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630?text=The+Pool+Lab',
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