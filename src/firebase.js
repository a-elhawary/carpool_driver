// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVYTFsI5lJGrGKzuTJseNj-UVbH6sLrw4",
  authDomain: "carpool-b859f.firebaseapp.com",
  projectId: "carpool-b859f",
  storageBucket: "carpool-b859f.appspot.com",
  messagingSenderId: "871074400711",
  appId: "1:871074400711:web:c7a36930e151b01b32b1e2",
  measurementId: "G-QXRHZ3DZ0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);