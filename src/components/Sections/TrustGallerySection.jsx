/**
 * TrustGallerySection.jsx
 * "Our Journey In Action" — 3-column card grid with tag badges,
 * titles, descriptions, and View Details links.
 * Matches the reference design: white cards, image on top, info below.
 */

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_PHOTOS = [
  { id: 'j27', url: '/assets/moments/journey-27.jpg',  pos: 'center center', alt: 'Family Plot Handover & Brochure Presentation', tag: 'CLIENT SUCCESS', title: 'Family Plot Booking & Presentation', description: 'Sun Bright leadership presenting layout brochure and milestone to proud homebuyer family.' },
  { id: 'j24', url: '/assets/moments/journey-24.jpg',  pos: 'center 20%',    alt: 'On-Site Plot Boundary & Client Milestone',     tag: 'SITE VISIT',      title: 'Plot Boundary & Site Consultation',   description: 'Personalized boundary review and layout inspection directly on the plot location.' },
  { id: 'j25', url: '/assets/moments/journey-25.jpg',  pos: 'center top',    alt: 'CEO On-Site Client Consultation',              tag: 'CEO IN ACTION',   title: 'CEO Site Consultation with Buyers',   description: 'Direct site tour and investment guidance provided by CEO to valued clients.' },
  { id: 'j26', url: '/assets/moments/journey-26.jpg',  pos: 'center center', alt: 'Investor & Client Site Walkthrough',          tag: 'SITE VISIT',      title: 'Layout Orientation & Client Briefing', description: 'Comprehensive layout walkthrough and property brochure presentation with clients.' },
  { id: 'j23', url: '/assets/moments/journey-23.png',  pos: 'center 40%',    alt: 'Client Plot Deed & Booking Milestone',        tag: 'CLIENT SUCCESS', title: 'Client Plot Booking Milestone',       description: 'Proud client holding official Sun Bright Properties booking confirmation.' },
  { id: 'j18', url: '/assets/moments/journey-18.jpg',  pos: 'center top',    alt: 'Sun Bright Properties On-Site Client Visit', tag: 'SITE VISIT',      title: 'On-Site Client Visit & Layout Tour',     description: 'Interactive layout tour and plot review on-site with valued clients.' },
  { id: 'j19', url: '/assets/moments/journey-19.png',  pos: 'center top',    alt: 'Executive Layout Review & Site Consultation', tag: 'CEO IN ACTION',   title: 'Executive Layout Review & Consultation', description: 'In-depth on-site discussion and layout walkthrough with property advisors.' },
  { id: 'j20', url: '/assets/moments/journey-20.jpg',  pos: 'center 20%',    alt: 'Plot Registration & Document Handover', tag: 'CLIENT SUCCESS', title: 'Plot Registration & Document Handover', description: 'Celebrating registered deed handover and milestone success with happy clients.' },
  { id: 'j21', url: '/assets/moments/journey-21.jpg',  pos: 'center top',    alt: 'CEO Site Inspection & Field Consultation', tag: 'CEO IN ACTION',   title: 'CEO Site Inspection & Field Consultation', description: 'Field inspection and on-site project evaluation directly led by leadership.' },
  { id: 'j22', url: '/assets/moments/journey-22.jpg',  pos: 'center top',    alt: 'Client Booking & Verification Milestone', tag: 'CLIENT SUCCESS', title: 'Client Booking & Verification Milestone', description: 'Official plot booking verification and documentation handover with client.' },
  { id: 'j1',  url: '/assets/moments/journey-1.jpg',  pos: 'center top',    alt: 'Sun Bright Properties Site Inspection',    tag: 'SITE VISIT',   title: 'On-Site Layout Inspection',              description: 'On-site layout inspection and plot verification with valued clients.' },
  { id: 'j2',  url: '/assets/moments/journey-2.jpg',  pos: 'center top',    alt: 'Executive On-Site Consultation',           tag: 'CONSULTATION', title: 'Executive On-Site Consultation',         description: 'Personalized site walkthrough and brochure verification with clients.' },
  { id: 'j3',  url: '/assets/moments/journey-3.jpg',  pos: 'center top',    alt: 'Open Plot Handover Milestone',             tag: 'HANDOVER',     title: 'Open Plot Handover Milestone',           description: 'Celebrating plot selection and client satisfaction on-site.' },
  { id: 'j4',  url: '/assets/moments/journey-4.jpg',  pos: 'center top',    alt: 'Sun Bright Properties Team Gathering',     tag: 'TEAM',         title: 'Our Dedicated Advisory Team',            description: 'Our dedicated real estate advisory team committed to excellence.' },
  { id: 'j5',  url: '/assets/moments/journey-5.jpg',  pos: 'center top',    alt: 'Client Property Orientation',              tag: 'ORIENTATION',  title: 'Client Property Orientation',           description: 'Client brochure presentation and luxury property orientation.' },
  { id: 'j6',  url: '/assets/moments/journey-6.jpg',  pos: 'center center', alt: 'Verified Plot Documentation Handover',     tag: 'DOCUMENTS',    title: 'Verified Document Handover',             description: 'Verified plot documentation handover in Sun Bright office.' },
  { id: 'j7',  url: '/assets/moments/journey-7.jpg',  pos: 'center top',    alt: 'Successful Site Milestone',                tag: 'MILESTONE',    title: 'Successful Site Milestone',              description: 'Successful site milestone celebration with team and clients.' },
  { id: 'j8',  url: '/assets/moments/journey-8.jpg',  pos: 'center center', alt: 'Official Document Handover Ceremony',      tag: 'CEREMONY',     title: 'Document Handover Ceremony',             description: 'Official document & brochure handover ceremony with valued buyer.' },
  { id: 'j9',  url: '/assets/moments/journey-9.jpg',  pos: 'center top',    alt: 'Executive Advisory & Consultation',        tag: 'ADVISORY',     title: 'Executive Advisory & Consultation',      description: 'Sun Bright Properties executive advisory & consultation team.' },
  { id: 'j10', url: '/assets/moments/journey-10.jpg', pos: 'center top',    alt: 'On-Site Plot Inspection',                  tag: 'INSPECTION',   title: 'On-Site Plot Inspection',               description: 'On-site plot inspection and layout verification with team.' },
  { id: 'j11', url: '/assets/moments/journey-11.jpg', pos: 'center center', alt: 'Customer Brochure Presentation',           tag: 'PRESENTATION', title: 'Customer Brochure Presentation',         description: 'Customer brochure presentation & plot allocation in office.' },
  { id: 'j12', url: '/assets/moments/journey-12.jpg', pos: 'center center', alt: 'Official Document & Receipt Verification', tag: 'VERIFICATION', title: 'Document & Receipt Verification',        description: 'Official payment receipt & document verification with client.' },
  { id: 'j13', url: '/assets/moments/journey-13.jpg', pos: 'center top',    alt: 'Executive Boundary & Site Verification',   tag: 'SITE VISIT',   title: 'Executive Boundary Verification',        description: 'Executive plot inspection & site boundary check on location.' },
  { id: 'j14', url: '/assets/moments/journey-14.jpg', pos: 'center top',    alt: 'Client Brochure Handover & Orientation',   tag: 'HANDOVER',     title: 'Client Brochure Handover',               description: 'Client brochure handover & orientation with Sun Bright management.' },
  { id: 'j15', url: '/assets/moments/journey-15.jpg', pos: 'center center', alt: 'Sun Bright Team Banner Presentation',      tag: 'TEAM',         title: 'Team Banner Presentation',               description: 'Sun Bright Properties management team holding brochures at banner wall.' },
  { id: 'j16', url: '/assets/moments/journey-16.jpg', pos: 'center center', alt: 'Customer Document Handover in Office',     tag: 'DOCUMENTS',    title: 'Customer Document Handover',             description: 'Customer document & brochure handover ceremony in office.' },
  { id: 'j17', url: '/assets/moments/journey-17.jpg', pos: 'center top',    alt: 'On-Site Layout & Plot Walkthrough',        tag: 'WALKTHROUGH',  title: 'On-Site Layout Walkthrough',             description: 'On-site layout inspection and client consultation on location road.' },
];

