import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNkS5-UvSqjI_UyUrQUFvVqBz8DE9ChOs",
  authDomain: "miniblog-7816d.firebaseapp.com",
  projectId: "miniblog-7816d",
  storageBucket: "miniblog-7816d.appspot.com",
  messagingSenderId: "1038522377209",
  appId: "1:1038522377209:web:86bd1705e4e812c8c9d328"
};

const app = initializeApp(firebaseConfig);

const db = getFireStore(app)

export {db};