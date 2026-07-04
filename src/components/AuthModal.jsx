import React, { useState } from 'react';
import { X, Mail, Lock, ShieldAlert, Sparkles, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        // If email confirmation is enabled, they need to check email. Otherwise, logged in.
        if (data?.user && data?.session === null) {
          setSuccessMsg('Verification email sent! Please check your inbox.');
        } else if (data?.user) {
          setSuccessMsg('Account created successfully!');
          setTimeout(() => {
            onAuthSuccess?.(data.user);
            onClose();
          }, 1500);
        }
      } catch (err) {
        setErrorMsg(err.message || 'An error occurred during sign up.');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data?.user) {
          setSuccessMsg('Logged in successfully!');
          setTimeout(() => {
            onAuthSuccess?.(data.user);
            onClose();
          }, 1000);
        }
      } catch (err) {
        setErrorMsg(err.message || 'Invalid email or password.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <div className="auth-overlay" onClick={handleClose}>
      <div className="auth-modal glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h2 className="auth-title">
            {isSignUp ? (
              <>
                Create <span className="text-glow-red">Account</span>
              </>
            ) : (
              <>
                Customer <span className="text-glow-cyan">Sign In</span>
              </>
            )}
          </h2>
          <button className="close-auth-btn" onClick={handleClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="auth-body">
          <p className="auth-subtitle">
            {isSignUp 
              ? 'Join Apex RC to track your orders and checkout faster.' 
              : 'Sign in to complete your purchase.'}
          </p>

          {errorMsg && (
            <div className="auth-alert error">
              <ShieldAlert size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="auth-alert success">
              <Sparkles size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="auth-email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  id="auth-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  id="auth-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="auth-confirm-password">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    type="password"
                    id="auth-confirm-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <button type="submit" className={isSignUp ? "btn-accent submit-auth-btn" : "btn-primary submit-auth-btn"} disabled={isLoading}>
              {isLoading ? (
                <div className="auth-spinner"></div>
              ) : isSignUp ? (
                <>
                  <UserPlus size={16} />
                  Sign Up
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="auth-switcher">
            <span>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="switch-toggle"
              disabled={isLoading}
            >
              {isSignUp ? 'Sign In' : 'Create One'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .auth-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal {
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
        }

        .auth-header {
          padding: 24px 24px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .auth-title {
          font-size: 1.3rem;
          text-transform: uppercase;
        }

        .close-auth-btn {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .close-auth-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .auth-body {
          padding: 24px;
        }

        .auth-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 20px;
          line-height: 1.4;
        }

        .auth-alert.error {
          background: rgba(255, 42, 95, 0.08);
          border: 1px solid rgba(255, 42, 95, 0.2);
          color: var(--accent-red);
          text-shadow: 0 0 10px rgba(255, 42, 95, 0.1);
        }

        .auth-alert.success {
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--accent-cyan);
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .submit-auth-btn {
          width: 100%;
          justify-content: center;
          margin-top: 8px;
        }

        .auth-switcher {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 20px;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }

        .switch-toggle {
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .switch-toggle:hover {
          text-decoration: underline;
        }

        .auth-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin-loader 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
