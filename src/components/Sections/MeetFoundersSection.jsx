import { FOUNDERS } from '../../constants/data';

const MeetFoundersSection = () => {
  const founder = FOUNDERS[0]; // Since there is exactly 1 founder

  return (
    <section className="section-container meet-founders-section">
      <div className="meet-founders-grid">
        <div className="meet-founders-img">
          <img src={founder.image} alt={founder.name} />
        </div>
        <div className="meet-founders-content">
          <span className="section-tag">
            OUR LEADERSHIP
          </span>
          <h2 className="section-title left">
            Meet Our Founder
          </h2>
          <div className="teal-line left"></div>
          
          <div className="founder-title-badge-row">
            <h3 className="founder-name">{founder.name}</h3>
            <span className="founder-role-badge">
              <span className="badge-sparkle">✦</span> {founder.role}
            </span>
          </div>
          
          <p className="lead-text">{founder.bio}</p>
          
          <p className="founder-extra-text">
            At Sun Bright Properties, we believe that every investment should create lasting value. Our mission is to deliver premium real estate opportunities with complete transparency, trusted documentation, and customer-first service. We are committed to helping families and investors secure a brighter future through quality developments and strategic locations.
          </p>
          
          <div className="founder-divider"></div>
          
          <div className="founder-footer-row">
            <div className="founder-location-tag">
              <i className="fa-solid fa-location-dot"></i>
              <span>{founder.location}</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .meet-founders-section {
          background-color: var(--bg-dark);
          color: var(--text-main);
          position: relative;
        }

        .meet-founders-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          align-items: center;
        }

        .meet-founders-img {
          max-width: 300px;
          justify-self: center;
          width: 100%;
        }

        .meet-founders-img img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--border);
        }

        .meet-founders-content {
          text-align: left;
        }

        .founder-title-badge-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .founder-name {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 600;
          color: var(--text-main);
          margin: 0;
        }

        .founder-role-badge {
          background: rgba(212, 175, 55, 0.1);
          color: var(--primary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          letter-spacing: 1.5px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          text-transform: uppercase;
          font-family: var(--font-body);
        }

        .badge-sparkle {
          color: var(--primary);
          animation: floatSparkle 2s ease-in-out infinite alternate;
        }

        @keyframes floatSparkle {
          0% { transform: scale(0.85); }
          100% { transform: scale(1.15); }
        }

        .founder-extra-text {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
          margin: 0 0 25px 0;
        }

        .founder-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 20px;
        }

        .founder-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .founder-social-links {
          display: flex;
          gap: 10px;
        }

        .founder-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .founder-social-btn:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
        }

        .founder-location-tag {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .founder-location-tag i {
          color: var(--primary);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .meet-founders-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .meet-founders-img {
            order: 1;
          }
          
          .meet-founders-content {
            order: 2;
          }

          .founder-name {
            font-size: 1.8rem;
          }
        }
      `}} />
    </section>
  );
};

export default MeetFoundersSection;
