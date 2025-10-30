import { FaCheckCircle, FaTimes, FaDownload } from 'react-icons/fa';
import './ReceiptModal.css';
import { formatCurrency } from '../utils/currency';

function ReceiptModal({ isOpen, onClose, receipt }) {
  if (!isOpen) return null;
  
  // Debug logging
  console.log('ReceiptModal - isOpen:', isOpen);
  console.log('ReceiptModal - receipt:', receipt);
  
  if (!receipt) {
    console.log('ReceiptModal - No receipt data provided');
    return null;
  }

  const formatDate = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-header">
            <FaCheckCircle className="success-icon" />
            <h2>Order Successful!</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="receipt-content">
          <div className="receipt-header">
            <h3>Order Receipt</h3>
            <p className="order-number">{receipt.orderNumber}</p>
            <p className="order-date">{formatDate(receipt.timestamp)}</p>
          </div>

          <div className="receipt-section">
            <h4>Customer Information</h4>
            <div className="info-row">
              <span>Name:</span>
              <span>{receipt.customerName}</span>
            </div>
            <div className="info-row">
              <span>Email:</span>
              <span>{receipt.customerEmail}</span>
            </div>
          </div>

          <div className="receipt-section">
            <h4>Order Items</h4>
            <div className="receipt-items">
              {receipt.items && receipt.items.length > 0 ? (
                receipt.items.map((item, index) => (
                  <div key={index} className="receipt-item">
                    <div className="item-details">
                      <span className="item-name">{item.name || 'Product'}</span>
                      <span className="item-quantity">x{item.quantity || 1}</span>
                    </div>
                    <span className="item-price">{formatCurrency(item.subtotal || 0)}</span>
                  </div>
                ))
              ) : (
                <p>No items in order</p>
              )}
            </div>
          </div>

          <div className="receipt-total">
            <span>Total Amount</span>
            <span className="total-value">{formatCurrency(receipt.total)}</span>
          </div>

          {typeof receipt.discount === 'number' && receipt.discount > 0 && (
            <div className="receipt-section">
              <h4>Discount Applied</h4>
              <div className="info-row">
                <span>Code:</span>
                <span>{receipt.discountCode}</span>
              </div>
              <div className="info-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(receipt.totalBeforeDiscount)}</span>
              </div>
              <div className="info-row">
                <span>Discount:</span>
                <span>-{formatCurrency(receipt.discount)}</span>
              </div>
              <div className="info-row">
                <span>Total after discount:</span>
                <span>{formatCurrency(receipt.total)}</span>
              </div>
            </div>
          )}

          <div className="receipt-footer">
            <p>Thank you for shopping with Vibe Commerce!</p>
            <p className="footer-note">A confirmation email has been sent to {receipt.customerEmail}</p>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handlePrint}>
            <FaDownload /> Download Receipt
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;

