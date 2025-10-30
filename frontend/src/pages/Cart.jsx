import { useState, useEffect } from 'react';
import { FaSpinner, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CheckoutModal from '../components/CheckoutModal';
import ReceiptModal from '../components/ReceiptModal';
import { getCart, updateCartItem, removeFromCart, checkout } from '../services/api';
import './Cart.css';
import { formatCurrency } from '../utils/currency';

function Cart({ updateCartCount }) {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCart(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      await updateCartItem(id, quantity);
      await fetchCart();
      await updateCartCount();
    } catch (err) {
      alert(err.message || 'Failed to update item');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await removeFromCart(id);
      await fetchCart();
      await updateCartCount();
    } catch (err) {
      alert(err.message || 'Failed to remove item');
    }
  };

  const handleCheckout = async (customerName, customerEmail) => {
    try {
      console.log('Starting checkout with:', { customerName, customerEmail, items: cart.items });
      const response = await checkout(customerName, customerEmail, cart.items, appliedCoupon);
      console.log('Checkout response:', response);
      
      const receiptData = response.data.data;
      console.log('Receipt data:', receiptData);
      
      setReceipt(receiptData);
      setShowCheckoutModal(false);
      setShowReceiptModal(true);
      
      // Fetch cart and update count after showing receipt
      await fetchCart();
      await updateCartCount();
    } catch (err) {
      console.error('Checkout error:', err);
      alert(err.message || 'Checkout failed');
      throw err;
    }
  };
  const canApplyCoupon = couponCode.trim().length > 0;
  const isValidCoupon = couponCode.trim().toUpperCase() === 'HELLOFOOD';
  const discount = appliedCoupon ? parseFloat((cart.total * 0.25).toFixed(2)) : 0;
  const effectiveTotal = cart.total - discount;


  const handleCloseReceipt = () => {
    setShowReceiptModal(false);
    setReceipt(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="animate-spin loading-icon" />
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button className="retry-btn" onClick={fetchCart}>
          Try Again
        </button>
      </div>
    );
  }

  if (cart.items.length === 0 && !showReceiptModal) {
    return (
      <div className="empty-cart">
        <FaShoppingBag className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/" className="shop-now-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p>{cart.count} {cart.count === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.total)}</span>
            </div>
            <div className="summary-row">
              <span>Coupon</span>
              <span>
                {appliedCoupon ? (
                  <>
                    {appliedCoupon} <span style={{color: 'var(--success)', fontWeight: 700}}>−{formatCurrency(discount)}</span>
                  </>
                ) : (
                  'None'
                )}
              </span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-price">{formatCurrency(effectiveTotal)}</span>
            </div>
          </div>

          <div className="coupon-row">
            <input
              type="text"
              placeholder="Enter coupon code (HELLOFOOD)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="coupon-input"
            />
            {appliedCoupon ? (
              <button className="coupon-btn" onClick={() => { setAppliedCoupon(''); setCouponCode(''); }}>
                Remove
              </button>
            ) : (
              <button
                className="coupon-btn"
                disabled={!canApplyCoupon}
                onClick={() => {
                  if (isValidCoupon) {
                    setAppliedCoupon('HELLOFOOD');
                  } else {
                    alert('Invalid coupon code');
                  }
                }}
              >
                Apply
              </button>
            )}
          </div>

          <button 
            className="checkout-btn"
            onClick={() => setShowCheckoutModal(true)}
          >
            Proceed to Checkout
          </button>

          <Link to="/" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onCheckout={handleCheckout}
        total={effectiveTotal}
      />

      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={handleCloseReceipt}
        receipt={receipt}
      />
    </div>
  );
}

export default Cart;

