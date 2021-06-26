import React, {useState, useEffect} from 'react';
import API from "../../Services/BaseService";
import { useHistory,useLocation } from "react-router-dom";
import ls from 'local-storage';
import { store } from 'react-notifications-component';
import { useForm } from "react-hook-form";
import { Button } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const {state} = useLocation();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timeout, setTimeout] = useState("");
  const [errors, setErrors] =useState({email:"", password:""})
  const[showPwd,setShowPwd]=useState(false);
  
  useEffect(()=>{
    // localStorage.clear()
    localStorage.setItem("islogedIn", false)
    let request = {
      country_id: 1
  };
  const state = API.post('state/condition', request);
  state.then(res => {
      console.log("res", res.data.data)      
  })
      .catch(err => { console.log(err); });
  }, [])

  function togglepwd(e){
    e.preventDefault();
    setShowPwd(!showPwd);
  }

  const loginhandleSubmit = (event) => {
    event.preventDefault();
    setErrors({email:"", password:""})
    if(!emailId) { setErrors({email:"email id is required", password:""}); return}
    else if( emailId && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(emailId) ) {
      setErrors({email:"Must match the email format", password:""})
    }
    else if(!password) { setErrors({email:"", password:"passwaord is required"}); return}

    localStorage.setItem("islogedIn", false)
    let request = {
      email: emailId,
      password: password
    };
    API.post("buyer/login", request)
      .then((response) => {
        console.log("resresponse.data.data", response.data.data)
        if (response.data.success == true) {
          ls.set('userDetails', response.data.data);
          if(response.data.data.local_flag == '0'){
            history.push("/changepassword");
          }else{
            localStorage.setItem("islogedIn", true)
            localStorage.getItem("loadTime") !==null ? localStorage.setItem("loadTime", [localStorage.getItem("loadTime"),...[Date.now()]]) : 
            localStorage.setItem("loadTime", [Date.now()])
            state?.from?.pathname !=="" && state?.from?.pathname !== undefined?  history.push(state.from.pathname) :  history.push("/carList");            
          }
          
        } else {
          // localStorage.setItem("islogedIn", false)
          setTimeout(() => {
          setErrorMessage("Please provide correct Email/Password");
        }, 100);
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
        <input className="textbox " type="text" placeholder="" id="uname" name="email"
          onChange={(e) => setEmailId(e.target.value)} />
				 <label  for="uname" className={emailId !="" ? "input-has-value" : ""}>User Name</label>
         <p className="form-input-error">{errors.email}</p>
			</div>
			 
			 <div className="tbox">
        <input className="textbox" type={showPwd?"text":"password"} placeholder="" id="psw" name="password"
          onChange={(e) => setPassword(e.target.value)} 
         />
				 <label for="psw" className={password != "" ? "input-has-value" : "" }>Password</label><i for ="psw" className="passwordeye" onClick={togglepwd}>{eye}</i>
         <p className="form-input-error">{errors.password}</p>
			 </div>
		  </div>
            <div className="row">
              <div className="col-lg-6 forget-username">
              {/* <a className="forget-name" href="/forgotEmail">Forgot Username</a> */}
              <Button className="forget-name" onClick={() => history.push("/forgotEmail")}>Forgot Username</Button>
              </div>

              <div className="col-lg-6 forget">
                {/* <a className="forget-pass" href="/forgotpasswordemail">Forgot password</a> */}
              <Button className="forget-pass" onClick={() => history.push("/forgotpasswordemail")}>Forgot password</Button>
              </div>
               <p className="form-input-error">{errorMessage}</p>
              <div className="col-lg-12 loginBtn">
                <button className="cta-btn">Log In</button>
                {/* <p>Don't have an account? <a className="forget-name" href="registration">Become a Dealer</a></p> */}
                <p>Don't have an account?<Button className="forget-name" onClick={() => history.push("/registration")}>Become a Dealer</Button></p>
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