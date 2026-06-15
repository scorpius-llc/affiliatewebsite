import PageFaqs from '../../components/PageFaqs';
import config from '../../data/config.json';
import aboutContent from '../../data/about-page.json';

const title = `About ${config.siteName}`;
const description = `Learn about ${config.siteName}, our affiliate disclosure, and how we evaluate cold plunge, sauna, and recovery equipment.`;
const ogImageUrl = `https://${config.domain}/images/ThermaPeakOG.png`;

export const metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  alternates: {
    canonical: `https://${config.domain}/about`,
  },
  title,
  description,
  openGraph: {
    title,
    description,
    url: `https://${config.domain}/about`,
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
    title,
    description,
    images: [ogImageUrl],
  },
};

export default function About() {
  // Replace placeholders in the about page content
  const processedWhoWeAre = aboutContent.whoWeAre
    .replace('{siteName}', config.siteName)
    .replace('{author}', config.author);
  const processedPrivacyPolicy = aboutContent.privacyPolicy
    .replace(/{siteName}/g, config.siteName);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4 text-center">About {config.siteName}</h1>
          
          <section className="mb-5">
            <h2>Who We Are</h2>
            <p>{processedWhoWeAre}</p>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <h2>Affiliate Disclosure</h2>
            <div className="alert alert-light border">
              <p><strong>Transparency is important to us.</strong></p>
              <p>{config.siteName} is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, I earn from qualifying purchases.</p>
              <p>These commissions come at <strong>no extra cost to you</strong>. They help support the website, cover hosting costs, and allow us to continue creating free, high-quality content. We only recommend products that we believe will add value to our readers. Our reviews are based on thorough research and, whenever possible, hands-on testing.</p>
            </div>
          </section>

          <PageFaqs />

          <hr className="my-5" />

          <section className="mb-5">
            <h2>Privacy Policy</h2>
            <div dangerouslySetInnerHTML={{ __html: processedPrivacyPolicy }} />
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <h2>Contact Us</h2>
            <p>{aboutContent.contactIntro}</p>
            
            <form action={`mailto:${config.contactEmail}`} method="post" encType="text/plain">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="subject" className="form-label">Subject</label>
                <select className="form-select" id="subject" name="subject">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Partnership/Advertising">Partnership/Advertising</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </section>

        </div>
      </div>
    </div>
  );
}
