import React from "react";
import API from "../../../Services/BaseService";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity'
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import ls from 'local-storage';
import FileBase64 from 'react-file-base64';
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks"
import { useForm } from "react-hook-form";
import MuiPhoneNumber from 'material-ui-phone-number';

const EditBuyer = () => {
    const history = useHistory();
    let { register, updateMyProfile, formState: { errors },reset  } = useForm();
    const { id } = useParams();
    const { user_id } = useParams();
    const { buyer_id } = useParams();
    const userDetails = ls.get('userDetails');
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
    const [locationName, setLocationName] = useState("");
    const [user_privileges, setUserPrivileges] = useState("");
    const [buy_now, setBuyNow] = useState("");
    const [cancel_bid, setCancelBid] = useState("");
    const [bid, setBid] = useState("");
    const [proxy_bid, setProxy_bid] = useState("");
    const [counter_bid, setCounter_bid] = useState("");
    const [lot_fee, setLot_fee] = useState("");
    const [privileges_id, setPriviegesId] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [doc, setDoc] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [image,setImage] = useState("");

    const [primaryPhoneError, setPrimaryPhoneError] = useState("");
    const [mobilePhoneError, setMobilephoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [locationNameError, setLocationNameError] = useState("");
    const [stateAndCityError, setStateAndCityError] = useState("")

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const getFiles = (file) => {
        console.log("======>",file)
        setDoc(file);
    }

    const getStateName = (stateData) => {
        setState(stateData)
    }

    const getCityName = (cityData) => {
        setCity(cityData)
    }

    const getZipCodeId = (zipData) => {
        setZipcode(zipData)
    }
    async function fetchMyProfileDetails() {
        let request = {
            buyer_id: id,
        };
        const state = API.post('buyer_details/condition', request);
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
            setLocationName(res.data.data[0].address);
            setMyProfileObj(res.data.data[0]);
            setBuyNow(res.data.data[0].buy_now);
            setCancelBid(res.data.data[0].cancel_bid)
            setBid(res.data.data[0].bid)
            setProxy_bid(res.data.data[0].proxy_bid)
            setCounter_bid(res.data.data[0].counter_bid)
            setLot_fee(res.data.data[0].lot_fee)
            setPriviegesId(res.data.data[0].buyer_privileges_id)
            setImage(res.data.data[0].image);

        })
            .catch(err => { console.log(err); });
    }
     updateMyProfile = (event) => {
        // setOpenLoader(true);
        event.preventDefault();

        setPrimaryPhoneError("")
        setMobilephoneError("") 
        setAddressError("") 
        setLocationNameError("")
        setStateAndCityError("")

        let request = {
            user_id: id,
            first_name: firstName,
            last_name: lastName,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,
            email: emailId,
            address: address,
            city_id: typeof city==='string'?myProfileObjc.city_id:city,
            state_id: typeof state==='string'?myProfileObjc.state_id:state,
            zipcode_id: zipcode===myProfileObjc.zipcode?myProfileObjc.zipcode_id:zipcode,
            // city_id: city,
            // state_id: state,
            // zipcode_id: zipcode,
            address: locationName,
            buyer_privileges_id: privileges_id,
            buy_now: buy_now,
            cancel_bid: cancel_bid,
            bid: bid,
            proxy_bid: proxy_bid,
            counter_bid: counter_bid,
            lot_fee: lot_fee,
            image:doc===""?doc:doc.length>0?doc:[doc]
            // buyer_id: userDetails.user_id
        };

        if(!primaryPhone){
            setPrimaryPhoneError("Primary Phone is required")
            return;
        }
        else if(primaryPhone.length<10 || primaryPhone.length>15){
            setPrimaryPhoneError("Primary Phone must have atleast have 10 digits and must not exceed 15 digits")
            return;
        }
        else if( primaryPhone && !new RegExp(/\(?([0-9]{3})\)\s?([0-9]{3})([ .-]?)([0-9]{4})/).test(primaryPhone) ) {
            setPrimaryPhoneError("Accept only this Format: (123)455-6789")
            return;
        }
        if(!mobilePhone){
            setMobilephoneError("Mobile Phone is required")
            return;
        }
        else if(mobilePhone.length<10 || mobilePhone.length>15){
            setMobilephoneError("Mobile Phone must have atleast have 10 digits and must not exceed 15 digits")
            return;
        }
        else if( mobilePhone && !new RegExp(/\(?([0-9]{3})\)\s?([0-9]{3})([ .-]?)([0-9]{4})/).test(mobilePhone) ) {
            setMobilephoneError("Accept only this Format: (123)455-6789")
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
        if(!locationName){
            setLocationNameError("Location Name is required")
            return;
        }
        else if(locationName.length>150){
            setLocationNameError("Location Name must not exceed 150 characters")
            return;
        }
        if(!(typeof city==='string'?myProfileObjc.city_id:city) || !(typeof state==='string'?myProfileObjc.state_id:state) || !(zipcode===myProfileObjc.zipcode?myProfileObjc.zipcode_id:zipcode)){
            setStateAndCityError("State, City and Zipcode is required")
            return
        }
        
        API
            .post("buyer/update", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    // history.push("/success");
                    togglePopup()
                    setPopupTitle("");
                    setPopupMsg("Buyer Successfully Edited");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/buyers")
                } else {
                    // history.push("emailerror");
                    togglePopup()
                    setPopupTitle("");
                    setPopupMsg("Buyer is not Edited, Please try Again");
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
       // fetchMyProfileDetails();
       let request = {
        buyer_id: id,
    };
    const state = API.post('buyer_details/condition', request);
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
        setLocationName(res.data.data[0].address);
        setMyProfileObj(res.data.data[0]);
        setBuyNow(res.data.data[0].buy_now);
        setCancelBid(res.data.data[0].cancel_bid)
        setBid(res.data.data[0].bid)
        setProxy_bid(res.data.data[0].proxy_bid)
        setCounter_bid(res.data.data[0].counter_bid)
        setLot_fee(res.data.data[0].lot_fee)
        setPriviegesId(res.data.data[0].buyer_privileges_id)
        setImage(res.data.data[0].image);
        reset(res.data.data[0]);

    })
        .catch(err => { console.log(err); });
    }, [reset]);
    return (
        <div>
            <main id="main" className="inner-page">
                <div className="editprofile">
            <div className="container" >
            <div className="adduserpageblock col-lg-12">
               <div className="section-title">
                 <h2>Buyers</h2>
               </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0">
                    <div className="col-lg-12 myprofileeditform">
                        <form className="registrationform" onSubmit={updateMyProfile} >
                            <div className="section-title">
								<button className="back-btn-paymentform backBtn" onClick={() => history.push("/buyers")}><i class="icofont-arrow-left"></i> Back</button>
								<h2>Edit Buyer</h2>
							</div>
                            <div className="row">
                                <div className="col-sm-12 form-group">
                                <div class="user-upload-btn-wrapper">
                                    {image==="" && doc===""?<img alt="" src={process.env.PUBLIC_URL + "/images/adduser.jpg"} />:                                    
                                    doc===""?<img alt=""  src={image} />:
                                    <img alt=""  src={doc.base64} />}  
                                    <span class="proCamera"></span>                                  
                                    <FileBase64 onDone={getFiles} type="hidden" />
                                    
                                </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.first_name} className="form-control textbox" placeholder="" disabled onChange={(e) => setFirstName(e.target.value)} />
                                        <label for="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.last_name} className="form-control textbox" placeholder="" disabled onChange={(e) => setLastName(e.target.value)} />
                                        <label for="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group ">
                                    <div className="tbox">
                                        <MuiPhoneNumber defaultValue={myProfileObjc.phone_no} defaultCountry={'us'} onlyCountries={['us']}  className="form-control textbox" onChange={(e) =>setPrimaryPhone(e.target.value)} ></MuiPhoneNumber>
                                        {/* <input type="text" defaultValue={myProfileObjc.phone_no} className="form-control textbox" placeholder="" onChange={(e) => setPrimaryPhone(e.target.value)} /> */}
                                        <label for="phone_no" className={primaryPhone != "" ? "input-has-value" : ""}>Primary Phone</label>
                                    </div>
                                    <p className="form-input-error" >{primaryPhoneError}</p>
                                </div>
                                
                                <div className="col-sm-12 form-group ">
                                    <div className="tbox">
                                    <MuiPhoneNumber defaultValue={myProfileObjc.mobile_no} defaultCountry={'us'} onlyCountries={['us']}  className="form-control textbox" onChange={(e) =>setMobilephone(e.target.value)} ></MuiPhoneNumber>
                                        {/* <input type="text" defaultValue={myProfileObjc.mobile_no} className="form-control textbox" placeholder="" onChange={(e) => setMobilephone(e.target.value)} /> */}
                                        <label for="mobile_no" className={mobilePhone != "" ? "input-has-value" : ""}>Mobile Phone</label>
                                    </div>
                                    <p className="form-input-error" >{mobilePhoneError}</p>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="email" defaultValue={myProfileObjc.email} className="form-control textbox" placeholder="" disabled required onChange={(e) => setEmailId(e.target.value)} />
                                        <label for="email" className={emailId != "" ? "input-has-value" : ""}>Email Id</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder="" onChange={(e) => setAddress(e.target.value)} />
                                        <label for="address" className={address != "" ? "input-has-value" : ""}>Address</label>
                                    </div>
                                    <p className="form-input-error" >{addressError}</p>
                                </div>
                                <StateAndCity
                                    setStateValue={getStateName}
                                    setCityValue={getCityName}
                                    setZipcodeValue={getZipCodeId}
                                    isEdit={true}
                                    defaultStateValue={state}
                                    defaultCityValue={city}
                                    defaultZipcodeValue={zipcode}
                                />
                                 <p className="form-input-error"> {stateAndCityError} </p>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder="" onChange={(e) => setLocationName(e.target.value)} />
                                        <label for="address" className={locationName != "" ? "input-has-value" : ""}>Location Name</label>
                                    </div>
                                    <p className="form-input-error" >{locationNameError}</p>
                                </div>
                                <div className="section-title">
                                <h2 className="buyertitle">Buyer Privileges</h2>
                                </div>
                                <div class="col-sm-12">
                                    <div class="radio input-group privileges">
                                        <input id="radio-privileges" name="radio" type="radio" value="1" onChange={(e) => setUserPrivileges(e.target.value)} />
                                        <label for="radio-privileges" class="radio-label">Select Buyer Privileges</label>
                                    </div>
                                    <div class=" row adduserpageforminner">
                                        <div class="col-sm-6 form-group input-group">
                                            <input type="checkbox" id="buynow" value={buy_now === "1" ? 0 : 1} checked={buy_now === 1 ? true : false} onChange={(e) => setBuyNow(e.target.value)} />
                                            <label for="buynow">Buy now</label>
                                        </div>
                                        <div class="col-sm-6 form-group input-group ">
                                            <input type="checkbox" id="cancelbid" value={cancel_bid === "1" ? 0 : 1} checked={cancel_bid === 1 ? true : false} onChange={(e) => setCancelBid(e.target.value)} />
                                            <label for="cancelbid">Cancel the bid after 4 hours</label>
                                        </div>
                                        <div class="col-sm-6 form-group input-group ">
                                            <input type="checkbox" id="bid" value={bid === "1" ? 0 : 1} checked={bid === 1 ? true : false} onChange={(e) => setBid(e.target.value)} />
                                            <label for="bid">Bid</label>
                                        </div>
                                        <div class="col-sm-6 form-group input-group ">
                                            <input type="checkbox" id="proxybid" value={proxy_bid === "1" ? 0 : 1} checked={proxy_bid === 1 ? true : false} onChange={(e) => setProxy_bid(e.target.value)} />
                                            <label for="proxybid">Proxy Bid</label>
                                        </div>
                                        <div class="col-sm-6 form-group input-group ">
                                            <input type="checkbox" id="counterbid" value={counter_bid === "1" ? 0 : 1} checked={counter_bid === 1 ? true : false} onChange={(e) => setCounter_bid(e.target.value)} />
                                            <label for="counterbid">Counter Bid</label>
                                        </div>
                                        <div class="col-sm-6 form-group input-group ">
                                            <input type="checkbox" id="lotfee" value={lot_fee === "1" ? 0 : 1} checked={lot_fee === 1 ? true : false} onChange={(e) => setLot_fee(e.target.value)} />
                                            <label for="lotfee">Lot Fee</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="radio input-group noprivileges">
                                        <input id="radio-noprivileges" name="radio" type="radio" value="0" onChange={(e) => setUserPrivileges(e.target.value)} />
                                        <label for="radio-noprivileges" class="radio-label">No privileges (Only View)</label>
                                    </div>
                                </div>
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
                                <img src={process.env.PUBLIC_URL + "/images/appstore.png"} />
                                <img src={process.env.PUBLIC_URL + "/images/googleplay.png"} />
                            </div>
                        </div>
                    </div>
                </section>
                {isOpen &&
                    <CommonPopup
                        handleClose={togglePopup}
                        popupTitle={popupTitle}
                        popupMsg={popupMsg}
                        popupType={popupType}
                        popupActionType={popupActionType}
                        popupActionValue={popupActionValue}
                        popupActionPath={popupActionPath}
                    />}
            </main>
        </div>
    )
}

export default EditBuyer;