import React, { useState } from 'react';
import { Send } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        
        {/* Brand & Newsletter */}
        <div className="footer-brand-section">
          <h3 className="footer-logo">
            APEX<span className="text-glow-red">RC</span>
          </h3>
          <p className="footer-brand-desc">
            Designing high-performance, LED-illuminated RC vehicles built for racers who dare to dominate the dark.
          </p>
          
          {subscribed ? (
            <p className="sub-success text-glow-cyan">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Newsletter email input"
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-link-group">
            <h4 className="link-group-title">Products</h4>
            <ul className="link-list">
              <li><a href="#hero">RC Buggies</a></li>
              <li><a href="#hero" className="disabled-link">Rock Crawlers (Soon)</a></li>
              <li><a href="#hero" className="disabled-link">Accessories (Soon)</a></li>
              <li><a href="#hero" className="disabled-link">Spare Parts (Soon)</a></li>
            </ul>
          </div>
          
          <div className="footer-link-group">
            <h4 className="link-group-title">Support</h4>
            <ul className="link-list">
              <li><a href="#hero">Shipping Rates</a></li>
              <li><a href="#hero">Return Policy</a></li>
              <li><a href="#hero">Warranty Claim</a></li>
              <li><a href="#hero">Contact Us</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="container footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} APEX RC Store. All rights reserved.
        </p>
        
        <div className="social-links">
          <a href="https://github.com" aria-label="GitHub"><GithubIcon size={18} /></a>
          <a href="https://twitter.com" aria-label="Twitter"><TwitterIcon size={18} /></a>
          <a href="https://instagram.com" aria-label="Instagram"><InstagramIcon size={18} /></a>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #060708;
          border-top: 1px solid var(--border-color);
          padding: 80px 0 30px;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        @media (max-width: 900px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .footer-logo {
          font-family: var(--font-family-display);
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .footer-brand-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 380px;
        }

        .newsletter-form {
          display: flex;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 4px;
          max-width: 320px;
        }

        .newsletter-form:focus-within {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
        }

        .newsletter-form input {
          background: none;
          border: none;
          color: var(--text-primary);
          padding: 8px 12px;
          font-family: var(--font-family-body);
          font-size: 0.9rem;
          outline: none;
          flex: 1;
          width: 100%;
        }

        .newsletter-form button {
          background: var(--accent-cyan);
          color: #000;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .newsletter-form button:hover {
          background: var(--accent-cyan-hover);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }

        .sub-success {
          font-size: 0.9rem;
          font-weight: 600;
        }

        /* Links Grid */
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        .link-group-title {
          font-family: var(--font-family-display);
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        .link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .link-list a {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .link-list a:hover:not(.disabled-link) {
          color: var(--accent-cyan);
          padding-left: 4px;
        }

        .disabled-link {
          opacity: 0.4;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright-text {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-links a {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
        }

        .social-links a:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(0, 240, 255, 0.05);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
