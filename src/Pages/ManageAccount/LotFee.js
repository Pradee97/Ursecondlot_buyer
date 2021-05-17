import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
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



const LotFee = () => {
    const history = useHistory();
    const [lotfee, setLotfee] = useState("");
    const [lotValue,setLotValue] = useState("");
    console.log("======12345====>",ls.get('userDetails'))

    async function getLotfee() {
        let request = {
            buyer_id: 1
        };
        console.log("=======>",)
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/lot_fee/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setLotValue(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
	useEffect(() => {
        getLotfee();
        // fetchState();
    }, []);

        // const { id } = useParams();
        // let value=id.split("=");
        const handlesubimt = () => {
            
                //console.log("check",buyer_id)
                let request = {
                    buyer_id: 1,
                    lot_fee:lotfee,
                    active:1

                    
                  };
    
            API.post("http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/lot_fee/add",request)
               .then((response) => {
                 console.log("res", response.data.success)
                if (response.data.success ) {
                    history.push("#");
                   //history.push("/login");
                 } else {
                   history.push("/error");
                 }
               },
                 (error) => {
        
                 });
        
           }

    return (
        <div>

<main id="main" class="inner-page">
   
   
   <div id="lotfee" class="lotfee">
       <div class="container">
           <div class="lotfeeblock col-lg-12">
               <div class="section-title">
                 <h2>Lot Fee</h2>
               </div>
               <div class="row content">
                   <div class="col-lg-3 col-md-4 col-sm-12 accountleftblock">
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
                               <li><img src="Icon awesome-user.svg" class="img-fluid" alt=""/><a href="/manageaccount">Account</a></li>
                               <li><img src="Icon awesome-bell.svg" class="img-fluid" alt=""/><a href="/notification">Notification</a></li>
                               <li><img src="dollar-symbol.svg" class="img-fluid" alt=""/><a href="/payment">Payment</a></li>
                               <li class="active"><img src="fees.svg" class="img-fluid" alt=""/><a href="/lotfee">Lot Fee</a></li>
                               <li><img src="google-docs.svg" class="img-fluid" alt=""/><a href="documents.html">Document</a></li>
                               <li><img src="profile.svg" class="img-fluid" alt=""/><a href="adduser.html">Add User</a></li>
                           </div>
                       </div>
                   </div>
                   <div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 lotfeerightblock">
                       <div class="lotfee-inner">
                       <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
                           <div class="form-group col-lg-6 col-md-6 lotfee-form">
                               <div class="input-icon">
                                 <input type="text" class="form-control" defaultValue={lotValue.length>0?"":lotValue.lot_fee}  onChange={(e) => setLotfee(e.target.value)}/> 
                                   <i>$</i>
                               </div>
                           </div>
                           <div class="col-lg-12 loginBtn">
                               <button class="cta-btn" onClick={handlesubimt}>Submit</button>
                               {/* conclick={handlesubimt} */}
                           </div>
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


    )
}

export default LotFee;