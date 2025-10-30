import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Products
export const getProducts = () => api.get('/products');

// Cart
export const getCart = () => api.get('/cart');

export const addToCart = (productId, quantity = 1) => 
  api.post('/cart', { productId, quantity });

export const updateCartItem = (id, quantity) =>
  api.put(`/cart/${id}`, { quantity });

export const removeFromCart = (id) => api.delete(`/cart/${id}`);

// Checkout
export const checkout = (customerName, customerEmail, cartItems, discountCode) =>
  api.post('/checkout', { customerName, customerEmail, cartItems, discountCode });

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;

