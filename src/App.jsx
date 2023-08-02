import { useState } from 'react'

import './App.css'
import LoginForm from './LoginForm'

function App() {
  const [count, setCount] = useState(0)

 

  return (
    <div className="bg-slate-200 flex flex-col w-full h-full items-center justify-center">
      <LoginForm />
    </div>
  )
}

export default App