import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { products } from './data/products';

export default function App() {
  const [selectedProduct] = useState(products[0]); // Default to Pretender 24
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Visual feedback: slide open the cart drawer
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    // Add to cart first
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // Close cart drawer if open, directly open checkout
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutProceed = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app-wrapper">
      {/* Navigation Header */}
      <Header 
        cartItemsCount={totalCartCount} 
        onCartOpen={() => setIsCartOpen(true)} 
      />

      {/* Main Sections */}
      <main>
        <Hero 
          product={selectedProduct} 
          onAddToCart={handleAddToCart} 
          onBuyNow={handleBuyNow} 
        />
        
        <Gallery product={selectedProduct} />
        
        <Specs product={selectedProduct} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutProceed}
      />

      {/* Checkout Stepper Modal */}
      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

      <style>{`
        .app-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        main {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
