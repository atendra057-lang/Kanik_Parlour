import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, AlertCircle, ArrowLeftRight } from 'lucide-react';
import './TransformationGallery.css';

export default function TransformationGallery({
  transformations,
  onOpenAppointment
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef(null);

  const activeTransformation = (transformations && transformations[activeIndex]) || null;

  // Handle pointer / touch dragging
  const handleMove = useCallback((clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let percentage = (x / width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onPointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [isDragging, handleMove]);

  // Keyboard navigation for accessible slider
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <section id="transformations" className="transformations-section section-wrapper" aria-label="Transformation Showcase">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow with-lines">THE TRANSFORMATION GALLERY</span>
          <h2 className="section-heading">Every Look Tells a Story.</h2>
          <p className="section-desc">
            Explore hair and beauty transformations, from a fresh new style to a
            look created for a special occasion.
          </p>

          {/* Authenticity Transparency Disclosure */}
          <div className="authenticity-badge" role="note">
            <AlertCircle size={15} aria-hidden="true" />
            <span>
              Interactive Demonstration Model · Owner can upload authentic client work via the management portal
            </span>
          </div>
        </div>

        {/* Gallery Controls & Record Selector */}
        {transformations && transformations.length > 0 && activeTransformation ? (
          <div className="gallery-layout">
            <div className="gallery-tabs" role="tablist" aria-label="Select transformation example">
              {transformations.map((item, index) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={activeIndex === index}
                  className={`gallery-tab-btn ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setSliderPosition(50);
                  }}
                >
                  <span className="tab-category">{item.category}</span>
                  <span className="tab-title">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Interactive Before & After Slider Stage */}
            <div className="slider-stage-wrapper">
              <div
                ref={sliderContainerRef}
                className="comparison-stage"
                onPointerDown={handlePointerDown}
                onTouchStart={handleTouchStart}
                tabIndex={0}
                role="slider"
                aria-label="Comparison slider to reveal before and after transformation"
                aria-valuenow={Math.round(sliderPosition)}
                aria-valuemin={0}
                aria-valuemax={100}
                onKeyDown={handleKeyDown}
              >
                {/* After Image (Background Canvas) */}
                <div className="slider-layer layer-after">
                  <img
                    src={activeTransformation.afterImage}
                    alt={`${activeTransformation.title} - After`}
                    className="slider-image"
                    draggable="false"
                  />
                  <span className="comparison-tag tag-after">
                    {activeTransformation.afterLabel || 'After'}
                  </span>
                </div>

                {/* Before Image (Clipped Overlay Canvas) */}
                <div
                  className="slider-layer layer-before"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={activeTransformation.beforeImage}
                    alt={`${activeTransformation.title} - Before`}
                    className="slider-image"
                    draggable="false"
                  />
                  <span className="comparison-tag tag-before">
                    {activeTransformation.beforeLabel || 'Before'}
                  </span>
                </div>

                {/* Vertical Divider & Draggable Handle */}
                <div
                  className="slider-divider-line"
                  style={{ left: `${sliderPosition}%` }}
                  aria-hidden="true"
                >
                  <div className="slider-handle">
                    <ArrowLeftRight size={16} />
                  </div>
                </div>
              </div>

              {/* Slider Instructions & Details */}
              <div className="slider-meta">
                <div className="slider-meta-left">
                  <h3 className="slider-active-title">{activeTransformation.title}</h3>
                  <p className="slider-active-desc">{activeTransformation.shortDescription}</p>
                </div>

                <div className="slider-meta-right">
                  <span className="slider-hint">
                    <SlidersHorizontal size={14} aria-hidden="true" />
                    Drag slider or use Arrow keys to compare
                  </span>

                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => onOpenAppointment(activeTransformation.category)}
                  >
                    <span>Enquire About This Look</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Intentional, polished empty state */
          <div className="gallery-empty-state">
            <div className="empty-state-icon">
              <Sparkles size={36} />
            </div>
            <h3>Transformations Portfolio In Preparation</h3>
            <p>
              Kanik Beauty Parlour is currently curating real client transformations.
              Check back soon or enquire directly to view styling portfolios.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
