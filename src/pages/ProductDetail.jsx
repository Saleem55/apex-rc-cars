import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ShieldCheck, Truck, ArrowLeft, Zap, Sparkles, Radio, BatteryCharging } from 'lucide-react';
import Gallery from '../components/Gallery';
import Specs from '../components/Specs';

export default function ProductDetail({ productsList, onAddToCart, onBuyNow }) {
  const { id } = useParams();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = productsList.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="detail-loading-page animate-fade-in">
        <div className="container text-center">
          <div className="spinner"></div>
          <p>Searching for product details...</p>
        </div>
        <style>{`
          .detail-loading-page {
            padding: calc(var(--header-height) + 100px) 0;
            text-align: center;
            color: var(--text-secondary);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(0, 240, 255, 0.1);
            border-top-color: var(--accent-cyan);
            border-radius: 50%;
            animation: spin-loader 1s linear infinite;
            margin: 0 auto 20px;
          }
        `}</style>
      </div>
    );
  }

  const formatPrice = (amount) => {
    const symbol = product.currencySymbol || '₹';
    if (symbol === '₹') {
      return `${symbol}${Math.round(amount).toLocaleString('en-IN')}`;
    }
    return `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="product-detail-page animate-fade-in">
      <div className="container">
        
        {/* Back Link */}
        <Link to="/products" className="back-to-catalog">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        {/* Main Product Section: Amazon-style Two Columns */}
        <div className="product-main-row glass-panel">
          
          {/* Left Column: Slideshow Gallery */}
          <div className="product-left-col">
            <Gallery product={product} />
          </div>

          {/* Right Column: Title, Price, Description, Buy Trigger */}
          <div className="product-right-col">
            <div className="product-meta">
              <span className="badge-glow-red">Limited Stock</span>
            </div>

            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-tagline text-glow-cyan">{product.tagline}</p>

            {/* Ratings */}
            <div className="product-rating-row">
              <div className="stars-list">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? 'var(--accent-cyan)' : 'none'} 
                    stroke="var(--accent-cyan)" 
                  />
                ))}
              </div>
              <span className="rating-summary">
                {product.rating} ({product.reviewsCount} verified customer reviews)
              </span>
            </div>

            {/* Price tag */}
            <div className="product-detail-price">
              <span className="price-label">Price:</span>
              <span className="price-value text-glow-cyan">{formatPrice(product.price)}</span>
              <span className="tax-inclusive">Inclusive of all taxes</span>
            </div>

            <div className="product-divider"></div>

            {/* Description */}
            <div className="product-detail-description">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>

            {/* Bullet Highlights */}
            <ul className="product-highlights-list">
              <li>
                <Zap size={14} className="text-glow-cyan" />
                <span>**4WD System**: Full-time power to all wheels for maximum control.</span>
              </li>
              <li>
                <Sparkles size={14} className="text-glow-red" />
                <span>**LED Lights**: Built-in bright neon shocks and headlights.</span>
              </li>
              <li>
                <BatteryCharging size={14} className="text-glow-cyan" />
                <span>**Rechargeable**: Quick USB charge battery pack included.</span>
              </li>
            </ul>

            <div className="product-divider"></div>

            {/* Buy Actions */}
            <div className="product-action-block">
              <div className="shipping-hint">
                <Truck size={16} className="text-glow-cyan" />
                <span>FREE express delivery straight to your doorstep</span>
              </div>
              
              <div className="detail-action-buttons">
                <button className="btn-secondary add-to-cart-detail-btn" onClick={() => onAddToCart(product)}>
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button className="btn-accent buy-now-detail-btn" onClick={() => onBuyNow(product)}>
                  Buy Now
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Specifications & Reviews */}
        <div className="product-specs-section">
          <Specs product={product} />
        </div>

      </div>

      <style>{`
        .product-detail-page {
          padding: calc(var(--header-height) + 30px) 0 80px;
        }

        .back-to-catalog {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-family: var(--font-family-display);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 24px;
          transition: var(--transition-smooth);
        }

        .back-to-catalog:hover {
          color: var(--accent-cyan);
          transform: translateX(-4px);
        }

        .product-main-row {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          padding: 32px;
          margin-bottom: 40px;
        }

        @media (max-width: 991px) {
          .product-main-row { grid-template-columns: 1fr; gap: 30px; }
        }

        .product-left-col {
          width: 100%;
        }

        /* Override nested gallery spacing */
        .product-left-col .gallery-section {
          padding: 0;
          background: none;
        }
        .product-left-col .section-header {
          display: none;
        }

        .product-right-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .product-detail-title {
          font-size: 2.2rem;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .product-detail-tagline {
          font-family: var(--font-family-display);
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .product-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .stars-list {
          display: flex;
          gap: 2px;
        }

        .product-detail-price {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 16px 20px;
          border-radius: 12px;
          gap: 4px;
        }

        .price-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .price-value {
          font-family: var(--font-family-display);
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1;
        }

        .tax-inclusive {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .product-divider {
          height: 1px;
          background: var(--border-color);
        }

        .product-detail-description h3 {
          font-family: var(--font-family-display);
          font-size: 1rem;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .product-detail-description p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .product-highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .product-highlights-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .product-highlights-list li span strong {
          color: var(--text-primary);
        }

        .product-action-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: rgba(0, 240, 255, 0.01);
          border: 1px dashed rgba(0, 240, 255, 0.15);
          padding: 16px;
          border-radius: 12px;
        }

        .shipping-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .detail-action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .detail-action-buttons { grid-template-columns: 1fr; }
        }

        .add-to-cart-detail-btn, .buy-now-detail-btn {
          justify-content: center;
          height: 48px;
        }

        /* Override nested specs margins */
        .product-specs-section .specs-section {
          padding: 40px 0 0;
          border-top: none;
          background: none;
        }
        .product-specs-section .section-header {
          display: none;
        }
      `}</style>
    </div>
  );
}
