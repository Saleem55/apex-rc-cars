import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, ShoppingCart, Info, Eye } from 'lucide-react';

export default function Search({ productsList, onAddToCart, onBuyNow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Let's add some mock products to flesh out the catalog!
  const allCatalogProducts = [
    ...(productsList || []),
    {
      id: 'titan-crawler',
      name: 'Titan 4x4 Rock Crawler',
      tagline: 'High-Torque Mountain Climber',
      price: 2499,
      currencySymbol: '₹',
      images: ['https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop'],
      rating: 4.8,
      isComingSoon: true,
      description: 'Conquer the steepest rocks with the Titan 4x4. Low gearing ratio, dual high-torque motors, and independent metal link suspensions.'
    },
    {
      id: 'veloce-gt',
      name: 'Veloce Drift GT',
      tagline: 'Slick Tire Street Racer',
      price: 1899,
      currencySymbol: '₹',
      images: ['https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop'],
      rating: 4.7,
      isComingSoon: true,
      description: 'High-speed street drifter. Slick carbon-fiber tires, gyro-assisted stability control, and neon underglow LEDs.'
    }
  ];

  // Filtering logic
  const filteredProducts = allCatalogProducts.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && !item.isComingSoon;
    if (selectedFilter === 'soon') return matchesSearch && item.isComingSoon;
    
    return matchesSearch;
  });

  const formatPrice = (item) => {
    return `${item.currencySymbol || '₹'}${item.price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="search-page animate-fade-in">
      <div className="container">
        
        {/* Page Header */}
        <div className="search-header-section">
          <h1 className="section-title">
            OUR <span className="text-glow-cyan">PRODUCTS</span>
          </h1>
          <p className="search-subtitle">
            Find the perfect high-performance remote-controlled racer for your next session.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="filter-toolbar glass-panel">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon-svg" size={18} />
            <input
              type="text"
              placeholder="Search RC cars (e.g. buggy, crawler)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters-list">
            <button 
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Items
            </button>
            <button 
              className={`filter-btn ${selectedFilter === 'active' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('active')}
            >
              Ready to Ship
            </button>
            <button 
              className={`filter-btn ${selectedFilter === 'soon' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('soon')}
            >
              Coming Soon
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-search-state glass-panel">
            <SlidersHorizontal size={36} className="text-glow-red" />
            <h3>No results found</h3>
            <p>Try searching for another keyword or clearing your search filters.</p>
          </div>
        ) : (
          <div className="grid-3 catalog-grid">
            {filteredProducts.map((item) => (
              <div 
                key={item.id} 
                className={`product-card glass-panel glass-panel-hover ${item.isComingSoon ? 'coming-soon-card' : ''}`}
              >
                {/* Badge */}
                {item.isComingSoon ? (
                  <span className="card-badge-soon">Coming Soon</span>
                ) : (
                  <span className="card-badge-ready">In Stock</span>
                )}

                <div className="card-image-wrapper">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="card-img" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&auto=format&fit=crop';
                    }}
                  />
                </div>

                <div className="card-details">
                  <h3 className="card-product-name">{item.name}</h3>
                  <p className="card-product-tagline">{item.tagline}</p>
                  
                  <p className="card-product-desc">{item.description}</p>

                  <div className="card-footer-row">
                    <span className="card-price text-glow-cyan">{formatPrice(item)}</span>
                    
                    {!item.isComingSoon ? (
                      <Link 
                        to={`/product/${item.id}`} 
                        className="btn-accent card-buy-btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </Link>
                    ) : (
                      <button className="btn-secondary card-notify-btn" disabled>
                        Notify Me
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <style>{`
        .search-page {
          padding: calc(var(--header-height) + 40px) 0 80px;
        }

        .search-header-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .search-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 10px auto 0;
          font-size: 1rem;
        }

        .filter-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          margin-bottom: 40px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-icon-svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .search-input-wrapper input {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 10px 16px 10px 48px;
          color: var(--text-primary);
          outline: none;
          font-family: var(--font-family-body);
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }

        .search-input-wrapper input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
        }

        .filters-list {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          font-family: var(--font-family-display);
        }

        .filter-btn:hover {
          border-color: rgba(0, 240, 255, 0.3);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: rgba(0, 240, 255, 0.08);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
        }

        .empty-search-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
          color: var(--text-secondary);
          gap: 16px;
        }

        .empty-search-state h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .catalog-grid {
          margin-top: 20px;
        }

        .product-card {
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(16, 18, 22, 0.4);
          position: relative;
          height: 100%;
        }

        .coming-soon-card {
          opacity: 0.8;
        }

        .card-badge-ready {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 10;
        }

        .card-badge-soon {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(255, 42, 95, 0.1);
          border: 1px solid rgba(255, 42, 95, 0.2);
          color: var(--accent-red);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          z-index: 10;
        }

        .card-image-wrapper {
          height: 220px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .card-img {
          transform: scale(1.05);
        }

        .card-details {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-product-name {
          font-size: 1.2rem;
          margin-bottom: 4px;
        }

        .card-product-tagline {
          font-size: 0.8rem;
          color: var(--accent-cyan);
          margin-bottom: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .card-product-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
          flex: 1;
        }

        .card-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 16px;
        }

        .card-price {
          font-family: var(--font-family-display);
          font-size: 1.35rem;
          font-weight: 700;
        }

        .card-cta-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cart-btn-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        .cart-btn-icon:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
        }

        .card-buy-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
        }

        .card-notify-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
          border-radius: 8px;
        }

        @media (max-width: 600px) {
          .filter-toolbar { flex-direction: column; align-items: stretch; }
          .search-input-wrapper { min-width: 100%; }
          .filters-list { justify-content: space-between; }
        }
      `}</style>
    </div>
  );
}
