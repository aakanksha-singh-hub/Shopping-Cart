# Testing Guide

Comprehensive testing instructions for the Vibe Commerce application.

## Prerequisites

- Application running (backend on :5000, frontend on :3000)
- Fresh database initialized
- Modern browser with DevTools

## Manual Testing Checklist

### 1. Backend API Testing

#### Test Products Endpoint
```bash
# Terminal test
curl http://localhost:5000/api/products

# Expected: JSON with 10 products
# Status: 200 OK
```

#### Test Cart Endpoints
```bash
# Get empty cart
curl http://localhost:5000/api/cart

# Add item to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'

# Get cart with items
curl http://localhost:5000/api/cart

# Update cart item (replace :id with actual cart item id)
curl -X PUT http://localhost:5000/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'

# Remove cart item
curl -X DELETE http://localhost:5000/api/cart/1
```

#### Test Checkout Endpoint
```bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "cartItems": []
  }'
```

### 2. Frontend Testing

#### Products Page Tests

**Test Case 1: Page Load**
- [ ] Navigate to http://localhost:3000
- [ ] Products grid loads and displays
- [ ] 10 products are visible
- [ ] Each product shows image, name, description, price
- [ ] Loading spinner appears briefly
- [ ] No errors in console

**Test Case 2: Add to Cart**
- [ ] Click "Add to Cart" on a product
- [ ] Button shows "Added" with checkmark
- [ ] Cart badge updates with count
- [ ] Success feedback visible
- [ ] Can add multiple different products
- [ ] Adding same product increases quantity

**Test Case 3: Navigation**
- [ ] Navbar is visible and sticky
- [ ] "Vibe Commerce" logo is displayed
- [ ] "Products" and "Cart" links work
- [ ] Active page is highlighted
- [ ] Cart badge shows correct count

#### Cart Page Tests

**Test Case 4: Empty Cart**
- [ ] Navigate to cart with no items
- [ ] "Your cart is empty" message displays
- [ ] Empty shopping bag icon shows
- [ ] "Start Shopping" button is visible
- [ ] Clicking button returns to products

**Test Case 5: Cart with Items**
- [ ] Add items from products page
- [ ] Navigate to cart
- [ ] All added items are displayed
- [ ] Each item shows image, name, price, quantity
- [ ] Subtotal calculated correctly for each item
- [ ] Order summary shows correct total
- [ ] Shipping shows as "FREE"

**Test Case 6: Update Quantity**
- [ ] Click + button to increase quantity
- [ ] Quantity updates immediately
- [ ] Subtotal updates
- [ ] Total updates
- [ ] Click - button to decrease quantity
- [ ] Cannot decrease below 1 (button disabled)
- [ ] Cart badge updates

**Test Case 7: Remove Item**
- [ ] Click trash icon on cart item
- [ ] Item removes immediately
- [ ] Total updates correctly
- [ ] Cart badge updates
- [ ] If last item, empty cart message shows

#### Checkout Tests

**Test Case 8: Open Checkout Modal**
- [ ] Click "Proceed to Checkout" in cart
- [ ] Modal opens with form
- [ ] Form has name and email fields
- [ ] Total is displayed correctly
- [ ] Cancel and Place Order buttons visible

**Test Case 9: Form Validation**
- [ ] Try to submit empty form
- [ ] "Name is required" error shows
- [ ] "Email is required" error shows
- [ ] Enter invalid email (e.g., "test")
- [ ] "Invalid email format" error shows
- [ ] Errors clear when typing

**Test Case 10: Successful Checkout**
- [ ] Enter valid name
- [ ] Enter valid email
- [ ] Click "Place Order"
- [ ] Loading state appears ("Processing...")
- [ ] Modal closes
- [ ] Receipt modal opens

**Test Case 11: Receipt Modal**
- [ ] Success icon and message display
- [ ] Order number is shown (ORD-...)
- [ ] Date and time are displayed
- [ ] Customer info is correct
- [ ] All items are listed with quantities
- [ ] Total is correct
- [ ] "Download Receipt" and "Continue Shopping" buttons work
- [ ] Clicking "Continue Shopping" closes modal
- [ ] Cart is now empty

### 3. Responsive Design Tests

#### Mobile View (< 768px)

**Test Case 12: Mobile Products**
- [ ] Open DevTools (F12)
- [ ] Set viewport to 375x667 (iPhone)
- [ ] Products stack in single column
- [ ] Images and text are readable
- [ ] Buttons are touch-friendly
- [ ] No horizontal scroll

**Test Case 13: Mobile Navigation**
- [ ] Brand text may hide, icon remains
- [ ] Navigation items visible
- [ ] Cart badge visible
- [ ] Touch targets adequate (min 44px)

**Test Case 14: Mobile Cart**
- [ ] Cart items stack vertically
- [ ] Images display properly
- [ ] Quantity controls are usable
- [ ] Summary sticks to bottom or follows content
- [ ] Checkout button is visible

