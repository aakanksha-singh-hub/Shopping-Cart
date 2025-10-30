import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import CategoryBar from '../components/CategoryBar';
import { getProducts, addToCart } from '../services/api';
import './Products.css';

function Products({ updateCartCount }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      await updateCartCount();
    } catch (err) {
      alert(err.message || 'Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="animate-spin loading-icon" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">⚠️ {error}</p>
        <button className="retry-btn" onClick={fetchProducts}>
          Try Again
        </button>
      </div>
    );
  }

  const filtered = activeCategory
    ? products.filter((p) => (p.category || '').toLowerCase().includes(activeCategory.toLowerCase()))
    : products;

  return (
    <div className="products-page">
      <PromoBanner />

      <div className="page-header">
        <h1>Shop by Category</h1>
        <p>Fresh picks and best prices, delivered to you</p>
      </div>

      <CategoryBar active={activeCategory} onSelect={setActiveCategory} />

      <div className="products-grid">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No products available for this category.</p>
        </div>
      )}
    </div>
  );
}

export default Products;

