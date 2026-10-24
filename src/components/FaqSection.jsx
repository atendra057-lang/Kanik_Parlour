import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { faqData } from '../data/faqData';
import './FaqSection.css';

export default function FaqSection({ onOpenAppointment }) {
  // Open the first FAQ item by default
  const [openIds, setOpenIds] = useState(['faq-services']);

  const toggleFaq = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="faq-section section-wrapper" aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow with-lines">COMMON INQUIRIES</span>
          <h2 className="section-heading">Questions, Answered.</h2>
          <p className="section-desc">
            Helpful answers to common questions about services, location, and bookings at Kanik Beauty Parlour.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="faq-accordion-container">
          {faqData.map((item, index) => {
            const isOpen = openIds.includes(item.id);
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(item.id)}
                  >
                    <span className="faq-number">0{index + 1}</span>
                    <span className="faq-question-text">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq-answer-panel ${isOpen ? 'open' : ''}`}
                  hidden={!isOpen}
                >
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="faq-footer-cta">
          <div className="faq-footer-inner">
            <div className="faq-cta-icon" aria-hidden="true">
              <MessageSquare size={20} />
            </div>
            <div className="faq-cta-text">
              <h4>Have a specific enquiry not listed here?</h4>
              <p>We are happy to answer any questions regarding treatments, suitability, or appointment availability.</p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenAppointment('General Consultation')}
            >
              <span>Enquire Directly</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
