import React from 'react';
import { Calendar, Navigation } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';
import './MobileQuickBar.css';

export default function MobileQuickBar({ onOpenAppointment }) {
  return (
    <aside className="mobile-quick-bar" aria-label="Quick Actions">
      <div className="mobile-quick-bar-inner">
        <a
          href={businessConfig.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-quick-directions"
          aria-label="Get Directions to Kanik Beauty Parlour on Google Maps"
        >
          <Navigation size={17} aria-hidden="true" />
          <span>Directions</span>
        </a>

        <button
          type="button"
          className="btn-quick-book"
          onClick={onOpenAppointment}
          aria-label="Plan your visit and book an appointment enquiry"
        >
          <Calendar size={17} aria-hidden="true" />
          <span>Book Visit</span>
        </button>
      </div>
    </aside>
  );
}
