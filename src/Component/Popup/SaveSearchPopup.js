import React from 'react';
import { useState } from 'react';
import API from "../../Services/BaseService";
import { useDispatch, useSelector } from 'react-redux';
import SearchReducer from '../../Pages/SearchReducer';
import SearchAction from '../../Pages/SearchAction';
const SaveSearchPopup = (props) =>{

  const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);	
  const [saveSearchName,setSaveSearchName] = useState("");
  
  const saveSearchReq = useSelector(state => state.SearchReducer.payload);
  const saveSearchAdd=()=>{
    
		let request ={
	
			  buyer_dealer_id: JSON.parse(loggedInBuyerId).buyer_dealer_id,
			  name:saveSearchName,
			  search_request:saveSearchReq,
			  createdBy: JSON.parse(loggedInBuyerId).buyer_id,
			  updatedBy: JSON.parse(loggedInBuyerId).buyer_id
			  
		}
	console.log("Save Search Request : ",request);
		API.post("savedSearch/add", request).then(res=>{
	
		console.log("saveeeeee",res.data.data)
		//setSaveSearchAdd(res.data.data)
	
    })
  }

  return (
 
<div>
    <div id="" className="saveSearchBlock">
      
            <div className="termspageblock">
                <div className="row content">
                <span onClick={props.toggle} className="close-icon">x</span> 
                        <div className="modalcontent">
                        
                            <div className="modalbody">
                              <h2 className="title"> Save Search </h2>
                              <div class="input-group col-md-12">
                              <input className="textbox " type="text" placeholder="" onChange={(e)=>setSaveSearchName(e.target.value)} />
                              </div>

                              <div class="input-group col-md-12 btns">
                              <button className="cta-btns" onClick={props.toggle}>Cancel</button>    <button  className="cta-btns" onClick={saveSearchAdd}>Save</button>    
                              </div>     
                            </div>
                       </div>
                   </div>
              </div>
      </div>

    
      </div>
    )
    }

    export default SaveSearchPopup;