import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { selectWeather } from "../../Store/App/selector";
import { fetchWeatherByName } from "../../Store/App/reduser";

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

    const getWeather = useSelector(selectWeather);
    const [city, setCity] = useState("");
    const [degree, setDegree] = useState(null);

    const logoutBtn = () => {
        localStorage.clear();
        navigate('/');
    }
    const getCity = (e) => {
        setCity(e.target.value);
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


    const [anchorEl, setAnchorEl] = React.useState(null);   //MUI
    const open = Boolean(anchorEl);     //MUI
    const handleClick = (event) => {    //MUI
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {         //MUI
        setAnchorEl(null);
    };
    const [openModal, setOpenModal] = React.useState(false); //MUI
    const handleOpenModal = (event) => { event.stopPropagation(); setOpenModal(true) };    //MUI
    const handleCloseModal = (event) => { event.stopPropagation(); setOpenModal(false) };  //MUI

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
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>

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

                <div className="weatherSearch">
                    <TextField onChange={(e) => getCity(e)} placeholder="Enter your city" name="city" label="Enter your city" size="small" />
                    <Button variant="text" onClick={() => getCityWeather}>Show weather</Button>
                </div>
                <div className="weather">
                    <div className="weatherData">Country: {getWeather ? getWeather.cityWeather.location?.country : ""}</div>
                    <div className="weatherData">Local time: {getWeather ? getWeather.cityWeather.location?.localtime : ""}</div>
                    <div className="weatherData">Cloud: {getWeather ? getWeather.cityWeather.current?.cloud : ""} <img src={getWeather.cityWeather.current?.condition.icon} /></div>
                    <div className="weatherData">Temp: {getWeather ? getWeather.cityWeather.current?.temp_c : ""}</div>
                    Degree Fahrenheit {(degree === "F") ? getWeather.cityWeather.current?.temp_f : ""}
                    Degree Celsius {(degree === "C") ? getWeather.cityWeather.current?.temp_c : ""}
                </div>
            </React.Fragment>
        </div>
    );
}


export default Home;