**Test Case 15: Mobile Modals**
- [ ] Checkout modal fits screen
- [ ] Form fields are usable
- [ ] Keyboard doesn't break layout
- [ ] Receipt modal is readable
- [ ] Can scroll within modal if needed

#### Tablet View (768px - 1024px)

**Test Case 16: Tablet Layout**
- [ ] Set viewport to 768x1024 (iPad)
- [ ] Products show in 2-3 columns
- [ ] All content accessible
- [ ] Touch interactions work
- [ ] Spacing appropriate

#### Desktop View (> 1024px)

**Test Case 17: Desktop Layout**
- [ ] Set viewport to 1920x1080
- [ ] Products show in 4-5 columns
- [ ] Max-width constraint (1400px) applied
- [ ] Content centered
- [ ] Hover effects work
- [ ] Smooth animations

### 4. Error Handling Tests

**Test Case 18: Backend Down**
- [ ] Stop backend server
- [ ] Refresh products page
- [ ] Error message displays
- [ ] "Try Again" button appears
- [ ] Clicking retry attempts reload
- [ ] Restart backend, retry succeeds

**Test Case 19: Network Issues**
- [ ] Open DevTools → Network tab
- [ ] Throttle to "Slow 3G"
- [ ] Add item to cart
- [ ] Loading state persists longer
- [ ] Eventually succeeds or shows error

**Test Case 20: Invalid Operations**
- [ ] Try to checkout with empty cart (if possible)
- [ ] Appropriate error shown
- [ ] Try to update non-existent cart item
- [ ] Error handled gracefully

### 5. Browser Compatibility Tests

**Test Case 21: Chrome**
- [ ] All features work
- [ ] No console errors
- [ ] Smooth performance

**Test Case 22: Firefox**
- [ ] All features work
- [ ] CSS renders correctly
- [ ] Animations smooth

**Test Case 23: Safari**
- [ ] All features work
- [ ] Fonts load correctly
- [ ] No webkit-specific issues

**Test Case 24: Edge**
- [ ] All features work
- [ ] Compatible with Chromium base

### 6. Performance Tests

**Test Case 25: Load Time**
- [ ] Open DevTools → Network tab
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Initial page load < 3 seconds
- [ ] Images load progressively
- [ ] No blocking resources

**Test Case 26: Interactions**
- [ ] Add to cart responds < 500ms
- [ ] Cart updates are immediate
- [ ] Page transitions are smooth
- [ ] No jank or lag

### 7. Data Persistence Tests

**Test Case 27: Cart Persistence**
- [ ] Add items to cart
- [ ] Refresh page
- [ ] Cart items still present
- [ ] Cart badge shows correct count
- [ ] Can continue shopping

**Test Case 28: Order History**
- [ ] Complete an order
- [ ] Check backend: `curl http://localhost:5000/api/orders`
- [ ] Order is recorded in database
- [ ] Order details are correct

### 8. Edge Cases

**Test Case 29: Multiple Items Same Product**
- [ ] Add same product multiple times
- [ ] Quantity increases (not duplicate entries)
- [ ] Subtotal calculates correctly

**Test Case 30: Large Quantities**
- [ ] Increase quantity to high number (50+)
- [ ] Calculations remain accurate
- [ ] No performance issues
- [ ] Can still checkout

**Test Case 31: Special Characters**
- [ ] Enter name with accents (José, François)
- [ ] Enter email with + sign
- [ ] Data saves and displays correctly

**Test Case 32: Long Content**
- [ ] Products with long names
- [ ] Truncation or wrapping works
- [ ] UI doesn't break

## Automated Testing (Future Enhancement)

### Backend Tests (Example)

```javascript
// test/products.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /api/products', () => {
  it('should return all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(10);
  });
});
```

### Frontend Tests (Example)

```javascript
// src/__tests__/ProductCard.test.jsx
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

test('renders product name', () => {
  const product = { name: 'Test Product', price: 9.99 };
  render(<ProductCard product={product} />);
  expect(screen.getByText('Test Product')).toBeInTheDocument();
});
```

## Bug Report Template

If you find issues:

```markdown
**Bug Title:** [Short description]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Environment:**
- Browser: [Chrome 120]
- OS: [Windows 11]
- Screen Size: [1920x1080]

**Console Errors:**
[Paste any errors from DevTools]

**Screenshots:**
[If applicable]
```

## Testing Checklist Summary

- [ ] All backend endpoints working
- [ ] All frontend pages loading
- [ ] Add to cart functioning
- [ ] Cart updates working
- [ ] Checkout process complete
- [ ] Form validation working
- [ ] Receipt generation working
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Error handling working
- [ ] Cart persists on refresh
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Cross-browser compatible

## Success Criteria

✅ All test cases pass
✅ No critical bugs
✅ Acceptable performance
✅ Works on all target browsers
✅ Mobile-friendly
✅ Good user experience

## Next Steps After Testing

1. Document any issues found
2. Fix critical bugs
3. Optimize performance if needed
4. Take screenshots for README
5. Record demo video
6. Prepare for submission

