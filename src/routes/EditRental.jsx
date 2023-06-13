import React, {useState} from 'react';
import {useLocation} from "react-router-dom";

const EditRental = () => {
    const location = useLocation();
    const {state} = location;

    const [editData, setEditData] = useState({
        startDate: state.rental.startDate || '',
        endDate: state.rental.endDate || '',
        priceAnnual: state.rental.priceAnnual || '',
        deposit: state.rental.deposit || '',
        contactPerson: state.rental.contactPerson || '',
        address: state.rental.address || '',
        city: state.rental.city || '',
        numerOfRooms: state.rental.numberOfRooms || '',
    });

    const performCreate = (evt) => {
        evt.preventDefault(); // prevent the form from submitting

        fetch('https://moose-it.com/tomcat/progexam/api/rental/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate: editData.startDate,
                endDate: editData.endDate,
                priceAnnual: editData.priceAnnual,
                deposit: editData.deposit,
                contactPerson: editData.contactPerson,
                houseDTO: {
                    address: editData.address,
                    city: editData.city,
                    numerOfRooms: editData.numberOfRooms,
                },
                id: state.rental.id,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        setEditData('');
        alert("Rental agreement updated");
    };

    const onChange = (evt) => {
        console.log(editData);
        setEditData({...editData, [evt.target.id]: evt.target.value});
    };


    return (
        <div>
            <form onChange={onChange}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="startDate">Start date</label>
                            <input className="form-control" id="startDate" defaultValue={state.rental.startDate}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input className="form-control" id="endDate" defaultValue={state.rental.endDate}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="priceAnnual">Annual Price</label>
                            <input className="form-control" id="priceAnnual" defaultValue={state.rental.priceAnnual}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="deposit">Deposit</label>
                            <input className="form-control" id="deposit" defaultValue={state.rental.deposit}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="contactPerson">Contact Person</label>
                            <input className="form-control" id="contactPerson" defaultValue={state.rental.contactPerson}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input className="form-control" id="address" defaultValue={state.rental.houseDTO.address}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input className="form-control" id="city" defaultValue={state.rental.houseDTO.city}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="numerOfRooms">Amount of rooms</label>
                            <input className="form-control" id="numerOfRooms" defaultValue={state.rental.houseDTO.numerOfRooms}/>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary" onClick={performCreate}>Create Rental</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditRental;