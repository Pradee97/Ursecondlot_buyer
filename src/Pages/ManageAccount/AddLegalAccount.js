import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import ls from 'local-storage';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';

const AddLegalAccount = () => {
    const history = useHistory();   
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
    const [dealershipLicenseexp, setDealershiplicenseexp] = useState("");
    const [taxidexp, setTaxidexp] = useState("");


    const onhandleSubmit = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = [{
            first_name: firstname,
            last_name: lastname,
            legal_manage_id: legalBusinessname,
            ein_no: EINnumber,
            dealer_license: dealershiplicense,
            tax_id: taxid,
            address: address,
            city_id: city,
            state_id: state,
            zipcode_id: zipcode,
            dealer_license_exp: dealershipLicenseexp,
            tax_id_exp: taxidexp,
            buyer_id:userDetails.id,

            active:1
        }];
        console.log("===",request)
        // return
        API.post("#", request)
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
                    setPopupMsg(error," Please try Again");
                    setPopupType("error");
                    setPopupActionType("close");
                    setPopupActionValue("close");
            });

    }

    return (
        <div>
<main id="main" className="inner-page">
                <div className="col-lg-4 card loginBlock flooraddform">
                    <form className="registrationform" onSubmit={onhandleSubmit} >
                        {/* <button className="back-btn-paymentform" onClick={() => history.push("/#")}>Back</button>               */}
                        <h2 className="title">Add Legal Manage Account </h2>
                        <div className="row">
                        <div className="col-sm-12 form-group"> 
                            <div className="tbox">
                                <input type="text"  id="contactName" className="textbox" placeholder="" required onChange={(e) => setFirstname(e.target.value)} />
                                <label for="contactName" className={firstname !="" ? "input-has-value" : ""}>First name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  id="companyName" className="textbox" placeholder="" required onChange={(e) => setLastname(e.target.value)} />
                                <label for="companyName" className={lastname !="" ? "input-has-value" : ""}>Last name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="branchName" className="textbox" placeholder="" required onChange={(e) => setLegalBusinessname(e.target.value)} />
                                <label for="branchName" className={legalBusinessname !="" ? "input-has-value" : ""}>Legal business name</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="accountNumber" className="textbox" placeholder="" required onChange={(e) => setEINnumber(e.target.value)} />
                                <label for="accountNumber" className={EINnumber !="" ? "input-has-value" : ""}>EIN number</label>
                            </div>
                            </div>
                           
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="creditLimit" className="textbox" placeholder="" required onChange={(e) => setDealershiplicense(e.target.value)} />
                                <label for="creditLimit" className={dealershiplicense !="" ? "input-has-value" : ""}>Dealership license</label>
                            </div>
                            </div>
                            
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="emailId" className="textbox" placeholder="" required onChange={(e) => setTaxid(e.target.value)} />
                                <label for="emailId" className={taxid !="" ? "input-has-value" : ""}>Tax id</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" id="address" className="textbox" placeholder="" required onChange={(e) => setAddress(e.target.value)} />
                                <label for="address" className={address !="" ? "input-has-value" : ""}>Address</label>
                            </div>
                            </div>
                            <div className="col-sm-12 form-group">
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
                            </div>  
                            <div className="col-sm-12 form-group">
                             <div className="tbox">                            
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setDealershiplicenseexp(e.target.value)} />
                                <label for="phoneNumber" className={dealershipLicenseexp !="" ? "input-has-value" : ""}>Dealership license exp</label>
                            </div>
                            </div>  
                            <div className="col-sm-12 form-group">
                             <div className="tbox">                            
                                <input type="text" id="phoneNumber" className="textbox" placeholder="" required onChange={(e) => setTaxidexp(e.target.value)} />
                                <label for="phoneNumber" className={taxidexp !="" ? "input-has-value" : ""}>Tax id exp</label>
                            </div>
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