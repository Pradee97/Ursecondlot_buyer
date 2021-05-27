import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
import ls from 'local-storage';

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

import CommonPopup from '../../Component/CommonPopup/CommonPopup';

import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';


import { Modal, Button } from 'antd';
import './ChangePassword.css';
import '../../assets/css/responsive.css';




const ChangePassword = () => {
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false);

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


    const changehandleSubmit = (event) => {
        event.preventDefault();
        if(newPassword != confirmPassword){
                setErrorMessage("Newpassword and Confirmpassword didn't match")
             }
        
        else{
        let request = {
          old_password: oldPassword,
          new_password: newPassword,
         user_id: userDetails.user_id,
         active:1

        };
        // if(newPassword === confirmPassword)
        API.post("changepassword/update", request)

          .then((response) => {
            console.log("res", response)
            if (response.data.success == true) {  
            //   history.push("/login");
            togglePopup()
            setPopupTitle("Change Password");
            setPopupMsg("Change Password Successfully Updated");
            setPopupType("success");
            setPopupActionType("redirect");
            setPopupActionValue("ok");
            localStorage.clear();
            setPopupActionPath("/login")

            } else {
            //   history.push("error");
            togglePopup()
            setPopupTitle("Change Password");
            setPopupMsg("Change Password is not Updated, Please try Again");
            setPopupType("error");
            setPopupActionType("close");
            setPopupActionValue("close");
            }
          },
            (error) => {
                togglePopup()
                setPopupTitle("Error");
                setPopupMsg(error," Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            });
        }
      
      }
  

    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form className="registrationform" onSubmit={changehandleSubmit} >
                        <h2 className="title">Change Password</h2>
                        <p className="error-message">{errorMessage}</p>
                        <div className="row">

                            <div className="col-sm-12 form-group">
                                <input type="password" className="form-control" placeholder="Old Password" required onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className="col-sm-12 form-group">
                                <input type="password" className="form-control" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="eg:(It should be Uppercase, Lowercase, Specialcharacter, Numbers and Minimum 8 character)" placeholder="New Password" required onChange={(e) => setNewPassword(e.target.value)} />
                            </div>

                            <div className="col-sm-12 form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                 

                            </div>
                            {/* <div className="col-sm-12 form-group">
                                <input type="text" className="form-control" placeholder="User Id" required onChange={(e) => setUserId(e.target.value)} />
                            </div> */}
                            
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Submit</button>
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