/**
 * animUtils.js
 * Reusable GSAP animation helpers. Each function returns the tween/timeline
 * so the caller can kill it on cleanup.
 *
 * All animations use CSS transforms (translate, scale, opacity) only —
 * never layout-changing properties.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PREMIUM_EASE, LUXURY_EASE } from './gsapConfig';

// ─── Helper: check reduced-motion preference ──────────────────────────────────
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── 1. Fade + translate up ───────────────────────────────────────────────────
/**
 * @param {string|Element|NodeList} targets  CSS selector or DOM element(s)
 * @param {Object} [opts]
 * @param {string} [opts.trigger]     ScrollTrigger trigger element (defaults to targets)
 * @param {number} [opts.y=50]        Start Y offset in px
 * @param {number} [opts.duration=0.9]
 * @param {number} [opts.delay=0]
 * @param {number} [opts.stagger=0]
 * @param {string} [opts.start='top 85%']
 * @param {boolean}[opts.once=true]
 * @returns {gsap.core.Tween}
 */
export function fadeUp(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const {
    trigger,
    y = 50,
    duration = 0.9,
    delay = 0,
    stagger = 0,
    start = 'top 85%',
    once = true,
  } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: PREMIUM_EASE,
      scrollTrigger: {
        trigger: trigger || (typeof targets === 'string' ? targets : targets[0] || targets),
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 2. Fade in (opacity only) ────────────────────────────────────────────────
export function fadeIn(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { trigger, duration = 0.8, delay = 0, stagger = 0, start = 'top 88%', once = true } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      stagger,
      ease: PREMIUM_EASE,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 3. Clip-path reveal (left → right curtain) ───────────────────────────────
/**
 * Reveals an element using a clip-path wipe from left to right.
 * The element must have `overflow: hidden` or the wrapper must.
 */
export function clipReveal(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { trigger, duration = 1.1, delay = 0, stagger = 0, start = 'top 80%', once = true } = opts;

  return gsap.fromTo(
    targets,
    { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration,
      delay,
      stagger,
      ease: LUXURY_EASE,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 4. Scale reveal (0.92 → 1 + opacity) ────────────────────────────────────
export function scaleReveal(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { trigger, duration = 0.9, delay = 0, stagger = 0.1, start = 'top 82%', once = true } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: PREMIUM_EASE,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 5. Slide from left ───────────────────────────────────────────────────────
export function slideFromLeft(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { trigger, x = -60, duration = 0.9, delay = 0, stagger = 0, start = 'top 82%', once = true } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: PREMIUM_EASE,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 6. Slide from right ──────────────────────────────────────────────────────
export function slideFromRight(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { trigger, x = 60, duration = 0.9, delay = 0, stagger = 0, start = 'top 82%', once = true } = opts;

  return gsap.fromTo(
    targets,
    { opacity: 0, x },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      stagger,
      ease: PREMIUM_EASE,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 7. Parallax Y ───────────────────────────────────────────────────────────
/**
 * Scroll-linked vertical parallax. The element translates on Y as user scrolls.
 * @param {string|Element} target
 * @param {Object} [opts]
 * @param {number} [opts.speed=0.3]    Multiplier: 0=none, 1=full scroll speed
 * @param {string} [opts.trigger]
 * @param {string} [opts.start='top bottom']
 * @param {string} [opts.end='bottom top']
 * @returns {ScrollTrigger}
 */
export function parallaxY(target, opts = {}) {
  if (prefersReducedMotion()) return null;

  // Reduce parallax on mobile for performance
  const isMobile = window.innerWidth < 768;
  const { speed = isMobile ? 0.15 : 0.3, trigger, start = 'top bottom', end = 'bottom top' } = opts;

  return gsap.fromTo(
    target,
    { yPercent: -speed * 50 },
    {
      yPercent: speed * 50,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || target,
        start,
        end,
        scrub: true,
      },
    }
  );
}

// ─── 8. Count-up animation ────────────────────────────────────────────────────
/**
 * Animates a number from 0 to `end` when the element enters the viewport.
 * @param {Element} el          The DOM element whose textContent gets updated
 * @param {number} end          Target number
 * @param {string} [suffix=''] Suffix to append (e.g. '+', 'K')
 * @param {number} [duration=2]
 * @returns {gsap.core.Tween}
 */
export function countUp(el, end, suffix = '', duration = 2) {
  if (prefersReducedMotion()) {
    el.textContent = end + suffix;
    return null;
  }

  const obj = { val: 0 };
  return gsap.to(obj, {
    val: end,
    duration,
    ease: PREMIUM_EASE,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      el.textContent = Math.round(obj.val) + suffix;
    },
  });
}

// ─── 9. Stagger reveal (wrapper → children) ───────────────────────────────────
/**
 * Staggers the entrance of children within a parent.
 * @param {string|Element} parent         Parent container
 * @param {string}         childSelector  CSS selector for children (relative to parent)
 * @param {Object} [opts]
 */
export function staggerChildren(parent, childSelector, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { y = 40, duration = 0.7, stagger = 0.12, delay = 0, start = 'top 82%', once = true } = opts;
  const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
  if (!parentEl) return null;

  const children = parentEl.querySelectorAll(childSelector);
  if (!children.length) return null;

  return gsap.fromTo(
    children,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: PREMIUM_EASE,
      scrollTrigger: {
        trigger: parentEl,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 10. Teal/gold line width reveal ─────────────────────────────────────────
export function lineReveal(targets, opts = {}) {
  if (prefersReducedMotion()) return null;

  const { trigger, duration = 0.8, delay = 0.2, start = 'top 85%', once = true } = opts;

  return gsap.fromTo(
    targets,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration,
      delay,
      ease: LUXURY_EASE,
      scrollTrigger: {
        trigger: trigger || targets,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    }
  );
}

// ─── 11. Navbar entrance timeline ────────────────────────────────────────────
/**
 * Runs once on page load. Returns a GSAP timeline.
 * @param {Element} navEl
 * @param {Element} logoEl
 * @param {NodeList|Element[]} menuItems
 */
export function navbarEntrance(navEl, logoEl, menuItems) {
  if (prefersReducedMotion()) {
    gsap.set([navEl, logoEl, ...menuItems], { opacity: 1, y: 0, x: 0 });
    return null;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  tl.fromTo(navEl, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: PREMIUM_EASE })
    .fromTo(logoEl, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: PREMIUM_EASE }, '-=0.3')
    .fromTo(
      menuItems,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: PREMIUM_EASE },
      '-=0.2'
    );

  return tl;
}

// ─── 12. Hero content entrance timeline ──────────────────────────────────────
export function heroEntrance(subtitle, title, buttons) {
  if (prefersReducedMotion()) {
    gsap.set([subtitle, title, ...buttons], { opacity: 1, y: 0 });
    return null;
  }

  const tl = gsap.timeline({ delay: 0.8 });

  tl.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: PREMIUM_EASE })
    .fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: PREMIUM_EASE }, '-=0.4')
    .fromTo(
      buttons,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: PREMIUM_EASE },
      '-=0.4'
    );

  return tl;
}

// ─── 13. Kill all ScrollTriggers by trigger element ──────────────────────────
/**
 * Safely kill all ScrollTriggers whose trigger matches the provided element.
 * Call this in useEffect cleanup.
 * @param {Element|null} containerEl  If provided, kills triggers inside this element.
 *                                    If null, kills ALL ScrollTriggers.
 */
export function killScrollTriggers(containerEl = null) {
  if (containerEl) {
    ScrollTrigger.getAll()
      .filter((st) => containerEl.contains(st.trigger) || containerEl === st.trigger)
      .forEach((st) => st.kill());
  } else {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
}
