import { useState, useEffect } from 'react'
import Home from './components/home'
import './App.css'
import Navbar from './components/navbar'
import Weatherdata from './context/weatherData'

function App() {
  
  return (
    <Weatherdata>
        <div>
      <Navbar/>
      <Home />
    </div>
    </Weatherdata>
    
  )
}

export default App
