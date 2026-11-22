// KONFIGURASI PUBLIK FIREBASE UNTUK WEB PUSH ABP.
// Isi dari Firebase Console > Project settings > General > Your apps (Web app)
// lalu Firebase Console > Project settings > Cloud Messaging > Web Push certificates.
// File ini boleh berada di GitHub Pages; JANGAN masukkan private key service account di sini.
var ABP_FIREBASE_CONFIG = {
  apiKey: 'ISI_FIREBASE_API_KEY',
  authDomain: 'ISI_PROJECT_ID.firebaseapp.com',
  projectId: 'ISI_PROJECT_ID',
  storageBucket: 'ISI_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'ISI_MESSAGING_SENDER_ID',
  appId: 'ISI_FIREBASE_APP_ID'
};
var ABP_FIREBASE_VAPID_KEY = 'ISI_PUBLIC_VAPID_KEY';
var ABP_MEETING_ROOM_URL = 'ISI_URL_WEB_APP_ABP';
