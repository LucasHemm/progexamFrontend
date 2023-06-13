import React, { useEffect, useState } from 'react';
import facade from "../apiFacade.js";
import { NavLink } from "react-router-dom";

const Tenants = ({ user }) => {

    const [tenants, setTenants] = useState([]);

    const [allTenants, setAllTenants] = useState([]);

    useEffect(() => {
        const url = `/api/rental/all`;
        facade.fetchData(url).then((res) => {
            setTenants(res);
            console.log(tenants);
        });
    }, []);

    useEffect(() => {
        const url = `/api/info/all`;
        facade.fetchData(url).then((res) => {
            setAllTenants(res);
            console.log(allTenants);
        });
    }, []);

    return (
        <div className="container">
            <h1 className="mt-4">All Trips</h1>

            <table className="table table-striped table-hover mt-4">
                <thead>
                <tr>
                    <th>Start date</th>
                    <th>End Date</th>
                    <th>price annual</th>
                    <th>deposit</th>
                    <th>Contact Person</th>
                    <th>Tenants</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Amount of rooms</th>
                    <th>Add tenant</th>
                </tr>
                </thead>
                <tbody>
                {tenants.length > 0 ? (
                    tenants.map((rental) => (
                        <tr key={rental.startDate} style={{ cursor: 'pointer' }}>
                            <td>{rental.startDate}</td>
                            <td>{rental.endDate}</td>
                            <td>{rental.priceAnnual}</td>
                            <td>{rental.deposit}</td>
                            <td>{rental.contactPerson}</td>
                            <td>
                                <ul>
                                    {rental.userDTOs && rental.userDTOs.map((tenant) => (
                                        <li key={tenant}>{tenant}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{rental.houseDTO.address}</td>
                            <td>{rental.houseDTO.city}</td>
                            <td>{rental.houseDTO.numerOfRooms}</td>
                            //dropdown menu wil the allTenants, with a button to submit. send the userName and id of the rental as parameters
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9">No rentals available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Tenants;
