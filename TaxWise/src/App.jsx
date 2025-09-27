import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import { Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/Upload' element={<Upload />} />
    </Routes>
  )
}

export default App
