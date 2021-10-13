// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwvAoKLlLKUmCgyXxBzgAbrnwCndFuV40",
  authDomain: "quizhalloweenframpeguille.firebaseapp.com",
  projectId: "quizhalloweenframpeguille",
  storageBucket: "quizhalloweenframpeguille.appspot.com",
  messagingSenderId: "90877128520",
  appId: "1:90877128520:web:ee3c5cf3c12b6132fa8d7d",
  measurementId: "G-H4NRVL005G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);