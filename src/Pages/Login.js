import React from 'react';
import API from "../Services/BaseService";
import { useHistory } from "react-router-dom";

import ls from 'local-storage';

// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { store } from 'react-notifications-component';
import {
  Form,
  Input,
  Select,
  AutoComplete,
  Radio,
  notification,
  Spin,
} from 'antd';

import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';
import '../assets/css/style.css';

const Login = () => {
  const history = useHistory();
  

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const loginhandleSubmit = (event) => {
    // setOpenLoader(true);
    event.preventDefault();
    let request = {
      email: emailId,
      password: password
    };
    API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/buyer/login", request)
      .then((response) => {
        console.log("resresponse.data.data", response.data.data)
        if (response.data.success == true) {
          ls.set('userDetails', response.data.data);
          if(response.data.data.local_flag===0){
            history.push("/ChangePassword");
          }else{
            history.push("/carList");
          }
          
        } else {
          history.push("error");
        }
      },
        (error) => {

        });

  }
  
   
   
  
     

  
  return (

    <div>
      
      <main id="main" className="inner-page">
        <div className="col-lg-4 card loginBlock">
          <div className="dealar-login">
            <img alt="Google" src="Logo_final.png" />
          </div>
          <form onSubmit={loginhandleSubmit}>
            <h2 className="title"> Dealer login</h2>
           

            <div className="email-login">
		   <div className="tbox">
       <input className="textbox " type="text" placeholder="" id="uname" required onChange={(e) => setEmailId(e.target.value)} />
				 <label  for="uname" className={emailId !="" ? "input-has-value" : ""}>User Name</label>
			</div>
			 
			 <div className="tbox">
       <input className="textbox" type="password" placeholder="" id="psw" required onChange={(e) => setPassword(e.target.value)} />
				 <label for="psw" className={password != "" ? "input-has-value" : "" }>Password</label>
			 </div>
		  </div>
		  



            <div className="row">
              <div className="col-lg-6">
              <a className="forget-name" href="#">Forgot Username</a>
              </div>

              <div className="col-lg-6 forget">
                <a className="forget-pass" href="#">Forgot password</a>
              </div>
              <div className="col-lg-12 loginBtn">
                <button className="cta-btn">Log In</button>
                <p>Don't have an account? <a className="forget-name" href="registration">Become a Dealer</a></p>
              </div>
            </div>
          </form>
        </div>
        <section id="playstoreBlock" className="playstoreBlock">
          <div className="container">
            <div className="row content">
              <div className="col-lg-12">
                <img src="appstore.png" />
                <img src="googleplay.png" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>

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


  )
}

export default Login;