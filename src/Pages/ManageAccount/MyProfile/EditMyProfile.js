import React from 'react';
import API from "../../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
import MuiPhoneNumber from 'material-ui-phone-number';
import { useState } from 'react';
import { useEffect } from 'react';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity'
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks";
import { useForm } from "react-hook-form";
import ls from 'local-storage';
import PhoneInput from 'react-phone-number-input/input';

const EditMyProfile = () => {
    const history = useHistory();
    let { register, updateMyProfile, formState: { errors },reset  } = useForm();
    const { id } = useParams();
    const { user_id } = useParams();
    const { buyer_id } = useParams();
    const userDetails=ls.get('userDetails');
    const [myProfileObjc, setMyProfileObj] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [mobilePhone, setMobilephone] = useState("");
    const [emailId, setEmailId] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    // const [locationName, setLocationName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")
    const [addressError, setAddressError] = useState("")
    const [primaryPhoneError, setPrimaryPhoneError] = useState("")
    const [mobilePhoneError, setMobilePhoneError] = useState("")
    const [stateAndCityError, setStateAndCityError] = useState("")

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }

      const getStateName=(stateData)=>{
        setState(stateData)
    }

    const getCityName=(cityData)=>{
        setCity(cityData)
    }

    const getZipCodeId=(zipData)=>{
        setZipcode(zipData)
    }


    async function fetchMyProfileDetails() {
        let request = {
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
        };
        
        const state = API.post('user_profile/condition',request);
        state.then(res => {
            console.log("res", res.data.data)
            setFirstName(res.data.data[0].first_name);
            setLastName(res.data.data[0].last_name);
            setPrimaryPhone(res.data.data[0].phone_no);
            setMobilephone(res.data.data[0].mobile_no);           
            setEmailId(res.data.data[0].email);
            setAddress(res.data.data[0].address);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZipcode(res.data.data[0].zipcode); 
            // setLocationName(res.data.data[0].address);
            setMyProfileObj(res.data.data[0]);
        })
            .catch(err => { console.log(err); });
    }
   
  
    updateMyProfile = (event) => {
        // setOpenLoader(true);
        event.preventDefault();  
        
        setPrimaryPhoneError("")
        setMobilePhoneError("")
        setAddressError("")
        setStateAndCityError("")

        if(!primaryPhone){
            setPrimaryPhoneError("Primary Phone is required")
            return;
        }
        else if(primaryPhone.length<12){
            setPrimaryPhoneError("Primary Phone must have 10 digits ")
            return;
        }
        if(!mobilePhone){
            setMobilePhoneError("Mobile Phone is required")
            return;
        }
        else if(mobilePhone.length<12 ){
            setMobilePhoneError("Mobile Phone must have 10 digits")
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
        if(!(typeof city==='string'?myProfileObjc.city_id:city) || !(typeof state==='string'?myProfileObjc.state_id:state) || !(zipcode===myProfileObjc.zipcode?myProfileObjc.zipcode_id:zipcode)){
            setStateAndCityError("State, City and Zipcode is required")
            return
        }

        let request = {
            user_id:id,
            first_name: firstName,
            last_name: lastName,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,           
            email: emailId,
            address: address,
            // city_id: city,
            // state_id: state,
            // zipcode_id: zipcode,
            city_id: typeof city==='string'?myProfileObjc.city_id:city,
            state_id: typeof state==='string'?myProfileObjc.state_id:state,
            zipcode_id: zipcode===myProfileObjc.zipcode?myProfileObjc.zipcode_id:zipcode,
            address: address,
            active:1,
            // buyer_id: userDetails.user_id
           
        };
        API
            .post("myProfile/update" ,request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    // history.push("/success");
                    togglePopup()
                    setPopupTitle("Edit My Profile");
                    setPopupMsg("Profile Successfully Edited");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/myprofile")
                } else {
                    // history.push("emailerror");
                    togglePopup()
                    setPopupTitle("Edit Profile");
                    // setPopupMsg("Profile is not Edited, Please try Again");
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
                setPopupMsg("something went wrong, Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            });

    }

    useEffect(() => {
        //fetchMyProfileDetails();
        let request = {
            buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
        };
        
        const state = API.post('user_profile/condition',request);
        state.then(res => {
            console.log("res", res.data.data)
            setFirstName(res.data.data[0].first_name);
            setLastName(res.data.data[0].last_name);
            setPrimaryPhone(res.data.data[0].phone_no);
            setMobilephone(res.data.data[0].mobile_no);           
            setEmailId(res.data.data[0].email);
            setAddress(res.data.data[0].address);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZipcode(res.data.data[0].zipcode); 
            // setLocationName(res.data.data[0].address);
            setMyProfileObj(res.data.data[0]);
            reset(res.data.data[0]);
        })
            .catch(err => { console.log(err); });
    }, [reset]);
    function handleOnChange(value) {
        setPrimaryPhone(value);
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
                                <h2>Edit My Profile</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                 
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 myprofileeditform">                   
                <div className="col-lg-12 adduserpage-inner ">
                    <form className="registrationform" onSubmit={updateMyProfile} >
                        <div className="row">
                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/myprofile")}><i className="icofont-arrow-left"></i> Back</button> 
							<h2>Edit My Profile</h2>
						</div>
                        
                            <div className="col-sm-12 form-group">
                            <div className="tbox">                           
                                <input type="text"  defaultValue={myProfileObjc.first_name} className="form-control textbox" placeholder="" required disabled onChange={(e) => setFirstName(e.target.value)} />
                                <label htmlFor="first_name" className={firstName !="" ? "input-has-value" : ""}>First Name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.last_name} className="form-control textbox" placeholder="" required disabled onChange={(e) => setLastName(e.target.value)} />
                                <label htmlFor="last_name" className={lastName !="" ? "input-has-value" : ""}>Last Name</label>
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
                            <div className="tbox phoneNumberfield">
                            <PhoneInput value={myProfileObjc.phone_no} country="US" className="textbox" maxLength="14" minLength="14" onChange={handleOnChange} ></PhoneInput>
                            {/* <MuiPhoneNumber value={myProfileObjc.phone_no} defaultCountry={'us'} onlyCountries={['us']}  className="textbox" onChange={handleOnChange} ></MuiPhoneNumber> */}
                                {/* <input type="text" defaultValue={myProfileObjc.phone_no} className="form-control textbox" placeholder=""  onChange={(e) => setPrimaryPhone(e.target.value)} /> */}
                                <label for="phone_no" className={primaryPhone !="" ? "input-has-value" : ""}>Primary Phone</label>
                            </div>
                                <p className="form-input-error" >{primaryPhoneError}</p>
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
                            <div className="tbox phoneNumberfield">
                            <PhoneInput value={myProfileObjc.mobile_no} country="US" className="textbox" maxLength="14" minLength="14" onChange={handleOnChanges} ></PhoneInput>
                            {/* <MuiPhoneNumber value={myProfileObjc.mobile_no} defaultCountry={'us'} onlyCountries={['us']}  className="textbox" onChange={handleOnChanges} ></MuiPhoneNumber> */}
                                {/* <input type="text" defaultValue={myProfileObjc.mobile_no} className="form-control textbox" placeholder=""  onChange={(e) => setMobilephone(e.target.value)} /> */}
                                <label for="mobile_no" className={mobilePhone !="" ? "input-has-value" : ""}>Mobile Phone</label>
                            </div>
                                <p className="form-input-error" >{mobilePhoneError}</p>
                            </div>                      
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="email" defaultValue={myProfileObjc.email} className="form-control textbox" placeholder="" required disabled onChange={(e) => setEmailId(e.target.value)} />
                                <label htmlFor="email" className={emailId !="" ? "input-has-value" : ""}>Email Id</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder=""  onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="address" className={address !="" ? "input-has-value" : ""}>Address</label>
                                <p className="form-input-error" >{addressError}</p>

                            </div>
                            </div>
                            <StateAndCity 
                                setStateValue = { getStateName } 
                                setCityValue ={ getCityName }
                                setZipcodeValue ={ getZipCodeId }
                                isEdit = {true}
                                defaultStateValue = {state}
                                defaultCityValue = {city}
                                defaultZipcodeValue = {zipcode}
                            />
                            <p className="form-input-error"> {stateAndCityError} </p>
                            {/* <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={city} className="form-control textbox" placeholder="" required onChange={(e) => setCity(e.target.value)} />
                                <label htmlFor="city_id" className={city !="" ? "input-has-value" : ""}>City</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={state} className="form-control textbox" placeholder="" required onChange={(e) => setState(e.target.value)} />
                                <label htmlFor="state_id" className={state !="" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={zipcode} className="form-control textbox" placeholder="" required onChange={(e) => setZipcode(e.target.value)} />
                                <label htmlFor="zipcode_id" className={zipcode !="" ? "input-has-value" : ""}>Zipcode</label>
                            </div>
                            </div> */}

                            {/* <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder="" required onChange={(e) => setLocationName(e.target.value)} />
                                <label htmlFor="address" className={locationName !="" ? "input-has-value" : ""}>Location Name</label>
                            </div>
                            </div> */}
                                                     
                    
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Update</button>
                            </div>
                        </div>
                    </form>

                </div></div></div></div></div></div>
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

export default EditMyProfile;