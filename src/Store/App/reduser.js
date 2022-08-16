import { createSlice } from '@reduxjs/toolkit'
import { fetchWeatherByName, fetchSport, fetchAutocomplete, fetchHistoryWeather } from './thunks';

const weatherApi = createSlice({
    name: "weatherapi",
    initialState: {
        cityWeather: [],
        sports: [],
        autocompleteCity: [],
        getHistoryWeather: [],
        status: null,
        favoriteCity: []
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
        },
    },
})

export const { } = weatherApi.actions
export default weatherApi.reducer




