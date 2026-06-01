import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780219352/WhatsApp_Image_2026-05-27_at_8.27.25_AM_drcwdp.jpg",
    alt: "CEO Landmark Site Inspection",
    caption: "Overseeing landmark layouts and premium real estate developments."
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312133/2_bhhf65.jpg",
    alt: "CEO On-site Consultation",
    caption: "Guiding clients through layout options and project highlights."
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312142/3_evxzgv.jpg",
    alt: "Client Handover Celebration",
    caption: "Celebrating customer satisfaction and premium key handover."
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312153/4_w9rsh7.jpg",
    alt: "Property Site Consultation",
    caption: "Inspecting prime land developments and secure boundaries."
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312165/5_epvks2.jpg",
    alt: "Trust Handshake Milestone",
    caption: "Securing investments with transparent and verified documentation."
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312175/6_gg9zmv.jpg",
    alt: "Customer Milestone Celebration",
    caption: "Delivering dream plots and celebrating client success."
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312189/7_nsrzcr.jpg",
    alt: "Happy Family Handover",
    caption: "Welcoming our valuable clients to their premium plots."
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312199/8_xzn7vn.jpg",
    alt: "Investment Agreement Closing",
    caption: "Completing legal registrations with trusted verification."
  },
  {
    id: 9,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312208/9_pahdex.jpg",
    alt: "Premium Plot Discussion",
    caption: "Delivering layout sheets and structural blueprints on site."
  },
  {
    id: 10,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312216/10_cdit01.jpg",
    alt: "Landowner Handover Milestone",
    caption: "Securing brighter futures for modern family investors."
  },
  {
    id: 11,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312226/11_u5dqz9.jpg",
    alt: "CEO & Client Consultation",
    caption: "Explaining elite layout parameters with full transparency."
  },
  {
    id: 12,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312237/12_rfhuxf.jpg",
    alt: "Team Milestone Review",
    caption: "Discussing layout parameters with engineering specialists."
  },
  {
    id: 13,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312245/13_lcjxzg.jpg",
    alt: "Customer Trust Presentation",
    caption: "Fostering long-term customer relationships with verified plots."
  },
  {
    id: 14,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312257/14_h5e6bn.jpg",
    alt: "On-site Plot Handover",
    caption: "Direct registration verification on the physical site."
  },
  {
    id: 15,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312266/15_xcfk3i.jpg",
    alt: "Layout Planning Meeting",
    caption: "Refining custom plans with layout surveyors."
  },
  {
    id: 16,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312275/16_rozoxt.jpg",
    alt: "Elite Property Handover",
    caption: "Building lifetime relationships through premium land development."
  },
  {
    id: 17,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312285/17_epzd2m.jpg",
    alt: "Consultation & Deal Closure",
    caption: "Celebrating secure land titles and successful ownership transfers."
  }
];

