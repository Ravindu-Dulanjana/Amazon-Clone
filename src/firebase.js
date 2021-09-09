import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";






const firebaseConfig = {
    apiKey: "AIzaSyDSVReU-728JeOl1pzpD9YWTPXj0_oIjJs",
    authDomain: "clone-11f60.firebaseapp.com",
    projectId: "clone-11f60",
    storageBucket: "clone-11f60.appspot.com",
    messagingSenderId: "241832407190",
    appId: "1:241832407190:web:ce7b3e12cf40d46ec6d2b7",
    measurementId: "G-HMHSKQ5R5Q"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


export { db, auth };