import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import Loading from "../../Component/Loading/Loading";
import {Button} from 'antd';
import Popup from '../../Component/Popup/Popup';
import LateFee from '../../Pages/LateFee/LateFee';

const ManageAccount = () => {
  
  const history = useHistory();
  const [accountDetails, setaccountDetails] = useState("");
  const [dealerInfo, setDealerInfo] = useState("");
  const [addressDetails, setaddressDetails] = useState("");
  const [legaldetails, setLegalDetails] = useState("");
  const [loading,setloading]=useState("");
  const [totalAmount,setTotalAmount] = useState("");

  const [isLateFee, setIsLateFee] = useState(false);
  const [lateFeeValue, setLateFeeValue] = useState(0);
  const [cell,setCell] =useState("");
  const [phoneNo,setPhoneNo] =useState("");

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  }

  async function fetchAccountDetails() {
    setloading(true);
    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
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
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
    };
    const state = API.post('buyerAddress/condition', request);
    state.then(res => {
      console.log("res", res)
      setaddressDetails(res.data.data);
      if (res.data?.data[0]?.phone_no != "" && res.data?.data[0]?.phone_no != null){
        formatCellMobile(res.data.data[0]?.phone_no)
        }
      if (res.data?.data[0]?.mobile_no != "" && res.data?.data[0]?.mobile_no != null){
          formatMobile(res.data.data[0]?.mobile_no)
          }
    })
      .catch(err => { console.log(err); });
  }


  async function fetchLegalDetails() {
    let request = {
      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
    };
    const state = API.post('legalAccccount/condition', request);
    state.then(res => {
      console.log("res", res)
      setLegalDetails(res.data.data);
      setloading(false);
    })
      .catch(err => { console.log(err); });
  }


  function onHandleEdit(item) {
    // history.push("/legaledit/" + e);
    history.push({pathname: "/legaledit",
    state: {id:item?.legal_manage_id}
  })
  }
  function onHandleDealerEdit(item) {
    // history.push("/dealerinfoedit/" + e);
    history.push({pathname: "/dealerinfoedit",
    state: {id:item?.buyer_dealer_id}
  })
  }
  function onHandleAddressEdit(item) {
    history.push({pathname: "/addressedit",
    state: {id:item?.buyer_address_id}
  })
  }

  const getTotalAmount = () => {

    let request = {

        buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,

    };

    API.post('getTotalAmount/condition', request).then(response => {
        console.log("get total amount response", response.data.data)
        setTotalAmount(response.data.data)
        
    })
        .catch(err => { console.log(err); });
}

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
    fetchAccountDetails();
    fetchLegalDetails();
    fetchAddressDetails();
    getTotalAmount();
  }, []);
  function formatCellMobile(value){
    var x = value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    console.log("formatPhoneNumber x",x);
    value = '+1'+ '('+ x[1] +')' + x[2] + '-' + x[3];
    console.log("formatPhoneNumber",value);
    return setCell(value);
  }
  function formatMobile(value){
    var x = value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    console.log("formatPhoneNumber x",x);
    value = '+1'+ '('+ x[1] +')' + x[2] + '-' + x[3];
    console.log("formatPhoneNumber",value);
    return setPhoneNo(value);
  }
  return (
    <div>
      {loading?<Loading/>:
      <main id="main" className="inner-page">
        <div id="mgaccount" className="mgaccount">
          <div className="container" >
            <div className="mgaccountblock col-lg-12">
              <div className="section-title">
                <h2>Manage Account</h2>
              </div>
              <div className="row content">
                <div className="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                 
                  <ManageAccountLinks />
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 mgaccountrightblock">
                  {dealerInfo.length > 0 ? dealerInfo.map((item, index) =>
                    <div className="mgaccountrighttableblock">
                      <h3>Dealer Information <span><Button className="ant-btn" onClick={() => onHandleDealerEdit(item)}><i className="icofont-ui-edit"></i>  Edit</Button></span></h3>
                      <p>Titles Will be sent to this address title will not be shipped in to physical address</p>
                      <div className="mgaccountrighttable">
                        <h4>Dealer Name</h4>
                        <h5>{item.dealer_name}</h5>
                        <table>
                          <thead></thead>
                          
                          <tr>
                            <td><span className="tdcol1">Address </span><span>{item.address}</span></td>
                            <td><span className="tdcol1">City</span><span>{item.city_name}</span></td>
                            {/* <td>First name<span>{item.first_name}</span></td> */}
                            
                            
                          </tr>
                          <tr>
                            {/* <td>Last name<span>{item.last_name}</span></td> */}
                            <td><span className="tdcol1">State</span><span>{item.state_name}</span></td>
                            <td><span className="tdcol1">Zip code</span><span>{item.zipcode}</span></td>
                          </tr>

                          <tr>
                            
                            <td><span className="tdcol1">Credit Limit</span><span>{item.credit_limit}</span></td>
                            <td><span className="tdcol1">Available Credit Limit</span><span>{Number(item.credit_limit) - Number(totalAmount)}</span></td>
                          </tr>

                        </table>

                        <p>( Please email us for increasing credit limit or Call us on - +1(223)333-6666 )</p>

                      </div>
                    </div>
                  ) : ""}
                  {addressDetails.length > 0 ? addressDetails.map((item, index) =>
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Address<span>
                        <Button className="ant-btn" onClick={() => onHandleAddressEdit(item)}><i className="icofont-ui-edit"></i>  Edit</Button></span>
                      </h3>
                      <p>Location where transport carriers will drop of a vehicle that you have purchased</p>
                      <div className="mgaccountrighttable">
                        <table>
                          <thead></thead>
                          <tr>
                            <td><span className="tdcol1">First name</span><span>{item.first_name}</span></td>
                            <td><span className="tdcol1">Address</span><span>{item.address}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Last name</span><span>{item.last_name}</span></td>
                            <td><span className="tdcol1">City</span><span>{item.city_name}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Primary phone #</span><span>{cell}</span></td>
                            <td><span className="tdcol1">State</span><span>{item.state_name}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Mobile phone #</span><span>{phoneNo}</span></td>
                            <td><span className="tdcol1">Zip code</span><span>{item.zipcode}</span></td>
                          </tr>
                        </table>
                        <h4>Location name</h4>
                        <h6>{item.location}</h6>
                        <h4>Instructions</h4>
                        <h6>{item.instructions}</h6>
                      </div>
                    </div>
                  ) :
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Address<span>
                        <Button className="ant-btn" onClick={() => history.push("/addressadd")}><i className="icofont-plus"></i> Add</Button></span>
                      </h3>
                    </div>
                  }
                  {legaldetails.length > 0 ? legaldetails.map((item, index) =>
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Legal manage account<span>                        
                        <Button className="ant-btn" onClick={() => onHandleEdit(item)}><i className="icofont-ui-edit"></i> Edit</Button></span>
                      </h3>
                      <p>Legal document sent to your address</p>
                      <div className="mgaccountrighttable">
                        <table>
                          <thead></thead>
                          <tr>
                            <td><span className="tdcol1">First name</span><span>{item.first_name}</span></td>
                            <td><span className="tdcol1">Address</span><span>{item.address}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Last name</span><span>{item.last_name}</span></td>
                            <td><span className="tdcol1">City</span><span>{item.city_name}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Legal business name</span><span>{item.bussiness_name}</span></td>
                            <td><span className="tdcol1">State</span><span>{item.state_name}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">EIN number</span><span>{item.ein_no}</span></td>
                            <td><span className="tdcol1">Zip code</span><span>{item.zipcode}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Dealership license</span><span>{item.dealer_license}</span></td>
                            <td><span className="tdcol1">Dealership license exp</span><span>{item.dealer_license_exp}</span></td>
                          </tr>
                          <tr>
                            <td><span className="tdcol1">Tax id</span><span>{item.tax_id}</span></td>
                            <td><span className="tdcol1">Tax id exp</span><span>{item.tax_id_exp}</span></td>
                          </tr>
                        </table>
                        {/* <h4>Location name</h4>
                        <h6>Horizon fairway - Computer number 693</h6>

                        <h4>Instructions</h4>
                        <h6>Computer number 693</h6> */}
                      </div>

                    </div>
                  ) :
                    <div className="mgaccountrighttableblock mt-3 pt-4">
                      <h3>Legal manage account<span>
                        <Button className="ant-btn" onClick={() => history.push("/legaladd")}><i className="icofont-plus"></i> Add</Button>
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

        {isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />}  

      </main>}
    </div>
  );
};

export default ManageAccount;