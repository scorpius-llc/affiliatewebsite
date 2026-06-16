import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BootstrapClient from '../components/BootstrapClient';
import config from '../data/config.json';

// Function to replace topic placeholders
const replacePlaceholders = (text) => {
  return text
    .replace(/{topicPlural}/g, config.topicPlural)
    .replace(/{topicSingular}/g, config.topicSingular);
};

const siteTitle = `${config.siteName} - ${replacePlaceholders(config.tagline)}`;
const siteDescription = replacePlaceholders(config.tagline);
const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: `https://${config.domain}`,
    siteName: config.siteName,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="impact-site-verification" value="ad10f236-1238-4f2c-8f1c-31f06727db71" />
      </head>
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
