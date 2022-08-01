import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Home } from "./Home/Home"; 
import './AppRouter.css';

export const AppRouter = () => {

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}