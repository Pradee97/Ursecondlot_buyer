import React from "react";
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import StateAndCity from '../../Component/StateAndCity/StateAndCity'
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import ls from 'local-storage';

const EditBuyer = () => {
    const history = useHistory();
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
    const [locationName, setLocationName] = useState("");
    const [user_privileges, setUserPrivileges] = useState("");
	const [buy_now, setBuyNow] = useState("");
	const [cancel_bid, setCancelBid] = useState("");
	const [bid, setBid] = useState("");
	const [proxy_bid, setProxy_bid] = useState("");
	const [counter_bid, setCounter_bid] = useState("");
	const [lot_fee, setLot_fee] = useState("");
    const [privileges_id, setPriviegesId]=useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")
    
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
            buyer_id: id,
        };
        
        const state = API.post('buyer_details/condition',request);
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
            setZipcode(res.data.data[0].zipcode_id); 
            setLocationName(res.data.data[0].address);
            setMyProfileObj(res.data.data[0]);
            setBuyNow(res.data.data[0].buy_now);
            setCancelBid(res.data.data[0].cancel_bid)
            setBid(res.data.data[0].bid)
            setProxy_bid(res.data.data[0].proxy_bid)
            setCounter_bid(res.data.data[0].counter_bid)
            setLot_fee(res.data.data[0].lot_fee)
            setPriviegesId(res.data.data[0].buyer_privileges_id)
        })
            .catch(err => { console.log(err); });
    }
    const updateMyProfile = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            user_id:id,
            first_name: firstName,
            last_name: lastName,
            phone_no: primaryPhone,
            mobile_no: mobilePhone,           
            email: emailId,
            address: address,
            city_id: city,
            state_id: state,
            zipcode_id: zipcode,
            address: locationName,
            buyer_privileges_id:privileges_id,
            buy_now:buy_now,
            cancel_bid:cancel_bid,
            bid:bid,
            proxy_bid:proxy_bid,
            counter_bid:counter_bid,
            lot_fee:lot_fee
            // buyer_id: userDetails.user_id
           
           
        };
        API
            .post("buyer/update" ,request)
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
        fetchMyProfileDetails();
    }, []);
    return(
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4  loginBlock">
                    <button className="back-btn-paymentform backBtn" onClick={() => history.push("/buyers")}><i class="icofont-arrow-left"></i> Back</button>
                
                
                <div className="col-lg-12 card loginBlock myprofileeditform">
                    <form className="registrationform" onSubmit={updateMyProfile} >
                    
                        <h2 className="title"> Edit Buyer </h2>
                        <div className="row">
                        
                            <div className="col-sm-12 form-group">
                            <div className="tbox">                           
                                <input type="text"  defaultValue={myProfileObjc.first_name} className="form-control textbox" placeholder=""  disabled onChange={(e) => setFirstName(e.target.value)} />
                                <label for="first_name" className={firstName !="" ? "input-has-value" : ""}>First Name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.last_name} className="form-control textbox" placeholder="" disabled onChange={(e) => setLastName(e.target.value)} />
                                <label for="last_name" className={lastName !="" ? "input-has-value" : ""}>Last Name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.phone_no} className="form-control textbox" placeholder="" required onChange={(e) => setPrimaryPhone(e.target.value)} />
                                <label for="phone_no" className={primaryPhone !="" ? "input-has-value" : ""}>Primary Phone</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.mobile_no} className="form-control textbox" placeholder="" required onChange={(e) => setMobilephone(e.target.value)} />
                                <label for="mobile_no" className={mobilePhone !="" ? "input-has-value" : ""}>Mobile Phone</label>
                            </div>
                            </div>                      
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="email" defaultValue={myProfileObjc.email} className="form-control textbox" placeholder="" disabled required onChange={(e) => setEmailId(e.target.value)} />
                                <label for="email" className={emailId !="" ? "input-has-value" : ""}>Email Id</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder="" required onChange={(e) => setAddress(e.target.value)} />
                                <label for="address" className={address !="" ? "input-has-value" : ""}>Address</label>
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
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder="" required onChange={(e) => setLocationName(e.target.value)} />
                                <label for="address" className={locationName !="" ? "input-has-value" : ""}>Location Name</label>
                            </div>
                            </div>
                            <div className="section-title">
													<h2>Buyer Privileges</h2>
												</div>
												<div class="col-sm-12">
													<div class="radio input-group privileges">
														<input id="radio-privileges" name="radio" type="radio" value="1" onChange={(e) => setUserPrivileges(e.target.value)} />
														<label for="radio-privileges" class="radio-label">Select Buyer Privileges</label>
													</div>

													<div class=" row adduserpageforminner">
														<div class="col-sm-6 form-group input-group">
															<input type="checkbox" id="buynow" value={buy_now === "1" ? 0 : 1} checked={buy_now===1?true:false} onChange={(e) => setBuyNow(e.target.value)} />
															<label for="buynow">Buy now</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="cancelbid" value={cancel_bid === "1" ? 0 : 1} checked={cancel_bid===1?true:false} onChange={(e) => setCancelBid(e.target.value)} />
															<label for="cancelbid">Cancel the bid after 4 hours</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="bid" value={bid === "1" ? 0 : 1} checked={bid===1?true:false} onChange={(e) => setBid(e.target.value)} />
															<label for="bid">Bid</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="proxybid" value={proxy_bid === "1" ? 0 : 1} checked={proxy_bid===1?true:false} onChange={(e) => setProxy_bid(e.target.value)} />
															<label for="proxybid">Proxy Bid</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="counterbid" value={counter_bid === "1" ? 0 : 1} checked={counter_bid===1?true:false} onChange={(e) => setCounter_bid(e.target.value)} />
															<label for="counterbid">Counter Bid</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="lotfee" value={lot_fee === "1" ? 0 : 1} checked={lot_fee===1?true:false} onChange={(e) => setLot_fee(e.target.value)} />
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

                </div></div>
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

export default EditBuyer;