import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { weatherSelector } from "../../Store/App/selector";
import { fetchSport, fetchWeatherByName, fetchAutocomplete } from "../../Store/App/reduser";

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
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

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
    const [favoriteCity, setFavoriteCity] = useState("");
    const [favoriteSport, setFavoriteSport] = useState([]);

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
    const stop = (event) => {
        event.stopPropagation();
    }
    const getFavoriteCity = (event) => {
        setFavoriteCity(event.target.value);
    }
    const addCity = () => {
        dispatch(fetchWeatherByName(favoriteCity));
        console.log("Status", getWeather.status);
    }
    const addFavoriteSport = (tournament) => {
        console.log("Sport favorite", tournament)
        setFavoriteSport([...favoriteSport, tournament]);
        console.log("Favorite:", favoriteSport);
    }
    const getCityAutocomplete = (e) => {
        dispatch(fetchWeatherByName(e.target.textContent));
        dispatch(fetchSport(e.target.textContent));
    }

    const [anchorEl, setAnchorEl] = React.useState(null);   //MUI
    const open = Boolean(anchorEl);     //MUI
    const handleClick = (event) => {    //MUI
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {         //MUI
        event.stopPropagation();
        setAnchorEl(null);
    };
    const [openModal, setOpenModal] = React.useState(false); //MUI
    const handleOpenModal = (event) => { event.stopPropagation(); setOpenModal(true) };    //MUI
    const handleCloseModal = (event) => { event.stopPropagation(); setOpenModal(false) };  //MUI

    useEffect(() => {
        setDegree("C");
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
                    {/* <MenuItem>
                        <Avatar /> Profile
                    </MenuItem> */}
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    {/* <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem> */}

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

                {/* <div className="weatherSearch">
                    <TextField onChange={(e) => getCity(e)} placeholder="Enter your city" name="city" label="Enter your city" size="small" />
                    <Button variant="text" onClick={() => getCityWeather()}>Show weather</Button>
                </div> */}

                <div className="search-city">
                    <TextField id="outlined-basic" onChange={(e) => getFavoriteCity(e)} label="Search city" variant="outlined" size="small" />
                    <Button variant="text" onClick={() => addCity()}>Search city</Button>
                    <div className="auto-city">
                        {
                            Array.isArray(getWeather?.autocompleteCity) ? getWeather?.autocompleteCity?.map((city, index) => (
                                <p key={index} onClick={(e) => getCityAutocomplete(e)} >{city.name.startsWith(favoriteCity) ? city.name : ""}</p>
                            )) : ""
                        }
                    </div>
                </div>
                
                


                <div className="home-content">

                <p className="variant-city">Selected city: {getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.name : ""}, {getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.country : ""}</p>

                    <div className="weather-day">
                        <div className="weather-data">Weather in {getWeather ? getWeather.cityWeather.location?.name : ""}, {getWeather ? getWeather.cityWeather.location?.country : ""}</div>
                        {/* <div className="weather-data">{getWeather ? getWeather.cityWeather.location?.region : ""}</div> */}
                        {/* <div className="weather-data">Local time: {getWeather ? getWeather.cityWeather.location?.localtime : ""}</div>
                        <div className="weather-data"><img src={getWeather.cityWeather.current?.condition.icon} /></div>
                        <div className="weather-data">Temp: {getWeather ? getWeather.cityWeather.current?.temp_c : ""} </div>
                        Temp f {(degree === "F") ? getWeather.cityWeather.current?.temp_f : ""}
                        Temp c {(degree === "C") ? getWeather.cityWeather.current?.temp_c : ""}
                        <div className="weather-data">Wind: {getWeather ? getWeather.cityWeather.current?.wind_mph : ""} </div>
                        Wind kph {(degree === "kph") ? getWeather.cityWeather.current?.wind_kph : ""}
                        Wind mph {(degree === "mph") ? getWeather.cityWeather.current?.wind_mph : ""}
                        <div className="weather-data">Humidity: {getWeather ? getWeather.cityWeather.current?.humidity : ""} </div>
                        <div className="weather-data">Pressure: {getWeather ? getWeather.cityWeather.current?.pressure_mb : ""} </div>
                        Pressure mb {(degree === "pressure_mb") ? getWeather.cityWeather.current?.pressure_mb : ""}
                        Pressure in {(degree === "pressure_in") ? getWeather.cityWeather.current?.pressure_in : ""} */}
                    </div>
                        <br/>
                    <div>
                        {/* Weater for three days: */}
                        <div className="days">
                        {
                            getWeather ? getWeather.cityWeather.forecast?.forecastday.map((day, index) => (
                                <div key={day.date + index} className="one-day">
                                    <div>{day.date}</div>
                                    <img src={day.day.condition.icon}/>
                                    <div className="days-temp">
                                    <div>
                                        <p>min</p>
                                        <p>{day.day.mintemp_c}<span>&deg;</span></p>
                                    </div>
                                    <div>
                                        <p>max</p>
                                        <p>{day.day.maxtemp_c}<span>&deg;</span></p>
                                    </div>
                                    </div>
            
                                </div>
                            )) : ""
                        }

                        </div>
                        {/* {
                            getWeather ? getWeather.cityWeather.forecast?.forecastday.map((day, index) => (
                                <p key={day.date + index}>Date: {day.date}</p>
                            )) : ""
                        } */}
                    </div>

                    {/* <div className="favorite-city">
                        <TextField id="outlined-basic" onChange={(e) => getFavoriteCity(e)} label="Add city" variant="outlined" size="small"/>
                        <Button variant="text" onClick={() => addCity()}>Add city</Button>

                        <div className="auto-city">
                            {
                                Array.isArray(getWeather?.autocompleteCity) ? getWeather?.autocompleteCity?.map((city, index) => (
                                    <p key={index} onClick={(e) => getCityAutocomplete(e)} >{ city.name.startsWith(favoriteCity) ? city.name : "" }</p>
                                )) : ""
                            }
                        </div>
                    </div>

                    { getWeather.cityWeather.error ? "City not found" : getWeather.cityWeather ? getWeather.cityWeather.location?.name : "" } */}

                    <div className="tournament">
                        {getWeather.sports ? getWeather.sports.football?.map((tournament, index) => (
                            <div>
                                <p onClick={() => addFavoriteSport(tournament.tournament)} key={index}>Name: {tournament.tournament} <button type="button">Like</button></p>
                            </div>
                        )) : ""}
                    </div>

                    <div className="favorite-sport">
                        Favorite sports:
                        {favoriteSport.map(tournament => (
                            <div>{tournament}</div>
                        ))}
                    </div>

                </div>

            </React.Fragment>
        </div>
    );
}


export default Home;