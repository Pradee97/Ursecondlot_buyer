import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';

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


const FloorAdd = () => {
    const history = useHistory();    
    const userDetails=ls.get('userDetails');
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
    // const [stateId, setStateId] = useState("");
    // const [cityName, setCityName] = useState("");
    // const [cityId, setCityId] = useState("");
    // const [zipCodeId, setZipcodeId] = useState("");
    // const [numberOfYears, setNumberofYears] = useState("");
   
  
    const registrationhandleSubmit = (event) => {
        // setOpenLoader(true);
        event.preventDefault();
        let request = [{
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
            buyer_id:userDetails.user_id,
            active:1
            
        }];
        API
            .post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/floor_plan/add", request)
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
    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock flooraddform">
                    <form className="registrationform" onSubmit={registrationhandleSubmit} >
                        <h2 className="title"> Floor Plan Add</h2>
                        <div className="row">

                            <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="Contact Name" required onChange={(e) => setContactName(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="Company Name" required onChange={(e) => setCompanyName(e.target.value)} />
                            </div>

                            <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="Branch Name" required onChange={(e) => setBranchName(e.target.value)} />
                            </div>

                            <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="Account Number" required onChange={(e) => setAccountNumber(e.target.value)} />
                            </div>

                            <div className="col-sm-3 form-group">
                            <select className="form-control">
                            <option disabled>Currency</option>
                            <option value="$">$</option>
                            </select>
                                {/* <input type="text" className="form-control" placeholder="Currency" required /> */}
                            </div>
                            <div className="col-sm-9 form-group">
                                <input type="text" className="form-control" placeholder="Credit Limit" required onChange={(e) => setCreditLimit(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="email" className="form-control" placeholder="Email Id" required onChange={(e) => setEmailId(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="number" className="form-control" placeholder="Phone Number" required onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="Date" className="form-control" placeholder="Date Opened" required onChange={(e) => setDateOpened(e.target.value)} />
                            </div>
                    
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                            <select className="form-control textbox" required onChange={(e) => setAccountOpened(e.target.value)}>
                            <option disabled>Account Opened</option>
                            <option value="Yes">Yes</option>
                            <option selected>No</option>
                            </select>

                            <label  for="account_Opened" className={accountOpened!="" ? "input-has-value" : ""}>Account Opened</label>
                                {/* <input type="text" className="form-control" placeholder="Account Opened" required onChange={(e) => setAccountOpened(e.target.value)} /> */}
                            </div>
                            </div>
                    
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Submit</button>
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

export default FloorAdd;