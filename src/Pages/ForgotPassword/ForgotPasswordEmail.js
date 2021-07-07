import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../../Services/BaseService";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
const ForgotPasswordEmail = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const changehandleSubmit = (event) => {
        //event.preventDefault();
        let request = {
            email: email,
        }
        API.post("forgotPassword/condition", request).then((response) => {
            console.log("======111====>",response)
            if (response.data.success == true) {
                togglePopup()
                setPopupTitle("Forgot Password");
                setPopupMsg(" Password Link has been sent to given Email Id ");
                setPopupType("success");
                setPopupActionType("redirect");
                setPopupActionValue("ok");
                setPopupActionPath("/login")
            } else {
                const { data } = response;
                togglePopup()
                setPopupTitle("Forgot Password");
                // setPopupMsg("Forgot Password is not Updated, Please try Again");
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
                    <div className="col-lg-4  loginBlock">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/login")}><i className="icofont-arrow-left"></i> Back</button>
                        <div className="col-lg-12 card">
                            <form className="registrationform" onSubmit={handleSubmit(changehandleSubmit)} >
                                <h2 className="title">Forgot Password</h2>
                                <p className="error-message">{errorMessage}</p>
                                <div className="row changePassblock">

                                    <div className="col-sm-12 form-group">
                                        <div className="tbox">
                                            <input type="text" id="email" className="textbox" placeholder="" name="email" {...register("email", {
                                                    required: "Email ID is required.",
                                                    pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Must match the email format"
                                                    }
                                                })} onChange={(e) => setEmail(e.target.value)} />
                                            <label htmlFor="email" className={email != "" ? "input-has-value" : ""}>User Name</label>
                                            <p className="form-input-error">{errors.email?.message}</p>
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
export default ForgotPasswordEmail;