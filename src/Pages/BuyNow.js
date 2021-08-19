import React , {useState, useEffect} from 'react';
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import API from "../Services/BaseService";
import Logo from '../assets/img/Logo_final.png';

const BuyNow =(props) =>{

    const { id } = useParams();
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
    const eye = <FontAwesomeIcon icon={faEye} />;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [timeout, setTimeout] = useState("");
    const [errors, setErrors] =useState({email:"", password:""})
    const[showPwd,setShowPwd]=useState(false);

    function togglepwd(e){
        e.preventDefault();
        setShowPwd(!showPwd);
    }

    const CarBuy =()=>{

        console.log("inside addremove");
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            car_id:id,
            email:email,
            password:password,
            high_bid:1343,
            createdBy:JSON.parse(loggedInBuyerId).buyer_id,
            updatedBy:JSON.parse(loggedInBuyerId).buyer_id 

        }

        console.log("request",request);
        API.post('carbuy/add',request).then((response)=>{
            console.log("car buy response", response.data.data)

           
        })
    }

   

    return (

        <div>
          
          <main id="main" className="inner-page">
            <div className="col-lg-4 card loginBlock">
            <span onClick={props.toggle} className="close-icon">x</span> 
              <div className="dealar-login">
                <img alt="Google" src={Logo} />
              </div>
              <form onSubmit={CarBuy}>
                <h2 className="title"> Buy Now</h2>
               
    
                <div className="email-login">
                    <div className="tbox">
                        <input className="textbox " type="text" placeholder="" id="uname" name="email"onChange={(e) => setEmail(e.target.value)} />
                        <label  htmlFor="uname" className={email !="" ? "input-has-value" : ""}>User Name</label>
                
                    </div>
                    
                    <div className="tbox">
                        <input className="textbox" type={showPwd?"text":"password"} placeholder="" id="psw" name="password" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="psw" className={password != "" ? "input-has-value" : "" }>Password</label><i htmlFor="psw" className="passwordeye" onClick={togglepwd}>{eye}</i>
                
                    </div>
                    <div className="col-lg-12 loginBtn">
                        <button className="cta-btn">Log In</button>
                                
                    </div>
                </div>
               
              </form>
            </div>
            
          </main>
    
        </div>
      )

}

export default BuyNow;