import { motion } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import AboutIntroSection from '../components/Sections/AboutIntroSection';
import ClientCentricSection from '../components/Sections/ClientCentricSection';
import OurStorySection from '../components/Sections/OurStorySection';
import MeetFoundersSection from '../components/Sections/MeetFoundersSection';
import TrustGallerySection from '../components/Sections/TrustGallerySection';
import ScrollReveal from '../components/Common/ScrollReveal';
import { IMAGES } from '../constants/data';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="hero-section" style={{ backgroundImage: `url(${IMAGES.heroAbout})` }}>
        <div className="hero-overlay">
          <Navbar />
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="hero-subtitle">Our Heritage</span>
              <h1 className="hero-title">Defining Luxury Through Generations of Excellence</h1>
            </motion.div>
          </div>
        </div>
      </header>

      <ScrollReveal>
        <AboutIntroSection />
      </ScrollReveal>

      <ScrollReveal>
        <ClientCentricSection />
      </ScrollReveal>

      <ScrollReveal>
        <OurStorySection />
      </ScrollReveal>

      <ScrollReveal>
        <MeetFoundersSection />
      </ScrollReveal>

      <ScrollReveal>
        <TrustGallerySection />
      </ScrollReveal>
    </>
  );
};

export default About;
