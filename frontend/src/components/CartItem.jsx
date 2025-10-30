import { useState } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import './CartItem.css';
import { formatCurrency } from '../utils/currency';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await onRemove(item.id);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="cart-item animate-fade-in">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">{formatCurrency(item.price)} each</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating}
          >
            <FaPlus />
          </button>
        </div>

        <div className="cart-item-subtotal">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-amount">{formatCurrency(item.subtotal)}</span>
        </div>

        <button
          className="remove-btn"
          onClick={handleRemove}
          disabled={isUpdating}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default CartItem;

