import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Switch from '@mui/material/Switch';

export const ThemeContext = React.createContext('light');

export const App = () => {

  const themeModeHasChanged = useCallback((event) => {
    console.log('event:', event.target.checked)
    setCurrentTheme(event.target.checked ? 'light' : 'dark')
  }, [])
  const [currentTheme, setCurrentTheme] = useState("light");

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div id={currentTheme} >
        <nav>
          <Switch defaultChecked onChange={themeModeHasChanged} />
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}
