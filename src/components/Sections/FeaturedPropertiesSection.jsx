/**
 * FeaturedPropertiesSection.jsx — Enhanced with GSAP ScrollTrigger animations
 * Clean, balanced padding and grid spacing with zero excessive whitespace gaps.
 */

import { useRef, useEffect } from 'react';
import PropertyCard from '../Common/PropertyCard';
import { PROPERTIES } from '../../constants/data';
import { fadeUp, lineReveal, staggerChildren } from '../../animations/animUtils';

const FeaturedPropertiesSection = () => {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef     = useRef(null);
  const gridRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tweens = [];

    if (titleRef.current)    tweens.push(fadeUp(titleRef.current, { start: 'top 82%' }));
    if (subtitleRef.current) tweens.push(fadeUp(subtitleRef.current, { delay: 0.1, y: 30, start: 'top 82%' }));
    if (lineRef.current)     tweens.push(lineReveal(lineRef.current, { delay: 0.2, start: 'top 82%' }));

    if (gridRef.current) {
      tweens.push(staggerChildren(gridRef.current, '.properties-grid > div', {
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        start: 'top 80%',
      }));
    }

    return () => tweens.forEach((t) => { if (t?.scrollTrigger) t.scrollTrigger.kill(); });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-primary)',
        width: '100%',
        padding: '70px 0 60px',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
        <h2 ref={titleRef} className="section-title">Featured Properties</h2>
        <p ref={subtitleRef} className="section-subtitle" style={{ marginBottom: '15px' }}>
          Discover our hand-picked selection of top-notch properties with outstanding features,
          guaranteed to meet your real estate needs and exceed your expectations.
        </p>
        <div ref={lineRef} className="teal-line" style={{ margin: '15px auto 35px' }} />
      </div>

      <div
        ref={gridRef}
        className="properties-grid"
        style={{ marginTop: '35px', paddingLeft: '40px', paddingRight: '40px' }}
      >
        {PROPERTIES.slice(0, 6).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
