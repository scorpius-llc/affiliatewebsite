export default function About() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4 text-center">About The Pool Lab</h1>
          
          <section className="mb-5">
            <h2>Who We Are</h2>
            <p>Welcome to The Pool Lab! I'm Tom, a pool enthusiast and tech geek who got tired of spending hours manually scrubbing my pool every weekend. My journey into the world of robotic pool cleaners began out of necessity, but it quickly turned into a passion for finding the most efficient, reliable, and cost-effective ways to keep a pool sparkling clean.</p>
            <p>I created this site to share my research, experiences, and honest opinions with fellow pool owners. Whether you have a small above-ground pool or a massive in-ground oasis, my goal is to help you cut through the marketing hype and find the perfect robot helper for your needs.</p>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <h2>Affiliate Disclosure</h2>
            <div className="alert alert-light border">
              <p><strong>Transparency is important to us.</strong></p>
              <p>The Pool Lab is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, I earn from qualifying purchases.</p>
              <p>These commissions come at <strong>no extra cost to you</strong>. They help support the website, cover hosting costs, and allow us to continue creating free, high-quality content. We only recommend products that we believe will add value to our readers. Our reviews are based on thorough research and, whenever possible, hands-on testing.</p>
            </div>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <h2>Privacy Policy</h2>
            <p>Your privacy is important to us. This privacy policy explains what personal data we collect and how we use it.</p>
            <ul>
              <li><strong>Log Files:</strong> Like many other Web sites, we make use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user's movement around the site, and gather demographic information. IP addresses, and other such information are not linked to any information that is personally identifiable.</li>
              <li><strong>Cookies:</strong> We use cookies to store information about visitors preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.</li>
              <li><strong>Third-Party Advertisers:</strong> Some of our advertising partners may use cookies and web beacons on our site. Our advertising partners include Amazon. These third-party ad servers or ad networks use technology to the advertisements and links that appear on The Pool Lab send directly to your browsers. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by the third-party ad networks to measure the effectiveness of their advertisements and / or to personalize the advertising content that you see.</li>
            </ul>
            <p>The Pool Lab has no access to or control over these cookies that are used by third-party advertisers.</p>
          </section>

          <hr className="my-5" />

          <section className="mb-5">
            <h2>Contact Us</h2>
            <p>Have a question about a specific model? Need advice for your pool setup? Or just want to say hello? Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form action="mailto:thomas@scorpius-llc.com" method="post" encType="text/plain">
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