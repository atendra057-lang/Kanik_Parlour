import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, User, Phone, MessageCircle, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { servicesData } from '../data/servicesData';
import './AppointmentModal.css';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Set today's date as minimum selectable date
  const todayDateString = new Date().toISOString().split('T')[0];

  // Pre-fill initial service when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: initialService || prev.service || servicesData[0].enquiryCategory
      }));
      setSubmissionResult(null);
      setErrors({});

      // Set focus to the first input
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialService]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    const phoneRegex = /^[0-9+() -]{8,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a desired service.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a preferred date.';
    } else if (formData.date < todayDateString) {
      newErrors.date = 'Appointment date cannot be in the past.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred appointment time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare clean message payload
    const enquiryMessage = `Hello Kanik Beauty Parlour,\n\nI would like to enquire about an appointment:\n- Name: ${formData.name}\n- Contact: ${formData.phone}\n- Service: ${formData.service}\n- Preferred Date: ${formData.date}\n- Preferred Time: ${formData.time}${formData.notes ? `\n- Notes: ${formData.notes}` : ''}\n\nLocation: Ber Sarai, New Delhi.`;

    // Check if verified WhatsApp number is configured
    const whatsappNum = businessConfig.contact.whatsappNumber;

    setTimeout(() => {
      setIsSubmitting(false);

      if (whatsappNum) {
        // Live WhatsApp integration when verified number is supplied
        const encoded = encodeURIComponent(enquiryMessage);
        const waUrl = `https://wa.me/${whatsappNum}?text=${encoded}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        setSubmissionResult({
          type: 'whatsapp_sent',
          message: 'Your enquiry was prepared in WhatsApp.',
          payload: enquiryMessage
        });
      } else {
        // Honesty compliance: destination number is not yet configured by owner
        setSubmissionResult({
          type: 'pending_owner_config',
          message: 'All enquiry details validated successfully.',
          payload: enquiryMessage
        });
      }
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
      >
        <div className="mobile-sheet-drag-handle" aria-hidden="true" />
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">ENQUIRY &amp; BOOKING</span>
            <h2 id="appointment-modal-title" className="modal-title">
              Let's Plan Your Visit.
            </h2>
            <p className="modal-subtitle">
              Tell us a little about the service you're interested in, and we'll help you take the next step.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close appointment dialogue"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submissionResult ? (
            <div className="modal-result-card">
              {submissionResult.type === 'whatsapp_sent' ? (
                <>
                  <div className="result-icon-success">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3>Enquiry Ready in WhatsApp</h3>
                  <p>{submissionResult.message}</p>
                </>
              ) : (
                <>
                  <div className="result-icon-info">
                    <Info size={32} />
                  </div>
                  <h3>Enquiry Validated · Demonstration Mode</h3>
                  <p className="result-desc">
                    All form fields were validated cleanly. Since the salon owner has not yet provided their verified WhatsApp or phone number, this enquiry was not dispatched to a fake destination.
                  </p>

                  <div className="prepared-message-box">
                    <span className="prepared-label">Prepared Message Payload:</span>
                    <pre className="prepared-text">{submissionResult.payload}</pre>
                  </div>

                  <div className="owner-config-note">
                    <AlertTriangle size={15} />
                    <span>
                      <strong>For Salon Owner:</strong> Enter your 10-digit mobile number in <code>src/config/businessConfig.js</code> to enable instant 1-click WhatsApp customer bookings.
                    </span>
                  </div>
                </>
              )}

              <div className="result-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSubmissionResult(null)}
                >
                  Edit Enquiry Details
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close Dialogue
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="appointment-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="app-name" className="form-label">
                  Your Full Name <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" aria-hidden="true" />
                  <input
                    ref={firstInputRef}
                    id="app-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name && (
                  <span id="name-error" className="form-error-msg">{errors.name}</span>
                )}
              </div>

              {/* Contact Phone */}
              <div className="form-group">
                <label htmlFor="app-phone" className="form-label">
                  Contact Phone Number <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" aria-hidden="true" />
                  <input
                    id="app-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                </div>
                {errors.phone && (
                  <span id="phone-error" className="form-error-msg">{errors.phone}</span>
                )}
              </div>

              {/* Desired Service Selection */}
              <div className="form-group">
                <label htmlFor="app-service" className="form-label">
                  Desired Service <span className="req">*</span>
                </label>
                <select
                  id="app-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`form-select ${errors.service ? 'error' : ''}`}
                  aria-required="true"
                >
                  <option value="">Select a service category</option>
                  <option value="Haircuts">Haircuts (Precision cut / restyling)</option>
                  <option value="Hair Styling">Hair Styling (Blowout / party styling)</option>
                  <option value="Hair Colour">Hair Colour (Global / balayage / highlights)</option>
                  <option value="Hair Rebonding">Hair Rebonding (Restructuring &amp; gloss)</option>
                  <option value="Hair Straightening">Hair Straightening (Smoothing &amp; anti-frizz)</option>
                  <option value="Bridal & Occasion Makeup">Makeup &amp; Bridal Makeup (Party or wedding)</option>
                  <option value="General Consultation">General Consultation / Package Enquiry</option>
                </select>
                {errors.service && (
                  <span className="form-error-msg">{errors.service}</span>
                )}
              </div>

              {/* Date & Time Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="app-date" className="form-label">
                    Preferred Date <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon" aria-hidden="true" />
                    <input
                      id="app-date"
                      name="date"
                      type="date"
                      min={todayDateString}
                      value={formData.date}
                      onChange={handleChange}
                      className={`form-input ${errors.date ? 'error' : ''}`}
                      aria-required="true"
                    />
                  </div>
                  {errors.date && (
                    <span className="form-error-msg">{errors.date}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="app-time" className="form-label">
                    Preferred Time <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Clock size={16} className="input-icon" aria-hidden="true" />
                    <select
                      id="app-time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`form-select ${errors.time ? 'error' : ''}`}
                      aria-required="true"
                    >
                      <option value="">Select time slot</option>
                      <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM – 4:00 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
                      <option value="Evening (4:00 PM – 8:00 PM)">Evening (4:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                  {errors.time && (
                    <span className="form-error-msg">{errors.time}</span>
                  )}
                </div>
              </div>

              {/* Optional Notes */}
              <div className="form-group">
                <label htmlFor="app-notes" className="form-label">
                  Additional Notes or Questions <span className="optional">(optional)</span>
                </label>
                <textarea
                  id="app-notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share details about your hair length, event date, or any specific styling requests..."
                  className="form-textarea"
                />
              </div>

              {/* Form Notice */}
              <p className="form-disclaimer">
                Enquiries are reviewed directly by the salon. Slot confirmation is subject to salon availability.
              </p>

              {/* Submit Buttons */}
              <div className="modal-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-submit-appointment w-full"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>{isSubmitting ? 'Validating...' : 'Submit Appointment Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
