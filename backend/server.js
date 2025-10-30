const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 5000;
const db = new Database('ecommerce.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /api/products - Get all products
app.get('/api/products', asyncHandler((req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json({
    success: true,
    data: products,
    count: products.length
  });
}));

// GET /api/cart - Get cart items with total
app.get('/api/cart', asyncHandler((req, res) => {
  const userId = req.query.userId || 'default_user';
  
  const cartItems = db.prepare(`
    SELECT 
      cart.id,
      cart.quantity,
      products.id as product_id,
      products.name,
      products.price,
      products.image,
      (products.price * cart.quantity) as subtotal
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `).all(userId);

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({
    success: true,
    data: {
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      count: cartItems.length
    }
  });
}));

// POST /api/cart - Add item to cart
app.post('/api/cart', asyncHandler((req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.body.userId || 'default_user';

  // Validate input
  if (!productId) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    });
  }

  if (quantity < 1) {
    return res.status(400).json({
      success: false,
      error: 'Quantity must be at least 1'
    });
  }

  // Check if product exists
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: 'Product not found'
    });
  }

  // Check if item already in cart
  const existingItem = db.prepare(
    'SELECT * FROM cart WHERE product_id = ? AND user_id = ?'
  ).get(productId, userId);

  if (existingItem) {
    // Update quantity
    const newQuantity = existingItem.quantity + quantity;
    db.prepare('UPDATE cart SET quantity = ? WHERE id = ?').run(newQuantity, existingItem.id);
    
    res.json({
      success: true,
      message: 'Cart updated successfully',
      data: { id: existingItem.id, quantity: newQuantity }
    });
  } else {
    // Insert new item
    const result = db.prepare(
      'INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)'
    ).run(productId, quantity, userId);
    
    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      data: { id: result.lastInsertRowid, quantity }
    });
  }
}));

// PUT /api/cart/:id - Update cart item quantity
app.put('/api/cart/:id', asyncHandler((req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({
      success: false,
      error: 'Quantity must be at least 1'
    });
  }

  const result = db.prepare('UPDATE cart SET quantity = ? WHERE id = ?').run(quantity, id);

  if (result.changes === 0) {
    return res.status(404).json({
      success: false,
      error: 'Cart item not found'
    });
  }

  res.json({
    success: true,
    message: 'Cart item updated successfully'
  });
}));

// DELETE /api/cart/:id - Remove item from cart
app.delete('/api/cart/:id', asyncHandler((req, res) => {
  const { id } = req.params;
  
  const result = db.prepare('DELETE FROM cart WHERE id = ?').run(id);

  if (result.changes === 0) {
    return res.status(404).json({
      success: false,
      error: 'Cart item not found'
    });
  }

  res.json({
    success: true,
    message: 'Item removed from cart'
  });
}));

// POST /api/checkout - Process checkout
app.post('/api/checkout', asyncHandler((req, res) => {
  const { customerName, customerEmail, cartItems, discountCode } = req.body;

  // Validate input
  if (!customerName || !customerEmail) {
    return res.status(400).json({
      success: false,
      error: 'Customer name and email are required'
    });
  }

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Cart is empty'
    });
  }

  // Normalize items to ensure price, quantity, and subtotal are present
  const normalizedItems = cartItems.map((item) => {
    const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
    let price = Number(item.price);

    // If price is missing, try to load from DB using product_id or productId
    if (!price || Number.isNaN(price)) {
      const productId = item.product_id || item.productId;
      if (productId) {
        const product = db.prepare('SELECT name, price FROM products WHERE id = ?').get(productId);
        if (product) {
          price = Number(product.price);
          // backfill name if missing
          if (!item.name) item.name = product.name;
        } else {
          price = 0;
        }
      } else {
        price = 0;
      }
    }

    // Ensure subtotal is computed if not provided
    const subtotal = Number(item.subtotal);
    const computedSubtotal = !Number.isNaN(subtotal) && subtotal > 0 ? subtotal : price * quantity;

    return {
      ...item,
      quantity,
      price,
      subtotal: parseFloat(computedSubtotal.toFixed(2))
    };
  });

  // Calculate totals
  const totalBeforeDiscount = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);

  // Apply coupon (server-trusted rules)
  let discount = 0;
  let appliedDiscountCode = undefined;
  if (typeof discountCode === 'string' && discountCode.trim().toUpperCase() === 'HELLOFOOD') {
    discount = parseFloat((totalBeforeDiscount * 0.25).toFixed(2));
    appliedDiscountCode = 'HELLOFOOD';
  }
  const total = Math.max(0, parseFloat((totalBeforeDiscount - discount).toFixed(2)));

  // Create order
  const result = db.prepare(`
    INSERT INTO orders (customer_name, customer_email, total, items)
    VALUES (?, ?, ?, ?)
  `).run(customerName, customerEmail, total, JSON.stringify(normalizedItems));

  // Clear cart for this user
  const userId = req.body.userId || 'default_user';
  db.prepare('DELETE FROM cart WHERE user_id = ?').run(userId);

  // Generate receipt
  const receipt = {
    orderId: result.lastInsertRowid,
    customerName,
    customerEmail,
    items: normalizedItems,
    totalBeforeDiscount: parseFloat(totalBeforeDiscount.toFixed(2)),
    discount,
    discountCode: appliedDiscountCode,
    total: parseFloat(total.toFixed(2)),
    timestamp: new Date().toISOString(),
    orderNumber: `ORD-${Date.now()}`
  };

  res.json({
    success: true,
    message: 'Order placed successfully',
    data: receipt
  });
}));

// GET /api/orders - Get all orders (bonus endpoint)
app.get('/api/orders', asyncHandler((req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  
  const formattedOrders = orders.map(order => ({
    ...order,
    items: JSON.parse(order.items)
  }));

  res.json({
    success: true,
    data: formattedOrders
  });
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🛒 Cart API: http://localhost:${PORT}/api/cart`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  console.log('\n👋 Database connection closed');
  process.exit(0);
});

