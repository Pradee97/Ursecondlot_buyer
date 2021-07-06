import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import Datetime from 'react-datetime';
import moment from 'moment';
import { useForm } from "react-hook-form";
import 'react-datetime/css/react-datetime.css';
import Popup from '../../Component/Popup/Popup';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import '../../Component/Popup/popup.css';
import Terms from '../../Component/TermsAndCondition/TermsAndCondition';
import StateAndCity from '../../Component/StateAndCity/StateAndCity';
import FileBase64 from 'react-file-base64';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useState } from 'react';
import { DatePicker } from 'material-ui';

const Registration = () => {
    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm();

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
    const [edate,setEDate]= useState("1");
    const [doc,setDoc]=useState("");
    const [state,setState]=useState("1");
    const [city,setCity]=useState("1");
    const [zipcode,setZipcode]=useState("1");
    const [terms,setTerms]=useState("0");
    const [eterms,setETerms]=useState("0");
    const [type,setType]=useState("");

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const getFiles=(file)=>{
        console.log("================>",file.type)
        if(file.type.includes("jpg") || file.type.includes("jpeg") || file.type.includes("png")){
            setDoc(file);
        }else{
            setType("0");
        }
        
      }

    const toggleCommonPopup = () => {
        setIsCommonPopupOpen(!isCommonPopupOpen);
    }

    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
      };
  
      const inputProps = {
          placeholder: 'MM/DD/YYYY',
          //required:true
      };
      
      const registrationDate = (event) => {
        setDate(event.format("MM/DD/YYYY"))
    }
   
    const registrationhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();
       
        console.log("===date===",date)
        let request = {
            dealer_name: dealerName,
            first_name:firstName,
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
        if(date!=="" && stateName!=="" && cityName!=="" && zipCodeId!=="" && terms!=="0"){
        API.post("registration/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("registration response=>", response)
                    toggleCommonPopup()
                    setPopupTitle("Dealer Registered successfully");
                    setPopupMsg("Please Activate your account with the link shared to the given email Id");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/login")
                } else {
                    const { data } = response;
                    toggleCommonPopup()
                    setPopupTitle("Error");
                    setPopupMsg(data.error.err);
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
        }else{

            if(stateName==="" || stateName===undefined || stateName===null){
                console.log("====stateName=stateName=>",stateName,cityName,zipCodeId)
                setState("");
            }
            if(cityName==="" || cityName===undefined || cityName===null){
                console.log("====cityName==>",stateName,cityName,zipCodeId)
                 setCity("");
            }
            if(zipCodeId==="" || zipCodeId===undefined || zipCodeId===null){
                console.log("====zipCodeId==>",stateName,cityName,zipCodeId)
                 setZipcode("");
            }
            if(date==="" || date===undefined || date===null){
                setEDate("");
            }
            if(terms==="0"){
                setETerms("1");
            }
        }
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
    function handleOnChange(value) {
        setPhoneNumber(value);
     }
    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form className="registrationform" onSubmit={handleSubmit(registrationhandleSubmit)} >
                        
                        <h2 className="title"> Dealer Registration</h2>
                        
                        <div className="row">
                        <div className="col-sm-12 form-group">
                        <div className="user-upload-btn-wrapper">
                        {doc===""?<img alt="" src="adduser.jpg" src={process.env.PUBLIC_URL + "/images/adduser.jpg"} ></img>:
														<img alt="" src="adduser.jpg" src={doc.base64} ></img>														
														}
                        <span className="proCamera"></span>
                        {type==="0"?<p className="form-input-error">Upload only Image format </p>:""}      
                        <FileBase64 onDone={ getFiles }  type="hidden"/>
                        
                                         {/* <button>  <img alt="" htmlFor="upload" src="adduser.jpg"  /></button>  */}
                        
                        </div> </div>


                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="dealer_name" name="dealerName"
                                    {...register("dealerName", {
                                        required: "Dealer name is required.",
                                        maxLength: {
                                            value: 50,
                                            message: "Dealer name must not exceed 50 characters"
                                          }
                                      })}
                                      onChange={(e) => setDealerName(e.target.value)} />
                                    <label htmlFor="dealer_name" className={dealerName != "" ? "input-has-value" : ""}>Dealer name</label>
                                    <p className="form-input-error">{errors.dealerName?.message}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="first_name" name="firstName"
                                    {...register("firstName", {
                                        required: "First Name is required.",
                                        maxLength: {
                                            value: 50,
                                            message: "First Name must not exceed 50 characters"
                                          }
                                      })}
                                      onChange={(e) => setFirstName(e.target.value)} />
                                    <label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                                    <p className="form-input-error">{errors.firstName?.message}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="last_name" name="lastName"
                                    {...register("lastName", {
                                        required: "Last Name is required.",
                                        maxLength: {
                                            value: 50,
                                            message: "Last Name must not exceed 50 characters"
                                          }
                                      })}
                                      onChange={(e) => setLastName(e.target.value)} />
                                    <label htmlFor="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                                    <p className="form-input-error">{errors.lastName?.message}</p>
                                </div>
                            </div>

                            <div className="col-sm-12 form-group">
                                <div className="tbox phoneNumberfield">
                                    <MuiPhoneNumber id="phone_no" name="phoneNumber" defaultCountry={'us'} onlyCountries={['us']}  className="textbox" 
                                    //  <input className="textbox " type="tel" placeholder="" id="phone_no" name="phoneNumber" maxLength="15" 
                                    {...register("phoneNumber", {
                                        required: "Phone Number is required.",
                                      
                                        minLength: {
                                            value: 17,
                                            message: "Phone Number must have 10 digits"
                                          }
                                    })}
                                    onChange={handleOnChange} ></MuiPhoneNumber>
                                     {/* onChange={(e) => setPhoneNumber(e.target.value)} /> */}
                                    <label htmlFor="phone_no" className={"input-has-value"}>Phone</label>
                                </div>
                                <p className="form-input-error">{errors.phoneNumber?.message}</p>

                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox" type="text" placeholder="" id="email" name="email"
                                    {...register("email", {
                                        required: "Email Id is required.",
                                        pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Must match the email format"
                                        }
                                    })}
                                    onChange={(e) => setEmail(e.target.value)} /> 
                                    <label htmlFor="email" className={email != "" ? "input-has-value" : ""}>Email</label>
                                    <p className="form-input-error">{errors.email?.message}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="address" name="address"
                                    {...register("address", {
                                        required: "Address is required.",
                                        maxLength: {
                                            value: 150,
                                            message: "Address must not exceed 150 characters"
                                          }
                                      })}
                                      onChange={(e) => setAddress(e.target.value)} /> 
                                    <label htmlFor="address" className={address != "" ? "input-has-value" : ""}>Address</label>
                                    <p className="form-input-error">{errors.address?.message}</p>
                                </div>
                            </div>

                            <StateAndCity
                                setStateValue={getStateName}
                                setCityValue={getCityName}
                                setZipcodeValue={getZipCodeId}
                            />
                            {console.log("======>",state,stateName)}
                            {(state==="" && stateName==="") ?
                            <p className="form-input-error"> State,City,zipcode  is required</p>:
                            cityName===null && city===""?<p className="form-input-error"> City is required</p>:
                            zipCodeId===null && zipcode===""?<p className="form-input-error"> Zipcode is required</p>:""}
                                                

                            <div className="col-sm-8 form-group">
                                <div className="tbox">
                                    {/* {/ <lable htmlFor="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
                                    <select id="drop" placeholder=""  className="form-control custom-select browser-default textbox" 
                                    {...register("option", {
                                        required: "How many years in car business is required."
                                    })}
                                    onChange={(e) => setOption(e.target.value)}>
                                        <option style={{"display":"none"}}></option>
                                        <option value="Less then 1">Less then 1</option>
                                        <option value="1-3">1-3</option>
                                        <option value="3-5">3-5</option>
                                        <option value="5-10">5-10</option>
                                        <option value="10-15">10-15</option>
                                        <option value="15-20">15-20</option>
                                        <option value="More then 20">More then 20</option>
                                    </select>
                                    <label htmlFor="no_years" className={"input-has-value"}>How many years in car business</label>
                                    <p className="form-input-error">{errors.option?.message}</p>
                                </div>
                            </div>


                            <div className="col-sm-12 form-group scheduleMeeting">
                                <h2 className="text-center">Schedule Meeting with our Agent</h2>
                                <p>Thank you for interesting in our platform, Make you money and success.</p>
                            </div>


                            <div className="col-sm-6 form-group datePickerBlock ">
                                <div className="tbox">
                                <div className="textbox">
                                
                                    <Datetime inputProps={ inputProps } timeFormat={false} dateFormat="MM/DD/YYYY" 
                                    name="Date" isValidDate={disablePastDt} onChange={registrationDate} 
                                     id="meeting_date"/>
                                    <label  htmlFor="meeting_date" className={date === "" || date!==""? "input-has-value" : ""}>Select Date</label> 
                                    {  date==="" && edate===""?<p className="form-input-error"> Date  is required</p>:""}
                                    <p className="form-input-error">{errors.date?.message}</p>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-6 form-group timepicker">
                                <div className="tbox">
                                    <input type="time" className="form-control textbox" placeholder="Select Time" name="Time"
                                     {...register("Time", {
                                        required: "Select Time is required."
                                    })}
                                    onChange={(e) => setTime(e.target.value)} />
                                    <label htmlFor="meeting_time" className={"input-has-value"}>Select Time</label>
                                    <p className="form-input-error">{errors.Time?.message}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group agreetab">
                                <input type="checkbox" className="form-check d-inline " id="chb" 
                                checked = { terms == 0 ? false : true } value={terms == 0 ? 1 : 0 } onChange={(e) => setTerms(e.target.value)}/>
                                <label htmlFor="chb" className="form-check-label"> I Agree for the 
                                <a href="JavaScript:void(0)" onClick={togglePopup}>Terms And Conditions</a>
                                </label>
                                {eterms==="1" && terms==="0" ?
                                <p className="form-input-error"> Agree the Terms And Conditions</p>:""}

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