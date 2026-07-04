import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';

export default function Gallery({ product }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        
        <div className="section-header">
          <span className="badge-glow">Showcase</span>
          <h2 className="section-title">
            PRODUCT <span className="text-glow-cyan">GALLERY</span>
          </h2>
          <p className="section-subtitle">
            Explore every angle of the Pretender 24 racer. Real photos of the product and accessories.
          </p>
        </div>

        <div className="gallery-container glass-panel">
          {/* Thumbnails list */}
          <div className="thumbnails-panel">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                className={`thumb-btn ${activeIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="thumb-img" />
              </button>
            ))}
          </div>

          {/* Main active display */}
          <div className="main-display-panel">
            <div className="image-overlay-icons">
              <span className="image-index">
                <Camera size={14} /> {activeIdx + 1} / {product.images.length}
              </span>
            </div>
            
            <div className="main-image-container">
              <img 
                src={product.images[activeIdx]} 
                alt={product.imageCaptions[activeIdx] || product.name} 
                className="main-image"
              />
            </div>
            
            <div className="caption-bar">
              <p className="caption-text">{product.imageCaptions[activeIdx]}</p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .gallery-section {
          background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(16, 18, 22, 0.4) 100%);
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-title {
          font-size: 2.5rem;
          margin-top: 10px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .section-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
          font-size: 1rem;
        }

        .gallery-container {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 20px;
          padding: 24px;
          box-shadow: var(--shadow-card);
        }

        .thumbnails-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 520px;
          overflow-y: auto;
          padding-right: 4px;
        }

        /* Thumbnails scrollbar styling */
        .thumbnails-panel::-webkit-scrollbar {
          width: 4px;
        }
        .thumbnails-panel::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }

        .thumb-btn {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          background: rgba(0, 0, 0, 0.2);
          padding: 4px;
          transition: var(--transition-smooth);
        }

        .thumb-btn:hover {
          border-color: rgba(0, 240, 255, 0.4);
          transform: scale(1.02);
        }

        .thumb-btn.active {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }

        .main-display-panel {
          position: relative;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 520px;
        }

        .image-overlay-icons {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          display: flex;
          gap: 10px;
        }

        .image-index {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-family: var(--font-family-display);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .main-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.03) 0%, transparent 80%);
        }

        .main-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 8px;
        }

        .main-image-container:hover .main-image {
          transform: scale(1.05);
        }

        .caption-bar {
          background: rgba(16, 18, 22, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px 24px;
          backdrop-filter: var(--glass-blur);
        }

        .caption-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          text-align: center;
        }

        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .thumbnails-panel {
            flex-direction: row;
            order: 2;
            overflow-x: auto;
            overflow-y: hidden;
            max-height: 90px;
            padding-right: 0;
            padding-bottom: 4px;
          }
          
          .thumb-btn {
            width: 80px;
            flex-shrink: 0;
          }

          .main-display-panel {
            height: 360px;
            order: 1;
          }
        }
      `}</style>
    </section>
  );
}
