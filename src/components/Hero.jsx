import React from 'react';
import { ShoppingCart, Compass, Activity, Star } from 'lucide-react';

export default function Hero({ product, onAddToCart, onBuyNow }) {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container grid-2">
        
        {/* Left Side: Product Text Info */}
        <div className="hero-content animate-fade-in">
          <div className="badge-wrapper">
            <span className="badge-glow-red">Limited Edition</span>
            <span className="badge-glow">In Stock - Ready to Ship</span>
          </div>
          
          <h1 className="hero-title">
            THE <span className="text-glow-red">{product.name.split(' ')[0]}</span> {product.name.split(' ')[1]}
          </h1>
          
          <p className="hero-tagline text-glow-cyan">{product.tagline}</p>
          
          <div className="rating-container">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--accent-cyan)" stroke="var(--accent-cyan)" />
              ))}
            </div>
            <span className="rating-text">{product.rating} ({product.reviewsCount} verified reviews)</span>
          </div>

          <p className="hero-description">{product.description}</p>
          
          <div className="price-tag">
            <span className="currency">{product.currencySymbol || '₹'}</span>
            <span className="amount">{product.price.toLocaleString('en-IN')}</span>
          </div>

          <div className="action-buttons">
            <button 
              className="btn-primary" 
              onClick={() => onAddToCart(product)}
              id="add-to-cart-hero"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onBuyNow(product)}
              id="buy-now-hero"
            >
              Buy Now
            </button>
          </div>

          <div className="quick-benefits">
            <div className="benefit">
              <Compass size={18} className="text-glow-cyan" />
              <span>Free Shipping</span>
            </div>
            <div className="benefit">
              <Activity size={18} className="text-glow-red" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Side: Hero Visual */}
        <div className="hero-visual">
          <div className="visual-background-glow"></div>
          <div className="hero-image-wrapper animate-float">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="hero-image"
            />
            {/* Overlay indicators matching the LED suspension coils */}
            <div className="suspension-glow left-glow"></div>
            <div className="suspension-glow right-glow"></div>
          </div>
        </div>

      </div>

      <style>{`
        .hero-section {
          padding-top: calc(var(--header-height) + 60px);
          padding-bottom: 80px;
          min-height: 90vh;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 80% 20%, rgba(0, 240, 255, 0.05) 0%, transparent 60%);
          position: relative;
          overflow: hidden;
        }

        .badge-wrapper {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .hero-title {
          font-size: 3.8rem;
          line-height: 1.1;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .hero-tagline {
          font-family: var(--font-family-display);
          font-size: 1.4rem;
          font-weight: 500;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .stars {
          display: flex;
          gap: 4px;
        }

        .rating-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 540px;
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .price-tag {
          font-family: var(--font-family-display);
          display: flex;
          align-items: flex-start;
          margin-bottom: 36px;
        }

        .currency {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent-cyan);
          margin-top: 4px;
        }

        .amount {
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .decimals {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-top: 6px;
        }

        .action-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .quick-benefits {
          display: flex;
          gap: 32px;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Right Side visual styling */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-background-glow {
          position: absolute;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(255, 42, 95, 0.12) 0%, rgba(0, 240, 255, 0.08) 40%, transparent 70%);
          filter: blur(40px);
          z-index: 1;
        }

        .hero-image-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 520px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(16, 18, 22, 0.4);
          backdrop-filter: var(--glass-blur);
        }

        .hero-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .hero-image-wrapper:hover .hero-image {
          transform: scale(1.03);
        }

        /* Ambient blue highlights simulating the shock absorbers */
        .suspension-glow {
          position: absolute;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, transparent 70%);
          filter: blur(10px);
          z-index: 3;
          pointer-events: none;
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .left-glow {
          bottom: 25%;
          left: 28%;
        }

        .right-glow {
          bottom: 22%;
          right: 32%;
        }

        @media (max-width: 1100px) {
          .hero-title {
            font-size: 3rem;
          }
          .amount {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: calc(var(--header-height) + 20px);
            padding-bottom: 60px;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .action-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-primary, .btn-secondary {
            justify-content: center;
            width: 100%;
          }
          .hero-image-wrapper {
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}
