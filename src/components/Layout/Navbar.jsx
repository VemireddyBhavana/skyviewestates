/**
 * Navbar.jsx — Enhanced with GSAP premium animations
 *
 * Animations added (NO logic/UI changes):
 * - Page load: navbar fade-in, logo slide-in, menu items stagger
 * - Scroll direction: navbar hides when scrolling down, reveals on up
 * - Backdrop blur increases when scrolled (existing 'scrolled' class)
 * - Mobile menu: links stagger in/out
 *
 * All original nav links, favorites badge, and phone CTA are preserved.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useFavorites } from '../../context/FavoritesContext';
import Logo from '../Common/Logo';
import { navbarEntrance } from '../../animations/animUtils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  // ─── Refs for animation targets ────────────────────────────────────────────
  const navRef     = useRef(null);
  const logoRef    = useRef(null);
  const linksRef   = useRef(null);
  const lastScrollY = useRef(0);
  const ticking     = useRef(false);

  // ─── Page-load entrance animation ──────────────────────────────────────────
  useEffect(() => {
    const nav   = navRef.current;
    const logo  = logoRef.current;
    const links = linksRef.current?.querySelectorAll('li') || [];

    if (nav && logo && links.length) {
      navbarEntrance(nav, logo, Array.from(links));
    }
  }, []);

  // ─── Scroll: backdrop + hide/show behavior ─────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      if (ticking.current) return;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Scrolled state (backdrop blur intensification)
        setScrolled(currentY > 50);

        // Hide/show navbar based on direction — skip if mobile menu is open
        if (!isMenuOpen && !prefersReduced) {
          const nav = navRef.current;
          if (!nav) { ticking.current = false; return; }

          if (currentY > lastScrollY.current && currentY > 120) {
            // Scrolling DOWN → hide navbar
            nav.classList.add('hidden-up');
          } else {
            // Scrolling UP → show navbar
            nav.classList.remove('hidden-up');
          }
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });

      ticking.current = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // ─── Mobile menu link stagger animation ────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const links = linksRef.current?.querySelectorAll('li');
    if (!links?.length) return;

    if (isMenuOpen) {
      gsap.fromTo(
        links,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    }
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <div className="navbar-container">
        <span ref={logoRef}>
          <Logo />
        </span>

        <div
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul ref={linksRef} className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
          <li><Link to="/home" className={isActive('/home') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/designs" className={isActive('/designs') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Designs</Link></li>
          <li>
            <Link to="/favourites" className={isActive('/favourites') ? 'active' : ''} onClick={() => setIsMenuOpen(false)} style={{ position: 'relative' }}>
              Favorites
              {favorites.length > 0 && (
                <span className="nav-fav-badge">
                  {favorites.length}
                </span>
              )}
            </Link>
          </li>
          <li><Link to="/finance" className={isActive('/finance') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Finance</Link></li>
          <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          <li className="nav-phone-item">
            <a
              href="tel:+917799250555"
              className="nav-phone-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="nav-phone-icon"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 7799250555</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
