import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { getCart } from './services/api';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const response = await getCart();
      const data = response.data.data;
      const totalQuantity = Array.isArray(data?.items)
        ? data.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
        : 0;
      setCartCount(totalQuantity);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Products updateCartCount={updateCartCount} />} />
            <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

