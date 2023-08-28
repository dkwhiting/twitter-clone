'use client'
import React, { useEffect, useState } from 'react'
import Login from '../pages/Login'
import authContext from '../pages/authContext'
import { initializeUser } from '../pages/authContext'
import { useRouter } from 'next/navigation'


const App = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  // Initialized user from localStorage on App mount
  useEffect(() => {
    (async () => {
      if (window){
      const initializedUser = await initializeUser();
      setUser(initializedUser)
      console.log('we have window', user)
    }
    })();
    console.log('no window')
  }, [])

  useEffect(()=>{
    if (user) {
      router.push('/home')
    }
  },[user])

  return (
    <>
    {user?.userId}
      <authContext.Provider value={{ user, setUser }}>
        <div className="bg-slate-200 flex flex-col w-full h-full items-center justify-center">
          <Login />
        </div>
      </authContext.Provider>
    </>
  )
}

export default App