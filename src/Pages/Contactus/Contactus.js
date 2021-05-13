import React from 'react';
import API from "../../Services/BaseService";
import { useHistory,useParams } from "react-router-dom";
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


import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/icofont/icofont.min.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/venobox/venobox.css';
import '../../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../../assets/vendor/aos/aos.css';


import '../../assets/css/style.css';
import { Modal, Button } from 'antd';



const Contactus = () => {
    const history = useHistory();
    
    return (
        <div>
  <main id="main" class="inner-page">
   
   
   <div id="contact" class="contact">
     <div class="container" >
   <div class="contactblock col-lg-12">
       <div class="section-title">
         <h2>Contact US</h2>
       </div>

       <div class="row">

         <div class="col-lg-6 d-flex align-items-stretch">
           <div class="info">
           <p class="contacttag">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </p>
             <div class="address">
               <i class="icofont-google-map"></i>
               <h4>Address</h4>
               <p>Fairview Ave, El Monte,US, 91732</p>
             </div>
             <div class="phone">
               <i class="icofont-phone"></i>
               <h4>Contact</h4>
               <p>142-564-9147</p>
             </div>

             <div class="email">
               <i class="icofont-envelope"></i>
               <h4>Email</h4>
               <p>info@ursecondLot.com</p>
             </div>
       </div>

         </div>

         <div class="col-lg-6 mt-5 mt-lg-0 d-flex align-items-stretch contactfoms">
           <form action="forms/contact.php" method="post" role="form" class="php-email-form">
           <h3>Enquiry form</h3>
            
             <div class="form-group">
               <label for="name">Full Name</label>
                 <input type="text" name="name" class="form-control" id="name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                 <div class="validate"></div>
             </div>
             <div class="form-group">
               <label for="name">Email</label>
                 <input type="email" class="form-control" name="email" id="email" data-rule="email" data-msg="Please enter a valid email" />
                 <div class="validate"></div>
             </div>
             <div class="form-group">
               <label for="name">comments</label>
               <textarea class="form-control" name="message" rows="3" data-rule="required" data-msg="Please write something for us"></textarea>
               <div class="validate"></div>
             </div>
             <div class="mb-3">
               <div class="loading">Loading</div>
               <div class="error-message"></div>
               <div class="sent-message">Your message has been sent. Thank you!</div>
             </div>
             <div class="text-center"><button type="submit">Submit</button></div>
           </form>
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
  
export default Contactus ;   