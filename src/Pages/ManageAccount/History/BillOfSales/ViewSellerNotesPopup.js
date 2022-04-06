import React, { useState, useEffect } from 'react';
import API from '../../../../Services/BaseService';
import { useHistory, useLocation, useParams } from "react-router-dom";
import CommonPopup from '../../../../Component/CommonPopup/CommonPopup';
import "../../../../Component/CommonPopup/commonPopup.css"
import { useDispatch, useSelector } from 'react-redux';
import ls from 'local-storage';

const ViewSellerNotesPopup = (props) => {
  
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
    const [comments,setComments] = useState(props.notesName);
    const [commentsError,setCommentsError]=useState ("");
    const adminData = useSelector(state => state.LoginReducer.payload);	
    const [togglePopupOpen,setTogglePopupOpen]= useState(true);
    const [sellerNotes,setSellerNotes] = useState("");

    const toggleCommonPopup = () => {
      setIsCommonPopupOpen(!isCommonPopupOpen);
    }
    useEffect(()=>{

        getSellerNotes();
      
    }, [])
    const getSellerNotes = () => {

        let request={

            seller_notes_id : props.notesId,
            
        }
        console.log("=====request",request)
        
        API.post("sellernotes_view/condition",request).then(response => {

        });
    }
    useEffect(()=>{

        getSellerDetails();
      
    }, [])

    const getSellerDetails= () =>{
        let request={

            bill_of_sale_id : props.bosId,
            
        }
        API.post("sellernotes_list/condition",request).then(response=>{
            setSellerNotes(response.data?.data)
            // setLoading(false);

        });
    }

    return(
        
           <div className="popup-box">
                 <div id="" className="CommonModels-box">
                     <div className="Commonfullformblock col-lg-9">
                         <div className="CommonContainer">
                           <div className="CommonModalcontent">
                           <div class="table-box sellernotes-sec">

<div class="table-responsive fixTableHead">
    <table class="table no-wrap">
        <thead>
            <tr>
                <th class="border-top-0">Date</th>
                <th class="border-top-0">User</th>
                <th class="border-top-0">Location </th>
                <th class="border-top-0">Notes</th>
            </tr>
        </thead>
        <tbody>
        {sellerNotes?.length > 0 ? sellerNotes?.map((sellerNotes) => 
            <tr>
                <td>{sellerNotes?.date}</td>
                <td class="text-color">{sellerNotes?.dealer_name}</td>
                <td>{sellerNotes?.location}</td>
                <td>{sellerNotes?.seller_notes}</td>
                <td>
                </td>    
            </tr>
            ):<tr><td colspan="5" className='text-center'><p>No Data Found</p> </td></tr>}  
        </tbody>
    </table>
</div>
</div>
                            <div className="CommonModalfooter ">
                            <div className="CommonModalfooter session">
                                <button className="cta-btn btn-smlprimary" onClick={props.toggle} >Close</button>
                            </div> 
                            </div>            
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
 
export default ViewSellerNotesPopup;