import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../../constants/data';

const splashImages = [IMAGES.heroHome, IMAGES.heroHome2, IMAGES.heroHome3];

const Preloader = () => {
  const [loading, setLoading] = useState(() => {
    // Check if preloader has been shown in this session
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('preloaderShown');
    }
    return true;
  });
  const [currentImg, setCurrentImg] = useState(0);
  const brandName = "SUN BRIGHT PROPERTIES";

  useEffect(() => {
    if (!loading) return;

    // Hide scrollbar while loading
    document.body.style.overflow = 'hidden';

    // Preload all critical images
    const allImages = [...splashImages];
    allImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    // Timing: Reduced to 3.5 seconds for a snappy but cinematic entrance
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
      sessionStorage.setItem('preloaderShown', 'true');
    }, 3500);

    // Speed up sequence: Start cycling images earlier to ensure all are seen
    let imgInterval;
    const cycleTimeout = setTimeout(() => {
      imgInterval = setInterval(() => {
        setCurrentImg(prev => (prev + 1) % splashImages.length);
      }, 700); // Perfect interval for 3 images in 3.5s
    }, 1000); // Start cycling at 1s

    return () => {
      clearTimeout(timer);
      clearTimeout(cycleTimeout);
      if (imgInterval) clearInterval(imgInterval);
    };
  }, [loading]);

  const letters = brandName.split("");

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="preloader-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            overflow: 'hidden'
          }}
        >
          {/* Animated Background Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              position: 'absolute',
              width: '1000px',
              height: '1000px',
              background: 'radial-gradient(circle, rgba(200, 169, 110, 0.1) 0%, transparent 70%)',
              filter: 'blur(120px)',
              zIndex: 1
            }}
          />

          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>

            {/* Step 1: Image Reveal (Starts immediately) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'min(400px, 80vw)',
                height: 'min(400px, 80vw)',
                borderRadius: '50%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 100px rgba(212, 175, 55, 0.15)',
                marginBottom: '60px',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2,
                backgroundColor: '#111',
              }}>
                <AnimatePresence>
                  <motion.div
                    key={currentImg}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <img
                      src={splashImages[currentImg]}
                      alt="Luxury Home"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.5) 100%)'
                    }} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Halo Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  inset: '-15px',
                  border: '1px solid rgba(200, 169, 110, 0.15)',
                  borderRadius: '50%'
                }}
              />
            </motion.div>

            {/* Step 2: Brand Reveal (Starts after image is settled) */}
            <div style={{ textAlign: 'center', width: '100%', padding: '0 20px' }}>
              <div style={{ display: 'flex', gap: 'clamp(2px, 1vw, 8px)', justifyContent: 'center', flexWrap: 'wrap' }}>
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.8 + (i * 0.05), // Starts faster
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    style={{
                      color: letter === " " ? "transparent" : "#C8A96E",
                      fontSize: 'clamp(1rem, 3.5vw, 2.5rem)',
                      fontWeight: '300',
                      fontFamily: "'Playfair Display', serif",
                      letterSpacing: '0.05em',
                      display: 'inline-block'
                    }}
                  >
                    {letter === " " ? "\u00A0\u00A0" : letter}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                style={{
                  height: '1px',
                  width: 'min(200px, 80vw)',
                  background: 'linear-gradient(to right, transparent, #C8A96E, transparent)',
                  margin: '20px auto'
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 2.2, duration: 1 }}
                style={{
                  color: '#2A2A2A',
                  fontSize: 'clamp(0.5rem, 2vw, 0.7rem)',
                  textTransform: 'uppercase',
                  letterSpacing: 'clamp(0.2em, 1vw, 0.5em)',
                  margin: 0,
                  paddingLeft: 'clamp(0.2em, 1vw, 0.5em)'
                }}
              >
                THE CHAMPIONS CHOICE
              </motion.p>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.5, ease: "linear" }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(to right, #000, #C8A96E, #000)',
              transformOrigin: 'left'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
