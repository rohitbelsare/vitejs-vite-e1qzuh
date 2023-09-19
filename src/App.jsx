import { useState } from 'react'
import './App.css'
import Disperse from './Disperse'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Disperse />
    </>
  )
}

export default App
