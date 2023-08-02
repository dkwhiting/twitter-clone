import React, { useRef, useState, createContext, useContext } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import authContext from './authContext';

const LoginForm = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [login, setLogin] = useState(true)
  const [errorNotif, setErrorNotif] = useState('')
  const {setUser} = useContext(authContext)
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (login){
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Signed in 
          const response = userCredential.user;
          setUser({
            uid: response.uid
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorNotif(errorMessage)
        });
      } else {
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Signed in 
          const response = userCredential.user;
          setUser({
            uid: response.uid
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorNotif(errorMessage)
        });
    }

    emailRef.current.value = ""
    passwordRef.current.value = ""
  }
  
  return (
    <div className="bg-slate-100 flex flex-col justify-center px-10 py-4 rounded-2xl lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      {login
      ? <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      : <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register for an account</h2>
      }
      
    </div>
  
    <div className="flex flex-col items-center mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      {errorNotif
      ? <p className="text-red-500">{errorNotif}</p>
      : null
      }
      
      <form className="w-full space-y-6" onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input ref={emailRef} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  
        {login
          ? <p className="mt-5 text-center text-sm text-gray-500">
            Need an account? <br />
          <a onClick={() => setLogin(!login)} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Click here</a> to sign up
          </p>
          : <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account? <br />
          <a onClick={() => setLogin(!login)} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Click here</a> to login
          </p>
        }
    </div>
  </div>
  )
}

export default LoginForm