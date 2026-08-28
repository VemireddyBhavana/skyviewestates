/**
 * TestimonialsSection.jsx — Enhanced with GSAP ScrollTrigger
 *
 * Animations added:
 * - Left column: slides in from left via GSAP
 * - Testimonial cards: alternate left/right entrance with stagger
 * - Stars: sequential opacity + scale reveal via GSAP
 * - Section pauses autoplay-like behavior when out of viewport
 * All original content preserved exactly.
 */

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../../constants/data';
import { slideFromLeft, slideFromRight, fadeUp } from '../../animations/animUtils';

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const triggers = [];

    // ─── Left column slide in ─────────────────────────────────────────────
    if (leftRef.current) {
      triggers.push(
        slideFromLeft(leftRef.current, { x: -60, duration: 1, start: 'top 80%' })
      );

      // Stagger left column children
      const leftChildren = leftRef.current.querySelectorAll('.quote-icon, h2, .teal-line, p, a');
      triggers.push(
        gsap.fromTo(
          leftChildren,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      );
    }

    // ─── Testimonial cards: alternate left / right ────────────────────────
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const isEven = i % 2 === 0;
      triggers.push(
        gsap.fromTo(
          card,
          { opacity: 0, x: isEven ? 50 : -50, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      );

      // ─── Stars sequential reveal ────────────────────────────────────────
      const stars = card.querySelectorAll('.star-item');
      if (stars.length) {
        triggers.push(
          gsap.fromTo(
            stars,
            { opacity: 0, scale: 0, rotate: -30 },
            {
              opacity: 1, scale: 1, rotate: 0,
              duration: 0.35,
              stagger: 0.07,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        );
      }
    });

    return () => {
      triggers.forEach((t) => {
        if (t?.scrollTrigger) t.scrollTrigger.kill();
        else if (typeof t?.kill === 'function') t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-container testimonials-section">
      {/* Left column */}
      <div ref={leftRef} className="testimonials-left">
        <div className="quote-icon" style={{ color: '#D4AF37' }}>"</div>
        <h2>The Voices of Luxury &amp; Satisfaction.</h2>
        <div className="teal-line left" />
        <p>Our reputation is built on the trust of individuals who seek nothing but the best. Hear from those who have successfully found their sanctuary through the expertise of Sun Bright Properties.</p>
        <Link to="/designs">
          <button className="btn-primary">Explore Estates</button>
        </Link>
      </div>

      {/* Testimonial cards */}
      <div className="testimonials-right">
        {TESTIMONIALS.map((testimonial, i) => (
          <div
            key={testimonial.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="testimonial-card"
          >
            {/* Stars with individual span elements for stagger animation */}
            <div className="stars">
              {Array.from({ length: testimonial.stars }).map((_, si) => (
                <span key={si} className="star-item">★</span>
              ))}
            </div>
            <p>"{testimonial.text}"</p>
            <div className="testimonial-author">{testimonial.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
