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

import { Modal, Button } from 'antd';



const Contactus = () => {
    const history = useHistory();
    
    return (
        <div>
  <main id="main" className="inner-page">
   
   
   <div id="contact" className="contact">
     <div className="container" >
   <div className="contactblock col-lg-12">
       <div className="section-title">
         <h2>Contact US</h2>
       </div>

       <div className="row">

         <div className="col-lg-6 d-flex align-items-stretch">
           <div className="info">
           <p className="contacttag">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </p>
             <div className="address">
               <i className="icofont-google-map"></i>
               <h4>Address</h4>
               <p>Fairview Ave, El Monte,US, 91732</p>
             </div>
             <div className="phone">
               <i className="icofont-phone"></i>
               <h4>Contact</h4>
               <p>142-564-9147</p>
             </div>

             <div className="email">
               <i className="icofont-envelope"></i>
               <h4>Email</h4>
               <p>info@ursecondLot.com</p>
             </div>
       </div>

         </div>

         <div className="col-lg-6 mt-5 mt-lg-0 d-flex align-items-stretch contactfoms">
           <form action="forms/contact.php" method="post" role="form" className="php-email-form">
           <h3>Enquiry form</h3>
            
             <div className="form-group">
               <label for="name">Full Name</label>
                 <input type="text" name="name" className="form-control" id="name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                 <div className="validate"></div>
             </div>
             <div className="form-group">
               <label for="name">Email</label>
                 <input type="email" className="form-control" name="email" id="email" data-rule="email" data-msg="Please enter a valid email" />
                 <div className="validate"></div>
             </div>
             <div className="form-group">
               <label for="name">comments</label>
               <textarea className="form-control" name="message" rows="3" data-rule="required" data-msg="Please write something for us"></textarea>
               <div className="validate"></div>
             </div>
             <div className="mb-3">
               <div className="loading">Loading</div>
               <div className="error-message"></div>
               <div className="sent-message">Your message has been sent. Thank you!</div>
             </div>
             <div className="text-center"><button type="submit">Submit</button></div>
           </form>
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
  
export default Contactus ;   