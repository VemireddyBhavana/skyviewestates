import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useFavorites } from '../../context/FavoritesContext';
import { useComparison } from '../../context/ComparisonContext';

const PropertyCard = ({ property }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleComparison, isInComparison } = useComparison();
  
  const favorited = isFavorite(property.id);
  const inComparison = isInComparison(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative' }}
    >
      {property.status && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(212, 175, 55, 0.9)',
          color: 'black',
          padding: '5px 12px',
          borderRadius: '5px',
          fontSize: '0.7rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          zIndex: 10,
          letterSpacing: '1px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          {property.status}
        </div>
      )}
      <div className="card-actions" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px' }}>
        <button 
          className={`compare-btn ${inComparison ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleComparison(property);
          }}
          style={{
            background: inComparison ? '#D4AF37' : 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            fontSize: '1rem',
            color: inComparison ? 'white' : '#333'
          }}
          title={inComparison ? "Remove from Compare" : "Add to Compare"}
        >
          🔄
        </button>
        <button 
          className={`favorite-btn ${favorited ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            fontSize: '1.2rem',
            color: favorited ? '#ff4757' : '#999'
          }}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="property-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Link to={`/property/${property.id}`} style={{ display: 'block', overflow: 'hidden' }}>
          <div className="property-img-container">
            <img src={property.image} alt={property.title} />
          </div>
        </Link>
        <div className="property-info" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span className="property-category">{property.category}</span>
          <Link to={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{property.title}</h3>
          </Link>
          <p>{property.description}</p>
          
          <div className="property-footer">
            <div className="property-specs">
              <span>🛏️ {property.beds} Beds</span>
              <span>🚿 {property.baths} Baths</span>
              <span>📏 {property.sqft} sqft</span>
            </div>
            <div className="property-price">{property.price}</div>
          </div>
          
          {property.location && (
            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              📍 {property.location}
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: '15px', display: 'flex', gap: '10px' }}>
            <button 
              className="btn-primary" 
              style={{ flex: 2, padding: '8px', fontSize: '0.7rem' }}
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://wa.me/917799250555?text=Hi Sun Bright Properties, I am interested in ${encodeURIComponent(property.title)} (ID: ${property.id})`, '_blank');
              }}
            >
              WhatsApp Inquiry
            </button>
            <Link 
              to={`/property/${property.id}`} 
              style={{ flex: 1, padding: '8px', fontSize: '0.7rem', textAlign: 'center', border: '1px solid #ddd', borderRadius: '30px', textDecoration: 'none', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
