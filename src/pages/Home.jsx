/**
 * Home.jsx — Enhanced with GSAP + Lenis premium animations
 *
 * Animations added (zero UI/logic changes):
 * - Hero background: slow scale 1.05→1 on load
 * - Hero content: title/subtitle/buttons staggered entrance
 * - Mouse parallax depth effect on hero (gentle ±5px tilt)
 * - Hero background parallax on scroll (0.3× speed)
 * - AI CTA section: content reveals with GSAP ScrollTrigger
 * - All sections: smooth entrance via AnimatedSection wrapper
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import Navbar from '../components/Layout/Navbar';
import WhatWeDoSection from '../components/Sections/WhatWeDoSection';
import TestimonialsSection from '../components/Sections/TestimonialsSection';
import PassionSection from '../components/Sections/PassionSection';
import AnimatedSection from '../components/Common/AnimatedSection';
import { IMAGES } from '../constants/data';
import AntiGravitySection from '../components/Sections/AntiGravitySection';
import DreamHomeQuiz from '../components/Common/DreamHomeQuiz';


import { heroEntrance, parallaxY } from '../animations/animUtils';

const heroSlides = [
  {
    image: IMAGES.heroHome,
    subtitle: "",
    title: "Exceptional Homes for the Discerning Few"
  },
  {
    image: IMAGES.heroHome2,
    subtitle: "",
    title: "Discover Your Sanctuary of Elegance"
  },
  {
    image: IMAGES.heroHome3,
    subtitle: "",
    title: "The Pinnacle of Sophisticated Living"
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz]           = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // ─── Refs for animation targets ──────────────────────────────────────────
  const heroSectionRef = useRef(null);
  const heroBgRef      = useRef(null);
  const heroSubRef     = useRef(null);
  const heroTitleRef   = useRef(null);
  const heroButtonsRef = useRef(null);
  const hasAnimated    = useRef(false);
  const parallaxRef    = useRef(null);
  const mouseRafRef    = useRef(null);

  // ─── Auto-advance slides ──────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // ─── Hero entrance animation (runs once on first mount) ───────────────────
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Background scale: 1.05 → 1
    if (!prefersReduced && heroBgRef.current) {
      gsap.fromTo(
        heroBgRef.current,
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: 'power2.out', delay: 0.3 }
      );
    }

    // Content staggered entrance
    heroEntrance(
      heroSubRef.current,
      heroTitleRef.current,
      heroButtonsRef.current ? [heroButtonsRef.current] : []
    );
  }, []);

  // ─── Hero background scroll parallax ─────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let st = null;
    if (heroBgRef.current) {
      st = parallaxY(heroBgRef.current, {
        speed: 0.25,
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom top',
      });
    }
    return () => { if (st?.scrollTrigger) st.scrollTrigger.kill(); };
  }, []);

  // ─── Mouse parallax depth effect ─────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroSectionRef.current) return;

    if (mouseRafRef.current) return; // throttle via rAF

    mouseRafRef.current = requestAnimationFrame(() => {
      const rect = heroSectionRef.current?.getBoundingClientRect();
      if (!rect) { mouseRafRef.current = null; return; }

      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;  // -1 to 1
      const dy = (e.clientY - rect.top  - cy) / cy;  // -1 to 1

      // Gentle depth: max 5px movement
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          x:        dx * -8,
          y:        dy * -8,
          duration: 0.8,
          ease:     'power2.out',
          overwrite: 'auto',
        });
      }

      mouseRafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showQuiz && <DreamHomeQuiz onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>

      {/* Cinematic Walkthrough Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-modal-overlay"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="video-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>
                &times;
              </button>
              <div className="video-wrapper">
                <video
                  src="/assets/sunbright_video.mp4"
                  autoPlay
                  controls
                  className="modal-video-element"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Slider Section */}
      <header
        ref={heroSectionRef}
        className="hero-section"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background layer — wrapped in ref for parallax + scale */}
        <div ref={heroBgRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-${currentSlide}`}
              className="hero-slide-bg"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})`, position: 'absolute', inset: 0 }}
            />
          </AnimatePresence>
        </div>

        <div className="hero-overlay">
          <Navbar />
          <div className="hero-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                <motion.span
                  ref={heroSubRef}
                  className="hero-subtitle"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.span>
                <h1 ref={heroTitleRef} className="hero-title">{heroSlides[currentSlide].title}</h1>
                <motion.div
                  ref={heroButtonsRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="hero-buttons-container"
                >
                  <Link to="/designs">
                    <button className="btn-hero">Explore Estates</button>
                  </Link>
                  <button className="btn-hero btn-primary-match" style={{ background: '#D4AF37', color: 'black' }} onClick={() => setShowQuiz(true)}>
                    Find My Match
                  </button>
                  <button
                    className="btn-hero watch-video-btn"
                    onClick={() => setShowVideoModal(true)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(5px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#D4AF37' }}>▶</span> Watch Video
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Dots */}
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </header>

      {/* AntiGravity — already has its own entrance animation */}
      <AntiGravitySection />

      {/* Services / What We Do */}
      <AnimatedSection delay={0.05}>
        <WhatWeDoSection />
      </AnimatedSection>

      {/* AI CTA Section */}
      <AnimatedSection delay={0.05}>
        <div className="ai-cta-section" style={{
          padding: '140px 20px',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/assets/ai-bg-v2.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="section-container ai-cta-container">
            <span className="ai-cta-tag">AI Powered Discovery</span>
            <h2 className="ai-cta-title">Find Your Dream Home in Seconds</h2>
            <p className="ai-cta-desc">
              Our AI property matching engine analyzes your lifestyle preferences, budget, and architectural tastes to curate a selection of homes that feel like they were built just for you.
            </p>
            <button className="btn-hero ai-cta-btn" onClick={() => setShowQuiz(true)}>Start AI Matching Quiz</button>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            .ai-cta-section {
              padding: 140px 20px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .ai-cta-container {
              position: relative;
              zIndex: 2;
            }
            .ai-cta-tag {
              color: #D4AF37;
              letter-spacing: 3px;
              text-transform: uppercase;
              font-size: 0.9rem;
              font-weight: 600;
            }
            .ai-cta-title {
              font-size: clamp(2rem, 5vw, 3.5rem);
              margin: 20px 0;
              color: white;
              font-family: 'Playfair Display', serif;
            }
            .ai-cta-desc {
              max-width: 700px;
              margin: 0 auto 40px;
              color: rgba(255, 255, 255, 0.7);
              font-size: 1.1rem;
              line-height: 1.8;
            }
            .ai-cta-btn {
              background: #D4AF37 !important;
              color: black !important;
              border: none !important;
              font-weight: 700 !important;
            }
            @media (max-width: 768px) {
              .ai-cta-section {
                padding: 80px 20px !important;
              }
              .ai-cta-title {
                font-size: 2.2rem !important;
              }
              .ai-cta-desc {
                font-size: 1rem !important;
              }
            }
            .watch-video-btn {
              transition: all 0.3s ease !important;
            }
            .watch-video-btn:hover {
              background: rgba(255, 255, 255, 0.2) !important;
              border-color: #D4AF37 !important;
              color: #D4AF37 !important;
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
            }
            .video-modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.85);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              padding: 20px;
            }
            .video-modal-container {
              position: relative;
              width: 100%;
              max-width: 900px;
              background: #000;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 25px 50px -12px rgba(212, 175, 55, 0.25);
              border: 1px solid rgba(212, 175, 55, 0.2);
              display: flex;
              flex-direction: column;
            }
            .video-modal-close {
              position: absolute;
              top: 15px;
              right: 20px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              font-size: 2rem;
              line-height: 1;
              cursor: pointer;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10;
              transition: all 0.3s ease;
            }
            .video-modal-close:hover {
              background: #D4AF37;
              color: black;
              border-color: #D4AF37;
              transform: scale(1.1);
            }
            .video-wrapper {
              width: 100%;
              aspect-ratio: 16/9;
              position: relative;
            }
            .modal-video-element {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}} />
          {/* Animated Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />
        </div>
      </AnimatedSection>


      {/* Testimonials */}
      <AnimatedSection delay={0.05}>
        <TestimonialsSection />
      </AnimatedSection>

      {/* Passion */}
      <AnimatedSection delay={0.05}>
        <PassionSection />
      </AnimatedSection>
    </>
  );
};

export default Home;
