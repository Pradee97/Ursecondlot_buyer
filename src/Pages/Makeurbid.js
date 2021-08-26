import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory, useParams } from "react-router-dom";
import API from "../Services/BaseService";
import Popup from '../Component/Popup/Popup';
import Terms from '../Component/TermsAndCondition/TermsAndCondition';
import CommonPopup from '../Component/CommonPopup/CommonPopup';
import Item from 'antd/lib/list/Item';
import checkImg from '../../src/assets/img/check.svg';
import errorImg from '../../src/assets/img/erroricon.png';
import '../Component/CommonPopup/commonPopup.css';
import CarDetailsAction from '../Pages/CarDetails/CarDetailsAction'

const MakeurBid=(props)=>{

    const history = useHistory();
    const dispatch = useDispatch();
    const [id,setId] = useState(useSelector(state => state.CarDetailsReducer.payload.car_id));
    const [carMaxBid,setCarMaxBid] = useState(useSelector(state => state.CarDetailsReducer.payload.max_price));
    const [sellerId,setSellerId] = useState(useSelector(state => state.CarDetailsReducer.payload.seller_dealer_id));
    const [carBuyItNow,setCarBuyItNow] = useState(useSelector(state => state.CarDetailsReducer.payload.buy_it_now));
    const [make,setMake] = useState(useSelector(state => state.CarDetailsReducer.payload.make));
    const [redirectPage,setRedirectPage] = useState(useSelector(state => state.CarDetailsReducer.payload.redirectPage));
    const [carHighBid,setCarHighBid] = useState(useSelector(state => state.CarDetailsReducer.payload.high_bid));  
    const [carMinBid,setCarMinBid] = useState(useSelector(state => state.CarDetailsReducer.payload.min_price));
    const [time,setTime] = useState(useSelector(state => state.CarDetailsReducer.payload.time));
    const [counterBuyerId,setCounterBuyerId] = useState(useSelector(state => state.CarDetailsReducer.payload.counter_buyerid));
    const carSavePurchase = useSelector(state => state.CarDetailsReducer.payload.save_purchase);
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
    const [buyer_dealer_id,setBuyer_Dealer_Id]=useState(JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id);
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [comments,setComments] = useState("");
    const [highBid,setHighBid] = useState(carHighBid);
    const [proxyBid,setProxyBid] = useState("");
    const [transportation,setTransportation] = useState("no");
    const [display,setDisplay]=useState("no");
    const [save,setSave] = useState("no");
    const [transportFlag,setTransportFlag] = useState("");
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
  
    function toggleViewDisplay(){
        console.log("inside toggle fn Del admin");
        if(display==="yes")
        {
            setDisplay("no");
        }
        else
        {
            setDisplay("yes");
        }
    }

    function toggleViewTransportation(){
        console.log("inside toggle fn Del admin",transportation);
        if(transportation==="yes")
        {
            setTransportation("no");
            console.log("inside toggle fn Del admin",transportation);
        }
        else
        {
            setTransportation("yes");
        }
    }

    function toggleViewSave(){
        console.log("inside toggle fn Del admin");
        if(save==="yes")
        {
            setSave("no");
        }
        else
        {
            setSave("yes");
        }
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
        dispatch(CarDetailsAction.minBid(makebiddispatch))
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
        console.log("check the request in make bid", highBid)
        setHighBidError("")
        if(!highBid){

            setHighBidError("High Bid should not be empty" )
            return;
        }
        else if (highBid+50 <carHighBid+50){
            setHighBidError("High Bid should not lower than " +Number(carHighBid+50))
            return;
            
        }
        if(proxyBid<=highBid){
            setProxyBidError("Max Bid price must be greater than high bid");
            return;
        }
        // else if(highBid>maxbid){
        //     setHighBidError("High Bid should not be greater than Seller Bid " +Number(carHighBid+50))
        //     return;
        // }
   
        console.log("inside addremove");
        let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
            car_id:id,
            bid: highBid,
            proxy_bid: proxyBid,
            comments: comments,
            transportation: transportation,
            display: display,
            active:1,
            createdBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
            updatedBy:JSON.parse(localStorage.getItem("userDetails")).buyer_id,
            transportation_charge:"300",
            save_purchase: save
        }

        console.log("request",request);
        console.log("check the request in make bid",request)
        API.post('makeBid/add',request).then(res=>{
         
            console.log("",res.data.data);
            if (res.data.success) {
                setToggleMakeBidPopupOpen(false);
                setAlertImg(checkImg);
                setAlertMessage("Your Bid is successfully created.Thanks you So much for your business")
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
 const assigntransportFlag=()=>{
    if(carSavePurchase=="" || carSavePurchase==null || carSavePurchase=="no" ){
        console.log("save purchase is null ");
        setTransportFlag(false);
        //setAlertMessage("Hi");
    }
    else
    {
        setTransportFlag(true);
    }
 }
    useEffect(() => {
		// MakeBid();
		console.log("Counter bid time : ",time);
        assigntransportFlag();
       
	},[reset]);

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
                            {carHighBid == "" || carHighBid == null || carHighBid == undefined ?
                            <p class="border-bottomtext">Your bid can't be Lower than $ {carMinBid}</p>:
                            <p class="border-bottomtext">Your bid can't be Lower than $ {carHighBid}</p>}
                            <p> Segment of Bidding $ 50</p>
                            <div class="row content">			
                            <div class="form-group col-lg-6 col-md-6">
                                {carHighBid == "" || carHighBid == null || carHighBid == undefined ?
                                <div class="tbox">

                                    <i>$</i><input type="text" id="highBid" class="textbox" placeholder="" onChange={(e)=>setHighBid(e.target.value)}></input>                             
                                    <label htmlFor="highBid" className={highBid != "" ? "input-has-value" : ""}>High Bid</label>

                                </div> :
                                <div class="tbox">
                                    
                                    <i>$</i><input type="text" id="highBid" class="textbox" defaultValue={carHighBid+50} onChange={(e)=>setHighBid(e.target.value)}></input>
                                    <label htmlFor="highBid" className={highBid != "" ? "input-has-value" : ""}>High Bid</label>
                                    
                                </div>
                                }
                                <p>{highBidError}</p>
                            </div>
                            <div class="form-group col-lg-6 col-md-6">
                            
                            <div className="cars-prices">
                            {carBuyItNow=="" || carBuyItNow== null || carBuyItNow== undefined ?"":
                            <a className="cta-btns" href="#">Buy It Now $ {carBuyItNow}</a>}
                            </div>
                               
                            </div>
                            
                            <div class="form-group col-lg-6 col-md-6">
                                {carMaxBid=="" || carMaxBid== null || carMaxBid== undefined?
                                <div class="tbox">

                                <i>$</i><input type="text" id="maxBid" class="textbox" defaultValue="" onChange={(e)=>setProxyBid(e.target.value)}></input>
                                <label htmlFor="maxBid" className={proxyBid != "" ? "input-has-value" : ""}>Max Bid</label>
                                    
                                </div>:
                                <div class="tbox">

                                <i>$</i><input type="text" id="maxBid" class="textbox" defaultValue={carMaxBid} onChange={(e)=>setProxyBid(e.target.value)}></input>
                                <label htmlFor="maxBid" className={proxyBid != "" ? "input-has-value" : ""}>Max Bid</label>
                               
                                </div>
                                 }
                                 <p>{proxyBidError}</p>  
                            </div>
                            
                           
                            <div className="col-lg-6 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb3" onClick={toggleViewDisplay}/>
                                        <label htmlFor="chb3" className="form-check-label">Display Max Bid To Seller  </label>                               
                                    </div>

                           

                            
                            <div class="form-group col-lg-12 col-md-12">	
                                <div class="tbox">			
                                    <input type="text" id="comment" class="textbox" placeholder="" onChange={(e)=>setComments(e.target.value)}></input>
                                    <label htmlFor="comment" >Add a Comment (Optional)</label>
                                </div>
                            </div>
                                <div class=" col-lg-12 col-md-12">
                                    <div class="optional-services row">
                                    <h4 class=" col-lg-12">Optional Services</h4>

                                    <div className="col-lg-6 form-group customCheckbox">
                                        {transportFlag?
                                        <input type="checkbox" className="form-check d-inline " id="chb2" checked onClick={toggleViewTransportation}/>:
                                        <input type="checkbox" className="form-check d-inline " id="chb2" onClick={toggleViewTransportation}/>
                                        }
                                        <label htmlFor="chb2" className="form-check-label">Transportation  </label>                               
                                    </div>

                                    <div className="col-lg-6 form-group">
                                        <span>$300 </span>                              
                                    </div>

                                    <div className="col-lg-12 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb1" onClick={toggleViewSave}/>
                                        <label htmlFor="chb1" className="form-check-label"> Save this option for next purchase  </label>                               
                                    </div>

                                    
                                </div>
                                </div>
                    
                            <div class=" col-lg-12 policylink">
                                <a href="JavaScript:void(0)" onClick={toggleTerms} >Policy document</a>
                            </div>
                            
                            <div class="col-lg-12 makeyourbid-btn">
                                <a class="makeyourbid-cancle-btns" onClick={props.toggle}>Cancel</a>
                                <a class="makeyourbid-send-btns" href="JavaScript:void(0)" onClick={MakeBid}>Send Bid</a>
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
               <div class="input-group col-md-12">
                   <div>
                       <p>{alertmessage}</p>
                       </div>
                   
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