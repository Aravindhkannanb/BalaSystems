import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBAW4-TKVNTnDJI3HGEINxRZ9k1ux2-zLw",
    authDomain: "bala-consultancy.firebaseapp.com",
    projectId: "bala-consultancy",
    storageBucket: "bala-consultancy.appspot.com",
    messagingSenderId: "863250581349",
    appId: "1:863250581349:web:0b533d75a3e77d98da838c",
    measurementId: "G-G7XJ7CX89E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth=getAuth(app);

export { db, storage,auth };