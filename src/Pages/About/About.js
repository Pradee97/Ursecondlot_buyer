import React from 'react';
import { useState, useEffect } from 'react';
import API from "../../Services/BaseService";
import Popup from '../../Component/Popup/Popup';
import AboutusImg from '../../../src/assets/img/aboutusimg.png';
import AppStoreImg from '../../../src/assets/img/appstore.png';
import GooglePlayImg from '../../../src/assets/img/googleplay.png';
// import LateFee from '../../Pages/LateFee/LateFee';

const About = () => {

  // const [isLateFee, setIsLateFee] = useState(false);
  // const [lateFeeValue, setLateFeeValue] = useState(0);

  // const toggleLateFee = () => {
  //   setIsLateFee(!isLateFee);
  // }
    
  // const getlateFee=()=>{
  //   let request={
  //     buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
  //   }
    
  //   API.post('getlatefee/condition',request).then(res=>{
  //      if(res.data.data.length){
      
  //    console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
  //     const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
  //     setIsLateFee(lateFeeValueStatus==="yes")
  //     setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
  //      }
      
  
  //   }).catch(err=>{console.log(err);});
  // }
  
  
  // useEffect(() => {
  
  //   getlateFee();
    
  // }, []);

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
            <img src={AboutusImg} />
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
           <img src={AppStoreImg} />
           <img src={GooglePlayImg} />
          
         </div>
        
       </div>

     </div>
   </section>

  
   {/* {isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />}  */}


 </main>
        </div>
    );
};
  
export default About ;   