import React from "react";
import '../../assets/css/style.css';

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="models-box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;