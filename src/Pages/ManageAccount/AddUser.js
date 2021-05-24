import React from 'react';
import API from "../../Services/BaseService";
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
const AddUser = () => {
    const history = useHistory();

    return (
        <div>
            <main id="main" class="inner-page">
            <div id="adduserpageinner" className="adduserpageinner">
       <div className="container" >
           <div className="adduserpageblock col-lg-12">
               <div className="section-title">
                 <h2>Add User</h2>
               </div>
               <div className="row content">
                   <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
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
                                   <li><img src={process.env.PUBLIC_URL +"/images/sports-car.svg"} className="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt=""/><a href="/myprofile">Myprofile</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt=""/><a href="/notification">Notification</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt=""/><a href="/paymentinfo">Payment</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt=""/><a href="#">Document</a></li>
                                   <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt=""/><a href="/buyers">Buyers</a></li>                                 
                               </div>
                           </div>
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 adduserpagerightblock">
                       <div className="adduserpage-inner"> 
                            <div className="col-lg-12"> 
                            <form class="adduserpageform">
									<div class="col-sm-12 form-group">
										<div class="tbox">
											<input type="text" class="form-control textbox" name="dname" id="name-d" placeholder="" required />
											 <label for="name-d">Name</label>
										</div>
									</div>
									
									<div class="col-sm-12 form-group">
										<div class="tbox">
											<input type="text" class="form-control textbox" name="phone" id="phone" placeholder="" required  />
											 <label for="phone">Phone</label>
										</div>
									</div>
									
									<div class="col-sm-12 form-group">
										<div class="tbox">
											<input type="text" class="form-control textbox" name="email" id="email" placeholder="" required />
											 <label for="email">Email</label>
										</div>
									</div>
									
									<div class="col-sm-12">
										<div class="radio input-group privileges">
											<input id="radio-privileges" name="radio" type="radio" />
											<label  for="radio-privileges" class="radio-label">Select User Privileges</label>
										</div>
										
										<div class=" row adduserpageforminner">
											<div class="col-sm-6 form-group input-group">
												<input type="checkbox" id="buynow" />
												<label for="buynow">Buy now</label>
											</div>
											<div class="col-sm-6 form-group input-group ">
												<input type="checkbox" id="cancelbid" />
												<label for="cancelbid">Cancel the bid after 4 hours</label>
											</div>
											<div class="col-sm-6 form-group input-group ">
												<input type="checkbox" id="bid" />
												<label for="bid">Bid</label>
											</div>
											<div class="col-sm-6 form-group input-group ">
												<input type="checkbox" id="proxybid" />
												<label for="proxybid">Proxy Bid</label>
											</div>
											<div class="col-sm-6 form-group input-group ">
												<input type="checkbox" id="counterbid" />
												<label for="counterbid">Counter Bid</label>
											</div>
											<div class="col-sm-6 form-group input-group ">
												<input type="checkbox" id="lotfe" />
												<label for="lotfe">Lot Fee</label>
											</div>
										</div>
									</div>
									<div class="col-sm-12">
										<div class="radio input-group noprivileges">
											<input id="radio-noprivileges" name="radio" type="radio" />
											<label  for="radio-noprivileges" class="radio-label">No privileges (Only View)</label>
										</div>
									</div>
									<div class="col-lg-12 loginBtn">
										<button class="cta-btn">Submit</button>
									</div>
								</form>
                                

                                
                            </div>
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

export default AddUser;