import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sngm from "./sngm.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Sngm></Sngm>
    </>
  )
}

export default App
