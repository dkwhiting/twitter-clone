import React, { useEffect, useState } from 'react'

import './App.css'
import LoginForm from './LoginForm'
import authContext from './authContext'

function App() {
  const [user, setUser] = useState({})

  console.log(user)

  return (
    <>
      <authContext.Provider value={{ user, setUser }}>
        <div className="bg-slate-200 flex flex-col w-full h-full items-center justify-center">
          <LoginForm />
        </div>
      </authContext.Provider>
    </>
  )
}

export default App