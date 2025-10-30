const Database = require('better-sqlite3');
const db = new Database('ecommerce.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    user_id TEXT DEFAULT 'default_user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert mock products
const products = [
  // Local images placed under frontend/public
  { name: 'Chocolate Cake', price: 299.99, description: 'Freshly baked chocolate cake', image: 'cake.jpeg', category: 'Bakery' },
  { name: 'Capsicum', price: 59.99, description: 'Green bell pepper, per 500g', image: 'capsicum.jpg', category: 'Vegetables' },
  { name: 'Soft Drink', price: 99.99, description: 'Refreshing beverage 1L', image: 'drink.jpg', category: 'Beverages' },
  { name: 'Fresh Fish', price: 249.99, description: 'Daily catch cleaned and cut', image: 'fish.jpg', category: 'Meats & Fish' },
  { name: 'Ladyfinger', price: 39.99, description: 'Okra, per 500g', image: 'ladyfinger.webp', category: 'Vegetables' },
  { name: 'Red Meat', price: 349.99, description: 'Premium quality meat, 1kg', image: 'meat.jpg', category: 'Meats & Fish' },
  { name: 'Tomato', price: 49.99, description: 'Farm fresh tomatoes, per 1kg', image: 'tomato.jpg', category: 'Vegetables' },
  { name: 'Wireless Headphones', price: 79.99, description: 'Premium noise-cancelling wireless headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category: 'Electronics' },
  { name: 'Smart Watch', price: 199.99, description: 'Fitness tracking smartwatch with heart rate monitor', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category: 'Electronics' },
  { name: 'Laptop Backpack', price: 49.99, description: 'Durable backpack with laptop compartment', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', category: 'Accessories' },
  { name: 'USB-C Cable', price: 12.99, description: 'Fast charging USB-C cable (6ft)', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500', category: 'Accessories' },
  { name: 'Portable Charger', price: 39.99, description: '20000mAh portable power bank', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500', category: 'Electronics' },
  { name: 'Bluetooth Speaker', price: 59.99, description: 'Waterproof portable Bluetooth speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', category: 'Electronics' },
  { name: 'Wireless Mouse', price: 24.99, description: 'Ergonomic wireless mouse', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500', category: 'Accessories' },
  { name: 'Mechanical Keyboard', price: 89.99, description: 'RGB mechanical gaming keyboard', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500', category: 'Electronics' },
  { name: 'Phone Case', price: 19.99, description: 'Protective phone case with card holder', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500', category: 'Accessories' },
  { name: 'Screen Protector', price: 9.99, description: 'Tempered glass screen protector', image: 'https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=500', category: 'Accessories' }
];

const insertProduct = db.prepare('INSERT INTO products (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)');

// Clear existing data with FK safety (cart/orders reference products)
db.exec(`
  BEGIN;
  PRAGMA foreign_keys = OFF;
  DELETE FROM cart;
  DELETE FROM orders;
  DELETE FROM products;
  PRAGMA foreign_keys = ON;
  COMMIT;
`);

products.forEach(product => {
  insertProduct.run(product.name, product.price, product.description, product.image, product.category);
});

console.log('Database initialized successfully!');
console.log(`Inserted ${products.length} products`);

db.close();

