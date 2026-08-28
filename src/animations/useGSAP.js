/**
 * useGSAP.js
 * Scoped GSAP hook that automatically kills ScrollTriggers on unmount.
 *
 * Usage:
 *   const containerRef = useRef(null);
 *   useGSAP(() => {
 *     gsap.from('.my-el', { opacity: 0 });
 *   }, containerRef);
 *
 * @param {Function} callback    Animation setup function. Receives no args.
 * @param {React.RefObject} ref  Container element ref for scoping + cleanup.
 * @param {Array} [deps=[]]      Re-run when these values change (like useEffect deps).
 */

import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Use useLayoutEffect on client (avoids flash), useEffect on SSR fallback
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGSAP(callback, ref, deps = []) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(callback, ref?.current);

    return () => {
      ctx.revert(); // Kills all animations + ScrollTriggers in this context
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Debounced resize handler for ScrollTrigger refresh.
 * Attach once at the app root.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);
}
