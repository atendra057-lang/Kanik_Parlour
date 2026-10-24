import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertTriangle, Shield, Image, Trash2 } from 'lucide-react';
import './OwnerTransformationModal.css';

export default function OwnerTransformationModal({ isOpen, onClose, onAddTransformation }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'setup'
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hair Rebonding',
    description: '',
    beforeImageUrl: '',
    afterImageUrl: '',
    isPublished: true
  });

  const [previewBefore, setPreviewBefore] = useState(null);
  const [previewAfter, setPreviewAfter] = useState(null);
  const [testSliderPosition, setTestSliderPosition] = useState(50);
  const [statusMessage, setStatusMessage] = useState(null);

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

  if (!isOpen) return null;

  const handleFileChange = (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (target === 'before') {
        setPreviewBefore(result);
        setFormData((prev) => ({ ...prev, beforeImageUrl: result }));
      } else {
        setPreviewAfter(result);
        setFormData((prev) => ({ ...prev, afterImageUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a transformation title.');
      return;
    }
    if (!previewBefore || !previewAfter) {
      alert('Please upload both a before and an after photograph.');
      return;
    }

    const newRecord = {
      id: `owner-trans-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      categoryId: formData.category.toLowerCase().includes('makeup') ? 'makeup' : 'hair',
      beforeImage: previewBefore,
      afterImage: previewAfter,
      beforeLabel: 'Before Treatment',
      afterLabel: 'After Salon Finish',
      shortDescription: formData.description || 'Authentic client transformation at Kanik Beauty Parlour.',
      isPublished: formData.isPublished,
      isDemo: false
    };

    if (onAddTransformation) {
      onAddTransformation(newRecord);
    }

    setStatusMessage('Transformation successfully added to live presentation session!');
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-container owner-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-modal-title"
      >
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">PORTFOLIO ADMINISTRATION</span>
            <h2 id="owner-modal-title" className="modal-title">
              Transformation Manager
            </h2>
            <p className="modal-subtitle">
              Upload and manage authentic before-and-after client photography for the salon portfolio.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close owner management modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="owner-modal-tabs">
          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={14} />
            <span>Upload &amp; Live Test</span>
          </button>

          <button
            type="button"
            className={`owner-tab-btn ${activeTab === 'setup' ? 'active' : ''}`}
            onClick={() => setActiveTab('setup')}
          >
            <Shield size={14} />
            <span>Cloud Backend Guide</span>
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'upload' ? (
            <form onSubmit={handlePreviewSubmit} className="owner-upload-form">
              {/* Cloud Standby Notification */}
              <div className="owner-backend-alert">
                <AlertTriangle size={16} />
                <div>
                  <strong>Cloud Backend in Standby:</strong> No external Firebase/Supabase credentials are configured yet. Uploads made here will be previewed interactively in this session without exposing private keys.
                </div>
              </div>

              {statusMessage && (
                <div className="owner-status-success">
                  <Check size={16} />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="form-group">
                <label className="form-label">Transformation Title</label>
                <input
                  type="text"
                  placeholder="e.g. Silk Protein Hair Rebonding"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Haircuts & Styling">Haircuts &amp; Styling</option>
                  <option value="Hair Colour">Hair Colour &amp; Balayage</option>
                  <option value="Hair Rebonding">Hair Rebonding</option>
                  <option value="Hair Straightening">Hair Straightening</option>
                  <option value="Bridal & Occasion Makeup">Bridal &amp; Occasion Makeup</option>
                </select>
              </div>

              {/* Image Upload Row */}
              <div className="owner-dropzones-row">
                <div className="dropzone-box">
                  <span className="dropzone-label">1. Before Photograph</span>
                  <div className="dropzone-area">
                    {previewBefore ? (
                      <div className="dropzone-preview">
                        <img src={previewBefore} alt="Before preview" />
                        <button
                          type="button"
                          className="dropzone-remove-btn"
                          onClick={() => {
                            setPreviewBefore(null);
                            setFormData((p) => ({ ...p, beforeImageUrl: '' }));
                          }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    ) : (
                      <label className="dropzone-input-label">
                        <Image size={24} className="dropzone-icon" />
                        <span>Select Before Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'before')}
                          className="file-hidden-input"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="dropzone-box">
                  <span className="dropzone-label">2. After Photograph</span>
                  <div className="dropzone-area">
                    {previewAfter ? (
                      <div className="dropzone-preview">
                        <img src={previewAfter} alt="After preview" />
                        <button
                          type="button"
                          className="dropzone-remove-btn"
                          onClick={() => {
                            setPreviewAfter(null);
                            setFormData((p) => ({ ...p, afterImageUrl: '' }));
                          }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    ) : (
                      <label className="dropzone-input-label">
                        <Image size={24} className="dropzone-icon" />
                        <span>Select After Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'after')}
                          className="file-hidden-input"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Live Comparison Preview */}
              {previewBefore && previewAfter && (
                <div className="owner-live-preview-box">
                  <span className="preview-heading">Interactive Preview:</span>
                  <div className="owner-mini-stage">
                    <img src={previewAfter} alt="After test" className="owner-mini-img" />
                    <div
                      className="owner-mini-overlay"
                      style={{ clipPath: `inset(0 ${100 - testSliderPosition}% 0 0)` }}
                    >
                      <img src={previewBefore} alt="Before test" className="owner-mini-img" />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={testSliderPosition}
                    onChange={(e) => setTestSliderPosition(Number(e.target.value))}
                    className="owner-slider-range"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Client / Treatment Description (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Notes on technique, hair condition, or consultation advice..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary w-full">
                  <span>Add to Live Showcase</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="owner-setup-guide">
              <h3>Connecting Production Cloud Storage</h3>
              <p>
                To allow the salon owner to persist client photographs from anywhere with secure authentication, follow these 3 steps:
              </p>

              <ol className="setup-steps-list">
                <li>
                  <strong>Step 1: Create a Firebase / Cloud Storage Project</strong>
                  <p>Create a project at console.firebase.google.com and enable Firebase Authentication (Email/Password) and Cloud Storage.</p>
                </li>
                <li>
                  <strong>Step 2: Add Security Rules</strong>
                  <p>Restrict write and delete permissions strictly to the verified salon owner UID:</p>
                  <code>{`match /transformations/{imageId} {\n  allow read: if true;\n  allow write: if request.auth != null && request.auth.uid == 'SALON_OWNER_UID';\n}`}</code>
                </li>
                <li>
                  <strong>Step 3: Configure Environment Variables</strong>
                  <p>Add the public client API keys to your <code>.env.production</code> file (never commit private service account keys):</p>
                  <code>{`VITE_FIREBASE_API_KEY=your_api_key\nVITE_FIREBASE_PROJECT_ID=kanik-beauty\nVITE_FIREBASE_STORAGE_BUCKET=kanik-beauty.appspot.com`}</code>
                </li>
              </ol>

              <div className="security-guarantee-note">
                <Shield size={16} />
                <span>
                  <strong>Security Best Practice:</strong> The public site remains 100% resilient and functional without external credentials.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
