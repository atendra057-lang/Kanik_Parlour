import React from 'react';
import { Calendar, Sparkles, Check } from 'lucide-react';
import './ConsultationSection.css';

export default function ConsultationSection({ onOpenAppointment }) {
  const points = [
    'Attentive discussion around your personal hair texture and preferences',
    'Customized styling suited to parties, festivities, and bridal celebrations',
    'Clear recommendations on maintenance and after-service care'
  ];

  return (
    <section className="consultation-section" aria-label="Beauty Consultation Experience">
      <div className="container">
        <div className="consultation-card">
          <div className="consultation-grid">
            {/* Visual Column */}
            <div className="consultation-image-wrapper">
              <img
                src="/images/consultation-experience.jpg"
                alt="Atmosphere of thoughtful salon consultation at Kanik Beauty Parlour"
                className="consultation-img"
                loading="eager"
                width="600"
                height="450"
              />
              <div className="consultation-badge" aria-hidden="true">
                <Sparkles size={16} />
                <span>Tailored Beauty Experience</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="consultation-content">
              <span className="section-eyebrow">CONSULTATION &amp; CARE</span>
              <h2 className="consultation-heading">
                Your Look. Your Occasion. <br />
                <span className="consultation-heading-accent">Your Way.</span>
              </h2>

              <p className="consultation-desc">
                Every look begins with an idea. Tell us what you’re looking for,
                and enquire about the service that best matches your preferences
                and occasion.
              </p>

              <ul className="consultation-points" aria-label="Consultation highlights">
                {points.map((point, index) => (
                  <li key={index} className="consultation-point-item">
                    <span className="consultation-check-icon" aria-hidden="true">
                      <Check size={14} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="consultation-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => onOpenAppointment('General Consultation')}
                >
                  <Calendar size={16} aria-hidden="true" />
                  <span>Enquire About a Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
