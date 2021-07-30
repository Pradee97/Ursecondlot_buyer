import React from 'react';
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Popover } from 'antd';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import Popup from '../../Component/Popup/Popup';
import '../../Component/Popup/popup.css';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import 'antd/dist/antd.css';


const Notification = () => {
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	}
	const [popupTitle, setPopupTitle] = useState("");
	const [popupMsg, setPopupMsg] = useState("");
	const [popupType, setPopupType] = useState("");
	const [popupActionType, setPopupActionType] = useState("");
	const [popupActionValue, setPopupActionValue] = useState("");
	const [popupActionPath, setPopupActionPath] = useState("")

	const [notification, setNotification] = useState("no");
	const [email, setEmail] = useState("no");
	const [sms, setSms] = useState("no");
	const [push_notification, setPush_notification] = useState("no");
	const [femail, setFavEmail] = useState("no");
	const [fsms, setFavSms] = useState("no");
	const [popupcontent, setPopupcontent] = useState("");
	let userDetails = ls.get('userDetails');
	const content = (
		<div>
			<Popover>
				<p>please reach out ursecondlot Admin</p>
			</Popover>
		</div>
	);
	let hover = false;
	var date = new Date()
	console.log("check", date)
	var date1 = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes();

	async function getNotification() {
		let request = {
			buyer_dealer_id: userDetails.buyer_dealer_id,

		};
		const state = API.post('notification/condition', request);
		state.then(res => {
			console.log("res", res.data.data)
			setNotification(res.data.data);
			setEmail(res.data.data.email)
			setSms(res.data.data.sms)
			setPush_notification(res.data.data.push_notification)
			setFavEmail(res.data.data.favorite_email)
			setFavSms(res.data.data.favorite_sms)
		})
			.catch(err => { console.log(err); });
	}
	useEffect(() => {
		getNotification();
		// fetchState();
	}, []);
	
	const savehandleclick = () => {

		let request = {
			buyer_dealer_id: userDetails.buyer_dealer_id,
			email: email,
			sms: sms,
			push_notification: push_notification,
			favorite_email: femail,
			favorite_sms: fsms,
			active: 1,
			updatedAt: date1


		};

		API.post("notification/add", request)
			.then((response) => {
				console.log("res", response.data.success)
				if (response.data.success) {
					togglePopup()
					setPopupTitle("Create Notification");
					setPopupMsg("Notification Successfully Created");
					setPopupType("success");
					setPopupActionType("close");
					setPopupActionValue("close");
					// setPopupActionPath("/notification")

				} else {
					togglePopup()
					setPopupTitle("Create Notification");
					setPopupMsg("Notification is not Created, Please try Again");
					setPopupType("error");
					setPopupActionType("close");
					setPopupActionValue("close");

				}
			},
				(error) => {
					togglePopup()
					setPopupTitle("Error");
					setPopupMsg( "Something went wrong, Please try Again");
					setPopupType("error");
					setPopupActionType("close");
					setPopupActionValue("close");
				});

	}

	return (
		<div>

			<main id="main" className="inner-page">


				<div id="notificationaccount" className="notificationaccount">
					<div className="container" >
						<div className="notificationaccountblock col-lg-12">
							<div className="section-title">
								<h2>Notification</h2>
							</div>
							<div className="row content">
								<div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
									
									<ManageAccountLinks />
								</div>
								<div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 notificationaccountrightblock">
									<div className="notificationrighttableblock">
										<h2>Bids</h2>
										<div className="notificationtabblock col-lg-12">
											<h3>Email</h3>
											<div className="row">
												<form className="bidsemailblock">
													<div className="col-lg-3 col-md-3">
														<div className="radio input-group">
															<input id="radio-instanceemnail" checked={email == "instant" ? true : false} value="instant" name="radio" type="radio" onChange={(e) => setEmail(e.target.value)} />
															<label htmlFor="radio-instanceemnail" className="radio-label">Instant Email</label>
															<p>Don't miss any deal! we will send you emails immediately with any new bid activity</p>
														</div>
													</div>
													<div className="col-lg-3 col-md-3">
														<div className="radio input-group">
															<input id="radio-dailyupdate" checked={email == "daily" ? true : false} value="daily" name="radio" type="radio" onChange={(e) => setEmail(e.target.value)} />
															<label htmlFor="radio-dailyupdate" className="radio-label">Daily Update</label>
															<p>You will receive an email daily of new bid activity</p>
														</div>
													</div>

													<div className="col-lg-3 col-md-3">
														<div className="radio input-group">
															<input id="radio-weeklyupdate" checked={email == "weekly" ? true : false} value="weekly" name="radio" type="radio" onChange={(e) => setEmail(e.target.value)} />
															<label htmlFor="radio-weeklyupdate" className="radio-label">Weekly Update</label>
															<p>You will receive an email weekly of new bid activity</p>
														</div>
													</div>
													<div className="col-lg-3 col-md-3"  >
														<Popover content={content} >
															<div className="radio input-group">
																<input id="radio-instemnail" checked={email == "no" ? true : false} value="no" name="radio" type="radio"   onChange={(e) => setEmail(e.target.value)} />
																<label htmlFor="radio-instemnail" className="radio-label">Never</label>
																<p>you wont receive any emails for bid activity.</p>
															</div>
														</Popover>,
													</div>
												</form>
											</div>
										</div>

										<div className="notificationtabblock mt-3 pt-4 col-lg-12">
											<h3>SMS (Text Message)</h3>
											<div className="row">
												<form className="bidssmsblock">
													<div className="col-lg-3 col-md-3">
														<div className="radio input-group">
															<input id="radio-dailyinssms" checked={sms == "instant" ? true : false} value="instant" name="radio" type="radio" onChange={(e) => setSms(e.target.value)} />
															<label htmlFor="radio-dailyinssms" className="radio-label">Instant SMS</label>
															<p>Don't miss any deal! we will send you SMS immediately with any new bid activity</p>
														</div>
													</div>
													<div className="col-lg-3 col-md-3">
														<div className="radio input-group">
															<input id="radio-dailysms" checked={sms == "daily" ? true : false} value="daily" name="radio" type="radio" onChange={(e) => setSms(e.target.value)} />
															<label htmlFor="radio-dailysms" className="radio-label">Daily Update</label>
															<p>You will receive an SMS daily of new bid activity</p>
														</div>
													</div>

													<div className="col-lg-3 col-md-3">
														<div className="radio input-group">
															<input id="radio-weeklysms" checked={sms == "weekly" ? true : false} value="weekly" name="radio" type="radio" onChange={(e) => setSms(e.target.value)} />
															<label htmlFor="radio-weeklysms" className="radio-label"> Weekly Update</label>
															<p>You will receive an SMS weekly of new bid activity</p>
														</div>
													</div>

													<div className="col-lg-3 col-md-3">
													<Popover content={content} >
														<div className="radio input-group">
															<input id="radio-dailysmsnover" checked={sms == "no" ? true : false} value="no" name="radio" type="radio"   onChange={(e) => setSms(e.target.value)} />
															<label htmlFor="radio-dailysmsnover" className="radio-label">Never</label>
															<p>you wont receive any SMS for bid activity.</p>
														</div>
														</Popover>
													</div>
												</form>
											</div>
										</div>

										<div className="notificationtabblock mt-3 pt-4 col-lg-12">
											<h3>Push notification(for Mobile Apllication)</h3>
											<div className="row">
												<form className="bidsnotiblock">
													<div className="col-lg-4 col-md-4">
														<div className="radio input-group">
															<input id="radio-dailynotificat" checked={push_notification == "yes" ? true : false} value="yes" name="radio" type="radio" onChange={(e) => setPush_notification(e.target.value)} />
															<label htmlFor="radio-dailynotificat" className="radio-label">Yes</label>
															<p>You will receive push notifications when any new bid activity directly to your mobile phone.</p>
														</div>
													</div>

													<div className="col-lg-4 col-md-4">
													<Popover content={content} >
														<div className="radio input-group">
															<input id="radio-dailyno" checked={push_notification == "no" ? true : false} value="no" name="radio" type="radio" onChange={(e) => setPush_notification(e.target.value)} />
															<label htmlFor="radio-dailyno" className="radio-label">No</label>
															<p>you wont receive any push notification.</p>
														</div>
														</Popover>
													</div>
												</form>
											</div>
										</div>
									</div>


									<div className="notificationrighttableblock favoritetableblock  mt-3 pt-4">
										<h2>Favorite Cars</h2>
										<div className="notificationtabblock mt-3 pt-4 col-lg-12">
											<h3>Email</h3>
											<div className="row">
												<form className="favoriteemailblock">
													<div className="col-lg-4 col-md-4">
														<div className="radio input-group">
															<input id="radio-dailycarsno" checked={femail == "daily" ? true : false} value="daily" name="radio" type="radio" onChange={(e) => setFavEmail(e.target.value)} />
															<label htmlFor="radio-dailycarsno" className="radio-label">Daily Update</label>
															<p>You will receive a daily Email when new vehicle posted matching your Favorite cars</p>
														</div>
													</div>
													<div className="col-lg-4 col-md-4">
														<div className="radio input-group">
															<input id="radio-weeklycarsno" checked={femail == "weekly" ? true : false} value="weekly" name="radio" type="radio" onChange={(e) => setFavEmail(e.target.value)} />
															<label htmlFor="radio-weeklycarsno" className="radio-label">Weekly Update</label>
															<p>You will receive a weekly Email when new vehicle posted matching your Favorite cars</p>
														</div>
													</div>

													<div className="col-lg-4 col-md-4">
													<Popover content={content} >
														<div className="radio input-group">
															<input id="radio-dailycarsnover" checked={femail == "no" ? true : false} value="no" name="radio" type="radio"   onChange={(e) => setFavEmail(e.target.value)} />
															<label htmlFor="radio-dailycarsnover" className="radio-label">Never</label>
															<p>you wont receive any emails With fresh inventory.</p>
														</div>
														</Popover>
													</div>
												</form>
											</div>
										</div>

										<div className="notificationtabblock mt-3 pt-4 col-lg-12">
											<h3>SMS (Text Message)</h3>
											<div className="row">
												<form className="favoritesmsblock">
													<div className="col-lg-4 col-md-4">
														<div className="radio input-group">
															<input id="radio-dailysmct" checked={fsms == "daily" ? true : false} value="daily" name="radio" type="radio" onChange={(e) => setFavSms(e.target.value)} />
															<label htmlFor="radio-dailysmct" className="radio-label">Daily Update</label>
															<p>You will receive a daily SMS when new vehicle posted matching your Favorite cars</p>
														</div>
													</div>

													<div className="col-lg-4 col-md-4">
														<div className="radio input-group">
															<input id="radio-weeklysmct" checked={fsms == "weekly" ? true : false} value="weekly" name="radio" type="radio" onChange={(e) => setFavSms(e.target.value)} />
															<label htmlFor="radio-weeklysmct" className="radio-label">Weekly Update</label>
															<p>You will receive a weekly SMS when new vehicle posted matching your Favorite cars</p>
														</div>
													</div>


													<div className="col-lg-4 col-md-4">
													<Popover content={content} >
														<div className="radio input-group">
															<input id="radio-dailysmtnover" checked={fsms == "no" ? true : false} value="no" name="radio" type="radio"   onChange={(e) => setFavSms(e.target.value)} />
															<label htmlFor="radio-dailysmtnover" className="radio-label">Never</label>
															<p>you wont receive any SMS With fresh inventory.</p>
														</div>
														</Popover>
													</div>
												</form>
											</div>
										</div>
									</div>
									<div className="text-center col-lg-12 loginBtn">
										{/* <a href="#" className="save-more-btn">Save</a> */}
										<Button className="save-more-btn cta-btn" onClick={savehandleclick}>Save</Button>
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


export default Notification;