import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Contact from './pages/Contact'
import Footer from './components/Layout/Footer'
import SplashCursor from './components/Common/SplashCursor'
import Chatbot from './components/Common/Chatbot'
import ComparisonBar from './components/Common/ComparisonBar'
import './App.css'
import './animations/animations.css'
import Preloader from './components/Common/Preloader'

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

import ComparePage from './pages/ComparePage'
import MortgageCalculatorPage from './pages/MortgageCalculatorPage'

import { FavoritesProvider } from './context/FavoritesContext'
import { ComparisonProvider } from './context/ComparisonContext'

import ScrollToTop from './components/Common/ScrollToTop'

// ─── Animation infrastructure ────────────────────────────────────────────────
import './animations/gsapConfig' // Registers GSAP plugins + sets defaults
import { useLenis } from './animations/useLenis'
import { useScrollTriggerRefresh } from './animations/useGSAP'

function App() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // ─── Initialize Lenis smooth scroll + wire to GSAP ──────────────────────
  useLenis();

  // ─── Refresh ScrollTrigger on window resize (debounced 200ms) ───────────
  useScrollTriggerRefresh();

  return (
    <FavoritesProvider>
      <ComparisonProvider>
        <div className="app-wrapper">
          <ScrollToTop />
          <Preloader />
          <SplashCursor />
          <Chatbot />
          <ComparisonBar />
          <motion.div className="scroll-progress" style={{ scaleX }} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.2, 
                ease: "easeOut" 
              }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/designs" element={<Properties />} />
                <Route path="/designs/:category" element={<Properties />} />
                <Route path="/designs/:category/:subCategory" element={<Properties />} />
                <Route path="/designs/villa/:subCategory" element={<Properties />} />
                <Route path="/favourites" element={<Properties />} />
                <Route path="/properties/*" element={<Navigate to="/designs" replace />} />
                <Route path="/properties" element={<Navigate to="/designs" replace />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/finance" element={<MortgageCalculatorPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>

          <Footer />
        </div>
      </ComparisonProvider>
    </FavoritesProvider>
  )
}

export default App
