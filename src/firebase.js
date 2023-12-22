// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { doc, updateDoc, getFirestore, collection, query, where, getDocs, addDoc, orderBy, Timestamp, onSnapshot} from 'firebase/firestore';

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
const db = getFirestore(app);

// AUTH FUNCTIONS START

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

// AUTH FUNCTIONS END

// FIRESTORE FUNCTIONS START

export async function addRoute(routeInfo){
  routeInfo.date = Timestamp.fromDate(new Date(routeInfo.date));
  const routesCol = collection(db, "routes");
  return await addDoc(routesCol, routeInfo);
}

export async function getRoutes(){
  const routesCol = collection(db, "routes");
  const q = query(routesCol, where("driver", "==", getUID()), orderBy("date", "desc"));
  const routesSnapshot = await getDocs(q);
  const routesList = routesSnapshot.docs.map((route) => {return {id: route.id, data: route.data()};} );
  return routesList;
}

export function listenForRequests(callback){
  const requestsCol = collection(db, "requests");
  const q = query(requestsCol, where("driver", "==", getUID()), where("status", "==", "pending"));
  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((request) => {return {id: request.id, data: request.data()}});
    callback(requests);
  });
}

export async function changeRequestStatus(request_id, status){
  const requestsCol = collection(db, "requests");
  const docRef = doc(requestsCol, request_id);
  await updateDoc(docRef, {status: status});
  return true;
}

// FIRESTORE FUNCTIONS END