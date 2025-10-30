# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Backend Dependencies

Open terminal in the `backend` folder:

```bash
cd backend
npm install
```

### 2. Initialize the Database

While in the `backend` folder:

```bash
npm run init-db
```

You should see: "Database initialized successfully! Inserted 10 products"

### 3. Start the Backend Server

```bash
npm start
```

The server will run on http://localhost:5000

### 4. Install Frontend Dependencies

Open a **NEW terminal** window/tab, navigate to the `frontend` folder:

```bash
cd frontend
npm install
```

### 5. Start the Frontend Development Server

While in the `frontend` folder:

```bash
npm run dev
```

The app will open at http://localhost:3000

### 6. Access the Application

Open your browser and go to: **http://localhost:3000**

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend:** Edit `backend/server.js` and change the PORT value
**Frontend:** Edit `frontend/vite.config.js` and change the port value

### Database Errors

If you encounter database errors, delete `backend/ecommerce.db` and run:

```bash
cd backend
npm run init-db
```

### Module Not Found

Make sure you ran `npm install` in both `backend` and `frontend` directories.

### API Connection Issues

1. Make sure the backend server is running on port 5000
2. Check that `frontend/src/services/api.js` has the correct API URL
3. Check browser console for CORS errors

## Testing the Application

1. **Browse Products**: View the product grid on the home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart icon in the navbar
4. **Update Quantity**: Use +/- buttons in cart
5. **Remove Items**: Click the trash icon
6. **Checkout**: Click "Proceed to Checkout"
7. **Complete Order**: Fill in name/email and submit
8. **View Receipt**: See order confirmation

## Development Tips

- Backend runs on port 5000, frontend on port 3000
- Vite proxy forwards `/api` requests to the backend
- Use Ctrl+C to stop either server
- Changes to backend require server restart
- Frontend hot-reloads automatically
- Check browser DevTools console for errors
- Use nodemon for auto-restart: `npm run dev` in backend

## Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run init-db      # Initialize database
npm start            # Start server
npm run dev          # Start with auto-reload

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## System Requirements

- Node.js 16 or higher
- npm 7 or higher
- Modern browser (Chrome, Firefox, Safari, Edge)
- 100MB free disk space

## Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [Vite Documentation](https://vitejs.dev)
- [Better-SQLite3 Documentation](https://github.com/WiseLibs/better-sqlite3)

