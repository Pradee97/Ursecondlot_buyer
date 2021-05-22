import React from "react";
import './popup.css';

const Popup = props => {
  const {content,handleClose} = props
  return (
    <div className="popup-box">
      <div className="models-box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {content}
      </div>
    </div>
  );
};
 
export default Popup;