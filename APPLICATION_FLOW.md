# 🔄 Application Flow & Architecture

Visual guide to how the Vibe Commerce application works.

## User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

1. BROWSE PRODUCTS
   User lands on homepage
   ↓
   Sees grid of 10 products
   ↓
   Each product shows: image, name, description, price, category
   ↓

2. ADD TO CART
   User clicks "Add to Cart" on a product
   ↓
   Success feedback appears
   ↓
   Cart badge updates with count
   ↓
   Can continue shopping or go to cart
   ↓

3. VIEW CART
   User clicks cart icon in navbar
   ↓
   Sees all cart items with details
   ↓
   Each item shows: image, name, price, quantity, subtotal
   ↓
   Order summary shows total
   ↓

4. MANAGE CART
   User can:
   - Increase quantity (+)
   - Decrease quantity (-)
   - Remove items (trash icon)
   ↓
   Total updates in real-time
   ↓
   Can continue shopping or checkout
   ↓

5. CHECKOUT
   User clicks "Proceed to Checkout"
   ↓
   Modal opens with form
   ↓
   User enters:
   - Full Name
   - Email Address
   ↓
   Form validates input
   ↓
   User clicks "Place Order"
   ↓

6. ORDER CONFIRMATION
   Processing...
   ↓
   Order saved to database
   ↓
   Cart cleared
   ↓
   Receipt modal appears
   ↓
   Shows:
   - Order number
   - Date/time
   - Customer info
   - Items with quantities
   - Total amount
   ↓
   User can download/print receipt
   ↓
   Click "Continue Shopping" to return
```

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     SYSTEM ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│   Browser   │          │   Vite Dev  │          │   Express   │
│  (Port 3000)│ ◄─────── │   Server    │ ◄─────── │   Server    │
│             │   Proxy  │             │   HTTP   │  (Port 5000)│
│  React App  │          │             │          │             │
└─────────────┘          └─────────────┘          └─────────────┘
                                                          │
                                                          │
                                                          ▼
                                                   ┌─────────────┐
                                                   │   SQLite    │
                                                   │  Database   │
                                                   │             │
                                                   └─────────────┘
```

## API Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        API REQUEST FLOW                          │
└─────────────────────────────────────────────────────────────────┘

Frontend                        Backend                    Database
   │                               │                           │
   │ GET /api/products            │                           │
   ├──────────────────────────────>│                           │
   │                               │ SELECT * FROM products    │
   │                               ├──────────────────────────>│
   │                               │ <─────────────────────────┤
   │ <──────────────────────────────┤  (10 products)           │
   │ [Display products]            │                           │
   │                               │                           │
   │ POST /api/cart                │                           │
   │ {productId: 1, qty: 2}        │                           │
   ├──────────────────────────────>│                           │
   │                               │ INSERT INTO cart          │
   │                               ├──────────────────────────>│
   │                               │ <─────────────────────────┤
   │ <──────────────────────────────┤  Success                 │
   │ [Update UI]                   │                           │
   │                               │                           │
   │ GET /api/cart                 │                           │
   ├──────────────────────────────>│                           │
   │                               │ SELECT cart JOIN products │
   │                               ├──────────────────────────>│
   │                               │ <─────────────────────────┤
   │ <──────────────────────────────┤  {items, total}          │
   │ [Display cart]                │                           │
   │                               │                           │
   │ POST /api/checkout            │                           │
   │ {name, email, items}          │                           │
   ├──────────────────────────────>│                           │
   │                               │ INSERT INTO orders        │
   │                               ├──────────────────────────>│
   │                               │ DELETE FROM cart          │
   │                               ├──────────────────────────>│
   │                               │ <─────────────────────────┤
   │ <──────────────────────────────┤  {receipt}               │
   │ [Show receipt]                │                           │
   │                               │                           │
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                     COMPONENT STRUCTURE                          │
└─────────────────────────────────────────────────────────────────┘

App
 ├── Navbar
 │    ├── Brand Logo
 │    ├── Navigation Links
 │    └── Cart Badge
 │
 ├── Router
 │    │
 │    ├── Route: / (Products Page)
 │    │    ├── Page Header
 │    │    ├── Products Grid
 │    │    │    └── ProductCard (x10)
 │    │    │         ├── Product Image
 │    │    │         ├── Category Badge
 │    │    │         ├── Product Info
 │    │    │         └── Add to Cart Button
 │    │    │
 │    │    ├── Loading State
 │    │    └── Error State
 │    │
 │    └── Route: /cart (Cart Page)
 │         ├── Page Header
 │         ├── Cart Items List
 │         │    └── CartItem (foreach item)
 │         │         ├── Item Image
 │         │         ├── Item Details
 │         │         ├── Quantity Controls
 │         │         └── Remove Button
 │         │
 │         ├── Cart Summary
 │         │    ├── Subtotal
 │         │    ├── Shipping
 │         │    ├── Total
 │         │    └── Checkout Button
 │         │
 │         ├── Empty Cart State
 │         └── Loading/Error States
 │
 ├── CheckoutModal
 │    ├── Modal Overlay
 │    ├── Modal Header
 │    ├── Checkout Form
 │    │    ├── Name Input
 │    │    ├── Email Input
 │    │    └── Validation Errors
 │    ├── Order Summary
 │    └── Action Buttons
 │
 └── ReceiptModal
      ├── Modal Overlay
      ├── Success Header
      ├── Receipt Content
      │    ├── Order Info
      │    ├── Customer Info
      │    ├── Items List
      │    └── Total
      └── Action Buttons
