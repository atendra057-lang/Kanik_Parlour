import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { getSalonCurrentStatus } from '../utils/timeUtils';
import './AnnouncementStrip.css';

export default function AnnouncementStrip({ onOpenChecklist }) {
  const status = getSalonCurrentStatus();

  return (
    <div className="announcement-strip" role="region" aria-label="Location and operating status">
      <div className="container announcement-inner">
        <div className="announcement-left">
          <MapPin size={13} className="announcement-icon" aria-hidden="true" />
          <span className="announcement-text">
            YOUR BEAUTY DESTINATION IN BER SARAI, NEW DELHI · OPPOSITE JNU CAMPUS
          </span>
        </div>

        <div className="announcement-right">
          <div className="announcement-status">
            <span className={`status-dot ${status.isOpen ? 'open' : 'closed'}`} aria-hidden="true" />
            <span className="status-label">{status.statusText}</span>
          </div>

          <button
            type="button"
            onClick={onOpenChecklist}
            className="announcement-checklist-btn"
            title="View owner launch verification checklist"
          >
            <Sparkles size={12} aria-hidden="true" />
            <span>Owner Checklist</span>
          </button>
        </div>
      </div>
    </div>
  );
}
