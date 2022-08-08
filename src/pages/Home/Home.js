import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { weatherSelector } from "../../Store/App/selector";
import { fetchSport, fetchWeatherByName, fetchAutocomplete, fetchHistoryWeather } from "../../Store/App/reduser";
import moment from "moment";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getWeather = useSelector(weatherSelector);
    const [city, setCity] = useState("");
    const [degree, setDegree] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [favoriteCity, setFavoriteCity] = useState("");
    const [favoriteSport, setFavoriteSport] = useState([]);
    const [deleteSport, setDeleteSport] = useState([]);
    const [selectedCity, setSelectedCity] = useState(false);
    const [weatherHourly, setWeatherHourly] = useState("");
    const [historyDate, setHistoryDate] = useState("");

    const logoutBtn = () => {
        localStorage.clear();
        navigate('/');
    }
    const getCity = (event) => {
        setCity(event.target.value);
    }
    const getCityWeather = () => {
        dispatch(fetchWeatherByName(city));
    }
    const degrees = (event) => {
        setDegree(event.target.value);
    }
    const windSpeedy = (event) => {
        setWindSpeed(event.target.value);
    }
    const pressures = (event) => {
        setPressure(event.target.value);
    }
    const stop = (event) => {
        event.stopPropagation();
    }
    const getFavoriteCity = (event) => {
        setFavoriteCity(event.target.value);
        if (event.target.value.length > 2) {
            setSelectedCity(true);
        }
    }
    const addCity = () => {
        dispatch(fetchWeatherByName(favoriteCity));
        console.log("Status", getWeather.status);
    }
    const addFavoriteSport = (tournament) => {
        console.log("Sport favorite", tournament);
        setFavoriteSport([...favoriteSport, tournament]);
        console.log("Favorite:", favoriteSport);
    }
    const deleteFavoriteSport = (tournament) => {
        console.log("delete sport", tournament);
        setDeleteSport([...deleteSport, tournament]);
    }
    const getCityAutocomplete = (event) => {
        dispatch(fetchWeatherByName(event.target.textContent));
        dispatch(fetchSport(event.target.textContent));
        setSelectedCity(false);
    }
    const getWeatherHourly = (index) => {
        console.log("weather by houers:", getWeather.cityWeather.forecast?.forecastday[index].hour);
        setWeatherHourly(getWeather.cityWeather.forecast.forecastday[index].hour);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);   //MUI
    const open = Boolean(anchorEl);     //MUI
    const handleClick = (event) => { event.stopPropagation(); setAnchorEl(event.currentTarget); };   //MUI
    const handleClose = (event) => { event.stopPropagation(); setAnchorEl(null); };   //MUI
    const [openModal, setOpenModal] = React.useState(false);    //MUI
    const handleOpenModal = (event) => { event.stopPropagation(); setOpenModal(true) };    //MUI
    const handleCloseModal = (event) => { event.stopPropagation(); setOpenModal(false) };  //MUI
    const [value, setValue] = React.useState(new Date('2022-08-06T21:11:54'));  //MUI
    const handleChangeCalendar = (newValue) => {
        setValue(newValue);
        console.log("Calendar:", newValue)
        const rightFormatDate = moment(newValue).format().split("T")[0];
        console.log("Moment", rightFormatDate);
        dispatch(fetchHistoryWeather(rightFormatDate));
        console.log("Show history", getWeather.getHistoryWeather);
    };     //MUI

    useEffect(() => {
        setDegree("C");
    }, [])

    useEffect(() => {
        setWindSpeed("mph");
    }, [])

    useEffect(() => {
        setPressure("mb");
    }, [])

    useEffect(() => {
        dispatch(fetchWeatherByName("London"));
    }, [dispatch])

    useEffect(() => {
        console.log("Data", getWeather.cityWeather);
    })

    useEffect(() => {
        dispatch(fetchSport());
    }, [dispatch])

    useEffect(() => {
        console.log("Sport", getWeather.sports);
    })

    useEffect(() => {
        dispatch(fetchAutocomplete("Lon"));
    }, [dispatch])

    useEffect(() => {
        console.log("Autocomplete", getWeather.sports);
    })

    useEffect(() => {
        dispatch(fetchAutocomplete(favoriteCity));
        console.log("Effect city autocomplete", getWeather.autocompleteCity);
    }, [favoriteCity])

    useEffect(() => {
        dispatch(fetchHistoryWeather("2022-08-01"));
    }, [dispatch])


    return (
        <div className="homePage">
            <div className="homePageBg"></div>
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                    <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={handleOpenModal}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Temperature</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onClick={(e) => stop(e)}
                                        onChange={(e) => degrees(e)}
                                    >
                                        <FormControlLabel value="F" control={<Radio />} label="degree Fahrenheit" />
                                        <FormControlLabel value="C" control={<Radio />} label="degree Celsius" />
                                    </RadioGroup>

                                    <FormLabel id="demo-radio-buttons-group-label2">Wind speed</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label2"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onClick={(e) => stop(e)}
                                        onChange={(e) => windSpeedy(e)}
                                    >
                                        <FormControlLabel value="kph" control={<Radio />} label="wind speed in kmh" />
                                        <FormControlLabel value="mph" control={<Radio />} label="wind speed in mph" />
                                    </RadioGroup>

                                    <FormLabel id="demo-radio-buttons-group-label3">Atmospheric pressure</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label3"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        onClick={(e) => stop(e)}
                                        onChange={(e) => pressures(e)}
                                    >
                                        <FormControlLabel value="mb" control={<Radio />} label="pressure mb" />
                                        <FormControlLabel value="in" control={<Radio />} label="pressure in" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Modal>
                    </MenuItem>

                    <MenuItem onClick={() => logoutBtn()}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

                <div className="homeTop">
                    <div className="search-city">
                        <TextField id="outlined-basic" onChange={(e) => getFavoriteCity(e)} label="Search city" variant="outlined" size="small" />
                        <Button variant="text" onClick={() => addCity()}>Search city</Button>
                        {
                            selectedCity ? <div className="auto-city">
                                {
                                    Array.isArray(getWeather?.autocompleteCity) ? getWeather?.autocompleteCity?.map((city, index) => (
                                        <p key={index} onClick={(e) => getCityAutocomplete(e)} >{city.name.startsWith(favoriteCity) ? city.name : ""}</p>
                                    )) : ""
                                }
                            </div> : ""
                        }
                    </div>

                    <div className="calendar">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="yyyy-MM-dd"
                                    value={value}
                                    onChange={handleChangeCalendar}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                </div>


                <div className="home-content">
                    <div className="home-content-left">
                        <div className="home-content-favorite-city">
                            <p className="variant-city">Selected city: {getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.name : ""}, {getWeather.cityWeather.error ? "Country not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.country : ""}</p>
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addCity(getWeather.cityWeather)} />
                        </div>
                        
                        <div className="myFavoriteCity">
                            <p>My favorite city:</p>
                        </div>
                        <div className="home-content-left-top">

                            <div className="weather-day">
                                <div className="weather-data">
                                    <p className="weather-data-time">{getWeather ? getWeather.cityWeather.location?.localtime : ""}</p>
                                </div>
                                <div className="weather-data">
                                    <p className="weather-data-city">{getWeather ? getWeather.cityWeather.location?.name : ""}</p>
                                </div>
                                <div className="weather-data-flex">
                                    <p className="weather-data-temp">
                                        {(degree === "F") ? getWeather.cityWeather.current?.temp_f : ""}
                                        {(degree === "C") ? getWeather.cityWeather.current?.temp_c : ""}
                                        <span>&deg;</span>
                                    </p>
                                    <p className="weather-data-icon">
                                        <img src={getWeather.cityWeather.current?.condition.icon} />
                                        <span>{getWeather.cityWeather.current?.condition.text}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="days">
                                {
                                    getWeather ? getWeather.cityWeather.forecast?.forecastday.map((day, index) => (
                                        <div key={day.date + index} className="one-day" onClick={() => getWeatherHourly(index)}>
                                            <div>{day.date}</div>
                                            <img src={day.day.condition.icon} />
                                            <div className="days-temp">
                                                <div>
                                                    <p>min</p>
                                                    <p>
                                                        {(degree === "F") ? day.day.mintemp_f : ""}
                                                        {(degree === "C") ? day.day.mintemp_c : ""}
                                                        <span>&deg;</span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>max</p>
                                                    <p>
                                                        {(degree === "F") ? day.day.maxtemp_f : ""}
                                                        {(degree === "C") ? day.day.maxtemp_c : ""}
                                                        <span>&deg;</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ""
                                }
                            </div>

                        </div>

                        <div className="waether-hourly">
                            {
                                weatherHourly ? weatherHourly.map((cityTime, i) => (
                                    <div key={(cityTime + i)} className="hour">
                                        <div className="hour-content">{cityTime.time}</div>
                                        <div className="hour-content"><img src={cityTime.condition.icon} /><p>{cityTime.condition.text}</p></div>

                                        <div className="hour-content">
                                            {(degree === "F") ? cityTime.temp_f : ""}
                                            {(degree === "C") ? cityTime.temp_c : ""}
                                            <span>&deg;</span>
                                        </div>
                                        <div className="hour-content">
                                            {(windSpeed === "kph") ? cityTime.wind_kph + " kph" : ""}
                                            {(windSpeed === "mph") ? cityTime.wind_mph + " mph" : ""}
                                        </div>
                                        <div className="hour-content">
                                            {(pressure === "mb") ? cityTime.pressure_mb + " mb" : ""}
                                            {(pressure === "in") ? cityTime.pressure_in + " in" : ""}
                                        </div>

                                    </div>
                                )) : ""
                            }
                        </div>
                    </div>

                    <div className="home-content-right">
                        <div className="tournament">
                            <p className="tournament-p">All sports events in: {getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.name : ""}, {getWeather.cityWeather.error ? "Country not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.country : ""}</p>
                            <div className="tournament-block">
                                <b>Football</b> {getWeather.sports ? getWeather.sports.football?.map((tournament, index) => (
                                    <div className="home-content-right-tournament">
                                        <p key={index}>{tournament.start}</p>
                                        <p key={index}>Stadium: {tournament.stadium}, {tournament.country}</p>
                                        <p key={index}>Tournament: {tournament.tournament}</p>
                                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteSport(tournament.start + ", " + tournament.stadium + ", " + tournament.tournament)} />
                                    </div>
                                )) : ""}

                                <b>Cricket</b> {getWeather.sports ? getWeather.sports.cricket?.map((tournament, index) => (
                                    <div className="home-content-right-tournament">
                                        <p key={index}>{tournament.start}</p>
                                        <p key={index}>Stadium: {tournament.stadium}, {tournament.country}</p>
                                        <p key={index}>Tournament: {tournament.tournament}</p>
                                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteSport(tournament.start + ", " + tournament.stadium + ", " + tournament.tournament)} />
                                    </div>
                                )) : ""}

                                <b>Golf</b> {getWeather.sports ? getWeather.sports.golf?.map((tournament, index) => (
                                    <div className="home-content-right-tournament">
                                        <p key={index}>{tournament.start}</p>
                                        <p key={index}>Stadium: {tournament.stadium}, {tournament.country}</p>
                                        <p key={index}>Tournament: {tournament.tournament}</p>
                                        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={() => addFavoriteSport(tournament.start + ", " + tournament.stadium + ", " + tournament.tournament)} />
                                    </div>
                                )) : "No sports events found"}
                            </div>
                        </div>

                        <div className="favorite-sport-header">
                            <b>My favorite sports:</b>
                        </div>
                        <div className="favorite-sport">
                            {favoriteSport.map(tournament => (
                                <div className="favorite-sport-delete">
                                    <p>{tournament}</p>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon onClick={() => deleteFavoriteSport(tournament)} />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        </div>
    );
}


export default Home;