import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import BookNote from './pages/BookNote';
import CreateBook from "./pages/CreateBook";
import UpdateBook from './pages/UpdateBook';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/booknote' element={<BookNote/>}/>
        <Route path='/creatbook' element={<CreateBook/>}/>
        <Route path='/updatebook' element={<UpdateBook/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
