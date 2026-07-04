import React from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Specs from '../components/Specs';

export default function Home({ product, onAddToCart, onBuyNow }) {
  if (!product) {
    return (
      <div className="home-loading">
        <div className="home-spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-page animate-fade-in">
      <Hero 
        product={product} 
        onAddToCart={onAddToCart} 
        onBuyNow={onBuyNow} 
      />
      
      <Gallery product={product} />
      
      <Specs product={product} />

      <style>{`
        .home-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .home-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 240, 255, 0.1);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin-loader 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
