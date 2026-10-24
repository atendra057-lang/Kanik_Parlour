import React from 'react';
import { X, Sparkles, CheckCircle2, Phone, Clock, DollarSign, Camera, Share2, Database } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import './OwnerChecklistModal.css';

export default function OwnerChecklistModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const items = [
    {
      icon: <Phone size={18} />,
      title: '1. Official Contact Phone Number',
      detail: 'Add the salon’s phone number to src/config/businessConfig.js under contact.phoneNumber so calling buttons can be activated.',
      status: businessConfig.contact.phoneNumber ? 'Configured' : 'Awaiting Owner Number',
      isReady: Boolean(businessConfig.contact.phoneNumber)
    },
    {
      icon: <Sparkles size={18} />,
      title: '2. WhatsApp Number for Bookings',
      detail: 'Add the 10-digit international WhatsApp number to contact.whatsappNumber to enable automatic 1-click WhatsApp customer enquiry messaging.',
      status: businessConfig.contact.whatsappNumber ? 'Configured' : 'Awaiting Owner WhatsApp',
      isReady: Boolean(businessConfig.contact.whatsappNumber)
    },
    {
      icon: <Clock size={18} />,
      title: '3. Confirmation of Daily Hours',
      detail: 'Confirm current operating hours (currently listed publicly as Mon–Sat: 9 AM–9 PM, Sun: 9 AM–6 PM).',
      status: 'Public Hours Displayed (Verification Recommended)',
      isReady: true
    },
    {
      icon: <DollarSign size={18} />,
      title: '4. Service Pricing & Bridal Packages',
      detail: 'Provide exact starting rates or bridal package inclusions if desired, otherwise cards maintain elegant "Enquire for pricing".',
      status: 'Set to "Enquire for Pricing"',
      isReady: true
    },
    {
      icon: <Camera size={18} />,
      title: '5. Real Client Transformation Photos',
      detail: 'Upload real client before-and-after photographs via the Transformation Manager to replace sample demonstration pairs.',
      status: 'Demo Pairs Operational',
      isReady: true
    },
    {
      icon: <Share2 size={18} />,
      title: '6. Social Media Accounts',
      detail: 'Provide valid URLs for Instagram and Facebook. Icons remain hidden until genuine links are configured.',
      status: 'Hidden Safely',
      isReady: true
    },
    {
      icon: <Database size={18} />,
      title: '7. Cloud Backend Credentials',
      detail: 'Connect Firebase or Cloud Storage for persistent multi-device photo uploads by following the step-by-step setup guide.',
      status: 'Ready for Connection',
      isReady: true
    }
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-container checklist-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checklist-modal-title"
      >
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">HANDOVER DOCUMENTATION</span>
            <h2 id="checklist-modal-title" className="modal-title">
              Owner Launch Verification
            </h2>
            <p className="modal-subtitle">
              Summary of business items required from the salon owner before publishing to production.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close verification checklist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="checklist-items-list">
            {items.map((item, idx) => (
              <div key={idx} className="checklist-row">
                <div className="checklist-row-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="checklist-row-content">
                  <div className="checklist-row-header">
                    <h4>{item.title}</h4>
                    <span className={`checklist-status-badge ${item.isReady ? 'ready' : 'pending'}`}>
                      {item.status}
                    </span>
                  </div>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checklist-footer-note">
            <CheckCircle2 size={16} />
            <span>
              All configuration values reside centrally in <code>src/config/businessConfig.js</code> for instant zero-hassle updates.
            </span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-primary w-full" onClick={onClose}>
              Got It · Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
