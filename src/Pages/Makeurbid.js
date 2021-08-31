import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import Popup from '../Component/Popup/Popup';
import Terms from '../Component/TermsAndCondition/PolicyDocument';
import CommonPopup from '../Component/CommonPopup/CommonPopup';
import Item from 'antd/lib/list/Item';
import checkImg from '../../src/assets/img/check.svg';
import errorImg from '../../src/assets/img/erroricon.png';
import '../Component/CommonPopup/commonPopup.css';
import CarDetailsAction from '../Pages/CarDetails/CarDetailsAction'

const MakeurBid=(props)=>{
console.log("check props",props)
    const history = useHistory();
    const dispatch = useDispatch();
    console.log("check the transport payload",useSelector(state => state.CarDetailsReducer.payload.transportation))
    const [id,setId] = useState(props.setMakeBitValue.carId);
    const [carMaxBid,setCarMaxBid] = useState(props.setMakeBitValue.carMaxBid);
    const [sellerId,setSellerId] = useState(props.setMakeBitValue.carSellerDealerId);
    const [carBuyItNow,setCarBuyItNow] = useState(props.setMakeBitValue.buyItNow);
    const [carComments,setCarComments] = useState(props.setMakeBitValue.comments);
    const [carDisplay,setCarDisplay] = useState(props.setMakeBitValue.display);
    const [carTransportation,setCarTransportation] = useState(props.setMakeBitValue.carSavePurchase === "yes" ?props.setMakeBitValue.transportation : "no");
    const [carSavePurchase,setCarSavePurchase] = useState(props.setMakeBitValue.carSavePurchase);
    const [carProxyBid,setCarProxyBid] = useState(props.setMakeBitValue.carProxyBid);
    const [make,setMake] = useState(props.setMakeBitValue.make);
    const [redirectPage,setRedirectPage] = useState(props.setMakeBitValue.redirectPage);
    const [carHighBid,setCarHighBid] = useState(props.setMakeBitValue.carHighBid);  
    const [carMinBid,setCarMinBid] = useState(props.setMakeBitValue.carMinBid);
    const [time,setTime] = useState(props.setMakeBitValue.time);
    const [counterBuyerId,setCounterBuyerId] = useState(props.setMakeBitValue.counter_buyerid);
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
    const [buyer_dealer_id,setBuyer_Dealer_Id]=useState(JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id);
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [comments,setComments] = useState(carComments);
    const [highBid,setHighBid] = useState(carHighBid);
    const [proxyBid,setProxyBid] = useState(carProxyBid);
    const [transportation,setTransportation] = useState("no");
    const [display,setDisplay]=useState("no");
    const [save,setSave] = useState("no");
    const [transportFlag,setTransportFlag] = useState("");
    const [displayFlag,setDisplayFlag]=useState("");
    const [saveFlag,setSaveFlag] = useState("");
    const [reset,setReset]=useState("");
    


    const [popupTitle, setPopupTitle] = useState ("");
    const [popupMsg, setPopupMsg] = useState ("");
    const [popupType, setPopupType] = useState ("");
    const [popupActionType, setPopupActionType] = useState ("");
    const [popupActionValue, setPopupActionValue] = useState ("");
    const [popupActionPath, setPopupActionPath] = useState ("");

    const [alertmessage,setAlertMessage] = useState("");
    const [alertimg,setAlertImg] = useState("");
    const [toggleMakeBidPopupOpen,setToggleMakeBidPopupOpen]= useState(true);
    const [highBidError, setHighBidError] = useState("");
    const [proxyBidError, setProxyBidError] = useState("");
    const [onLoadFlag, setOnLoadFlag] = useState(true)
    const [highAndProxyFlag, setHighAndProxyFlag] = useState(false)


    if(carHighBid=="" || carHighBid==null || carHighBid==undefined || carHighBid==0){
        setCarHighBid(carMinBid)
    }

    // if(carSavePurchase=="" || carSavePurchase==null || carSavePurchase=="no" ){

    //     setTransportFlag(false)
    // }
    // else {
    //     setTransportFlag(true)
    // }

    
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    
    const toggleTerms = () => {
        setOpen(!open);
    }
  
    function toggleViewDisplay(data){
        
        console.log("inside toggle fn Del admin",data);
        setCarDisplay(data)
    }

    function toggleViewTransportation(data){
        console.log("inside toggle fn Del admin",data);
     
            setCarTransportation(data=="yes"?"no":"yes");

    }

    function toggleViewSave(data){
        console.log("inside toggle fn Del admin");
        setCarSavePurchase(data=="yes"?"no":"yes");
    }

    const OnOkClick = () =>{
        props.toggle()
        setReset(true)
    } 

    const redirect = () => {
        let makebiddispatch={
            high_bid: highBid,
            min_bid: carMinBid,
            save_purchase: carSavePurchase,
            
        }
        //dispatch(CarDetailsAction.highBid(high_bid))
        // dispatch(CarDetailsAction.minBid(makebiddispatch))
        props.getMakeBitValue(makebiddispatch)
        console.log("redirection checking for car detail" , id)
        if (redirectPage=="cardetail"){
        history.push("/cardetail/"+id)
        }
        else if(redirectPage=="suggestedcars") {
        history.push("/suggestedcars")
        }
        else if(redirectPage=="inventorycars") {
        history.push("/inventorycars")
        }
        else if(redirectPage=="favorite") {
        history.push("/favorite")
        }
        else if(redirectPage=="morecarfrombuyer") {
        history.push("/morecarfrombuyer/"+sellerId)
        }
        else if(redirectPage=="recentlyaddedcars") {
        history.push("/recentlyaddedcars")
        }
        else if(redirectPage=="similarcarfrombuyer") {
        history.push("/similarcarfrombuyer/"+make)
        }
        else if(redirectPage=="search") {
        history.push("/search")
        }
        else{
            history.push("/carlist")
        }
        
        props.toggle()
    }

 

    const MakeBid =()=>{
        
        setHighBidError("")
        setProxyBidError("")

        if(!highBid){

            setHighBidError("High Bid price should not be empty" )
            return;
        }
        else if (highBid <carMinBid){
            console.log("High Bid price should not lower than " +Number(carHighBid+50))
            setHighBidError("High Bid price should not lower than " +Number(carHighBid+50))
            return;
            
        }
        if((carBuyItNow!=="" && carBuyItNow!== null && carBuyItNow!==undefined && carBuyItNow!==0 && carBuyItNow<highBid)){
            console.log("checkt the validation for the max and buy it now")
            setHighBidError("Your high Bid Price must be less than Buy it Now Price");
            return;
        
        }

        if((proxyBid!=="" && proxyBid!==null && proxyBid!==undefined && proxyBid!==0)&& (Number(proxyBid)<=Number(highBid))){
            console.log("highBid===",highBid)
            console.log("proxyBid===",proxyBid)
            setProxyBidError("Max Bid price must be greater than high bid");
            return;
        }

        
        if((carBuyItNow!=="" && carBuyItNow!== null && carBuyItNow!==undefined && carBuyItNow!==0 && carBuyItNow<proxyBid )){
            console.log("check the validation for the max and buy it now")
            setProxyBidError("Your Max Bid Price must be less than Buy it Now Price");
            return;
        
        }
 
        console.log("inside addremove");
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            car_id:id,
            bid: highBid,
            proxy_bid: !proxyBid ? 0 : proxyBid,
            comments: !comments ? "" :comments ,
            transportation: !carTransportation ? "no" : carTransportation,
            display: !carDisplay ? "no" : carDisplay,
            active:1,
            createdBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
            updatedBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
            transportation_charge:"300",
            save_purchase: !carSavePurchase ? "no" : carSavePurchase
        }

        console.log("request",request);
        console.log("check the request in make bid",request)
        // return;
        API.post('makeBid/add',request).then(res=>{
         
            console.log("",res.data.data);
            if (res.data.success) {
                setToggleMakeBidPopupOpen(false);
                setAlertImg(checkImg);
                setAlertMessage("Your Bid has been updated")
                // const { data } = res;
                // togglePopup()
                // setPopupTitle("Make Bid");
                // setPopupMsg("Your Bid is successfully created.Thanks you So much for your business");
                // setPopupType("success");
                // setPopupActionType("close");
                // setPopupActionValue("close");
                
            } else {
                const { data } = res;
                setToggleMakeBidPopupOpen(false);
                setAlertImg(errorImg);
                setAlertMessage( data.error.err )
                // const { data } = res;
                // togglePopup()
                // setPopupTitle("Make Bid");
                // setPopupMsg( data.error.err );
                // setPopupMsg("Floor is not Created, Please try Again");
                // setPopupType("error");
                // setPopupActionType("close");
                // setPopupActionValue("close");
            }

        })
    }

    // async function getLotfee() {
    //     let request = {
    //         buyer_dealer_id: userDetails.buyer_dealer_id,
    //     };
    //     const state = API.post('lot_fee/condition', request);
    //     state.then(res => {
    //         console.log("res", res.data.data)
    //         setLotValue(res.data.data.lot_fee);
    //         setLotFee(res.data.data);
    //         // setLoading(false);
    //     })
    //         .catch(err => { console.log(err); });
    // }
    // useEffect(() => {
    //     getLotfee();
    // }, []);

 const assigntransportFlag=()=>{

    
    
    if(carSavePurchase=="" || carSavePurchase==null || carSavePurchase=="no" ){
        console.log("save purchase is null ");
        setTransportFlag(false);
        setSaveFlag(false);
        //setAlertMessage("Hi");
    }
    else{
        console.log("save purchase is coming as yes",)
        setTransportFlag(true);
        setSaveFlag(true);
    }
    if(carDisplay=="" || carDisplay==null || carDisplay=="no"){
        setDisplayFlag(false);
    }
    else{
        setDisplayFlag(true);
    }
    
 }
    useEffect(() => {
		// MakeBid();
		console.log("Counter bid time : ",time);
        assigntransportFlag();
       
    },[reset]);
    
    const highBidValidation = (data)=> {
        console.log("carHighBid====",carHighBid)
        if(data > (carHighBid || 0)){
            if((data - carHighBid) % 50 !==0){
                setHighBidError("High Bid should only be increased by 50's")
                setHighAndProxyFlag(true)
            }
            else {
                setHighBid(data);
                setHighBidError("")
                setHighAndProxyFlag(false)
            }
        }
        else{
            setHighBidError("")
            setHighBid(data);
                setHighAndProxyFlag(false)
        }
        if(!data || 0){
            setHighBidError("")
            setHighAndProxyFlag(false)
        }
        
    }
    const highProxyBidValidation= (data)=> {
        
        console.log("carHighBid====",carHighBid)
        if(data > (carHighBid || 0)){
            if((data - carHighBid) % 50 !==0){
                setProxyBidError("Hig Bid amount cab be increased by 50's only")
                setHighAndProxyFlag(true)
            }
            else {
                setProxyBid(data);
                setProxyBidError("")
                setHighAndProxyFlag(false)
            }
        }
        else{
            setProxyBidError("")
            setProxyBid(data);
            setHighAndProxyFlag(false)
        }
        if(!data || 0){
            setProxyBidError("")
            setHighAndProxyFlag(false)
        }
        
    }

    return(
        <div>
          
             
                <div id="makeyourbid" class="makeyourbid">
                {toggleMakeBidPopupOpen?
                    (<div class="container">
                        {time>20 || time==null || time==undefined ?
                        <div class="makeyourbidblock col-lg-12">
                            <div class="section-title">
                                <h2>Make Your Bid</h2>
                            </div>
                    
                            <div class="border-block"></div>
                           
                            <div class="row content">	
                            
                            {carHighBid == "" || carHighBid == null || carHighBid == undefined ?
                            <div class="border-bottomtext col-lg-6 ">Your bid can't be Lower than $ {carMinBid+50}</div>:
                            <div class="border-bottomtext col-lg-6 ">Your bid can't be Lower than $ {carHighBid+50}</div>}
                            <div class="border-bottomtext col-lg-6 "> Segment of Bidding $ 50</div>


                            <div class="form-group col-lg-6 col-md-6 highbidtbox">
                                {/* {carHighBid == "" || carHighBid == null || carHighBid == undefined ? */}
                                <div class="tbox">

                                    <i>$</i><input type="number" step="50" id="highBid" class="textbox" placeholder="Your New Bid" onChange={(e)=>highBidValidation(e.target.value)}></input>                             
                                    <label htmlFor="highBid" className={highBid != "" ? "input-has-value" : ""}>High Bid</label>

                                </div> 
                                {/* :<div class="tbox">
                                    
                                    <i>$</i><input type="text" id="highBid" class="textbox" defaultValue={carHighBid+50} onChange={(e)=>setHighBid(e.target.value)}></input>
                                    <label htmlFor="highBid" className={highBid != "" ? "input-has-value" : ""}>High Bid</label>
                                    
                                </div>
                                } */}
                                <p class="form-input-error">{highBidError}</p>
                            </div>
{/* 
                            <input
                                type="range"
                                id={id}
                                min={carHighBid}
                                // max={}
                                step={0.5}
                                // // value={state} // don't set value from state
                                // defaultValue={state} // but instead pass state value as default value
                                onChange={(e)=>setHighBid(e.target.value)}
                                // onMouseUp={handleChange} 
                                /> */}

                            <div class="form-group col-lg-6 col-md-6">
                            
                            
                            {carBuyItNow=="" || carBuyItNow== null || carBuyItNow== undefined ?"":
                            <p className="details buyitnow"><span>Buy It Now $ {carBuyItNow}</span></p>}
                           
                               
                            </div>
                            
                           

                            <div class="form-group col-lg-6 col-md-6">
                                {carProxyBid=="" || carProxyBid== null || carProxyBid== undefined?
                                <div class="tbox">

                                <i>$</i><input type="text" id="proxyBid" class="textbox" defaultValue="" onChange={(e)=>highProxyBidValidation(e.target.value)}></input>
                                <label htmlFor="proxyBid" className={proxyBid != "" ? "input-has-value" : ""}>Maximum Proxy Bid</label>
                                    
                                </div>:
                                <div class="tbox">

                                <i>$</i><input type="text" id="proxyBid" class="textbox" defaultValue={carProxyBid} onChange={(e)=>setProxyBid(e.target.value)}></input>
                                <label htmlFor="proxyBid" className={proxyBid != "" ? "input-has-value" : ""}>Maximum Proxy Bid</label>
                               
                                </div>
                                 }
                                 <p className="form-input-error">{proxyBidError}</p>  
                            </div>
                            
                           
                            <div className="col-lg-6 form-group customCheckbox  pt-3">
                                <input type="checkbox" className="form-check d-inline " id="chb3" value={carDisplay == 'yes' ? 'no' : 'yes'} checked={carDisplay == 'yes' ? true : false} onChange={(e)=>{setCarDisplay(e.target.value)}}/>
                                <label htmlFor="chb3" className="form-check-label">Display Max Bid To Seller  </label>                               
                            </div>

                           

                            {carComments=="" || carComments==null || carComments==undefined?
                            <div class="form-group col-lg-12 col-md-12 addComment">	
                                <div class="tbox">			
                                    <input type="text" id="comment" class="textbox" placeholder="" onChange={(e)=>setComments(e.target.value)}></input>
                                    <label htmlFor="comment" className={comments != "" ? "input-has-value" : ""} >Add a Comment (Optional)</label>
                                </div>
                            </div>:
                            <div class="form-group col-lg-12 col-md-12 addComment">	
                            <div class="tbox">			
                                <input type="text" id="comment" class="textbox" defaultValue={carComments} onChange={(e)=>setComments(e.target.value)}></input>
                                <label htmlFor="comment" className={comments!= "" ? "input-has-value" : ""}>Add a Comment (Optional)</label>
                            </div>
                            </div>}
                                <div class=" col-lg-12 col-md-12">
                                    <div class="optional-services row">
                                    <h4 class=" col-lg-12">Optional Services</h4>

                                    <div className="col-lg-6 form-group customCheckbox">
                                    {/* {carSavePurchase == 'yes' && onLoadFlag ?  */}
                                        <input type="checkbox" className="form-check d-inline " id="chb2" value={carTransportation == 'yes' ? 'no' : 'yes'} checked={carTransportation==="yes" ?true:false} onChange={(e)=>{setCarTransportation(e.target.value); e.target.value === "no" && setCarSavePurchase('no')}}/> 
                                        {/* :
                                        <input type="checkbox" className="form-check d-inline " id="chb2" value={carTransportation == 'yes' ? 'no' : 'yes'} onChange={(e)=>setCarTransportation(e.target.value)}/>
                                    } */}
                                        <label htmlFor="chb2" className="form-check-label">Transportation  </label>                               
                                    </div>

                                    <div className="col-lg-6 form-group">
                                        <span>$300 </span>                              
                                    </div>

                                    <div className="col-lg-12 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb1" readOnly = {carTransportation =='no' ? true: false} disabled = {carTransportation =='no' ? true: false} value={carSavePurchase == 'yes' ? 'no' : 'yes'} checked={carSavePurchase==="yes"?true:false} onChange={(e)=>{setCarSavePurchase(e.target.value); setOnLoadFlag(false)}}/>
                                         {/* <input type="checkbox" className="form-check d-inline " id="chb1" onClick={toggleViewSave}/> */}
                                    
                                        <label htmlFor="chb1" className="form-check-label"> Save this option for next purchase  </label>                               
                                    </div>

                                    
                                </div>
                                </div>
                    
                            <div class=" col-lg-12 policylink">
                                <a href="JavaScript:void(0)" onClick={toggleTerms} >Policy document</a>
                            </div>
                            
                            <div class="col-lg-12 makeyourbid-btn">
                                <a class="makeyourbid-cancle-btns" onClick={props.toggle}>Cancel</a>
                                <a class="makeyourbid-send-btns" disabled = {highAndProxyFlag} href="JavaScript:void(0)" onClick={()=>{!highAndProxyFlag && MakeBid()}}>Send Bid</a>
                            </div>
                    </div>
                    
                </div>:
                <div>
                    <p>Make Bid is in progess</p>
                    <div class="col-md-12 btns">
                    <button className="cta-btns" onClick={redirect}>ok</button>      
                   </div> 
                </div>}
                </div>):
                
                (
                    <div className="popup-box">
                         <div id="" className="CommonModels-box">
                         <div className="Commonfullformblock col-lg-9">
                         <div className="CommonContainer">
                         <div className="CommonModalcontent">
                {/* <img src={checkImg}></img>  */}
             <div className="Commonfull-icon">
             <img alt="" className={alertimg === checkImg ?  "successImg"  : "errorImg" } src={alertimg}></img>
             
                 </div>
             <div className="modalbody">
               <h2 className="title"> Make Bid </h2>
               <div class="col-md-12">
                   
                       <p className="text-center">{alertmessage}</p>
                       
                   
                   <div class="col-md-12 btns">
                    <button className="cta-btns" onClick={redirect}>ok</button>      
                   </div> 
               </div>
             </div>
            </div>
            </div>
            </div>
            </div>
            </div>)}
                
            </div>    

            {open && <Popup
                isClose={false}
                content={<>
                    <Terms toggle={toggleTerms} />
                </>}
                handleClose={toggleTerms}
            />}
              {isOpen &&
                    <CommonPopup 
                        handleClose= {togglePopup}
                        popupTitle= {popupTitle}
                        popupMsg= {popupMsg}
                        popupType= {popupType}
                        popupActionType= {popupActionType}
                        popupActionValue= {popupActionValue}
                        popupActionPath={popupActionPath}
                    />}

    </div>

    )
}
export default MakeurBid;