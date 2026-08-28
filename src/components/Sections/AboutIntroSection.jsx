import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { IMAGES } from '../../constants/data';

/* ── Animated stat counter ─────────────────────────────────────────── */
function StatCounter({ end, suffix, label }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.textContent = `${end}${suffix}`;
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, suffix]);

  return (
    <div style={{ minWidth: '100px' }}>
      <div
        ref={numRef}
        style={{
          color: '#D4AF37',
          fontSize: '2.5rem',
          fontWeight: '700',
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1,
        }}
      >
        0{suffix}
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem', margin: '6px 0 0 0' }}>{label}</p>
    </div>
  );
}

/* ── Main section ───────────────────────────────────────────────────── */
const AboutIntroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Image clip-path reveal
      const img = section.querySelector('.about-intro-img');
      if (img) {
        gsap.fromTo(
          img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: img,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Text elements stagger
      const textEls = section.querySelectorAll('.about-intro-content h2, .about-intro-content .teal-line, .about-intro-content .lead-text, .about-intro-content > p:not(.lead-text)');
      if (textEls.length) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section.querySelector('.about-intro-content'),
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stats row fade up
      const statsRow = section.querySelector('.about-stats-row');
      if (statsRow) {
        gsap.fromTo(
          statsRow,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRow,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-container about-intro-section">
      <div className="about-intro-grid">
        {/* Image */}
        <div
          className="about-intro-img"
          style={{ overflow: 'hidden', borderRadius: '12px' }}
        >
          <img
            src={IMAGES.aboutIntro}
            alt="Modern House"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Content */}
        <div className="about-intro-content">
          <h2 className="section-title left">About Us</h2>
          <div className="teal-line left" />
          <p className="lead-text">
            Welcome to Real Estate, your trusted partner in the world of real estate. With a passion for connecting people with their dream properties, we are dedicated to providing exceptional service and delivering outstanding results.
          </p>
          <p>
            At Real Estate, we pride ourselves on being a trusted and reputable name in the real estate industry. With years of experience and a dedicated team of professionals, we are committed to providing exceptional service to our clients.
          </p>

          {/* Stats */}
          <div
            className="about-stats-row"
            style={{ display: 'flex', gap: '36px', marginTop: '36px', flexWrap: 'wrap' }}
          >
            <StatCounter end={500}  suffix="+" label="Projects Completed" />
            <StatCounter end={1200} suffix="+" label="Happy Clients" />
            <StatCounter end={15}   suffix="+" label="Years Experience" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;
