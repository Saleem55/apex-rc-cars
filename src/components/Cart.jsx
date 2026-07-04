import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function Cart({ isOpen, onClose, cart, onUpdateQty, onRemoveItem, onCheckout }) {
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const currencySymbol = cart.length > 0 ? (cart[0].currencySymbol || '₹') : '₹';
  const formatPrice = (amount) => {
    if (currencySymbol === '₹') {
      return `${currencySymbol}${Math.round(amount).toLocaleString('en-IN')}`;
    }
    return `${currencySymbol}${amount.toFixed(2)}`;
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div 
        className="cart-sidebar glass-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-section">
            <ShoppingBag size={20} className="text-glow-cyan" />
            <h2 className="cart-title">Your Cart</h2>
            {cart.length > 0 && <span className="cart-item-count">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
          </div>
          <button className="close-cart-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Contents */}
        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-icon-wrapper">
                <ShoppingBag size={48} className="text-glow-red" />
              </div>
              <p className="empty-cart-title">Your cart is empty</p>
              <p className="empty-cart-desc">Add some high-speed RC cars to get started!</p>
              <button className="btn-primary" onClick={onClose} style={{ marginTop: '20px' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-thumb">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-tagline">{item.tagline}</p>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                    
                    <div className="cart-item-actions">
                      <div className="qty-picker">
                        <button 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        className="remove-item-btn" 
                        onClick={() => onRemoveItem(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value text-glow-cyan">FREE</span>
            </div>
            <div className="summary-row total-row">
              <span className="summary-label">Total</span>
              <span className="summary-value text-glow-cyan">{formatPrice(total)}</span>
            </div>
            
            <button 
              className="btn-accent checkout-btn" 
              onClick={onCheckout}
              id="checkout-button-cart"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .cart-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        .cart-sidebar {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 440px;
          height: 100%;
          border-radius: 0;
          border-left: var(--glass-border);
          border-top: none;
          border-bottom: none;
          border-right: none;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.8);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-overlay.active .cart-sidebar {
          transform: translateX(0);
        }

        .cart-header {
          padding: 24px;
          border-bottom: var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-title-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cart-title {
          font-size: 1.3rem;
          text-transform: uppercase;
        }

        .cart-item-count {
          background: rgba(0, 240, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .close-cart-btn {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid transparent;
        }

        .close-cart-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-color);
          background: rgba(255, 255, 255, 0.05);
        }

        .cart-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        /* Empty Cart State styling */
        .empty-cart-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80%;
          text-align: center;
        }

        .empty-icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(255, 42, 95, 0.05);
          border: 1px solid rgba(255, 42, 95, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .empty-cart-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .empty-cart-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 250px;
        }

        /* Cart Items List */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item-card {
          display: flex;
          gap: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 16px;
          border-radius: 12px;
        }

        .cart-item-thumb {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
        }

        .cart-item-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cart-item-name {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .cart-item-tagline {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .cart-item-price {
          font-size: 1rem;
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 12px;
          font-family: var(--font-family-display);
        }

        .cart-item-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 2px;
        }

        .qty-btn {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .qty-btn:hover:not(:disabled) {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .qty-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .qty-value {
          padding: 0 10px;
          font-size: 0.85rem;
          font-weight: 600;
          min-width: 28px;
          text-align: center;
        }

        .remove-item-btn {
          color: var(--text-tertiary);
          padding: 4px;
        }

        .remove-item-btn:hover {
          color: var(--accent-red);
        }

        /* Cart Footer Summary */
        .cart-footer {
          padding: 24px;
          border-top: var(--glass-border);
          background: rgba(8, 9, 11, 0.95);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.95rem;
        }

        .summary-label {
          color: var(--text-secondary);
        }

        .summary-value {
          font-weight: 600;
        }

        .total-row {
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          margin-top: 16px;
          font-size: 1.15rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .checkout-btn {
          width: 100%;
          justify-content: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
