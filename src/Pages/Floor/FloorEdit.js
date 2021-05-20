import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';
import ls from 'local-storage';

const FloorEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const userDetails=ls.get('userDetails');
    const [floorObjc, setFloorObj] = useState("");
    const [contactName, setContactName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [creditLimit, setCreditLimit] = useState("");
    const [emailId, setEmailId] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOpened, setDateOpened] = useState("");
    const [accountOpened, setAccountOpened] = useState("");
    

    async function fetchFloorDetails() {
        
        const state = API.get('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/floor_plan/'+id);
        state.then(res => {
            console.log("res", res.data.data)
            setFloorObj(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
  
    const updateFloorPlan = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            contact_name: contactName,
            company_name: companyName,
            branch_name: branchName,
            account_no: accountNumber,
            credit_limit: creditLimit,
            email_id: emailId,
            address: address,
            phone_no: phoneNumber,
            opened_date: dateOpened,
            account_opened: accountOpened,
            active:1,
            buyer_id: userDetails.user_id
           
        };
        API
            .put("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/floor_plan/"+id, request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    history.push("/success");
                } else {
                    history.push("emailerror");
                }
            }, (error) => {
                // setOpenLoader(false);
                // console.log(error);
            });

    }

    useEffect(() => {
        fetchFloorDetails();
    }, []);
    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form className="registrationform" onSubmit={updateFloorPlan} >
                        <h2 className="title"> Floor Plans Edit</h2>
                        <div className="row">

                            <div className="col-sm-12 form-group">
                                <input type="text"  defaultValue={floorObjc.contact_name} className="form-control" placeholder="Contact Name" required onChange={(e) => setContactName(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.company_name} className="form-control" placeholder="Company Name" required onChange={(e) => setCompanyName(e.target.value)} />
                            </div>

                            <div className="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.branch_name} className="form-control" placeholder="Branch Name" required onChange={(e) => setBranchName(e.target.value)} />
                            </div>

                            <div className="col-sm-12 form-group">
                                <input type="number" defaultValue={floorObjc.account_no} className="form-control" placeholder="Account Number" required onChange={(e) => setAccountNumber(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="number" defaultValue={floorObjc.credit_limit} className="form-control" placeholder="Credit Limit" required onChange={(e) => setCreditLimit(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="email" defaultValue={floorObjc.email_id} className="form-control" placeholder="Email Id" required onChange={(e) => setEmailId(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.address} className="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="number" defaultValue={floorObjc.phone_no} className="form-control" placeholder="Phone Number" required onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="Date" value={floorObjc.date_opened} className="form-control" placeholder="Date Opened" required onChange={(e) => setDateOpened(e.target.value)} />
                            </div>
                    
                            <div className="col-sm-12 form-group">
                                <input type="text" defaultValue={floorObjc.account_opened} className="form-control" placeholder="Account Opened" required onChange={(e) => setAccountOpened(e.target.value)} />
                            </div>
                           
                    
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Update</button>
                            </div>
                        </div>
                    </form>

                </div>
                <section id="playstoreBlock" className="playstoreBlock">
                    <div className="container">
                        <div className="row content">
                            <div className="col-lg-12">
                                <img src={process.env.PUBLIC_URL +"/images/appstore.png" }/>
                                <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>


    )
}

export default FloorEdit;