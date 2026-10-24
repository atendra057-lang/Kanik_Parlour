import React from 'react';
import { Calendar, Navigation } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import { getSalonCurrentStatus } from '../utils/timeUtils';
import './MobileQuickBar.css';

export default function MobileQuickBar({ onOpenAppointment }) {
  const openingStatus = getSalonCurrentStatus();

  return (
    <aside className="mobile-quick-bar" aria-label="Quick Actions">
      <div className="mobile-quick-bar-inner">
        {/* Quick Status / Info */}
        <div className="quick-bar-status">
          <span className={`status-dot ${openingStatus.isOpen ? 'open' : 'closed'}`} />
          <span className="status-text">
            {openingStatus.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="quick-bar-actions">
          <a
            href={businessConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-quick-directions"
            aria-label="Get Directions to Kanik Beauty Parlour on Google Maps"
          >
            <Navigation size={16} aria-hidden="true" />
            <span>Directions</span>
          </a>

          <button
            type="button"
            className="btn-quick-book"
            onClick={onOpenAppointment}
            aria-label="Plan your visit and book an appointment enquiry"
          >
            <Calendar size={16} aria-hidden="true" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
