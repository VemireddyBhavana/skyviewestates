import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import PropertyCard from '../components/Common/PropertyCard';
import AnimatedSection from '../components/Common/AnimatedSection';
import { IMAGES, PROPERTIES } from '../constants/data';

import { useFavorites } from '../context/FavoritesContext';

const Properties = () => {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  
  const [search, setSearch] = useState('');

  const categories = ['ALL', 'APARTMENT', 'VILLA', 'PENTHOUSE', 'HOUSE'];
  const villaSubCategories = ['ALL', '1BHK', '2BHK', '3BHK', '4BHK', 'FLATS'];

  // Derive filter deterministically from path or parameters
  const filter = (() => {
    if (location.pathname === '/favourites') {
      return 'FAVORITES';
    }
    if (location.pathname.startsWith('/designs/villa')) {
      return 'VILLA';
    }
    if (category) {
      const upperCat = category.toUpperCase();
      if (categories.includes(upperCat) || upperCat === 'FAVORITES') {
        return upperCat;
      }
    }
    return 'ALL';
  })();

  // Derive sub-filter deterministically from subCategory param
  const subFilter = (() => {
    if (subCategory) {
      const upperSub = subCategory.toUpperCase();
      if (villaSubCategories.includes(upperSub)) {
        return upperSub;
      }
    }
    return 'ALL';
  })();

  // Sync search state with query string parameter 'q' on navigation changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    if (search !== query) {
      const timer = setTimeout(() => {
        setSearch(query);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [location.search, search]);

  const filteredProperties = PROPERTIES.filter(property => {
    const isFavorited = favorites.includes(property.id);
    const matchesFilter = filter === 'FAVORITES' 
      ? isFavorited 
      : (filter === 'ALL' || property.category === filter);
    
    const matchesSubFilter = subFilter === 'ALL' || property.subCategory === subFilter;

    const q = search.toLowerCase().trim();
    const matchesSearch = !q || [
      property.title,
      property.description,
      property.category,
      property.subCategory || '',
      property.price,
      String(property.beds) + ' bed',
      String(property.beds) + ' beds',
      String(property.baths) + ' bath',
      String(property.baths) + ' baths',
      property.sqft + ' sqft',
      property.sqft,
    ].some(field => field.toLowerCase().includes(q));

    return matchesFilter && matchesSubFilter && matchesSearch;
  });

  const handleFilterChange = (newFilter) => {
    setSearch(''); // Clear search when changing category
    if (newFilter === 'ALL') {
      navigate('/designs');
    } else if (newFilter === 'FAVORITES') {
      navigate('/favourites');
    } else {
      navigate(`/designs/${newFilter.toLowerCase()}`);
    }
  };

  const handleSubFilterChange = (newSub) => {
    if (newSub === 'ALL') {
      navigate('/designs/villa');
    } else {
      navigate(`/designs/villa/${newSub.toLowerCase()}`);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header className="hero-section small" style={{ backgroundImage: `url(${IMAGES.heroHome})` }}>
        <div className="hero-overlay">
          <Navbar />
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="hero-subtitle">{filter === 'FAVORITES' ? 'Your Wishlist' : 'Listings'}</span>
              <h1 className="hero-title">
                {filter === 'FAVORITES' 
                  ? 'Your Curated Collection of Luxury Estates' 
                  : 'Looking to Buy, Sell, Rent, Invest or Manage?'}
              </h1>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="section-container">
        <div className="properties-controls">
            <div className="filter-group">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => handleFilterChange(cat)}
                >
                  {cat}
                </button>
              ))}
              <button 
                className={`filter-btn ${filter === 'FAVORITES' ? 'active' : ''}`}
                onClick={() => handleFilterChange('FAVORITES')}
                style={{ color: filter === 'FAVORITES' ? 'white' : '#ff4757', borderColor: filter === 'FAVORITES' ? '#ff4757' : 'inherit', background: filter === 'FAVORITES' ? '#ff4757' : 'inherit' }}
              >
                ❤️ FAVORITES
              </button>
            </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search by name, type, beds, price..." 
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {filter === 'VILLA' && (
          <motion.div 
            className="sub-filter-group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {villaSubCategories.map(sub => (
              <button 
                key={sub} 
                className={`sub-filter-btn ${subFilter === sub ? 'active' : ''}`}
                onClick={() => handleSubFilterChange(sub)}
              >
                {sub}
              </button>
            ))}
          </motion.div>
        )}

        <div className="properties-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <AnimatedSection key={property.id}>
                <PropertyCard property={property} />
              </AnimatedSection>
            ))
          ) : (
            <div className="no-results">No properties found matching your criteria.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Properties;
