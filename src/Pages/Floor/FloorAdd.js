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
import Popup from '../../Component/Popup/Popup';

import '../../Component/Popup/popup.css';


const FloorAdd = () => {
    const history = useHistory();   
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    const [popupcontent,setPopupcontent] = useState ("");
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
                    togglePopup()
			        setPopupcontent ("Floor Successfully Created")
                } else {
                    togglePopup()
			        setPopupcontent ("Floor is not Created, Please try Again")
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
                    <button onClick={() => history.push("/floor")}>Back</button>
                        <h2 className="title">Add Floor Plan </h2>
                        <div className="row">
                        <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" required onChange={(e) => setContactName(e.target.value)} />
                                <label for="contactName" className={contactName !="" ? "input-has-value" : ""}>Contact Name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" required onChange={(e) => setCompanyName(e.target.value)} />
                                <label for="companyName" className={companyName !="" ? "input-has-value" : ""}>Company Name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" required onChange={(e) => setBranchName(e.target.value)} />
                                <label for="branchName" className={branchName !="" ? "input-has-value" : ""}>Branch Name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="accountNumber" className="textbox" placeholder="" required onChange={(e) => setAccountNumber(e.target.value)} />
                                <label for="accountNumber" className={accountNumber !="" ? "input-has-value" : ""}>accountNumber</label>
                            </div>
                            </div>
                            <div className="col-sm-3 form-group">
                            <select className="textbox">
                            <option disabled>Currency</option>
                            <option value="$">$</option>
                            </select>
                                {/* <input type="text" className="form-control" placeholder="Currency" required /> */}
                            </div>
                            
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" required onChange={(e) => setCreditLimit(e.target.value)} />
                                <label for="creditLimit" className={creditLimit !="" ? "input-has-value" : ""}>Credit Limit</label>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="email" id="emailId" className="textbox" placeholder="" required onChange={(e) => setEmailId(e.target.value)} />
                                <label for="emailId" className={emailId !="" ? "input-has-value" : ""}>Email Id</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="address" className="textbox" placeholder="" required onChange={(e) => setAddress(e.target.value)} />
                                <label for="address" className={address !="" ? "input-has-value" : ""}>Address</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="number" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setPhoneNumber(e.target.value)} />
                                <label for="phoneNumber" className={phoneNumber !="" ? "input-has-value" : ""}>Phone Number</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="Date" id="dateOpened" className="textbox" placeholder="" required onChange={(e) => setDateOpened(e.target.value)} />
                                <label for="dateOpened" className={dateOpened !="" ? "input-has-value" : ""}>Date Opened</label>
                            </div> 
                            </div>
                    
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                            <select className="textbox" required onChange={(e) => setAccountOpened(e.target.value)}>
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
                {isOpen && <Popup
      content={<>
    
    <div>
            <main id="main" class="inner-page">
                <div id="Successfullform" class="Successfullform">
                    <div class="container">
                        <div class="Successfullformblock col-lg-12">
                            <div class="row content">
                                <div class="modalcontent">
                                    <div class="Successfull-icon">
                                        {/* <img alt="" src={checkImg} /> */}
                                    </div>
                                    <div class="modalbody">
	 									<h2>{popupcontent}</h2>
                                        
                                    </div>
                                   

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </main>




        </div>


      </>}
      handleClose={togglePopup}
    />}
            </main>
        </div>


    )
}

export default FloorAdd;