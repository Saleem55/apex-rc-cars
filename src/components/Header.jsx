import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Radio, User, LogIn } from 'lucide-react';

export default function Header({ cartItemsCount, onCartOpen, user, onAuthModalOpen }) {
  return (
    <header className="header-nav">
      <div className="container header-container">
        <div className="logo-section">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon">
              <Radio className="text-glow-cyan" size={24} />
            </div>
            <span className="logo-text">
              APEX<span className="text-glow-red">RC</span>
            </span>
          </Link>
        </div>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Catalog</Link>
          <Link to="/about" className="nav-link">About Us</Link>
        </nav>

        <div className="nav-actions">
          {user ? (
            <Link 
              className="profile-toggle-btn" 
              to="/orders"
              aria-label="Open Profile"
            >
              <User size={20} />
            </Link>
          ) : (
            <button 
              className="btn-secondary nav-signin-btn" 
              onClick={onAuthModalOpen}
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
          )}

          <button 
            className="cart-toggle-btn" 
            onClick={onCartOpen}
            aria-label="Open Shopping Cart"
            id="cart-toggle-button"
          >
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>
        </div>
      </div>
      
      <style>{`
        .header-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          background: rgba(8, 9, 11, 0.75);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: var(--glass-border);
          z-index: 100;
          display: flex;
          align-items: center;
          transition: var(--transition-smooth);
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.2);
          width: 36px;
          height: 36px;
          border-radius: 8px;
        }

        .logo-text {
          font-family: var(--font-family-display);
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: 0.05em;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          font-family: var(--font-family-display);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-secondary);
          position: relative;
          padding: 8px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-cyan);
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-neon-cyan);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .cart-toggle-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
        }

        .cart-toggle-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
          background: rgba(0, 240, 255, 0.05);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
          transition: var(--transition-smooth);
        }

        .profile-toggle-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
          background: rgba(0, 240, 255, 0.05);
        }

        .nav-signin-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 38px;
        }

        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: var(--accent-red);
          color: var(--text-primary);
          font-family: var(--font-family-body);
          font-weight: 700;
          font-size: 0.75rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-neon-red);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none; /* Add slide-in nav drawer in future, keep clean for now */
          }
        }
      `}</style>
    </header>
  );
}
