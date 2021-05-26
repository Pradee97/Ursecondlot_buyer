import React from "react";
import { useHistory } from "react-router-dom";


const ManageAccountLinks = () => {
    const history = useHistory();
    return(
        <div className="mgaccountuserlinks">
            <div className="userlinks">
                <ul>
                    <li className="active "><img src={process.env.PUBLIC_URL +"/images/sports-car.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)" onClick={()=>history.push('/manageaccount')} >Account</a></li>
                    <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-user.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/myprofile')} >Myprofile</a></li>
                    <li><img src={process.env.PUBLIC_URL +"/images/Icon awesome-bell.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/notification')} >Notification</a></li>
                    <li><img src={process.env.PUBLIC_URL +"/images/dollar-symbol.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/paymentinfo')} >Payment</a></li>
                    <li><img src={process.env.PUBLIC_URL +"/images/fees.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/lotfee')} >Lot Fee</a></li>
                    <li><img src={process.env.PUBLIC_URL +"/images/google-docs.svg"} className="img-fluid" alt=""/><a href="JavaScript:void(0)" >Document</a></li>
                    <li><img src={process.env.PUBLIC_URL +"/images/profile.svg"} className="img-fluid" alt=""/><a href="/JavaScript:void(0)"  onClick={()=>history.push('/buyers')} >Buyers</a></li>  
                </ul>
            </div>
        </div>
    )
}

export default ManageAccountLinks;
