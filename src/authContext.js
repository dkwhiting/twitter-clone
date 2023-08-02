import { createContext } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import {doc, setDoc } from "firebase/firestore"




export const initializeUser = () => {
  const storedUser = JSON.parse(window.localStorage.getItem('user'))
  if (storedUser) {
    return storedUser
  }
  return null
}

export const loginUser = async ( email, password ) => {
  const response = await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    return userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      errorMessage,
      errorCode
    }
  });
  console.log(response)
  return response
}


export const registerUser = async ( email, username, password ) => {
  const response = await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    return userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      errorMessage,
      errorCode
    }
  });
  console.log(response)
  return response
}

const authContext = createContext({
  user: initializeUser(),
  setUser: (user) => {}
});

export default authContext;