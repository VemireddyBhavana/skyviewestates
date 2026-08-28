/**
 * gsapConfig.js
 * Central GSAP configuration. Import this ONCE at the app root before any
 * other animation code. All other modules import `gsap` directly from 'gsap'.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─── Register plugins ────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── Global defaults ─────────────────────────────────────────────────────────
gsap.defaults({
  ease: 'power3.out',
  duration: 0.9,
});

// ─── ScrollTrigger defaults ───────────────────────────────────────────────────
ScrollTrigger.config({
  // Avoid jumping on mobile when address bar hides
  ignoreMobileResize: true,
});

// ─── Reduced-motion support ───────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Set duration to near-zero — elements still reach final state
  gsap.globalTimeline.timeScale(100);
  ScrollTrigger.config({ limitCallbacks: true });
}

// Listen for live changes (user toggles system setting while site is open)
prefersReducedMotion.addEventListener('change', (e) => {
  gsap.globalTimeline.timeScale(e.matches ? 100 : 1);
});

// ─── Exports ──────────────────────────────────────────────────────────────────
export { gsap, ScrollTrigger };
export const PREMIUM_EASE = 'power3.out';
export const LUXURY_EASE  = 'power4.inOut';
export const SPRING_EASE  = 'elastic.out(1, 0.75)';
