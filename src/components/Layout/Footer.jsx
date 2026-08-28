import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Logo from '../Common/Logo';
import { CONTACT_INFO } from '../../constants/data';
import { staggerChildren } from '../../animations/animUtils';
import { scrollTo } from '../../animations/useLenis';

const Footer = () => {
  const [showLiveFeed, setShowLiveFeed] = useState(false);
  const [footerSearch, setFooterSearch] = useState('');
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const bottomRef = useRef(null);

  const handleFooterSearch = (e) => {
    e.preventDefault();
    if (footerSearch.trim()) {
      navigate(`/designs?q=${encodeURIComponent(footerSearch.trim())}`);
      setFooterSearch('');
    }
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tweens = [];

    // Stagger footer columns
    if (gridRef.current) {
      tweens.push(
        staggerChildren(gridRef.current, '.footer-col', {
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          start: 'top 90%',
        })
      );
    }

    // Fade up footer bottom
    if (bottomRef.current) {
      tweens.push(
        gsap.fromTo(bottomRef.current, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out', 
            scrollTrigger: {
              trigger: bottomRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none'
            }
          }
        )
      );
    }

    return () => tweens.forEach((t) => {
      if (t?.scrollTrigger) t.scrollTrigger.kill();
      else if (typeof t?.kill === 'function') t.kill();
    });
  }, []);

  return (
    <footer className="footer-section section-container">
      <div ref={gridRef} className="footer-grid">
        <div className="footer-col">
          <Logo />
        </div>
        <div className="footer-col">
          <h3 onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About Us</h3>
          <p>At Sun Bright Properties, we pride ourselves on being a trusted and reputable name in the luxury real estate industry with years of experience. <span onClick={() => navigate('/about')} style={{ color: '#D4AF37', cursor: 'pointer', fontWeight: '600' }}>Read More →</span></p>
        </div>
        <div className="footer-col">
          <h3>Contact Info</h3>
          <div className="contact-links">
            <a href="#" style={{ pointerEvents: 'none' }}>{CONTACT_INFO.address}</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sunbrightproperties99@gmail.com" target="_blank" rel="noopener noreferrer">{CONTACT_INFO.email}</a>
            <a href={`tel:${CONTACT_INFO.phone.replace(/[\s-]/g, '')}`}>{CONTACT_INFO.phone}</a>
          </div>
        </div>
        <div className="footer-col">
          <h3>Property Search</h3>
          <p>Explore our diverse portfolio of real estate opportunities.</p>
          <form className="footer-search" onSubmit={handleFooterSearch}>
            <input 
              type="text" 
              placeholder="Search Properties" 
              value={footerSearch}
              onChange={(e) => setFooterSearch(e.target.value)}
            />
            <button type="submit" className="footer-search-btn">🔍</button>
          </form>
        </div>
      </div>
      
      <div ref={bottomRef} className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} Sun Bright Properties Company</p>
        <div className="footer-bottom-right">
          <div className="footer-socials">
            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-youtube"></i></a>
            <button 
              className="footer-camera-btn" 
              onClick={() => setShowLiveFeed(true)}
              title="Live Site Monitoring"
              style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1.2rem', padding: '0 10px' }}
            >
              <i className="fa-solid fa-camera"></i>
            </button>
          </div>
          <button className="back-to-top" onClick={() => scrollTo(0)}>
            ↑
          </button>
        </div>
      </div>

      {/* Global Live Feed Modal */}
      <AnimatePresence>
        {showLiveFeed && (
          <motion.div 
            className="live-feed-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="modal-content" style={{ background: '#111', borderRadius: '20px', width: '90%', maxWidth: '800px', padding: '20px', position: 'relative' }}>
              <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '20px' }}>
                <h3><i className="fa-solid fa-cloud-arrow-up" style={{ color: '#D4AF37', marginRight: '10px' }}></i> PROJECT PHOTO UPLOAD</h3>
                <button onClick={() => setShowLiveFeed(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>
              <div className="upload-section" style={{ padding: '40px 20px', border: '2px dashed #333', borderRadius: '15px', textAlign: 'center', background: '#1a1a1a' }}>
                <i className="fa-solid fa-camera-retro" style={{ fontSize: '3rem', color: '#333', marginBottom: '20px', display: 'block' }}></i>
                <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '25px' }}>Select project photos or site documents to upload for review.</p>
                <label className="btn-primary" style={{ display: 'inline-block', cursor: 'pointer', padding: '12px 30px' }}>
                  <i className="fa-solid fa-plus" style={{ marginRight: '10px' }}></i>
                  Select Files to Upload
                  <input type="file" multiple style={{ display: 'none' }} onChange={() => alert("Files selected and queued for upload!")} />
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
