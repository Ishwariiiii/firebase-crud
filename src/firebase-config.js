import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBvz1eN4nYSXaP1mS_xewDo12TWwQxXQIM",
  authDomain: "project-setup-fb.firebaseapp.com",
  databaseURL: "https://project-setup-fb-default-rtdb.firebaseio.com",
  projectId: "project-setup-fb",
  storageBucket: "project-setup-fb.firebasestorage.app",
  messagingSenderId: "936003463264",
  appId: "1:936003463264:web:e1a0d29d20b1955261fb05",
  measurementId: "G-2NMN9XR079"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}
