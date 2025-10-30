# Troubleshooting Guide

## Receipt Modal Not Showing

If the receipt modal doesn't appear after checkout, follow these steps:

### 1. Check Browser Console

Open your browser's Developer Tools (F12) and check the Console tab for any errors:

```
1. Open the application
2. Press F12 to open Developer Tools
3. Click on the "Console" tab
4. Try to complete a checkout
5. Look for any error messages
```

### 2. Verify Backend is Running

Make sure your backend server is running on port 5000:

```bash
cd backend
npm start
```

You should see:
```
Server running on http://localhost:5000
```

### 3. Check Network Requests

In Developer Tools:
1. Click on the "Network" tab
2. Try checkout again
3. Look for the `/api/checkout` request
4. Click on it and check the "Response" tab
5. You should see receipt data with:
   - orderNumber
   - customerName
   - customerEmail
   - items
   - total
   - timestamp

### 4. Check Cart Items

Before checkout, open the Console and type:
```javascript
// This will show your cart data
console.log(cart)
```

Make sure items have:
- id
- name
- price
- quantity
- subtotal

### 5. Console Debugging

The application now includes debug logging. After attempting checkout, check the console for:

```
Starting checkout with: {...}
Checkout response: {...}
Receipt data: {...}
ReceiptModal - isOpen: true
ReceiptModal - receipt: {...}
```

If you see "ReceiptModal - No receipt data provided", the checkout didn't return proper data.

### 6. Common Issues

**Issue: "Cart is empty" error**
- Make sure you have items in your cart before checkout
- Check that cart items have the correct structure

**Issue: Receipt data is null/undefined**
- Check backend response structure
- Verify the API is returning `response.data.data`
- Make sure backend completed the order successfully

**Issue: Modal flashes and disappears**
- Check if there's a JavaScript error in the console
- Verify receipt data structure matches expected format
- Make sure all required fields exist in receipt object

**Issue: Network error during checkout**
- Verify backend server is running
- Check that CORS is properly configured
- Try restarting both frontend and backend

### 7. Manual Test

You can manually trigger the receipt modal in the Console:

```javascript
// Test the receipt modal with sample data
const testReceipt = {
  orderId: 1,
  orderNumber: "ORD-TEST-123",
  customerName: "Test User",
  customerEmail: "test@example.com",
  items: [
    {
      name: "Test Product",
      quantity: 1,
      subtotal: 99.99
    }
  ],
  total: 99.99,
  timestamp: new Date().toISOString()
};

// This should be done in React DevTools or by modifying the component temporarily
```

### 8. Restart Everything

If issues persist:

```bash
# Stop both servers (Ctrl+C)

# Backend
cd backend
rm ecommerce.db
npm run init-db
npm start

# Frontend (new terminal)
cd frontend
npm run dev
```

### 9. Clear Browser Cache

Sometimes cached data causes issues:
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### 10. Check Browser Compatibility

Make sure you're using a modern browser:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

---

## Still Having Issues?

If the receipt modal still doesn't work after following these steps:

1. Check all console messages for errors
2. Verify the exact error message
3. Share the console output for debugging
4. Make sure all dependencies are installed (`npm install` in both folders)

