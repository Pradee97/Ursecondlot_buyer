import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';

const AddAddress = () => {
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
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [primaryPhone, setPrimaryphone] = useState("");
    const [mobilePhone, setMobilephone] = useState("");
    const [city, setCityName] = useState("");
    const [state, setStateName] = useState("");
    const [zipCode, setZipcodeId] = useState("");

    const onhandleSubmit = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = [{
            first_name: firstName,
            last_name: lastName,
            address: address,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,
            city_id: city,
            state_id: state,
            zipcode_id: zipCode,
            buyer_id:userDetails.user_id,
            active:1
           
        }];
        console.log("===",request)
        // return
        API.post("buyer_address/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Create Address");
                    setPopupMsg("Address is successfully created");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")

                } else {
                    togglePopup()
                    setPopupTitle("Create Address");
                    setPopupMsg("Address is not Created, Please try Again");
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
    const getStateName = (stateData) => {
		setStateName(stateData)
	}
	const getCityName = (cityData) => {
		setCityName(cityData)
	}

	const getZipCodeId = (zipData) => {
		setZipcodeId(zipData)
	}


    return (
        <div>

<main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock flooraddform">
                    <form className="registrationform" onSubmit={onhandleSubmit} >
                        {/* <button className="back-btn-paymentform" onClick={() => history.push("/#")}>Back</button>               */}
                        <h2 className="title">Add Legal Manage Account </h2>
                        <div className="row">
                        <div className="col-sm-12 form-group"> 
                        <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" required onChange={(e) => setFirstname(e.target.value)} />
                                <label for="contactName" className={firstName !="" ? "input-has-value" : ""}>First name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" required onChange={(e) => setLastname(e.target.value)} />
                                <label for="contactName" className={lastName !="" ? "input-has-value" : ""}>Last name</label>
                            </div>
                            </div>
                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" required onChange={(e) => setPrimaryphone(e.target.value)} />
                                <label for="companyName" className={primaryPhone !="" ? "input-has-value" : ""}>Primary phone</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" required onChange={(e) => setMobilephone(e.target.value)} />
                                <label for="branchName" className={mobilePhone !="" ? "input-has-value" : ""}>Mobile phone</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" required onChange={(e) => setAddress(e.target.value)} />
                                <label for="contactName" className={address !="" ? "input-has-value" : ""}>Address</label>
                            </div>
                            </div>
                            <StateAndCity
														setStateValue={getStateName}
														setCityValue={getCityName}
														setZipcodeValue={getZipCodeId}
													/>
                            {/* <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="accountNumber" className="textbox" placeholder="" required onChange={(e) => setCity(e.target.value)} />
                                <label for="accountNumber" className={city !="" ? "input-has-value" : ""}>City</label>
                            </div>
                            </div>
                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" required onChange={(e) => setState(e.target.value)} />
                                <label for="creditLimit" className={state !="" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="emailId" className="textbox" placeholder="" required onChange={(e) => setZipcode(e.target.value)} />
                                <label for="emailId" className={zipCode !="" ? "input-has-value" : ""}>Zip code</label>
                            </div>
                            </div> */}
                          
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
    
    export default AddAddress;