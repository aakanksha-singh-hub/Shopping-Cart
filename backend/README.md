# Vibe Commerce Backend

Node.js/Express REST API with SQLite database.

Note: All numeric amount fields (price, subtotal, total) are in Indian Rupees (INR, ₹).

## Setup

```bash
npm install
npm run init-db
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Checkout
- `POST /api/checkout` - Process order

### Orders (Bonus)
- `GET /api/orders` - Get all orders

## Database

SQLite database with three tables:
- `products` - Product catalog
- `cart` - Shopping cart items
- `orders` - Completed orders

## Environment

- Port: 5000 (configurable)
- Database: ecommerce.db

