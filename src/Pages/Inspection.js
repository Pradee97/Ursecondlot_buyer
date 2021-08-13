import React, { useState , useEffect } from 'react';
import API from "../Services/BaseService";
import appstore from '../assets/img/appstore.png';
import googleplay from '../assets/img/googleplay.png';
import checkmarkred from '../assets/img/checkmarkred.svg';
import checkmark from '../assets/img/checkmark.svg';
import iconarrowback from '../assets/img/ionic-ios-arrow-back.svg';
import car from '../assets/img/cars02.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from "react-router-dom";
import CarListAction from '../../src/Pages/CarList/CarListAction';
import ReactPlayer from 'react-player';
import Loading from '../Component/Loading/Loading';
const Inspection=()=>{

     
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const [inspection,setInspection]=useState("");
    const [interiorMedia,setInteriorMedia] = useState("");
    const [exteriorMedia,setExteriorMedia] = useState("");
    const [mechanicalMedia,setMechanicalMedia] = useState("");
    const [tiresWheelsMedia,setTiresWheelsMedia] = useState("");
    const [powerTrainMedia,setPowerTrainMedia] = useState("");
    const [testDriveMedia,setTestDriveMedia] = useState("");
    const { id } = useParams();
    const getInspectionDetail = () =>{
    let request={
        car_id: id,
        
    }
    API.post('inspection/condition',request).then(res=>{
        console.log("response",res.data.data);
       
        setInspection(res.data.data);
        
    }).catch(err => { console.log(err); });
}

const ExteriorMedia=()=>{
    let request={
        car_id:id
    }
    API.post('exterior_media/condition',request).then(res=>{
        console.log("exterior_media/condition",res.data.data);
       
        setExteriorMedia(res.data.data);
        
    }).catch(err => { console.log(err); });

}

const InteriorMedia = () =>{
    let request={
        car_id: id,
        
    }
    API.post('interior_media/condition',request).then(res=>{
        console.log("interior_media/condition",res.data.data);
       
        setInteriorMedia(res.data.data);
        
    }).catch(err => { console.log(err); });
}

const MechanicalMedia = () =>{
    let request={
        car_id: id,
        
    }
    API.post('mechanical_media/condition',request).then(res=>{
        console.log("mechanical_media/condition",res.data.data);
       
        setMechanicalMedia(res.data.data);
        
    }).catch(err => { console.log(err); });
}

const TiresWheelsMedia = () =>{
    let request={
        car_id: id,
        
    }
    API.post('tireswheels_media/condition',request).then(res=>{
        console.log("tireswheels_media",res.data.data);
       
        setTiresWheelsMedia(res.data.data);
        
    }).catch(err => { console.log(err); });
}

const PowerTrainMedia = () =>{
    let request={
        car_id: id,
        
    }
    API.post('power_train_media/condition',request).then(res=>{
        console.log("power_train_media/condition",res.data.data);
       
        setPowerTrainMedia(res.data.data);
        
    }).catch(err => { console.log(err); });
}

const TestDriveMedia = () =>{
    let request={
        car_id: id,
        
    }
    API.post('testdrive_media/condition',request).then(res=>{
        console.log("testdrive_media/condition",res.data.data);
       
        setTestDriveMedia(res.data.data);
        setLoading(false);
    }).catch(err => { console.log(err); });
}



    useEffect(() => {
        getInspectionDetail();
        ExteriorMedia();
        InteriorMedia();
        MechanicalMedia();
        TiresWheelsMedia();
        PowerTrainMedia();
        TestDriveMedia();
        
    },[]);

    const redirectpage=(pathid,seller_dealer_id)=>{
        // e.preventDefault();
        console.log("seller_dealer_id+++++",seller_dealer_id)
        dispatch(CarListAction.sellerid(seller_dealer_id))
        history.push("/cardetail/"+pathid);
    }
    return(
        <div>
            {loading?<Loading/>:
            <main id="main" class="inner-page">
   
   
            <div id="inspectionsummery" class="inspectionsummery">
            {inspection.length>0?
                <div class="container">
                
                <div class="back-btn">
                        <a class="backBtn" href="JavaScript:void(0)" onClick={()=>{redirectpage(inspection[0].car_id,inspection[0].seller_dealer_id)}} ><i class="bx bx-chevron-left"></i> Back</a>
                </div>
                <div class="inspectionsummeryblock col-lg-12">

                <div class="section-title">
                    <h2>Inspection Summary</h2>
                </div>
                <div class="inspectionsummeryhead ">
                    <h2>{inspection[0].make} ({inspection[0].model} Model)</h2>
                    <div class="row content">
                        <div class="col-lg-6 pt-4 pt-lg-0">
                            <p>Inspection Date & TIME:<span>06 jan 11.45pM </span></p>
                            <p>Inspection name:<span>{inspection[0].name}</span></p>
                        </div>
                        <div class="col-lg-6 pt-4 pt-lg-0">
                            <p>Colour:<span>Metallic Blue</span></p>
                            <p>Vim:<span>{inspection[0].vin_no}</span></p>
                        </div>
                    </div>
                </div>
                    <div class="row content">
                    <div class="col-lg-12 pt-4 pt-lg-0 inspectiontableBlock">
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="2" scope="colgroup">Vehicle Operable<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr>
                        <td>Vehilcle is Disabled Need To Be Towed</td>
                        <td><span>Yes</span></td>
                        </tr>
                        </table>            
                    </div>
                    
                    <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Covered Power Train<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Covered Items</td>
                        <td>Covered</td>
                        <td>Not Covered</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>Engine Bottom End Noise</td>
                        {inspection[0].noise == "Covered"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Automatic Transmission Operation</td>
                        <td></td>{inspection[0].auto_transmission == "Covered"?
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>:<td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}       
                        </tr>
                        <tr class="">
                        <td>Transfer Case Operation</td>
                        <td></td>
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Differential Operation</td>
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td>
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    
                        <div class="commentsblock">
                        <h3>Covered Items Images/Videos</h3>
                        </div>
                        
                        <div class="coveredgallery images-container">                         
                            <div class="photo-gallery">
                                <div class="row photos">
                                    {powerTrainMedia.length>0?powerTrainMedia.map((item)=>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item">
                                        {item?.media.indexOf('mp4')>0?(
                                  
                                    <video autobuffer controls autoplay  width='100%'
                                    height='100%'>
                                        <source id="mp4" src={item?.media} type="video/mp4"></source>
                                    </video>
                                
                                    ):<img class="img-fluid" src={item?.media}></img>}
                                    </div>
                                    ):""}
                                    
                                </div>
                            </div>
                        </div>
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Mechanical<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>Engine Upper End</td>
                        {inspection[0].upper_end == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Engine Bottom End</td>
                        <td></td>
                        {inspection[0].bottam_end == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Catalytic Converter Present</td>
                        <td></td>
                        {inspection[0].catalytic_converter == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Heater Runs Hot</td>
                        {inspection[0].heater_runs == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>A/c Runs Hot</td>
                        {inspection[0].ac_runs == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No Check Engine Light At Startup</td>
                        {inspection[0].engine_light == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No Abs</td>
                        <td></td>
                        {inspection[0].no_ads == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No SRS/Airbag Light</td>
                        {inspection[0].no_srs == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Differential Operation</td>
                        {inspection[0].differential_operation == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        
                        </table>            
                    </div>
                    
                    <div class="commentsblock">
                        <h3>Mechanical Images</h3>
                        </div>
                       
                        <div class="mechanicalgallery images-container">
                                            
                        
                            <div class="photo-gallery">
                                <div class="row photos">
                                    {tiresWheelsMedia.length>0?tiresWheelsMedia.map((item)=>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item">
                                        {item?.media.indexOf('mp4')>0?(
                                         <video autobuffer controls autoplay  width='100%'
                                         height='100%'>
                                             <source id="mp4" src={item?.media} type="video/mp4"></source>
                                         </video>
                                         ):<img class="img-fluid" src={item?.media}></img>}
                                    </div>
                                    ):""}
                                    
                                </div>
                            </div>
                        </div>
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Tires & Wheels<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>5/32 Tread Depth</td>
                        {inspection[0].tread_depth == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Four Tires Condition</td>
                        <td></td>
                        {inspection[0].four_tires_condition == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Any Scratches On The Wheels</td>
                        {/* {inspection[0].breaking_senses == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>} */}
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    <div class="commentsblock">
                        <h3>Tires & Wheels Images</h3>
                        </div>
                        
                        <div class="tiresgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    {tiresWheelsMedia.length>0?tiresWheelsMedia.map((item)=>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item">
                                        {item?.media.indexOf('mp4')>0?(
                                        <video autobuffer controls autoplay  width='100%'
                                        height='100%'>
                                            <source id="mp4" src={item?.media} type="video/mp4"></source>
                                        </video>
                                        ):<img class="img-fluid" src={item?.media}></img>}
                                    </div>
                                    ):""}
                                    
                                </div>
                            </div>
                        </div>
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Exterior<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>No Visible Rust</td>
                        {inspection[0].visible_rust == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Colour Fade</td>
                        <td></td>
                        {inspection[0].color_fade == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>No Glass Damaged</td>
                        <td></td>
                        {inspection[0].glass_damage == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Exterior Scratches</td>
                        {inspection[0].scratches == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Side Mirror Damage</td>
                        {inspection[0].side_mirror == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    <div class="commentsblock">
                        <h3>Exterior Images</h3>
                        </div>
                        
                          <div class="exteriorgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    {exteriorMedia.length>0?exteriorMedia.map((item)=>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item">
                                        {item?.media.indexOf('mp4')>0?(
                                        <video autobuffer controls autoplay  width='100%'
                                        height='100%'>
                                            <source id="mp4" src={item?.media} type="video/mp4"></source>
                                        </video>
                                        ):<img class="img-fluid" src={item?.media}></img>}
                                    </div>
                                    ):""}
                                    
                                </div>
                            </div>
                        </div>
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Interior<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        
                        <tr class="">
                        <td>No Visible Damage</td>
                        {inspection[0].visible_damage == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Frond Seat Conditions</td>
                        <td></td>
                        {inspection[0].front_seat == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Back Seat Condition</td>
                        <td></td>
                        {/* {inspection[0].automatic_transmission == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>} */}
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>No Major Visible Damage</td>
                        {inspection[0].major_damage == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        </table>            
                    </div>
                    <div class="commentsblock">
                        <h3>Interior Images</h3>
                        </div>
                        
                        <div class="interiorgallery images-container">
                            <div class="photo-gallery">
                                <div class="row photos">
                                    {interiorMedia.length>0?interiorMedia.map((item)=>
                                    <div class="col-sm-4 col-md-2 col-lg-2 item">
                                        {item?.media.indexOf('mp4')>0?(
                                         <video autobuffer controls autoplay  width='100%'
                                         height='100%'>
                                             <source id="mp4" src={item?.media} type="video/mp4"></source>
                                         </video>
                                         ):<img class="img-fluid" src={item?.media}></img>}
                                    </div>
                                    ):""}
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    
                    <div class="inspectiontable">          
                        <table>
                        <thead>
                        <tr>
                                <th colspan="4" scope="colgroup">Test Drive<span class="tablearrow"><img src={iconarrowback}></img></span></th>	
                            
                        </tr>
                        </thead>
                        <tr class="inspectionbg">
                        <td>Inspection object</td>
                        <td>Good</td>
                        <td>Bad</td>
                        <td>N/A</td>
                        </tr>
                        <tr class="">
                        <td>Automatic Transmission</td>
                        <td></td>
                        {inspection[0].automatic_transmission == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Manual Transmission</td>
                        {inspection[0].manual_transmission == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Exilator Level</td>
                        <td></td>
                        {inspection[0].exilator_level == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        
                        <tr class="">
                        <td>Breaking Senses</td>
                        {inspection[0].breaking_senses == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Steering Controls</td>
                        <td></td>
                        {/* {inspection[0].side_mirror == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>} */}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Transfer Case</td>
                        <td></td>
                        {inspection[0].transfer_case == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        <tr class="">
                        <td>Differential</td>
                        <td></td>
                        {inspection[0].differential == "Good"?
                        <td><span class="tablecheck"><img src={checkmark}></img></span></td> :
                        <td><span class="tablecheckred"><img src={checkmarkred}></img></span></td>}
                        <td></td>
                        </tr>
                        
                        
                        </table>            
                    </div>
                    <div class="commentsblock">
                    <h3>Comments</h3>
                    </div>
                    
                    
                    <div class="commentstextblock">
                    <p>{inspection[0].comments}</p>
                    </div>
                    
                    
                    
                    
                    
                        
                    </div>
                </div>
            </div>
            
            
                </div>
:""}
            </div>
         
            

            <div class="inspectionbottom-back-btn">
                        <a class="back-btn-primary" href="#"><i class="bx bx-chevron-left"></i> Back</a>
            </div>

            
            <section id="playstoreBlock" class="playstoreBlock">
                <div class="container">


                <div class="row content">
                    <div class="col-lg-12">
                    <img src={appstore} ></img>
                    <img src={googleplay} ></img>
                    
                    </div>
                    
                </div>

                </div>
            </section>

            



            </main>

                    }
        </div>
    )
}
export default Inspection;