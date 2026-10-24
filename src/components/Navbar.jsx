import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import './Navbar.css';

export default function Navbar({ onOpenAppointment }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Scroll detection for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & accessibility for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'About', href: '#about' },
    { label: 'Contact & Hours', href: '#location' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Custom Typographic Wordmark */}
        <a href="#home" className="brand-wordmark" aria-label="Kanik Beauty Parlour - Home">
          <span className="brand-name">Kanik</span>
          <span className="brand-subtitle">BEAUTY PARLOUR</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Action Button */}
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-primary btn-appointment"
            onClick={() => onOpenAppointment()}
          >
            <Calendar size={15} aria-hidden="true" />
            <span>Book an Appointment</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer Navigation */}
      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-backdrop" onClick={closeMobileMenu} aria-hidden="true" />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
            <div className="brand-wordmark">
              <span className="brand-name">Kanik</span>
              <span className="brand-subtitle">BEAUTY PARLOUR</span>
            </div>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                closeMobileMenu();
                onOpenAppointment();
              }}
            >
              <Calendar size={16} aria-hidden="true" />
              <span>Book an Appointment</span>
            </button>

            <div className="mobile-info">
              <p className="mobile-address">{businessConfig.address.fullFormatted}</p>
              <p className="mobile-hours">Mon–Sat: 9:00 AM – 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
