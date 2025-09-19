// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // <-- ¡Nueva importación!

// Tu configuración de la aplicación web de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvS7vxeHo8j5tbJ2aOjotH8ULlyEgl_-Q",
  authDomain: "react-js-b2dab.firebaseapp.com",
  projectId: "react-js-b2dab",
  storageBucket: "react-js-b2dab.firebasestorage.app",
  messagingSenderId: "214651122785",
  appId: "1:214651122785:web:37fcdc33f023acaf2c2620",
  measurementId: "G-PVZXQP9DLX"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Cloud Firestore y exporta la referencia
export const db = getFirestore(app); // <-- ¡Nueva línea de código!
