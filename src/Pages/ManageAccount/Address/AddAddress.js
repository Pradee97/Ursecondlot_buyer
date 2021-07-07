import React from 'react';
import API from "../../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity';
import { useForm } from "react-hook-form";
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks";
import PhoneInput from 'react-phone-number-input/input';

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
    const [cityName, setCityName] = useState("");
    const [stateName, setStateName] = useState("");
    const [zipCodeId, setZipcodeId] = useState("");
    const [location, setLocation] = useState("");
    const [instruction, setInstruction] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [primaryPhoneError, setPrimaryphoneError] = useState("");
    const [mobilePhoneError, setMobilephoneError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [instructionError, setInstructionError] = useState("");
    const [state,setState]=useState("1");
    const [city,setCity]=useState("1");
    const [zipcode,setZipcode]=useState("1");


    function formatMobileNO(value){
        var x = value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
    
        console.log("value of x",x);
        value = '+'+ x[1]+'('+ x[2] +')' + x[3] + '-' + x[4];
        console.log("mobileno",value);
        return value;
     }
    const onhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();        
        setFirstNameError("")
        setLastNameError("")
        setAddressError("")
        setPrimaryphoneError("")
        setMobilephoneError("")
        setLocationError("")
        setInstructionError("")
       
        if(!firstName){
            setFirstNameError("First Name is required")
            return;
        }
        else if(firstName.length>50){
            setFirstNameError("First Name must not exceed 50 characters")
            return;
        }       
        if(!lastName){
            setLastNameError("Last Name is required")
            return;
        }
        else if(lastName.length>50 ){
            setLastNameError("Last Name must not exceed 50 characters ")
            return;
        }
        if(!primaryPhone){
            setPrimaryphoneError("Phone Number is required")
            return;
        }
        else if(primaryPhone.length<12 ){
            setPrimaryphoneError("Phone Number must have 10 digits ")
            return;
        }
        if(!mobilePhone){
            setMobilephoneError("Mobile Phone is required")
            return;
        }
        else if(mobilePhone.length<12 ){
            setMobilephoneError("Mobile Phone must have 10 digits ")
            return;
        }
        if(!address){
            setAddressError("Address is required")
            return;
        }
        else if(address.length>150){
            setAddressError("Address must not exceed 150 characters")
            return;
        }
        if(!location){
            setLocationError("Location is required")
            return;
        }
        else if(location.length>150){
            setLocationError("Location must not exceed 150 characters")
            return;
        }       
        if(!instruction){
            setInstructionError("Instruction is required")
            return;
        }
        else if(instruction.length>150 ){
            setInstructionError("Instruction must not exceed 150 characters ")
            return;
        }

        if(  stateName!=="" && cityName!=="" && zipCodeId!=="" ){
            let request = {
                first_name: firstName,
                last_name: lastName,
                address: address,
                phone_no: formatMobileNO(primaryPhone),
                mobile_no: formatMobileNO(mobilePhone),
                city_id: city,
                state_id: state,
                zipcode_id: zipCodeId,
                buyer_id:userDetails.user_id,
                location:location,
                instructions:instruction,
                active:1           
            };
            console.log("===",request)  
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
                    // setPopupMsg("Address is not Created, Please try Again");
                    setPopupMsg( response.data.error.err );
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
    else{

		if(stateName==="" || stateName===undefined || stateName===null){
			console.log("====stateName=stateName=>",stateName,cityName,zipCodeId)
			setState("");
		}
		if(cityName==="" || cityName===undefined || cityName===null){
			console.log("====cityName==>",stateName,cityName,zipCodeId)
			 setCity("");
		}
		if(zipCodeId==="" || zipCodeId===undefined || zipCodeId===null){
			console.log("====zipCodeId==>",stateName,cityName,zipCodeId)
			 setZipcode("");
		}
		
    }	
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

    function handleOnChange(value) {
        setPrimaryphone(value);
     }
     function handleOnChanges(value) {
        setMobilephone(value);
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
                            <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i className="icofont-arrow-left"></i> Back</button>
							<h2>Add Address </h2>
						</div>
                        <div className="col-sm-12 form-group"> 
                        <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="firstName"                   
                                onChange={(e) => setFirstname(e.target.value)} />
                                <label htmlFor="contactName" className={firstName !="" ? "input-has-value" : ""}>First name</label>
                                <p className="form-input-error" >{firstNameError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="lastName"
                                onChange={(e) => setLastname(e.target.value)} />
                                <label htmlFor="contactName" className={lastName !="" ? "input-has-value" : ""}>Last name</label>
                                <p className="form-input-error" >{lastNameError}</p>
                            </div>
                            </div>
                            <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder="" defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div>
                            <div className="col-sm-8 form-group ">
                            <div className="tbox ">
                                <PhoneInput  id="primaryPhone" name="primaryPhone" country="US" class="textbox" maxLength="14" minLength="14"
                                onChange={handleOnChange} ></PhoneInput>
                                <label htmlFor="companyName" className={"input-has-value"}>Primary phone</label>
                                <p className="form-input-error" >{primaryPhoneError}</p>
                            </div>
                            </div>

                            <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder="" defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div>
                            <div className="col-sm-8 form-group ">
                            <div className="tbox ">
                           
                                <PhoneInput  id="mobilePhone" name="mobilePhone"  country="US" class="textbox" maxLength="14" minLength="14"
                                onChange={handleOnChanges} ></PhoneInput>
                                <label htmlFor="branchName" className={"input-has-value"}>Mobile phone</label>
                                <p className="form-input-error" >{mobilePhoneError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="address"
                                onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="contactName" className={address !="" ? "input-has-value" : ""}>Address</label>
                                <p className="form-input-error" >{addressError}</p>
                            </div>
                            </div>
                            <StateAndCity
                                setStateValue={getStateName}
                                setCityValue={getCityName}
                                setZipcodeValue={getZipCodeId}
                            />
                            {(state==="" && stateName==="") ?
                            <p className="form-input-error"> State,City,zipcode  is required</p>:
                            cityName===null && city===""?<p className="form-input-error"> City is required</p>:
                            zipCodeId===null && zipcode===""?<p className="form-input-error"> Zipcode is required</p>:""}

                             <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="location"
                                onChange={(e) => setLocation(e.target.value)} />
                                <label htmlFor="contactName" className={location !="" ? "input-has-value" : ""}>Location</label>
                                <p className="form-input-error" >{locationError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="instruction" autoComplete="off"
                                onChange={(e) => setInstruction(e.target.value)} />
                                <label htmlFor="contactName" className={instruction !="" ? "input-has-value" : ""}>Instructions</label>
                                <p className="form-input-error" >{instructionError}</p>
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