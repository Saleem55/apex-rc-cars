import React, { useState, useEffect } from 'react';
import { X, LogOut, Package, ClipboardCheck, Calendar, User, ShoppingBag } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function ProfileDrawer({ isOpen, onClose, user, onSignOut }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserOrders();
    }
  }, [isOpen, user]);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.warn('Error fetching user orders:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onSignOut?.();
      onClose();
    } catch (err) {
      console.error('Error signing out:', err.message);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (amount) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <div className="profile-title-section">
            <User size={20} className="text-glow-cyan" />
            <h2 className="profile-title">Account Profile</h2>
          </div>
          <button className="close-profile-btn" onClick={onClose} aria-label="Close profile">
            <X size={20} />
          </button>
        </div>

        <div className="profile-content">
          {/* User Details */}
          <div className="user-details-card">
            <div className="avatar-placeholder">
              <span>{user?.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
            <div className="user-info">
              <p className="user-email">{user?.email}</p>
              <p className="user-joined">
                <Calendar size={12} />
                Joined: {formatDate(user?.created_at)}
              </p>
            </div>
          </div>

          {/* Orders Section */}
          <div className="orders-section">
            <h3 className="orders-section-title">
              <Package size={16} />
              Your Order History ({orders.length})
            </h3>

            {isLoading ? (
              <div className="orders-loading">
                <div className="orders-spinner"></div>
                <span>Loading order history...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-orders-state">
                <div className="empty-orders-icon">
                  <ShoppingBag size={32} />
                </div>
                <p>No orders placed yet.</p>
                <p className="empty-sub">Your purchases will appear here.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-history-header">
                      <span className="order-num text-glow-cyan">{order.order_number}</span>
                      <span className="order-date">{formatDate(order.created_at)}</span>
                    </div>
                    
                    <div className="order-history-items">
                      {order.items?.map((item, index) => (
                        <div key={index} className="order-item-row">
                          <span>{item.name} <span className="item-qty">x{item.quantity}</span></span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-history-footer">
                      <div className="order-status-badge">
                        <ClipboardCheck size={12} />
                        <span>{order.payment_status}</span>
                      </div>
                      <div className="order-history-total">
                        Total Paid: <span className="price">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="profile-footer">
          <button className="btn-secondary signout-btn" onClick={handleSignOut}>
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>

      <style>{`
        .profile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1500;
        }

        .profile-drawer {
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
          animation: slide-in-drawer 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slide-in-drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .profile-header {
          padding: 24px;
          border-bottom: var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .profile-title-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-title {
          font-size: 1.3rem;
          text-transform: uppercase;
        }

        .close-profile-btn {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }

        .close-profile-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .profile-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .user-details-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .avatar-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-family-display);
          font-weight: 700;
          font-size: 1.25rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-email {
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
          word-break: break-all;
        }

        .user-joined {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .orders-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .orders-section-title {
          font-family: var(--font-family-display);
          font-size: 0.95rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
        }

        .orders-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .orders-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(0, 240, 255, 0.1);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin-loader 0.8s linear infinite;
        }

        .empty-orders-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed var(--border-color);
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .empty-orders-icon {
          color: var(--text-tertiary);
          margin-bottom: 12px;
        }

        .empty-sub {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 480px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .orders-list::-webkit-scrollbar {
          width: 4px;
        }
        .orders-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }

        .order-history-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-family-display);
          font-size: 0.85rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          padding-bottom: 8px;
        }

        .order-date {
          color: var(--text-tertiary);
        }

        .order-history-items {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.85rem;
        }

        .order-item-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }

        .item-qty {
          color: var(--text-tertiary);
          margin-left: 4px;
        }

        .order-history-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 8px;
          font-size: 0.8rem;
        }

        .order-status-badge {
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.1);
          color: var(--accent-cyan);
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: capitalize;
        }

        .order-history-total {
          color: var(--text-secondary);
        }

        .order-history-total .price {
          font-weight: 700;
          color: var(--text-primary);
          margin-left: 2px;
        }

        .profile-footer {
          padding: 24px;
          border-top: var(--glass-border);
          background: rgba(8, 9, 11, 0.95);
        }

        .signout-btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
