import React from 'react';
import { AppRouter } from './Components/AppRouter';
import { useSelector } from 'react-redux';
import { isRegistered } from './Store/App/selector';
import { RegistrationRouter } from './Components/Registration';
import './App.css';

export const App = () => {
  const isUserRegistered = useSelector(isRegistered);
  return (
    isUserRegistered ? <AppRouter /> : <RegistrationRouter />
  );
}

