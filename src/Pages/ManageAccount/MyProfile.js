import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../Services/BaseService";
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"

const MyProfile = () => {
    const history = useHistory();

    return (
        <div>
            <main id="main" class="inner-page">
   
            <div id="myprofiles" className="myprofiles">
       <div className="container" >
           <div className="myprofilesblock col-lg-12">
               <div className="section-title">
                 <h2>My Profile</h2>
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
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 myprofilerightblock">
                       <div className="myprofilerighttableblock"> 
                           <h3>My Details<span><a href="#">Edit</a></span></h3>	
                           <p>Location where transport carriers will drop of a vehicle that you have purchased</p>							
                           <div className="myprofilerighttable">
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

                                  <tr>
                                   <td>Email Id<span>williams@williams.com</span></td>
                                   <td>Location name<span>Horizon fairway - Computer number 693</span></td>
                                 </tr>	
                               </table>                             								
                           </div>
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

export default MyProfile;