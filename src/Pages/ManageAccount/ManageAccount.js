<<<<<<< HEAD
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
import googleApiKey from '../../Constant/config.js'

import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/icofont/icofont.min.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/venobox/venobox.css';
import '../../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../../assets/vendor/aos/aos.css';


import '../../assets/css/style.css';




const ManageAccount = () => {
    const history = useHistory();
    const [accountDetails, setaccountDetails] = useState("");
    async function fetchAccountDetails() {
      let request = {
          buyer_id: 1,
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
<main id="main" class="inner-page">
   
  
   <div id="mgaccount" class="mgaccount">
       <div class="container" >
           <div class="mgaccountblock col-lg-12">
               <div class="section-title">
                 <h2>Manage Account</h2>
               </div>
               <div class="row content">
                   <div class="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                       <div class="mgaccountuser">
                           <div class="mgaccountuserleft">
                               <img src="userimg.jpg" class="img-fluid" alt="..."/>
                           </div>
                           <div class="mgaccountuserright">
                               <h3>Fernand</h3>
                               <div class="d-flex align-items-center">
                                   <p class="details"><img src="Path.svg" class="img-fluid" alt="..."/><span>California, Cl</span></p>
                               </div>
                                   
                           </div>
                       </div>
                       
                       <div class="mgaccountuserlinks">
                               <div class="userlinks">
                                 <ul>
                                   <li><img src="Icon awesome-user.svg" class="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
                                   <li><img src="Icon awesome-bell.svg" class="img-fluid" alt=""/><a href="/notification">Notification</a></li>
                                   <li><img src="dollar-symbol.svg" class="img-fluid" alt=""/><a href="/payment">Payment</a></li>
                                   <li><img src="fees.svg" class="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
                                   <li><img src="google-docs.svg" class="img-fluid" alt=""/><a href="#">Document</a></li>
                                   <li><img src="profile.svg" class="img-fluid" alt=""/><a href="#">Add User</a></li>
                                   </ul>
                               </div>
                           </div>
                   </div>
                   <div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 mgaccountrightblock">
                       <div class="mgaccountrighttableblock"> 
                           <h3>Dealer Information <span><a href="#">Edit</a></span></h3>
                           <p>Titles Will be sent to this address title will not be shipped in to physical address</p>
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Contact information<span><a href="#">Edit</a></span></h3>							
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Address<span><a href="#">Edit</a></span></h3>	
                           <p>Location where transport carriers will drop of a vehicle that you have purchased</p>							
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Legal manage account<span><a href="/legalmanageaccountedit">Edit</a></span></h3>	
                           <p>Legal document sent to your address</p>	

               {accountDetails.length>0?accountDetails.map((item,index) =>
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Manage Account Password<span><a href="#">Edit</a></span></h3>
                       </div>
                       
                                  
                   </div>
               </div>
           </div>
       </div>
   </div>
   
   
   <section id="playstoreBlock" class="playstoreBlock">
     <div class="container">


       <div class="row content">
         <div class="col-lg-12">
           <img src="appstore.png" />
           <img src="googleplay.png" />
          
         </div>
        
       </div>

     </div>
   </section>
   </main>
  


 </div>
        );
    };
    
=======
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
import googleApiKey from '../../Constant/config.js'

import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/icofont/icofont.min.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/venobox/venobox.css';
import '../../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../../assets/vendor/aos/aos.css';


import '../../assets/css/style.css';




const ManageAccount = () => {
    const history = useHistory();
    const [accountDetails, setaccountDetails] = useState("");
    async function fetchAccountDetails() {
      let request = {
          buyer_id: 1,
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
<main id="main" class="inner-page">
   
  
   <div id="mgaccount" class="mgaccount">
       <div class="container" >
           <div class="mgaccountblock col-lg-12">
               <div class="section-title">
                 <h2>Manage Account</h2>
               </div>
               <div class="row content">
                   <div class="col-lg-3 col-md-4 col-sm-12 mgaccountleftblock">
                       <div class="mgaccountuser">
                           <div class="mgaccountuserleft">
                               <img src={process.env.PUBLIC_URL +"/images/userimg.jpg"} class="img-fluid" alt="..."/>
                           </div>
                           <div class="mgaccountuserright">
                               <h3>Fernand</h3>
                               <div class="d-flex align-items-center">
                                   <p class="details"><img src={process.env.PUBLIC_URL +"/images/Path.svg"} class="img-fluid" alt="..."/><span>California, Cl</span></p>
                               </div>
                                   
                           </div>
                       </div>
                       
                       <div class="mgaccountuserlinks">
                               <div class="userlinks">
                                 <ul>
                                   <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} class="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} class="img-fluid" alt=""/><a href="/notification">Notification</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} class="img-fluid" alt=""/><a href="/payment">Payment</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} class="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} class="img-fluid" alt=""/><a href="#">Document</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} class="img-fluid" alt=""/><a href="#">Add User</a></li>
                                   </ul>
                               </div>
                           </div>
                   </div>
                   <div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 mgaccountrightblock">
                       <div class="mgaccountrighttableblock"> 
                           <h3>Dealer Information <span><a href="#">Edit</a></span></h3>
                           <p>Titles Will be sent to this address title will not be shipped in to physical address</p>
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Contact information<span><a href="#">Edit</a></span></h3>							
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Address<span><a href="#">Edit</a></span></h3>	
                           <p>Location where transport carriers will drop of a vehicle that you have purchased</p>							
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Legal manage account<span><a href="/legalmanageaccountedit">Edit</a></span></h3>	
                           <p>Legal document sent to your address</p>	

               {accountDetails.length>0?accountDetails.map((item,index) =>
                           <div class="mgaccountrighttable">
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
                       
                       <div class="mgaccountrighttableblock mt-3 pt-4"> 
                           <h3>Manage Account Password<span><a href="#">Edit</a></span></h3>
                       </div>
                       
                                  
                   </div>
               </div>
           </div>
       </div>
   </div>
   
   
   <section id="playstoreBlock" class="playstoreBlock">
     <div class="container">


       <div class="row content">
         <div class="col-lg-12">
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
    
>>>>>>> c33a92504ef70c2a6e2c7048a307247c4aa289ab
  export default ManageAccount ;