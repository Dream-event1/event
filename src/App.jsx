import { useState } from 'react'

import './App.css'
import MainPage from './pages/Mainpage'
import CategoryPage from './pages/Category.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
