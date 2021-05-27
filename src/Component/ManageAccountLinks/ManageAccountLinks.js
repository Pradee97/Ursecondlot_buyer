import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import sportsCarImg from '../../../src/assets/img/sports-car.svg';
import IconAwesomeUserImg from '../../../src/assets/img/Icon awesome-user.svg';
import IconAwesomeBellImg from '../../../src/assets/img/Icon awesome-bell.svg';
import DollarSymbolImg from '../../../src/assets/img/dollar-symbol.svg';
import FeesImg from '../../../src/assets/img/fees.svg';
import GoogleDocsImg from '../../../src/assets/img/google-docs.svg';
import ProfileImg from '../../../src/assets/img/profile.svg';


const ManageAccountLinks = () => {
    const history = useHistory();
    const location = useLocation();
    return(
        <div className="mgaccountuserlinks">
            <div className="userlinks">
                <ul>
                    <li className={location.pathname ==="/manageaccount"? "active" : ""} ><img src={sportsCarImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)" onClick={()=>history.push('/manageaccount')} >Account</a></li>
                    <li className={location.pathname ==="/myprofile"? "active" : ""} ><img src={IconAwesomeUserImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/myprofile')} >Myprofile</a></li>
                    <li className={location.pathname ==="/notification"? "active" : ""} ><img src={IconAwesomeBellImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/notification')} >Notification</a></li>
                    <li className={location.pathname ==="/paymentinfo"? "active" : ""} ><img src={DollarSymbolImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/paymentinfo')} >Payment</a></li>
                    <li className={location.pathname ==="/lotfee"? "active" : ""} ><img src={FeesImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/lotfee')} >Lot Fee</a></li>
                    <li className={location.pathname ==="/document"? "active" : ""} ><img src={GoogleDocsImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/document')}>Document</a></li>
                    <li className={location.pathname ==="/buyers"? "active" : ""} ><img src={ProfileImg} className="img-fluid" alt=""/><a href="JavaScript:void(0)"  onClick={()=>history.push('/buyers')} >Buyers</a></li>  
                </ul>
            </div>
        </div>
    )
}

export default ManageAccountLinks;
