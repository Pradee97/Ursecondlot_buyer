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



const About = () => {
    const history = useHistory();
    
    return (
        <div>
              <main id="main" className="inner-page">
   
   
   <div id="about" className="about">
     <div className="container" >
     <div className="aboutblock col-lg-12">

       <div className="section-title">
         <h2>About Us</h2>
       </div>

       <div className="row content">
         <div className="col-lg-6">
           <div className="aboutusimg">
            <img src={process.env.PUBLIC_URL +"/images/aboutusimg.png"} />
           </div>
           
         </div>
         <div className="col-lg-6 pt-4 pt-lg-0">
           <p>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
           </p>
           <p>
           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
           when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
           into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release.
           </p>            
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
  
export default About ;   