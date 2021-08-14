import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from "../../Services/BaseService";

const SaveSearchPopup = (props) =>{

  const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);	
  const [saveSearchAdd,setSaveSearchAdd] = useState("");


  const SavedSearchAdd = () =>{

    let request ={

          buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
          name:"make,model",
          search_request:{"make":"Honda","model":"City"},
          createdBy: JSON.parse(loggedInBuyerId).buyer_id,
          updatedBy: JSON.parse(loggedInBuyerId).buyer_id
          
    }

    API.post("savedSearch/add", request).then(res=>{

    console.log("saveeeeee",res.data.data)
    setSaveSearchAdd(res.data.data)

    })
  }

  const getSavedSearch = () =>{

    let request ={

      buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,

    }

    API.post("savedSearch/condition", request)

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
          <input className="textbox " type="text" placeholder="" />
        </div>
        <div>
          <button onClick={props.toggle}>Cancel</button>    <button onClick={saveSearchAdd}>save</button>                       
        </div>
   </main>
 </div>


    )
    }

    export default SaveSearchPopup;