export default function TrustGallerySection() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  /* ── Header entrance animation ─────────────────────────────────── */
  useEffect(() => {
    if (!headerRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % JOURNEY_PHOTOS.length);
      }
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + JOURNEY_PHOTOS.length) % JOURNEY_PHOTOS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  const activePhoto = activePhotoIndex !== null ? JOURNEY_PHOTOS[activePhotoIndex] : null;

  return (
    <section ref={sectionRef} className="trust-gallery-section">

      {/* ── Header ── */}
      <div ref={headerRef} className="trust-gallery-header">
        <span className="tg-tag">OUR JOURNEY</span>
        <h2 className="tg-title">CEO in Action &amp; Client Success</h2>
        <div className="tg-divider" />
        <p className="tg-subtitle">
          Real moments, genuine trust. Discover our journey of delivering premium
          properties and building lifelong relationships across Hyderabad.
        </p>
      </div>

      {/* ── Card Grid ── */}
      <div className="tg-grid">
        {JOURNEY_PHOTOS.map((photo, index) => (
          <motion.div
            className="tg-card"
            key={photo.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActivePhotoIndex(index)}
          >
            {/* Image Container - Clean Edge-to-Edge */}
            <div className="tg-img-wrapper">
              <img 
                src={photo.url} 
                alt={photo.alt} 
                className="tg-img" 
                loading="lazy"
                style={{ objectPosition: photo.pos || 'center top' }}
              />
            </div>

            {/* Info */}
            <div className="tg-info">
              <h3 className="tg-card-title">{photo.title}</h3>
              <p className="tg-card-desc">{photo.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div 
            className="tg-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.div 
              className="tg-lightbox-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="tg-lightbox-close"
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close photo"
              >
                ✕
              </button>

              {/* Prev / Next buttons */}
              <button 
                className="tg-lightbox-nav tg-nav-prev"
                onClick={() => setActivePhotoIndex((prev) => (prev - 1 + JOURNEY_PHOTOS.length) % JOURNEY_PHOTOS.length)}
                aria-label="Previous photo"
              >
                ❮
              </button>
              <button 
                className="tg-lightbox-nav tg-nav-next"
                onClick={() => setActivePhotoIndex((prev) => (prev + 1) % JOURNEY_PHOTOS.length)}
                aria-label="Next photo"
              >
                ❯
              </button>

              {/* Lightbox Image */}
              <div className="tg-lightbox-img-box">
                <img 
                  src={activePhoto.url} 
                  alt={activePhoto.alt} 
                  className="tg-lightbox-img" 
                />
              </div>

              {/* Lightbox Caption */}
              <div className="tg-lightbox-meta">
                <h3 className="tg-lightbox-title">{activePhoto.title}</h3>
                <p className="tg-lightbox-desc">{activePhoto.description}</p>
                <span className="tg-lightbox-counter">
                  {activePhotoIndex + 1} / {JOURNEY_PHOTOS.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .trust-gallery-section {
          background: #fdfdfd;
          padding: 90px 0 120px;
          position: relative;
        }

        /* ── Header ── */
        .trust-gallery-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 64px;
          padding: 0 20px;
        }
        .tg-tag {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 12px;
        }
        .tg-title {
          font-family: var(--font-heading, 'Playfair Display', serif);
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          color: var(--text-main, #1a1a1a);
          margin: 0 0 16px;
          line-height: 1.15;
        }
        .tg-divider {
          width: 48px;
          height: 2px;
          background: #D4AF37;
          margin: 0 auto 18px;
        }
        .tg-subtitle {
          font-size: 1rem;
          color: var(--text-muted, #666);
          line-height: 1.75;
          margin: 0;
        }

        /* ── Grid ── */
        .tg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 991px) {
          .tg-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 640px) {
          .tg-grid { grid-template-columns: 1fr; gap: 24px; max-width: 480px; }
        }

        /* ── Card ── */
        .tg-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(212,175,55,0.18);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.4s ease;
        }
        .tg-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(212,175,55,0.14);
          border-color: #D4AF37;
        }

        /* ── Image Container ── */
        .tg-img-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          background: #f8f8f8;
        }

        /* Full-bleed photo — no black bars */
        .tg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .tg-card:hover .tg-img {
          transform: scale(1.05);
        }

        /* ── Info ── */
        .tg-info {
          padding: 22px 22px 20px;
          display: flex;
          flex-direction: column;
          background: #fff;
          flex: 1;
        }
        .tg-card-title {
          font-family: var(--font-heading, 'Playfair Display', serif);
          font-size: 1.12rem;
          font-weight: 600;
          color: var(--text-main, #1a1a1a);
          margin: 0 0 8px;
          line-height: 1.35;
          transition: color 0.3s ease;
        }
        .tg-card:hover .tg-card-title { color: #b89020; }
        .tg-card-desc {
          font-size: 0.88rem;
          color: var(--text-muted, #666);
          line-height: 1.6;
          margin: 0;
        }

        /* ── Lightbox Modal ── */
        .tg-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(5, 8, 15, 0.88);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .tg-lightbox-content {
          position: relative;
          max-width: 960px;
          width: 100%;
          max-height: 90vh;
          background: #111722;
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0,0,0,0.6);
        }
        .tg-lightbox-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 10;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .tg-lightbox-close:hover {
          background: #D4AF37;
          color: #111;
        }
        .tg-lightbox-nav {
          position: absolute;
          top: 45%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(212,175,55,0.3);
          color: #D4AF37;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .tg-lightbox-nav:hover {
          background: #D4AF37;
          color: #111;
        }
        .tg-nav-prev { left: 16px; }
        .tg-nav-next { right: 16px; }

        .tg-lightbox-img-box {
          width: 100%;
          height: 60vh;
          min-height: 320px;
          background: #090d14;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .tg-lightbox-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
        .tg-lightbox-meta {
          padding: 20px 28px 24px;
          background: #111722;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .tg-lightbox-tag {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #D4AF37;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }
        .tg-lightbox-title {
          font-family: var(--font-heading, 'Playfair Display', serif);
          font-size: 1.35rem;
          color: #ffffff;
          margin: 0 0 6px;
        }
        .tg-lightbox-desc {
          font-size: 0.92rem;
          color: #a3aab8;
          margin: 0;
          line-height: 1.5;
        }
        .tg-lightbox-counter {
          position: absolute;
          bottom: 24px;
          right: 28px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 1px;
        }
      `}</style>
    </section>
  );
}
