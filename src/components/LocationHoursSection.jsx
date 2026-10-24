import React from 'react';
import { MapPin, Clock, Navigation, ExternalLink, AlertCircle } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { getSalonCurrentStatus } from '../utils/timeUtils';
import './LocationHoursSection.css';

export default function LocationHoursSection() {
  const currentStatus = getSalonCurrentStatus();

  // Get current day index in IST (0 = Sunday, 1 = Monday, etc.)
  const istDate = new Date();
  const istDayIndex = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short'
  }).format(istDate);

  const isSunday = istDayIndex === 'Sun';

  return (
    <section id="location" className="location-section section-wrapper" aria-label="Location and Operating Hours">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow with-lines">VISIT US</span>
          <h2 className="section-heading">We're Here for You.</h2>
          <p className="section-desc">
            Visit Kanik Beauty Parlour in Ber Sarai, opposite the JNU Campus, New Delhi.
          </p>
        </div>

        <div className="location-grid">
          {/* Column 1: Address, Hours, and Action Cards */}
          <div className="location-details-col">
            {/* Address Card */}
            <div className="location-card address-card">
              <div className="card-top-icon" aria-hidden="true">
                <MapPin size={22} />
              </div>
              <div className="address-content">
                <span className="card-eyebrow">OUR ADDRESS</span>
                <h3 className="location-business-name">{businessConfig.businessName}</h3>
                <p className="location-street">Shop No. 77, opposite JNU Campus,</p>
                <p className="location-area">Ber Sarai, New Delhi,</p>
                <p className="location-state">Delhi 110016, India.</p>

                <div className="location-landmark-badge">
                  <span className="landmark-label">Key Landmark:</span>
                  <span>Jawaharlal Nehru University (JNU), opposite the salon</span>
                </div>

                <div className="address-actions">
                  <a
                    href={businessConfig.maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <Navigation size={15} aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={businessConfig.maps.shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="location-card hours-card">
              <div className="card-top-icon" aria-hidden="true">
                <Clock size={22} />
              </div>
              <div className="hours-content">
                <div className="hours-header-flex">
                  <span className="card-eyebrow">OPERATING HOURS</span>
                  <span className={`status-pill ${currentStatus.badgeClass}`}>
                    {currentStatus.statusText}
                  </span>
                </div>

                <h3 className="hours-card-title">Salon Working Schedule</h3>

                <ul className="hours-schedule-list" aria-label="Daily operating schedule">
                  <li className={`schedule-item ${!isSunday ? 'active-today' : ''}`}>
                    <span className="schedule-days">Monday – Saturday</span>
                    <span className="schedule-time">9:00 AM – 9:00 PM</span>
                    {!isSunday && <span className="today-badge">Today</span>}
                  </li>
                  <li className={`schedule-item ${isSunday ? 'active-today' : ''}`}>
                    <span className="schedule-days">Sunday</span>
                    <span className="schedule-time">9:00 AM – 6:00 PM</span>
                    {isSunday && <span className="today-badge">Today</span>}
                  </li>
                </ul>

                <div className="hours-notice-box">
                  <AlertCircle size={14} aria-hidden="true" />
                  <span>
                    {businessConfig.openingHours.notice} Handover note: Please confirm holiday and seasonal schedules with the owner.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Location Map */}
          <div className="location-map-col">
            <div className="map-frame-wrapper">
              <div className="map-header-bar">
                <div className="map-indicator">
                  <span className="map-pulse-dot" aria-hidden="true" />
                  <span>Ber Sarai, opposite JNU Campus · New Delhi</span>
                </div>
                <a
                  href={businessConfig.maps.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-fullscreen-link"
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  <span>Larger Map</span>
                </a>
              </div>

              <iframe
                title="Kanik Beauty Parlour Location in Ber Sarai, New Delhi"
                src={businessConfig.maps.embedUrl}
                className="location-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="map-caption-bar">
                <span>Opposite JNU Campus Gate, Ber Sarai market area, South Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
