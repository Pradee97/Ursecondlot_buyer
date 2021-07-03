import React from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import API from "../../../Services/BaseService";
import ManageAccountLinks from "../../../Component/ManageAccountLinks/ManageAccountLinks"

const MyProfile = () => {
    const history = useHistory();
    const [accountDetails, setaccountDetails] = useState("");
    async function fetchAccountDetails() {
      let request = {
          buyer_id: JSON.parse(localStorage.getItem("userDetails")).user_id,
      };
      const state = API.post('user_profile/condition', request);
      state.then(res => {
          // console.log("res", res)
          setaccountDetails(res.data.data);
      })
          .catch(err => { console.log(err); });
    }
    function onHandleEdit(e){
      history.push("/editmyprofile/"+e);
    }
  useEffect(() => {
    fetchAccountDetails();
  }, []);

    return (
        <div>
            <main id="main" className="inner-page">
   
            <div id="myprofiles" className="myprofiles">
       <div className="container" >
           <div className="myprofilesblock col-lg-12">
               <div className="section-title">
                 <h2>My Profile</h2>
               </div>
               <div className="row content">
                   <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                      
                       <ManageAccountLinks />
                   </div>
                   <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 myprofilerightblock">
                       <div className="myprofilerighttableblock"> 
                       {accountDetails.length>0?accountDetails.map((item,index) =>	
                       
                           
                           <div className="myprofilerighttable">
                             <h3>My Details<span><button className="ant-btn" onClick={() => onHandleEdit(item.user_id)}><i className="icofont-ui-edit"></i> Edit</button></span></h3>	
                           <p>Location where transport carriers will drop of a vehicle that you have purchased</p>
                           					
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
                                   <td>Zip code<span>{item.zipcode}</span></td>
                                 </tr>

                                  <tr>
                                   <td>Email Id<span>{item.email}</span></td>
                                   {/* <td>Location name<span>{item.address}</span></td> */}
                                 </tr>	
                               </table>                             								
                           </div>
                           )  :""}
                       </div>
                       <div className="mgaccountrighttableblock mt-3 pt-4"> 
                           {/* <h3>Manage Account Password<span><a class="ant-btn" href="/changepassword"><i class="icofont-ui-edit"></i> Edit</a></span></h3> */}
                           <h3>Manage Account Password<span><button className="ant-btn" onClick={() => history.push("/changepassword")}><i className="icofont-ui-edit"></i> Edit</button></span></h3>
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