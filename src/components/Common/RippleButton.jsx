/**
 * RippleButton.jsx
 * Adds a click ripple effect to any button.
 * Purely CSS + DOM — no layout change, no GSAP needed here.
 *
 * Usage:
 *   <RippleButton className="btn-primary" onClick={handleClick}>
 *     Send Message
 *   </RippleButton>
 */

import { useRef } from 'react';

const RippleButton = ({
  children,
  className = '',
  style = {},
  onClick,
  type = 'button',
  ...rest
}) => {
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    // Create ripple element
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.style.width  = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left   = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top    = `${e.clientY - rect.top  - size / 2}px`;
    ripple.className    = 'ripple-wave';

    btn.appendChild(ripple);

    // Remove after animation completes
    ripple.addEventListener('animationend', () => ripple.remove());

    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      type={type}
      className={`ripple-btn ${className}`}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default RippleButton;
