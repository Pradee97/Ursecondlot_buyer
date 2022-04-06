import React, { useState, useEffect } from 'react';
import API from '../../../../Services/BaseService';
import { useHistory, useLocation, useParams } from "react-router-dom";
import CommonPopup from '../../../../Component/CommonPopup/CommonPopup';
import "../../../../Component/CommonPopup/commonPopup.css"
import { useDispatch, useSelector } from 'react-redux';
import ls from 'local-storage';
import {Button} from "antd";

const ViewPSi = (props) => {
    const history = useHistory();

    const [isCommonPopupOpen, setIsCommonPopupOpen] = useState(false);
	const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("");
    const [alertmessage,setAlertMessage] = useState("");
    const [alerttitle,setAlertTitle] = useState("");
    const [alertimg,setAlertImg] = useState("");
    // const [psiComments,setIfComments] = useState(ls.get('psiComments'));
    // const [option,setOption] = useState(ls.get('option'))
    const [psiComments,setIfComments] = useState(props.psiAmt);
    const [option,setOption] = useState(props.psiId)
    const [optionError,setPositionError] = useState("");

    const [ifCommentsError,setCommentsError]=useState ("");
    const adminData = useSelector(state => state.LoginReducer.payload);	
    const [togglePopupOpen,setTogglePopupOpen]= useState(true);
    const [notesList,setNotesList] = useState("");

    const [value,setValue] = useState("");
    const [drop,setDrop] = useState("");

    const toggleCommonPopup = () => {
      setIsCommonPopupOpen(!isCommonPopupOpen);
    }

   


  console.log("valuePsi======",psiComments)
  console.log("valueOption======",option)
    
    const saveAdd = () => {
    
        setCommentsError("")
        setPositionError("")

        if(!option){
            setPositionError("Option is required")
            return;
          }

        if(!psiComments){
           setCommentsError("Notes is required")
           return;
         }
         else if(psiComments.length > 500){
           setCommentsError("Notes must not exceed 500 characters")
           return;
         }     

        // const dropDown = option == "" ? valueOption :  option;
        // const inputPsi = psiComments == "" ? valuePsi : psiComments;  

        const recentlyAddednewvalue= psiComments
        const recentOption= option

        setNotesList( [recentlyAddednewvalue,recentOption] )
        props.EditPsi(recentlyAddednewvalue)
        props.addDropdown(recentOption)
        props.addPSIValue(psiComments)
        props.addOption(option)
       
        // setComments(" ")
        // setTogglePopupOpen(false)
        console.log("option======",option)
        console.log("psiComments======",psiComments)
        console.log("recentlyAddednewvalue item======",recentlyAddednewvalue)

        // console.log("dropDown======",dropDown)
        // console.log("inputPsi======",inputPsi)

        // setValue(inputPsi)
        // setDrop(dropDown)
       
       ls.set('psiComments', psiComments);
       ls.set('option', option);

    //    ls.set('inputPsi', inputPsi);
    //    ls.set('dropDown', dropDown);
    
        }

        
  return (
     <div className="popup-box">
                 <div id="" className="CommonModels-box">
                     <div className="Commonfullformblock col-lg-9">
                         <div className="CommonContainer">
                           <div className="CommonModalcontent">
                        {togglePopupOpen ?
                        (<>
                            <div className="CommonModalbody">
                                <h2 >Edit Post Sale Inspection</h2>
                                <label for="buyer" className="form-label required">Yes/No</label>
                                <select className="form-select" onChange={(e) => setOption(e.target.value)} disabled>
                                        <option  style={{"display":"none"}}>{option}</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <p className="form-input-error" >{optionError}</p>

                                <label for="buyer" className="form-label required">Post Sale Inspection</label>
                                <input className="form-control mt-3" type="text" placeholder=""
                                    aria-label="default input example" defaultValue= {psiComments} onChange={(e) => setIfComments(e.target.value)} disabled/>
                                <p className="form-input-error" >{ifCommentsError}</p>
                            </div>
                           
                            {/* <div class="table-box sellernotes-sec">

<div class="table-responsive fixTableHead">
    <table class="table no-wrap">
        <thead>
            <tr>
              
                <th class="border-top-0">Notes</th>

            </tr>
        </thead>
        <tbody>
        {notesList?.length > 0 ? notesList?.map((notesList) => 
            <tr>
              
                <td>{notesList}</td>
           
            </tr>
            ):<tr><td colspan="5" className='text-center'><h6>No Data Found</h6> </td></tr>}  
        </tbody>
    </table>
</div>
</div>        */}
<div className="CommonModalfooter ">
                            <div className="CommonModalfooter session">
                                <button className="cta-btn btn-smlprimary" onClick={props.toggle} >Close</button>
                                {/* <Button className="btn btn-smlprimary" onClick={()=> {saveAdd();props.toggle()}} >Ok</Button>  */}
                            </div> 
                            </div>    
</>):""}        
                     
                    
                    </div>
                </div>
        </div>
        </div>
        {isCommonPopupOpen && <CommonPopup
            handleClose={isCommonPopupOpen}
            popupTitle={popupTitle}
            popupMsg={popupMsg}
            popupType={popupType}
            popupActionType={popupActionType}
            popupActionValue={popupActionValue}
            popupActionPath={popupActionPath}
        />}
        </div>
  )
}

export default ViewPSi