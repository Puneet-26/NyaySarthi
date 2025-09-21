'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// IMPORTANT: This is a public configuration and is safe to expose.
// Security is handled by Firebase Security Rules and App Check.
const firebaseConfig = {
  apiKey: 'AIzaSyDw9M3mco4SwCwPfcZssoqaIFJggI18PGQ',
  authDomain: 'legali-39226.firebaseapp.com',
  projectId: 'legali-39226',
  storageBucket: 'legali-39226.appspot.com',
  messagingSenderId: '472283993425',
  appId: '1:472283993425:web:a96be3362a3f7491d9d936',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
