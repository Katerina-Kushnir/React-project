import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import weatherApi from "./App/reduser";

export const reducerCombine = combineReducers({
    weather: weatherApi,
})

const store = configureStore({ reducer: reducerCombine});

export default store;
