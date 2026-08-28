import { motion } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import AboutIntroSection from '../components/Sections/AboutIntroSection';
import OurStorySection from '../components/Sections/OurStorySection';
import MeetFoundersSection from '../components/Sections/MeetFoundersSection';
import TrustGallerySection from '../components/Sections/TrustGallerySection';
import { IMAGES } from '../constants/data';

const About = () => {
  return (
    <>
      {/* Hero */}
      <header className="hero-section small" style={{ backgroundImage: `url(${IMAGES.heroAbout})` }}>
        <div className="hero-overlay">
          <Navbar />
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <span className="hero-subtitle">Our Heritage</span>
              <h1 className="hero-title">Defining Luxury Through Generations of Excellence</h1>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Each section manages its own GSAP entrance internally */}
      <AboutIntroSection />
      <OurStorySection />
      <MeetFoundersSection />
      <TrustGallerySection />
    </>
  );
};

export default About;
