import React, { useEffect, useState } from 'react'
import LoginForm from './Login'
import authContext from '../pages/authContext'
import { initializeUser } from '../pages/authContext'


const App = () => {
const [user, setUser] = useState(null)

  // Initialized user from localStorage on App mount
  useEffect(() => {
    (async () => {
      const initializedUser = await initializeUser();
      setUser(initializedUser)
    })();
  }, [])

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