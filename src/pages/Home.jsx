import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Sparkles, Radio, BatteryCharging } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-page animate-fade-in">
      
      {/* Premium Hero Section */}
      <section className="home-hero">
        <div className="container grid-2 home-hero-container">
          
          <div className="home-hero-content">

            <h1 className="home-hero-title">
              HIGH-PERFORMANCE <span className="text-glow-red">RC RACING</span>
            </h1>
            
            <p className="home-hero-desc">
              Welcome to Buyyverse. We design off-road radio-controlled speed vehicles engineered with advanced shock systems and illuminated blue shock coils. Defy constraints day or night.
            </p>

            <div className="home-hero-ctas">
              <Link to="/product/pretender-24" className="btn-primary shop-now-home-btn">
                Shop Featured Release
                <ChevronRight size={16} />
              </Link>
              <Link to="/search" className="btn-secondary explore-home-btn">
                Browse Products
              </Link>
            </div>
          </div>

          <div className="home-hero-image-wrapper">
            <div className="hero-bg-glow"></div>
            <img 
              src="/rc_car_hero.png" 
              alt="Pretender 24 RC Buggy" 
              className="home-hero-img animate-float"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop';
              }}
            />
          </div>

        </div>
      </section>

      {/* Technical Spec Features Section */}
      <section className="home-tech-features">
        <div className="container">
          <div className="section-header">
            <span className="badge-glow">Technology</span>
            <h2 className="section-title">ENGINEERED TO <span className="text-glow-cyan">DOMINATE</span></h2>
            <p className="section-subtitle">
              Every detail is designed for speed, durability, and raw visual presence.
            </p>
          </div>

          <div className="grid-4 key-specs-grid">
            <div className="spec-card glass-panel glass-panel-hover">
              <div className="spec-icon-wrapper">
                <Zap size={24} className="text-glow-cyan" />
              </div>
              <h3 className="spec-card-title">Drive System</h3>
              <p className="spec-card-value">4-Wheel Drive (4WD)</p>
              <p className="spec-card-desc">Maximum traction and power delivery to all four rugged rubber tires.</p>
            </div>

            <div className="spec-card glass-panel glass-panel-hover">
              <div className="spec-icon-wrapper">
                <Sparkles size={24} className="text-glow-red" />
              </div>
              <h3 className="spec-card-title">LED Suspension</h3>
              <p className="spec-card-value">Illuminated Shocks</p>
              <p className="spec-card-desc">Vibrant blue LED-lit suspension springs for night racing and off-road stability.</p>
            </div>

            <div className="spec-card glass-panel glass-panel-hover">
              <div className="spec-icon-wrapper">
                <Radio size={24} className="text-glow-cyan" />
              </div>
              <h3 className="spec-card-title">Remote Control</h3>
              <p className="spec-card-value">2.4GHz Transmitter</p>
              <p className="spec-card-desc">Interference-free control with long range and precise throttle/steering response.</p>
            </div>

            <div className="spec-card glass-panel glass-panel-hover">
              <div className="spec-icon-wrapper">
                <BatteryCharging size={24} className="text-glow-red" />
              </div>
              <h3 className="spec-card-title">Power Source</h3>
              <p className="spec-card-value">USB Quick-Recharge</p>
              <p className="spec-card-desc">Easy charging with the included USB cable and rechargeable Li-Po battery pack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Banner */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card glass-panel">
            <div className="promo-left">
              <h2 className="promo-title">FEATURED RELEASE: <span className="text-glow-red">PRETENDER 24</span></h2>
              <p className="promo-desc">
                High-torque motor power, independent suspension springs, water-mist simulator exhaust. Ready to unbox and race immediately.
              </p>
              <Link to="/product/pretender-24" className="btn-accent view-promo-btn">
                View Specs & Buy
              </Link>
            </div>
            <div className="promo-right">
              <img 
                src="/rc_car_1.jpg" 
                alt="Racer Setup" 
                className="promo-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&auto=format&fit=crop';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-hero {
          padding: calc(var(--header-height) + 40px) 0 80px;
          background: radial-gradient(circle at 80% 20%, rgba(255, 42, 95, 0.04) 0%, transparent 60%);
          min-height: 80vh;
          display: flex;
          align-items: center;
          position: relative;
        }

        .home-hero-container {
          align-items: center;
        }

        .home-hero-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .badge-wrapper {
          display: flex;
          gap: 12px;
        }

        .home-hero-title {
          font-size: 3.5rem;
          line-height: 1.1;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .home-hero-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 520px;
        }

        .home-hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .home-hero-image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-bg-glow {
          position: absolute;
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 1;
        }

        .home-hero-img {
          max-width: 100%;
          width: 100%;
          max-width: 520px;
          z-index: 2;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
        }

        .home-tech-features {
          padding: 80px 0;
          border-top: 1px solid var(--border-color);
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-title {
          font-size: 2.2rem;
          margin-top: 12px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .section-subtitle {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .key-specs-grid {
          margin-top: 20px;
        }

        .spec-card {
          padding: 30px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .spec-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spec-card-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .spec-card-value {
          font-family: var(--font-family-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--accent-cyan);
        }

        .spec-card-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .promo-banner-section {
          padding: 0 0 80px;
        }

        .promo-banner-card {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          padding: 40px;
          align-items: center;
          background: linear-gradient(135deg, rgba(16, 18, 22, 0.4) 0%, rgba(8, 9, 11, 0.8) 100%);
        }

        @media (max-width: 768px) {
          .promo-banner-card { grid-template-columns: 1fr; gap: 30px; padding: 24px; }
        }

        .promo-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .promo-title {
          font-size: 1.8rem;
          text-transform: uppercase;
        }

        .promo-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .view-promo-btn {
          width: fit-content;
        }

        .promo-right {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          height: 240px;
        }

        .promo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .home-hero-title { font-size: 2.8rem; }
        }

        @media (max-width: 768px) {
          .home-hero { padding: calc(var(--header-height) + 20px) 0 60px; }
          .home-hero-title { font-size: 2.2rem; }
          .home-hero-ctas { flex-direction: column; }
          .shop-now-home-btn, .explore-home-btn { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
