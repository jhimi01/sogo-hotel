// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7aGQsQHtjFdztkWnaDI5GlraoAYQvIA8",
  authDomain: "sogo-hotel.firebaseapp.com",
  projectId: "sogo-hotel",
  storageBucket: "sogo-hotel.appspot.com",
  messagingSenderId: "743292719890",
  appId: "1:743292719890:web:eb57c09afe47376f2859cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;