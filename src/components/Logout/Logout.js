import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const logoutBtn = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <Button onClick={() => logoutBtn()} variant="text">Logout</Button>
        </div>
    )
}

export default Logout;