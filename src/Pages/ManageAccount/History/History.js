import React , {  useState, useEffect, useref } from 'react';
import { useHistory} from "react-router-dom";
import ls from 'local-storage';
import API from "../../../Services/BaseService";
import cars01 from '../../../assets/img/cars01.png';
import speedometer from '../../../assets/img/speedometer.svg';
import gasolinePump from '../../../assets/img/gasolinePump.svg';
import appstore from '../../../assets/img/appstore.png';
import googleplay from '../../../assets/img/googleplay.png';
import $ from 'jquery';
import './history.css'
import Loading from"../../../Component/Loading/Loading";
import carcheck from '../../../assets/img/carcheck.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NoEncryptionOutlined } from '@material-ui/icons';
import oops from '../../../assets/img/oops.jpg';
import Barcode from "react-hooks-barcode";
import barcode from '../../../assets/img/barcode.svg';
import car from '../../../assets/img/car.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import printJS from 'print-js'
import Popup from '../../../Component/Popup/Popup';
import LateFee from '../../../Pages/LateFee/LateFee';
import ReactExport from "react-data-export";

 const History = () => {

  const history = useHistory();
  const userDetails=ls.get('userDetails');
  const [historyDetail,setHistoryDetail] = useState();
  const [feeDetails, setFeeDetails] = useState("");
  // const [historySearch,setHistorySearch] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [vinError,setVinError] = useState("");
  const [VINNumber, setVINNumber] = useState("");
  const [order,setOrder] = useState("");
  const [noCars,setNoCars] = useState("");
  const [lotFee, setLotFee] = useState("")
  const [lotValue, setLotValue] = useState("");
  const [historyEdit,setHistoryEdit] = useState(false);
  const [carTransportation,setCarTransportation] = useState("no")
  const [transportationCharge,setTransportationCharge] = useState("");
  const [loading,setLoading] = useState(true);
  const[scheduletodate,setScheduleToDate]=useState(null);
  const[scheduleDate,setScheduleDate]=useState(null);
  const [fromDateError,setFromDateError] = useState("");
  let [loadValue,setLoadValue] = useState(0);
  let [loadValueSearch,setLoadValueSearch] = useState(0);
  let [loadValueOrder,setLoadValueOrder] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [carId, setCarId] = useState({});
  const [inventoryNo, setInventoryNo] = useState({});
  const [gatePass, setGatePass] = useState({});
  const [titleStatus, setTitleStatus] = useState({});
  const [billOfSales, setbillOfSales] = useState({});
 


  const [isOpen, setIsOpen] = useState(false);
  const [mySelectedCarId, setMySelectedCarId] = useState([]);
  const [selectAllCar, setSelectAllCar] = useState(false);
  const [mySelectedCarDetails, setMySelectedCarDetails] = useState([]);

  const [isLateFee, setIsLateFee] = useState(false);
  	const [lateFeeValue, setLateFeeValue] = useState(0);
    const [noCarsSearch,setNoCarsSearch] = useState(0);
    const [totalHistoryCount,setTotalHistoryCount] = useState(0);

    const [historySearchCount,setHistorySearchCount] = useState(false);
    const [searchLoadMore,setSearchLoadMore]=useState(false);

  const [carDetailForExcel,setCarDetailForExcel]=useState([]);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
    }

 
  let paySeparately={};


  const redirecttoInspection=(pathid)=>{
    //   history.push("/Inspection/"+pathid);
    history.push({
      pathname: "/Inspection",
      state: {id:pathid},
      });
    }

    const redirecttoBOS=(bill_of_sale_id)=>{
      //   history.push("/Inspection/"+pathid);
      history.push({
        pathname: "/billofsale",
        state: {BillofSale : bill_of_sale_id },
        });
      }

    const redirecttoInvoice=(car_id,seller_dealer_id,price,lot_fee,bill_of_sale_id,gatepass_id,sold_date,make,model,year,transportation_charge,transportation,inventory_no,vin_no,late_fee, car_payment_date,payment_mode,company_name)=>{
      //   history.push("/Inspection/"+pathid);
      history.push({
        pathname: "/Invoice",
        state: {car_id,sellerDealerID:seller_dealer_id,vechileprice:price,lotFee:lot_fee,billOfSales:bill_of_sale_id,gatePassId:gatepass_id,Date:sold_date,Make:make,Model:model,Year:year,transportationCharge:transportation_charge,Transportation:transportation,invNo:inventory_no,vinNo:vin_no,LateFee:late_fee, BillOfSaleDate:car_payment_date, PaymentMode:payment_mode,CompanyName:company_name}

        });
        console.log ("hi",price,lot_fee,bill_of_sale_id,gatepass_id,sold_date);
      }
    
      const redirecttoCart=() =>{
        history.push({
          pathname: "/Cart",
        })
      }
 
  const historyDetails = () =>{

    if(loadValue==0){
      loadValue=10;
    }
    else{
      loadValue=loadValue+10;
    }
    let request = {
        buyer_dealer_id :userDetails.buyer_dealer_id,
        key:loadValue
    }

    API.post("historyDetails/condition", request).then(response=>{

        console.log("history check the value", response.data.data)
        setHistoryDetail(response.data.data)
        setNoCars(response.data.data.length)
        setLoadValue(response.data.data.length);
        setLoading(false);

        if(response.data.data.length >0){
          // 
          setCarDetailForExcel(response.data.data.map(value=> {
            return {
              vin_no: value.vin_no,
              model:  value.model,
              make:   value.make,
              year:   value.year,
              inventory_no:  value.inventory_no,
                bill_of_sale_id:    value.bill_of_sale_id,
                gatepass_id:    value.gatepass_id,
                title_status_name:     value.title_status_name,
                amount:             (Number(value.price||0)+  Number(value.lot_fee) || 0) + (Number(getFeeDetails(value.price))||0) + 0 +0+0+ (Number(value.transportation_charge || 0)) +  Number(value.late_fee)||0

                                        
            }
          }))
          }
    });

}

