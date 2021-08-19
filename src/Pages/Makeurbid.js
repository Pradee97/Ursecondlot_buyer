import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from "react-router-dom";
import API from "../Services/BaseService";
import Popup from '../Component/Popup/Popup';
import Terms from '../Component/TermsAndCondition/TermsAndCondition';

const MakeurBid=(props)=>{

    const { id } = useParams();
    const loggedInBuyerId = useSelector(state => state.LoginReducer.payload);
    const [isOpen, setIsOpen] = useState(false);
    const [comments,setComments] = useState("");
    const [highBid,setHighBid] = useState("");
    const [proxyBid,setProxyBid] = useState("");
    const [transportation,setTransportation] = useState("no");
    const [display,setDisplay]=useState("no");
    const [save,setSave] = useState("");

    const togglePopup = () => {
        setIsOpen(!isOpen);
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
        if(save===true)
        {
            setSave(false);
        }
        else
        {
            setSave(true);
        }
    }

    const MakeBid =()=>{

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
            createdBy:JSON.parse(loggedInBuyerId).buyer_id ,
            updatedBy:JSON.parse(loggedInBuyerId).buyer_id 
        }

        console.log("request",request);
        API.post('makeBid/add',request).then(res=>{
         
            console.log("",res.data.data);

        })
    }

    useEffect(() => {
		MakeBid();
		
       
	},[]);

    return(
        <div>
          
             
                <div id="makeyourbid" class="makeyourbid">
                    <div class="container">
                        <div class="makeyourbidblock col-lg-12">
                            <div class="section-title">
                                <h2>Make Your Bid</h2>
                            </div>
                    
                            <div class="border-block"></div>
                            <p class="border-bottomtext">Your bid can't be Lower than $12500</p>
                            <div class="row content">			
                            <div class="form-group col-lg-6 col-md-6">
                                <div class="input-icon">
                                    <input type="text" class="form-control" placeholder="Place your bid" onChange={(e)=>setHighBid(e.target.value)}></input>
                                    <i>$</i>
                                </div>
                            </div>
                            <div class="form-group col-lg-6 col-md-6">
                                <h2>Buyer Fee</h2>
                            </div>
                            
                            <div class="form-group col-lg-6 col-md-6">
                                <div class="input-icon">
                                    <input type="text" class="form-control" placeholder="Max Bid(Optional)" onChange={(e)=>setProxyBid(e.target.value)}></input>
                                    <i>$</i>
                                </div>
                            </div>
                            
                           
                            <div className="col-lg-6 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb3" onClick={toggleViewDisplay}/>
                                        <label htmlFor="chb3" className="form-check-label">Display Max Bid To Seller  </label>                               
                                    </div>

                           

                            
                            <div class="form-group col-lg-12 col-md-12">				
                                <input type="text" class="form-control" placeholder="Add a Commend (Optional)" onChange={(e)=>setComments(e.target.value)}></input>
                            </div>
                                <div class=" col-lg-12 col-md-12">
                                    <div class="optional-services row">
                                    <h4 class=" col-lg-12">Optional Services</h4>

                                    <div className="col-lg-6 form-group customCheckbox">
                                        <input type="checkbox" className="form-check d-inline " id="chb2" onClick={toggleViewTransportation}/>
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
                                <a href="JavaScript:void(0)" onClick={togglePopup} >Policy document</a>
                            </div>
                            
                            <div class="col-lg-12 makeyourbid-btn">
                                <a class="makeyourbid-cancle-btns" onClick={props.toggle}>Cancel</a>
                                <a class="makeyourbid-send-btns" href="JavaScript:void(0)" onClick={MakeBid}>Send Bid</a>
                            </div>
                    </div>
                    
                </div>
                </div>
            </div>    

            {isOpen && <Popup
                isClose={false}
                content={<>
                    <Terms toggle={togglePopup} />
                </>}
                handleClose={togglePopup}
            />}

    </div>

    )
}
export default MakeurBid;