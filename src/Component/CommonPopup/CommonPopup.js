import React from 'react';
import PropTypes from 'prop-types';
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
    //     popupType = 'error',             //("success or error or confirm")
    //     popupActionType = 'close',       //("redirect  or close or confirm or refresh")
    //     popupActionValue = 'close',      //("any string you like to display")
    //     popupActionPath } = props;       //("where you like to redirect")

    const { handleClose, popupTitle, popupMsg, popupType, popupActionType, popupActionValue, popupActionPath, Confirmation } = props;
    return (
        <div className="popup-box">
            <div id="" className="CommonModels-box">
                <div className="Commonfullformblock col-lg-9">
                    <div className="CommonContainer">
                        <div className="CommonModalcontent">
                            <div className="Commonfull-icon">
                                <img className={popupType.toLowerCase() === "success" ? "successImg" : popupType.toLowerCase() === "error" ? "errorImg" : warningImg} alt="" src={popupType.toLowerCase() === "success" ? checkImg : popupType.toLowerCase() === "error"? errorImg : warningImg} />
                            </div>
                            <div className="CommonModalbody">
                                {popupTitle !== "" && <h2>{popupTitle}</h2>}
                                <p>{popupMsg}</p>
                            </div>
                            <div className="CommonModalfooter ">
                            
                             
                            {popupActionType.toLowerCase() === "confirm" && (<div className="CommonModalfooter session">
                                <button className="cta-btns" onClick={handleClose} >cancel</button>
                                <button className="cta-btns" onClick={Confirmation} >ok</button> 
                            </div>)}

                            {popupActionType.toLowerCase() === "redirect" && <a className="cta-btns" onClick={() => history.push(popupActionPath)} >{popupActionValue}</a> }
                            {popupActionType.toLowerCase() === "close" && <button className="cta-btns" onClick={handleClose} >{popupActionValue}</button> }
                            {popupActionType.toLowerCase() === "refresh" && <a class="cta-btns" href={popupActionPath}>{popupActionValue}</a> }
                            
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}

CommonPopup.propTypes = {
    handleClose: PropTypes.func,
    popupTitle: PropTypes.string,
    popupMsg: PropTypes.string, 
    popupType: PropTypes.string, 
    popupActionType: PropTypes.string, 
    popupActionValue: PropTypes.string, 
    popupActionPath: PropTypes.string, 
    Confirmation: PropTypes.func
  }

export default CommonPopup;