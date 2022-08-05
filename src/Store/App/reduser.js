import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchWeatherByName = createAsyncThunk(
    'http://api.weatherapi.com/v1/current.json?key=80d44e00963f477ca92155142220108&q=London',
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
    'https://weatherapi-com.p.rapidapi.com/sports.json?q=London',
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
            console.log("Search city", error);
        }
    }
)

const weatherApi = createSlice({
    name: "weatherapi",
    initialState: {
        cityWeather: [],
        sports: [],
        autocompleteCity: [],
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
        }
    },
})



export const { } = weatherApi.actions
export default weatherApi.reducer




