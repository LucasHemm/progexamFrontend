import React, { useEffect, useState } from 'react';
import facade from "../apiFacade.js";
import { NavLink } from "react-router-dom";

const Tenants = ({ user }) => {

    const [tenants, setTenants] = useState([]);
    const [allTenants, setAllTenants] = useState([]);
    const [selectedTenant, setSelectedTenant] = useState("");
    const [selectedTenantToRemove, setSelectedTenantToRemove] = useState("");

    const fetchTenants = () => {
        const url = `/api/rental/all`;
        facade.fetchData(url).then((res) => {
            setTenants(res);
            console.log(tenants);
        });
    };

    const fetchAllTenantsInfo = () => {
        const url = `/api/info/all`;
        facade.fetchData(url).then((res) => {
            setAllTenants(res);
            console.log(allTenants);
        });
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    useEffect(() => {
        fetchAllTenantsInfo();
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
                fetchTenants();
            })
            .catch(error => {
                console.error(error);
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
                fetchTenants();
            })
            .catch(error => {
                console.error(error);
            });
    };
    const handleDeleteRental = (id) => {
        fetch(`https://moose-it.com/tomcat/progexam/api/rental/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchTenants();
                alert("Rental deleted");
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="container ml-5">
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
                    <th>Edit rental agreement</th>
                    <th>Delete rental agreement</th>
                </tr>
                </thead>
                <tbody>
                {tenants.length > 0 ? (
                    tenants.map((rental) => (
                        <tr key={rental.startDate} style={{ cursor: 'pointer' }}>
                            <td>{rental.startDate}</td>
                            <td>{rental.endDate}</td>
                            <td>{rental.priceAnnual} kr.</td>
                            <td>{rental.deposit} kr.</td>
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
                            <td>
                                <td>
                                <NavLink to={{pathname: "/editRental"}} state={{rental: rental}}>
                                    Edit
                                </NavLink>
                            </td>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteRental(rental.id)}>
                                    Delete Rental
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="13">No rentals available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Tenants;
