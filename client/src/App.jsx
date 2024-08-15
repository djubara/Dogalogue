import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogFeed from './pages/DogFeed';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
 
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className = "content">
        <Routes>
          <Route path = "/" element = {<DogFeed/>}/>`
          <Route path = "/profile" element = {<Profile/>}/>`
          <Route path = "/register" element = {<Register/>}/>`
        </Routes>
      </div>
      <Footer/>
    </div>
    </Router>
  )
}

export default App
