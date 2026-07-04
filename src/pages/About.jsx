import React from 'react';
import { ShieldCheck, Award, Zap, Flame } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page animate-fade-in">
      <div className="container">
        
        {/* Banner */}
        <div className="about-hero glass-panel">
          <div className="about-hero-glow"></div>
          <h1 className="about-hero-title">
            ENGINEERED TO <span class="text-glow-red">DEFY LIMITS</span>
          </h1>
          <p className="about-hero-desc">
            APEX RC is built on a passion for performance. We design off-road vehicles that combine rugged mechanics with futuristic styling and LED lighting technology.
          </p>
        </div>

        {/* Brand Values */}
        <div className="grid-2 about-story-section">
          <div className="story-content">
            <h2 className="section-title">OUR <span class="text-glow-cyan">STORY</span></h2>
            <p>
              Founded in 2026, APEX RC started with a simple vision: to make remote-controlled cars exciting to drive again—both day and night. We recognized that standard RC buggies lacked the visual presence and nighttime capabilities that racers wanted.
            </p>
            <p>
              That led us to develop our signature **LED shock absorber coils** and **simulated water-mist exhaust exhausts**. We don't just assemble components; we design specialized chassis and gear systems built to handle gravel, grass, and vertical jumps.
            </p>
          </div>
          <div className="story-image-placeholder glass-panel">
            <div className="tech-badge">
              <Zap size={14} />
              <span>PRO TECH</span>
            </div>
            <h3 className="placeholder-text text-glow-cyan">4WD SUSPENSION RIG</h3>
            <p className="placeholder-sub">Double-wishbone system with integrated blue light emitters</p>
          </div>
        </div>

        {/* Features list */}
        <div className="grid-3 value-pillars">
          <div className="pillar-card glass-panel glass-panel-hover">
            <div className="pillar-icon-wrapper">
              <ShieldCheck size={24} className="text-glow-cyan" />
            </div>
            <h3 className="pillar-title">Durable Materials</h3>
            <p className="pillar-text">
              Built with thick ABS composite plates and reinforced steel tie rods to survive impacts and high-velocity flips.
            </p>
          </div>

          <div className="pillar-card glass-panel glass-panel-hover">
            <div className="pillar-icon-wrapper">
              <Award size={24} className="text-glow-red" />
            </div>
            <h3 className="pillar-title">1-Year Warranty</h3>
            <p className="pillar-text">
              We stand behind our build quality. Every vehicle purchase includes a comprehensive warranty covering motor and receiver issues.
            </p>
          </div>

          <div className="pillar-card glass-panel glass-panel-hover">
            <div className="pillar-icon-wrapper">
              <Flame size={24} className="text-glow-cyan" />
            </div>
            <h3 className="pillar-title">Exhaust Simulator</h3>
            <p className="pillar-text">
              Our buggies vaporize water droplets to emit a dense, safe steam exhaust, illuminated by rear LEDs to simulate real flames.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .about-page {
          padding: calc(var(--header-height) + 40px) 0 80px;
        }

        .about-hero {
          position: relative;
          padding: 80px 40px;
          text-align: center;
          overflow: hidden;
          margin-bottom: 60px;
          background: rgba(16, 18, 22, 0.4);
        }

        .about-hero-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: blur(40px);
          pointer-events: none;
        }

        .about-hero-title {
          font-size: 2.8rem;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .about-hero-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .about-story-section {
          align-items: center;
          margin-bottom: 80px;
        }

        .story-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .story-content p {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
        }

        .story-image-placeholder {
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(8, 9, 11, 0.8) 0%, rgba(16, 18, 22, 0.9) 100%);
          border-color: rgba(0, 240, 255, 0.08);
          position: relative;
          text-align: center;
          padding: 24px;
        }

        .tech-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .placeholder-text {
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .placeholder-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .value-pillars {
          margin-top: 20px;
        }

        .pillar-card {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pillar-icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-title {
          font-size: 1.15rem;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .pillar-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .about-hero { padding: 40px 20px; }
          .about-hero-title { font-size: 2rem; }
          .about-hero-desc { font-size: 0.95rem; }
          .story-image-placeholder { height: 240px; }
        }
      `}</style>
    </div>
  );
}
