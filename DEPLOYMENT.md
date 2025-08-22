# Vercel Deployment Guide for CyberRaksha

This guide will walk you through deploying the CyberRaksha application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your repository should be on GitHub
3. **Environment Variables**: Have your Firebase and database credentials ready

## 🚀 Quick Deployment

### Option 1: Deploy Button (Recommended for first-time deployment)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdripston%2FCyberRaksha)

### Option 2: Manual Deployment via Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your `CyberRaksha` repository from GitHub
   - Vercel will automatically detect the framework settings

2. **Configure Build Settings** (Should be auto-detected)
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave blank)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`

3. **Environment Variables**
   
   Add these environment variables in the Vercel dashboard:
   
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your_app_id
   DATABASE_URL=your_neon_database_url
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

### Option 3: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## 🔧 Configuration Details

### Build Configuration

The project uses a custom `vercel.json` configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "dist/public/$1"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public"
}
```

This configuration:
- Builds the React frontend with Vite
- Compiles the Express.js backend for serverless functions
- Routes API calls to the backend
- Serves static files from the frontend

### Environment Variables Setup

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add each variable with its value
   - Make sure to add them for all environments (Production, Preview, Development)

2. **Required Variables:**
   - `VITE_FIREBASE_API_KEY` - Your Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID` - Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID` - Your Firebase app ID
   - `DATABASE_URL` - Your Neon database connection string

## 🔒 Post-Deployment Configuration

### 1. Update Firebase Authentication Domains

After deployment, add your Vercel domain to Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to Authentication > Settings > Authorized domains
4. Add your Vercel domain (e.g., `your-app-name.vercel.app`)

### 2. Database Migration

If this is your first deployment, push your database schema:

```bash
# Using your local environment with DATABASE_URL set to production
npm run db:push
```

### 3. Test Your Deployment

1. Visit your deployed application
2. Test user registration and login
3. Verify that the database is working correctly
4. Check that all API routes are functioning

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all environment variables are set
   - Verify Node.js version compatibility
   - Check for TypeScript errors: `npm run check`

2. **Authentication Not Working**
   - Ensure Firebase domains are updated
   - Verify all Firebase environment variables are correct
   - Check browser console for CORS errors

3. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Ensure database schema is deployed
   - Check Neon database connection limits

4. **API Routes Not Working**
   - Verify vercel.json routing configuration
   - Check serverless function logs in Vercel dashboard
   - Ensure backend dependencies are in `dependencies`, not `devDependencies`

### Debug Commands

```bash
# Check build locally
npm run build

# Verify TypeScript
npm run check

# Test production build locally
npm start
```

### Vercel CLI Debugging

```bash
# View deployment logs
vercel logs

# Check project info
vercel project

# List deployments
vercel list
```

## 📊 Performance Optimization

### Automatic Optimizations

Vercel automatically provides:
- Global CDN
- Image optimization
- Automatic compression
- Edge functions for better performance

### Manual Optimizations

1. **Code Splitting**: The build warning mentions large chunks. Consider implementing:
   ```typescript
   // Example: Lazy load pages
   const Dashboard = lazy(() => import('./pages/dashboard'));
   const Course = lazy(() => import('./pages/course'));
   ```

2. **Environment-specific Builds**:
   - Development builds include debugging tools
   - Production builds are optimized and minified

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to your main branch. To set up automatic deployments:

1. Connect your GitHub repository to Vercel
2. Enable automatic deployments in project settings
3. Every push to `main` will trigger a new deployment
4. Pull requests will get preview deployments

## 📈 Monitoring

Monitor your application:
1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Check function logs in Vercel dashboard
3. **Performance**: Use Vercel Web Analytics

---

## 🎉 Success!

Your CyberRaksha application should now be live on Vercel! 

**Next Steps:**
1. Test all functionality
2. Set up monitoring and alerts
3. Configure your custom domain (optional)
4. Set up analytics tracking

**Need Help?**
- Check [Vercel Documentation](https://vercel.com/docs)
- Open an issue on the [GitHub repository](https://github.com/dripston/CyberRaksha/issues)
