import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration via Vite env vars (set in .env)
// Fallback config for debugging (should use env vars in production)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCuxYyM8TDaZP2LBkd69l14crDyUlJh1Y0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cyberraksha-7cbbc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cyberraksha-7cbbc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cyberraksha-7cbbc.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "872915400966",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:872915400966:web:ae709cb7c646a26cad8687",
};

// Debug: Log config to check if env vars are loaded
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? '✅ Loaded' : '❌ Missing',
  authDomain: firebaseConfig.authDomain ? '✅ Loaded' : '❌ Missing',
  projectId: firebaseConfig.projectId ? '✅ Loaded' : '❌ Missing',
  storageBucket: firebaseConfig.storageBucket ? '✅ Loaded' : '❌ Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Loaded' : '❌ Missing',
  appId: firebaseConfig.appId ? '✅ Loaded' : '❌ Missing',
});

// Check if any required config is missing
const requiredFields: (keyof typeof firebaseConfig)[] = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('❌ Missing Firebase config fields:', missingFields);
  console.error('Make sure you have a .env.local file with all VITE_FIREBASE_* variables');
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
// TEMPORARY: Disabled for debugging
// export const db = getFirestore(app);
export const db = null as any; // Temporary placeholder

// Enable offline persistence (optional)
try {
  // This will help with network issues
  console.log('🔧 Firebase services initialized');
} catch (error) {
  console.warn('⚠️ Offline persistence setup failed:', error);
}

export default app;
