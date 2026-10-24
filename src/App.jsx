import React, { useState } from 'react';
import AnnouncementStrip from './components/AnnouncementStrip';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import IntroductionSection from './components/IntroductionSection';
import ServicesSection from './components/ServicesSection';
import ConsultationSection from './components/ConsultationSection';
import TransformationGallery from './components/TransformationGallery';
import LocationHoursSection from './components/LocationHoursSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import OwnerTransformationModal from './components/OwnerTransformationModal';
import OwnerChecklistModal from './components/OwnerChecklistModal';
import MobileQuickBar from './components/MobileQuickBar';
import { initialTransformationsData } from './data/transformationsData';
import './App.css';

export default function App() {
  const [transformations, setTransformations] = useState(initialTransformationsData);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [isOwnerManagerOpen, setIsOwnerManagerOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const handleOpenAppointment = (service = '') => {
    setSelectedService(service);
    setIsAppointmentOpen(true);
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
    setSelectedService('');
  };

  const handleAddTransformation = (newRecord) => {
    setTransformations((prev) => [newRecord, ...prev]);
  };

  return (
    <div className="site-root">
      {/* 1. Location & Status Announcement Strip */}
      <AnnouncementStrip onOpenChecklist={() => setIsChecklistOpen(true)} />

      {/* 2. Main Navigation Header */}
      <Navbar onOpenAppointment={() => handleOpenAppointment()} />

      <main id="main-content">
        {/* 3. Hero Section */}
        <HeroSection onOpenAppointment={() => handleOpenAppointment()} />

        {/* 4. Philosophy & Studio Highlights */}
        <IntroductionSection />

        {/* 5. Complete Services Catalog */}
        <ServicesSection onOpenAppointment={handleOpenAppointment} />

        {/* 6. Consultation Experience */}
        <ConsultationSection onOpenAppointment={handleOpenAppointment} />

        {/* 7. Interactive Before-and-After Transformation Gallery */}
        <TransformationGallery
          transformations={transformations}
          onOpenOwnerManager={() => setIsOwnerManagerOpen(true)}
          onOpenAppointment={handleOpenAppointment}
        />

        {/* 8. Physical Location & Hours */}
        <LocationHoursSection />

        {/* 9. Frequently Asked Questions */}
        <FaqSection onOpenAppointment={handleOpenAppointment} />
      </main>

      {/* 10. Refined Footer */}
      <Footer
        onOpenAppointment={() => handleOpenAppointment()}
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* 11. Sticky Mobile Quick Action Bar (Phone Viewport) */}
      <MobileQuickBar onOpenAppointment={() => handleOpenAppointment()} />

      {/* Interactive Modal Overlays */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={handleCloseAppointment}
        initialService={selectedService}
      />

      <OwnerTransformationModal
        isOpen={isOwnerManagerOpen}
        onClose={() => setIsOwnerManagerOpen(false)}
        onAddTransformation={handleAddTransformation}
      />

      <OwnerChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}
