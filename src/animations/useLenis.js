/**
 * useLenis.js
 * Initialises Lenis smooth scroll and wires it into GSAP's RAF loop.
 * Uses the modern Lenis API (v1.x) without ScrollerProxy.
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance = null;

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Avoid double-init in React StrictMode
    if (lenisInstance) {
      lenisRef.current = lenisInstance;
      return;
    }

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisInstance = lenis;
    lenisRef.current = lenis;

    // Wire Lenis into GSAP ticker for ScrollTrigger sync
    function onRaf(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis scroll events
    lenis.on('scroll', () => ScrollTrigger.update());

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisRef.current;
}

/**
 * Programmatically scroll to a target using Lenis.
 */
export function scrollTo(target, opts = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2, ...opts });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
}
