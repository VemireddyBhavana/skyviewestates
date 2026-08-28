/**
 * MagneticButton.jsx
 * Wraps any element and gives it a magnetic hover effect.
 * On mousemove inside the element, the content shifts toward the cursor.
 * On mouseleave, it springs back smoothly via GSAP.
 *
 * Usage:
 *   <MagneticButton strength={0.4}>
 *     <button className="btn-primary">Click Me</button>
 *   </MagneticButton>
 *
 * Note: The wrapper has display:inline-flex so it doesn't change block layout.
 */

import { useRef } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({ children, strength = 0.35, className = '', style = {} }) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;

    gsap.to(innerRef.current, {
      x: dx,
      y: dy,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <span
      ref={wrapRef}
      className={`magnetic-wrap ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={innerRef} style={{ display: 'inline-flex' }}>
        {children}
      </span>
    </span>
  );
};

export default MagneticButton;
