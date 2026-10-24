import React from 'react';
import { ArrowDown, MapPin, Sparkles, Compass, Calendar } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import './HeroSection.css';

export default function HeroSection({ onOpenAppointment }) {
  return (
    <section id="home" className="hero-section" aria-label="Welcome to Kanik Beauty Parlour">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Column 1: Editorial Text Presentation (45%) */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <Sparkles size={14} className="hero-eyebrow-icon" aria-hidden="true" />
              <span>BEAUTY &amp; HAIR STUDIO · BER SARAI</span>
            </div>

            <h1 className="hero-heading">
              Your Beauty, <br />
              <span className="hero-heading-italic">Your Signature.</span>
            </h1>

            <p className="hero-description">
              From everyday hair care to special-occasion makeup, discover beauty
              services designed to help you feel confident, refreshed, and
              beautifully yourself.
            </p>

            <div className="hero-tags" aria-label="Core offerings">
              <span className="hero-tag">Haircuts</span>
              <span className="hero-tag-dot" aria-hidden="true">·</span>
              <span className="hero-tag">Styling</span>
              <span className="hero-tag-dot" aria-hidden="true">·</span>
              <span className="hero-tag">Colour</span>
              <span className="hero-tag-dot" aria-hidden="true">·</span>
              <span className="hero-tag">Rebonding</span>
              <span className="hero-tag-dot" aria-hidden="true">·</span>
              <span className="hero-tag">Bridal Makeup</span>
            </div>

            <div className="hero-actions">
              <a href="#services" className="btn btn-primary btn-lg">
                <span>Explore Our Services</span>
                <ArrowDown size={16} aria-hidden="true" />
              </a>

              <button
                type="button"
                className="btn btn-secondary btn-lg btn-book-hero"
                onClick={() => onOpenAppointment()}
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Book Appointment</span>
              </button>

              <a
                href={businessConfig.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg btn-find-us"
              >
                <Compass size={16} aria-hidden="true" />
                <span>Find Us</span>
              </a>
            </div>

            <div className="hero-location-preview">
              <MapPin size={15} className="hero-loc-pin" aria-hidden="true" />
              <span className="hero-loc-text">
                Shop No. 77, opposite JNU Campus, Ber Sarai, New Delhi 110016
              </span>
            </div>
          </div>

          {/* Column 2: Editorial Photography & Overlapping Visual Elements (55%) */}
          <div className="hero-media-wrapper">
            <div className="hero-image-frame">
              <img
                src="/images/hero-editorial.jpg"
                alt="Editorial beauty portrait showcasing glossy hair and refined makeup at Kanik Beauty Parlour"
                className="hero-image"
                width="640"
                height="853"
                fetchPriority="high"
                loading="eager"
              />

              {/* Floating Architectural Badge */}
              <div className="hero-floating-card" aria-hidden="true">
                <span className="floating-card-eyebrow">BER SARAI · NEW DELHI</span>
                <p className="floating-card-title">Dedicated Hair &amp; Makeup Care</p>
                <span className="floating-card-sub">Opposite JNU Campus</span>
              </div>

              {/* Subtle Decorative Backdrop Border */}
              <div className="hero-frame-accent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
