/**
 * motionConfig.js
 * Shared Framer Motion variants for consistent micro-interactions.
 * Import these into components that already use Framer Motion.
 */

// ─── Premium easing curves ────────────────────────────────────────────────────
export const premiumEase = [0.16, 1, 0.3, 1];   // expo-out feel
export const luxuryEase  = [0.76, 0, 0.24, 1];   // material design-like

// ─── Page / route transition ──────────────────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

// ─── Card hover (replaces inline whileHover) ──────────────────────────────────
export const cardHoverVariants = {
  rest:  { y: 0,   scale: 1,    boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: { duration: 0.3, ease: premiumEase } },
  hover: { y: -10, scale: 1.01, boxShadow: '0 20px 50px rgba(212,175,55,0.12)', transition: { duration: 0.4, ease: premiumEase } },
};

// ─── Fade up (for Framer Motion components) ───────────────────────────────────
export const fadeUpVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: premiumEase },
  }),
};

// ─── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ─── Stagger child item ───────────────────────────────────────────────────────
export const staggerItem = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: premiumEase } },
};

// ─── Scale pop (for icons, badges) ───────────────────────────────────────────
export const scalePop = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

// ─── Modal / overlay ──────────────────────────────────────────────────────────
export const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
};

export const modalVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: premiumEase } },
  exit:    { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.25 } },
};

// ─── Button micro-interaction ─────────────────────────────────────────────────
export const buttonVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap:   { scale: 0.97, transition: { duration: 0.1 } },
};

// ─── Star rating reveal ───────────────────────────────────────────────────────
export const starContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

export const starVariants = {
  hidden:  { opacity: 0, scale: 0, rotate: -30 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
};
