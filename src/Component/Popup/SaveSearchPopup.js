import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from "../../Services/BaseService";

const SaveSearchPopup = (props) =>{

  const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);	
  const [saveSearchName,setSaveSearchName] = useState("");
  const SavedSearchAdd = () =>{
  const [saveSearchReq, setSaveSearchReq] = useState(props.saveSearchRequest);
		let request ={
	
			  buyer_dealer_id: JSON.parse(loggedInBuyerId).buyer_dealer_id,
			  name:saveSearchName,
			  search_request:saveSearchReq,
			  createdBy: JSON.parse(loggedInBuyerId).buyer_id,
			  updatedBy: JSON.parse(loggedInBuyerId).buyer_id
			  
		}
	
		API.post("savedSearch/add", request).then(res=>{
	
		console.log("saveeeeee",res.data.data)
		setSaveSearchAdd(res.data.data)
	
		})
	  }
	

  return (
 
    <div>
      <main>
        <div>
          <h2 className="title"> Save Search </h2>
        </div>
        <div>
          <p>To save a new search instead, please provide a new name</p>
        </div>
        <div>
          <input className="textbox " type="text" placeholder="" onChange={(e)=>setSaveSearchName(e.target.value)} />
        </div>
        <div>
          <button onClick={props.toggle}>Cancel</button>    <button onClick={saveSearchAdd}>save</button>                       
        </div>
   </main>
 </div>


    )
    }

    export default SaveSearchPopup;