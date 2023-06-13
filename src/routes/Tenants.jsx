import React, { useEffect, useState } from 'react';
import facade from "../apiFacade.js";
import { NavLink } from "react-router-dom";

const Tenants = ({ user }) => {

    const [tenants, setTenants] = useState([]);
    const [allTenants, setAllTenants] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState("");
    const [selectedTenantToRemove, setSelectedTenantToRemove] = useState("");

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
    const handleTenantChange = (evt) => {
        console.log(selectedTenant);
        setSelectedTenant(evt.target.value);
    };

    const handleTenantChangeRemove = (evt) => {
        console.log(selectedTenantToRemove);
        setSelectedTenantToRemove(evt.target.value);
    };
    const handleAddTenant = (id) => {
        console.log(selectedTenant);
        console.log(id);

        fetch('https://moose-it.com/tomcat/progexam/api/rental/add', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newTenant: selectedTenant,
                id: id,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch(error => {
                console.error(error);
            });
        const url = `/api/rental/all`;
        facade.fetchData(url).then((res) => {
            setTenants(res);
            console.log(tenants);
        });
    };
    const handleRemoveTenant = (id) => {
        console.log(selectedTenantToRemove);
        console.log(id);

        fetch("https://moose-it.com/tomcat/progexam/api/rental/remove", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldTenant: selectedTenantToRemove,
                id: id,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch(error => {
                console.error(error);
            });
        const url = `/api/rental/all`;
        facade.fetchData(url).then((res) => {
            setTenants(res);
            console.log(tenants);
        });
    };

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
                    <th>Remove tenant</th>
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
                            <td>
                            <select onChange={handleTenantChange}>
                                <option value="">Select Tenant</option>
                                {allTenants.map((tenant) => (
                                    <option key={tenant.id} value={tenant.userName}>
                                        {tenant.userName}
                                    </option>
                                ))}
                            </select>
                                <button className="btn btn-success" onClick={() => handleAddTenant(rental.id)}>
                                    Add Tenant
                                </button>
                            </td>
                            <td>
                                <select onChange={handleTenantChangeRemove}>
                                    <option value="">Select Tenant</option>
                                    {rental.userDTOs && rental.userDTOs.map((tenant) => (
                                        <option key={tenant.id} value={tenant.userName}>
                                            {tenant}
                                        </option>
                                    ))}
                                </select>
                                <button className="btn btn-danger" onClick={() => handleRemoveTenant(rental.id)}>
                                    Remove Tenant
                                </button>
                            </td>
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
