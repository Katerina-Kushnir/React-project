import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';

export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
