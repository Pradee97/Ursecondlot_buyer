import React, { useEffect } from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import Popup from '../../Component/Popup/Popup';
import '../../assets/css/style.css';
import LogoImg from '../../../src/assets/img/Logo_final.png';
import { useForm } from "react-hook-form";
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Loading from '../../Component/Loading/Loading';


const Invalidlink=()=>{
    const history= useHistory();
    const[loading,setLoading] = useState(true)
   
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
      }, [])
    
    return(
        <div>
             {loading?<Loading/>:
             <main id="main" class="login-page">
                <div class="col-lg-4 card loginBlock">
                {/* <div class="col-lg-12 topBack">		
                     <div class="add-user">
                        <a class="back-btns"   href="JavaScript:void(0)" onClick={()=>history.push('/Login')}><i class='bx bx-left-arrow-alt'></i> back</a>
                     </div>
                </div> */}
                <div class="admin-login">        
                    <img  src={LogoImg} alt="logo"/>
                </div>
        
            <form  >
            <h2 class="title">This Link is not active anymore</h2>	
         </form>					
           
       
        
    </div>
            
    </main>
     }
</div>
    )
}
export default Invalidlink; 