useEffect (() =>{
  historyDetails()
}, [scheduletodate,scheduleDate]);

const searchCarDetail = () => {

  if(loadValueSearch==0){
    loadValueSearch=10;
  }
  else{
    loadValueSearch=loadValueSearch+10;
  }

  setVinError("")
  setFromDateError("")

 if(VINNumber.length>0 && VINNumber.length < 6){
   setVinError("VIN number must have last 6 digit")
   return;
 }
 else if(VINNumber.length > 6){
  setVinError("VIN number accept only last 6 digit")
  return;
}
if(scheduletodate){
  if(!scheduleDate){
  setFromDateError("From Date is required")
  return;
  }
}
if(scheduleDate){
  if(!scheduletodate){
  setFromDateError("To Date is required")
  return;
  }
}

      let request={
      buyer_dealer_id: userDetails.buyer_dealer_id,
      make: make,
      model: model,
      year: year,
      vin_no: VINNumber,
      fromdate: scheduleDate==null ? "" : convert(scheduleDate),
      todate:scheduleDate==null? "" : scheduletodate==null?convert(new Date()):convert(scheduletodate),
      key: loadValueSearch

      }
  
        API.post("historySearch/condition", request).then(response=>{

          console.log("history Search", response.data.data)
          setHistoryDetail(response.data.data)
          setNoCarsSearch(response.data.data.length)
          setLoadValueSearch(response.data.data.length);
          setHistorySearchCount(response.data.history_count)
          // setHistorySearch(response.data.data)

          if(response.data.data.length >0){
            // 
            setCarDetailForExcel(response.data.data.map(value=> {
              return {
                vin_no: value.vin_no,
                model:  value.model,
                make:   value.make,
                year:   value.year,
                inventory_no:  value.inventory_no,
                bill_of_sale_id:    value.bill_of_sale_id,
                gatepass_id:    value.gatepass_id,
                title_status_name:     value.title_status_name,
                amount:             (Number(value.price||0)+  Number(value.lot_fee) || 0) + (Number(getFeeDetails(value.price))||0) + 0 +0+0+ (Number(value.transportation_charge || 0)) +  (Number(value.late_fee)||0)
                  
                                        
              }
            }))
            }
        }); 
  
}

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

const handleDateChangeRaw = (e) => {
  e.preventDefault();
  }  
  
// useEffect (()=>{
//     // console.log("id value",id)
//     let intervalId;
//     intervalId = setInterval(() => {
//       historyDetails();
//         }, 30000)
//     return () => clearInterval(intervalId);
//     },[])

  const historyOrder =() =>{

    if(loadValueOrder==0){
      loadValueOrder=10;
    }
    else{
      loadValueOrder=loadValueOrder+10;
    }

      let request={
        buyer_dealer_id: userDetails.buyer_dealer_id,
          order:order,
          key: loadValueOrder

      }
        API.post("historyOrder/condition", request).then(response=>{

        console.log("history Order", response.data.data)
        setHistoryDetail(response.data.data)
        setNoCars(response.data.data.length)
        setLoadValueOrder(response.data.data.length)
        // setHistorySearch(response.data.data)
        });
  }


useEffect (() =>{
  order!=="" && historyOrder()
}, [order]);


async function fetchBuyerFees() {
  let request = {
      type: "Buyer"
  };
  const state = API.post('fees/condition', request);
  state.then(res => {
      console.log("res", res)
      setFeeDetails(res.data.data);
    
  })
      .catch(err => { console.log(err); });
}
useEffect(() => {
  fetchBuyerFees();
}, []);

const getFeeDetails = (maxPrice) =>{
  console.log("----fee---",maxPrice)

 return feeDetails.length > 0 ? feeDetails
   .filter((data)=> 
    
   {
     const range = data.from_price
     const rangeOne = data.to_price

      
     if(rangeOne!=="up"){
        
       return Number(range) <= Number(maxPrice) && Number(maxPrice)  <= Number(rangeOne) 
     }
     else{
       return Number(range) <= Number(maxPrice) 
     }
 
     } 
     )[0]?.fee || 0
   : 0


 }
const selectedCarIdList = (data) => {
        
  let newdata=mySelectedCarId || []
  // newdata.includes(data) ? newdata = newdata.filter(item => item !== data) :newdata.push(data)
  // setMySelectedCarId(newdata)
  if(newdata.includes(data)){
      newdata = newdata.filter(item => item !== data)
      setMySelectedCarId(newdata|| [])
  }
  else{
      // newdata.push(data)             
      newdata=[...newdata,data]
      setMySelectedCarId(newdata)
  }
  // console.log("newdata====",newdata)
  // console.log("mySelectedCarId====",mySelectedCarId)
  setHistoryDetail(historyDetail.map(value=>{
      if(value.car_id == data)
      {
          console.log("====value.isChecked====",value.isChecked)
          value.isChecked = ! value.isChecked
      }
      return value
  } 

  ))
}


function copytoclipboard(e) {

  document.execCommand('copy');
 
  e.target.focus();
  setCopySuccess('Copied!');
};

