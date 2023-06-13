import {Route, Routes} from "react-router-dom";
import Home from "../routes/Home.jsx";
import About from "../routes/About.jsx";
import React from "react";
import Rentals from "../routes/Rentals.jsx";
import HouseDetails from "../routes/HouseDetails.jsx";
import Tenants from "../routes/Tenants.jsx";
import CreateRental from "../routes/CreateRental.jsx";

const Content = ({user}) =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About user={user}/>}/>
            <Route path="/rentals" element={<Rentals user={user}/>}/>
            <Route path="/houseDetails" element={<HouseDetails/>}/>
            <Route path="/tenants" element={<Tenants user={user}/>}/>
            <Route path="createRental" element={<CreateRental/>}/>
        </Routes>
    )
}

export default Content;