const TrustGallerySection = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % GALLERY_IMAGES.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  return (
    <section className="trust-gallery-section">
      <div className="section-container">
        <div className="trust-gallery-header">
          <span className="section-tag centered">MOMENTS OF TRUST</span>
          <h2 className="section-title centered">Our Journey In Action</h2>
          <div className="teal-line centered"></div>
        </div>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {/* First loop of images */}
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={`row1-1-${img.id}`} 
              className="marquee-item"
              onClick={() => setActiveIdx(idx)}
            >
              <img src={img.url} alt={img.alt} loading="lazy" />
              <div className="marquee-item-overlay">
              </div>
            </div>
          ))}
          {/* Duplicated loop of images for seamless scroll */}
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={`row1-2-${img.id}`} 
              className="marquee-item"
              onClick={() => setActiveIdx(idx)}
            >
              <img src={img.url} alt={img.alt} loading="lazy" />
              <div className="marquee-item-overlay">
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
          >
            <button className="lightbox-close-btn" onClick={() => setActiveIdx(null)}>
              &times;
            </button>

            <button className="lightbox-nav-btn prev" onClick={handlePrev} aria-label="Previous Image">
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <motion.div 
              className="lightbox-container"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={GALLERY_IMAGES[activeIdx].url} 
                alt={GALLERY_IMAGES[activeIdx].alt} 
                className="lightbox-img"
              />
              <div className="lightbox-caption">
                <h4>{GALLERY_IMAGES[activeIdx].alt}</h4>
                <p>{GALLERY_IMAGES[activeIdx].caption}</p>
              </div>
            </motion.div>

            <button className="lightbox-nav-btn next" onClick={handleNext} aria-label="Next Image">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .trust-gallery-section {
          background-color: var(--bg-dark);
          padding: 80px 0 120px 0;
          overflow: hidden;
          position: relative;
        }

        .trust-gallery-header {
          margin-bottom: 60px;
          text-align: center;
        }

        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          user-select: none;
          width: 100%;
          position: relative;
        }

        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, var(--bg-dark) 0%, rgba(10, 17, 40, 0) 100%);
        }

        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, var(--bg-dark) 0%, rgba(10, 17, 40, 0) 100%);
        }

        .marquee-track {
          display: flex;
          flex-shrink: 0;
          gap: 24px;
          padding: 10px 0;
          min-width: 100%;
          animation: infiniteMarquee 35s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes infiniteMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }

        .marquee-item {
          width: 280px;
          height: 280px;
          flex-shrink: 0;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .marquee-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .marquee-item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(212, 175, 55, 0.45) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s ease;
          z-index: 1;
        }



        /* Hover states */
        .marquee-item:hover {
          transform: translateY(-8px) scale(1.03);
          border-color: var(--primary);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.15);
        }

        .marquee-item:hover img {
          transform: scale(1.08);
        }

        .marquee-item:hover .marquee-item-overlay {
          opacity: 1;
        }



        /* Lightbox CSS */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
        }

        .lightbox-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 2rem;
          line-height: 1;
          cursor: pointer;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          transition: all 0.3s ease;
        }

        .lightbox-close-btn:hover {
          background: var(--primary);
          color: black;
          transform: rotate(90deg);
          border-color: var(--primary);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          transition: all 0.3s ease;
        }

        .lightbox-nav-btn:hover {
          background: var(--primary);
          color: black;
          border-color: var(--primary);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav-btn.prev {
          left: 40px;
        }

        .lightbox-nav-btn.next {
          right: 40px;
        }

        .lightbox-container {
          position: relative;
          max-width: 900px;
          width: 100%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }

        .lightbox-img {
          width: 100%;
          height: auto;
          max-height: 65vh;
          object-fit: contain;
          background-color: #050505;
        }

        .lightbox-caption {
          width: 100%;
          background: linear-gradient(180deg, rgba(21, 27, 43, 0.9) 0%, #0a1128 100%);
          padding: 24px;
          text-align: center;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .lightbox-caption h4 {
          font-family: var(--font-heading);
          color: var(--primary);
          font-size: 1.25rem;
          margin: 0 0 6px 0;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .lightbox-caption p {
          font-family: var(--font-body);
          color: var(--text-muted);
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .trust-gallery-section {
            padding: 60px 0 80px 0;
          }

          .trust-gallery-header {
            margin-bottom: 40px;
          }

          .marquee-item {
            width: 220px;
            height: 220px;
          }

          .lightbox-nav-btn {
            width: 44px;
            height: 44px;
            font-size: 0.9rem;
          }

          .lightbox-nav-btn.prev {
            left: 15px;
          }

          .lightbox-nav-btn.next {
            right: 15px;
          }

          .lightbox-close-btn {
            top: 15px;
            right: 15px;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }

          .lightbox-caption {
            padding: 16px;
          }

          .lightbox-caption h4 {
            font-size: 1.1rem;
          }

          .lightbox-caption p {
            font-size: 0.85rem;
          }
        }
      `}} />
    </section>
  );
};

export default TrustGallerySection;
