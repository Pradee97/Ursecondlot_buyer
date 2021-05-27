import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
// import '../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
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
  

    async function fetchAccountDetails() {
        console.log(id)
        
      
            let request = {
                buyer_id: id,
            };
            const state = API.post('legal_manage/condition', request);
            state.then(res => {
            console.log("res", res.data.data)
            setFirstname(res.data.data.first_name);
            setLastname(res.data.data.last_name);
            setLegalBusinessname(res.data.data.legal_manage_id);
            setEINnumber(res.data.data.ein_no);
            setDealershiplicense(res.data.data.dealer_license);
            setTaxid(res.data.data.tax_id);
            setAddress(res.data.data.address);
            setCity(res.data.data.city_id);
            setState(res.data.data.state_id);
            setZipcode(res.data.data.zipcode_id);
            setDealershipLicenseexp(res.data.data.dealer_license_exp);
            setTaxidexp(res.data.data.tax_id_exp);

            setAccountObj(res.data.data)
        })
            .catch(err => { console.log(err); });
    }
  
    const updateLegalAccount = (event) => {
        // setOpenLoader(true);
        event.preventDefault();        
    
        let request = {
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

            active:1
           
        };
        API
            .put('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/legal_manage/'+id, request)
            .then((response) => {
                if (response.data.success) {
                    const { data } = response;
                    console.log("response", response)
                    history.push("/success");
                } else {
                    history.push("emailerror");
                }
            }, (error) => {
                // setOpenLoader(false);
                // console.log(error);
            });

    }

    useEffect(() => {
      fetchAccountDetails();
    }, []);
    return (
        <div>
            <main id="main" class="inner-page">
                <div className="col-lg-4 card loginBlock">
                    <form class="registrationform" onSubmit={updateLegalAccount} >
                        <h2 class="title"> LegalManageAccount Edit</h2>
                        <div class="row">

                            <div class="col-sm-12 form-group">
                                <input type="text"  defaultValue={accountObjc.first_name} class="form-control" placeholder="First name" required onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.last_name} class="form-control" placeholder="Last name" required onChange={(e) => setLastname(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.legal_manage_id} class="form-control" placeholder="Legal business name" required onChange={(e) => setLegalBusinessname(e.target.value)} />
                            </div>

                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.ein_no} class="form-control" placeholder="EIN number" required onChange={(e) => setEINnumber(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.dealer_license} class="form-control" placeholder="Dealership license" required onChange={(e) => setDealershiplicense(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.tax_id} class="form-control" placeholder="Tax id" required onChange={(e) => setTaxid(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.address} class="form-control" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.city_id} class="form-control" placeholder="City" required onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.state_id} class="form-control" placeholder="State" required onChange={(e) => setState(e.target.value)} />
                            </div>
                             <div class="col-sm-12 form-group">
                                <input type="number" defaultValue={accountObjc.zipcode_id} class="form-control" placeholder="Zip code" required onChange={(e) => setZipcode(e.target.value)} />
                            </div> 
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.dealer_license_exp} class="form-control" placeholder="Dealership license exp" required onChange={(e) => setDealershipLicenseexp(e.target.value)} />
                            </div> 
                            <div class="col-sm-12 form-group">
                                <input type="text" defaultValue={accountObjc.tax_id_exp} class="form-control" placeholder="Tax id exp" required onChange={(e) => setTaxidexp(e.target.value)} />
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