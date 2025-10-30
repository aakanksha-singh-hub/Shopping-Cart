# Quick Start

Get the app running in 3 minutes!

## Prerequisites
- Node.js 16+ installed
- Terminal/Command Prompt

## Steps

### Step 1: Backend (Terminal 1)
```bash
cd backend
npm install
npm run init-db
npm start
```
Backend running on http://localhost:5000

### Step 2: Frontend (Terminal 2 - New Window)
```bash
cd frontend
npm install
npm run dev
```
Frontend running on http://localhost:3000

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

## That's it!

You should see:
- Product grid with 10 items
- Navbar with cart icon
- Fully functional shopping experience

## Quick Test Flow

1. Click "Add to Cart" on a few products
2. See cart badge update
3. Click cart icon
4. Adjust quantities
5. Click "Proceed to Checkout"
6. Enter name and email
7. Click "Place Order"
8. View your receipt!

## Troubleshooting

**Port in use?**
```bash
# Change ports in:
# Backend: server.js (line 5)
# Frontend: vite.config.js (line 6)
```

**Database errors?**
```bash
cd backend
rm ecommerce.db
npm run init-db
```

**Still stuck?**
See `setup.md` for detailed instructions.

---

**Need help?** Check out the full README.md

