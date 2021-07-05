import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import Datetime from 'react-datetime';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { getMonth, getYear } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { useForm } from "react-hook-form";
import MuiPhoneNumber from 'material-ui-phone-number';

const FloorAdd = () => {

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    const [startDate, setStartDate] = useState(new Date());
    const years = range(1990, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
     
    const dateFormat = 'MM/DD/YYYY';
    const customFormat = value => `${value.format(dateFormat)}`;
    const [edate,setDate]=useState ("1");

    const history = useHistory();   
    const { register, handleSubmit, formState: { errors } } = useForm();

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

    const userDetails=ls.get('userDetails');
    const [option, setOption] = useState("");
    const [contactName, setContactName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [creditLimit, setCreditLimit] = useState("");
    const [emailId, setEmailId] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOpened, setDateOpened] = useState(null);
    const [accountOpened, setAccountOpened] = useState("");
    const [companyNameError, setCompanyNameError] = useState("");
    const [contactNameError, setContactNameError] = useState("");
    const [branchNameError, setBranchNameError] = useState("");
    const [accountNumberError, setAccountNumberError] = useState("");
    const [creditLimitError, setCreditLimitError] = useState("");
    const [emailIdError, setEmailIdError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [dateOpenedError, setDateOpenedError] = useState("");
    const [accountOpenedError, setAccountOpenedError] = useState("");
    // const [stateId, setStateId] = useState("");
    // const [cityName, setCityName] = useState("");
    // const [cityId, setCityId] = useState("");
    // const [zipCodeId, setZipcodeId] = useState("");
    // const [numberOfYears, setNumberofYears] = useState("");
   
    const inputProps = {
        placeholder: 'DD/MM/YYYY',
        required:true
    };

    const floorDate = (event) => {
        setDateOpened(event.format("YYYY-MM-DD"))
    }

    // const handleDateChangeRaw = (e) => {
    //     e.preventDefault();
    //     console.log("logesh",e)
        
    //     // setDateOpened(e.format("YYYY-MM-DD"))
       
    // }

    // const openDatepicker = (event)=>{
    //     event._calendar.setOpen(true)
    // }
    const floorhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();

        setCompanyNameError("")
        setContactNameError("")
        setBranchNameError("")
        setAccountNumberError("")
        setCreditLimitError("")
        setEmailIdError("")
        setAddressError("")
        setPhoneNumberError("")
        setDateOpenedError("")
        setAccountOpenedError("")

        let request = [{
            contact_name: contactName,
            company_name: companyName,
            branch_name: branchName,
            account_no: accountNumber,
            credit_limit: creditLimit,
            email_id: emailId,
            address: address,
            phone_no: phoneNumber,
            opened_date: moment(dateOpened).format("YYYY-MM-DD"),
            account_opened: accountOpened,
            buyer_id:userDetails.user_id,
            active:1
            
        }];
        console.log("===",request)
        // return

        if(!companyName){
            setCompanyNameError("Company Name is required")
            return;
        }
        else if(companyName.length>50){
            setCompanyNameError("Company Name must not exceed 50 characters")
            return;
        }
        if(!contactName){
            setContactNameError("Contact Name is required")
            return;
        }
        else if(contactName.length>50){
            setContactNameError("ContactName must not exceed 50 characters")
            return;
        }       
        if(!branchName){
            setBranchNameError("Branch Name is required")
            return;
        }
        else if(branchName.length>50 ){
            setBranchNameError("Branch Name must not exceed 50 characters ")
            return;
        }
      
        if(!accountNumber){
            setAccountNumberError("Account Number is required")
            return;
        }
        else if(accountNumber.length>50 ){
            setAccountNumberError("Account Number must not exceed 50 characters ")
            return;
        }
        if(!creditLimit){
            setCreditLimitError("Credit Limit is required")
            return;
        }
        else if(creditLimit.length>50){
            setCreditLimitError("Credit Limit must not exceed 50 characters")
            return;
        } 
        if(!emailId){
            setEmailIdError("Email Id is required")
            return;
        }
        else if(emailId && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(emailId)){
            setEmailIdError("Email Id Must match the format")
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
        if(!phoneNumber){
            setPhoneNumberError("Phone Number is required")
            return;
        }
        else if(phoneNumber.length<17 ){
            setPhoneNumberError("Phone Number must have 17 digits ")
            return;
        }
        if(!dateOpened){
            setDateOpenedError("Date Opened is required")
            return;
        }
        if(!accountOpened){
            setAccountOpenedError("Account Opened is required")
            return;
        }
        // if(dateOpened!==null){
        API.post("floor_plan/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Create Floor");
                    setPopupMsg("Floor is successfully created.Thanks you So much for your business");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/floor")
                } else {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Create Floor");
                    setPopupMsg( data.error.err );
                    // setPopupMsg("Floor is not Created, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                    togglePopup()
                    setPopupTitle("Error");
                    setPopupMsg( "Something went wrong, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
            })
            .catch(err => { console.log(err); });
        //     }else{
        //         console.log("====dateOpened==>",dateOpened)
        //         if(dateOpened===null){
        //         setDate("");
        //  }
        // }
    }
    function handleOnChange(value) {
        setPhoneNumber(value);
     }
    return (
        <div>
            <main id="main" className="inner-page">
                <div className="col-lg-4 loginBlock flooraddform">

               
                <button className="back-btn-paymentform backBtn" onClick={() => history.push("/floor")}><i className="icofont-arrow-left"></i> Back</button> 
                <div className="col-lg-12 card">
                    <form className="registrationform" onSubmit={handleSubmit(floorhandleSubmit)} >
                        

                        <h2 className="title">Add Floor Plan </h2>
                        <div className="row">
                        <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" name="companyName"
                                //  {...register("companyName", {
                                //     required: "This input is required.",
                                //     maxLength: {
                                //         value: 50,
                                //         message: "This input must not exceed 50 characters"
                                //       }
                                //   })}
                                onChange={(e) => setCompanyName(e.target.value)} />
                                <label htmlFor="companyName" className={companyName !="" ? "input-has-value" : ""}>Company Name</label>
                                {/* <p className="form-input-error">{errors.companyName?.message}</p> */}
                                <p className="form-input-error" >{companyNameError}</p>
                            </div>
                        </div>
                        <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="contactName"
                                //  {...register("contactName", {
                                //     required: "This input is required.",
                                //     maxLength: {
                                //         value: 50,
                                //         message: "This input must not exceed 50 characters"
                                //       }
                                //   })}
                                onChange={(e) => setContactName(e.target.value)} />
                                <label htmlFor="contactName" className={contactName !="" ? "input-has-value" : ""}>Name Contact </label>
                                {/* <p className="form-input-error">{errors.contactName?.message}</p> */}
                                <p className="form-input-error" >{contactNameError}</p>
                            </div>
                            </div>                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" name="branchName"
                                //  {...register("branchName", {
                                //     required: "This input is required.",
                                //     maxLength: {
                                //         value: 50,
                                //         message: "This input must not exceed 50 characters"
                                //       }
                                //   })}
                                onChange={(e) => setBranchName(e.target.value)} />
                                <label htmlFor="branchName" className={branchName !="" ? "input-has-value" : ""}>Branch Name</label>
                                {/* <p className="form-input-error">{errors.branchName?.message}</p> */}
                                <p className="form-input-error" >{branchNameError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="accountNumber"  className="textbox" placeholder="" name="accountNumber"
                                //  {...register("accountNumber", {
                                //     required: "This input is required.",
                                //     maxLength: {
                                //         value: 50,
                                //         message: "This input must not exceed 50 characters"
                                //       }
                                //   })}
                                onChange={(e) => setAccountNumber(e.target.value)} />
                                <label htmlFor="accountNumber" className={accountNumber !="" ? "input-has-value" : ""}>accountNumber</label>
                                {/* <p className="form-input-error">{errors.accountNumber?.message}</p> */}
                                <p className="form-input-error" >{accountNumberError}</p>
                            </div>
                            </div>
                            <div className="col-sm-3 form-group">
                            <div className="tbox">
  
                            <select className="form-control custom-select browser-default textbox" id="drop" placeholder="" required onChange={(e) => setOption(e.target.value)} >
                            <option value="$">$</option>
                            {/* <option disabled>Currency</option> */}
                            </select>
                            <label  htmlFor="no_years" className={"input-has-value"}>Currency</label>
                                {/* <input type="text" className="form-control" placeholder="Currency" required /> */}
                               </div>
                            </div>
                            <div className="col-sm-9 form-group">
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" name="creditLimit"
                                //  {...register("creditLimit", {
                                //     required: "This input is required.",
                                //     maxLength: {
                                //         value: 50,
                                //         message: "This input must not exceed 50 characters"
                                //       }
                                //   })}
                                onChange={(e) => setCreditLimit(e.target.value)} />
                                <label htmlFor="creditLimit" className={creditLimit !="" ? "input-has-value" : ""}>Credit Limit</label>
                                {/* <p className="form-input-error">{errors.creditLimit?.message}</p> */}
                                <p className="form-input-error" >{creditLimitError}</p>
                            </div>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="type" id="emailId" className="textbox" placeholder="" name="email"
                                //   {...register("email", {
                                //     required: "This input is required.",
                                //    pattern : {
                                //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                //     message: "Must match the email format"
                                //     }
                                // })}
                                onChange={(e) => setEmailId(e.target.value)} />
                                <label htmlFor="emailId" className={emailId !="" ? "input-has-value" : ""}>Email Id</label>
                                {/* <p className="form-input-error">{errors.email?.message}</p> */}
                                <p className="form-input-error" >{emailIdError}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="address" className="textbox" placeholder="" name="address"
                                //  {...register("address", {
                                //     required: "This input is required.",
                                //     maxLength: {
                                //         value: 150,
                                //         message: "This input must not exceed 150 characters"
                                //       }
                                //   })}
                                onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="address" className={address !="" ? "input-has-value" : ""}>Address</label>
                                {/* <p className="form-input-error">{errors.address?.message}</p> */}
                                <p className="form-input-error" >{addressError}</p>
                            </div>
                            </div>

                            <div className="col-sm-12 form-group ">
                            <div className="tbox phoneNumberfield">                            
                                <MuiPhoneNumber id="phoneNumber" name="phoneNumber" defaultCountry={'us'} onlyCountries={['us']}  className="textbox" 
                                    // <input type="text" id="phoneNumber" className="textbox" placeholder="" name="phoneNumber"
                                //  {...register("phoneNumber", {
                                //     required: "This input is required.",
                                //     minLength: {
                                //         value: 17,
                                //         message: "This input must not exceed 10 digits"
                                //       }
                                // })}
                                onChange={handleOnChange} ></MuiPhoneNumber>
                                {/* onChange={(e) => setPhoneNumber(e.target.value)} /> */}
                                <label for="phoneNumber" className={"input-has-value"}>Phone Number</label>
                            </div>
                            {/* <p className="form-input-error">{errors.phoneNumber?.message}</p> */}
                            <p className="form-input-error" >{phoneNumberError}</p>
                            </div>                           
                            <div className="col-sm-12 form-group datePickerBlock">
                                <div className="tbox">
                                   
                                        {/* <i class='bx bx-calendar' ></i>                                                      */}
                                        {/* <input type="Date" id="dateOpened" className="textbox" placeholder="" required onChange={(e) => setDateOpened(e.target.value)} />
                                        <label for="dateOpened" className={dateOpened !="" ? "input-has-value" : ""}>Date Opened</label>  */}
                                         {/* <Datetime className="textbox" inputProps={ inputProps } timeFormat={false} dateFormat="DD/MM/YYYY" name="Date" onChange={floorDate}/> 
                                        <label  for="meeting_date" className={"input-has-value"}>Date Opened</label>  */}
                                    <DatePicker 
                                    class="form-control textbox" name="Date" id="Date"
                                    renderCustomHeader={({
                                        date,
                                        changeYear,
                                        changeMonth,
                                        decreaseMonth,
                                        increaseMonth,
                                        prevMonthButtonDisabled,
                                        nextMonthButtonDisabled,
                                    }) => (
                                        <div
                                            style={{
                                            margin: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            }}
                                        >
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                        </button>
                                        <select
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                        >
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                        </select>
                                                    
                                        <select
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                        }
                                        >
                                        {months.map((option) => (
                                            <option key={option} value={option}>
                                            {option}
                                            </option>
                                        ))}
                                        </select>
                                                    
                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                        </button>
                                        </div>
                                    )}
                                            autoComplete="off"
                                            selected={dateOpened}
                                            onChange={(date) => setDateOpened(date)}
                                            isClearable
                                            placeholderText="Date Opened"
                                            // onChangeRaw={handleDateChangeRaw}
                                                        
                                    />
                                   
                                </div> 
                                {/* <p className="form-input-error" >{dateOpenedError}</p> */}
                                {/* {edate==="" && dateOpened===null?<p className="form-input-error"> Date  is required</p>:""} */}
                                <p className="form-input-error" >{dateOpenedError}</p>
                            </div>
                                                     
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                            {/* <label  for="account_Opened" className={accountOpened!="" ? "input-has-value" : ""}>Account Opened</label> */}
                            <select className="form-control custom-select  textbox" placeholder="" name="accountOpened"
                            // {...register("accountOpened", {
                            //     required: "This input is required."
                            // })}
                            onChange={(e) => setAccountOpened(e.target.value)}>
                            <option disabled selected value="" style={{display:"none"}}></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            </select>
                            <label  htmlFor="account_Opened" className={ "input-has-value"}>Account Opened</label>
                            {/* <p className="form-input-error">{errors.accountOpened?.message}</p> */}
                            <p className="form-input-error" >{accountOpenedError}</p>
                                {/* <input type="text" className="form-control" placeholder="Account Opened" required onChange={(e) => setAccountOpened(e.target.value)} /> */}
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
                            <img src={process.env.PUBLIC_URL +"/images/appstore.png" }/>
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


    )
}

export default FloorAdd;