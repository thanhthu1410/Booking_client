import { initializeApp } from "firebase/app";

/* Google Auth */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDaHIqrs-R5ZZdKWWL2reT_DDwqOZUEWjY",
  authDomain: "booking-c7660.firebaseapp.com",
  projectId: "booking-c7660",
  storageBucket: "booking-c7660.appspot.com",
  messagingSenderId: "367356755516",
  appId: "1:367356755516:web:effcf93090f4cd065c0d39",
  measurementId: "G-CKXGZNMSR6"
};

const app = initializeApp(firebaseConfig);

/* google auth import */
const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
  let auth = getAuth(app)
  return await signInWithPopup(auth, googleProvider)

}
