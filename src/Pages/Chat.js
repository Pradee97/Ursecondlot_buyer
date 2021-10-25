import React from 'react';
import { useState, useEffect } from 'react';
import API from "../Services/BaseService";
import carbrid from '../assets/img/carbrid.jpg';
import closebtn from '../assets/img/closebtn.png';

const Chat = () => {

    const [notification,setNotification] = useState("");

    const getNotification= () =>{

        let request = {
            buyer_dealer_id : JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
        }
      
        
        API.post("notificationDetails/condition", request).then(response=>{
      
            console.log("notification data", response.data.data)
       
            setNotification(response.data.data);
           
            
        });
    }

    const deleteNotification= (data) =>{

        let request = {
            notification_id : data.notification_id,
        }

        console.log("notification data", request)
        // return
        API.post("delete_notification/update", request).then(response=>{

            getNotification();
      
            console.log("notification id", response.data.data)
       
           
            
        });
    }
      
      useEffect (() =>{
        
        getNotification();
        // deleteNotification();
      
      }, []);

    return (

        <main id="main" class="inner-page">   
        
            <div id="notoficationtab" class="notoficationtab">
                {notification.length>0?notification.map((getNotification)=>
                <div class="container">
                    <div class="notoficationtabblock col-lg-6">
                        <div class="row content">

                            <div class="notoficationcontent">
                                <div class="notofication-icon col-lg-2  col-md-2">        
                                    <img alt="" src={getNotification.image}  />
                                </div>
                                <div class="notoficationbody col-lg-8  col-md-8">
                                    <div>
                                        <h2>{getNotification.title}</h2>
                                    </div>
                                    <div>
                                        <p>{getNotification.message}</p>
                                    </div>
                                    {/* <h5>3 Hours Ago</h5> */}
                                </div>
                                <div class="notofication-close-icon col-lg-2  col-md-2">        
                                    <img alt="" src={closebtn} onClick={()=>deleteNotification(getNotification)} />
                                </div>
                            </div>                                                 

                        </div>
                    </div>
                </div>
                ):"No data found"}
            </div>
    
        </main>
        
    )
}

export default Chat;