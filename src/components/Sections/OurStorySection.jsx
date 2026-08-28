import { useRef, useEffect } from 'react';
import { IMAGES } from '../../constants/data';
import { fadeUp, clipReveal, lineReveal, staggerChildren } from '../../animations/animUtils';

const OurStorySection = () => {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tweens = [];

    if (imgWrapRef.current) {
      tweens.push(clipReveal(imgWrapRef.current, { delay: 0.2, start: 'top 80%' }));
    }

    if (contentRef.current) {
      tweens.push(
        staggerChildren(contentRef.current, 'h2, .teal-line, p', {
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          start: 'top 80%',
        })
      );
    }

    return () => tweens.forEach((t) => { if (t?.scrollTrigger) t.scrollTrigger.kill(); });
  }, []);

  return (
    <section ref={sectionRef} className="section-container our-story-section">
      <div className="our-story-grid">
        <div ref={contentRef} className="our-story-content">
          <h2 className="section-title left">Our Story</h2>
          <div className="teal-line left"></div>
          <p className="lead-text">Built on a foundation of trust, integrity, and a deep-rooted passion for architectural excellence.</p>
          <p>From our humble beginnings to becoming a leader in the luxury real estate market, our journey has always been defined by the people we serve. We believe that a home is more than just a property; it's a sanctuary where life unfolds. Over the years, we have refined our expertise to offer an unparalleled experience, combining data-driven insights with a personal touch that ensures every client finds their perfect match.</p>
          <p>Our commitment goes beyond transactions. We strive to build lasting relationships and contribute to the growth of the communities we operate in. With a team of experts who understand the nuances of the local and global markets, we are here to turn your real estate aspirations into reality.</p>
        </div>
        <div ref={imgWrapRef} className="our-story-img clip-hidden" style={{ overflow: 'hidden' }}>
          <img src={IMAGES.ourStory} alt="Modern Interior" />
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
