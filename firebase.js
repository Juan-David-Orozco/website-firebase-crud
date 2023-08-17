import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJB3HLqc1fpqQ0zqYQBWwSj-kfxrgFy_Y",
  authDomain: "crud-fb9.firebaseapp.com",
  projectId: "crud-fb9",
  storageBucket: "crud-fb9.appspot.com",
  messagingSenderId: "580956242851",
  appId: "1:580956242851:web:f49fe9e908783243fb5016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const saveTask = async (title, description) =>
  await addDoc(collection(db, 'tasks'), {title, description})

export const getTasks = async () =>
  await getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => 
  onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = (id) => {
  deleteDoc(doc(db, 'tasks', id))
}

export const getTask = async (id) => {
  return await getDoc(doc(db, 'tasks', id))
}

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, 'tasks', id), newFields)