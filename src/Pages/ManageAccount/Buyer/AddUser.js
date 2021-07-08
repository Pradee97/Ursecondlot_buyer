import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../../Services/BaseService";
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks"
import ls from 'local-storage';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity';
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import { useForm } from "react-hook-form";
import Datetime from 'react-datetime';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import MuiPhoneNumber from 'material-ui-phone-number';
import PhoneInput from 'react-phone-number-input/input';

const AddUser = () => {
	const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm();

	let userDetails = ls.get('userDetails');
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [stateName, setStateName] = useState("");
	const [cityName, setCityName] = useState("");
	const [zipCodeId, setZipcodeId] = useState("");
	const [buy_now, setBuyNow] = useState(0);
	const [cancel_bid, setCancelBid] = useState(0);
	const [bid, setBid] = useState(0);
	const [proxy_bid, setProxy_bid] = useState(0);
	const [counter_bid, setCounter_bid] = useState(0);
	const [lot_fee, setLot_fee] = useState(0);
	const [option, setOption] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [doc,setDoc]=useState("");
	const [popupTitle, setPopupTitle] = useState("");
	const [popupMsg, setPopupMsg] = useState("");
	const [popupType, setPopupType] = useState("");
	const [popupActionType, setPopupActionType] = useState("");
	const [popupActionValue, setPopupActionValue] = useState("");
	const [popupActionPath, setPopupActionPath] = useState("")
	const [selectPivilege, setSelectPivilege] = useState(false)
	const [deselectPivilege, setDeselectPivilege] = useState(true)
	const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailError, setEmailError] = useState("");
	const [addressError, setAddressError] = useState("");
	const [stateAndCityError, setStateAndCityError] = useState("");
	const [optionError, setoptionError] = useState("");
	const [state,setState]=useState("1");
    const [city,setCity]=useState("1");
    const [zipcode,setZipcode]=useState("1");


	console.log("=====userDetails====>", userDetails)
	console.log("======>", userDetails.dealer_id)
	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	const getFiles=(file)=>{
        setDoc(file);
		console.log("file=====>",file)
      }

	
	const setUserPrivileges = (data) => {
		if(data==0){
			setBuyNow(0);
			setCancelBid(0);
			setBid(0);
			setProxy_bid(0);
			setCounter_bid(0);
			setLot_fee(0);
			setDeselectPivilege(true)
			setSelectPivilege(false)
		}
		else{
			setDeselectPivilege(false)
			setSelectPivilege(true)
		}
		
	}


	const inputProps = {
		placeholder: 'DD/MM/YYYY',
		required: true
	};

	const yesterday = moment().subtract(1, 'day');
	const disablePastDt = current => {
		return current.isAfter(yesterday);
	};
	function formatMobileNO(value){
        var x = value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
    
        console.log("value of x",x);
        value = '+'+ x[1]+'('+ x[2] +')' + x[3] + '-' + x[4];
        console.log("mobileno",value);
        return value;
     }
	const registrationhandleSubmit = (data) => {
		// event.preventDefault();
		
        setFirstNameError("") 
        setLastNameError("")
        setPhoneNumberError("") 
        setEmailError("") 
        setAddressError("") 
		setoptionError("")
		setStateAndCityError("")
		

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
        if(!phoneNumber){
            setPhoneNumberError("Phone Number is required")
            return;
        }
        else if(phoneNumber.length<12 ){
            setPhoneNumberError("Phone Number must have 10 digits ")
            return;
        }
        if(!email){
            setEmailError("Email  is required")
            return;
        }
        else if(email && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)){
            setEmailError("Email  Must match the format")
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
		if(!stateName){
            setStateAndCityError("state is required")
            return
        }
        if(!cityName){
            setStateAndCityError("city is required")
             return
        }
        if(!zipCodeId){
            setStateAndCityError("zipcode is required")
             return
        }
        if(!option){
            setoptionError("How many years in car business is required")
            return;
        }
       
		
		
		
			
			let request = {
				dealer_id: userDetails.dealer_id,
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone_no: formatMobileNO(phoneNumber),
				address: address,
				active: "0",
				country_id: "1",
				state_id: stateName,
				city_id: cityName,
				zipcode_id: zipCodeId,
				no_years: option,
				local_flag: 0,
				// buy_now: buy_now === 1 ? 1 : 0,
				// cancel_bid: cancel_bid === 1 ? 1 : 0,
				// bid: bid === 1 ? 1 : 0,
				// proxy_bid: proxy_bid === 1 ? 1 : 0,
				// counter_bid: counter_bid === 1 ? 1 : 0,
				// lot_fee: lot_fee === 1 ? 1 : 0,
				buy_now: buy_now,
				cancel_bid: cancel_bid,
				bid: bid,
				proxy_bid: proxy_bid,
				counter_bid: counter_bid,
				lot_fee: lot_fee,
				local_flag: 0,
				image:doc===""?doc:doc.length>0?doc:[doc],
			};
			console.log("----request---->", request);
		API.post("buyer/add", request)
			.then((response) => {
				if (response.data.success) {
					const { data } = response;
					console.log("response", response)
					togglePopup()
					setPopupTitle("Create AddUser");
					setPopupMsg("AddUser Successfully Created");
					setPopupType("success");
					setPopupActionType("redirect");
					setPopupActionValue("ok");
					setPopupActionPath("/buyers")

				} else {
					togglePopup()
					setPopupTitle("Error");
					setPopupMsg("AddUser failed, Please try Again");
					setPopupType("error");
					setPopupActionType("close");
					setPopupActionValue("close");
				}
			}, (error) => {
				// setOpenLoader(false);
				// console.log(error);
				togglePopup()
				setPopupTitle("Error");
				setPopupMsg("Something went wrong, Please try Again");
				setPopupType("error");
				setPopupActionType("close");
				setPopupActionValue("close");
			});	

		
}

