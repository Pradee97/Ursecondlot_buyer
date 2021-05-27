import React from "react";
import { useHistory, useLocation } from "react-router-dom";


const ManageAccountLinks = () => {
    const history = useHistory();
    const location = useLocation();
    return(
        <div className="mgaccountuserlinks">
            <div className="userlinks">
                <ul>
                    <li className={location.pathname ==="/manageaccount"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/sports-car.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)" onClick={()=>history.push('/manageaccount')} >Account</a></li>
                    <li className={location.pathname ==="/myprofile"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/myprofile')} >Myprofile</a></li>
                    <li className={location.pathname ==="/notification"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/notification')} >Notification</a></li>
                    <li className={location.pathname ==="/paymentinfo"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/paymentinfo')} >Payment</a></li>
                    <li className={location.pathname ==="/lotfee"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/lotfee')} >Lot Fee</a></li>
                    <li className={location.pathname ==="/document"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/document')}>Document</a></li>
                    <li className={location.pathname ==="/buyers"? "active" : ""} ><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/buyers')} >Buyers</a></li>  
                </ul>
            </div>
        </div>
    )
}

export default ManageAccountLinks;
