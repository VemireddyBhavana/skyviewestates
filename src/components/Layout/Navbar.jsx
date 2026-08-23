import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import Logo from '../Common/Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/' || location.pathname === '/home')) return true;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <Logo />
        
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
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
