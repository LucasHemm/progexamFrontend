import React from 'react';
import { useLocation } from "react-router-dom";

const HouseDetails = () => {
    const location = useLocation();
    const { state } = location;


    return (
        <div>
            <h1>guide</h1>
            <h2>Address: {state.houseDTO.address}</h2>
            <h2>City: {state.houseDTO.city}</h2>
            <h2>Number of rooms: {state.houseDTO.numerOfRooms}</h2>

        </div>
    );
};

export default HouseDetails;