/**
 * TrustGallerySection.jsx
 * "Our Journey In Action" — 3-column card grid with tag badges,
 * titles, descriptions, and View Details links.
 * Matches the reference design: white cards, image on top, info below.
 */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_PHOTOS = [
  { id: 'j1',  url: '/assets/moments/journey-1.jpg',  alt: 'Sun Bright Properties Site Inspection',    tag: 'SITE VISIT',   title: 'On-Site Layout Inspection',              description: 'On-site layout inspection and plot verification with valued clients.' },
  { id: 'j2',  url: '/assets/moments/journey-2.jpg',  alt: 'Executive On-Site Consultation',           tag: 'CONSULTATION', title: 'Executive On-Site Consultation',         description: 'Personalized site walkthrough and brochure verification with clients.' },
  { id: 'j3',  url: '/assets/moments/journey-3.jpg',  alt: 'Open Plot Handover Milestone',             tag: 'HANDOVER',     title: 'Open Plot Handover Milestone',           description: 'Celebrating plot selection and client satisfaction on-site.' },
  { id: 'j4',  url: '/assets/moments/journey-4.jpg',  alt: 'Sun Bright Properties Team Gathering',     tag: 'TEAM',         title: 'Our Dedicated Advisory Team',            description: 'Our dedicated real estate advisory team committed to excellence.' },
  { id: 'j5',  url: '/assets/moments/journey-5.jpg',  alt: 'Client Property Orientation',              tag: 'ORIENTATION',  title: 'Client Property Orientation',           description: 'Client brochure presentation and luxury property orientation.' },
  { id: 'j6',  url: '/assets/moments/journey-6.jpg',  alt: 'Verified Plot Documentation Handover',     tag: 'DOCUMENTS',    title: 'Verified Document Handover',             description: 'Verified plot documentation handover in Sun Bright office.' },
  { id: 'j7',  url: '/assets/moments/journey-7.jpg',  alt: 'Successful Site Milestone',                tag: 'MILESTONE',    title: 'Successful Site Milestone',              description: 'Successful site milestone celebration with team and clients.' },
  { id: 'j8',  url: '/assets/moments/journey-8.jpg',  alt: 'Official Document Handover Ceremony',      tag: 'CEREMONY',     title: 'Document Handover Ceremony',             description: 'Official document & brochure handover ceremony with valued buyer.' },
  { id: 'j9',  url: '/assets/moments/journey-9.jpg',  alt: 'Executive Advisory & Consultation',        tag: 'ADVISORY',     title: 'Executive Advisory & Consultation',      description: 'Sun Bright Properties executive advisory & consultation team.' },
  { id: 'j10', url: '/assets/moments/journey-10.jpg', alt: 'On-Site Plot Inspection',                  tag: 'INSPECTION',   title: 'On-Site Plot Inspection',               description: 'On-site plot inspection and layout verification with team.' },
  { id: 'j11', url: '/assets/moments/journey-11.jpg', alt: 'Customer Brochure Presentation',           tag: 'PRESENTATION', title: 'Customer Brochure Presentation',         description: 'Customer brochure presentation & plot allocation in office.' },
  { id: 'j12', url: '/assets/moments/journey-12.jpg', alt: 'Official Document & Receipt Verification', tag: 'VERIFICATION', title: 'Document & Receipt Verification',        description: 'Official payment receipt & document verification with client.' },
  { id: 'j13', url: '/assets/moments/journey-13.jpg', alt: 'Executive Boundary & Site Verification',   tag: 'SITE VISIT',   title: 'Executive Boundary Verification',        description: 'Executive plot inspection & site boundary check on location.' },
  { id: 'j14', url: '/assets/moments/journey-14.jpg', alt: 'Client Brochure Handover & Orientation',   tag: 'HANDOVER',     title: 'Client Brochure Handover',               description: 'Client brochure handover & orientation with Sun Bright management.' },
  { id: 'j15', url: '/assets/moments/journey-15.jpg', alt: 'Sun Bright Team Banner Presentation',      tag: 'TEAM',         title: 'Team Banner Presentation',               description: 'Sun Bright Properties management team holding brochures at banner wall.' },
  { id: 'j16', url: '/assets/moments/journey-16.jpg', alt: 'Customer Document Handover in Office',     tag: 'DOCUMENTS',    title: 'Customer Document Handover',             description: 'Customer document & brochure handover ceremony in office.' },
  { id: 'j17', url: '/assets/moments/journey-17.jpg', alt: 'On-Site Layout & Plot Walkthrough',        tag: 'WALKTHROUGH',  title: 'On-Site Layout Walkthrough',             description: 'On-site layout inspection and client consultation on location road.' },
];

export default function TrustGallerySection() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);

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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image */}
            <div className="tg-img-wrapper">
              <img src={photo.url} alt={photo.alt} className="tg-img" />
            </div>

            {/* Info */}
            <div className="tg-info">
              <h3 className="tg-card-title">{photo.title}</h3>
              <p className="tg-card-desc">{photo.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .trust-gallery-section {
          background: #ffffff;
          padding: 90px 0 110px;
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
          gap: 36px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 991px) {
          .tg-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
        }
        @media (max-width: 640px) {
          .tg-grid { grid-template-columns: 1fr; gap: 28px; max-width: 480px; }
        }

        /* ── Card ── */
        .tg-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(0,0,0,0.06);
          border: 1px solid rgba(212,175,55,0.15);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.4s ease;
        }
        .tg-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 50px rgba(212,175,55,0.1);
          border-color: #D4AF37;
        }

        /* ── Image ── */
        .tg-img-wrapper {
          position: relative;
          width: 100%;
          padding-top: 78%;
          overflow: hidden;
          background: #f5f5f5;
        }
        .tg-img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .tg-card:hover .tg-img {
          transform: scale(1.04);
        }

        /* ── Info ── */
        .tg-info {
          padding: 24px 24px 20px;
          display: flex;
          flex-direction: column;
          background: #fff;
        }
        .tg-card-title {
          font-family: var(--font-heading, 'Playfair Display', serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-main, #1a1a1a);
          margin: 0 0 10px;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .tg-card:hover .tg-card-title { color: #D4AF37; }
        .tg-card-desc {
          font-size: 0.9rem;
          color: var(--text-muted, #666);
          line-height: 1.65;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
