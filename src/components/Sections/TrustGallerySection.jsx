import CircularGallery from '../Common/CircularGallery/CircularGallery';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780219352/WhatsApp_Image_2026-05-27_at_8.27.25_AM_drcwdp.jpg",
    alt: "CEO Landmark Site Inspection",
    caption: "Overseeing landmark layouts and premium real estate developments."
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312133/2_bhhf65.jpg",
    alt: "CEO On-site Consultation",
    caption: "Guiding clients through layout options and project highlights."
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312142/3_evxzgv.jpg",
    alt: "Client Handover Celebration",
    caption: "Celebrating customer satisfaction and premium key handover."
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312153/4_w9rsh7.jpg",
    alt: "Property Site Consultation",
    caption: "Inspecting prime land developments and secure boundaries."
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312165/5_epvks2.jpg",
    alt: "Trust Handshake Milestone",
    caption: "Securing investments with transparent and verified documentation."
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312175/6_gg9zmv.jpg",
    alt: "Customer Milestone Celebration",
    caption: "Delivering dream plots and celebrating client success."
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312189/7_nsrzcr.jpg",
    alt: "Happy Family Handover",
    caption: "Welcoming our valuable clients to their premium plots."
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312199/8_xzn7vn.jpg",
    alt: "Investment Agreement Closing",
    caption: "Completing legal registrations with trusted verification."
  },
  {
    id: 9,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312208/9_pahdex.jpg",
    alt: "Premium Plot Discussion",
    caption: "Delivering layout sheets and structural blueprints on site."
  },
  {
    id: 10,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312216/10_cdit01.jpg",
    alt: "Landowner Handover Milestone",
    caption: "Securing brighter futures for modern family investors."
  },
  {
    id: 11,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312226/11_u5dqz9.jpg",
    alt: "CEO & Client Consultation",
    caption: "Explaining elite layout parameters with full transparency."
  },
  {
    id: 12,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312237/12_rfhuxf.jpg",
    alt: "Team Milestone Review",
    caption: "Discussing layout parameters with engineering specialists."
  },
  {
    id: 13,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312245/13_lcjxzg.jpg",
    alt: "Customer Trust Presentation",
    caption: "Fostering long-term customer relationships with verified plots."
  },
  {
    id: 14,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312257/14_h5e6bn.jpg",
    alt: "On-site Plot Handover",
    caption: "Direct registration verification on the physical site."
  },
  {
    id: 15,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312266/15_xcfk3i.jpg",
    alt: "Layout Planning Meeting",
    caption: "Refining custom plans with layout surveyors."
  },
  {
    id: 16,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312275/16_rozoxt.jpg",
    alt: "Elite Property Handover",
    caption: "Building lifetime relationships through premium land development."
  },
  {
    id: 17,
    url: "https://res.cloudinary.com/djzgjy947/image/upload/v1780312285/17_epzd2m.jpg",
    alt: "Consultation & Deal Closure",
    caption: "Celebrating secure land titles and successful ownership transfers."
  }
];

const TrustGallerySection = () => {
  const galleryItems = GALLERY_IMAGES.map((img) => ({
    image: img.url,
    text: img.alt
  }));

  return (
    <section className="trust-gallery-section">
      <div className="section-container" style={{ paddingBottom: '20px' }}>
        <div className="trust-gallery-header">
          <span className="section-tag centered">MOMENTS OF TRUST</span>
          <h2 className="section-title centered">Our Journey In Action</h2>
          <div className="teal-line centered"></div>
        </div>
      </div>

      {/* WebGL Curve Gallery */}
      <div style={{ height: '550px', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <CircularGallery 
          items={galleryItems} 
          bend={3} 
          textColor="#1a1a1a" 
          borderRadius={0.05} 
          scrollEase={0.03}
          font="bold 24px Poppins"
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .trust-gallery-section {
          background-color: var(--bg-dark);
          padding: 80px 0 120px 0;
          overflow: hidden;
          position: relative;
        }

        .trust-gallery-header {
          margin-bottom: 20px;
          text-align: center;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .trust-gallery-section {
            padding: 60px 0 80px 0;
          }
        }
      `}} />
    </section>
  );
};

export default TrustGallerySection;
