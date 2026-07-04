import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ProfileDrawer from './components/ProfileDrawer';
import { products } from './data/products';
import { supabase } from './supabaseClient';

export default function App() {
  const [productsList, setProductsList] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // 1. Fetch products
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.warn('Supabase products fetch failed, using static fallback:', error.message);
          return;
        }
        if (data && data.length > 0) {
          // Map database snake_case fields back to camelCase for the frontend
          const mappedData = data.map((item) => ({
            ...item,
            currencySymbol: item.currency_symbol || item.currencySymbol || '₹',
            reviewsCount: item.reviews_count !== undefined ? item.reviews_count : item.reviewsCount,
            imageCaptions: item.image_captions || item.imageCaptions || [],
          }));
          setProductsList(mappedData);
          setSelectedProduct(mappedData[0]);
        }
      } catch (err) {
        console.warn('Failed to load products from database:', err.message);
      }
    }
    fetchProducts();

    // 2. Fetch current active auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 3. Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    // Close cart drawer if open, directly open checkout or show login
    setIsCartOpen(false);
    
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
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
    
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app-wrapper">
      {/* Navigation Header */}
      <Header 
        cartItemsCount={totalCartCount} 
        onCartOpen={() => setIsCartOpen(true)} 
        user={user}
        onProfileOpen={() => setIsProfileOpen(true)}
        onAuthModalOpen={() => setIsAuthOpen(true)}
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
        user={user}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          if (cart.length > 0) {
            setIsCheckoutOpen(true);
          }
        }}
      />

      {/* Profile/Orders History Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onSignOut={() => setUser(null)}
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
