import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchWeatherByName = createAsyncThunk(
    'http://api.weatherapi.com/v1/current.json?key=80d44e00963f477ca92155142220108&q=London',
    async function (city) {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=80d44e00963f477ca92155142220108&q=${city}&days=3`);

            const data = await response.json();

            return data;
        } catch (error) {
            console.log("Error", error);
        }
    }
)

const weatherApi = createSlice({
    name: "weatherapi",
    initialState: {
        cityWeather: [],
    },
    reducers: {},
    extraReducers: {
        [fetchWeatherByName.fulfilled]: (state, action) => {
            console.log("Payload", action.payload);
            state.cityWeather = action.payload;
        },
    },
})



export const { } = weatherApi.actions
export default weatherApi.reducer
