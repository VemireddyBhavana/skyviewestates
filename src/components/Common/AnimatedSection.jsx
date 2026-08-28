/**
 * AnimatedSection.jsx
 * Lightweight GSAP ScrollTrigger entrance wrapper.
 * Uses gsap.context() for proper StrictMode cleanup.
 */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AnimatedSection = ({
  children,
  direction = 'up',
  delay = 0,
  y = 40,
  x = 50,
  duration = 0.9,
  start = 'top 88%',
  once = true,
  className = '',
  style = {},
  as: Tag = 'div',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const fromVars = { opacity: 0 };
      if (direction === 'up') fromVars.y = y;
      if (direction === 'left') fromVars.x = -x;
      if (direction === 'right') fromVars.x = x;

      gsap.fromTo(
        el,
        fromVars,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reset',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, delay, y, x, duration, start, once]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
};

export default AnimatedSection;
