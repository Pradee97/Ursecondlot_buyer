import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import ls from 'local-storage';
import { Button } from 'antd';
import API from "../Services/BaseService";
import checkImg from '../../src/assets/img/check.svg';
import '../assets/css/responsive.css';



const Email = () => {
    const history = useHistory();
    // const { id } = useParams();
    let value=window.location.href.split("id=");
    const [status, setValue] = useState("");
    async function handleclick() {
        
            console.log("check",value[1])
            let request = {
                buyer_id: value[1]
              };

        API.post("user_active/update",request)
           .then((response) => {
             console.log("res", response.data.success)
            if (response.data.success ) {
              setValue(response.data.success);
              ls.set('status', 'no');
                //history.push("/emailsuccess");
               //history.push("/login");
             } else {
               history.push("/error");
             }
           },
             (error) => {
    
             });
    
       }
       useEffect(() => {
        handleclick();
    }, []);
  
    return (
      <div>
           <main id="main" className="inner-page">
                <div id="Successfullform" className="Successfullform">
                    <div className="container">
                        <div className="Successfullformblock col-lg-6">
                            <div className="row content">
                                <div className="modalcontent" style={{marginLeft:"21%"}}>
                                    <div className="Successfull-icon">
                                        <img alt="" src={checkImg} />
                                    </div>
                                    <div className="modalbody">                                       
                                        <p>Email successfull activated</p>
                                        <p>Ursecondlot Admin Will Contact You.</p>
                                
                                        {/* <a href="/login" className="get-started-btn">Dealer Login</a> */}
                                        <Button className="get-started-btn" onClick={() => history.push("/login")}>Dealer Login</Button>
                                    
                                    </div>
                                    {/* <div className="modalfooter ">
                                        <a className="cta-btns" href="/">OK</a>
                                    </div> */}

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </main>

      </div>
    );
  };
  
export default Email ;
  
