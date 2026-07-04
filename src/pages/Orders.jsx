import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Settings, User, Key, Trash2, ShieldAlert, CheckCircle2, 
  Calendar, CreditCard, ShoppingBag, LogOut, ChevronRight, ClipboardCheck 
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Orders({ user, onSignOut, onAuthModalOpen }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'settings'
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Profile Form States
  const [username, setUsername] = useState(user?.user_metadata?.display_name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password Form States
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Deletion States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Update form default values when user session loads
  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.display_name || '');
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    if (!user) return;
    setIsLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.warn('Error fetching orders:', err.message);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');
    setIsUpdatingProfile(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: username }
      });
      if (error) throw error;
      setProfileSuccess('Profile display name updated successfully!');
    } catch (err) {
      setProfileError(err.message || 'Failed to update username.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');
    setIsUpdatingPassword(true);

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      setIsUpdatingPassword(false);
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      setIsUpdatingPassword(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
      setPasswordSuccess('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    setIsDeleting(true);

    try {
      // Trigger our custom RPC function to delete the auth user record
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;
      
      // Log out locally and navigate home
      onSignOut?.();
      navigate('/');
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete account. Make sure you ran the SQL function setup.');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSignOutClick = async () => {
    await supabase.auth.signOut();
    onSignOut?.();
    navigate('/');
  };

  // 1. Unauthenticated State View
  if (!user) {
    return (
      <div className="orders-page unauth-state animate-fade-in">
        <div className="container">
          <div className="unauth-card glass-panel">
            <ShieldAlert size={48} className="text-glow-red" />
            <h2 className="unauth-title">Authentication Required</h2>
            <p className="unauth-desc">
              Please sign in to view your orders, manage your shipping profile, and customize settings.
            </p>
            <button className="btn-primary" onClick={onAuthModalOpen}>
              Sign In to Account
            </button>
          </div>
        </div>
        <style>{`
          .unauth-state {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
          }
          .unauth-card {
            max-width: 480px;
            margin: 0 auto;
            padding: 48px 32px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .unauth-title {
            font-size: 1.6rem;
            text-transform: uppercase;
          }
          .unauth-desc {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
          }
        `}</style>
      </div>
    );
  }

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
    <div className="orders-page animate-fade-in">
      <div className="container">
        
        {/* Profile Banner */}
        <div className="profile-banner glass-panel">
          <div className="profile-banner-left">
            <div className="profile-avatar">
              <span>{user?.email?.[0]?.toUpperCase()}</span>
            </div>
            <div className="profile-info-block">
              <h1 className="profile-display-name">
                {user?.user_metadata?.display_name || 'RC Enthusiast'}
              </h1>
              <p className="profile-meta-email">{user?.email}</p>
              <p className="profile-meta-joined">
                <Calendar size={12} />
                Joined: {formatDate(user?.created_at)}
              </p>
            </div>
          </div>
          
          <button className="btn-secondary signout-btn" onClick={handleSignOutClick}>
            <LogOut size={16} />
            Log Out
          </button>
        </div>

        {/* Tab Controls */}
        <div className="profile-nav-tabs">
          <button 
            className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={16} />
            Order History
          </button>
          <button 
            className={`profile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} />
            Account Settings
          </button>
        </div>

        {/* Dynamic Tab Body */}
        <div className="profile-tab-body">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="orders-tab-view animate-fade-in">
              <h2 className="tab-title">Your Orders ({orders.length})</h2>
              
              {isLoadingOrders ? (
                <div className="tab-loading">
                  <div className="tab-spinner"></div>
                  <span>Loading your invoices...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-orders-view glass-panel">
                  <ShoppingBag size={48} className="text-glow-cyan" />
                  <h3>No Orders Placed Yet</h3>
                  <p>You have not completed any checkouts yet. Explore our high-performance buggy!</p>
                  <button className="btn-primary" onClick={() => navigate('/search')}>
                    Browse RC Cars
                  </button>
                </div>
              ) : (
                <div className="orders-invoice-list">
                  {orders.map((order) => (
                    <div key={order.id} className="invoice-card glass-panel">
                      <div className="invoice-header">
                        <div className="invoice-header-left">
                          <span className="invoice-num text-glow-cyan">{order.order_number}</span>
                          <span className="invoice-date">{formatDate(order.created_at)}</span>
                        </div>
                        <div className="invoice-status">
                          <ClipboardCheck size={14} />
                          <span>{order.payment_status}</span>
                        </div>
                      </div>

                      <div className="invoice-body">
                        <div className="invoice-address-col">
                          <h4 className="invoice-sub-title">Shipping To:</h4>
                          <p>{order.customer_name}</p>
                          <p>{order.shipping_address}</p>
                          <p>{order.shipping_city}, {order.shipping_zip}</p>
                        </div>
                        
                        <div className="invoice-items-col">
                          <h4 className="invoice-sub-title">Items:</h4>
                          {order.items?.map((item, index) => (
                            <div key={index} className="invoice-item-row">
                              <span>{item.name} x{item.quantity}</span>
                              <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="invoice-footer">
                        <span>Total Paid:</span>
                        <span className="invoice-total text-glow-cyan">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="settings-tab-view animate-fade-in">
              <h2 className="tab-title">Settings</h2>

              <div className="grid-2 settings-forms-grid">
                
                {/* Username Form */}
                <form onSubmit={handleUpdateProfile} className="settings-card glass-panel">
                  <h3 className="settings-card-title">
                    <User size={16} className="text-glow-cyan" />
                    Edit Profile Details
                  </h3>
                  
                  {profileSuccess && (
                    <div className="alert-inline success">
                      <CheckCircle2 size={14} />
                      <span>{profileSuccess}</span>
                    </div>
                  )}
                  {profileError && (
                    <div className="alert-inline error">
                      <ShieldAlert size={14} />
                      <span>{profileError}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="settings-username">Username / Display Name</label>
                    <input
                      type="text"
                      id="settings-username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. SpeedRacer"
                      disabled={isUpdatingProfile}
                    />
                  </div>

                  <button type="submit" className="btn-primary settings-submit-btn" disabled={isUpdatingProfile}>
                    {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
                  </button>
                </form>

                {/* Password Form */}
                <form onSubmit={handleUpdatePassword} className="settings-card glass-panel">
                  <h3 className="settings-card-title">
                    <Key size={16} className="text-glow-red" />
                    Change Password
                  </h3>

                  {passwordSuccess && (
                    <div className="alert-inline success">
                      <CheckCircle2 size={14} />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}
                  {passwordError && (
                    <div className="alert-inline error">
                      <ShieldAlert size={14} />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="settings-password">New Password</label>
                    <input
                      type="password"
                      id="settings-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isUpdatingPassword}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="settings-confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="settings-confirm-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isUpdatingPassword}
                    />
                  </div>

                  <button type="submit" className="btn-accent settings-submit-btn" disabled={isUpdatingPassword}>
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </form>

              </div>

              {/* Danger Zone (Account Deletion) */}
              <div className="danger-zone-card glass-panel">
                <div className="danger-zone-info">
                  <h3 className="danger-zone-title text-glow-red">
                    <Trash2 size={18} />
                    Danger Zone
                  </h3>
                  <p className="danger-zone-desc">
                    Deleting your account is permanent. This will delete all order history, delivery addresses, and profile metadata.
                  </p>
                </div>

                {deleteError && (
                  <div className="alert-inline error" style={{ width: '100%', marginBottom: '16px' }}>
                    <ShieldAlert size={14} />
                    <span>{deleteError}</span>
                  </div>
                )}

                {!showDeleteConfirm ? (
                  <button className="btn-secondary delete-trigger-btn" onClick={() => setShowDeleteConfirm(true)}>
                    Delete My Account
                  </button>
                ) : (
                  <div className="delete-confirm-box animate-fade-in">
                    <p className="confirm-text">
                      <ShieldAlert size={16} className="text-glow-red" />
                      Are you absolutely sure? This action is irreversible.
                    </p>
                    <div className="confirm-buttons">
                      <button className="btn-secondary cancel-del-btn" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                        Cancel
                      </button>
                      <button className="btn-accent confirm-del-btn" onClick={handleDeleteAccount} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Yes, Delete Permanent'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      <style>{`
        .orders-page {
          padding: calc(var(--header-height) + 40px) 0 80px;
        }

        .profile-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
          background: rgba(16, 18, 22, 0.4);
        }

        .profile-banner-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-family-display);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .profile-info-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-display-name {
          font-size: 1.6rem;
          line-height: 1.2;
          font-family: var(--font-family-display);
          font-weight: 700;
        }

        .profile-meta-email {
          color: var(--text-secondary);
          font-size: 0.9rem;
          word-break: break-all;
        }

        .profile-meta-joined {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }

        .profile-nav-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 40px;
          gap: 24px;
        }

        .profile-tab-btn {
          padding: 12px 8px;
          color: var(--text-secondary);
          font-family: var(--font-family-display);
          font-weight: 600;
          font-size: 1rem;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-tab-btn::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-cyan);
          transition: var(--transition-smooth);
        }

        .profile-tab-btn:hover {
          color: var(--text-primary);
        }

        .profile-tab-btn.active {
          color: var(--accent-cyan);
        }

        .profile-tab-btn.active::after {
          width: 100%;
          box-shadow: var(--shadow-neon-cyan);
        }

        .tab-title {
          font-size: 1.5rem;
          text-transform: uppercase;
          margin-bottom: 24px;
          border-left: 3px solid var(--accent-cyan);
          padding-left: 12px;
          line-height: 1.2;
        }

        .tab-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 60px 0;
          color: var(--text-secondary);
        }

        .tab-spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(0, 240, 255, 0.1);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin-loader 0.8s linear infinite;
        }

        .empty-orders-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          text-align: center;
          gap: 16px;
        }

        .empty-orders-view h3 {
          font-size: 1.25rem;
          text-transform: uppercase;
        }

        .empty-orders-view p {
          color: var(--text-secondary);
          max-width: 380px;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .orders-invoice-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .invoice-card {
          padding: 24px;
          background: rgba(16, 18, 22, 0.2);
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
          margin-bottom: 20px;
          font-family: var(--font-family-display);
          font-weight: 600;
        }

        .invoice-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .invoice-date {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .invoice-status {
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: capitalize;
        }

        .invoice-body {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .invoice-body { grid-template-columns: 1fr; gap: 24px; }
        }

        .invoice-sub-title {
          font-family: var(--font-family-display);
          text-transform: uppercase;
          color: var(--text-secondary);
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        .invoice-address-col p {
          color: var(--text-primary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .invoice-items-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .invoice-item-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
          padding-bottom: 6px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.03);
        }

        .invoice-item-row:last-child {
          border-bottom: none;
        }

        .invoice-item-row .item-price {
          font-weight: 600;
          color: var(--text-primary);
        }

        .invoice-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          font-family: var(--font-family-display);
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
        }

        .invoice-total {
          font-size: 1.3rem;
        }

        .settings-forms-grid {
          margin-bottom: 40px;
        }

        .settings-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: fit-content;
        }

        .settings-card-title {
          font-family: var(--font-family-display);
          font-size: 1.1rem;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .alert-inline {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
        }

        .alert-inline.success {
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.15);
          color: var(--accent-cyan);
        }

        .alert-inline.error {
          background: rgba(255, 42, 95, 0.05);
          border: 1px solid rgba(255, 42, 95, 0.15);
          color: var(--accent-red);
        }

        .settings-submit-btn {
          width: 100%;
          justify-content: center;
        }

        /* Danger Zone */
        .danger-zone-card {
          border: 1px solid rgba(255, 42, 95, 0.2);
          background: rgba(255, 42, 95, 0.02);
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .danger-zone-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .danger-zone-title {
          font-family: var(--font-family-display);
          font-size: 1.1rem;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .danger-zone-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.5;
        }

        .delete-trigger-btn {
          border-color: rgba(255, 42, 95, 0.3);
          color: var(--accent-red);
        }

        .delete-trigger-btn:hover {
          background: rgba(255, 42, 95, 0.05);
          border-color: var(--accent-red);
          box-shadow: 0 0 15px rgba(255, 42, 95, 0.15);
        }

        .delete-confirm-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
          width: 100%;
        }

        .confirm-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-red);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .confirm-buttons {
          display: flex;
          gap: 12px;
        }

        .cancel-del-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
        }

        .confirm-del-btn {
          padding: 8px 16px;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
