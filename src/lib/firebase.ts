'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// IMPORTANT: This is a public configuration and is safe to expose.
// Security is handled by Firebase Security Rules and App Check.
const firebaseConfig = {"apiKey":"FIREBASE_API_KEY","authDomain":"FIREBASE_AUTH_DOMAIN","projectId":"FIREBASE_PROJECT_ID","storageBucket":"FIREBASE_STORAGE_BUCKET","messagingSenderId":"FIREBASE_MESSAGING_SENDER_ID","appId":"FIREBASE_APP_ID"};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
