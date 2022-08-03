import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import './Register.css';

function Register() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState({email: "", password: ""});
    const [signInUser, setSignInUser] = useState({email: "", password: ""})

    const goToRegister = () => {
        setIsLogin(false);
    }

    const goToLogin = () => {
        setIsLogin(true);
    }

    const gotToApp = () => {
        const getStorage = localStorage.getItem("user");

        if (getStorage) {
            if (JSON.parse(getStorage).email === signInUser.email && JSON.parse(getStorage).password === signInUser.password) {
                alert("User successeful sign in");
                navigate('/home');
            } else if (JSON.parse(getStorage).email !== signInUser.email && JSON.parse(getStorage).password !== signInUser.password) {
                alert("You entered incorrect data")
            }
        } else {
            alert("You are not registred")
        }
    }

    const register = () => {
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/')
    }
    const scrapData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const scrapSignInData = (e) => {
        setSignInUser({ ...signInUser, [e.target.name]: e.target.value})
    }

    return (
        <div className="registerPage">
            <div className="registerForma">
                {
                isLogin ?
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Login to Weather App
                            </Typography>
                            <TextField onChange={(e) => scrapSignInData(e)} name="email" id="outlined-size-small" size="small" label="Email" variant="outlined" />
                            <TextField
                                onChange={(e) => scrapSignInData(e)}
                                name="password"
                                id="outlined-size-small-password-input"
                                sx={{ marginTop: '16px' }}
                                size="small"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => gotToApp()} size="small">Sign In</Button>
                            <Button onClick={() => goToRegister()} size="small">Register</Button>
                        </CardActions>
                    </Card> :
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Login to Weather App
                            </Typography>
                            <TextField id="outlined-size-small" size="small" label="Name" variant="outlined" />
                            <TextField sx={{ marginTop: '16px' }} id="outlined-size-small" size="small" label="Surname" variant="outlined" />
                            <TextField sx={{ marginTop: '16px' }} id="outlined-size-small" size="small" label="Tel" variant="outlined" />
                            <TextField onChange={(e) => scrapData(e)} sx={{ marginTop: '16px' }} id="outlined-size-small" size="small" label="Email" variant="outlined" name="email"/>
                            <TextField
                                onChange={(e) => scrapData(e)}
                                name="password"
                                id="outlined-size-small-password-input"
                                size="small"
                                sx={{ marginTop: '16px' }}
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => register()} size="small">Login</Button>
                            <Button onClick={() => goToLogin()} size="small">Got to login</Button>
                        </CardActions>
                    </Card>
                }
            </div>
        </div>
    );
}


export default Register;