const HistoryUpdate = (carId,transportationCharge,transportation,divContent,HeaderContent) =>{

  let request = {
      buyer_dealer_id :userDetails.buyer_dealer_id,
      car_id:carId,
      transportation:!transportation ? "no" : transportation,
      transportation_charge: transportationCharge,
      // transportation_charge: carTransportation == 'yes' ?  300 : 0,
  }
  // console.log("transportationCharge====",transportationCharge)
  console.log("request======",request)
  // return
  API.post("editTransportation/update", request).then(response=>{
    setHistoryEdit(false)
    document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox hideContent");
    document.getElementById(HeaderContent).setAttribute("class", "showContent");
  });

}

  const cancelEdit = (divContent, HeaderContent) => {
    setHistoryEdit(false)
    document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox hideContent");
    document.getElementById(HeaderContent).setAttribute("class", "showContent");
  }

    const HistoryEdit = (divContent,HeaderContent) =>{
      console.log("check the car id coming or not in the edit on click",divContent)
      document.getElementById(divContent).setAttribute("class", "col-lg-12 p-0 form-group transCbox customCheckbox showContent");
      document.getElementById(HeaderContent).setAttribute("class", "hideContent");
    }

    const carTransportationupdate = (value, carid) => {
      console.log("carid===", carid)
      console.log("value===", value)
      setHistoryDetail( historyDetail.map(data => {
        if(data.car_id === carid){
          data.transportation = value
          data.transportation_charge= value == 'yes' ? 300 : 0
       }
       return data
     }))

     

      // const mydata = historyDetail.map(data => {
      //   if(data.car_id === carid){
      //      data.transportation = value
      //   }
      //   return data
      // });

      // console.log("mydata===",mydata)

      // historyDetail.filter(data => {
      //   if(data.car_id === carid){
      //     data.transportation = value
      //   }
      // })
      // setCarTransportation()
    }


  

