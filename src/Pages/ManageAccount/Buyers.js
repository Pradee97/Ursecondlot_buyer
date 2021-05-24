import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"

const Buyers = () => {
    const history = useHistory();

    return (
        <div>
            <main id="main" class="inner-page">
   
            <div id="adduserpage" className="adduserpage">
       <div className="container" >
           <div className="adduserpageblock col-lg-12">
               <div className="section-title">
                 <h2>Buyers</h2>
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
                       <ManageAccountLinks />
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 adduserpagerightblock">
                       <div className="adduserpage-inner"> 
                            <div className="col-lg-12"> 
                                <div className="filtersblock col-lg-9">
                                    <div className="input-group searchbox">
                                        <input className="form-control border" type="textsearch" value="Search" id="search-input"/>
                                        <span className="input-group-append">
                                            <button className="btn ms-n5" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>

                                <div class="col-lg-12 userlisttableblock">
                                    <div class="add-user">
                                        <a class="add-user-btns" href="adduser.html"><img src={process.env.PUBLIC_URL +"/images/addbtn.jpg"}  alt="/adduser"/>Add User</a>
                                    </div>					
                                    <div class="userlisttable">
                                        <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Privileges</th>
                                            </tr>
                                        </thead>
                                        <tr>
                                            <td>01</td>															
                                            <td><span class="cartitlename">Fernando Botero Pablo</span></td>
                                            <td>746-561-6784</td>
                                            <td>someoneone@example.com</td>
                                            <td>amorsolo, Cancel the bid after 4 hours, Bid, Proxy Bid, Counter Bid, Lot Fee</td>
                                        </tr>
                                        
                                        <tr>
                                            <td>01</td>															
                                            <td><span class="cartitlename">Fernando Botero Pablo</span></td>
                                            <td>746-561-6784</td>
                                            <td>someoneone@example.com</td>
                                            <td>amorsolo, Cancel the bid after 4 hours, Bid, Proxy Bid, Counter Bid, Lot Fee</td>
                                        </tr>
                                        
                                        <tr>
                                            <td>01</td>															
                                            <td><span class="cartitlename">Fernando Botero Pablo</span></td>
                                            <td>746-561-6784</td>
                                            <td>someoneone@example.com</td>
                                            <td>amorsolo, Cancel the bid after 4 hours, Bid, Proxy Bid, Counter Bid, Lot Fee</td>
                                        </tr>
                                        </table>            
                                    </div>
					            </div>
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

export default Buyers;