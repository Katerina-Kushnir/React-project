import React from "react";
import { Routes, Route } from "react-router-dom";
import { RegistrationScrin1 } from "./RegistrationScrin1";


export const RegistrationRouter = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<RegistrationScrin1/>} />
            </Routes>
        </div>
    )
}

