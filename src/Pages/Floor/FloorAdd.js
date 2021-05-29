import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import Datetime from 'react-datetime';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';

const FloorAdd = () => {
    const history = useHistory();   
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")

    const userDetails=ls.get('userDetails');
    const [option, setOption] = useState("");
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
   
    const inputProps = {
        placeholder: 'DD/MM/YYYY',
        required:true
    };

    const floorDate = (event) => {
        setDateOpened(event.format("YYYY-MM-DD"))
    }

    // const openDatepicker = (event)=>{
    //     event._calendar.setOpen(true)
    // }
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
        console.log("===",request)
        // return
        API.post("floor_plan/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Create Floor");
                    setPopupMsg("Floor is successfully created.Thanks you So much for your business");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/floor")

                } else {
                    togglePopup()
                    setPopupTitle("Create Floor");
                    setPopupMsg("Floor is not Created, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                // setOpenLoader(false);
                // console.log(error);
                    togglePopup()
                    setPopupTitle("Error");
                    setPopupMsg( "Something went wrong, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
            });

    }
    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 loginBlock flooraddform">

               
                <button className="back-btn-paymentform backBtn" onClick={() => history.push("/floor")}><i class="icofont-arrow-left"></i> Back</button> 
                <div className="col-lg-12 card">
                    <form className="registrationform" onSubmit={registrationhandleSubmit} >
                        

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
                            <div className="tbox">
  
                            <select className="form-control custom-select browser-default textbox" id="drop" placeholder="" required onChange={(e) => setOption(e.target.value)} >
                            <option value="$">$</option>
                            {/* <option disabled>Currency</option> */}
                            </select>
                            <label  for="no_years" className={"input-has-value"}>Currency</label>
                                {/* <input type="text" className="form-control" placeholder="Currency" required /> */}
                               </div>
                            </div>
                            <div className="col-sm-9 form-group">
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" required onChange={(e) => setCreditLimit(e.target.value)} />
                                <label for="creditLimit" className={creditLimit !="" ? "input-has-value" : ""}>Credit Limit</label>
                            </div>
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
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setPhoneNumber(e.target.value)} />
                                <label for="phoneNumber" className={phoneNumber !="" ? "input-has-value" : ""}>Phone Number</label>
                            </div>
                            </div>                           
                            <div className="col-sm-12 form-group datePickerBlock">
                                <div className="tbox">
                                   
                                        {/* <i class='bx bx-calendar' ></i>                                                      */}
                                        {/* <input type="Date" id="dateOpened" className="textbox" placeholder="" required onChange={(e) => setDateOpened(e.target.value)} />
                                        <label for="dateOpened" className={dateOpened !="" ? "input-has-value" : ""}>Date Opened</label>  */}
                                         <Datetime className="textbox" inputProps={ inputProps } timeFormat={false} dateFormat="DD/MM/YYYY" onChange={floorDate}/> 
                                        <label  for="meeting_date" className={"input-has-value"}>Date Opened</label> 
                                   
                                </div> 
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

                </div> </div>
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
                {isOpen && 
                <CommonPopup 
                    handleClose= {togglePopup}
                    popupTitle= {popupTitle}
                    popupMsg= {popupMsg}
                    popupType= {popupType}
                    popupActionType= {popupActionType}
                    popupActionValue= {popupActionValue}
                    popupActionPath={popupActionPath}
                />}
            </main>
        </div>


    )
}

export default FloorAdd;