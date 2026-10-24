import React from 'react';
import { Heart, Sparkles, Scissors } from 'lucide-react';
import './IntroductionSection.css';

export default function IntroductionSection() {
  const highlights = [
    {
      icon: <Scissors size={20} className="intro-feature-icon" />,
      title: 'Attentive Hair Care',
      desc: 'Precision cuts, personalized styling, and colour tailored to suit your everyday lifestyle.'
    },
    {
      icon: <Sparkles size={20} className="intro-feature-icon" />,
      title: 'Texture & Smoothing',
      desc: 'Professional rebonding and straightening treatments for sleek, manageable gloss.'
    },
    {
      icon: <Heart size={20} className="intro-feature-icon" />,
      title: 'Occasion & Bridal',
      desc: 'Thoughtfully customized makeup looks that highlight your natural features and celebration style.'
    }
  ];

  return (
    <section id="about" className="intro-section" aria-label="About Kanik Beauty Parlour">
      <div className="container">
        <div className="intro-card">
          <div className="intro-header">
            <span className="section-eyebrow with-lines">PHILOSOPHY</span>
            <h2 className="intro-heading">A Moment for You.</h2>
            <p className="intro-text">
              Beauty is personal. Whether you’re looking for a fresh hairstyle,
              a little everyday care, or makeup for a special occasion, the
              right service begins with understanding your preferences.
            </p>
          </div>

          <div className="intro-features-grid">
            {highlights.map((item, index) => (
              <div key={index} className="intro-feature-box">
                <div className="intro-icon-wrapper" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="intro-feature-title">{item.title}</h3>
                <p className="intro-feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="intro-footer-note">
            <span className="intro-local-badge">BER SARAI LOCAL STUDIO</span>
            <p className="intro-sub-note">
              Conveniently situated directly opposite JNU Campus in South Delhi, offering a warm and welcoming unisex salon experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
