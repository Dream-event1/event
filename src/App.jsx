import { useState } from 'react'

import './App.css'
import MainPage from './pages/Mainpage'
import CategoryPage from './pages/Category.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel.jsx';
import About from './pages/About.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
         <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
