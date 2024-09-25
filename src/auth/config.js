
import { initializeApp } from "firebase/app";
import { getFirestore ,collection, addDoc} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCSe_vhoaUv8lKKD6YM15GU3MlrLOdMGPg",
  authDomain: "react-c556a.firebaseapp.com",
  projectId: "react-c556a",
  storageBucket: "react-c556a.appspot.com",
  messagingSenderId: "797046677535",
  appId: "1:797046677535:web:3c5db47f0e94633fb3f52a"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db }