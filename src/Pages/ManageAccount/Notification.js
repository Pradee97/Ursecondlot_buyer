import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Button
} from 'antd';
import googleApiKey from '../../Constant/config.js'

import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/icofont/icofont.min.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/venobox/venobox.css';
import '../../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../../assets/vendor/aos/aos.css';


import '../../assets/css/style.css';



const Notification = () => {
    const history = useHistory();
    const [notification, setNotification] = useState("");

    async function getNotification() {
        let request = {
            buyer_id: 1
        };
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/notification/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setNotification(res.data.data);
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
			buyer_id:1
			
		  };

	API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/user_active/update",request)
	   .then((response) => {
		 console.log("res", response.data.success)
		if (response.data.success ) {
			history.push("#");
		   //history.push("/login");
		 } else {
		   history.push("/error");
		 }
	   },
		 (error) => {

		 });

   }

    return (
        <div>

<main id="main" class="inner-page">
   
   
    <div id="notificationaccount" class="notificationaccount">
		<div class="container" >
			<div class="notificationaccountblock col-lg-12">
				<div class="section-title">
				  <h2>Notification</h2>
				</div>
				<div class="row content">
					<div class="col-lg-3 col-md-4 col-sm-12 accountleftblock">
						<div class="mgaccountuser">
							<div class="mgaccountuserleft">
								<img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} class="img-fluid" alt="..."/>
							</div>
							<div class="mgaccountuserright">
								<h3>Fernand</h3>
								<div class="d-flex align-items-center">
									<p class="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} class="img-fluid" alt="..."/><span>California, Cl</span></p>
								</div>
									
							</div>
						</div>
						
						<div class="mgaccountuserlinks">
							<div class="userlinks">
								<li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} class="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
								<li class="active"><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} class="img-fluid" alt=""/><a href="/notification">Notification</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} class="img-fluid" alt=""/><a href="/payment">Payment</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} class="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} class="img-fluid" alt=""/><a href="documents.html">Document</a></li>
								<li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} class="img-fluid" alt=""/><a href="adduser.html">Add User</a></li>
							</div>
						</div>
					</div>
					<div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 notificationaccountrightblock">
						<div class="notificationrighttableblock"> 
							<h2>Bids</h2>
							<div class="notificationtabblock col-lg-12">
							<h3>Email</h3>
								<div class="row">
								<form class="bidsemailblock">
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailyupdate" name="radio" type="radio" />
											<label  for="radio-dailyupdate" class="radio-label">Daily Update</label>
											<p>You will receive an email daily of new bid activity</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-instanceemnail" name="radio" type="radio"/>
											<label  for="radio-instanceemnail" class="radio-label">Instant Email</label>
											<p>Don't miss any deal! we will send you emails immediately with any new bid activity</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-instemnail" name="radio" type="radio"/>
											<label  for="radio-instemnail" class="radio-label">Never</label>
											<p>you wont receive any emails for bid activity.</p>
										</div>
									</div>
								</form>
								</div>
							</div>
							
							<div class="notificationtabblock mt-3 pt-4 col-lg-12">
							<h3>SMS (Text Message)</h3>
								<div class="row">
								<form class="bidssmsblock">
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailysms" name="radio" type="radio"/>
											<label  for="radio-dailysms" class="radio-label">Daily Update</label>
											<p>You will receive an SMS daily of new bid activity</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailyinssms" name="radio" type="radio"/>
											<label  for="radio-dailyinssms" class="radio-label">Instant SMS</label>
											<p>Don't miss any deal! we will send you SMS immediately with any new bid activity</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailysmsnover" name="radio" type="radio"/>
											<label  for="radio-dailysmsnover" class="radio-label">Never</label>
											<p>you wont receive any SMS for bid activity.</p>
										</div>
									</div>
								</form>
								</div>
							</div>
							
							<div class="notificationtabblock mt-3 pt-4 col-lg-12">
							<h3>Push notification(for Mobile Apllication)</h3>
								<div class="row">
								<form class="bidsnotiblock">
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailynotificat" name="radio" type="radio"/>
											<label  for="radio-dailynotificat" class="radio-label">Yes</label>
											<p>You will receive push notifications when any new bid activity directly to your mobile phone.</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailyno" name="radio" type="radio"/>
											<label  for="radio-dailyno" class="radio-label">No</label>
											<p>you wont receive any push notification.</p>
										</div>
									</div>
									</form>
								</div>
							</div>
						</div>
						
						
						<div class="notificationrighttableblock favoritetableblock  mt-3 pt-4"> 
							<h2>Favorite Cars</h2>
							<div class="notificationtabblock mt-3 pt-4 col-lg-12">
								<h3>Email</h3>
								<div class="row">
								<form class="favoriteemailblock">
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailycarsno" name="radio" type="radio"/>
											<label  for="radio-dailycarsno" class="radio-label">Daily Update</label>
											<p>You will receive a daily Email when new vehicle posted matching your Favorite cars</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailycarsnover" name="radio" type="radio"/>
											<label  for="radio-dailycarsnover" class="radio-label">Never</label>
											<p>you wont receive any emails With fresh inventory.</p>
										</div>
									</div>
									</form>
								</div>
							</div>
							
							<div class="notificationtabblock mt-3 pt-4 col-lg-12">
								<h3>SMS (Text Message)</h3>
								<div class="row">
								<form class="favoritesmsblock">
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailysmct" name="radio" type="radio"/>
											<label  for="radio-dailysmct" class="radio-label">Daily Update</label>
											<p>You will receive a daily SMS when new vehicle posted matching your Favorite cars</p>
										</div>
									</div>
									
									<div class="col-lg-4 col-md-4">
										<div class="radio input-group">
											<input id="radio-dailysmtnover" name="radio" type="radio"/>
											<label  for="radio-dailysmtnover" class="radio-label">Never</label>
											<p>you wont receive any SMS With fresh inventory.</p>
										</div>
									</div>
									</form>
								</div>
							</div>
						</div>
						<div class="text-center">
							{/* <a href="#" class="save-more-btn">Save</a> */}
							<Button class="save-more-btn" onClick={savehandleclick}>Save</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>

   

    
    <section id="playstoreBlock" class="playstoreBlock">
      <div class="container">


        <div class="row content">
          <div class="col-lg-12">
		  <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
           <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
		   
          </div>
         
        </div>

      </div>
    </section>

   

 

  </main>
       <script src="assets/vendor/jquery/jquery.min.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
            <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="assets/vendor/venobox/venobox.min.js"></script>
            <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/js/main.js"></script>
 </div>


    );
};

export default Notification;