import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../../Services/BaseService";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import Loading from '../../Component/Loading/Loading';

const ForgotPassword = () => {
    const history = useHistory();
    const eye = <FontAwesomeIcon icon={faEye} />;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const[showPwd,setShowPwd]=useState(false);
    const[showPwds,setShowPwds]=useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [loading,setLoading] = useState(false);
    const [invalidLinkCheck, setInvalidLinkCheck] = useState (false);

    function togglepwd(e){
        e.preventDefault();
        setShowPwd(!showPwd);
      }
      function togglepwds(e){
        e.preventDefault();
        setShowPwds(!showPwds);
      }
    let value=window.location.href.split("id=");
    const changehandleSubmit = (event) => {
        //event.preventDefault();
        setPasswordError("")
        setNewPasswordError("")
        setErrorMessage("")

        if(!password){
            setPasswordError("password is required")
            return;
        }
        else if(password && !new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/).test(password)){
            setPasswordError("Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character")
            return;
        }
        if(!newPassword){
            setNewPasswordError("Confirm Password is required")
            return;
        }
        else if(newPassword && !new RegExp(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/).test(newPassword)){
            setNewPasswordError("Confirm Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character")
            return;
        }
        else if(password !== newPassword){
            setErrorMessage("Password and Confirm password doesn't match ! ");
            return;
        }
        
        let request = {
            password:password,
            buyer_id:value[1]
        }
        API.post("forgotpassword/update", request).then((response) => {
            console.log("======111====>",response)
            if (response.data.success == true) {
                togglePopup()
                setPopupTitle("Forgot Password");
                setPopupMsg("Change Password Successfully Updated");
                setPopupType("success");
                setPopupActionType("redirect");
                setPopupActionValue("ok");
                setPopupActionPath("/login")

            } else {
                const { data } = response;
                togglePopup()
                setPopupTitle("Change Password");
                // setPopupMsg("Change Password is not Updated, Please try Again");
                setPopupMsg(data.error.err);
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            }
        },
            (error) => {
                togglePopup()
                setPopupTitle("Error");
                setPopupMsg("Something went wrong, Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            });
        }
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const checkValid = ()=> {
        let request={
           buyer_id:value[1]
        }
        API.post("urlstatus/condition",request).then((response)=>{
            if(response.data.data.urlstatus === 0){
            setLoading(false);
            setInvalidLinkCheck(false)
            history.push('/Invalidlink')
          }
          else{
            setInvalidLinkCheck(true)
            setLoading(false);
          }
        })
      }
      useEffect(() => {
        checkValid();   
      }, []);
    return (

        <div>
            <div>{loading ? <Loading/> :
                
                invalidLinkCheck && 
                <main id="main" className="inner-page">
                    <div className="col-lg-4  loginBlock forgotpage">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/login")}><i className="icofont-arrow-left"></i> Back</button>
                        <div className="col-lg-12 card">
                        <div className="logo"><img alt="" src={process.env.PUBLIC_URL +"/images/Logo_final.png"} /></div>
                            <form className="registrationform" onSubmit={handleSubmit(changehandleSubmit)} >
                                <h2 className="title">Forgot Password</h2>
                                
                                <div className="row changePassblock">

                                    <div className="col-sm-12 form-group">
                                        <div className="tbox">
                                            <input type={showPwd?"text":"password"} id="password" className="textbox" placeholder=""  onChange={(e) => setPassword(e.target.value)} />
                                            <label htmlFor="password" className={password != "" ? "input-has-value" : ""}>Password</label><i htmlFor ="password" className="passwordeye"  onClick={togglepwd}>{eye}</i>
                                            <p className="form-input-error" >{passwordError}</p>
                                
                                        </div>
                                    </div>
                                    <div className="col-sm-12 form-group">
                                        <div className="tbox">
                                            <input type={showPwds?"text":"password"} id="newPassword" className="textbox" placeholder="" onChange={(e) => setNewPassword(e.target.value)} />
                                            <label htmlFor="newPassword" className={newPassword != "" ? "input-has-value" : ""}>Confirm Password</label><i htmlFor ="newPassword" className="passwordeye"  onClick={togglepwds}>{eye}</i>
                                            <p className="form-input-error" >{newPasswordError}</p>
                                            <p className="form-input-error">{errorMessage}</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 loginBtn">
                                        <button className="cta-btn">Submit</button>
                                    </div>
                                </div>
                            </form>

                        </div> </div>
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
                </main>}

            </div>
        </div>
    )
}
export default ForgotPassword;