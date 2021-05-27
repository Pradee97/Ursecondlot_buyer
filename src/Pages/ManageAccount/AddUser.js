import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import ls from 'local-storage';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import Datetime from 'react-datetime';
import moment from 'moment';
const AddUser = () => {
	const history = useHistory();
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
	const [user_privileges,setUserPrivileges]=useState("");
	const [buy_now,setBuyNow]=useState("");
	const [cancel_bid,setCancelBid]=useState("");
	const [bid,setBid]=useState("");
	const [proxy_bid,setProxy_bid]=useState("");
	const [counter_bid,setCounter_bid]=useState("");
	const [lot_fee,setLot_fee]=useState("");
	

    const [isCommonPopupOpen, setIsCommonPopupOpen] = useState(false);
	const [option, setOption] = useState("");
	const [popupTitle, setPopupTitle] = useState("");
	const [popupMsg, setPopupMsg] = useState("");
	const [popupType, setPopupType] = useState("");
	const [popupActionType, setPopupActionType] = useState("");
	const [popupActionValue, setPopupActionValue] = useState("");
	const [popupActionPath, setPopupActionPath] = useState("");
	console.log("=====userDetails====>",userDetails)
	console.log("======>",userDetails.dealer_id)
	const getStateName = (stateData) => {
		setStateName(stateData)
	}
	const getCityName = (cityData) => {
		setCityName(cityData)
	}

	const getZipCodeId = (zipData) => {
		setZipcodeId(zipData)
	}
	const inputProps = {
		placeholder: 'DD/MM/YYYY',
		required: true
	};
	const toggleCommonPopup = () => {
        setIsCommonPopupOpen(!isCommonPopupOpen);
    }
	const yesterday = moment().subtract(1, 'day');
	const disablePastDt = current => {
		return current.isAfter(yesterday);
	};
	const registrationhandleSubmit = (event) => {
        
        event.preventDefault();		
		if(user_privileges==="1"){
			setBuyNow(1);
			setCancelBid(1);
			setBid(1);
			setProxy_bid(1);
			setCounter_bid(1);
			setLot_fee(1);
		}
        let request = {
			dealer_id:userDetails.dealer_id,
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
			buy_now:buy_now==="1"?1:0,
			cancel_bid:cancel_bid==="1"?1:0,
			bid:bid==="1"?1:0,
			proxy_bid:proxy_bid==="1"?1:0,
			counter_bid:counter_bid==="1"?1:0,
			lot_fee:lot_fee==="1"?1:0,
			local_flag: 0,
        };
		console.log("----request---->",request)
        API.post("buyer/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    toggleCommonPopup()
                    setPopupTitle("Dealer Registered successfully");
                    setPopupMsg("Please Activate your account with the link shared to the given email Id");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/buyers")
                } else {
                    toggleCommonPopup()
                    setPopupTitle("Error");
                    setPopupMsg("registration failed, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                toggleCommonPopup()
                setPopupTitle("Error");
                setPopupMsg(error, " Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            });
    }
	return (
		<div>
			<main id="main" class="inner-page">
				<div id="adduserpageinner" className="adduserpageinner">
					<div className="container" >
						<div className="adduserpageblock col-lg-12">
							<div className="section-title">
								<h2>Add User</h2>
							</div>
							<div className="row content">
								<div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
									<div className="mgaccountuser">
										<div className="mgaccountuserleft">
											<img src={process.env.PUBLIC_URL + "/images/userimg.jpg"} className="img-fluid" alt="..." />
										</div>
										<div className="mgaccountuserright">
											<h3>Fernand</h3>
											<div className="d-flex align-items-center">
												<p className="details"><img src={process.env.PUBLIC_URL + "/images/Path.svg"} className="img-fluid" alt="..." /><span>California, Cl</span></p>
											</div>

										</div>
									</div>
									<ManageAccountLinks />
								</div>
								<div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 adduserpagerightblock">
									<div className="adduserpage-inner">
										<div className="col-lg-12">
											<form class="adduserpageform" onSubmit={registrationhandleSubmit}>
												<div className="row">													
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="first_name" required maxLength="30" onChange={(e) => setFirstName(e.target.value)} />
															<label for="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="last_name" required maxLength="30" onChange={(e) => setLastName(e.target.value)} />
															<label for="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="phone_no" required onChange={(e) => setPhoneNumber(e.target.value)} />
															<label for="phone_no" className={phoneNumber != "" ? "input-has-value" : ""}>Phone</label>
														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" placeholder="" id="email" required onChange={(e) => setEmail(e.target.value)} />
															<label for="email" className={email != "" ? "input-has-value" : ""}>Email</label>

														</div>
													</div>
													<div className="col-sm-12 form-group">
														<div className="tbox">
															<input className="textbox " type="text" placeholder="" id="address" maxLength="300" required onChange={(e) => setAddress(e.target.value)} />
															<label for="address" className={address != "" ? "input-has-value" : ""}>Address</label>
														</div>
													</div>

													<StateAndCity
														setStateValue={getStateName}
														setCityValue={getCityName}
														setZipcodeValue={getZipCodeId}
													/>

													<div className="col-sm-8 form-group">
														<div className="tbox">
															{/* {/ <lable for="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
															<select id="drop" placeholder="" required className="form-control custom-select browser-default textbox" required onChange={(e) => setOption(e.target.value)}>
																<option disabled >How many years in car business</option>
																<option value="Less then 1">Less then 1</option>
																<option value="1-3">1-3</option>
																<option value="3-5">3-5</option>
																<option value="5-10">5-10</option>
																<option value="10-15">10-15</option>
																<option value="15-20">15-20</option>
																<option value="More then 20">More then 20</option>
															</select>

															<label for="no_years" className={"input-has-value"}>How many years in car business</label>
														</div>
													</div>


													<div className="col-sm-12 form-group scheduleMeeting">
														<h2 className="text-center">Schedule Meeting with our Agent</h2>
														<p>Thank you for interesting in our platform, Make you money and success.</p>
													</div>


													<div className="col-sm-6 form-group datePickerBlock ">
														<div className="tbox">
															<div className="textbox">
																<i class='bx bx-calendar'></i>
																<Datetime inputProps={inputProps} timeFormat={false} dateFormat="DD/MM/YYYY" isValidDate={disablePastDt} />
																<label for="meeting_date" className={date != "" ? "input-has-value" : ""}>Select Date</label>
															</div>
														</div>
													</div>
													<div className="col-sm-6 form-group timepicker">
														<div className="tbox">
															<input type="time" className="form-control textbox" placeholder="Select Time" required onChange={(e) => setTime(e.target.value)} />
															<label for="meeting_time" className={time != "" ? "input-has-value" : ""}>Select Time</label>
														</div>
													</div>
												</div>
												<div className="section-title">
													<h2>User Privileges</h2>
												</div>
												<div class="col-sm-12">
													<div class="radio input-group privileges">
														<input id="radio-privileges" name="radio" type="radio" value="1" onChange={(e) =>setUserPrivileges(e.target.value)}/>
														<label for="radio-privileges" class="radio-label">Select User Privileges</label>
													</div>

													<div class=" row adduserpageforminner">
														<div class="col-sm-6 form-group input-group">
															<input type="checkbox" id="buynow" value={buy_now==="1"?0:1} onChange={(e) =>setBuyNow(e.target.value)}/>
															<label for="buynow">Buy now</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="cancelbid" value={cancel_bid==="1"?0:1} onChange={(e) =>setCancelBid(e.target.value)}/>
															<label for="cancelbid">Cancel the bid after 4 hours</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="bid" value={bid==="1"?0:1} onChange={(e) =>setBid(e.target.value)}/>
															<label for="bid">Bid</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="proxybid" value={proxy_bid==="1"?0:1} onChange={(e) =>setProxy_bid(e.target.value)}/>
															<label for="proxybid">Proxy Bid</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="counterbid" value={counter_bid==="1"?0:1} onChange={(e) =>setCounter_bid(e.target.value)}/>
															<label for="counterbid">Counter Bid</label>
														</div>
														<div class="col-sm-6 form-group input-group ">
															<input type="checkbox" id="lotfee"  value={lot_fee==="1"?0:1} onChange={(e) =>setLot_fee(e.target.value)}/>
															<label for="lotfee">Lot Fee</label>
														</div>
													</div>
												</div>
												<div class="col-sm-12">
													<div class="radio input-group noprivileges">
														<input id="radio-noprivileges" name="radio" type="radio" value="0" onChange={(e) =>setUserPrivileges(e.target.value)}/>
														<label for="radio-noprivileges" class="radio-label">No privileges (Only View)</label>
													</div>
												</div>
												<div class="col-lg-12 loginBtn">
													<button class="cta-btn">Submit</button>
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
			</main>
		</div>
	);
};

export default AddUser;