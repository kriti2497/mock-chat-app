// Import the functions you need from the SDKs you need

import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlP7_7A7FUHvtU_JAOwYuDwVujC_rYI-M',
  authDomain: 'my-chat-app-957a1.firebaseapp.com',
  projectId: 'my-chat-app-957a1',
  storageBucket: 'my-chat-app-957a1.appspot.com',
  messagingSenderId: '55792434817',
  appId: '1:55792434817:web:b8384845ea064eac345780',
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export const db = app.firestore();
