import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import DatePicker from 'react-datetime';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import Popup from '../../Component/Popup/Popup';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import '../../Component/Popup/popup.css';
import Terms from '../../Component/TermsAndCondition/TermsAndCondition';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import FileBase64 from 'react-file-base64';

// import '../../assets/css/styles.css';
import { useState } from 'react';

const Registration = () => {
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [isCommonPopupOpen, setIsCommonPopupOpen] = useState(false);
    const [dealerName, setDealerName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [zipCodeId, setZipcodeId] = useState("");
    const [numberOfYears, setNumberofYears] = useState("");
    const [option, setOption] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [doc,setDoc]=useState("");

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const getFiles=(file)=>{
        setDoc(file);
      }

    const toggleCommonPopup = () => {
        setIsCommonPopupOpen(!isCommonPopupOpen);
    }

    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
      };
  
      const inputProps = {
          placeholder: 'DD/MM/YYYY',
          required:true
      };
      
      const registrationDate = (event) => {
        setDate(event.format("DD/MM/YYYY"))
    }
   
    const registrationhandleSubmit = (event) => {
        // setOpenLoader(true);
        event.preventDefault();
        let request = {
            dealer_name: dealerName,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_no: phoneNumber,
            address: address,
            meeting_date: date,
            meeting_time: time,
            active: "0",
            country_id: "1",
            state_id: stateName,
            city_id: cityName,
            zipcode_id: zipCodeId,
            no_years: option,
            local_flag: 0,
            image:doc===""?"":doc.length>0?doc:[doc],
        };
        API.post("registration/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    toggleCommonPopup()
                    setPopupTitle("Dealer Registered successfully");
                    setPopupMsg("Please Activate your account with the link shared to the given email Id");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/login")
                } else {
                    toggleCommonPopup()
                    setPopupTitle("Error");
                    setPopupMsg("registration failed, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                toggleCommonPopup()
                setPopupTitle("Error");
                setPopupMsg(error, " Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            });
    }
    const getStateName = (stateData) => {
        setStateName(stateData)
    }

    const getCityName = (cityData) => {
        setCityName(cityData)
    }

    const getZipCodeId = (zipData) => {
        setZipcodeId(zipData)
    }

    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form className="registrationform" onSubmit={registrationhandleSubmit} >
                        
                        <h2 className="title"> Dealer Registration</h2>
                        
                        <div className="row">
                        <div className="col-sm-12 form-group">
                        <div class="user-upload-btn-wrapper">
                        <img alt=""  src="adduser.jpg" src={process.env.PUBLIC_URL + "/images/adduser.jpg"} ></img>
                        <span class="proCamera"></span>      
                        <FileBase64 onDone={ getFiles }  type="hidden"/>
                                         {/* <button>  <img alt="" for="upload" src="adduser.jpg"  /></button>  */}
                        
                        </div> </div>


                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="dealer_name" required maxLength="50" onChange={(e) => setDealerName(e.target.value)} />
                                    <label for="dealer_name" className={dealerName != "" ? "input-has-value" : ""}>Dealer name</label>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="first_name" required maxLength="30" onChange={(e) => setFirstName(e.target.value)} />
                                    <label for="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="last_name" required maxLength="30" onChange={(e) => setLastName(e.target.value)} />
                                    <label for="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="phone_no" required onChange={(e) => setPhoneNumber(e.target.value)} />
                                    <label for="phone_no" className={phoneNumber != "" ? "input-has-value" : ""}>Phone</label>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox" type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" placeholder="" id="email" required onChange={(e) => setEmail(e.target.value)} />
                                    <label for="email" className={email != "" ? "input-has-value" : ""}>Email</label>

                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="address" maxLength="300" required onChange={(e) => setAddress(e.target.value)} />
                                    <label for="address" className={address != "" ? "input-has-value" : ""}>Address</label>
                                </div>
                            </div>

                            <StateAndCity
                                setStateValue={getStateName}
                                setCityValue={getCityName}
                                setZipcodeValue={getZipCodeId}
                            />

                            <div className="col-sm-8 form-group">
                                <div className="tbox">
                                    {/* {/ <lable for="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
                                    <select id="drop" placeholder="" required className="form-control custom-select browser-default textbox" required onChange={(e) => setOption(e.target.value)}>
                                        <option style={{"display":"none"}}></option>
                                        <option value="Less then 1">Less then 1</option>
                                        <option value="1-3">1-3</option>
                                        <option value="3-5">3-5</option>
                                        <option value="5-10">5-10</option>
                                        <option value="10-15">10-15</option>
                                        <option value="15-20">15-20</option>
                                        <option value="More then 20">More then 20</option>
                                    </select>

                                    <label for="no_years" className={"input-has-value"}>How many years in car business</label>
                                </div>
                            </div>


                            <div className="col-sm-12 form-group scheduleMeeting">
                                <h2 className="text-center">Schedule Meeting with our Agent</h2>
                                <p>Thank you for interesting in our platform, Make you money and success.</p>
                            </div>


                            <div className="col-sm-6 form-group datePickerBlock ">
                                <div className="tbox">
                                <div className="textbox">
                                
                                    <Datetime inputProps={ inputProps } timeFormat={false} dateFormat="DD/MM/YYYY" isValidDate={disablePastDt} onChange={registrationDate}/>
                                    <label  for="meeting_date" className={date!="" ? "input-has-value" : ""}>Select Date</label>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 form-group timepicker">
                                <div className="tbox">
                                    <input type="time" className="form-control textbox" placeholder="Select Time" required onChange={(e) => setTime(e.target.value)} />
                                    <label for="meeting_time" className={"input-has-value"}>Select Time</label>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group agreetab">
                                <input type="checkbox" className="form-check d-inline " id="chb" required />
                                <label for="chb" className="form-check-label"> I Agree for the <a href="JavaScript:void(0)" onClick={togglePopup}>Terms And Conditions</a>
                                </label>
                                {isOpen && <Popup
                                    isClose={false}
                                    content={<>
                                        <Terms toggle={togglePopup} />
                                    </>}
                                    handleClose={togglePopup}
                                />}
                                {isCommonPopupOpen && <CommonPopup
                                    handleClose={isCommonPopupOpen}
                                    popupTitle={popupTitle}
                                    popupMsg={popupMsg}
                                    popupType={popupType}
                                    popupActionType={popupActionType}
                                    popupActionValue={popupActionValue}
                                    popupActionPath={popupActionPath}
                                />}
                            </div>
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
                                <img src={process.env.PUBLIC_URL + "/images/appstore.png"} />
                                <img src={process.env.PUBLIC_URL + "/images/googleplay.png"} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default Registration;