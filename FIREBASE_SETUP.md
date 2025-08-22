# Firebase Setup for CyberRaksha

This guide will walk you through setting up Firebase authentication and Firestore for the CyberRaksha app.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `cyberraksha` (or any name you prefer)
4. Optional: Enable Google Analytics
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable these providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and add your project's domain

## Step 3: Set up Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose one close to your users)
5. Click "Done"

## Step 4: Get Firebase Configuration

1. Go to Project Settings (gear icon in left sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and choose the web icon (</>)
4. Register your app with name: `CyberRaksha`
5. Copy the Firebase configuration object

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 6: Update Firestore Security Rules (Optional)

For better security in production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Go to the landing page
3. Click "Start Your Journey"
4. Try signing up with email or Google
5. Complete the profile setup
6. Verify that the user data appears in Firestore

## Authentication Flow

Here's how the new Firebase authentication flow works:

1. **Landing Page**: User clicks "Start Your Journey" → AuthModal opens
2. **Sign Up/Sign In**: User creates account or signs in with email/Google
3. **Profile Setup**: If user needs to complete profile (especially Google users), they're redirected to profile setup
4. **Dashboard**: Once authenticated with a complete profile, user goes to dashboard

## Features Implemented

✅ **Email/Password Authentication**
✅ **Google Sign-In**
✅ **Profile Storage in Firestore**
✅ **Automatic Profile Setup Flow**
✅ **Session Persistence**
✅ **Logout Functionality**

## Troubleshooting

### Common Issues:

1. **"Firebase not configured"**: Make sure your `.env.local` file has all the required variables
2. **"Auth domain not authorized"**: Add `localhost:5173` to your Firebase Auth domains
3. **Google Sign-In popup blocked**: Make sure popups are allowed in your browser
4. **Firestore permission denied**: Check that your security rules allow the operations

### Development Domains

Make sure to add these to your Firebase Auth domains:
- `localhost:5173` (Vite dev server)
- Your production domain when deploying
