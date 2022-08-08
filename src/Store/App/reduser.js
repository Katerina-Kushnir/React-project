import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchWeatherByName = createAsyncThunk(
    'http://api.weatherapi.com/v1/current.json',
    async function (city) {
        try {

            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cdaa531bf2msh3a74fc950af8a77p1387b9jsn048eff83de29',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                }
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.log("Error", error);
        }
    }
)

export const fetchSport = createAsyncThunk(
    'https://weatherapi-com.p.rapidapi.com/sports.json',
    async function (city) {
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/sports.json?q=London`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cdaa531bf2msh3a74fc950af8a77p1387b9jsn048eff83de29',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                }
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.log("Error sport", error);
        }
    }
)

export const fetchAutocomplete = createAsyncThunk(
    'https://weatherapi-com.p.rapidapi.com/search.json',
    async function (searchCity) {
        try {

            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${searchCity}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cdaa531bf2msh3a74fc950af8a77p1387b9jsn048eff83de29',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                }
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.log("Search city Error", error);
        }
    }
)

export const fetchHistoryWeather = createAsyncThunk(
    'https://weatherapi-com.p.rapidapi.com/history.json',
    async function (date) {
        try {

            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=London&dt=${date}&lang=en`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cdaa531bf2msh3a74fc950af8a77p1387b9jsn048eff83de29',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                }
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.log("History Weather Error", error);
        }
    }
)

const weatherApi = createSlice({
    name: "weatherapi",
    initialState: {
        cityWeather: [],
        sports: [],
        autocompleteCity: [],
        getHistoryWeather: [],
        status: null,
    },
    reducers: {},
    extraReducers: {
        [fetchWeatherByName.fulfilled]: (state, action) => {
            console.log("Payload", action.payload);
            state.cityWeather = action.payload;
        },
        [fetchSport.fulfilled]: (state, action) => {
            console.log("Sport payload", action.payload);
            state.sports = action.payload;
        },
        [fetchAutocomplete.fulfilled]: (state, action) => {
            console.log("Autocomplete payload", action.payload);
            state.autocompleteCity = action.payload;
        },
        [fetchHistoryWeather.fulfilled]: (state, action) => {
            console.log("History weather payload", action.payload);
            state.getHistoryWeather = action.payload;
        }
    },
})



export const { } = weatherApi.actions
export default weatherApi.reducer




