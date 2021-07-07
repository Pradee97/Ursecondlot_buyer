import React from 'react';
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import '../../assets/css/styles.css';
import { useState } from 'react';
import API from "../../Services/BaseService";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import './ChangePassword.css';
import '../../assets/css/responsive.css';
import { useForm } from "react-hook-form";



const ChangePassword = () => {
    const history = useHistory();
    const eye = <FontAwesomeIcon icon={faEye} />;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const[showPwd,setShowPwd]=useState(false);
    const[showPwds,setShowPwds]=useState(false);
    const[showsPwds,setShowsPwds]=useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")

    // const [confirmPassword, setConfirmPassword] = useState("");

    let userDetails = ls.get('userDetails');
    console.log("userDetails",userDetails)
    function togglepwd(e){
        e.preventDefault();
        setShowPwd(!showPwd);
      }
      function togglepwds(e){
        e.preventDefault();
        setShowPwds(!showPwds);
      }
      function togglespwds(e){
        e.preventDefault();
        setShowsPwds(!showsPwds);
      }
    const changehandleSubmit = (event) => {
        //event.preventDefault();
        if(newPassword !== confirmPassword){
            setErrorMessage("New password and Confirm password doesn't match ! ");
        }
        
        else{
        let request = {
          old_password: oldPassword,
          new_password: newPassword,
         user_id: userDetails.user_id,
         active:1

        };
        API.post("changepassword/update", request)
          .then((response) => {
            console.log("res", response)
            if (response.data.success == true) {  
            togglePopup()
            setPopupTitle("Change Password");
            setPopupMsg("Change Password Successfully Updated");
            setPopupType("success");
            setPopupActionType("redirect");
            setPopupActionValue("ok");
            localStorage.clear();
            setPopupActionPath("/login")

            } else {
            const { data } = response;
            togglePopup()
            setPopupTitle("Change Password");
            setPopupMsg(data.error.err);
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
      
      }
  

    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4  loginBlock">

                <button className="back-btn-paymentform backBtn" onClick={() => history.push("/myprofile")}><i className="icofont-arrow-left"></i> Back</button>
                <div className="col-lg-12 card">

                    <form className="registrationform" onSubmit={handleSubmit(changehandleSubmit)} >
                        <h2 className="title">Change Password</h2>
                        
                        <div className="row changePassblock">

                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type={showPwd?"text":"password"} id="old_password" className="textbox" placeholder=""  {...register("old_password", {
                                                            required: "Old Password is required.",
                                                           
                                                            minLength: {
                                                              value: 8,
                                                              message: "Password must have minimum 8 characters"
                                                            }
                                                          })}  onChange={(e) => setOldPassword(e.target.value)} />
                                <label htmlFor="old_password"  className={oldPassword != "" ? "input-has-value" : ""}>Old Password</label><i htmlFor ="password" className="passwordeye"  onClick={togglepwd}>{eye}</i>
                                <p className="form-input-error">{errors.old_password?.message}</p>
                                
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type={showPwds?"text":"password"} id="new_password" className="textbox"  title="eg:(It should be Uppercase, Lowercase, Specialcharacter, Numbers and Minimum 8 character)" placeholder="" 
                                {...register("new_password", {
                                    required: "New Password is required.",
                                    pattern: {
                                      value: /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/,
                                      message: "Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character"
                                    },
                                    minLength: {
                                      value: 8,
                                      message: "Password must have minimum 8 characters"
                                    }
                                  })}onChange={(e) => setNewPassword(e.target.value)} />
                                <label htmlFor="new_password" c className={newPassword != "" ? "input-has-value" : ""}>New Password</label><i htmlFor ="newPassword" className="passwordeye"  onClick={togglepwds}>{eye}</i>
                                <p className="form-input-error">{errors.new_password?.message}</p>
                                
                            </div>
                            </div>

                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type={showsPwds?"text":"password"} id="confirm_password" className="textbox" placeholder="" 
                                 {...register("confirm_password", {
                                    required: "Confirm password is required.",
                                    pattern: {
                                      value: /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}))/,
                                      message: "Password must have minimum of 8 characters with the combination of upper ,lower case letters , number and a special character"
                                    },
                                    minLength: {
                                      value: 8,
                                      message: "Password must have minimum 8 characters"
                                    }
                                  })}onChange={(e) => setConfirmPassword(e.target.value)} />
                                <label htmlFor="confirm_password"  className={confirmPassword != "" ? "input-has-value" : ""}>Confirm Password</label><i htmlFor ="newPassword" className="passwordeye"  onClick={togglespwds}>{eye}</i>
                                <p className="form-input-error">{errors.confirm_password?.message}</p>
                                <p className="form-input-error">{errorMessage}</p>
                            </div> 
                            </div>
                            {/* <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="User Id" required onChange={(e) => setUserId(e.target.value)} />
                            </div> */}
                            
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
                                <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
                                <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
                            </div>
                        </div>
                    </div>
                </section>
                {isOpen && 
                <CommonPopup 
                    handleClose= {togglePopup}
                    popupTitle= {popupTitle}
                    popupMsg= {popupMsg}
                    popupType= {popupType}
                    popupActionType= {popupActionType}
                    popupActionValue= {popupActionValue}
                    popupActionPath={popupActionPath}
                />}
            </main>

        </div>

    );
  };
  
export default ChangePassword ;