# Deployment Guide

This guide covers deploying the Vibe Commerce application to various platforms.

## Prerequisites

- Node.js 16+
- Git repository
- Platform account (Vercel, Netlify, Heroku, etc.)

## Option 1: Vercel (Recommended for Frontend)

### Frontend Deployment

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend API URL
6. Deploy

### Backend Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to backend: `cd backend`
3. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```
4. Deploy: `vercel`

## Option 2: Netlify (Frontend)

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. New site from Git
4. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend API URL
6. Deploy

## Option 3: Heroku (Full Stack)

### Backend

1. Install Heroku CLI
2. Create `Procfile` in backend:
```
web: node server.js
```
3. Deploy:
```bash
cd backend
heroku create your-app-name-backend
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Frontend

Update API URL in frontend, then deploy similarly or use static hosting.

## Option 4: Railway

1. Push to GitHub
2. Go to [Railway](https://railway.app)
3. New Project → Deploy from GitHub
4. Select repository
5. Add environment variables
6. Deploy

## Option 5: DigitalOcean App Platform

1. Push to GitHub
2. Go to DigitalOcean
3. Create App → GitHub
4. Configure both frontend and backend
5. Deploy

## Database Considerations

### SQLite in Production

For production, consider:
- Persistent volume for SQLite file
- Or migrate to PostgreSQL/MySQL
- Railway/Heroku offer PostgreSQL add-ons

### Migrate to PostgreSQL

If needed, install `pg` and update database code:

```bash
npm install pg
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 5000)
- `DATABASE_URL`: Database connection string
- `NODE_ENV`: production

### Frontend
- `VITE_API_URL`: Backend API URL

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend can connect to backend
- [ ] Database is initialized with products
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] SSL/HTTPS is enabled
- [ ] Error logging is configured
- [ ] Performance is acceptable

## Custom Domain

### Vercel/Netlify
1. Go to domain settings
2. Add custom domain
3. Update DNS records

## Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:
- Push to `main` branch → automatic deployment
- Pull requests → preview deployments

## Troubleshooting

### CORS Issues
Ensure backend CORS is configured for your frontend domain

### Database Issues
Check if database file is persisted between deployments

### Build Failures
Check build logs for missing dependencies or errors

### API Connection
Verify VITE_API_URL is correctly set and accessible

