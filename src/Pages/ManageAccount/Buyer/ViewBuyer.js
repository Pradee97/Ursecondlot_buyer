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
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input/input';
import Loading from '../../../Component/Loading/Loading';
import Popup from '../../../Component/Popup/Popup';
import LateFee from '../../../Pages/LateFee/LateFee';

const ViewBuyer = () => {

    const history = useHistory();
    const { id } = useParams();
    const userDetails = ls.get('userDetails');
    const [myProfileObjc, setMyProfileObj] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [mobilePhone, setMobilephone] = useState("");
    const [emailId, setEmailId] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [locationName, setLocationName] = useState("");
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
    const [selectPrivilege, setselectPrivilege] = useState(false)
    const [deselectPrivilege, setDeselectPrivilege] = useState(false)
    const [privilegesObj, setPrivilegesObj] = useState({})
    const [primaryPhoneError, setPrimaryPhoneError] = useState("");
    const [mobilePhoneError, setMobilephoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [locationNameError, setLocationNameError] = useState("");
    const [stateAndCityError, setStateAndCityError] = useState("")
    const [isPrivileges, setIsPrivileges] = useState(false);
    const [type,setType]=useState("");
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload); 
    const [loading,setLoading] = useState(true);

    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  	}

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const getFiles = (file) => {
        setType("")
        console.log("================>",file.type)
        if(file.type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")){
            setDoc(file);
        }else{
            setType("0");
        }
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

    const setUserPrivileges = (data) => {
        if(data==0){
			setBuyNow(0);
			setCancelBid(0);
			setBid(0);
			setProxy_bid(0);
			setCounter_bid(0);
			setLot_fee(0);
			setDeselectPrivilege(true)
			setselectPrivilege(false)
		}
		else{
            setBuyNow(privilegesObj?.buyNow || 0);
            setCancelBid(privilegesObj?.cancelBid || 0)
            setBid(privilegesObj?.bid || 0)
            setProxy_bid(privilegesObj?.proxyBid || 0)
            setCounter_bid(privilegesObj?.scounterBid || 0)
            setLot_fee(privilegesObj?.lotFee || 0)
			setDeselectPrivilege(false)
			setselectPrivilege(true)
		}
    }
    // async function fetchMyProfileDetails() {
    //     let request = {
    //         buyer_id: id,
    //     };
    //     const state = API.post('buyer_details/condition', request);
    //     state.then(res => {
    //         console.log("res", res.data.data)
    //         setFirstName(res.data.data[0].first_name);
    //         setLastName(res.data.data[0].last_name);
    //         setPrimaryPhone(res.data.data[0].phone_no);
    //         setMobilephone(res.data.data[0].mobile_no);
    //         setEmailId(res.data.data[0].email);
    //         setAddress(res.data.data[0].address);
    //         setCity(res.data.data[0].city_name);
    //         setState(res.data.data[0].state_name);
    //         setZipcode(res.data.data[0].zipcode);
    //         setLocationName(res.data.data[0].address);
    //         setMyProfileObj(res.data.data[0]);
    //         setBuyNow(res.data.data[0].buy_now);
    //         setCancelBid(res.data.data[0].cancel_bid)
    //         setBid(res.data.data[0].bid)
    //         setProxy_bid(res.data.data[0].proxy_bid)
    //         setCounter_bid(res.data.data[0].counter_bid)
    //         setLot_fee(res.data.data[0].lot_fee)
    //         setPriviegesId(res.data.data[0].buyer_privileges_id)
    //         setImage(res.data.data[0].image);

    //     })
    //         .catch(err => { console.log(err); });
    // }
    function formatMobileNO(value){
        var x = value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
    
        console.log("value of x",x);
        value = '+'+ x[1]+'('+ x[2] +')' + x[3] + '-' + x[4];
        console.log("mobileno",value);
        return value;
     }
    //  const updateMyProfile = (event) => {
    //     // setOpenLoader(true);
    //     event.preventDefault();

    //     setPrimaryPhoneError("")
    //     setMobilephoneError("") 
    //     setAddressError("") 
    //     setLocationNameError("")
    //     setStateAndCityError("")

       
    //     if(!primaryPhone){
    //         setPrimaryPhoneError("Primary Phone is required")
    //         return;
    //     }

    //     else if(primaryPhone.length<12 ){
    //         console.log("mobilePhone===",primaryPhone)
    //         setPrimaryPhoneError("Primary Phone must have 10 digits ")
    //         return;
    //     }
    //     if(!mobilePhone){
    //         setMobilephoneError("Mobile Phone is required")
    //         return;
    //     }

    //     else if(mobilePhone.length<12 ){
    //         console.log("mobilePhone===",mobilePhone)
    //         setMobilephoneError("Mobile Phone must have 10 digits")
    //         return;
    //     }
    //     if(!address){
    //         setAddressError("Address is required")
    //         return;
    //     }

    //     else if(address.length>150){
    //         setAddressError("Address must not exceed 150 characters")
    //         return;
    //     }

    //     if(!locationName){
    //         setLocationNameError("Location Name is required")
    //         return;
    //     }

    //     else if(locationName.length>150){
    //         setLocationNameError("Location Name must not exceed 150 characters")
    //         return;
    //     }

    //     if(!(typeof city==='string' ? myProfileObjc.city_id : city) || 
    //         !(typeof state==='string' ? myProfileObjc.state_id:state) || 
    //         !(zipcode===myProfileObjc.zipcode ? myProfileObjc.zipcode_id : zipcode)){
    //         setStateAndCityError("State, City and Zipcode is required")
    //         return
    //     }

    //     let request = {
    //         buyer_id: id,
    //         first_name: firstName,
    //         last_name: lastName,
    //         phone_no: formatMobileNO(primaryPhone),
    //         mobile_no: formatMobileNO(mobilePhone),
    //         email: emailId,
    //         address: address,
    //         city_id: typeof city === 'string' ? myProfileObjc.city_id : city,
    //         state_id: typeof state === 'string' ? myProfileObjc.state_id : state,
    //         zipcode_id: zipcode === myProfileObjc.zipcode ? myProfileObjc.zipcode_id : zipcode,
    //         // city_id: city,
    //         // state_id: state,
    //         // zipcode_id: zipcode,
    //         address: locationName,
    //         buyer_privileges_id: privileges_id,
    //         buy_now: buy_now,
    //         cancel_bid: cancel_bid,
    //         bid: bid,
    //         proxy_bid: proxy_bid,
    //         counter_bid: counter_bid,
    //         lot_fee: lot_fee,
    //         image:doc===""?doc:doc.length>0?doc:[doc],
    //         updatedBy:JSON.parse(loggedInBuyerId).buyer_id
    //     };

        
    //     API
    //         .post("buyer/update", request)
    //         .then((response) => {
    //             if (response.data.success) {
    //                 const { data } = response;
    //                 console.log("response", response)
    //                 if(userDetails.buyer_id===response.data.data[0].buyer_id){
    //                     ls.set('userDetails', response.data.data[0]);
    //                 }                    
    //                 // history.push("/success");
    //                 togglePopup()
    //                 setPopupTitle("");
    //                 setPopupMsg("Buyer Successfully Edited");
    //                 setPopupType("success");
    //                 setPopupActionType("redirect");
    //                 setPopupActionValue("ok");
    //                 setPopupActionPath("/buyers")
    //             } else {
    //                 // history.push("emailerror");
    //                 togglePopup()
    //                 setPopupTitle("");
    //                 // setPopupMsg("Buyer is not Edited, Please try Again");
    //                 setPopupMsg( response.data.error.err );
    //                 setPopupType("error");
    //                 setPopupActionType("close");
    //                 setPopupActionValue("close");
    //             }
    //         }, (error) => {
    //             // setOpenLoader(false);
    //             // console.log(error);
    //             togglePopup()
    //             setPopupTitle("Error");
    //             setPopupMsg("something went wrong, Please try Again");
    //             setPopupType("error");
    //             setPopupActionType("close");
    //             setPopupActionValue("close");
    //         });
    // }
    useEffect(() => {
       // fetchMyProfileDetails();
       let request = {
        buyer_id: id,
    };
    const state = API.post('buyer_details/condition', request);
    state.then(res => {
        console.log( "userDetails=>",userDetails)
        console.log("res=>", res.data.data)
        setFirstName(res.data.data[0].first_name);
        setLastName(res.data.data[0].last_name);
        // setPrimaryPhone(res.data.data[0].phone_no);
        // setMobilephone(res.data.data[0].mobile_no);
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
        formatPhone(res.data.data[0].phone_no)

        setPrivilegesObj({
            buyNow : res.data.data[0].buy_now,
            cancelBid: res.data.data[0].cancel_bid,
            bid: res.data.data[0].bid,
            proxyBid: res.data.data[0].proxy_bid,
            scounterBid: res.data.data[0].counter_bid,
            lotFee: res.data.data[0].lot_fee
        })
        setIsPrivileges(userDetails.buyer_id === res.data.data[0].buyer_id ? false : true)
        if(res.data.data[0].buy_now == 1 || res.data.data[0].cancel_bid == 1 || res.data.data[0].bid == 1 || 
            res.data.data[0].proxy_bid == 1 || res.data.data[0].counter_bid == 1 || res.data.data[0].lot_fee == 1 ){
                setselectPrivilege(true)
                setDeselectPrivilege(false)
        } else{
            setselectPrivilege(false)
            setDeselectPrivilege(true)
        }
        setLoading(false); 
    })
        .catch(err => { console.log(err); });
    },[] );

    function formatPhone(value){
        var x = value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
        console.log("formatPhoneNumber x",x);
        value = '+1'+ '('+ x[1] +')' + x[2] + '-' + x[3];
        console.log("formatPhoneNumber",value);
        return setPrimaryPhone(value);
      }
     const getlateFee=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('getlatefee/condition',request).then(res=>{
           if(res.data.data.length){
            
       console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
            const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
            setIsLateFee(lateFeeValueStatus==="yes")
            setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
           }
          
    
        }).catch(err=>{console.log(err);});
    }
    
    
    useEffect(() => {
    
      getlateFee();
      
    }, []);

    return (
        <div>
           {loading?<Loading/>:
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
                        {/* <form className="registrationform" onSubmit={updateMyProfile} > */}
                        <form className="registrationform"  >

                            <div className="section-title">
								<button className="back-btn-paymentform backBtn" onClick={() => history.push("/buyers")}><i className="icofont-arrow-left"></i> Back</button>
								<h2>View Buyer</h2>
							</div>
                            <div className="row">
                                <div className="col-sm-12 form-group">
                                <div className="user-upload-btn-wrapper">
                                    {image==="" && doc===""?<img alt="" src={process.env.PUBLIC_URL + "/images/adduser.jpg"} />:                                    
                                    doc===""?<img alt=""  src={image} />:
                                    <img alt=""  src={doc.base64} />}  
                                    <span className="proCamera"></span>   
                                    {type==="0"?<p className="form-input-error">Upload only Image Format </p>:""}                               
                                    <FileBase64 onDone={getFiles} type="hidden" />
                                    
                                </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.first_name} className="form-control textbox" placeholder="" disabled />
                                        <label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.last_name} className="form-control textbox" placeholder="" disabled  />
                                        <label htmlFor="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder=""  defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div>
                                <div className="col-sm-8 form-group ">
                                    <div className="tbox ">
                                    {/* <PhoneInput value={myProfileObjc.phone_no} country="US" className="textbox" maxLength="14" minLength="14"  disabled onChange={handleOnChange} ></PhoneInput> */}
                                    <PhoneInput value={primaryPhone} country="US" className="textbox" maxLength="14" minLength="14"  disabled ></PhoneInput>

                                        {/* <MuiPhoneNumber value={myProfileObjc.phone_no} defaultCountry={'us'} onlyCountries={['us']}  className=" textbox" onChange={handleOnChange} ></MuiPhoneNumber> */}
                                        {/* <input type="text" defaultValue={myProfileObjc.phone_no} className="form-control textbox" placeholder="" onChange={(e) => setPrimaryPhone(e.target.value)} /> */}
                                        <label for="phone_no" className={primaryPhone != "" ? "input-has-value" : ""}>Phone #</label>
                                    </div>
                                    <p className="form-input-error" >{primaryPhoneError}</p>
                                </div>
                                {/* <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder="" defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div> */}
                                {/* <div className="col-sm-8 form-group ">
                                    <div className="tbox "> */}
                                    {/* <PhoneInput value={myProfileObjc.mobile_no} country="US" className="textbox" maxLength="14" minLength="14" disabled onChange={handleOnChanges} ></PhoneInput> */}
                                    {/* <PhoneInput value={myProfileObjc.mobile_no} country="US" className="textbox" maxLength="14" minLength="14" disabled  ></PhoneInput> */}

                                    {/* <MuiPhoneNumber value={myProfileObjc.mobile_no} defaultCountry={'us'} onlyCountries={['us']}  className=" textbox" onChange={handleOnChanges} ></MuiPhoneNumber> */}
                                        {/* <input type="text" defaultValue={myProfileObjc.mobile_no} className="form-control textbox" placeholder="" onChange={(e) => setMobilephone(e.target.value)} /> */}
                                        {/* <label for="mobile_no" className={mobilePhone != "" ? "input-has-value" : ""}>Mobile Phone</label>
                                    </div>
                                    <p className="form-input-error" >{mobilePhoneError}</p>
                                </div> */}
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="email" defaultValue={myProfileObjc.email} className="form-control textbox" placeholder="" disabled />
                                        <label htmlFor="email" className={emailId != "" ? "input-has-value" : ""}>Email Id</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder=""  disabled  />
                                        <label htmlFor="address" className={address != "" ? "input-has-value" : ""}>Address</label>
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
                                    disabled/>
                                 <p className="form-input-error"> {stateAndCityError} </p>
                                <div className="col-sm-12 form-group">
                                    <div className="tbox">
                                        <input type="text" defaultValue={myProfileObjc.address} className="form-control textbox" placeholder="" disabled />
                                        <label htmlFor="address" className={locationName != "" ? "input-has-value" : ""}>Location Name</label>
                                    </div>
                                    <p className="form-input-error" >{locationNameError}</p>
                                </div>
                                {isPrivileges && <div>
                                    <div className="section-title">
                                    <h2 className="buyertitle">Buyer Privileges</h2>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="radio input-group privileges">
                                            <input id="radio-privileges" name="radio" type="radio" value="1" checked={selectPrivilege} disabled  />
                                            <label htmlFor="radio-privileges" className="radio-label">Select Buyer Privileges</label>
                                        </div>
                                        <div className=" row adduserpageforminner">
                                            <div className="col-sm-6 form-group input-group">
                                                <input type="checkbox" id="buynow" value={buy_now == 0 ? 1 : 0} checked={buy_now == 1 ? true : false}  />
                                                <label htmlFor="buynow">Buy now</label>
                                            </div>
                                            <div className="col-sm-6 form-group input-group ">
                                                <input type="checkbox" id="cancelbid" value={cancel_bid == 0 ? 1 : 0} checked={cancel_bid == 1 ? true : false}  />
                                                <label htmlFor="cancelbid">Cancel the bid after 4 hours</label>
                                            </div>
                                            <div className="col-sm-6 form-group input-group ">
                                                <input type="checkbox" id="bid" value={bid == 0 ? 1 : 0} checked={bid == 1 ? true : false}   />
                                                <label htmlFor="bid">Bid</label>
                                            </div>
                                            <div className="col-sm-6 form-group input-group ">
                                                <input type="checkbox" id="proxybid" value={proxy_bid == 0 ? 1 : 0} checked={proxy_bid == 1 ? true : false} />
                                                <label htmlFor="proxybid">Proxy Bid</label>
                                            </div>
                                            <div className="col-sm-6 form-group input-group ">
                                                <input type="checkbox" id="counterbid" value={counter_bid == 0 ? 1 : 0} checked={counter_bid == 1 ? true : false}   />
                                                <label htmlFor="counterbid">Counter Bid</label>
                                            </div>
                                            <div className="col-sm-6 form-group input-group ">
                                                <input type="checkbox" id="lotfee" value={lot_fee == 0 ? 1 : 0} checked={lot_fee == 1 ? true : false}   />
                                                <label htmlFor="lotfee">Lot Fee</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                    <div className="radio input-group noprivileges">
                                        <input id="radio-noprivileges" name="radio" type="radio" value="0" checked = {deselectPrivilege}   />
                                        <label htmlFor="radio-noprivileges" className="radio-label">No privileges (Only View)</label>
                                    </div>
                                </div>
                                </div>}
                                <div className="col-lg-12 loginBtn">
                                    {/* <button type="submit" className="cta-btn">Update</button> */}
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

{isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />} 

            </main>
}
        </div>
    )
}

export default ViewBuyer;