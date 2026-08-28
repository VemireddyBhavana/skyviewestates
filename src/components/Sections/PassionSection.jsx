/**
 * PassionSection.jsx — Enhanced with GSAP clip-path reveal + parallax
 *
 * Animations added:
 * - Image: clip-path curtain reveal (inset 0 100% → 0 0%) on scroll
 * - Image: subtle parallax as user scrolls past
 * - Text content: staggered fadeUp on scroll
 * All original content, layout, and links preserved.
 */

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { IMAGES } from '../../constants/data';
import { clipReveal, parallaxY, staggerChildren } from '../../animations/animUtils';

const PassionSection = () => {
  const sectionRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const imgRef      = useRef(null);
  const contentRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tweens = [];

    // ─── Image clip-path reveal ────────────────────────────────────────────
    if (!prefersReduced && imgWrapRef.current) {
      tweens.push(clipReveal(imgWrapRef.current, { duration: 1.2, start: 'top 78%' }));
    }

    // ─── Image parallax ────────────────────────────────────────────────────
    if (!prefersReduced && imgRef.current) {
      tweens.push(parallaxY(imgRef.current, {
        speed: 0.15,
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
      }));
    }

    // ─── Text content stagger ──────────────────────────────────────────────
    if (contentRef.current) {
      tweens.push(
        staggerChildren(contentRef.current, 'h2, .teal-line, p, a', {
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          start: 'top 78%',
        })
      );
    }

    return () => tweens.forEach((t) => { if (t?.scrollTrigger) t.scrollTrigger.kill(); });
  }, []);

  return (
    <section ref={sectionRef} className="section-container passion-section">
      {/* Image with clip-path reveal container */}
      <div ref={imgWrapRef} className="passion-img" style={{ overflow: 'hidden' }}>
        <img ref={imgRef} src={IMAGES.passion} alt="Modern House" />
      </div>

      <div ref={contentRef} className="passion-content">
        <h2>Our Passion is Defining the Art of Living.</h2>
        <div className="teal-line left" />
        <p>
          At Sun Bright Properties, we believe a home is more than just a property—it is a sanctuary,
          an investment, and a legacy. We are dedicated to providing a seamless, sophisticated
          experience for the world's most discerning clients, ensuring every transition is as
          extraordinary as the properties we represent.
        </p>
        <Link to="/about">
          <button className="btn-primary">Our Heritage</button>
        </Link>
      </div>
    </section>
  );
};

export default PassionSection;
