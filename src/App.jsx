import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencyConverter from './Component/CurrencyConverter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CurrencyConverter/>
    </>
  )
}

export default App
