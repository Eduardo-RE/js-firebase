import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase,  push, ref } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9fuZ4sjOow4lPFEXcI5AJ7B8QA0WKky8",
  authDomain: "programacion-web-caf61.firebaseapp.com",
  projectId: "programacion-web-caf61",
  storageBucket: "programacion-web-caf61.appspot.com",
  messagingSenderId: "607367999374",
  appId: "1:607367999374:web:1688ae8b0aab85cff1fedf",
  measurementId: "G-S0E11NRHSZ",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseapp);

export { firebaseapp, database, push, ref };
