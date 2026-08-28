import { Link } from 'react-router-dom';

const Logo = ({ className }) => (
  <Link to="/" className={`nav-logo ${className}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="logo-container">
      <img src="/assets/sunbright_logo.png" alt="Sun Bright Properties Logo" className="logo-icon-img" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
      <div className="logo-text">
        <span className="brand-skyview" style={{ color: 'currentColor' }}>SUN BRIGHT PROPERTIES</span>
        <span className="brand-estates" style={{ color: '#D4AF37' }}>THE CHAMPIONS CHOICE</span>
      </div>
    </div>
  </Link>
);

export default Logo;
