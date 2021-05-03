import React from 'react';
import API from "../Services/BaseService";
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


import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/icofont/icofont.min.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/venobox/venobox.css';
import '../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../assets/vendor/aos/aos.css';


import '../assets/css/style.css';
import { Modal, Button } from 'antd';



const FloorPlans = () => {
    const history = useHistory();
    const [floorDetails, setFloorDetails] = useState("");
    async function fetchBuyerFloorPlans() {
        let request = {
            buyer_id: 1,
        };
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/floor_plan/condition', request);
        state.then(res => {
            console.log("res", res)
            setFloorDetails(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    function onHandleEdit(e){
      history.push("/flooredit/"+e);
    }
    useEffect(() => {
        fetchBuyerFloorPlans();
    }, []);

    return (
        <div>
             <main id="main" class="inner-page">
   
   
   <div id="floorplans" class="floorplans">
     <div class="container">
     <div class="floorplansblock col-lg-12">

       <div class="section-title">
         <h2>Floor Plans</h2>
       </div>

       <div class="row content">
           <div class="col-lg-12 floorplanstableblock">
               <div class="add-floor">
                   <a class="add-floor-btns" href="/flooradd"><img src="assets/img/addbtn.jpg"/>Add Floor</a>
               </div>
               

               {floorDetails.length>0?floorDetails.map((item,index) =>
               <div class="col-lg-12 mt-3 pt-4 floorplanstableblock">
               <div class="floorplanstable">
               
                   <table>
                     <thead>
                       <tr>
                           <th colspan="2" scope="colgroup">Floor plan {index+1}
                           <Button onClick={() => onHandleEdit(item.floor_plan_id)}>Edit</Button></th>
                       </tr>
                     </thead>
                     <tr>
                       <td>Company Name  <span>{item.company_name} </span></td>
                       <td>Address  <span>{item.address} </span></td>
                     </tr>
                     <tr>
                       <td>Name Contact <span>{item.contact_name}</span></td>
                       <td>Floor Account Number <span>{item.account_no} </span></td>
                     </tr>
                    <tr>
                       <td>Branch Name <span>{item.branch_name}</span></td>
                       <td>Floor Plan Credit Limit <span>$3000</span></td>
                     </tr>
                     <tr>
                       <td>Email Id<span>{item.email_id}</span></td>
                       <td>Account Opened<span>{item.account_opened}</span></td>
                     </tr>
                     <tr>
                       <td>Phone<span>{item.phone_no}</span></td>
                       <td>Date Opened<span>{item.opened_date}</span></td>
                     </tr>
                    
                   </table>
                        
               </div>
               </div>
                )  :""}
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
 <script src="assets/vendor/jquery/jquery.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/venobox/venobox.min.js"></script>
  <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/js/main.js"></script>

        </div>
    );
  };
  
export default FloorPlans ;
  