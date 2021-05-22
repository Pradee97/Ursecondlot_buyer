import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import checkImg from '../../../src/assets/img/check.svg';
import errorImg from '../../../src/assets/img/error.svg';
import "./commonPopup.css"

const CommonPopup = props => {
    const history = useHistory();

    // Example values for reference

    // const { handleClose, 
    //     popupTitle = "ERROR",
    //     popupMsg = "something went wrong please try again", 
    //     popupType = 'error',            //("success or error")
    //     popupActionType = 'close',      //("redirect  or close")
    //     popupActionValue = 'close', 
    //     popupActionPath } = props;

    const { handleClose, popupTitle, popupMsg, popupType, popupActionType, popupActionValue, popupActionPath } = props;

    return (
        <div className="popup-box">
            <div id="" class="CommonModels-box">
                <div class="Commonfullformblock col-lg-9">
                    <div class="CommonContainer">
                        <div class="CommonModalcontent">
                            <div class="Commonfull-icon">
                                <img className={popupType.toLowerCase() === "success" ? "successImg" : "errorImg"} alt="" src={popupType.toLowerCase() === "success" ? checkImg : errorImg} />
                            </div>
                            <div class="CommonModalbody">
                                {popupTitle !== "" && <h2>{popupTitle}</h2>}
                                <p>{popupMsg}</p>
                            </div>
                            <div class="CommonModalfooter ">
                                {popupActionType.toLowerCase() === "redirect" 
                                    ?   <a class="cta-btns" href={popupActionPath}>{popupActionValue}</a>
                                    :   <button class="cta-btns" onClick={handleClose} >{popupActionValue}</button> 
                                }
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default CommonPopup;