const togglePrint = () => {
  setIsOpen(!isOpen);
  }
  
  const PrintData = (historyDetail) =>{
  
   
      setCarId(historyDetail.car_id);
      setbillOfSales(historyDetail.bill_of_sale_id);
      setYear(historyDetail.year);
      setMake(historyDetail.make);
      setModel(historyDetail.model);
      setVINNumber(historyDetail.vin_no);
      setTitleStatus(historyDetail.title_status_name);
      setInventoryNo(historyDetail.inventory_no);
      setGatePass(historyDetail.gatepass_id);


       
    
    togglePrint();
  }
      const config = {
        background: "#fff",
        displayValue: false,
        marginTop: "10px",
        marginBottom: "10px",
        fontOptions: "italic",
        width: 1,
        heigth: 3
        };

        const printPage = () => {
          console.log("print")
          printJS({
            printable: "pdfPrint",
            type: 'html',
            targetStyles: ['*'],
            header: 'Car Details'
          })
          console.log("reviewAndCheckout=====")
          if(mySelectedCarId.length>0) {
              console.log("mySelectedCarId~~~~~",mySelectedCarId)
              if(historyDetail?.length>0 && historyDetail.filter(item => (mySelectedCarId.includes(item.car_id)) ).length>0){
                  // console.log("mySelectedCarId.length====",historyDetail.filter(item => !(mySelectedCarId.includes(item.car_id)) ).length)
                  setMySelectedCarDetails(historyDetail.filter(item => (mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id}}))
                  // billofsales(historyDetail.filter(item => (mySelectedCarId.includes(item.car_id))).map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge,"year":data.year,"lot_fee":data.lot_fee,"late_fee":data.late_fee,"buyFee":getFeeDetails()}}))
              }
              else {
                  setMySelectedCarDetails([])
                  // billofsales([])
              }
          }
          else {
              setMySelectedCarDetails([])
              // billofsales([])

              // setMySelectedCarDetails(historyDetail?.length>0 ? historyDetail.map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id}}):[])
              // billofsales(historyDetail?.length>0 ? historyDetail.map((data)=>{return{"buyer_dealer_id":userDetails.buyer_dealer_id,"car_id":data.car_id,'total_price':data.price,"payment_mode":paymentMode,"active":userDetails.active,"createdBy":userDetails.buyer_id,"updatedBy":userDetails.buyer_id,"make": data.make, "model": data.model, "image": data.image, "price": data.price,"transportation_charge":data.transportation_charge,"year":data.year,"lot_fee":data.lot_fee,"buyFee":getFeeDetails()}}):[])
          // return historyDetail?.length>0 && historyDetail
          // .reduce((acc, curr) => acc+((Number(curr.max_price) || 0) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.max_price))),0)
          }
      }
      // const selectPayment=(data)=> {
      //     console.log("selectPayment----",data)
      //     setPaymentMode(data)
      // }
  
      // const overAllTotal = () => {
      //     return historyDetail?.length>0 && historyDetail
      //     .reduce((acc, curr) => acc+((Number(curr.price) || 0)+Number(curr.lot_fee) +  Number(curr.transportation === 'yes' ? curr.transportation_charge : 0) + Number(getFeeDetails(curr.price))+ 0 + 0 + Number(curr.late_fee)),0) 
      // }
  
      const isSelectedAllCar = () => {
          if(selectAllCar) //while chnage funtion is triggering state is not updated so using reverse logic 
          {
              setMySelectedCarId([])
              setHistoryDetail(historyDetail.map(data=> {return {...data, isChecked: false}}))
          }else{
              setMySelectedCarId(historyDetail.map(data=>data.car_id))
              setHistoryDetail(historyDetail.map(data=> {return {...data, isChecked: true}}))
          }
  
          setSelectAllCar(!selectAllCar)
      
        }

        const getlateFee=()=>{
          let request={
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
          }
          
          API.post('getlatefee/condition',request).then(res=>{
             if(res.data.data.length){
            
           console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
            const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
            setIsLateFee(lateFeeValueStatus==="yes")
            setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
             }
            
        
          }).catch(err=>{console.log(err);});
        }

        const countDetails = () =>{

          let request = {
              buyer_dealer_id : JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
          }
        
          API.post("countDetails/condition", request).then(response=>{

              console.log(" count details check the value", response.data.data.history_count)
              
              setTotalHistoryCount(response.data.data.history_count)

            
              
          });
        }
      
          useEffect (() =>{
      
          countDetails();
          getlateFee();      
          
          }, []); 
          
          const loadMoreDetails = () =>{

            if(historySearchCount==false){
              historyDetails()
      
            }
            else{
              searchCarDetail()
      
            }
      
            }

            const showDetails = (data, minusBtn, plusButton) =>{
              console.log("showDetails", data)
              document.getElementById(data).setAttribute("class", "showContent");
              document.getElementById(data).removeAttribute("hideContent"); 
              
              document.getElementById(minusBtn).removeAttribute("hideContent"); 
              document.getElementById(minusBtn).setAttribute("class", "bx bx-minus showContent");
              
              document.getElementById(plusButton).removeAttribute("showContent"); 
              document.getElementById(plusButton).setAttribute("class", "bx bx-plus hideContent");
        
              }
              const hideDetails = (data, minusBtn, plusButton) =>{
              console.log("hideDetails", data)
              document.getElementById(data).setAttribute("class", "hideContent");
              document.getElementById(data).removeAttribute("showContent"); 
              
              document.getElementById(minusBtn).removeAttribute("showContent"); 
              document.getElementById( minusBtn).setAttribute("class", "bx bx-minus hideContent");
              
              document.getElementById(plusButton).removeAttribute("hideContent"); 
              document.getElementById( plusButton).setAttribute("class", "bx bx-plus showContent");
              
              }

    return (
      <div>
        {loading?<Loading/>:
      <main id="main" class="inner-page">
   
      <div id="historyPage" class="historyPage">
      <div class="container" >
        <div class="lotfeeblock col-lg-12">
          <div class="section-title downBtns">
            <h2>history
            <div className="downBtn">
            <i class="icofont-file-pdf"></i>
                <button  className=""  type ="button" onClick= {() => printPage()}>Download</button>
            </div>
            
            <div class="downloadBtn">
              <div class="downBtn">
              <i class="icofont-file-excel"></i>
             <ExcelFile>
                <ExcelSheet data={carDetailForExcel} name="URCar">
                    <ExcelColumn label="Year" value="year"/>
                    <ExcelColumn label="Model" value="model"/>
                    <ExcelColumn label="Make" value="make"/>
                    <ExcelColumn label="VIN #" value="vin_no"/>
                    <ExcelColumn label="INV #" value="inventory_no"/>
                    <ExcelColumn label="BOS #" value="bill_of_sale_id"/>     
                    <ExcelColumn label="GP #" value="gatepass_id"/>
                    <ExcelColumn label="TS #" value="title_status_name"/>
                    <ExcelColumn label="Amount $" value="amount"/>
                </ExcelSheet>
            </ExcelFile>
            </div>
            </div> 
            <div class="hisHead"> <p>{noCars} of {totalHistoryCount} Vehicles Purchased</p></div>
            </h2>
           
                 
           
          </div>
         
          <div class="row">
            
          <div class="searchlistform col-lg-12">
                <div class="searchblock">
                       <div class="form-group">
                           <label class="control-label" for="location">Year</label> 
                           <input class="form-control border-end-0" type="text"  id="location" placeholder="Enter Car Year"
                           onChange={(e) => setYear(e.target.value)}/>
                       </div>

                       <div class="form-group">
                           <label class="control-label" for="dealername">Make</label> 
                           <input class="form-control border-end-0" type="text"  id="dealername" placeholder="Enter Car Make"
                           onChange={(e) => setMake(e.target.value)}/>
                       </div>

                       <div class="form-group">
                           <label class="control-label" for="dealername">Model</label> 
                           <input class="form-control border-end-0" type="text"  id="dealername" placeholder="Enter Car Model"
                           onChange={(e) => setModel(e.target.value)}/>
                       </div>

                       <div class="form-group ">
                           <label class="control-label" for="date">VIN #</label> 
                           <input class="form-control border-end-0 " type="text"  id="date" placeholder="Enter Last 6 Digit"
                           onChange={(e) => setVINNumber(e.target.value)}/>
                        
                        </div>

                        <div className="form-group dateBlock">
                                        <label className="control-label" for="date">From Date</label> 
                                        {/* <input className="form-control border-end-0 " type="date" value={scheduleDate}  id="date" onKeyDown={onKeydowninSearch} placeholder="DD-MM-YYYY" onChange={(e) => setScheduleDate(e.target.value)}></input> */}
                                        <DatePicker
                                                        className="form-control textbox" name="date" id="date"
                                                        autoComplete="off"
                                                        selected={scheduleDate}
                                                        onChange={(date) => setScheduleDate(date)}
                                                        isClearable
                                                        placeholderText="Date"
                                                        required
                                                        onChangeRaw={handleDateChangeRaw}
                                                    />
                                   
                                    </div>

                                    <div className="form-group dateBlock">
                                        <label title=" Select From date first to proceed !" className="control-label" for="todate">To Date</label> 
                                        {scheduleDate!=""?
                                        // <input className="form-control border-end-0 " type="date"  id="todate" onKeyDown={onKeydowninSearch} placeholder="DD-MM-YYYY" value={scheduletodate} onChange={(e) => setScheduleToDate(e.target.value)}></input>
                                        <DatePicker
                                                        className="form-control textbox" name="todate" id="todate"
                                                        selected={scheduletodate}
                                                        onChange={(date) => setScheduleToDate(date)}
                                                        isClearable
                                                        placeholderText="Date"
                                                        required
                                                        onChangeRaw={handleDateChangeRaw}
                                                    />:
                                                    <DatePicker
                                                    className="form-control textbox" disabled name="todate" id="todate"
                                                    selected={scheduletodate}
                                                    onChange={(date) => setScheduleToDate(date)}
                                                    isClearable
                                                    placeholderText="Date"
                                                    // disabled="true"
                                                    required
                                                    onChangeRaw={handleDateChangeRaw}
                                                />}
                                    </div>

                        <div class=" form-group searchbtn">
                          <button  onClick={searchCarDetail}><i class="bx bx-search"></i></button> 
                        </div>

                       <div class="errorMsgBox col-lg-12">
                         <p className="form-input-error" >{vinError}</p> 
                         <p className="form-input-error" >{fromDateError}</p>                     
                      </div>
                    </div>
                   
                    </div>

                    </div>
                    {/* <button  className="printBtn"  type ="button" onClick= {printPage}>Download</button> */}
                  
                  <div class="hisHead">
                  {noCarsSearch >0?
                  <p>{noCarsSearch} of {historySearchCount} Vehicles Found</p>: 
                   ""}
                    {/* <div class="row">				
                            <div class="vehiclepaycheckbox col-lg-12 mt-4">
                                <div class="form-group input-group pb-0 mb-0 pull-right cbox">
                                    <input 
                                        type="checkbox" 
                                        id="selectAll" 
                                        checked= {selectAllCar}
                                        onChange={(e)=>{isSelectedAllCar()}}/><label for="selectAll">Select All / Unselect All to download for all cars</label>
                                </div>
                            </div>
                        </div> */}

                        

                    <div class="sortBy">
                        <div class="col-sm-12 form-group mr-0 pr-0">  
                          <div class="tbox">			
                          <select id="" class="form-control box"  onChange={(e) => setOrder(e.target.value)}>
                          <option disabled  value="">select</option>
                            <option value="USA">Sort By</option>
                            <option value="USA">Sold Date</option>
                            <option value="USA">ACH Date</option>
                            <option value="USA">Title Status</option>
                            <option value="USA">Gate Pass Code</option>
                            {/* <option value="USA">By Year</option>
                            <option value="USA">Make</option>
                            <option value="USA">Model</option> */}
                          </select>				
                          </div> 
                        </div>
                    </div>
                  </div>
                  
                  
            {historyDetail?.length>0? historyDetail.sort((b,a)=>b.historyDetail?.sold_date-a.historyDetail?.sold_date)
            .map((historyDetail,index) =>{
                        paySeparately={[index] : 'no'} 
              // setCarTransportation(historyDetail.transportation)
              return   <div class="toggleList"> <div class="lotfee-inner col-lg-12">

              <div class="row">							
                               <div class="col-lg-12">	
                              			
                                   <div class="car-item">
                                       
									   <div class="pickupdetailcontent"  >
									   <p class="billsalesno invNo"><span className="label">Inventory # :</span> {historyDetail.inventory_no}</p>
                                        <p class="billsalesno model"><span className="label">Year Make Model :</span>{historyDetail.year} {historyDetail.make} {historyDetail.model}</p>
                                        <p class="billsalesno vinNo"><span className="label">Vin # :</span>  {historyDetail.vin_no}</p>
                                          <p class="billsalesno billOf"><span className="label">Bill Of sale # : </span> {historyDetail.bill_of_sale_code}</p>
										                      <p class="billsalesno  netAmt"><span className="label">Gate Pass Code : </span>{historyDetail.gatepass_id}</p>
                                          <p class="billsalesno netAmt"><span className="label">Total Amount : $</span> {(Number(historyDetail.price)+  Number(historyDetail.lot_fee) || 0) + (Number(getFeeDetails(historyDetail.price))) + 0 +0+0+ (Number(historyDetail.transportation_charge || 0)) +  Number(historyDetail.late_fee)}</p>
                                          <p class="billsalesno soldDate"><span className="label">Date of Purchase :</span>  {historyDetail.sold_date}</p>                                      
                                       </div>			
                                     </div>
                               </div>
                               <div class="text-right toggleIcon plus">	
                               <i id = {`plusButton${index}`}  className='bx bx-plus showContent' onClick={()=>showDetails(`showDetails${index}`, `minusButton${index}`, `plusButton${index}`)}></i>
                          
                               <i id = {`minusButton${index}`}  className="bx bx-minus hideContent " onClick={()=>hideDetails(`showDetails${index}`, `minusButton${index}`, `plusButton${index}`)}></i>
                               </div>
                                   
                           </div> 

					<div id = {`showDetails${index}`} className = "hideContent" > 

          <div class="lotfee-inner col-lg-12 toggleExpand">
                <div class="row">							
                  <div class="col-lg-4">
                    <div class="car-item">
                    <div class="cars-prices pickupdetailcontent" >
                      <a class="cta-btns-primary" onClick={ () => {
                                history.push({pathname: "/billofsale", state: {backURL: "/history", BillofSale: historyDetail.bill_of_sale_id}});
                                
                            }}>Bill Of sale #{historyDetail.bill_of_sale_id}</a>
                    </div>
                      <div className="historyImg">
                        <img src={historyDetail.car_image} class="carImg" alt="..."/>
                        </div>
                        <div class="cars-tag">
                        <h4>{historyDetail.deal_name}</h4>
                        </div>
                        
                        <div class="cars-content">		
                        <h3><a href="#"> {historyDetail.year} {historyDetail.make} {historyDetail.model}</a></h3>
                      
                        <div class="d-flex align-items-center mb-3">
                          <p class="details"><img src={speedometer}  alt=""/><span>{historyDetail.miles} m</span></p>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <p class="details"><img src={gasolinePump} alt=""/><span>{historyDetail.fuel_type}</span></p>
                        </div>
                        
                        
                        
                        <div class="cars-prices invoice_link p-0">
                          {/* <div className="vinnoBlock"><p class="vinno" href="JavaScript:void(0)" >Vin no - <span>{historyDetail.vin_no}</span></p></div> */}
                          <div class="row" id = "Vin">
						
	        				<div class="col-md-12 carpoints">
								<div className="label">VIN #</div>		  
								<div class="carpoint">
								
									<img src={car}  alt=""/>
									<span>{historyDetail.vin_no}</span>
									<CopyToClipboard text={historyDetail.vin_no} onCopy={() => setCopied(true)} >
									<span  title="Copy" onClick={copytoclipboard} className="copyImg"><i class="icofont-copy"></i></span>
									</CopyToClipboard>
									
									{/* <img src={book} onClick={copytoclipboard} alt=""/>  */}
									{/* <span className="barCodeIcon"><img src={barcode} alt=""  onMouseEnter={() => setIsShown(true)}  onMouseLeave={() => setIsShown(false)}/> </span> */}
										<div id = {`imgBarCode${index}`} className= "carcodeIcon showContent" >
                  
                  <img  src={barcode} alt=""  onMouseEnter={() =>document.getElementById(  `showBarCodeDetails${index}` ).setAttribute("class", "showContent")} onMouseLeave={() => document.getElementById(  `showBarCodeDetails${index}` ).setAttribute("class", "hideContent")}/> 
									
									</div>

									{/* <img ComponentToPrint={inputRef}  alt=""/> */}
								</div>

								{/* {isShown && (
										<div class="barCodeDiv">
										<Barcode value={historyDetail.vin_no} {...config} />
										</div>
									)} */}
                  {/* {isShown && ( */}
						<div id = {`showBarCodeDetails${index}`} className= "hideContent" >
							<Barcode value={historyDetail.vin_no} {...config} />
						</div>
					{/* )} */}
								
								{/* {copied ? <p>Copied !</p> : ""} */}
							</div>
              </div>
                          <button class="cta-btns" href="JavaScript:void(0)" onClick={()=>redirecttoInspection(historyDetail.car_id)}>Inspection</button>
                          <span className="autoCheck"><img src={carcheck} alt=""/></span>
                          <a class="cta-btns invoice" href="JavaScript:void(0)" onClick={()=>redirecttoInvoice(historyDetail.car_id,historyDetail.seller_dealer_id,historyDetail.price,historyDetail.lot_fee,historyDetail.bill_of_sale_id,historyDetail.gatepass_id,historyDetail.sold_date,historyDetail.make,historyDetail.model,historyDetail.year,historyDetail.transportation_charge,historyDetail.transportation,historyDetail.inventory_no,historyDetail.vin_no,historyDetail.late_fee,historyDetail. car_payment_date,historyDetail.payment_mode,historyDetail.company_name)}>Invoice</a>
                        </div>
                        <div class="cars-prices gatepass pt-1">
                        {historyDetail.gatepass_id===""?
                          <a class="cta-btns-primary" href="#">Gate Pass Code </a>:
                          <a class="cta-btns-primary" href="#">Gate Pass Code : {historyDetail.gatepass_id} </a>}
                        </div>
                        </div>
                      </div>
                    
                    
                  </div>
                  <div class="col-lg-4 sliderBlock">
                    <div className="tophead">
                    <p>Inventory # - <span>{historyDetail.inventory_no}</span></p>
                    
                    {/* <div class="customCheckbox cbox">
                                        <input className={"paySeparately"+index}  value={paySeparately[index]=='no'? "yes":"no"} type="checkbox" id={"vehiclepayseparat"+index} checked = {paySeparately[index] =='yes'?true:false} onChange={(e)=>{paySeparately[index]='yes'}}/><label for={"vehiclepayseparat"+index}>You Want To Pay Separately{paySeparately[index]}</label>
                                        <input 
                                        className={"paySeparately"+index}  
                                        value={index} 
                                        type="checkbox" 
                                        id={"vehiclepayseparat"+index} 
                                        checked= {historyDetail.isChecked}
                                        onChange={(e)=>{selectedCarIdList(historyDetail.car_id)}}/><label for={"vehiclepayseparat"+index}>Select to download</label>

                                    </div> */}
                                    </div>

                    <h3>Vehicle Title</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li className={historyDetail.title_status ==1 ? "active" : ""}><p>{historyDetail.title_date1?.substring(0,10)}</p> <p>Title with Seller</p></li>
                      <li className={historyDetail.title_status ==2 ? "active" : ""}><p>{historyDetail.title_date2?.substring(0,10)}</p> <p>Title with UrSecond Lot</p></li>
                      {historyDetail.title_status !==3?
                      <li className={historyDetail.title_status ==3 ? "active" : ""}><p>{historyDetail.estimate_title_date?.substring(0,10)}</p> <p>Title with Buyer</p></li>:
                      <li className={historyDetail.title_status ==3 ? "active" : ""}><p>{historyDetail.title_date3?.substring(0,10)}</p> <p>Title with Buyer</p></li>}
                      </ul>
                      
                      
                    </form>
                    
                    <h3>Transportation</h3>
                    
                    <form id="msform">
                    
                      <ul id="progressbar">
                      <li className={historyDetail.transportation_status ==1 ? "active" : ""}><p>{historyDetail.transport_date1?.substring(0,10)}</p> <p>Car with seller</p></li>
                      <li className={historyDetail.transportation_status ==2 ? "active" : ""}><p>{historyDetail.transpor_date2?.substring(0,10)}</p> <p>In Transit</p></li>
                      {historyDetail.transportation_status !==3?
                      <li className={historyDetail.transportation_status ==3 ? "active" : ""}><p>{historyDetail.estimate_transpor_date?.substring(0,10)}</p> <p>Delivered</p></li>:
                      <li className={historyDetail.transportation_status ==3 ? "active" : ""}><p>{historyDetail.transpor_date3?.substring(0,10)}</p> <p>Delivered</p></li>}
                      </ul>
                      
                      
                    </form>
                    
                      <h3>Title status - <span> {historyDetail.title_status_name}</span></h3>
                      <h6 className="mfdealer">Message from Dealer - <span> {historyDetail.dealer_message}</span></h6>
                    
                    {/* <div class="cars-prices ">
                      <a class="cta-btns" href="#">Price - $ {historyDetail.price}</a>
                    </div> */}
                    
                    
                  </div>		
  
  
                  
                  <div class="col-lg-4 priceBlock">
                    <p className="pdate">Purchased from: <span className="redText">{historyDetail.dealer_type}</span></p>
                    <p class="date ml-0"><span className="datelabel">Date Of Purchase: </span>  <span className="redText">{historyDetail.sold_date}</span></p>
                    
                    <div class="vehicleimgright col-lg-12">
                      <p class="editbtn m-0"><a class="" href="JavaScript:void(0)" onClick={()=>HistoryEdit(`transporationDiv${historyDetail.car_id}`,`transporationHeader${historyDetail.car_id}`)}>{historyDetail.bill_of_sale_id !== null && historyDetail.bill_of_sale_id !== "" ? "": "Edit Transportation" }</a></p>
                      <h3>Vehicle Price  <span>$ {Number(historyDetail.price)+ Number(historyDetail.lot_fee)}</span></h3>
                      <h4> Buy Fee <span> $ {Number(getFeeDetails(historyDetail.price))}</span></h4>
                      <h4>Inspection <span>$ 0</span></h4>
                      <h4>Other Charges <span>$ 0</span></h4>
                      <h4>Miscellaneous Charges <span>$ 0</span></h4>
                      {historyDetail.late_fee =="" || historyDetail.late_fee ==null ||  historyDetail.late_fee ==0 ? "":
                      <h4 className="lateFee">Late Fee  <span> $ {Number(historyDetail.late_fee)}</span> <div class="tool_tip"><i class='bx bxs-info-circle '></i> <span class="tooltiptext tooltip-top"><div className="oops">
									
                      <img src={oops}  alt=""/>
                    Ooops! Sorry, We have to add late fee becuase the payment is not made with in 4 days
                    </div></span></div></h4>}
                      {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p> */}
                      
                      <div className="col-lg-12 form-group transCbox customCheckbox hideContent p-0" id={`transporationDiv${historyDetail.car_id}`} >
                            <input type="checkbox" className="form-check d-inline" 
                              id = {`transporation${historyDetail.car_id}`} 
                              // id = 'transporation' 
                              value = {historyDetail?.transportation == 'yes' ? 'no' : 'yes'} 
                              checked = { historyDetail.transportation==="yes" ? true : false } 
                              onChange = {(e)=>{carTransportationupdate(e.target.value, historyDetail.car_id)}} 
                            />
                            <label htmlFor={`transporation${historyDetail.car_id}`}  className="form-check-label" >Transportation</label>
                            {/* <input type="checkbox" className="form-check d-inline" id="transporation" value={historyDetail.transportation == 'yes' ? 'no' : 'yes'} checked={historyDetail.transportation==="yes" ?true:false} onChange={(e)=>{setCarTransportation(e.target.value)}}/> 
                            <label htmlFor='transporation' className="form-check-label" >Transportation  </label>    */}
                           
                            <div className="rprice">
                                <span>${historyDetail.transportation_charge || 0} </span>  
                                {/* <span>${300 || 0} </span>                             */}
                            </div>
                              <div className="totalActions">
                              <button onClick={()=>HistoryUpdate(historyDetail.car_id, historyDetail.transportation_charge, historyDetail.transportation, `transporationDiv${historyDetail.car_id}`, `transporationHeader${historyDetail.car_id}`)}>Update</button>  
                              <button onClick={()=>cancelEdit(`transporationDiv${historyDetail.car_id}`,`transporationHeader${historyDetail.car_id}`)}>Cancel</button>    
                              </div>
                                                  
                      </div>
                      {/* <h4 className='showContent' id={`transporationHeader${historyDetail.car_id}`}>Transportation <span>$ {300 || 0}</span></h4> */}
                      <h4 className='showContent' id={`transporationHeader${historyDetail.car_id}`}>Transportation <span>$ {historyDetail.transportation_charge || 0}</span></h4>
             

                      

                      {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p> */}
                      
                      <div class="vehiclerighttotal">
                      <h3>Total amount <span>$ {(Number(historyDetail.price)+  Number(historyDetail.lot_fee) || 0) + (Number(getFeeDetails(historyDetail.price))) + 0 +0+0+ (Number(historyDetail.transportation_charge || 0)) +  Number(historyDetail.late_fee)}</span></h3>
                        {/* <h3>Total amount <span>$ {(Number(historyDetail.price)+  Number(historyDetail.lot_fee) || 0) + (Number(getFeeDetails(historyDetail.price))) + 0 + (Number(300|| 0))}</span></h3> */}
                      </div>
                    </div>
                    <div class="col-md-12 text-center paybtns">
                    <a class={`cta-btns-primary ${(historyDetail.bill_of_sale_id !== null && historyDetail.bill_of_sale_id !== ""  ) && "greenBtn"}`} onClick={()=>{(historyDetail.bill_of_sale_id == null || historyDetail.bill_of_sale_id == ""  )&& redirecttoCart()}}  >{historyDetail.bill_of_sale_id !== null && historyDetail.bill_of_sale_id !== "" ? "paid": "pay" }  </a>   
                    
                    {/* <button  className="printBtn"  type ="button" onClick= {() => printPage(`Printpage${index}`)}>Download</button> */}
                     {/* <div> 
                   
                    <div class = " hideContent" >
                    <div id = {`Printpage${index}`} style ={{"border-collapse": "collapse"}}>
                      

                            <table   >
                                    <thead>
                                      <tr>
                                        <td><b>Year</b> </td>
                                        <td><b>Make </b></td>
                                        <td><b>Model </b></td>
                                        <td><b>Vin # </b></td>
                                        <td><b>Inventory #</b> </td>
                                        <td><b>GPS # </b></td>
                                        <td><b>BOS # </b></td>
                                        <td><b>Title status</b> </td>
                                        <td><b>Amount</b> </td>

                                        </tr>
                                        </thead>

                                
                                        <tr>
                                        <td>{historyDetail.year}</td>
                                        <td>{historyDetail.make}</td>
                                        <td>{historyDetail.model}</td>
                                        <td>{historyDetail.vin_no}</td>
                                        <td>{historyDetail.inventory_no}</td>
                                        <td>{historyDetail.bill_of_sale_id}</td>
                                        <td>{historyDetail.gatepass_id}</td>
                                        <td>{historyDetail.title_status_name}</td>
                                        <td>{(Number(historyDetail.price)+  Number(historyDetail.lot_fee) || 0) + (Number(getFeeDetails(historyDetail.price))) + 0 +0+0+ (Number(historyDetail.transportation_charge || 0)) +  Number(historyDetail.late_fee)}</td>
                                      </tr>
                                    
                                  </table>
                                  </div>
                                    </div>

                                    </div>  */}

                                            <div>
                                    </div>
                                    </div>
                              </div>                        </div></div>
                </div>
              </div></div>})
                    :""}       
                     
          {historyDetail.length>=10?historyDetail.slice(0,1).map(()=>
          <div><a class={historyDetail.length !== totalHistoryCount && noCarsSearch !== historySearchCount ?"load-more-btn":""} onClick= {loadMoreDetails}>{historyDetail.length !== totalHistoryCount && noCarsSearch !== historySearchCount ?"Load More":""}</a></div>
          ):""} 
        </div>
      </div>
     
      </div>
  
     
      {/* {isOpen && <Popup
                            isClose={false}
                            content={<>
                                <ComponentToPrint toggle={togglePrint} CarId= {carId} BillOfSale= {billOfSales} Year= {year} Make= {make} Model ={model} vinNo= {VINNumber} InvNo= {inventoryNo} GatePass= {gatePass} TitleStatus= {titleStatus}  />
                                
                            </>}
                            handleClose={togglePrint}
                        />} */}

     
      <section id="playstoreBlock" class="playstoreBlock">
        <div class="container">
  
  
          <div class="row content">
            <div class="col-lg-12">
            <img src={appstore} />
			      <img src={googleplay} />
         
            </div>
           
          </div>
  
        </div>
      </section>
  
      {isLateFee && <Popup
                isClose={false}
                content={<>
                    <LateFee toggle={toggleLateFee} />
                </>}
                handleClose={toggleLateFee}
            />}
  
   
  
    </main>
 }
 
 <div> 
                   
                   <div class = "hideContent" >
                   <div id = "pdfPrint" style ={{"border-collapse": "collapse"}}>
                     
                   
                           <table   >
                             
                                   <thead>
                                   {historyDetail?.length>0?historyDetail.slice(0,1).map((historyDetail)=>
                                     <tr>
                                       <td><b>Year</b> </td>
                                       <td><b>Make </b></td>
                                       <td><b>Model </b></td>
                                       <td><b>Vin # </b></td>
                                       <td><b>Inventory #</b> </td>
                                       <td><b>Bos # </b></td>
                                       <td><b>Gps# </b></td>
                                       {historyDetail.title_status_name == "Title with Buyer" ?  <td><b>T</b> </td>:
                                       <td><b>TA</b> </td>}
                                       <td><b>Amount $</b> </td>

                                       </tr>)
                                       :""}
                                       </thead>
                                      
                                       {historyDetail?.length>0?historyDetail.map((historyDetail)=>
                                       <tr>
                                       
                                        <td>{historyDetail.year}</td>
                                        <td>{historyDetail.make}</td>
                                        <td>{historyDetail.model}</td>
                                        <td>{historyDetail.vin_no}</td>
                                        <td>{historyDetail.inventory_no}</td>
                                        <td>{historyDetail.bill_of_sale_id}</td>
                                        <td>{historyDetail.gatepass_id}</td>
                                        <td>{historyDetail.title_status_name}</td>
                                        <td>{(Number(historyDetail.price||0)+  Number(historyDetail.lot_fee) || 0) + (Number(getFeeDetails(historyDetail.price))||0) + 0 +0+0+ (Number(historyDetail.transportation_charge || 0)) +  Number(historyDetail.late_fee)||0}</td> 
                                      </tr>):""}

                                    
                                   
                                 </table>
                                 <div>
                                 <h3>  * T- Title Delivered, TA- Title Absent, GP- Gate Pass, BOS- Bill Of Sale </h3>
                                 </div>
                                 </div>
                                   </div>

                                   </div> 
    </div>
    )
}

export default History;