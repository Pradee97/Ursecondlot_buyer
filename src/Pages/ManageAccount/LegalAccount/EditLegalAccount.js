import React from 'react';
import moment from 'moment';
import API from "../../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommonPopup from '../../../Component/CommonPopup/CommonPopup';
import StateAndCity from '../../../Component/StateAndCity/StateAndCity'
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Component/Loading/Loading';
import Popup from '../../../Component/Popup/Popup';
import LateFee from '../../../Pages/LateFee/LateFee';
import Datetime from 'react-datetime';

const EditLegalAccount = (props) => {

    const history = useHistory();
    let { register, updateLegalAccount, formState: { errors },reset  } = useForm();
    // const { id } = useParams();
    const {id} = props.location.state;
    const [accountObjc, setAccountObj] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [legalBusinessname, setLegalBusinessname] = useState("");
    const [EINnumber, setEINnumber] = useState("");
    const [dealershiplicense, setDealershiplicense] = useState("");
    const [taxid, setTaxid] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [dealershipLicenseexp, setDealershipLicenseexp] = useState(null);
    const [taxidexp, setTaxidexp] = useState(null);

    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [legalBusinessnameError, setLegalBusinessnameError] = useState("");
    const [EINnumberError, setEINnumberError] = useState("");
    const [dealershiplicenseError, setDealershiplicenseError] = useState("");
    const [taxidError, setTaxidError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [dealershipLicenseexpError, setDealershipLicenseexpError] = useState("");
    const [taxidexpError, setTaxidexpError] = useState("");
    const [stateAndCityError, setStateAndCityError] = useState("")
    const [loading,setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);
    const yesterday = moment().subtract(1, 'day');
    const disablePastDt = current => {
      return current.isAfter(yesterday);
    };
	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  	}
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    
    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("")
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
  
    const getStateName=(stateData)=>{
        setState(stateData)
    }

    const getCityName=(cityData)=>{
        setCity(cityData)
    }

    const getZipCodeId=(zipData)=>{
        setZipcode(zipData)
    }

    async function fetchAccountDetails() {
        console.log(id)
        let request = {
            legal_manage_id: id,
        };
      
           
            const state = API.post('legal_manage/condition', request);
            state.then(res => {
            console.log("res", res.data.data)
            setFirstname(res.data.data[0].first_name);
            setLastname(res.data.data[0].last_name);
            setLegalBusinessname(res.data.data[0].bussiness_name);
            setEINnumber(res.data.data[0].ein_no);
            setDealershiplicense(res.data.data[0].dealer_license);
            setTaxid(res.data.data[0].tax_id);
            setAddress(res.data.data[0].address);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZipcode(res.data.data[0].zipcode);
            setDealershipLicenseexp(res.data.data[0].dealer_license_exp);
            setTaxidexp(res.data.data[0].tax_id_exp);

            setAccountObj(res.data.data[0])
            console.log("-====res.data.data[0].dealer_license_exp=====>",res.data.data[0].dealer_license_exp)
            console.log("================>",moment(accountObjc.dealer_license_exp).format('YYYY-MM-DD'))
            
        })
            .catch(err => { console.log(err); });
    }
  
    updateLegalAccount = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        setFirstnameError("")
        setLastnameError("")
        setLegalBusinessnameError("")
        setEINnumberError("")
        setDealershiplicenseError("")
        setTaxidError("")
        setAddressError("")
        setDealershipLicenseexpError("")
        setTaxidexpError("")
        setStateAndCityError("")

        let request = {
            first_name: firstname,
            last_name: lastname,
            legal_manage_id: id,
            ein_no: EINnumber,
            dealer_license: dealershiplicense,
            tax_id: taxid,
            address: address,
            // city_id: city,
            // state_id: state,
            // zipcode_id: zipcode,
            city_id: typeof city==='string'?accountObjc.city_id:city,
            state_id: typeof state==='string'?accountObjc.state_id:state,
            zipcode_id: zipcode===accountObjc.zipcode?accountObjc.zipcode_id:zipcode,
            dealer_license_exp: dealershipLicenseexp,
            tax_id_exp: taxidexp,
            bussiness_name:legalBusinessname,
            active:1,
            updatedBy:JSON.parse(JSON.stringify(loggedInBuyerId)).buyer_id 
           
        };

        if(!firstname){
            setFirstnameError("First Name is required")
            return;
        }
        else if(firstname.length>50){
            setFirstnameError("First Name must not exceed 50 characters")
            return;
        }
        if(!lastname){
            setLastnameError("Last Name is required")
            return;
        }
        else if(lastname.length>50){
            setLastnameError("Last Name must not exceed 50 characters")
            return;
        } 
        if(!legalBusinessname){
            setLegalBusinessnameError("Legal Businessname is required")
            return;
        }
        else if(legalBusinessname.length>50){
            setLegalBusinessnameError("Legal Businessname must not exceed 50 characters")
            return;
        }
        if(!EINnumber){
            setEINnumberError("EIN Number is required")
            return;
        }
        else if(EINnumber.length>50){
            setEINnumberError("EIN Number must not exceed 50 characters")
            return;
        }
        if(!dealershiplicense){
            setDealershiplicenseError("Dealership License is required")
            return;
        }
        else if(dealershiplicense.length>50){
            setDealershiplicenseError("Dealership License must not exceed 50 characters")
            return;
        }
        if(!taxid){
            setTaxidError("Tax Id is required")
            return;
        }
        else if(taxid.length>50){
            setTaxidError("Tax Id must not exceed 50 characters")
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
        if(!dealershipLicenseexp){
            setDealershipLicenseexpError("Dealership License exp is required")
            return;
        }
        if(!taxidexp){
            setTaxidexpError("Tax Id exp is required")
            return;
        }
        // if(!(typeof city==='string'?accountObjc.city_id:city) || !(typeof state==='string'?accountObjc.state_id:state) || !(zipcode===accountObjc.zipcode?accountObjc.zipcode_id:zipcode)){
        //     setStateAndCityError("State, City and Zipcode is required")
        //     return
        // }

        if(!(typeof state==='string'?accountObjc.state_id:state)){
            setStateAndCityError("state is required")
            return
        }
        if(!(typeof city==='string'?accountObjc.city_id:city)){
            setStateAndCityError("city is required")
             return
        }
        if(!(zipcode===accountObjc.zipcode?accountObjc.zipcode_id:zipcode)){
            setStateAndCityError("zipcode is required")
             return
        }


        API
            .post('legal_manage/update', request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    togglePopup()
                    setPopupTitle("Edit Legal ManageAccount");
                    setPopupMsg(" Edit Legal ManageAccount is successfully Updated");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")

                } else {
                    togglePopup()
                    setPopupTitle("Edit Legal ManageAccount");
                    // setPopupMsg("Edit Legal ManageAccount is not update, Please try Again");
                    setPopupMsg( response.data.error.err );
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
            });
    }

    useEffect(() => {
      //fetchAccountDetails();
      let request = {
        legal_manage_id: id,
    };
  
       
        const state = API.post('legal_manage/condition', request);
        state.then(res => {
        console.log("res", res.data.data)
        setFirstname(res.data.data[0].first_name);
        setLastname(res.data.data[0].last_name);
        setLegalBusinessname(res.data.data[0].bussiness_name);
        setEINnumber(res.data.data[0].ein_no);
        setDealershiplicense(res.data.data[0].dealer_license);
        setTaxid(res.data.data[0].tax_id);
        setAddress(res.data.data[0].address);
        setCity(res.data.data[0].city_name);
        setState(res.data.data[0].state_name);
        setZipcode(res.data.data[0].zipcode);
        setDealershipLicenseexp(res.data.data[0].dealer_license_exp);
        setTaxidexp(res.data.data[0].tax_id_exp);
        setAccountObj(res.data.data[0]);
        reset(res.data.data[0]);
        setLoading(false);
        
    })
        .catch(err => { console.log(err); });
    }, [reset]);

    const getlateFee=()=>{
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
        }
        
        API.post('getlatefee/condition',request).then(res=>{
           if(res.data.data.length){
            
       console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
            const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
            setIsLateFee(lateFeeValueStatus==="yes")
            setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
           }
          
    
        }).catch(err=>{console.log(err);});
    }

    useEffect(() => {

        getlateFee();

    }, []);
    const inputProps1 = {
        placeholder: taxidexp,
        // value : expiration
        };
    const Date1 = (event) => {
        setTaxidexp(event.format("YYYY/MM/DD"))
        }
    const inputProps = {
    placeholder: dealershipLicenseexp,
    // value : expiration
    };
    const Date = (event) => {
        setDealershipLicenseexp(event.format("YYYY/MM/DD"))
        }
    return (
        <div>
          {loading?<Loading/>:
            <main id="main" className="inner-page">
            <div id="addaddress" className="addaddress_block">
            <div className="container" >
            <div className="addaddressblock col-lg-12">
            <div className="section-title">
                                <h2>Edit Legal Manage Account</h2>
                            </div>
			<div className="row content">
            <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                  
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0  flooraddform">
                <div className="adduserpage-inner"> 
                <div className="col-lg-12">

                    <form className="registrationform" onSubmit={updateLegalAccount} >                   
                        
                        <div className="row">
                        <div className="section-title">
                        <button className="back-btn-paymentform backBtn" onClick={() => history.push("/manageaccount")}><i className="icofont-arrow-left"></i> Back</button>   
							<h2>Edit Legal Manage Account</h2>
						</div>

                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  defaultValue={accountObjc.first_name} className="form-control textbox" placeholder=""  onChange={(e) => setFirstname(e.target.value)} />
                                <label htmlFor="first_name" className={firstname !="" ? "input-has-value" : ""}>First Name</label>
                            </div><p className="form-input-error" >{firstnameError}</p>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.last_name} className="form-control textbox" placeholder=""  onChange={(e) => setLastname(e.target.value)} />
                                <label htmlFor="first_name" className={lastname !="" ? "input-has-value" : ""}>Last Name</label>
                            </div><p className="form-input-error" >{lastnameError}</p>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.bussiness_name} className="form-control textbox" placeholder=""  onChange={(e) => setLegalBusinessname(e.target.value)} />
                                <label htmlFor="first_name" className={legalBusinessname !="" ? "input-has-value" : ""}>Legal Business Name</label>
                            </div><p className="form-input-error" >{legalBusinessnameError}</p>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.ein_no} className="form-control textbox" placeholder=""  onChange={(e) => setEINnumber(e.target.value)} />
                                <label htmlFor="first_name" className={EINnumber !="" ? "input-has-value" : ""}>EIN Number</label>
                            </div><p className="form-input-error" >{EINnumberError}</p>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.dealer_license} className="form-control textbox" placeholder=""  onChange={(e) => setDealershiplicense(e.target.value)} />
                                <label htmlFor="first_name" className={dealershiplicense !="" ? "input-has-value" : ""}>Dealership License</label>
                            </div><p className="form-input-error" >{dealershiplicenseError}</p>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.tax_id} className="form-control textbox" placeholder=""  onChange={(e) => setTaxid(e.target.value)} />
                                <label htmlFor="first_name" className={taxid !="" ? "input-has-value" : ""}>Tax Id</label>
                            </div><p className="form-input-error" >{taxidError}</p>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.address} className="form-control textbox" placeholder=""  onChange={(e) => setAddress(e.target.value)} />
                                <label htmlFor="first_name" className={address !="" ? "input-has-value" : ""}>Address</label>
                            </div><p className="form-input-error" >{addressError}</p>
                            </div>
                            <StateAndCity 
                                setStateValue = { getStateName } 
                                setCityValue ={ getCityName }
                                setZipcodeValue ={ getZipCodeId }
                                isEdit = {true}
                                defaultStateValue = {state}
                                defaultCityValue = {city}
                                defaultZipcodeValue = {zipcode}
                            />
                             <div className="col-sm-12 form-group selectboxError">
                            <p className="form-input-error"> {stateAndCityError} </p>
                            </div>
                            <div className="col-sm-12 form-group datePickerBlock">
                            <div className="tbox">  
                            <Datetime inputProps={ inputProps } timeFormat={false} dateFormat="YYYY/MM/DD" 
                                    name="Date" isValidDate={disablePastDt} onChange={Date} 
                                     id="meeting_date"/>
                                 {/* <DatePicker
                                    className="form-control textbox" name="dealershipLicenseexp" id="dealershipLicenseexp"                                                        
                                    autoComplete="off"
                                    selected={ dealershipLicenseexp == null ? null : dealershipLicenseexp }
                                    onChange={(date) => setDealershipLicenseexp(date)}
                                    placeholderText="DOJ"
                                    onChangeRaw={handleDateChangeRaw}
                                /> */}
                                <label htmlFor="first_name" className={dealershipLicenseexp !="" ? "input-has-value" : ""}>Dealership license exp</label>
                            </div> <p className="form-input-error" >{dealershipLicenseexpError}</p>
                            </div>
                            <div className="col-sm-12 form-group datePickerBlock">
                            <div className="tbox">
                            <Datetime inputProps={ inputProps1 } timeFormat={false} dateFormat="YYYY/MM/DD" 
                                    name="Date" isValidDate={disablePastDt} onChange={Date1} 
                                     id="meeting_date"/>
                                {/* <DatePicker
                                    className="form-control textbox" name="taxidexp" id="taxidexp"                                                        
                                    autoComplete="off"
                                    selected={ taxidexp == null ? null : taxidexp }
                                    onChange={(date) => setTaxidexp(date)}
                                    placeholderText="DOJ"
                                    onChangeRaw={handleDateChangeRaw}
                                /> */}
                                <label htmlFor="first_name" className={taxidexp!="" ? "input-has-value" : ""}>Tax id exp</label>
                            </div><p className="form-input-error" >{taxidexpError}</p>
                            </div>
                            <div className="col-lg-12 loginBtn">
                                <button className="cta-btn">Update</button>
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

{isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />} 

            </main>
}
        </div>


    );
};

export default EditLegalAccount;