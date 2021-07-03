import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import ls from 'local-storage';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { useForm } from "react-hook-form";
import Datetime from 'react-datetime';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import MuiPhoneNumber from 'material-ui-phone-number';

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
	const [buy_now, setBuyNow] = useState("");
	const [cancel_bid, setCancelBid] = useState("");
	const [bid, setBid] = useState("");
	const [proxy_bid, setProxy_bid] = useState("");
	const [counter_bid, setCounter_bid] = useState("");
	const [lot_fee, setLot_fee] = useState("");
	const [option, setOption] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [doc,setDoc]=useState("");
	const [popupTitle, setPopupTitle] = useState("");
	const [popupMsg, setPopupMsg] = useState("");
	const [popupType, setPopupType] = useState("");
	const [popupActionType, setPopupActionType] = useState("");
	const [popupActionValue, setPopupActionValue] = useState("");
	const [popupActionPath, setPopupActionPath] = useState("")

	console.log("=====userDetails====>", userDetails)
	console.log("======>", userDetails.dealer_id)
	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	const getFiles=(file)=>{
        setDoc(file);
		console.log("file=====>",file)
      }
	const getStateName = (stateData) => {
		setStateName(stateData)
	}
	const getCityName = (cityData) => {
		setCityName(cityData)
	}
	const setUserPrivileges = (e) => {
		setBuyNow("");
		setCancelBid("");
		setBid("");
		setProxy_bid("");
		setCounter_bid("");
		setLot_fee("");
	}

	const getZipCodeId = (zipData) => {
		setZipcodeId(zipData)
	}
	const inputProps = {
		placeholder: 'DD/MM/YYYY',
		required: true
	};

	const yesterday = moment().subtract(1, 'day');
	const disablePastDt = current => {
		return current.isAfter(yesterday);
	};
	const registrationhandleSubmit = (data) => {

		// event.preventDefault();
		
		let request = {
			dealer_id: userDetails.dealer_id,
			first_name: firstName,
			last_name: lastName,
			email: email,
			phone_no: phoneNumber,
			address: address,
			active: "0",
			country_id: "1",
			state_id: stateName,
			city_id: cityName,
			zipcode_id: zipCodeId,
			no_years: option,
			local_flag: 0,
			buy_now: buy_now === "1" ? 1 : 0,
			cancel_bid: cancel_bid === "1" ? 1 : 0,
			bid: bid === "1" ? 1 : 0,
			proxy_bid: proxy_bid === "1" ? 1 : 0,
			counter_bid: counter_bid === "1" ? 1 : 0,
			lot_fee: lot_fee === "1" ? 1 : 0,
			local_flag: 0,
			image:doc===""?doc:doc.length>0?doc:[doc],
		};
		console.log("----request---->", request)
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
	function handleOnChange(value) {
        setPhoneNumber(value);
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
															 {...register("firstName", {
																required: "This input is required.",
																maxLength: {
																	value: 50,
																	message: "This input must not exceed 50 characters"
																  }
															  })}
															onChange={(e) => setFirstName(e.target.value)} />
															<label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
															<p className="form-input-error">{errors.firstName?.message}</p>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="last_name"  maxLength="30" name="lastName"
															 {...register("lastName", {
																required: "This input is required.",
																maxLength: {
																	value: 50,
																	message: "This input must not exceed 50 characters"
																  }
															  })}
															onChange={(e) => setLastName(e.target.value)} />
															<label htmlFor="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
															<p className="form-input-error">{errors.lastName?.message}</p>
														</div>
													</div>
												
													<div className="col-sm-12 form-group ">
														<div className="tbox phoneNumberfield">
														<MuiPhoneNumber id="phone_no" name="phoneNumber" defaultCountry={'us'} onlyCountries={['us']}  className="textbox" 
															 {...register("phoneNumber", {
																required: "This input is required.",
																
																	minLength: {
																	value: 17,
																	message: "This input must have 10 digits"
																  }
															})}
															// onChange={(e) => setPhoneNumber(e.target.value)} />
															onChange={handleOnChange} ></MuiPhoneNumber>
															<label for="phone_no" className={"input-has-value"}>Phone</label>
												    	</div>
														<p className="form-input-error">{errors.phoneNumber?.message}</p>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox" type="text"  placeholder="" id="email" name="email"
															 {...register("email", {
																required: "This input is required.",
																pattern: {
																value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
																message: "Must match the email format"
																}
															})}
															onChange={(e) => setEmail(e.target.value)} />
															<label htmlFor="email" className={email != "" ? "input-has-value" : ""}>Email</label>
															<p className="form-input-error">{errors.email?.message}</p>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="address" maxLength="300" name="address"
															 {...register("address", {
																required: "This input is required.",
																maxLength: {
																	value: 150,
																	message: "This input must not exceed 150 characters"
																  }
															  })}
															onChange={(e) => setAddress(e.target.value)} />
															<label htmlFor="address" className={address != "" ? "input-has-value" : ""}>Address</label>
															<p className="form-input-error">{errors.address?.message}</p>
														</div>
													</div>

													<StateAndCity
														setStateValue={getStateName}
														setCityValue={getCityName}
														setZipcodeValue={getZipCodeId}
													/>

													<div className="col-sm-8 form-group selectTbox">
														<div className="tbox">
															{/* {/ <lable for="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
															<select id="drop" placeholder="" name="dropoption" className="form-control custom-select browser-default textbox" 
															 {...register("dropoption", {
																required: "This input is required.",
																maxLength: {
																	value: 50,
																	message: "This input must not exceed 50 characters"
																  }
															  })}
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
															<p className="form-input-error">{errors.dropoption?.message}</p>
														</div>
													</div>

												</div>
												<div className="section-title">
													<h2 className="buyertitle">Buyer Privileges</h2>
												</div>
												<div className="col-sm-12">
													<div className="radio input-group privileges">
														<input id="radio-privileges" name="radio" type="radio" value="1" onChange={(e) => setUserPrivileges(e.target.value)} />
														<label htmlFor="radio-privileges" className="radio-label">Select Buyer Privileges</label>
													</div>

													<div className=" row adduserpageforminner">
														<div className="col-sm-6 form-group input-group">
															<input type="checkbox" id="buynow" value={buy_now === "1" ? 0 : 1} onChange={(e) => setBuyNow(e.target.value)} />
															<label htmlFor="buynow">Buy now</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="cancelbid" value={cancel_bid === "1" ? 0 : 1} onChange={(e) => setCancelBid(e.target.value)} />
															<label htmlFor="cancelbid">Cancel the bid after 4 hours</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="bid" value={bid === "1" ? 0 : 1} onChange={(e) => setBid(e.target.value)} />
															<label htmlFor="bid">Bid</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="proxybid" value={proxy_bid === "1" ? 0 : 1} onChange={(e) => setProxy_bid(e.target.value)} />
															<label htmlFor="proxybid">Proxy Bid</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="counterbid" value={counter_bid === "1" ? 0 : 1} onChange={(e) => setCounter_bid(e.target.value)} />
															<label htmlFor="counterbid">Counter Bid</label>
														</div>
														<div className="col-sm-6 form-group input-group ">
															<input type="checkbox" id="lotfee" value={lot_fee === "1" ? 0 : 1} onChange={(e) => setLot_fee(e.target.value)} />
															<label htmlFor="lotfee">Lot Fee</label>
														</div>
													</div>
												</div>
												<div className="col-sm-12">
													<div className="radio input-group noprivileges">
														<input id="radio-noprivileges" name="radio" type="radio" value="0" onChange={(e) => setUserPrivileges(e.target.value)} />
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