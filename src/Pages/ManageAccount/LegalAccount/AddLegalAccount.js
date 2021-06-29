import React from 'react';
import API from "../../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { getMonth, getYear } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity';
import { useForm } from "react-hook-form";
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks"

const AddLegalAccount = () => {

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
    const [etax, setTax]=useState ("1");
    const [edealerExp, setDealerExp]=useState ("1");

    const history = useHistory();   
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
 
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
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [EINnumber, setEINnumber] = useState("");
    const [dealershiplicense, setDealershiplicense] = useState(""); 
    const [taxid, setTaxid] = useState("");
    const [address, setAddress] = useState("");
    const [dealershipLicenseexp, setDealershiplicenseexp] = useState(null);
    const [taxidexp, setTaxidexp] = useState(null);
    const [legalBusinessname, setLegalBusinessname] = useState("");
    const [state, setStateName] = useState("");
	const [city, setCityName] = useState("");
	const [zipcode, setZipcodeId] = useState("");

    
    const onhandleSubmit = (data) => {
        // setOpenLoader(true);
        // event.preventDefault();        
    
        let request = {
            buyer_id: userDetails.user_id,
            first_name: firstname,
            last_name: lastname,                                           
            ein_no: EINnumber,
            dealer_license: dealershiplicense,
            tax_id: taxid,
            tax_id_exp: moment(taxidexp).format("YYYY-MM-DD"),
            dealer_license_exp: moment(dealershipLicenseexp).format("YYYY-MM-DD"),
            state_id: state,
            city_id: city,
            zipcode_id: zipcode,
            address: address,
            bussiness_name: legalBusinessname,
            active: 1          
        };
        console.log("===",request)
        // return
        if(taxidexp!==null && dealershipLicenseexp!==null){
        API.post("legal_manage/add", request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Create Legal manage account");
                    setPopupMsg("Legal manage account is successfully created");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")

                } else {
                    togglePopup()
                    setPopupTitle("Create Legal manage account");
                    setPopupMsg("Legal manage account is not Created, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
                }
            }, (error) => {
                // setOpenLoader(false);
                // console.log(error);
                    togglePopup()
                    setPopupTitle("Error");
                    setPopupMsg( "Something went wrong, Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
            })
            .catch(err => { console.log(err); });
            }else{
                console.log("====taxidexp==>",taxidexp)
                if(taxidexp===null){
                    setTax("");
                }
                if(dealershipLicenseexp===null){
                    setDealerExp("");
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

    return (
        <div>
            <main id="main" className="inner-page">

            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
            <div className="section-title">
                                <h2>Add Legal Manage Account</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0  flooraddform">
                <div className="adduserpage-inner"> 
                <div className="col-lg-12">
                    <form className="registrationform" onSubmit={handleSubmit(onhandleSubmit)} >
                        <div className="row">

                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i class="icofont-arrow-left"></i> Back</button>   
							<h2>Add Legal Manage Account</h2>
						</div>
                        <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" name="firstName"
                                 {...register("firstName", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setFirstname(e.target.value)} />
                                <label for="contactName" className={firstname !="" ? "input-has-value" : ""}>First name</label>
                                <p className="form-input-error">{errors.firstName?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" name="lastname"
                                 {...register("lastname", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setLastname(e.target.value)} />
                                <label for="companyName" className={lastname !="" ? "input-has-value" : ""}>Last name</label>
                                <p className="form-input-error">{errors.lastname?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" name="legalBusinessname"
                                 {...register("legalBusinessname", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setLegalBusinessname(e.target.value)} />
                                <label for="branchName" className={legalBusinessname !="" ? "input-has-value" : ""}>Legal business name</label>
                                <p className="form-input-error">{errors.legalBusinessname?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="accountNumber" className="textbox" placeholder="" name="EINnumber"
                                 {...register("EINnumber", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setEINnumber(e.target.value)} />
                                <label for="accountNumber" className={EINnumber !="" ? "input-has-value" : ""}>EIN number</label>
                                <p className="form-input-error">{errors.EINnumber?.message}</p>
                            </div>
                            </div>
                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" name="dealershiplicense"
                                 {...register("dealershiplicense", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setDealershiplicense(e.target.value)} />
                                <label for="creditLimit" className={dealershiplicense !="" ? "input-has-value" : ""}>Dealership license</label>
                                <p className="form-input-error">{errors.dealershiplicense?.message}</p>
                            </div>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="emailId" className="textbox" placeholder="" name="taxid"
                                 {...register("taxid", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 50,
                                        message: "This input must not exceed 50 characters"
                                      }
                                  })}
                                onChange={(e) => setTaxid(e.target.value)} />
                                <label for="emailId" className={taxid !="" ? "input-has-value" : ""}>Tax id</label>
                                <p className="form-input-error">{errors.taxid?.message}</p>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="address" className="textbox" placeholder="" name="address"
                                 {...register("address", {
                                    required: "This input is required.",
                                    maxLength: {
                                        value: 150,
                                        message: "This input must not exceed 150 characters"
                                      }
                                  })}
                                onChange={(e) => setAddress(e.target.value)} />
                                <label for="address" className={address !="" ? "input-has-value" : ""}>Address</label>
                                <p className="form-input-error">{errors.address?.message}</p>
                            </div>
                            </div>
                            <StateAndCity
														setStateValue={getStateName}
														setCityValue={getCityName}
														setZipcodeValue={getZipCodeId}
													/>
                            {/* <div className="col-sm-12 form-group">
                            <div className="tbox">                            
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setCity(e.target.value)} />
                                <label for="phoneNumber" className={city !="" ? "input-has-value" : ""}>City</label>
                            </div>
                            </div>   
                            <div className="col-sm-12 form-group">
                             <div className="tbox">                            
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setState(e.target.value)} />
                                <label for="phoneNumber" className={state !="" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>                                     
                            <div className="col-sm-12 form-group">
                             <div className="tbox">                            
                                <input type="number" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setZipcode(e.target.value)} />
                                <label for="phoneNumber" className={zipcode !="" ? "input-has-value" : ""}>Zip code</label>
                            </div> 
                            </div>  */}
                            <div className="col-sm-12 form-group datePickerBlock">
                             <div className="tbox">  
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
                                            selected={dealershipLicenseexp}
                                            onChange={(date) => setDealershiplicenseexp(date)}
                                            isClearable
                                            placeholderText="Dealership license exp"
                                            // onChangeRaw={handleDateChangeRaw}
                                                        
                                    />                          
                                {/* <input type="date" id="phoneNumber" className="textbox" placeholder="" name="Dealership"
                                 {...register("Dealership", {
                                    required: "This input is required."
                                })}
                                onChange={(e) => setDealershiplicenseexp(e.target.value)} />
                                <label for="phoneNumber" className={"input-has-value"}>Dealership license exp</label>
                                <p className="form-input-error">{errors.Dealership?.message}</p> */}
                            </div>
                            {edealerExp==="" && dealershipLicenseexp===null?<p className="form-input-error"> Dealership license exp is required</p>:""}
                            </div>  
                            <div className="col-sm-12 form-group datePickerBlock">
                             <div className="tbox">     
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
                                            selected={taxidexp}
                                            onChange={(date) => setTaxidexp(date)}
                                            isClearable
                                            placeholderText="Tax id exp"
                                            // onChangeRaw={handleDateChangeRaw}
                                                        
                                    />                       
                                {/* <input type="date" id="phoneNumber" className="textbox" placeholder="" name="Tax"
                                 {...register("Tax", {
                                    required: "This input is required."
                                })}
                                onChange={(e) => setTaxidexp(e.target.value)} />
                                <label for="phoneNumber" className={"input-has-value"}>Tax id exp</label>
                                <p className="form-input-error">{errors.Tax?.message}</p> */}
                            </div>
                            {etax==="" && taxidexp===null?<p className="form-input-error"> Tax id exp  is required</p>:""}
                            </div>  

                          
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>  </div></div></div></div></div></div>
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

export default AddLegalAccount;