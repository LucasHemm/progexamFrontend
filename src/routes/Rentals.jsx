import React, { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom";
import facade from '../apiFacade.js';

const Rentals = ({ user }) => {
    const [tenant, setTenant] = useState({ rentalDTOs: [] }); // Initialize with an empty array

    useEffect(() => {
        const url = `/api/info/tenant/${user.username}`;
        facade.fetchData(url).then((res) => {
            setTenant(res);
            console.log(tenant);
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
                    <th>House details</th>
                </tr>
                </thead>
                <tbody>
                {tenant.rentalDTOs.length > 0 ? (
                    tenant.rentalDTOs.map((rental) => (
                        <tr key={rental.startDate} style={{ cursor: 'pointer' }}>
                            <td>{rental.startDate}</td>
                            <td>{rental.endDate}</td>
                            <td>{rental.priceAnnual}</td>
                            <td>{rental.deposit}</td>
                            <td>{rental.contactPerson}</td>
                            <td>
                                <NavLink to={{pathname: "/houseDetails"}} state={{houseDTO: rental.houseDTO}}>
                                    House details
                                </NavLink>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No rentals available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Rentals;
