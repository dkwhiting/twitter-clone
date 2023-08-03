import { createContext } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import {doc, setDoc, getDoc } from "firebase/firestore"



export const loginUser = async ( email, password ) => {
  const response = await signInWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    const user = userCredential.user
    const userData = await fetchUserData(user.uid)
    console.log('userData', userData)
    return userData
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      errorMessage,
      errorCode
    }
  });
  return response
}

export const registerUser = async ( email, username, password ) => {
  // Create new user
  const response = await createUserWithEmailAndPassword(auth, email, password)
  .then( async (userCredential) => {
    const user = userCredential.user
    // Add a new document in collection "users"
    setDoc(doc(db, "users", user.uid), {
      userId: user.uid,
      username: username,
      likes: [],
      receivedRequests: [],
      sentRequests: []
    }); 
    const userData = await fetchUserData(user.uid)
    return userData
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      errorMessage,
      errorCode
    }
  });
  return response
}

export const fetchUserData = async (userId) => {
  // Fetch and return user data from collection "users"
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("User data does not exist");
  }
}

export const initializeUser = async () => {
  const userId = JSON.parse(window.localStorage.getItem('userId'))
  console.log(userId)
  if (userId) {
    const userData = await fetchUserData(userId)
    if (userData) {
      console.log(userData)
      return userData
    }
  }
  return null
}

const authContext = createContext({
  user: initializeUser(),
  setUser: (user) => {}
});

export default authContext;