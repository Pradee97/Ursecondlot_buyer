import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import {
  Button
} from 'antd';
const ManageAccount = () => {
  const history = useHistory();
  const [accountDetails, setaccountDetails] = useState("");
  const [dealerInfo, setDealerInfo] = useState("");
  const [addressDetails, setaddressDetails] = useState("");
  const [legaldetails, setLegalDetails] = useState("");

  async function fetchAccountDetails() {
    let request = {
      buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
    };
    const state = API.post('user_profile/condition', request);
    state.then(res => {
      console.log("res", res)
      setaccountDetails(res.data.data);
      setDealerInfo(res.data.data);
    })
      .catch(err => { console.log(err); });
  }
  async function fetchAddressDetails() {
    let request = {
      buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
    };
    const state = API.post('buyerAddress/condition', request);
    state.then(res => {
      console.log("res", res)
      setaddressDetails(res.data.data);
    })
      .catch(err => { console.log(err); });
  }


  async function fetchLegalDetails() {
    let request = {
      buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
    };
    const state = API.post('legalAccccount/condition', request);
    state.then(res => {
      console.log("res", res)
      setLegalDetails(res.data.data);
    })
      .catch(err => { console.log(err); });
  }


  function onHandleEdit(e) {
    history.push("/legaledit/" + e);
  }
  function onHandleDealerEdit(e) {
    history.push("/dealerinfoedit/" + e);
  }
  function onHandleAddressEdit(e) {
    history.push("/addressedit/" + e);
  }

  useEffect(() => {
    fetchAccountDetails();
    fetchLegalDetails();
    fetchAddressDetails();
  }, []);
  return (
    <div>
      <main id="main" className="inner-page">
        <div id="mgaccount" className="mgaccount">
          <div className="container" >
            <div className="mgaccountblock col-lg-12">
              <div className="section-title">
                <h2>Manage Account</h2>
              </div>
              <div className="row content">
                <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                  <div className="mgaccountuser">
                    <div className="mgaccountuserleft">
                      <img src={process.env.PUBLIC_URL + "/images/userimg.jpg"} className="img-fluid" alt="..." />
                    </div>
                    <div className="mgaccountuserright">
                      <h3>Fernand</h3>
                      <div className="d-flex align-items-center">
                        <p className="details"><img src={process.env.PUBLIC_URL + "/images/Path.svg"} className="img-fluid" alt="..." /><span>California, Cl</span></p>
                      </div>
                    </div>
                  </div>
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 mgaccountrightblock">
                  {dealerInfo.length > 0 ? dealerInfo.map((item, index) =>
                    <div className="mgaccountrighttableblock">
                      <h3>Dealer Information <span><Button class="ant-btn" onClick={() => onHandleDealerEdit(item.user_id)}><i class="icofont-ui-edit"></i>  Edit</Button></span></h3>
                      <p>Titles Will be sent to this address title will not be shipped in to physical address</p>
                      <div className="mgaccountrighttable">
                        <h4>Dealer Name</h4>
                        <h5>Jack</h5>
                        <table>
                          <thead></thead>
                          <tr>
                            <td>First name<span>{item.first_name}</span></td>
                            <td>Address <span>{item.address}</span></td>
                          </tr>
                          <tr>
                            <td>Last name<span>{item.last_name}</span></td>
                            <td>City<span>{item.city_name}</span></td>
                          </tr>
                          <tr>
                            <td>Phone<span>{item.phone_no}</span></td>
                            <td>State<span>{item.state_name}</span></td>
                          </tr>
                          <tr>
                            <td>Mobile<span>{item.mobile_phone}</span></td>
                            <td>Zip code<span>{item.zipcode_id}</span></td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  ) : ""}
                  {addressDetails.length > 0 ? addressDetails.map((item, index) =>
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Address<span>
                        <Button class="ant-btn" onClick={() => onHandleAddressEdit(item.buyer_address_id)}><i class="icofont-ui-edit"></i>  Edit</Button></span>
                      </h3>
                      <p>Location where transport carriers will drop of a vehicle that you have purchased</p>
                      <div className="mgaccountrighttable">
                        <table>
                          <thead></thead>
                          <tr>
                            <td>First name<span>{item.first_name}</span></td>
                            <td>Address<span>{item.address}</span></td>
                          </tr>
                          <tr>
                            <td>Last name<span>{item.last_name}</span></td>
                            <td>City<span>{item.city_name}</span></td>
                          </tr>
                          <tr>
                            <td>Primary phone<span>{item.phone_no}</span></td>
                            <td>State<span>{item.state_name}</span></td>
                          </tr>
                          <tr>
                            <td>Mobile phone<span>{item.mobile_no}</span></td>
                            <td>Zip code<span>{item.zipcode_id}</span></td>
                          </tr>
                        </table>
                        <h4>Location name</h4>
                        <h6>Horizon fairway - Computer number 693</h6>
                        <h4>Instructions</h4>
                        <h6>Computer number 693</h6>
                      </div>
                    </div>
                  ) :
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Address<span>
                        <Button class="ant-btn" onClick={() => history.push("/addressadd")}><i class="icofont-plus"></i> Add</Button></span>
                      </h3>
                    </div>
                  }
                  {legaldetails.length > 0 ? legaldetails.map((item, index) =>
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Legal manage account<span>                        
                        <Button class="ant-btn" onClick={() => onHandleEdit(item.legal_manage_id)}><i class="icofont-ui-edit"></i> Edit</Button></span>
                      </h3>
                      <p>Legal document sent to your address</p>
                      <div className="mgaccountrighttable">
                        <table>
                          <thead></thead>
                          <tr>
                            <td>First name<span>{item.first_name}</span></td>
                            <td>Address<span>{item.address}</span></td>
                          </tr>
                          <tr>
                            <td>Last name<span>{item.last_name}</span></td>
                            <td>City<span>{item.city_name}</span></td>
                          </tr>
                          <tr>
                            <td>Legal business name<span>{item.bussiness_name}</span></td>
                            <td>State<span>{item.state_name}</span></td>
                          </tr>
                          <tr>
                            <td>EIN number<span>{item.ein_no}</span></td>
                            <td>Zip code<span>{item.zipcode_id}</span></td>
                          </tr>
                          <tr>
                            <td>Dealership license<span>{item.dealer_license}</span></td>
                            <td>Dealership license exp<span>{item.dealer_license_exp}</span></td>
                          </tr>
                          <tr>
                            <td>Tax id<span>{item.tax_id}</span></td>
                            <td>Tax id exp<span>{item.tax_id_exp}</span></td>
                          </tr>
                        </table>
                        <h4>Location name</h4>
                        <h6>Horizon fairway - Computer number 693</h6>

                        <h4>Instructions</h4>
                        <h6>Computer number 693</h6>
                      </div>

                    </div>
                  ) :
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Legal manage account<span>
                        <Button class="ant-btn" onClick={() => history.push("/legaladd")}><i class="icofont-plus"></i> Add</Button>
                      </span> </h3>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
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
  );
};

export default ManageAccount;