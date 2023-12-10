// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVYTFsI5lJGrGKzuTJseNj-UVbH6sLrw4",
  authDomain: "carpool-b859f.firebaseapp.com",
  projectId: "carpool-b859f",
  storageBucket: "carpool-b859f.appspot.com",
  messagingSenderId: "871074400711",
  appId: "1:871074400711:web:c7a36930e151b01b32b1e2",
  measurementId: "G-QXRHZ3DZ0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function handleAuth(func, email, password){
  try{
    return await func(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("carpool_driver_uid", user.uid);
      return user;
    })
    .catch((error) => error.message);
  }catch(exception){
    return exception.message;
  }
}

export async function SignUp(email, password) {
  return await handleAuth(createUserWithEmailAndPassword, email, password);
}

export async function LogIn(email, password) {
  return await handleAuth(signInWithEmailAndPassword, email, password);
}

export function LogOut(){
  localStorage.removeItem("carpool_driver_uid");
}

export function getUID(){
  const uid = localStorage.getItem("carpool_driver_uid");
  return uid;
}