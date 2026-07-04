import React from 'react';
import * as Icons from 'lucide-react';

export default function Specs({ product }) {
  // Helper to dynamically render Lucide icons by name
  const renderIcon = (iconName, colorClass) => {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return <IconComponent className={colorClass} size={28} />;
  };

  return (
    <section id="specs" className="section specs-section">
      <div className="container">
        
        {/* Key Features Grid */}
        <div className="section-header">
          <span className="badge-glow">Specs</span>
          <h2 className="section-title">
            ENGINEERED FOR <span className="text-glow-red">PERFORMANCE</span>
          </h2>
          <p className="section-subtitle">
            Every component is fine-tuned to deliver the ultimate off-road racing experience.
          </p>
        </div>

        <div className="grid-4 key-specs-grid">
          {product.specs.map((spec, idx) => (
            <div key={idx} className="spec-card glass-panel glass-panel-hover">
              <div className="spec-icon-wrapper">
                {renderIcon(spec.icon, idx % 2 === 0 ? 'text-glow-cyan' : 'text-glow-red')}
              </div>
              <h3 className="spec-card-title">{spec.title}</h3>
              <p className="spec-card-value">{spec.value}</p>
              <p className="spec-card-desc">{spec.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Specs & Reviews Row */}
        <div className="grid-2 details-reviews-row">
          
          {/* Detailed Specs Table */}
          <div className="detailed-specs-panel glass-panel">
            <h3 className="panel-title">Technical Specifications</h3>
            <table className="specs-table">
              <tbody>
                {product.details.map((detail, idx) => (
                  <tr key={idx}>
                    <td className="spec-label">{detail.name}</td>
                    <td className="spec-val">{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer Reviews Section */}
          <div id="reviews" className="reviews-panel glass-panel">
            <h3 className="panel-title">Customer Feedback</h3>
            
            <div className="reviews-list">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{rev.author}</span>
                    <span className="review-date">{rev.date}</span>
                  </div>
                  <div className="review-rating">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Icons.Star key={i} size={14} fill="var(--accent-cyan)" stroke="var(--accent-cyan)" />
                    ))}
                    {[...Array(5 - rev.rating)].map((_, i) => (
                      <Icons.Star key={i} size={14} fill="none" stroke="var(--text-tertiary)" />
                    ))}
                  </div>
                  <p className="review-comment">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .specs-section {
          background: var(--bg-primary);
          position: relative;
          border-top: 1px solid var(--border-color);
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

        .key-specs-grid {
          margin-bottom: 60px;
        }

        .spec-card {
          padding: 30px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .spec-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .spec-card-title {
          font-size: 1.15rem;
          margin-bottom: 8px;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .spec-card-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--accent-cyan);
          margin-bottom: 12px;
          font-family: var(--font-family-display);
        }

        .spec-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Detailed Specs & Reviews Layout */
        .details-reviews-row {
          gap: 30px;
        }

        .detailed-specs-panel, .reviews-panel {
          padding: 32px;
          height: 100%;
        }

        .panel-title {
          font-size: 1.5rem;
          margin-bottom: 24px;
          text-transform: uppercase;
          border-left: 3px solid var(--accent-cyan);
          padding-left: 12px;
          line-height: 1.2;
        }

        /* Specs Table */
        .specs-table {
          width: 100%;
          border-collapse: collapse;
        }

        .specs-table tr {
          border-bottom: 1px solid var(--border-color);
        }

        .specs-table tr:last-child {
          border-bottom: none;
        }

        .specs-table td {
          padding: 14px 8px;
          font-size: 0.95rem;
        }

        .spec-label {
          color: var(--text-secondary);
          font-weight: 500;
          width: 40%;
        }

        .spec-val {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Reviews Panel */
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-height: 380px;
          overflow-y: auto;
          padding-right: 8px;
        }

        /* Scrollbar reviews */
        .reviews-list::-webkit-scrollbar {
          width: 4px;
        }
        .reviews-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }

        .review-item {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }

        .review-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .review-author {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .review-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .review-rating {
          display: flex;
          gap: 2px;
          margin-bottom: 8px;
        }

        .review-comment {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .detailed-specs-panel, .reviews-panel {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
