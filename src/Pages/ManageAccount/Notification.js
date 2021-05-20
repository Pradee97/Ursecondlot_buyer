import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Button
} from 'antd';
import Popup from '../../Component/Popup/Popup';

import '../../Component/Popup/popup.css';


const Notification = () => {
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const [notification, setNotification] = useState("no");
    const [email, setEmail] = useState("no");
    const [sms, setSms] = useState("no");
    const [push_notification, setPush_notification] = useState("no");
	const [femail, setFavEmail] = useState("no");
    const [fsms, setFavSms] = useState("no");
	const [popupcontent,setPopupcontent] = useState ("");
	let userDetails = ls.get('userDetails');
   
    async function getNotification() {
        let request = {            
         buyer_id: userDetails.user_id,

        }; 
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/notification/condition', request);
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
            
		// console.log("check",buyer_id)
		let request = {
			buyer_id:userDetails.user_id,
			email:email,
			sms:sms,
			push_notification:push_notification,
			favorite_email:femail,
			favorite_sms:fsms,
			active:1,
			updatedAt:"23_05_2021"

			
		  };

	API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/notification/add",request)
	   .then((response) => {
		 console.log("res", response.data.success)
		if (response.data.success ) {
			togglePopup()
			setPopupcontent ("Buyer Notification Successfully Created")
			
		 } else {
			togglePopup()
			setPopupcontent ("Buyer Notification is not Created, Please try Again")
		
		 }
	   },
		 (error) => {

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
						<div className="mgaccountuser">
							<div className="mgaccountuserleft">
								<img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} className="img-fluid" alt="..."/>
							</div>
							<div className="mgaccountuserright">
								<h3>Fernand</h3>
								<div className="d-flex align-items-center">
									<p className="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} className="img-fluid" alt="..."/><span>California, Cl</span></p>
								</div>
									
							</div>
						</div>
						
						<div className="mgaccountuserlinks">
							<div className="userlinks">
								<li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
								<li className="active"><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt=""/><a href="/notification">Notification</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt=""/><a href="/paymentinfo">Payment</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt=""/><a href="documents.html">Document</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt=""/><a href="adduser.html">Add User</a></li>
							</div>
						</div>
					</div>
					<div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 notificationaccountrightblock">
						<div className="notificationrighttableblock"> 
							<h2>Bids</h2>
							<div className="notificationtabblock col-lg-12">
							<h3>Email</h3>
								<div className="row">
								<form className="bidsemailblock">
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailyupdate" checked = {email == "daily" ?  true: false} value="daily" name="radio" type="radio" onChange={(e) => setEmail(e.target.value)} />
											<label  for="radio-dailyupdate" className="radio-label">Daily Update</label>
											<p>You will receive an email daily of new bid activity</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-instanceemnail" checked = {email == "instant" ?  true: false} value="instant" name="radio" type="radio" onChange={(e) => setEmail(e.target.value)}/>
											<label  for="radio-instanceemnail" className="radio-label">Instant Email</label>
											<p>Don't miss any deal! we will send you emails immediately with any new bid activity</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-instemnail" checked = {email == "no" ?  true: false} value="no" name="radio" type="radio" onChange={(e) => setEmail(e.target.value)}/>
											<label  for="radio-instemnail" className="radio-label">Never</label>
											<p>you wont receive any emails for bid activity.</p>
										</div>
									</div>
								</form>
								</div>
							</div>
							
							<div className="notificationtabblock mt-3 pt-4 col-lg-12">
							<h3>SMS (Text Message)</h3>
								<div className="row">
								<form className="bidssmsblock">
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailysms" checked = {sms == "daily" ?  true: false} value="daily" name="radio" type="radio" onChange={(e) => setSms(e.target.value)}/>
											<label  for="radio-dailysms" className="radio-label">Daily Update</label>
											<p>You will receive an SMS daily of new bid activity</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailyinssms" checked = {sms == "instant" ?  true: false} value="instant" name="radio" type="radio" onChange={(e) => setSms(e.target.value)}/>
											<label  for="radio-dailyinssms" className="radio-label">Instant SMS</label>
											<p>Don't miss any deal! we will send you SMS immediately with any new bid activity</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailysmsnover" checked = {sms == "no" ?  true: false} value="no" name="radio" type="radio" onChange={(e) => setSms(e.target.value)}/>
											<label  for="radio-dailysmsnover" className="radio-label">Never</label>
											<p>you wont receive any SMS for bid activity.</p>
										</div>
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
											<input id="radio-dailynotificat" checked = {push_notification == "yes" ?  true: false} value="yes" name="radio" type="radio" onChange={(e) => setPush_notification(e.target.value)}/>
											<label  for="radio-dailynotificat" className="radio-label">Yes</label>
											<p>You will receive push notifications when any new bid activity directly to your mobile phone.</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailyno" checked = {push_notification == "no" ?  true: false} value="no" name="radio" type="radio" onChange={(e) => setPush_notification(e.target.value)}/>
											<label  for="radio-dailyno" className="radio-label">No</label>
											<p>you wont receive any push notification.</p>
										</div>
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
											<input id="radio-dailycarsno" checked = { femail== "daily" ?  true: false} value="daily" name="radio" type="radio" onChange={(e) => setFavEmail(e.target.value)}/>
											<label  for="radio-dailycarsno" className="radio-label">Daily Update</label>
											<p>You will receive a daily Email when new vehicle posted matching your Favorite cars</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailycarsnover" checked = {femail == "no" ?  true: false} value="no" name="radio" type="radio" onChange={(e) => setFavEmail(e.target.value)}/>
											<label  for="radio-dailycarsnover" className="radio-label">Never</label>
											<p>you wont receive any emails With fresh inventory.</p>
										</div>
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
											<input id="radio-dailysmct" checked = {fsms == "daily" ?  true: false} value="daily" name="radio" type="radio"  onChange={(e) => setFavSms(e.target.value)}/>
											<label  for="radio-dailysmct" className="radio-label">Daily Update</label>
											<p>You will receive a daily SMS when new vehicle posted matching your Favorite cars</p>
										</div>
									</div>
									
									<div className="col-lg-4 col-md-4">
										<div className="radio input-group">
											<input id="radio-dailysmtnover" checked = {fsms == "no" ?  true: false} value="no" name="radio" type="radio"  onChange={(e) => setFavSms(e.target.value)}/>
											<label  for="radio-dailysmtnover" className="radio-label">Never</label>
											<p>you wont receive any SMS With fresh inventory.</p>
										</div>
									</div>
									</form>
								</div>
							</div>
						</div>
						<div className="text-center">
							{/* <a href="#" className="save-more-btn">Save</a> */}
							<Button className="save-more-btn" onClick={savehandleclick}>Save</Button>
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
		  <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
           <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
          </div>
        </div>
      </div>
    </section>
	{isOpen && <Popup
      content={<>
    
    <div>
            <main id="main" class="inner-page">
                <div id="Successfullform" class="Successfullform">
                    <div class="container">
                        <div class="Successfullformblock col-lg-12">
                            <div class="row content">
                                <div class="modalcontent">
                                    <div class="Successfull-icon">
                                        {/* <img alt="" src={checkImg} /> */}
                                    </div>
                                    <div class="modalbody">
	 									<h2>{popupcontent}</h2>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
      </>}
      handleClose={togglePopup}
    />}
  </main>
 </div>
);
};


export default Notification;