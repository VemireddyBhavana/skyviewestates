/**
 * AnimatedCounter.jsx
 * GSAP count-up when element enters viewport.
 * Uses gsap.context() for StrictMode-safe cleanup. No require(), no dynamic imports.
 */

import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AnimatedCounter = ({ end = 0, suffix = '', prefix = '', label = '', className = '', style = {} }) => {
  const elRef = useRef(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayed(end);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => setDisplayed(Math.round(obj.val)),
      });
    }, el);

    return () => ctx.revert();
  }, [end]);

  return (
    <div className={`animated-counter ${className}`} ref={elRef} style={style}>
      <span className="counter-number">
        {prefix}{displayed}{suffix}
      </span>
      {label && <span className="counter-label">{label}</span>}
    </div>
  );
};

export default AnimatedCounter;