const getStateName = (stateData) => {
	setStateName(stateData)
	setCityName(null)
	setZipcodeId(null)
}

const getCityName = (cityData) => {
	setCityName(cityData)
	setZipcodeId(null)
}

const getZipCodeId = (zipData) => {
	setZipcodeId(zipData)
}

	
	function handleOnChange(value) {
        setPhoneNumber(value);
     }

	 const PivilegeDate = (data, privilegeType) => {
		privilegeType === "buy_now" && setBuyNow( data === 0 ? 1 : 0 );
		privilegeType === "cancel_bid"  && setCancelBid( data === 0 ? 1 : 0 );
		privilegeType === "bid" && setBid( data === 0 ? 1 : 0 );
		privilegeType === "proxy_bid" && setProxy_bid( data === 0 ? 1 : 0 );
		privilegeType === "counter_bid" && setCounter_bid( data === 0 ? 1 : 0 );
		privilegeType === "lot_fee" && setLot_fee( data === 0 ? 1 : 0 );
	 }
	return (
		<div>
			<main id="main" className="inner-page">
				<div id="adduserpageinner" className="adduserpageinner">
					<div className="container" >
						<div className="adduserpageblock col-lg-12">
							<div className="section-title">
								<h2>Add Buyer</h2>
							</div>
							<div className="row content">
								<div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">

									<ManageAccountLinks />
								</div>
								<div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 adduserpagerightblock">
									<div className="adduserpage-inner">
										<div className="col-lg-12">
											<form class="adduserpageform" onSubmit={handleSubmit(registrationhandleSubmit)}>
												<div className="row">

													<div className="section-title">
														<button className="back-btn-paymentform backBtn" onClick={() => history.push("/buyers")}><i class="icofont-arrow-left"></i> Back</button>
														<h2>Buyer Details</h2>
													</div>
													<div className="col-sm-12 form-group">

													<div className="user-upload-btn-wrapper">
														{doc===""?<img alt="" src="adduser.jpg" src={process.env.PUBLIC_URL + "/images/adduser.jpg"} ></img>:
														<img alt="" src="adduser.jpg" src={doc.base64} ></img>														
														}
														<span class="proCamera"></span>
														<FileBase64 onDone={getFiles} type="hidden" />
														
														{/* <button>  <img alt="" for="upload" src="adduser.jpg"  /></button>  */}
														
													</div>
													</div>

													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="first_name"  maxLength="30" name="firstName"												
															onChange={(e) => setFirstName(e.target.value)} />
															<label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
															<p className="form-input-error" >{firstNameError}</p>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="last_name"  maxLength="30" name="lastName"
															onChange={(e) => setLastName(e.target.value)} />
															<label htmlFor="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
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
														<PhoneInput id="phone_no" name="phoneNumber" country="US" className="textbox" maxLength="14" minLength="14"
															onChange={handleOnChange} ></PhoneInput>
															<label for="phone_no" className={"input-has-value"}>Phone</label>
												    	</div>
														<p className="form-input-error" >{phoneNumberError}</p>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox" type="text"  placeholder="" id="email" name="email"
															onChange={(e) => setEmail(e.target.value)} />
															<label htmlFor="email" className={email != "" ? "input-has-value" : ""}>Email</label>
															<p className="form-input-error" >{emailError}</p>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="address" maxLength="300" name="address"
															onChange={(e) => setAddress(e.target.value)} />
															<label htmlFor="address" className={address != "" ? "input-has-value" : ""}>Address</label>
															<p className="form-input-error" >{addressError}</p>
														</div>
													</div>

													<StateAndCity
														setStateValue={getStateName}
														setCityValue={getCityName}
														setZipcodeValue={getZipCodeId}
													/>
													<div className="col-sm-12 form-group">
                                                    <p className="form-input-error"> {stateAndCityError}</p>
                                                    </div>													

													<div className="col-sm-8 form-group selectTbox">
														<div className="tbox">
															{/* {/ <lable for="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
															<select id="drop" placeholder="" name="dropoption" className="form-control custom-select browser-default textbox" 
															onChange={(e) => setOption(e.target.value)}>
																{/* <option disabled >How many years in car business</option> */}
																<option value="Less then 1">Less then 1</option>
																<option value="1-3">1-3</option>
																<option value="3-5">3-5</option>
																<option value="5-10">5-10</option>
																<option value="10-15">10-15</option>
																<option value="15-20">15-20</option>
																<option value="More then 20">More then 20</option>
															</select>

															<label htmlFor="no_years" className={"input-has-value"}>How many years in car business</label>
															<p className="form-input-error" >{optionError}</p>
														</div>
													</div>

												</div>
												<div className="section-title">
													<h2 className="buyertitle">Buyer Privileges</h2>
												</div>
												<div className="col-sm-12">
													<div className="radio input-group privileges">
														<input id="radio-privileges" name="radio" type="radio" value= {1} checked={selectPivilege} onChange={(e) => setUserPrivileges(e.target.value)} />
														<label htmlFor="radio-privileges" className="radio-label">Select Buyer Privileges</label>
													</div>

													<div className=" row adduserpageforminner">
														<div className="col-sm-6 form-group input-group">
															<input type="checkbox" id="buynow" disabled={ deselectPivilege }  checked = { buy_now == 0 ? false : true } value={buy_now == 0 ? 1 : 0 } onChange={(e) => setBuyNow(e.target.value)} />
															<label htmlFor="buynow">Buy now</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="cancelbid" disabled={ deselectPivilege }  checked = { cancel_bid == 0 ? false : true } value={cancel_bid == 0 ? 1 : 0 } onChange={(e) => setCancelBid(e.target.value)} />
															<label htmlFor="cancelbid">Cancel the bid after 4 hours</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="bid" disabled={ deselectPivilege }  checked = { bid == 0 ? false : true } value={bid == 0 ? 1 : 0 } onChange={(e) => setBid(e.target.value)}/>
															<label htmlFor="bid">Bid</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="proxybid" disabled={ deselectPivilege }  checked = { proxy_bid == 0 ? false : true } value={proxy_bid == 0 ? 1 : 0 } onChange={(e) => setProxy_bid(e.target.value)} />
															<label htmlFor="proxybid">Proxy Bid</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="counterbid" disabled={ deselectPivilege }  checked = { counter_bid == 0 ? false : true } value={counter_bid == 0 ? 1 : 0 } onChange={(e) => setCounter_bid(e.target.value)} />
															<label htmlFor="counterbid">Counter Bid</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="lotfee" disabled={ deselectPivilege }  checked = { lot_fee == 0 ? false : true } value={lot_fee == 0 ? 1 : 0 } onChange={(e) => setLot_fee(e.target.value)} />
															<label htmlFor="lotfee">Lot Fee</label>
														</div>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="radio input-group noprivileges">
														<input id="radio-noprivileges" name="radio" type="radio" value={0} checked = {deselectPivilege} onChange={(e) => setUserPrivileges(e.target.value)} />
														<label htmlFor="radio-noprivileges" className="radio-label">No privileges (Only View)</label>
													</div>
												</div>
												<div className="col-lg-12 loginBtn">
													<button className="cta-btn">Submit</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
	);
};
export default AddUser;