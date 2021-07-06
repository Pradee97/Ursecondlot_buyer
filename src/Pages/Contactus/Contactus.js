import React from 'react';
import API from "../../Services/BaseService";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
const Contactus = () => { 
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("");
    const [name,setName]=useState ("");
    const [email,setEmailId]=useState ("");
    const [comments,setComments]=useState ("");
    // const [ename,seteName]=useState ("");
    // const [eemail,seteEmailId]=useState ("");
    // const [ecomments,seteComments]=useState ("");
    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [commentsError,setCommentsError]=useState ("");

    const history = useHistory();   
    const { register, handleSubmit, formState: { errors } } = useForm();



  const EmailSubmit = (data) => {    
    setFullNameError("")
    setEmailError("")
    setCommentsError("")

    let request = {
      name,
      email,
      comments        
    };
    if(!name){
      setFullNameError("Full Name is required")
      return;
    }
    else if(name.length>50){
      setFullNameError("Full Name must not exceed 50 characters")
      return;
    }       

    else if(!email){
      setEmailError("Email  is required")
      return;
    }
    else if(email && !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email)){
        setEmailError("Email  Must match the format")
        return;
    }
    else if(!comments){
      setCommentsError("Address is required")
      return;
    }
    else if(comments.length>250){
      setCommentsError("Address must not exceed 250 characters")
      return;
    }     

    // if(name!=="" && email!=="" && comments!==""){
    API.post("contactUs/condition", request)
        .then((response) => {
          console.log("=========>",response);
            if (response.data.success) {
              console.log("==sss=>",response.data);
                const { data } = response;
                togglePopup()
                setPopupTitle("Enquiry Form");
                setPopupMsg("Mail sent successfully.Thanks you So much for your business");
                setPopupType("success");
                setPopupActionType("close");
                setPopupActionValue("close");
                //setPopupActionPath("/contactus")
            } else {
              console.log("==sss1111=>",response.data);
                const { data } = response;
                togglePopup()
                setPopupTitle("Enquiry Form");
                setPopupMsg( data.error.err );
                // setPopupMsg("Floor is not Created, Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            }
        }, (error) => {
                togglePopup()
                setPopupTitle("Error");
                setPopupMsg( "Something went wrong, Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
        }).catch(err => { console.log(err); });
      // }
      // else{
      //   if(name==="" || name===undefined || name===null){
      //     seteName("");
      // }
      // if(email==="" || email===undefined || email===null){
      //   seteEmailId("");
      // }
      // if(comments==="" || comments===undefined || comments===null){
      //   seteComments("");
      // }
      // } 
}
    return (
        <div>
  <main id="main" className="inner-page">
   
   
   <div id="contact" className="contact">
     <div className="container" >
   <div className="contactblock col-lg-12">
       <div className="section-title">
         <h2>Contact US</h2>
       </div>
       <div className="row content">

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
           <form onSubmit={handleSubmit(EmailSubmit)} method="post" role="form" className="php-email-form">
           <h3>Enquiry form</h3>
            
             <div className="form-group">
               <label htmlFor="name">Full Name</label>
                 <input type="text" name="name" className="form-control" id="name"
                onChange={(e) => setName(e.target.value)}/>
                 {/* {  name==="" && ename===""?<p className="form-input-error"> Name is required</p>:""} */}
                 <p className="form-input-error" >{fullNameError}</p>
                 <div className="validate"></div>
             </div>
             <div className="form-group">
               <label htmlFor="name">Email</label>
                 <input type="email" className="form-control" name="email" id="email"  
                onChange={(e) => setEmailId(e.target.value)} />
                 {/* {  email==="" && eemail===""?<p className="form-input-error"> Email is required</p>:""} */}
                 <p className="form-input-error" >{emailError}</p>
                 <div className="validate"></div>
             </div>
             <div className="form-group">
               <label htmlFor="name">comments</label>
               <textarea className="form-control" name="message" rows="3" 
            onChange={(e) => setComments(e.target.value)}
               ></textarea>
                {/* {  comments==="" && ecomments===""?<p className="form-input-error"> Comments is required</p>:""} */}
                <p className="form-input-error" >{commentsError}</p>
               <div className="validate"></div>
             </div>
             <div className="mb-3">
               <div className="loading">Loading</div>
               <div className="error-message"></div>
               <div className="sent-message">Your message has been sent. Thank you!</div>
             </div>
             <div className="text-center">
             <button className="cta-btn">Submit</button>
               </div>
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
   {isOpen && 
                <CommonPopup 
                    handleClose= {togglePopup}
                    popupTitle= {popupTitle}
                    popupMsg= {popupMsg}
                    popupType= {popupType}
                    popupActionType= {popupActionType}
                    popupActionValue= {popupActionValue}
                    popupActionPath={popupActionPath}
                />}

  



 </main>
        </div>
    );
  };
  
export default Contactus ;   