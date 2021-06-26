import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import checkImg from '../../../src/assets/img/check.svg';
import errorImg from '../../../src/assets/img/erroricon.png';
import warningImg from '../../../src/assets/img/warning.png';
import "./commonPopup.css"

const CommonPopup = props => {
    const history = useHistory();

    // Example values for reference

    // const { handleClose, 
    //     popupTitle = "ERROR",
    //     popupMsg = "something went wrong please try again", 
    //     popupType = 'error',            //("success or error or confirm")
    //     popupActionType = 'close',      //("redirect  or close or confirm")
    //     popupActionValue = 'close', 
    //     popupActionPath } = props;

    const { handleClose, popupTitle, popupMsg, popupType, popupActionType, popupActionValue, popupActionPath, Confirmation } = props;
    // const Confirmation=()=> {
    //     const deleteFile=API.post('documentDelete/update',request);
    //     deleteFile.then(res => {
            
    //     })
    //         .catch(err => { console.log(err); });
    // }

    return (
        <div className="popup-box">
            <div id="" class="CommonModels-box">
                <div class="Commonfullformblock col-lg-9">
                    <div class="CommonContainer">
                        <div class="CommonModalcontent">
                            <div class="Commonfull-icon">
                                <img className={popupType.toLowerCase() === "success" ? "successImg" : popupType.toLowerCase() === "error" ? "errorImg" : warningImg} alt="" src={popupType.toLowerCase() === "success" ? checkImg : popupType.toLowerCase() === "error"? errorImg : warningImg} />
                            </div>
                            <div class="CommonModalbody">
                                {popupTitle !== "" && <h2>{popupTitle}</h2>}
                                <p>{popupMsg}</p>
                            </div>
                            <div class="CommonModalfooter ">
                            
                                {  popupActionType.toLowerCase() === "confirm"   
                                    ?
                                    <div class="CommonModalfooter session">
                                        <button class="cta-btns" onClick={handleClose} >cancel</button>
                                        <button class="cta-btns" onClick={Confirmation} >ok</button> 
                                    </div>
                                    : popupActionType.toLowerCase() === "redirect" 
                                    ?   <a class="cta-btns" onClick={() => history.push(popupActionPath)} >{popupActionValue}</a>
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