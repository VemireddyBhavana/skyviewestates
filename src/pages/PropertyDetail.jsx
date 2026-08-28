import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import { PROPERTIES } from '../constants/data';
import AnimatedSection from '../components/Common/AnimatedSection';
import EMICalculator from '../components/Common/EMICalculator';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = PROPERTIES.find(p => p.id === parseInt(id));
  
  const [bookingStep, setBookingStep] = useState('select'); // 'select', 'payment', 'success'
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  // Media Gallery states
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = property ? [
    property.image,
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000"
  ] : [];


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="no-results" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Navbar />
        <h2>Property not found</h2>
        <button className="btn-primary" onClick={() => navigate('/designs')} style={{ marginTop: '20px' }}>
          Back to Designs
        </button>
      </div>
    );
  }

  const goToPayment = () => setBookingStep('payment');
  
  const handlePaymentComplete = () => {
    localStorage.setItem('selectedDesign', JSON.stringify(property));
    setBookingStep('success');
  };

  return (
    <div className="property-detail-page">
      <header className="detail-hero">
        <div className="detail-hero-img" style={{ backgroundImage: `url(${property.image})` }}></div>
        <div className="detail-hero-overlay"></div>
        <Navbar />
        <div className="detail-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="property-category">
              {property.category} {property.subCategory ? `• ${property.subCategory}` : ''}
            </span>
            <h1 className="detail-title">{property.title}</h1>
            <div className="detail-price-tag">{property.price}</div>
          </motion.div>
        </div>
      </header>

      <div className="section-container">
        <div className="detail-main-grid">
          <div className="detail-info-col">
            <AnimatedSection direction="up">
              <div className="detail-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Bedrooms</span>
                  <span className="spec-value">{property.beds}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Bathrooms</span>
                  <span className="spec-value">{property.baths}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Square Ft</span>
                  <span className="spec-value">{property.sqft}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Property ID</span>
                  <span className="spec-value">#SKY-{property.id}</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="detail-description">
                <h2>Description</h2>
                <div className="teal-line left" style={{ margin: '20px 0' }}></div>
                <p>{property.description}</p>
                <p>
                  Experience the epitome of luxury living in this architectural masterpiece. 
                  Every detail has been meticulously crafted to offer unparalleled comfort and sophistication. 
                  From the sprawling living areas to the gourmet kitchen and private outdoor sanctuary, 
                  this home is designed for the most discerning homeowners.
                </p>
              </div>
            </AnimatedSection>

            {/* Premium Media Showcase Dashboard */}
            <AnimatedSection direction="up" delay={0.25}>
              <div className="property-media-dashboard">
                <h2>Property Media Showcase</h2>
                <div className="teal-line left" style={{ margin: '20px 0' }}></div>

                <div className="media-content-area">
                  <div className="photos-carousel-view">
                    <div className="main-carousel-slide" style={{ backgroundImage: `url(${galleryImages[galleryIndex]})` }}>
                      <button 
                        className="carousel-nav-btn prev"
                        onClick={() => setGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                      >
                        ‹
                      </button>
                      <button 
                        className="carousel-nav-btn next"
                        onClick={() => setGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                      >
                        ›
                      </button>
                      <div className="slide-counter-badge">
                        {galleryIndex + 1} / {galleryImages.length}
                      </div>
                    </div>
                    <div className="carousel-thumbnails-row hide-scrollbar">
                      {galleryImages.map((img, idx) => (
                        <div 
                          key={idx}
                          className={`carousel-thumb-wrapper ${galleryIndex === idx ? 'active' : ''}`}
                          onClick={() => setGalleryIndex(idx)}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Embedded styles for Media Showcase */}
            <style dangerouslySetInnerHTML={{ __html: `
              .property-media-dashboard {
                background: var(--bg-secondary);
                border: 1px solid var(--border);
                border-radius: 24px;
                padding: 40px;
                box-shadow: var(--shadow-gold);
                margin: 40px 0;
              }

              .media-content-area {
                border-radius: 18px;
                overflow: hidden;
                background: #000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                border: 1px solid rgba(212, 175, 55, 0.15);
              }

              .photos-carousel-view {
                display: flex;
                flex-direction: column;
              }

              .main-carousel-slide {
                height: 450px;
                background-size: cover;
                background-position: center;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
                transition: background-image 0.5s ease-in-out;
              }

              .carousel-nav-btn {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #fff;
                font-size: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
                user-select: none;
              }

              .carousel-nav-btn:hover {
                background: var(--primary);
                color: #000;
                border-color: var(--primary);
                transform: scale(1.1);
              }

              .slide-counter-badge {
                position: absolute;
                bottom: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.6);
                padding: 6px 14px;
                border-radius: 20px;
                color: #fff;
                font-size: 0.85rem;
                font-weight: 500;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }

              .carousel-thumbnails-row {
                display: flex;
                gap: 12px;
                padding: 20px;
                background: var(--bg-secondary);
                overflow-x: auto;
              }

              .carousel-thumb-wrapper {
                width: 90px;
                height: 60px;
                border-radius: 8px;
                overflow: hidden;
                cursor: pointer;
                border: 2px solid transparent;
                transition: all 0.3s ease;
                flex-shrink: 0;
                opacity: 0.6;
              }

              .carousel-thumb-wrapper:hover {
                opacity: 0.9;
              }

              .carousel-thumb-wrapper.active {
                border-color: var(--primary);
                opacity: 1;
                transform: scale(1.05);
                box-shadow: 0 4px 10px rgba(212, 175, 55, 0.2);
              }

              .carousel-thumb-wrapper img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              @media (max-width: 768px) {
                .property-media-dashboard {
                  padding: 20px;
                }
                .main-carousel-slide {
                  height: 300px;
                }
              }
            `}} />

            <AnimatedSection direction="up" delay={0.3}>
              <div className="detail-features">
                <h2>Premium Features</h2>
                <div className="features-list">
                  {['Private Pool', 'Home Automation', 'Wine Cellar', 'Sky Deck', 'Spa Bathroom', 'Gourmet Kitchen', 'Concierge Service'].map(feature => (
                    <span key={feature} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <EMICalculator propertyPrice={property.price} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.5}>
              <div className="detail-floor-plan" style={{ marginTop: '40px' }}>
                <h2>Architectural Floor Plan</h2>
                <div className="floor-plan-container" style={{ margin: '20px 0', background: '#f5f5f5', padding: '20px', borderRadius: '15px' }}>
                  <img src="/architectural_floor_plan.png" alt="House Floor Plan" style={{ width: '100%', height: 'auto' }} />
                </div>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                  * This floor plan represents the standard layout. Custom modifications are possible during construction.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="detail-sidebar">
            <AnimatedSection direction="left">
              <div className="enquiry-card">
                <AnimatePresence mode="wait">
                  {bookingStep === 'select' && (
                    <motion.div
                      key="booking-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3>Schedule a Private Tour</h3>
                      <p>Select your preferred date and time for an exclusive viewing.</p>
                      
                      <div className="booking-calendar">
                        <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginTop: '20px' }}>
                          {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            return (
                              <div 
                                key={i} 
                                className={`calendar-day ${selectedDate === day ? 'selected' : ''}`}
                                onClick={() => setSelectedDate(day)}
                                style={{
                                  padding: '10px',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  borderRadius: '5px',
                                  background: selectedDate === day ? 'var(--primary)' : 'transparent',
                                  color: selectedDate === day ? '#000' : 'inherit',
                                  border: '1px solid var(--border)'
                                }}
                              >
                                {day}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="time-slots" style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {['10:00 AM', '02:00 PM', '05:00 PM'].map(time => (
                            <button 
                              key={time}
                              className={`slot-btn ${selectedTime === time ? 'active' : ''}`}
                              onClick={() => setSelectedTime(time)}
                              style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid var(--primary)',
                                background: selectedTime === time ? 'var(--primary)' : 'transparent',
                                color: selectedTime === time ? '#000' : 'var(--primary)',
                                cursor: 'pointer'
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        className="btn-primary full-width" 
                        style={{ marginTop: '20px', width: '100%' }}
                        onClick={goToPayment}
                      >
                        Start Construction
                      </button>
                    </motion.div>
                  )}

                  {bookingStep === 'payment' && (
                    <motion.div
                      key="payment-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="payment-container"
                    >
                      <h3>Secure Design Reservation</h3>
                      <p>Scan the QR code to pay the ₹5,000 reservation fee.</p>
                      
                      <div className="qr-wrapper" style={{ textAlign: 'center', margin: '20px 0' }}>
                        <div style={{ 
                          width: '200px', 
                          height: '200px', 
                          background: 'var(--bg-secondary)', 
                          margin: '0 auto', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          border: '1px solid var(--border)',
                          borderRadius: '15px',
                          color: 'var(--primary)'
                        }}>
                          QR CODE PLACEHOLDER
                        </div>
                      </div>

                      <button 
                        className="btn-primary full-width" 
                        style={{ width: '100%' }}
                        onClick={handlePaymentComplete}
                      >
                        Confirm Reservation
                      </button>
                    </motion.div>
                  )}

                  {bookingStep === 'success' && (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{ fontSize: '3rem', color: '#4caf50' }}>✓</div>
                      <h3>Reservation Confirmed!</h3>
                      <p>Your design reservation is confirmed for May {selectedDate}, 2026. Our team will contact you shortly at your registered number.</p>
                      <button className="btn-primary" style={{ width: '100%' }} onClick={() => navigate('/designs')}>
                        Explore More Designs
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="agent-info" style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                  <div className="agent-avatar">SE</div>
                  <div>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>Sun Bright Properties Advisory</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Luxury Property Consultant</div>
                  </div>
                </div>

                {/* Location Section */}
                <div style={{ marginTop: '60px' }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', fontFamily: "'Playfair Display', serif" }}>Location & Neighborhood</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '25px', lineHeight: '1.8' }}>
                    Located in the heart of the prestigious {property.location} district, this residence offers an unparalleled blend of exclusivity, security, and world-class connectivity.
                  </p>
                  <div style={{ height: '300px', borderRadius: '30px', overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                      alt="Map Neighborhood" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, filter: 'contrast(1.2)' }}
                    />
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{property.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