```

## State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                        STATE FLOW                                │
└─────────────────────────────────────────────────────────────────┘

App Level State:
  ├── cartCount (number) - Displayed in navbar badge
  │    └── Updated after: add to cart, update qty, remove item, checkout
  │
Products Page State:
  ├── products (array) - List of all products
  ├── loading (boolean) - Loading state
  └── error (string) - Error message
       └── Updated by: API calls
       
Cart Page State:
  ├── cart (object)
  │    ├── items (array)
  │    ├── total (number)
  │    └── count (number)
  ├── loading (boolean)
  ├── error (string)
  ├── showCheckoutModal (boolean)
  ├── showReceiptModal (boolean)
  └── receipt (object)
       └── Updated by: API calls, user actions
       
CheckoutModal State:
  ├── formData (object)
  │    ├── customerName (string)
  │    └── customerEmail (string)
  ├── errors (object)
  └── isSubmitting (boolean)
       └── Updated by: user input, validation
```

## Database Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATABASE STRUCTURE                           │
└─────────────────────────────────────────────────────────────────┘

products                cart                    orders
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ name         │◄──┐   │ product_id   │       │ customer_name│
│ price        │   └───│   (FK)       │       │ customer_emai│
│ description  │       │ quantity     │       │ total        │
│ image        │       │ user_id      │       │ items (JSON) │
│ category     │       │ created_at   │       │ created_at   │
└──────────────┘       └──────────────┘       └──────────────┘
```

## API Endpoints

```
┌─────────────────────────────────────────────────────────────────┐
│                        API ENDPOINTS                             │
└─────────────────────────────────────────────────────────────────┘

Products
  GET    /api/products          → Get all products

Cart  
  GET    /api/cart              → Get cart items + total
  POST   /api/cart              → Add item to cart
  PUT    /api/cart/:id          → Update cart item quantity
  DELETE /api/cart/:id          → Remove cart item

Checkout
  POST   /api/checkout          → Process order

Orders (Bonus)
  GET    /api/orders            → Get all orders
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      ERROR HANDLING                              │
└─────────────────────────────────────────────────────────────────┘

API Call
   │
   ▼
Try Block
   │
   ├── Success → Update State → Update UI
   │
   └── Error
       │
       ▼
   Catch Block
       │
       ├── Network Error → "Failed to connect"
       ├── 400 Bad Request → Validation message
       ├── 404 Not Found → "Item not found"
       ├── 500 Server Error → "Something went wrong"
       │
       ▼
   Display Error
       │
       ├── Alert (critical)
       ├── Error State (recoverable)
       └── Toast/Notification (minor)
```

## Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────────────┐
│                    RESPONSIVE DESIGN                             │
└─────────────────────────────────────────────────────────────────┘

Mobile (< 768px)
├── 1 column product grid
├── Stacked cart items
├── Simplified navigation
├── Full-width modals
└── Touch-friendly buttons (min 44px)

Tablet (768px - 1024px)
├── 2-3 column product grid
├── Side-by-side cart layout
├── Standard navigation
└── Adapted spacing

Desktop (> 1024px)
├── 4-5 column product grid
├── Fixed cart summary
├── Full navigation
├── Hover effects
└── Optimal spacing

Max Width: 1400px (centered)
```

## Performance Optimizations

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE                                   │
└─────────────────────────────────────────────────────────────────┘

Frontend:
  ├── Lazy loading images
  ├── Optimistic UI updates
  ├── Debounced API calls
  ├── Minimal re-renders
  └── Code splitting (by route)

Backend:
  ├── SQLite for fast reads
  ├── Indexed database queries
  ├── Efficient joins
  └── Minimal data transfer

Network:
  ├── API response caching
  ├── Gzip compression
  └── Keep-alive connections
```

## Security Considerations

```
┌─────────────────────────────────────────────────────────────────┐
│                        SECURITY                                  │
└─────────────────────────────────────────────────────────────────┘

Current (Development):
  ├── CORS enabled for localhost
  ├── Input validation (frontend + backend)
  ├── SQL injection prevention (prepared statements)
  └── XSS prevention (React auto-escaping)

Production Enhancements:
  ├── HTTPS only
  ├── Rate limiting
  ├── Authentication (JWT)
  ├── CSRF protection
  ├── Content Security Policy
  └── Environment variables for secrets
```

## Deployment Flow (Future)

```
┌─────────────────────────────────────────────────────────────────┐
│                      DEPLOYMENT                                  │
└─────────────────────────────────────────────────────────────────┘

Local Development
   │
   ├── git push origin main
   │
   ▼
GitHub Repository
   │
   ├── Trigger CI/CD
   │
   ▼
Build Process
   │
   ├── npm install
   ├── npm run build
   ├── Run tests
   │
   ▼
Deploy to Platform
   │
   ├── Backend → Railway/Heroku
   ├── Frontend → Vercel/Netlify
   ├── Database → Persistent storage
   │
   ▼
Production
   │
   └── Monitor & Maintain
```

---

This flow diagram helps visualize how all the pieces work together! 🎯

