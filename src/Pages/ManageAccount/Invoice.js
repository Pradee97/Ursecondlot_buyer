import React from 'react';
import speedometer from '../../assets/img/speedometer.svg';
import gasolinePump from '../../assets/img/gasoline-pump.svg'
import appstore from '../../assets/img/appstore.png';
import googleplay from '../../assets/img/googleplay.png';
import Logo_final from '../../assets/img/Logo_final.png';
import { useHistory, useParams } from "react-router-dom";
import API from "../../Services/BaseService";
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from "../../Component/Loading/Loading";
import printJS from 'print-js'
    
const InVoice = (props) => {
    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [accountDetails,setaccountDetails] = useState("");
    const [dealerInfo,setDealerInfo] = useState("");
    const [sellerInfo,setSellerInfo] = useState("");
    const [feeDetails, setFeeDetails] = useState("");
    
    const {sellerDealerID,vechileprice,lotFee,billOfSales,gatePassId,Date,Make,Model,Year,transportationCharge,Transportation,invNo,vinNo,LateFee} = props.location.state;
 console.log("hello",sellerDealerID,vechileprice,lotFee,billOfSales,gatePassId,Date);
    
     function fetchBuyerDetails() {
        
        let request = {
          buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
        };
        const state = API.post('user_profile/condition', request);
        state.then(res => {
          console.log("res", res)
          //setaccountDetails(res.data.data);
          setDealerInfo(res.data.data);
          setLoading(false);
          
        })
          .catch(err => { console.log(err); });
      }
      useEffect (() =>{
        fetchBuyerDetails();
        fetchSellerDetails();
      }, []);
      

      function fetchSellerDetails() {
        
        
        let request = {
         seller_dealer_id : sellerDealerID,
        
        };
        const state = API.post('seller_dealer_profile/condition', request);
        state.then(res => {
          console.log("res==data====>", res.data)
          if( res.data.success){
            //setaccountDetails(res.data.data);
            setSellerInfo(res.data.data);
            setLoading(false);
          }
        })
          .catch(err => { console.log(err); });
      }

      async function fetchBuyerFees() {
        let request = {
            type: "Buyer"
        };
        const state = API.post('fees/condition', request);
        state.then(res => {
            console.log("res", res)
            setFeeDetails(res.data.data);
            setLoading(false);
          
        })
            .catch(err => { console.log(err); });
      }
      useEffect(() => {
        fetchBuyerFees();
      }, []);
      
      const redirecttoCart=() =>{
        history.push({
          pathname: "/Cart",
        })
      }
      const getFeeDetails = () =>{
       
        return feeDetails.length > 0 ? feeDetails
            .filter((data)=> 
           
            {
                const range = data.fee_price.replaceAll('$',"").split("-")
               
                if(range[1]!=="up"){
                   
                    return Number(range[0]) <= Number(vechileprice) && Number(vechileprice)  <= Number(range[1]) 
                }
                else{
                    return Number(range[0]) <= Number(vechileprice) 
                }
      
                } 
                )[0]?.fee || 0
            : 0
      }
      const printPage = () => {
        console.log("print")
        printJS({
          printable:'invoice',
          type: 'html',
          targetStyles: ['*'],
          header: 'InVoice'
        })
      }
    return(
        <div> 
            {loading ? <Loading/> :
        <main id="main" class="inner-page">
   
   <div id="invoice" class="fees">
     <div class="container" >
     <div class="back-btn">
				 <a class="back-btn-primary" onClick={() => history.push("/History")}><i class="bx bx-chevron-left"></i> Back</a> 
			</div>
     <div class="feesblock col-lg-12">
       
        <div class="col-lg-12 invoiceBlock">
        <div class="row header">
                <div class="col-lg-6 header_left"><img src={Logo_final}/></div>
                <div class="col-lg-6 header_right">
                   <p>
                       Fairview Ave, El Monte,US, 91732 <br></br>
                       ursecondLot.com<br></br>
                       142-564-9147
                   </p>
                </div> </div>
       
       
       <div class="section-title">
           <h2>Invoice</h2>
       </div>
        
       <div class="headtable">
           <table>			 
             <tr>
               <td><span>Bill of sale # </span>{billOfSales}</td>
               <td colSpan="2" class="alignRight"><span className="autoWidth pr-1">Date: </span>{Date?.substring(0,10)}</td>
             </tr>
             <tr>
               <td>
                 <span>Year: {Year} </span>
                 </td>
               <td >
                 <span>Make: {Make} </span> 
               </td>
                <td >
                  <span> Model: {Model}</span>

               </td>
             </tr>			  
             <tr>
               <td><span>Gate Pass Code : </span>{gatePassId}</td>
               <td >
                 <span>Inventory Number: {invNo} </span> 
               </td>
                <td >
                  <span> VIN Number: {vinNo}</span>

               </td>
             </tr>			  
           </table>
           
            </div>
            
           <div class="contenttable">
           {dealerInfo?.length>0?dealerInfo
            .map((dealerInfo) =>
           <div>
           <table class="infotable">
             <thead>
               <tr>
                   <th>Buyer Info</th>
               </tr>
             </thead>
             
           
            
               <tr><td><span>Name</span>{dealerInfo.dealer_name}</td></tr>	
               <tr><td><span>Address </span>{dealerInfo.address}</td></tr>	
               <tr><td><span>City </span>{dealerInfo.city_name}</td></tr>	
               <tr><td><span>State </span>{dealerInfo.state_name}</td></tr>	
               <tr><td><span>Zipcode </span>{dealerInfo.zipcode}</td></tr>		  		  
            
              
                       
           </table>
           </div>
            ) :""} 
           <table class="infotable">
             <thead>
               <tr>
                   <th>Seller Info</th>
               </tr>
             </thead>			  
           
             
             {sellerInfo?.length>0?sellerInfo
            .map((sellerInfo) =>
            <>
               <tr><td><span>Name  </span>{sellerInfo.dealer_name}</td></tr>
               <tr><td><span>Address  </span>{sellerInfo.address}</td></tr>
               <tr><td><span>City  </span>{sellerInfo.city_name}</td></tr>
               <tr><td><span>State  </span>{sellerInfo.state_name}</td></tr>
               <tr><td><span>Zipcode  </span>{sellerInfo.zipcode}</td></tr>
                  </>    
                  ) :""}      
           </table>
           
       </div>

       
         <div class="col-lg-12 pt-4 pt-lg-0 feestableBlock">
         <div class="feestable">
            <table>
             <thead>
               <tr>
                   <th>Vehicle Information</th>
                   <th class="priceCol">Price</th>
               </tr>
             </thead>
             <tr>
               <td>Vehicle Price 
               <p>{Year} {Make} {Model} </p>
               </td>
               <td><span>$ {(vechileprice)+lotFee}</span></td>
             </tr>
              <tr>

               <td>Buy Fee</td>
               <td><span>$ {getFeeDetails()}</span></td>
             </tr>
             <tr>
               <td>Transportation</td>
               {/* <td><span>$ {transportationCharge}</span></td> */}
                <td><span>$ {Transportation == 'yes' ? 300 : 0}</span></td>
                 {/* <td><span>$ { 300 || 0}</span></td> */}
             </tr>
             <tr>
               <td>Other Charges</td>
               <td><span>$ 0</span></td>
             </tr>
             <tr>
               <td>Miscellaneous Charges</td>
               <td><span>$ 0</span></td>
             </tr>
             {LateFee == "" || LateFee == null || LateFee == 0?"":
             <tr>
               <td>Late Fee</td>
               <td><span>$ {LateFee}</span></td>
             </tr>
              }
             <tfoot>
             <tr>
             
               <td> Total </td>
               
               
               {/* <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number(transportationCharge)+0+0}</span></td> */}
               {/* <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number(Transportation == 'yes' ? 300 : 0)+0+0}</span></td> */}
               <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number(Transportation == 'yes' ? transportationCharge : 0)+0+0 + Number(LateFee)}</span></td>
               {/* <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number( 300 || 0)+0+0}</span></td> */}
               
             </tr>
             </tfoot>
            
            </table>            
         </div>
        
         </div>
        
      
        </div>
</div>


     </div>
   </div>
  
   <div class="col-md-12 text-center paybtns">
   <a class={`cta-btns-primary ${(billOfSales !== null && billOfSales !== ""  ) && "greenBtn"}`} onClick={()=>{(billOfSales == null ||billOfSales == ""  )&& redirecttoCart()}} > {billOfSales !== null && billOfSales !== "" ? "paid": "pay" } </a> 
   {/* <a class={`cta-btns-primary ${(billOfSales !== null && billOfSales !== ""  ) && "redBtn"}`} onClick={()=>{(billOfSales == null ||billOfSales == ""  )&& redirecttoCart()}} > {billOfSales !== null && billOfSales !== "" ? "print": "" } </a>  */} 
<<<<<<< HEAD
   <button className="printBtn" type ="button" onClick= {printPage}>Print</button>
=======
   <div class="col-lg-12 invoiceBlock">
   <button type ="button" onClick= {printPage}>Print</button>
>>>>>>> d2f24a8f4220ccafbf2c531268cf25b17016640b
   </div>
   </div>
   <section id="playstoreBlock" class="playstoreBlock">
     <div class="container">


       <div class="row content">
         <div class="col-lg-12">
         <img src={appstore.png}/>
          <img src={googleplay} />
          
         </div>
        
       </div>

     </div>
   </section>

        </main>
}
        </div>
    )
}
export default InVoice;