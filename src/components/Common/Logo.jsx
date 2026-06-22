import { Link } from 'react-router-dom';

const Logo = ({ className }) => (
  <Link to="/" className={`nav-logo ${className}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="logo-container">
      <img src="https://res.cloudinary.com/djzgjy947/image/upload/v1782116843/Screenshot_2026-06-01_090635_wodt1g.png" alt="Sun Bright Properties Icon" className="logo-icon-img" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
      <div className="logo-text">
        <span className="brand-skyview" style={{ color: 'currentColor' }}>SUN BRIGHT PROPERTIES</span>
        <span className="brand-estates" style={{ color: '#D4AF37' }}>THE CHAMPIONS CHOICE</span>
      </div>
    </div>
  </Link>
);

export default Logo;
