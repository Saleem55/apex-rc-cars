import React, { useState, useEffect } from 'react';
import { X, CreditCard, ChevronRight, CheckCircle2, ShieldCheck, Truck, ClipboardList } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Checkout({ isOpen, onClose, cart, onClearCart }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Processing, 4: Success
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [processingStatus, setProcessingStatus] = useState('Securing tunnel connection...');
  const [orderNumber, setOrderNumber] = useState('');
  
  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const currencySymbol = cart.length > 0 ? (cart[0].currencySymbol || '₹') : '₹';
  const formatPrice = (amount) => {
    if (currencySymbol === '₹') {
      return `${currencySymbol}${Math.round(amount).toLocaleString('en-IN')}`;
    }
    return `${currencySymbol}${amount.toFixed(2)}`;
  };

  // Handle card inputs auto-formatting
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const matches = value.match(/.{1,4}/g);
    const formatted = matches ? matches.join(' ') : '';
    setPaymentForm(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setPaymentForm(prev => ({ ...prev, cardExpiry: value }));
  };

  const handleCardCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setPaymentForm(prev => ({ ...prev, cardCvv: value }));
  };

  // Step transitions & simulation
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (shippingForm.name && shippingForm.email && shippingForm.address && shippingForm.city && shippingForm.zip) {
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentForm.cardName && paymentForm.cardNumber.length >= 19 && paymentForm.cardExpiry.length === 5 && paymentForm.cardCvv.length === 3) {
      setStep(3);
      simulatePayment();
    }
  };

  const saveOrderToSupabase = async (orderNum) => {
    try {
      const { error } = await supabase.from('orders').insert({
        order_number: orderNum,
        customer_name: shippingForm.name,
        customer_email: shippingForm.email,
        shipping_address: shippingForm.address,
        shipping_city: shippingForm.city,
        shipping_zip: shippingForm.zip,
        items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        subtotal: subtotal,
        total: total,
        payment_status: 'completed',
        payment_method: 'simulated_card'
      });
      if (error) {
        console.warn('Failed to save order to Supabase:', error.message);
      } else {
        console.log('Order successfully logged to Supabase.');
      }
    } catch (err) {
      console.warn('Supabase insert catch error:', err.message);
    }
  };

  const simulatePayment = () => {
    const statuses = [
      { text: 'Securing tunnel connection...', delay: 800 },
      { text: 'Encrypting credentials...', delay: 1600 },
      { text: 'Authorizing card transaction...', delay: 2600 },
      { text: 'Securing order database records...', delay: 3400 }
    ];

    statuses.forEach((status) => {
      setTimeout(() => {
        setProcessingStatus(status.text);
      }, status.delay);
    });

    setTimeout(() => {
      // Generate random order number
      const orderNum = 'RC-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(orderNum);
      saveOrderToSupabase(orderNum);
      setStep(4);
      onClearCart(); // Reset shopping cart
    }, 4200);
  };

  // Reset state when closing
  const handleClose = () => {
    setStep(1);
    setShippingForm({ name: '', email: '', address: '', city: '', zip: '' });
    setPaymentForm({ cardName: '', cardNumber: '', cardExpiry: '', cardCvv: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-overlay animate-fade-in" onClick={handleClose}>
      <div 
        className="checkout-modal glass-panel animate-scale-up" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (unless success) */}
        {step < 4 && (
          <div className="checkout-header">
            <h2 className="checkout-title">Secure Checkout</h2>
            <button className="close-checkout-btn" onClick={handleClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Stepper indicators */}
        {step < 3 && (
          <div className="stepper">
            <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-label">Shipping</span>
            </div>
            <ChevronRight size={14} className="stepper-arrow" />
            <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-label">Payment</span>
            </div>
          </div>
        )}

        <div className="checkout-body">
          
          {/* STEP 1: Shipping Form */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit} className="checkout-form">
              <div className="form-section-title">
                <Truck size={18} className="text-glow-cyan" />
                <span>Shipping Address</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="ship-name">Full Name</label>
                <input 
                  type="text" 
                  id="ship-name" 
                  required
                  value={shippingForm.name}
                  onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ship-email">Email Address</label>
                <input 
                  type="email" 
                  id="ship-email" 
                  required
                  value={shippingForm.email}
                  onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="ship-address">Street Address</label>
                <input 
                  type="text" 
                  id="ship-address" 
                  required
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  placeholder="123 Speed Street"
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <label htmlFor="ship-city">City</label>
                  <input 
                    type="text" 
                    id="ship-city" 
                    required
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="ship-zip">ZIP Code</label>
                  <input 
                    type="text" 
                    id="ship-zip" 
                    required
                    value={shippingForm.zip}
                    onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="checkout-form-footer">
                <div className="totals-hint">
                  Total: <span className="text-glow-cyan">{formatPrice(total)}</span>
                </div>
                <button type="submit" className="btn-accent" id="submit-shipping">
                  Continue to Payment
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Form */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="checkout-form">
              <div className="form-section-title">
                <ShieldCheck size={18} className="text-glow-cyan" />
                <span>Secure Card Payment</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="card-name">Cardholder Name</label>
                <input 
                  type="text" 
                  id="card-name" 
                  required
                  value={paymentForm.cardName}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                  placeholder="JOHN DOE"
                />
              </div>

              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <div className="input-with-icon">
                  <CreditCard className="input-icon" size={16} />
                  <input 
                    type="text" 
                    id="card-number" 
                    required
                    value={paymentForm.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="card-expiry">Expiry Date</label>
                  <input 
                    type="text" 
                    id="card-expiry" 
                    required
                    value={paymentForm.cardExpiry}
                    onChange={handleCardExpiryChange}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="card-cvv">CVV</label>
                  <input 
                    type="password" 
                    id="card-cvv" 
                    required
                    value={paymentForm.cardCvv}
                    onChange={handleCardCvvChange}
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="security-notice">
                <ShieldCheck size={14} className="text-glow-cyan" />
                <span>Simulated secure gateway. Do not enter real credit card numbers.</span>
              </div>

              <div className="checkout-form-footer">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" className="btn-accent" id="submit-payment">
                  Pay {formatPrice(total)}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Processing State */}
          {step === 3 && (
            <div className="processing-state">
              <div className="circle-loader-wrapper">
                <div className="circle-loader"></div>
                <CreditCard className="loader-inner-icon" size={24} />
              </div>
              <h3 className="processing-title">Processing Order</h3>
              <p className="processing-status">{processingStatus}</p>
            </div>
          )}

          {/* STEP 4: Success State Receipt */}
          {step === 4 && (
            <div className="success-state">
              {/* Simulated Confetti background */}
              <div className="confetti-wrapper">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="confetti-piece"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      backgroundColor: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-red)',
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  ></div>
                ))}
              </div>

              <div className="success-icon-wrapper animate-pulse-glow">
                <CheckCircle2 size={48} className="text-glow-cyan" />
              </div>

              <h2 className="success-title">Order Confirmed!</h2>
              <p className="success-desc">Thank you for your purchase, {shippingForm.name.split(' ')[0]}!</p>
              
              {/* Receipt */}
              <div className="receipt-invoice glass-panel">
                <div className="receipt-header">
                  <div className="receipt-logo">
                    APEX<span className="text-glow-red">RC</span>
                  </div>
                  <div className="receipt-meta">
                    <span className="meta-label">Invoice:</span>
                    <span className="meta-value text-glow-cyan">{orderNumber}</span>
                  </div>
                </div>
                
                <div className="receipt-body">
                  <div className="receipt-section">
                    <h4 className="receipt-section-title">Delivery Address</h4>
                    <p className="receipt-text">{shippingForm.name}</p>
                    <p className="receipt-text">{shippingForm.address}</p>
                    <p className="receipt-text">{shippingForm.city}, {shippingForm.zip}</p>
                  </div>
                  
                  <div className="receipt-section">
                    <h4 className="receipt-section-title">Items Ordered</h4>
                    {cart.map((item, idx) => (
                      <div key={idx} className="receipt-item-row">
                        <span className="item-row-desc">{item.name} x{item.quantity}</span>
                        <span className="item-row-price">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="receipt-summary">
                    <div className="receipt-summary-row">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="receipt-summary-row">
                      <span>Shipping</span>
                      <span className="text-glow-cyan">FREE</span>
                    </div>
                    <div className="receipt-summary-row total-receipt-row">
                      <span>Total Charged</span>
                      <span className="text-glow-cyan">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="receipt-footer">
                  <ClipboardList size={16} />
                  <span>Estimated Delivery: 3-5 Business Days</span>
                </div>
              </div>

              <button className="btn-primary success-home-btn" onClick={handleClose}>
                Return to Store
              </button>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .checkout-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .checkout-modal {
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
        }

        /* Modal custom scrollbar */
        .checkout-modal::-webkit-scrollbar {
          width: 6px;
        }
        .checkout-modal::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }

        .checkout-header {
          padding: 24px 24px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .checkout-title {
          font-size: 1.4rem;
          text-transform: uppercase;
        }

        .close-checkout-btn {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .close-checkout-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .checkout-body {
          padding: 24px;
          flex: 1;
        }

        /* Stepper Styling */
        .stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.01);
        }

        .step-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-tertiary);
        }

        .step-indicator.active {
          color: var(--text-primary);
        }

        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .step-indicator.active .step-num {
          border-color: var(--accent-cyan);
          background: rgba(0, 240, 255, 0.1);
          color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        }

        .step-label {
          font-family: var(--font-family-display);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stepper-arrow {
          color: var(--text-tertiary);
        }

        /* Forms Styling */
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-family-display);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-family: var(--font-family-body);
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-smooth);
        }

        .form-group input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
          background: rgba(0, 240, 255, 0.01);
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .flex-1 { flex: 1; }
        .flex-2 { flex: 2; }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .input-with-icon input {
          padding-left: 48px;
          width: 100%;
        }

        .security-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.1);
          padding: 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .checkout-form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
        }

        .totals-hint {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        /* STEP 3: Processing styling */
        .processing-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
          text-align: center;
        }

        .circle-loader-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 24px;
        }

        .circle-loader {
          width: 100%;
          height: 100%;
          border: 4px solid rgba(0, 240, 255, 0.1);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin-loader 1s linear infinite;
        }

        .loader-inner-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--accent-cyan);
          animation: pulseGlow 1.5s ease-in-out infinite;
        }

        .processing-title {
          font-size: 1.25rem;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .processing-status {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* STEP 4: Success styling */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .success-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.05);
          border: 2px solid var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 1.8rem;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .success-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .receipt-invoice {
          width: 100%;
          text-align: left;
          padding: 24px;
          margin-bottom: 28px;
        }

        .receipt-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
          margin-bottom: 16px;
        }

        .receipt-logo {
          font-family: var(--font-family-display);
          font-weight: 700;
          font-size: 1.15rem;
        }

        .receipt-meta {
          display: flex;
          gap: 6px;
          font-size: 0.85rem;
        }

        .meta-label {
          color: var(--text-secondary);
        }

        .meta-value {
          font-weight: 600;
        }

        .receipt-section {
          margin-bottom: 18px;
          font-size: 0.85rem;
        }

        .receipt-section-title {
          font-family: var(--font-family-display);
          text-transform: uppercase;
          color: var(--text-secondary);
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .receipt-text {
          color: var(--text-primary);
          line-height: 1.5;
        }

        .receipt-item-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .item-row-desc {
          color: var(--text-primary);
        }

        .item-row-price {
          font-weight: 600;
        }

        .receipt-summary {
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
        }

        .receipt-summary-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }

        .total-receipt-row {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          margin-top: 4px;
        }

        .receipt-footer {
          border-top: 1px solid var(--border-color);
          margin-top: 16px;
          padding-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .success-home-btn {
          width: 100%;
          justify-content: center;
        }

        /* Simulated Confetti styles */
        .confetti-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          opacity: 0;
          top: -10px;
          border-radius: 2px;
          animation: confetti-fall 3s linear infinite;
        }

        @keyframes confetti-fall {
          0% {
            top: -10px;
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
            transform: translateY(100%) rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
