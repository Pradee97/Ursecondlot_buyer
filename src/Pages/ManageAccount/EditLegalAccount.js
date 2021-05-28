import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import StateAndCity from '../../Component/StateAndCity/StateAndCity'
import {
    Form,
    Input,
    Select,
    AutoComplete,
    Radio,
    notification,
    Spin,
} from 'antd';

const EditLegalAccount = () => {
    const history = useHistory();
    const { id } = useParams();
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
    const [dealershipLicenseexp, setDealershipLicenseexp] = useState("");
    const [taxidexp, setTaxidexp] = useState("");

    const [isCommonPopupOpen, setIsCommonPopupOpen] = useState(false);
	const [option, setOption] = useState("");
	const [popupTitle, setPopupTitle] = useState("");
	const [popupMsg, setPopupMsg] = useState("");
	const [popupType, setPopupType] = useState("");
	const [popupActionType, setPopupActionType] = useState("");
	const [popupActionValue, setPopupActionValue] = useState("");
	const [popupActionPath, setPopupActionPath] = useState("");
  
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
            setLegalBusinessname(res.data.data[0].legal_manage_id);
            setEINnumber(res.data.data[0].ein_no);
            setDealershiplicense(res.data.data[0].dealer_license);
            setTaxid(res.data.data[0].tax_id);
            setAddress(res.data.data[0].address);
            setCity(res.data.data[0].city_name);
            setState(res.data.data[0].state_name);
            setZipcode(res.data.data[0].zipcode_id);
            setDealershipLicenseexp(res.data.data[0].dealer_license_exp);
            setTaxidexp(res.data.data[0].tax_id_exp);

            setAccountObj(res.data.data[0])
        })
            .catch(err => { console.log(err); });
    }
  
    const updateLegalAccount = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
            first_name: firstname,
            last_name: lastname,
            legal_manage_id: id,
            ein_no: EINnumber,
            dealer_license: dealershiplicense,
            tax_id: taxid,
            address: address,
            city_id: city,
            state_id: state,
            zipcode_id: zipcode,
            dealer_license_exp: dealershipLicenseexp,
            tax_id_exp: taxidexp,
            bussiness_name:legalBusinessname,
            active:1
           
        };
        API
            .post('legal_manage/update', request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response.data)
                    toggleCommonPopup()
                    setPopupTitle("Legal Account successfully Updated");
                    setPopupMsg("");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/manageaccount")
                } else {
                    toggleCommonPopup()
                    setPopupTitle("Error");
                    setPopupMsg("Legal Account failed to Update, Please try Again");
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
    const toggleCommonPopup = () => {
        setIsCommonPopupOpen(!isCommonPopupOpen);
    }

    useEffect(() => {
      fetchAccountDetails();
    }, []);
    return (
        <div>
            <main id="main" class="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form class="registrationform" onSubmit={updateLegalAccount} >
                    <button className="back-btn-paymentform" onClick={() => history.push("/manageaccount")}>Back</button>
                        <h2 class="title"> LegalManageAccount Edit</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text"  defaultValue={accountObjc.first_name} class="form-control textbox" placeholder="" required onChange={(e) => setFirstname(e.target.value)} />
                                <label for="first_name" className={firstname !="" ? "input-has-value" : ""}>First Name</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.last_name} class="form-control textbox" placeholder="" required onChange={(e) => setLastname(e.target.value)} />
                                <label for="first_name" className={lastname !="" ? "input-has-value" : ""}>Last Name</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.bussiness_name} class="form-control textbox" placeholder="" required onChange={(e) => setLegalBusinessname(e.target.value)} />
                                <label for="first_name" className={legalBusinessname !="" ? "input-has-value" : ""}>Legal Business Name</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.ein_no} class="form-control textbox" placeholder="" required onChange={(e) => setEINnumber(e.target.value)} />
                                <label for="first_name" className={EINnumber !="" ? "input-has-value" : ""}>EIN Number</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.dealer_license} class="form-control textbox" placeholder="" required onChange={(e) => setDealershiplicense(e.target.value)} />
                                <label for="first_name" className={dealershiplicense !="" ? "input-has-value" : ""}>Dealership License</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.tax_id} class="form-control textbox" placeholder="" required onChange={(e) => setTaxid(e.target.value)} />
                                <label for="first_name" className={taxid !="" ? "input-has-value" : ""}>Tax Id</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.address} class="form-control textbox" placeholder="" required onChange={(e) => setAddress(e.target.value)} />
                                <label for="first_name" className={address !="" ? "input-has-value" : ""}>Address</label>
                            </div>
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
                            {/* <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.city_name} class="form-control textbox" placeholder="" required onChange={(e) => setCity(e.target.value)} />
                                <label for="first_name" className={city !="" ? "input-has-value" : ""}>City</label>
                            </div>
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.state_name} class="form-control textbox" placeholder="" required onChange={(e) => setState(e.target.value)} />
                                <label for="first_name" className={state !="" ? "input-has-value" : ""}>State</label>
                            </div>
                            </div>
                             <div class="col-sm-12 form-group">
                             <div className="tbox">
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="form-control textbox" placeholder="" required onChange={(e) => setZipcode(e.target.value)} />
                                <label for="first_name" className={zipcode !="" ? "input-has-value" : ""}>Zip code</label>
                            </div> 
                            </div> */}
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.dealer_license_exp} class="form-control textbox" placeholder="" required onChange={(e) => setDealershipLicenseexp(e.target.value)} />
                                <label for="first_name" className={dealershipLicenseexp !="" ? "input-has-value" : ""}>Dealership license exp</label>
                            </div> 
                            </div>
                            <div class="col-sm-12 form-group">
                            <div className="tbox">
                                <input type="text" defaultValue={accountObjc.tax_id_exp} class="form-control textbox" placeholder="" required onChange={(e) => setTaxidexp(e.target.value)} />
                                <label for="first_name" className={taxidexp!="" ? "input-has-value" : ""}>Tax id exp</label>
                            </div>
                            </div>
                            <div class="col-lg-12 loginBtn">
                                <button class="cta-btn">Update</button>
                            </div>
                        </div>
                    </form>

                </div>
                <section id="playstoreBlock" class="playstoreBlock">
                    <div class="container">
                        <div class="row content">
                            <div class="col-lg-12">
                                <img src={process.env.PUBLIC_URL +"/images/appstore.png" }/>
                                <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
          
        </div>


    );
};

export default EditLegalAccount;