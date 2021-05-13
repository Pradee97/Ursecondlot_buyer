import React from "react";
import './popup.css';
const Popup = props => {
  return (

    <div className="pop-box ">
      <div className="models-box">
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup