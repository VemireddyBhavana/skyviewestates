/**
 * AntiGravitySection.jsx
 * Premium AI section with floating particles, mouse parallax,
 * scroll-linked reveals and staggered card entrance.
 * Uses gsap.context() for StrictMode-safe cleanup.
 */

import { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../constants/data';

const AntiGravitySection = () => {
  const sectionRef  = useRef(null);
  const contentRef  = useRef(null);
  const orb1Ref     = useRef(null);
  const orb2Ref     = useRef(null);
  const particlesRef = useRef(null);
  const mouseRafRef = useRef(null);

  const houses = [
    { id: 1, img: IMAGES.heroHome,  left: '8%',  size: '120px', delay: '0s',   duration: '10s', rotate: '-6deg' },
    { id: 2, img: IMAGES.heroHome2, left: '20%', size: '85px',  delay: '2s',   duration: '12s', rotate: '4deg'  },
    { id: 3, img: IMAGES.heroHome3, left: '38%', size: '140px', delay: '1s',   duration: '8.5s',rotate: '-4deg' },
    { id: 4, img: IMAGES.heroHome,  left: '58%', size: '95px',  delay: '4s',   duration: '13s', rotate: '5deg'  },
    { id: 5, img: IMAGES.heroHome2, left: '74%', size: '110px', delay: '0.5s', duration: '11s', rotate: '-3deg' },
    { id: 6, img: IMAGES.heroHome3, left: '88%', size: '75px',  delay: '3.5s', duration: '9s',  rotate: '6deg'  },
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Staggered content reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('span, h2, p, a, button'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Ambient orb rotation
      [orb1Ref, orb2Ref].forEach((orbRef, i) => {
        if (!orbRef.current) return;
        gsap.to(orbRef.current, {
          rotation: i === 0 ? 360 : -360,
          duration: 25,
          ease: 'none',
          repeat: -1,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: 'play pause play pause',
          },
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || mouseRafRef.current) return;

    mouseRafRef.current = requestAnimationFrame(() => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) { mouseRafRef.current = null; return; }

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top  - cy) / cy;

      if (orb1Ref.current) gsap.to(orb1Ref.current, { x: dx * -25, y: dy * -25, duration: 1, ease: 'power2.out', overwrite: 'auto' });
      if (orb2Ref.current) gsap.to(orb2Ref.current, { x: dx *  30, y: dy *  30, duration: 1, ease: 'power2.out', overwrite: 'auto' });
      if (particlesRef.current) gsap.to(particlesRef.current, { x: dx * 12, y: dy * 12, duration: 1.5, ease: 'power2.out', overwrite: 'auto' });

      mouseRafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (orb1Ref.current) gsap.to(orb1Ref.current, { x: 0, y: 0, duration: 1.5, ease: 'power3.out' });
    if (orb2Ref.current) gsap.to(orb2Ref.current, { x: 0, y: 0, duration: 1.5, ease: 'power3.out' });
    if (particlesRef.current) gsap.to(particlesRef.current, { x: 0, y: 0, duration: 1.5, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    return () => { if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="antigravity-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        height: '800px',
        backgroundImage: `linear-gradient(rgba(5, 8, 16, 0.8), rgba(5, 8, 16, 0.8)), url('/assets/ag-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
      }}
    >
      {/* Floating ambient particles */}
      <div ref={particlesRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: '#C8A96E',
            borderRadius: '50%',
            top:  `${10 + (i * 7) % 80}%`,
            left: `${5  + (i * 9) % 90}%`,
            boxShadow: '0 0 8px rgba(200,169,110,0.6)',
            animation: `agParticleFloat ${5 + (i % 4)}s ease-in-out infinite alternate`,
            animationDelay: `${(i * 0.4) % 4}s`,
            opacity: 0.3 + (i % 4) * 0.1,
          }} />
        ))}
      </div>

      {/* Atmosphere orbs */}
      <div ref={orb1Ref} style={{
        position: 'absolute', top: '10%', left: '5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77,159,232,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none',
      }} />
      <div ref={orb2Ref} style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Floating houses */}
      <div className="floating-container" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {houses.map((house, idx) => (
          <div
            key={house.id}
            className={`floating-house-card house-${idx + 1}`}
            style={{
              position: 'absolute', left: house.left, bottom: '-200px',
              width: house.size, height: 'auto', borderRadius: '16px',
              overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              border: '1px solid rgba(200,169,110,0.3)', pointerEvents: 'none',
              animation: `agFloat ${house.duration} linear infinite`,
              animationDelay: house.delay, '--rotate': house.rotate, willChange: 'transform',
            }}
          >
            <div className="shimmer-overlay" />
            <img src={house.img} alt="Floating Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div ref={contentRef} className="ag-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px' }}>
        <span style={{ color: '#C8A96E', letterSpacing: '6px', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>
          ARCHITECTURAL MARVELS
        </span>
        <h2 style={{
          fontSize: 'clamp(3rem, 8vw, 5.5rem)',
          fontFamily: "'Playfair Display', serif",
          fontWeight: '300', color: '#fff', margin: '30px 0', lineHeight: '1.1',
        }}>
          Homes That <br />
          <i style={{ color: '#C8A96E' }}>Defy Limits</i> <br />
          and Logic
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.8' }}>
          Our Signature Series represents the pinnacle of human ingenuity—homes that aren't just built, but envisioned beyond the ordinary.
        </p>
        <Link to="/designs">
          <button
            className="btn-hero"
            style={{
              border: '1px solid #C8A96E', background: 'transparent', color: '#C8A96E',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,169,110,0.15)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(200,169,110,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Explore the Collection
          </button>
        </Link>
      </div>

      {/* Fog fades */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to bottom, #050810 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '250px', background: 'linear-gradient(to top, #050810 20%, transparent 100%)', zIndex: 5, opacity: 0.8, pointerEvents: 'none' }} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes agFloat {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.85; }
          30%  { transform: translateY(-35vh) rotate(var(--rotate)); opacity: 0.9; }
          55%  { transform: translateY(-65vh) rotate(calc(var(--rotate) * -1)); }
          80%  { transform: translateY(-95vh) rotate(var(--rotate)); opacity: 0.35; }
          100% { transform: translateY(-130vh) rotate(0deg); opacity: 0; }
        }
        @keyframes agParticleFloat {
          0%   { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-40px) translateX(15px); }
        }
        .shimmer-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(45deg, transparent 0%, rgba(200,169,110,0.1) 45%, rgba(200,169,110,0.2) 50%, rgba(200,169,110,0.1) 55%, transparent 100%);
          background-size: 200% 200%;
          animation: agShimmer 3s infinite linear;
        }
        @keyframes agShimmer {
          0%   { background-position: -100% -100%; }
          100% { background-position: 100% 100%; }
        }
        @media (max-width: 768px) {
          .house-1, .house-6 { display: none !important; }
          .ag-content h2 { font-size: 3rem !important; }
        }
      `}} />
    </section>
  );
};

export default AntiGravitySection;
