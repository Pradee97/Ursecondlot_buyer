import React, {useState, useEffect} from 'react';
import API from "../../Services/BaseService";
import { useHistory,useLocation } from "react-router-dom";
import ls from 'local-storage';
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


const Login = () => {
  const history = useHistory();
  const location = useLocation();
 
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(()=>{
  //   localStorage.clear()
  // })

  const loginhandleSubmit = (event) => {
    // setOpenLoader(true);
    event.preventDefault();
    localStorage.setItem("islogedIn", false)
    let request = {
      email: emailId,
      password: password
    };
    API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/buyer/login", request)
      .then((response) => {
        console.log("resresponse.data.data", response.data.data)
        if (response.data.success == true) {
          ls.set('userDetails', response.data.data);
          if(response.data.data.local_flag == '0'){
            history.push("/ChangePassword");
          }else{
            localStorage.setItem("islogedIn", true)
            history.push("/carList");
          }
          
        } else {
          history.push("error");
          localStorage.setItem("islogedIn", false)
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
            <img alt="Google" src={process.env.PUBLIC_URL +"/images/Logo_final.png"} />
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
                <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
                <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <a href="#" className="back-to-top"><i className="ri-arrow-up-line"></i></a>
    </div>
  )
}

export default Login;