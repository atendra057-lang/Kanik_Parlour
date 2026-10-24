import React from 'react';
import { MapPin, Clock, Navigation, ArrowUp, Sparkles } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { servicesData } from '../data/servicesData';
import './Footer.css';

export default function Footer({ onOpenAppointment, onOpenChecklist }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'About', href: '#about' },
    { label: 'Location & Hours', href: '#location' },
    { label: 'FAQ', href: '#faq' }
  ];

  const hasSocials = Boolean(businessConfig.contact.instagramUrl || businessConfig.contact.facebookUrl);

  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="container footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Description */}
          <div className="footer-col footer-col-brand">
            <div className="brand-wordmark">
              <span className="brand-name footer-brand-name">Kanik</span>
              <span className="brand-subtitle footer-brand-sub">BEAUTY PARLOUR</span>
            </div>

            <p className="footer-tagline">
              {businessConfig.shortDescription}
            </p>

            <div className="footer-appointment-cta">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => onOpenAppointment()}
              >
                <span>Plan Your Visit</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Offerings */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links-list">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="footer-link"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location & Operating Hours */}
          <div className="footer-col footer-col-location">
            <h4 className="footer-col-title">Location &amp; Hours</h4>
            <div className="footer-loc-item">
              <MapPin size={16} className="footer-icon" aria-hidden="true" />
              <div>
                <p className="footer-address-text">
                  Shop No. 77, opposite JNU Campus,<br />
                  Ber Sarai, New Delhi 110016
                </p>
                <a
                  href={businessConfig.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-directions-link"
                >
                  <Navigation size={13} aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            <div className="footer-loc-item">
              <Clock size={16} className="footer-icon" aria-hidden="true" />
              <div>
                <p className="footer-hours-text">Mon–Sat: 9:00 AM – 9:00 PM</p>
                <p className="footer-hours-text">Sun: 9:00 AM – 6:00 PM</p>
              </div>
            </div>

            {/* Social media links conditionally rendered ONLY if verified */}
            {hasSocials && (
              <div className="footer-socials">
                <span className="footer-social-label">Follow:</span>
                {businessConfig.contact.instagramUrl && (
                  <a
                    href={businessConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    Instagram
                  </a>
                )}
                {businessConfig.contact.facebookUrl && (
                  <a
                    href={businessConfig.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    Facebook
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} {businessConfig.businessName}. All rights reserved.
            </p>
            <span className="footer-separator" aria-hidden="true">·</span>
            <span className="footer-demo-tag">Demonstration &amp; Portfolio Build for Owner Presentation</span>
          </div>

          <div className="footer-bottom-right">
            <button
              type="button"
              onClick={onOpenChecklist}
              className="footer-checklist-btn"
            >
              <Sparkles size={13} aria-hidden="true" />
              <span>Owner Launch Checklist</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top-btn"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
