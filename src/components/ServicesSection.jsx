import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { servicesData, serviceCategories } from '../data/servicesData';
import './ServicesSection.css';

export default function ServicesSection({ onOpenAppointment }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = servicesData.filter((service) => {
    if (selectedCategory === 'all') return true;
    return service.categoryId === selectedCategory;
  });

  return (
    <section id="services" className="services-section section-wrapper" aria-label="Services Catalog">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow with-lines">WHAT WE OFFER</span>
          <h2 className="section-heading">Beauty, Tailored to You.</h2>
          <p className="section-desc">
            Explore our hair and makeup services, and enquire about the option
            that suits your style and occasion.
          </p>

          {/* Category Filter Tabs */}
          <div className="services-category-tabs" role="tablist" aria-label="Filter services by category">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="service-card-image"
                  loading="eager"
                  width="400"
                  height="300"
                />
                <span className="service-category-badge">{service.category}</span>
              </div>

              <div className="service-card-body">
                <div className="service-card-top">
                  <h3 className="service-card-title">{service.name}</h3>
                  <span className="service-pricing-badge">{service.priceDisplay}</span>
                </div>

                <p className="service-card-desc">{service.shortDescription}</p>

                <div className="service-card-footer">
                  <button
                    type="button"
                    className="service-enquire-btn"
                    onClick={() => onOpenAppointment(service.enquiryCategory)}
                    aria-label={`Enquire about ${service.name}`}
                  >
                    <span>Enquire About This Service</span>
                    <ArrowUpRight size={16} className="enquire-arrow-icon" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Informative Guidance Banner */}
        <div className="services-custom-banner">
          <div className="custom-banner-icon" aria-hidden="true">
            <Sparkles size={22} />
          </div>
          <div className="custom-banner-text">
            <h4>Personalized Consultations Available</h4>
            <p>
              Looking for something tailored or a combined styling package?
              Speak with our team to discuss your hair type, bridal needs, or event timings.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenAppointment('General Consultation')}
          >
            <span>Request Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
}
