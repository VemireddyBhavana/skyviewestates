import { motion } from 'framer-motion';

const TRUST_MOMENTS = [
  {
    id: 1,
    title: "Client Handover Celebration",
    description: "Celebrating registered deed handover and milestone success with happy clients.",
    image: "/assets/moments/journey-20.jpg",
    tag: "HANDOVER"
  },
  {
    id: 2,
    title: "Site Visit & Property Consultation",
    description: "Personalized on-site layout review and field consultation led by leadership.",
    image: "/assets/moments/journey-21.jpg",
    tag: "CEO IN ACTION"
  },
  {
    id: 3,
    title: "Plot Booking & Client Milestone",
    description: "Official plot booking verification and documentation handover with client.",
    image: "/assets/moments/journey-22.jpg",
    tag: "CLIENT SUCCESS"
  }
];

const MomentsOfTrustSection = () => {
  return (
    <section className="section-container moments-trust-section">
      <div className="moments-trust-header">
        <span className="section-tag centered">OUR JOURNEY</span>
        <h2 className="section-title centered">CEO in Action & Client Success</h2>
        <div className="teal-line centered"></div>
        <p className="section-subtitle">
          Real moments, genuine trust. Discover our journey of delivering premium properties and building lifelong relationships across Hyderabad.
        </p>
      </div>

      <div className="moments-grid">
        {TRUST_MOMENTS.map((moment, index) => (
          <motion.div 
            className="moment-card" 
            key={moment.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.15, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            <div className="moment-img-wrapper">
              <img src={moment.image} alt={moment.title} className="moment-img" />
              <span className="moment-tag-badge">{moment.tag}</span>
              <div className="moment-hover-overlay">
                <span className="overlay-icon">✦</span>
              </div>
            </div>
            <div className="moment-info">
              <h3 className="moment-card-title">{moment.title}</h3>
              <p className="moment-card-desc">{moment.description}</p>
              <div className="moment-card-footer">
                <span className="card-accent-line"></span>
                <span className="card-explore-btn">View Details <i className="fa-solid fa-chevron-right"></i></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .moments-trust-section {
          background-color: #ffffff; /* Elegant white background */
          color: var(--text-main);
          padding-top: 80px;
          padding-bottom: 120px;
          position: relative;
        }

        .moments-trust-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 70px auto;
        }

        .section-subtitle {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-top: 15px;
        }

        .moments-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (max-width: 991px) {
          .moments-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 767px) {
          .moments-grid {
            grid-template-columns: 1fr;
            gap: 35px;
            max-width: 480px;
          }
        }

        .moment-card {
          background: #ffffff;
          border-radius: 16px; /* Rounded corners */
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.04); /* Subtle shadow */
          border: 1px solid rgba(212, 175, 55, 0.15); /* Soft gold accent border */
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s ease;
        }

        .moment-card:hover {
          transform: translateY(-10px); /* Smooth hover animation */
          box-shadow: 0 25px 50px rgba(212, 175, 55, 0.08); /* Gold tinted soft glow */
          border-color: var(--primary); /* Gold highlight border */
        }

        .moment-img-wrapper {
          position: relative;
          width: 100%;
          padding-top: 70%; /* Perfect elegant aspect ratio */
          overflow: hidden;
          background-color: #fcfcfc;
        }

        .moment-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .moment-card:hover .moment-img {
          transform: scale(1.08);
        }

        .moment-tag-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background-color: rgba(255, 255, 255, 0.95);
          color: var(--text-main);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 6px 12px;
          border-radius: 40px;
          border: 1px solid var(--primary);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          z-index: 2;
        }

        .moment-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(212,175,55,0.2) 100%);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .moment-card:hover .moment-hover-overlay {
          opacity: 1;
        }

        .overlay-icon {
          color: #ffffff;
          font-size: 2.2rem;
          text-shadow: 0 0 15px rgba(212,175,55,0.8);
          transform: translateY(20px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .moment-card:hover .overlay-icon {
          transform: translateY(0);
        }

        .moment-info {
          padding: 28px;
          text-align: left;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .moment-card-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-main);
          margin: 0 0 12px 0;
          transition: color 0.3s ease;
        }

        .moment-card:hover .moment-card-title {
          color: var(--primary);
        }

        .moment-card-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0 0 20px 0;
          flex-grow: 1;
        }

        .moment-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 15px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .card-accent-line {
          width: 30px;
          height: 2px;
          background-color: var(--primary);
          transition: width 0.3s ease;
        }

        .moment-card:hover .card-accent-line {
          width: 50px;
        }

        .card-explore-btn {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
          letter-spacing: 0.5px;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .moment-card:hover .card-explore-btn {
          color: var(--primary);
        }

        .card-explore-btn i {
          font-size: 0.75rem;
          transition: transform 0.3s ease;
        }

        .moment-card:hover .card-explore-btn i {
          transform: translateX(4px);
        }
      `}} />
    </section>
  );
};

export default MomentsOfTrustSection;
