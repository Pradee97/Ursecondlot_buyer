import React, { useState, useEffect } from 'react';
import API from '../../../../Services/BaseService';
import { useHistory, useLocation, useParams } from "react-router-dom";
import CommonPopup from '../../../../Component/CommonPopup/CommonPopup';
import "../../../../Component/CommonPopup/commonPopup.css"
import { useDispatch, useSelector } from 'react-redux';
import ls from 'local-storage';
import {Button} from "antd";

const ViewArb = (props) => {
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
    const [comments,setComments] = useState(props.viewArbId);
    const [commentsError,setCommentsError]=useState ("");
    const adminData = useSelector(state => state.LoginReducer.payload);	
    const [togglePopupOpen,setTogglePopupOpen]= useState(true);
    const [notesList,setNotesList] = useState("");

    const toggleCommonPopup = () => {
      setIsCommonPopupOpen(!isCommonPopupOpen);
    }

   
  const valueComments =ls.get('comments');

    
    const saveAdd = () => {
        
        ls.set('comments', comments);

    
        setCommentsError("")

        if(!comments){
           setCommentsError("Notes is required")
           return;
         }
         else if(comments.length > 500){
           setCommentsError("Notes must not exceed 500 characters")
           return;
         }     

        const recentlyAddednewvalue= [...notesList,comments]   
        setNotesList( [...notesList,comments] )
        // props.editArb(recentlyAddednewvalue)
       
        // setComments(" ")
        // setTogglePopupOpen(false)
        console.log("notesList======",notesList)
        console.log("comments======",comments)
        console.log("recentlyAddednewvalue item======",recentlyAddednewvalue)
    
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
                                <h2 >View Arbitary</h2>
                                <label for="buyer" className="form-label required">Arb</label>
                                <textarea className="form-control mt-3" type="text" placeholder=""
                                    aria-label="default input example" defaultValue= {comments} onChange={(e) => setComments(e.target.value)}/>
                                <p className="form-input-error" >{commentsError}</p>
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
            ):<tr><td colspan="5" className='text-center'><p>No Data Found</p> </td></tr>}  
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
export default ViewArb