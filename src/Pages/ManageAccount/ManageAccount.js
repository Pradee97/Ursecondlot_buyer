import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
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

const ManageAccount = () => {
    const history = useHistory();
    const [accountDetails, setaccountDetails] = useState("");
    async function fetchAccountDetails() {
      let request = {
          buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
      };
      const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/user_profile/condition', request);
      state.then(res => {
          console.log("res", res)
          setaccountDetails(res.data.data);
      })
          .catch(err => { console.log(err); });
    }
  useEffect(() => {
    fetchAccountDetails();
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
                               <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} className="img-fluid" alt="..."/>
                           </div>
                           <div className="mgaccountuserright">
                               <h3>Fernand</h3>
                               <div className="d-flex align-items-center">
                                   <p className="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} className="img-fluid" alt="..."/><span>California, Cl</span></p>
                               </div>
                                   
                           </div>
                       </div>
                       
                       <div className="mgaccountuserlinks">
                               <div className="userlinks">
                                 <ul>
                                   <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt=""/><a href="/notification">Notification</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt=""/><a href="/paymentinfo">Payment</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt=""/><a href="#">Document</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt=""/><a href="#">Add User</a></li>
                                   </ul>
                               </div>
                           </div>
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 mgaccountrightblock">
                       <div className="mgaccountrighttableblock"> 
                           <h3>Dealer Information <span><a href="#">Edit</a></span></h3>
                           <p>Titles Will be sent to this address title will not be shipped in to physical address</p>
                           <div className="mgaccountrighttable">
                           <h4>Dealer Name</h4>	
                               <h5>Jack</h5>	
                               <table>
                                 <thead></thead>								
                                 <tr>
                                   <td>Address <span>Horizon Ave, California, Cl</span></td>
                                   <td>State<span>California</span></td>
                                 </tr>
                                <tr>
                                   <td>City<span>Fresno</span></td>
                                   <td>Zip code<span>90011</span></td>
                                 </tr>				 
                                
                               </table>            
                           </div>
                       </div>
                       
                       <div className="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Contact information<span><a href="#">Edit</a></span></h3>							
                           <div className="mgaccountrighttable">
                               <table>
                                 <thead></thead>								 
                                 <tr>
                                   <td>First name<span>williams</span></td>
                                   <td>Phone<span>746-561-6784</span></td>
                                 </tr>
                                <tr>
                                   <td>Last name<span>sonoma</span></td>
                                   <td>Mobile<span>421-233-4332</span></td>
                                 </tr>				 
                                
                               </table>            
                           </div>
                       </div>
                       
                       <div className="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Address<span><a href="#">Edit</a></span></h3>	
                           <p>Location where transport carriers will drop of a vehicle that you have purchased</p>							
                           <div className="mgaccountrighttable">
                               <table>
                                 <thead></thead>
                                   <tr>
                                   <td>First name<span>williams</span></td>
                                   <td>Address<span>Horizon Ave, California, Cl</span></td>
                                 </tr>								  
                                 <tr>
                                   <td>Last name<span>botero</span></td>
                                   <td>City<span>Fresno</span></td>
                                 </tr>
                                <tr>
                                   <td>Primary phone<span>746-561-6784</span></td>
                                   <td>State<span>California</span></td>
                                 </tr>	
                                   <tr>
                                   <td>Mobile phone<span>746-561-6784</span></td>
                                   <td>Zip code<span>90011</span></td>
                                 </tr>	
                               </table> 
                               <h4>Location name</h4>	
                               <h5>Horizon fairway - Computer number 693</h5>

                               <h4>Instructions</h4>	
                               <h5>Computer number 693</h5>									
                           </div>
                       </div>
                       
                       <div className="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Legal manage account<span><a href="/legalaccountedit">Edit</a></span></h3>	
                           <p>Legal document sent to your address</p>	

               {accountDetails.length>0?accountDetails.map((item,index) =>
                           <div className="mgaccountrighttable">
                               <table>
                                 <thead></thead>
                                   <tr>
                                   <td>First name<span>{item.first_name}</span></td>
                                   <td>Address<span>{item.address}</span></td>
                                 </tr>								  
                                 <tr>
                                   <td>Last name<span>{item.last_name}</span></td>
                                   <td>City<span>{item.city}</span></td>
                                 </tr>
                                <tr>
                                   <td>Primary phone<span>{item.primary_phone}</span></td>
                                   <td>State<span>{item.state}</span></td>
                                 </tr>	
                                   <tr>
                                   <td>Mobile phone<span>{item.mobile_phone}</span></td>
                                   <td>Zip code<span>{item.zip_code}</span></td>
                                 </tr>	
                               </table> 
                               <h4>Location name</h4>	
                               <h5>Horizon fairway - Computer number 693</h5>

                               <h4>Instructions</h4>	
                               <h5>Computer number 693</h5>									
                           </div>
                )  :""}

                       </div>
                       
                       <div className="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Manage Account Password<span><a href="/changepassword">Edit</a></span></h3>
                       </div>
                       
                                  
                   </div>
               </div>
           </div>
       </div>
   </div>
   
   
   <section id="playstoreBlock" className="playstoreBlock">
     <div className="container">


       <div className="row content">
         <div className="col-lg-12">
         <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
           <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
          
         </div>
        
       </div>

     </div>
   </section>
   </main>
  


 </div>
        );
    };
    
  export default ManageAccount ;