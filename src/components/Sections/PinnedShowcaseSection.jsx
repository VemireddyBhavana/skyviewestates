/**
 * PinnedShowcaseSection.jsx
 * GSAP horizontal pinned scroll showcase between AntiGravity and Featured Properties.
 * Seamless dark background, zero whitespace leaks, responsive on all devices.
 */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { PROPERTIES } from '../../constants/data';
import { Link } from 'react-router-dom';

const PinnedShowcaseSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const showcaseItems = PROPERTIES.slice(0, 8); // Showing 8 elite properties

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.innerWidth < 768 || prefersReduced) return;

    const ctx = gsap.context(() => {
      const panels = track.querySelectorAll('.showcase-panel');
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stagger panels in
      gsap.fromTo(
        panels,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-showcase-section dark-section-bg"
      style={{
        overflow: 'hidden',
        background: '#050810',
        position: 'relative',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      <div className="pinned-showcase-header">
        <p style={{ color: '#D4AF37', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase', margin: 0, fontWeight: '600' }}>
          THE COLLECTION
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontFamily: "'Playfair Display', serif",
          margin: '6px 0 0 0',
          color: '#fff',
          lineHeight: 1.1
        }}>
          Elite Property Showcase
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '6px' }}>
          Scroll to explore →
        </p>
      </div>

      {/* Scrolling Track */}
      <div
        ref={trackRef}
        className="pinned-showcase-track hide-scrollbar"
      >
        {/* Spacer so first card aligns cleanly */}
        <div className="pinned-track-spacer" />

        {showcaseItems.map((item) => (
          <div
            key={item.id}
            className="showcase-panel"
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div className="showcase-panel-overlay">
              <span className="showcase-tag">
                {item.category || 'Featured Estate'}
              </span>
              <h3 className="showcase-title">
                {item.title}
              </h3>
              <div className="showcase-details-row">
                <p className="showcase-desc">
                  {item.description || 'A premium property crafted for the most discerning homeowners.'}
                </p>
                <Link
                  to={`/property/${item.id}`}
                  className="showcase-link"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div style={{ width: '4vw', flexShrink: 0 }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pinned-showcase-section,
        .pinned-showcase-section + .pin-spacer,
        .pin-spacer {
          background-color: #050810 !important;
        }
        .pinned-showcase-header {
          position: absolute;
          top: 50px;
          left: 5vw;
          z-index: 20;
          pointer-events: none;
        }
        .pinned-showcase-track {
          display: flex;
          width: max-content;
          height: 100vh;
          align-items: center;
          padding: 0 4vw;
          gap: 2.5vw;
          will-change: transform;
        }
        .pinned-track-spacer {
          width: 320px;
          flex-shrink: 0;
        }
        .showcase-panel {
          width: min(50vw, 650px);
          height: 62vh;
          flex-shrink: 0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          border: 1px solid rgba(212, 175, 55, 0.15);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .showcase-panel:hover {
          border-color: rgba(212, 175, 55, 0.5);
        }
        .showcase-panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5,8,16,0.92) 0%, rgba(5,8,16,0.3) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
        }
        .showcase-tag {
          color: #D4AF37;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }
        .showcase-title {
          font-size: clamp(1.4rem, 2vw, 2rem);
          font-family: 'Playfair Display', serif;
          color: #fff;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }
        .showcase-details-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }
        .showcase-desc {
          color: rgba(255,255,255,0.7);
          margin: 0;
          font-size: 0.88rem;
          max-width: 68%;
          line-height: 1.6;
        }
        .showcase-link {
          color: #D4AF37;
          text-decoration: none;
          border-bottom: 1px solid #D4AF37;
          padding-bottom: 4px;
          font-size: 0.88rem;
          white-space: nowrap;
          flex-shrink: 0;
          font-weight: 600;
          transition: opacity 0.2s, transform 0.2s;
        }
        .showcase-link:hover {
          opacity: 0.8;
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .pinned-showcase-section {
            padding: 80px 20px 60px !important;
            height: auto !important;
          }
          .pinned-showcase-header {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            margin-bottom: 30px;
          }
          .pinned-showcase-track {
            width: 100% !important;
            height: auto !important;
            flex-direction: column !important;
            gap: 24px !important;
            padding: 0 !important;
          }
          .pinned-track-spacer {
            display: none !important;
          }
          .showcase-panel {
            width: 100% !important;
            height: 380px !important;
          }
          .showcase-panel-overlay {
            padding: 24px !important;
          }
          .showcase-desc {
            max-width: 100% !important;
          }
          .showcase-details-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}} />
    </section>
  );
};

export default PinnedShowcaseSection;
