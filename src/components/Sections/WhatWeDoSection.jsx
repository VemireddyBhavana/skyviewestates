/**
 * WhatWeDoSection.jsx — Enhanced with GSAP ScrollTrigger animations
 *
 * Animations added:
 * - Section heading + subtitle: GSAP fadeUp
 * - Gold teal line: scaleX reveal from left
 * - Service cards: stagger entrance (opacity + y + scale)
 * All existing Framer Motion hover interactions preserved.
 */

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants/data';
import { fadeUp, lineReveal, staggerChildren } from '../../animations/animUtils';

const WhatWeDoSection = () => {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef     = useRef(null);
  const gridRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tweens = [];

    // Title
    if (titleRef.current) tweens.push(fadeUp(titleRef.current, { start: 'top 82%' }));

    // Subtitle
    if (subtitleRef.current) tweens.push(fadeUp(subtitleRef.current, { delay: 0.1, y: 30, start: 'top 82%' }));

    // Gold line reveal
    if (lineRef.current) tweens.push(lineReveal(lineRef.current, { delay: 0.2, start: 'top 82%' }));

    // Cards stagger
    if (gridRef.current) {
      tweens.push(staggerChildren(gridRef.current, '.service-card', {
        y: 50,
        duration: 0.8,
        stagger: 0.13,
        start: 'top 80%',
      }));
    }

    return () => tweens.forEach((t) => { if (t?.scrollTrigger) t.scrollTrigger.kill(); });
  }, []);

  return (
    <section ref={sectionRef} className="section-container text-center">
      <h2 ref={titleRef} className="section-title">Our Expertise</h2>
      <p ref={subtitleRef} className="section-subtitle">
        From curated investment portfolios to bespoke residential management,
        we redefine the luxury real estate experience through precision, passion, and unparalleled expertise.
      </p>
      <div ref={lineRef} className="teal-line" />

      <div ref={gridRef} className="services-grid">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            className="service-card"
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="service-img-container">
              <img src={service.image} alt={service.title} />
            </div>
            <span className="service-num">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeDoSection;
