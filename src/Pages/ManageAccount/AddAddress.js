import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import { useForm } from "react-hook-form";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"

const AddAddress = () => {
    const history = useHistory();   
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
 
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
    const [location, setLocation] = useState("");
    const [instruction, setInstruction] = useState("");

    const onhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();        
    
        let request = {
            first_name: firstName,
            last_name: lastName,
            address: address,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,
            city_id: city,
            state_id: state,
            zipcode_id: zipCode,
            buyer_id:userDetails.user_id,
            location:location,
            instructions:instruction,
            active:1           
        };
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
            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
                            <div className="section-title">
                                <h2>Add Address</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                 
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 flooraddform">
                <div className="adduserpage-inner">
                <div className="col-lg-12">
                    <form className="registrationform" onSubmit={handleSubmit(onhandleSubmit)} >                                    
                      
                        <div className="row">

                        <div className="section-title">
                            <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i class="icofont-arrow-left"></i> Back</button>
							<h2>Add Address </h2>
						</div>
                        <div className="col-sm-12 form-group"> 
                        <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="firstName"
                                 {...register("firstName", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setFirstname(e.target.value)} />
                                <label for="contactName" className={firstName !="" ? "input-has-value" : ""}>First name</label>
                                <p className="form-input-error">{errors.firstName?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="lastName"
                                 {...register("lastName", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setLastname(e.target.value)} />
                                <label for="contactName" className={lastName !="" ? "input-has-value" : ""}>Last name</label>
                                <p className="form-input-error">{errors.lastName?.message}</p>
                            </div>
                            </div>
                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" name="primaryPhone"
                                 {...register("primaryPhone", {
                                    required: "This input is required.",
                                    minLength: {
                                        value: 10,
                                        message: "This input atleast have 10 digits"
                                      },
                                    maxLength: {
                                        value: 15,
                                        message: "This input must not exceed 15 digits"
                                      }
                                })}
                                onChange={(e) => setPrimaryphone(e.target.value)} />
                                <label for="companyName" className={primaryPhone !="" ? "input-has-value" : ""}>Primary phone</label>
                                <p className="form-input-error">{errors.primaryPhone?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" name="mobilePhone"
                                  {...register("mobilePhone", {
                                    // required: "This input is required.",
                                    minLength: {
                                        value: 10,
                                        message: "This input atleast have 10 digits"
                                      },
                                    maxLength: {
                                        value: 15,
                                        message: "This input must not exceed 15 digits"
                                      }
                                })}
                                onChange={(e) => setMobilephone(e.target.value)} />
                                <label for="branchName" className={mobilePhone !="" ? "input-has-value" : ""}>Mobile phone</label>
                                <p className="form-input-error">{errors.mobilePhone?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="address"
                                 {...register("address", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 150,
                                        message: "This input must not exceed 150 characters"
                                      }
                                  })}
                                onChange={(e) => setAddress(e.target.value)} />
                                <label for="contactName" className={address !="" ? "input-has-value" : ""}>Address</label>
                                <p className="form-input-error">{errors.address?.message}</p>
                            </div>
                            </div>
                            <StateAndCity
                                setStateValue={getStateName}
                                setCityValue={getCityName}
                                setZipcodeValue={getZipCodeId}
                            />
                             <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="location"
                                 {...register("location", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 150,
                                        message: "This input must not exceed 150 characters"
                                      }
                                  })}
                                onChange={(e) => setLocation(e.target.value)} />
                                <label for="contactName" className={location !="" ? "input-has-value" : ""}>Location</label>
                                <p className="form-input-error">{errors.location?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="instruction" autoComplete="off"
                                 {...register("instruction", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 150,
                                        message: "This input must not exceed 150 characters"
                                      }
                                  })}
                                onChange={(e) => setInstruction(e.target.value)} />
                                <label for="contactName" className={instruction !="" ? "input-has-value" : ""}>Instructions</label>
                                <p className="form-input-error">{errors.instruction?.message}</p>
                            </div>
                            </div>
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

                </div></div></div></div> </div></div></div>
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