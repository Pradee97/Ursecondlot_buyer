import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../../Services/BaseService";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { useForm } from "react-hook-form";

const ForgotEmail = () => {
    const history = useHistory();
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNo, setPhoneNo]=useState('');
    let value=window.location.href.split("id=");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleForgotEmail = (event) => {
        let request = {
            phone_no:phoneNo
        }
        const services=API.post("forgotEmail/condition", request);
        services.then((response) => {    
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
    return (

        <div>
            <div>
                <main id="main" className="inner-page">
                    <div className="col-lg-4  loginBlock forgotpage">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/login")}><i className="icofont-arrow-left"></i> Back</button>
                        <div className="col-lg-12 card">
                        <div className="logo"><img alt="" src={process.env.PUBLIC_URL +"/images/Logo_final.png"} /></div>
                            <form className="registrationform" onSubmit={handleSubmit(handleForgotEmail)} >
                                <h2 className="title">Forgot Username</h2>
                                <p className="error-message">{errorMessage}</p>
                                <div className="row changePassblock">

                                    <div className="col-sm-12 form-group">
                                        <div className="tbox">
                                            <input type="text" id="phoneNo" className="textbox" placeholder="" required onChange={(e) => setPhoneNo(e.target.value)} />
                                            <label htmlFor="phoneNo" className={phoneNo != "" ? "input-has-value" : ""}>Phone No</label>
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
                </main>

            </div>
        </div>
    )
}
export default ForgotEmail;