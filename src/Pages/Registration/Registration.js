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
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input/input';
import momentTimezone from 'moment-timezone';
import { CodeSharp } from '@material-ui/icons';

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
    const [stateName, setStateName] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [zipCodeId, setZipcodeId] = useState(null);
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
    // const [state,setState]=useState("1");
    // const [city,setCity]=useState("1");
    // const [zipcode,setZipcode]=useState("1");
    const [terms,setTerms]=useState("0");
    const [eterms,setETerms]=useState("0");
    const [type,setType]=useState("");
    const [dealerNameError, setDealerNameError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [numberOfYearsError, setNumberofYearsError] = useState("");
    const [stateAndCityError, setStateAndCityError] = useState("");
    const [myTimezone, SetMyTimezone] = useState([])
    const [timezoneActiveFlag, SetTimezoneActiveFlag] = useState(true)
    const [myTimezoneValue, SetMyTimezoneValue] =  useState(1)

    useEffect(()=>{
        API.post("timezone/condition")
            .then((response) => {
                console.log("timezone res====", response.data.data)
                SetMyTimezone(response.data.data)
            })
            .catch(()=>{
                console.log("")
            })
    },[])
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const getFiles=(file)=>{
        setType("")
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
    function formatMobileNO(value){
        var x = value.replace(/\D/g, '').match(/(\d{1})(\d{3})(\d{3})(\d{4})/);
    
        console.log("value of x",x);
        value = '+'+ x[1]+'('+ x[2] +')' + x[3] + '-' + x[4];
        console.log("mobileno",value);
        return value;
     }
    const registrationhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();

        setDealerNameError("")
        setFirstNameError("") 
        setLastNameError("")
        setPhoneNumberError("") 
        setEmailError("") 
        setAddressError("") 
        setDateError("")
        setTimeError("")
        setNumberofYearsError("")
        setStateAndCityError("")
       
        if(!dealerName){
            setDealerNameError("Dealer Name is required")
            return;
        }
        else if(dealerName.length>50){
            setDealerNameError("Dealer Name must not exceed 50 characters")
            return;
        }
        if(!firstName){
            setFirstNameError("First Name is required")
            return;
        }
        else if(firstName.length>50){
            setFirstNameError("First Name must not exceed 50 characters")
            return;
        }       
        if(!lastName){
            setLastNameError("Last Name is required")
            return;
        }
        else if(lastName.length>50 ){
            setLastNameError("Last Name must not exceed 50 characters ")
            return;
        }
        if(!phoneNumber){
            setPhoneNumberError("Phone Number is required")
            return;
        }
        else if(phoneNumber.length<12 ){
            console.log("phone",phoneNumber );
            console.log("phonelength",phoneNumber.length );

            setPhoneNumberError("Phone Number must have 10 digits ")
            
        //     if(phoneNumber.length==3 && phoneNumber.includes('+1')){
        //         setPhoneNumberError("Phone Number is required")
        // }
                return;
    }
         
        if(!email){
            setEmailError("Email  is required")
            return;
        }
        else if(email && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)){
            setEmailError("Email  Must match the format")
            return;
        }
        
        if(!address){
            setAddressError("Address is required")
            return;
        }
        else if(address.length>150){
            setAddressError("Address must not exceed 150 characters")
            return;
        }
        // console.log("====stateName=>",stateName,cityName,zipCodeId)
        if(!stateName){
            console.log("====stateName=>",stateName,cityName,zipCodeId)
            setStateAndCityError("state is required")
            return
        }
        if(!cityName){
            console.log("====cityName==>",stateName,cityName,zipCodeId)
            // setStateAndCityError("city is required")
            setStateAndCityError("city is required")
             return
        }
        if(!zipCodeId){
            console.log("====zipCodeId==>",stateName,cityName,zipCodeId)
            // setStateAndCityError("zipCode is required")
            setStateAndCityError("zipcode is required")
             return
        }
        if(!option){
            setNumberofYearsError("Number Of Years is required")
            return;
        }
        if(!date){
            setDateError("Date is required")
            return;
        } 
        if(!time){
            setTimeError("Time is required")
            return;
        } 

        // console.log("===date==222==",moment(new Date(`${date} ${time}`)).tz(myTimezone.filter((data)=> data.timezone_id == myTimezoneValue)[0].timezone_name).format('MM/DD/YYYY'))
        // console.log("===time==222==",moment(new Date(`${date} ${time}`)).tz(myTimezone.filter((data)=> data.timezone_id == myTimezoneValue)[0].timezone_name).format('HH:mm'))
       
        // const UTC_updateDate = moment(new Date(`${date} ${time}`)).tz(myTimezone.filter((data)=> data.timezone_id == myTimezoneValue)[0].timezone_name).format('MM/DD/YYYY')
        // const UTC_updateTime = moment(new Date(`${date} ${time}`)).tz(myTimezone.filter((data)=> data.timezone_id == myTimezoneValue)[0].timezone_name).format('HH:mm')
        // console.log("UTC_updateTime==",UTC_updateTime)
        // console.log("UTC_updateDate==",UTC_updateDate)
        

        const selecteDateAndTime = moment(`${date} ${time}`).tz(myTimezone.filter((data)=> data.timezone_id == myTimezoneValue)[0].timezone_name, true);
        // const UTC_updateDateAndTime = moment.utc(selecteDateAndTime).format('MM/DD/YYYY HH:mm')
        const UTCFullData= moment.utc(selecteDateAndTime).format()
        const UTC_updateDate = moment.utc(selecteDateAndTime).format('MM/DD/YYYY')
        const UTC_updateTime = moment.utc(selecteDateAndTime).format('HH:mm')
        const checkWithChicagoTime = moment(UTCFullData).tz('America/Chicago').format('HH:mm') >= "10:00" && moment(UTCFullData).tz('America/Chicago').format('HH:mm') <= "16:00";
        console.log("selecteDateAndTime:",selecteDateAndTime)
        console.log("UTCFullData:",UTCFullData)
        console.log("UTC_updateDate:",UTC_updateDate)
        console.log("UTC_updateTime:",UTC_updateTime)
        console.log("checkWithChicagoTime:", checkWithChicagoTime)
        console.log("-------:", moment(UTCFullData).tz('America/Chicago').format('MM/DD/YYYY HH:mm'))

        if(!checkWithChicagoTime){
          setTimeError("Seleted Meeting Time should be betwen on 10:00 AM to 04:00 PM of CDT (America/Chicago)")
          return;
        }
        let request = {
            dealer_name: dealerName,
            first_name:firstName,
            last_name: lastName,
            email: email,
            phone_no: formatMobileNO(phoneNumber),
            address: address,
            meeting_date: UTC_updateDate, //date,
            meeting_time: UTC_updateTime, //time,
            active: 1,
            country_id: "1",
            state_id: stateName,
            city_id: cityName,
            zipcode_id: zipCodeId,
            no_years: option,
            local_flag: 0,
            image: doc==="" ? "" : doc.length>0 ? doc : [doc],
            timezone_id: myTimezoneValue
        };

        if( terms!=="0" ){
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

            if(terms==="0"){
                setETerms("1");
            }
        }
    }
    const getStateName = (stateData) => {
        setStateName(stateData)
        setCityName(null)
        setZipcodeId(null)
    }

    const getCityName = (cityData) => {
        setCityName(cityData)
        setZipcodeId(null)
    }

    const getZipCodeId = (zipData) => {
        setZipcodeId(zipData)
    }
    function handleOnChange(value) {
        setPhoneNumber(value);
        console.log("inside handle")

        console.log("phn no", value)
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
                        {type==="0"?<p className="form-input-error">Upload only Image Format </p>:""}      
                        <FileBase64 onDone={ getFiles }  type="hidden"/>
                        
                                         {/* <button>  <img alt="" htmlFor="upload" src="adduser.jpg"  /></button>  */}
                        
                        </div> </div>


                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="dealer_name" name="dealerName"
                                      onChange={(e) => setDealerName(e.target.value)} />
                                    <label htmlFor="dealer_name" className={dealerName != "" ? "input-has-value" : ""}>Dealer name</label>
                                    <p className="form-input-error" >{dealerNameError}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="first_name" name="firstName"
                                      onChange={(e) => setFirstName(e.target.value)} />
                                    <label htmlFor="first_name" className={firstName != "" ? "input-has-value" : ""}>First Name</label>
                                    <p className="form-input-error" >{firstNameError}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="last_name" name="lastName"
                                      onChange={(e) => setLastName(e.target.value)} />
                                    <label htmlFor="last_name" className={lastName != "" ? "input-has-value" : ""}>Last Name</label>
                                    <p className="form-input-error" >{lastNameError}</p>
                                </div>
                            </div>
                            <div className="col-sm-4 form-group countrycode">
                            <div className="tbox">
                                <select className="form-control custom-select browser-default textbox"  id="drop" placeholder="" defaultValue="+1">
                                    <option value="+1">+1</option>
                                </select>
                                <label  for="drop" className={"input-has-value"}>Country code</label>
                            </div>
                            </div>
                            <div className="col-sm-8 form-group">
                                <div className="tbox ">
                                <PhoneInput  id="phone_no" name="phoneNumber" country="US" className="textbox" maxLength="14" minLength="14" value={phoneNumber}
                                    onChange={handleOnChange} ></PhoneInput>
                                    <label htmlFor="phone_no" className={"input-has-value"}>Phone</label>
                                </div>
                                <p className="form-input-error" >{phoneNumberError}</p>

                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox" type="text" placeholder="" id="email" name="email"
                                    onChange={(e) => setEmail(e.target.value)} /> 
                                    <label htmlFor="email" className={email != "" ? "input-has-value" : ""}>Email</label>
                                    <p className="form-input-error" >{emailError}</p>
                                </div>
                            </div>
                            <div className="col-sm-12 form-group">
                                <div className="tbox">
                                    <input className="textbox " type="text" placeholder="" id="address" name="address"
                                      onChange={(e) => setAddress(e.target.value)} /> 
                                    <label htmlFor="address" className={address != "" ? "input-has-value" : ""}>Address</label>
                                    <p className="form-input-error" >{addressError}</p>
                                </div>
                            </div>
                            <StateAndCity
                                setStateValue={getStateName}
                                setCityValue={getCityName}
                                setZipcodeValue={getZipCodeId}
                            />
                             <div className="col-sm-12 form-group">
                             <p className="form-input-error"> {stateAndCityError}</p>
                             </div>                    
                        
                            <div className="col-sm-8 form-group">
                                <div className="tbox">
                                    {/* {/ <lable htmlFor="drop" className={option !="" ? "input-has-value" : ""}>How many years in car business</lable> /} */}
                                    <select id="drop" placeholder=""  className="form-control custom-select browser-default textbox" 
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
                                    <p className="form-input-error" >{numberOfYearsError}</p>
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
                                    <p className="form-input-error" >{dateError}</p>
                                </div>
                                </div>
                            </div>
                            
                            <div className="col-sm-6 form-group timepicker">
                                <form novalidate className="timePicker">
                                <div className="tbox"> 
                                    <input type="time" className="form-control textbox" placeholder="Select Time" name="Time" 
                                    onChange={(e) => setTime(e.target.value)} />
                                    <label htmlFor="meeting_time" className={"input-has-value"}>Select Time</label>
                                    <p className="form-input-error" >{timeError}</p>
                                </div>
                                </form>
                            </div>
                            
                            <div className="col-sm-12 form-group countrycode">
                                <div className="tbox">
                                    <select className="form-control custom-select browser-default textbox"
                                        id="drop"
                                        placeholder=""
                                        value={myTimezoneValue}
                                        onChange={(e) => SetMyTimezoneValue( e.target.value) }
                                        >
                                        <option value={null} style={{"display":"none"}}></option>
                                        {myTimezone.length > 0 && myTimezone.map((data)=>
                                            <option key={data.timezone_id} 
                                                checked={timezoneActiveFlag && data.timezone_id == myTimezoneValue ? true : false}
                                                value={data.timezone_id}
                                            >{data.timezone_name}</option> 
                                        )}
                                    </select>
                                    <label  for="drop" className={"input-has-value"}> Time Zone</label>
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