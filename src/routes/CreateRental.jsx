import React, {useState} from 'react';

const CreateRental = () => {

    const [createData, setCreateData] = useState("");

    const performCreate = (evt) => {
        evt.preventDefault(); // prevent the form from submitting

        fetch('https://moose-it.com/tomcat/progexam/api/rental/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startDate: createData.startDate,
                endDate: createData.endDate,
                priceAnnual: createData.priceAnnual,
                deposit: createData.deposit,
                contactPerson: createData.contactPerson,
                address: createData.address,
                city: createData.city,
                numerOfRooms: createData.numberOfRooms,
                userName: createData.userName,
                userPass: createData.userPass,
                name: createData.name,
                phone: createData.phone,
                job: createData.job

            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        setCreateData('');
        alert("Rental agreement created");
    };

    const onChange = (evt) => {
        console.log(createData);
        setCreateData({ ...createData, [evt.target.id]: evt.target.value });
    };

    return (
        <div>
            <form onChange={onChange}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="startDate">Start date</label>
                            <input className="form-control" id="startDate" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input className="form-control" id="endDate" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priceAnnual">Annual Price</label>
                            <input className="form-control" id="priceAnnual" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deposit">Deposit</label>
                            <input className="form-control" id="deposit" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="contactPerson">Contact Person</label>
                            <input className="form-control" id="contactPerson" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input className="form-control" id="address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input className="form-control" id="city" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numerOfRooms">Amount of rooms</label>
                            <input className="form-control" id="numerOfRooms" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="userName">Username</label>
                            <input className="form-control" id="userName" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="userPass">Password</label>
                            <input className="form-control" id="userPass" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name">Full name</label>
                            <input className="form-control" id="name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input className="form-control" id="phone" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="job">Job</label>
                            <input className="form-control" id="job" />
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

export default CreateRental;