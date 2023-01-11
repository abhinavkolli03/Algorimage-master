import React from 'react'
import './App.css'
import Navbar from "./components/Navbar.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/homepage.js'
import Pathfinder from './components/Pathfinder.js'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Pathfinder/>} />
        <Route path='/pathfinder' element={<Pathfinder />} />
        <Route path='/search-and-sort' element={<HomePage/>} />
        <Route path='/tree-traversal' element={<HomePage/>} />
        <Route path='/other-ai' element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App
