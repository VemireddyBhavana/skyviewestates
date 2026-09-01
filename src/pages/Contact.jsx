import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import AnimatedSection from '../components/Common/AnimatedSection';
import RippleButton from '../components/Common/RippleButton';
import { IMAGES, CONTACT_INFO } from '../constants/data';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when the user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else {
      const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success Submission Flow
    setSubmitted(true);

    // Format WhatsApp message
    const messageText = `🏡 New Property Inquiry

Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/917799250555?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Show success toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <>
      <header className="hero-section small" style={{ backgroundImage: `url(${IMAGES.contact})`, willChange: 'transform' }}>
        <div className="hero-overlay">
          <Navbar />
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="hero-subtitle">Get in Touch</span>
              <h1 className="hero-title">Begin Your Journey to Exceptional Living</h1>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="section-container">
        <div className="contact-page-grid">
          <AnimatedSection direction="left" delay={0.1}>
            <div className="contact-welcome-container">
              <h2>We are excited to connect with you and assist you with your real estate needs</h2>
              <div className="teal-line left"></div>
              
              <div className="contact-details-minimal">
                <div className="detail-item">
                  <span className="detail-tag">PHONE</span>
                  <p>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/[\s-]/g, '')}`} className="contact-detail-link anim-link">
                      P: {CONTACT_INFO.phone}
                    </a>
                  </p>
                </div>
                <div className="detail-item">
                  <span className="detail-tag">EMAIL</span>
                  <p>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sunbrightproperties9@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-detail-link anim-link">
                      {CONTACT_INFO.email}
                    </a>
                  </p>
                </div>
                <div className="detail-item">
                  <span className="detail-tag">ADDRESS</span>
                  <p>A: {CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.2}>
            <div className="reach-out-card">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <span className="contact-tag">CONTACT US</span>
                    <h3>Send us a Message</h3>
                    <div className="teal-line"></div>
                    <form className="contact-form-minimal" onSubmit={handleSubmit} noValidate>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                        {errors.fullName && (
                          <span style={{ color: '#e53e3e', fontSize: '0.75rem', fontWeight: '500', paddingLeft: '4px' }}>
                            {errors.fullName}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && (
                          <span style={{ color: '#e53e3e', fontSize: '0.75rem', fontWeight: '500', paddingLeft: '4px' }}>
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <span style={{ color: '#e53e3e', fontSize: '0.75rem', fontWeight: '500', paddingLeft: '4px' }}>
                            {errors.email}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                        {errors.subject && (
                          <span style={{ color: '#e53e3e', fontSize: '0.75rem', fontWeight: '500', paddingLeft: '4px' }}>
                            {errors.subject}
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && (
                          <span style={{ color: '#e53e3e', fontSize: '0.75rem', fontWeight: '500', paddingLeft: '4px' }}>
                            {errors.message}
                          </span>
                        )}
                      </div>

                      <RippleButton type="submit" className="btn-primary full-width">SEND MESSAGE</RippleButton>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="booking-success"
                    style={{ padding: '20px 0' }}
                  >
                    <div className="success-icon" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>✓</div>
                    <h3>Message Ready</h3>
                    <p>Thank you! Your inquiry is ready to be sent via WhatsApp.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                      <RippleButton
                        className="btn-primary"
                        onClick={() => {
                          const messageText = `🏡 New Property Inquiry

Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}`;
                          window.open(`https://wa.me/917799250555?text=${encodeURIComponent(messageText)}`, '_blank');
                        }}
                      >
                        Send via WhatsApp
                      </RippleButton>
                      <RippleButton
                        className="btn-primary"
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--border)',
                          color: 'var(--text-main)'
                        }}
                        onClick={handleReset}
                      >
                        Send Another Message
                      </RippleButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Map Section */}
      <AnimatedSection direction="fade" delay={0.2} duration={1.2}>
        <section className="map-section">
          <div className="map-container">
            <iframe 
              src="https://maps.google.com/maps?q=18.6722592,78.1060717&z=17&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </section>
      </AnimatedSection>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '30px',
              left: '50%',
              zIndex: 9999,
              background: '#ffffff',
              color: '#1A1A1A',
              padding: '16px 24px',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 1px rgba(212, 175, 55, 0.4)',
              borderLeft: '4px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.9rem',
              fontWeight: '500',
              width: 'max-content',
              maxWidth: '90vw'
            }}
          >
            <span style={{ color: '#D4AF37', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</span>
            <span>Thank you! Your inquiry is ready to be sent via WhatsApp.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;
