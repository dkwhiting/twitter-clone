
import React, { useRef, useState, createContext, useContext } from 'react'
import authContext from './authContext';
import { loginUser, registerUser } from './authContext';
import '../app/globals.css'

const Login = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const usernameRef = useRef('')
  const [login, setLogin] = useState(true)
  const [notif, setNotif] = useState('')
  const {setUser} = useContext(authContext)
  const {user} = useContext(authContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    let response
    if (login){
      response = await loginUser(emailRef.current.value, passwordRef.current.value)
      } else {
      response = await registerUser(emailRef.current.value, usernameRef.current.value, passwordRef.current.value)
    }
    if (response.userId){
      console.log(response)
      setUser(response)
      localStorage.setItem('userId', JSON.stringify(response.userId)
      )
      setNotif("Login Successful")
    } else if (response.errorMessage){
      setNotif(response.errorMessage)
    }
    emailRef.current.value = ""
    usernameRef.current.value = ""
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
      {notif
      ? <p className="mb-3 text-red-500">{notif}</p>
      : null
      }
      
      <form className="w-full space-y-6" onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input ref={emailRef} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        {!login
        ? <div>
          <div className="flex items-center justify-between">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          </div>
          <div className="mt-2">
            <input ref={usernameRef} id="username" name="username" type="username" autoComplete="current-username" required className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        : null
        }
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              {login
                ? <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                : null
              }
            </div>
          </div>
          <div className="mt-2">
            <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

export default Login