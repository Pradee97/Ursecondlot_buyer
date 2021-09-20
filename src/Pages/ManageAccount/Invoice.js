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

    
const InVoice = (props) => {
    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [accountDetails,setaccountDetails] = useState("");
    const [dealerInfo,setDealerInfo] = useState("");
    const [sellerInfo,setSellerInfo] = useState("");
    const [feeDetails, setFeeDetails] = useState("");
    
    const {sellerDealerID,vechileprice,lotFee,billOfSales,gatePassId,Date,Make,Model,Year,transportationCharge,Transportation} = props.location.state;
 console.log("hello",sellerDealerID,vechileprice,lotFee,billOfSales,gatePassId,Date);
    
     function fetchBuyerDetails() {
        setloading(true);
        let request = {
          buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
        };
        const state = API.post('user_profile/condition', request);
        state.then(res => {
          console.log("res", res)
          //setaccountDetails(res.data.data);
          setDealerInfo(res.data.data);
          
        })
          .catch(err => { console.log(err); });
      }
      useEffect (() =>{
        fetchBuyerDetails();
        fetchSellerDetails();
      }, []);
      

      function fetchSellerDetails() {
        setloading(true);
        
        let request = {
         seller_dealer_id : sellerDealerID,
        
        };
        const state = API.post('seller_dealer_profile/condition', request);
        state.then(res => {
          console.log("res==data====>", res.data)
          if( res.data.success){
            //setaccountDetails(res.data.data);
            setSellerInfo(res.data.data);
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
          
        })
            .catch(err => { console.log(err); });
      }
      useEffect(() => {
        fetchBuyerFees();
      }, []);
      
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
      
    return(
        <div> 
           {/*  {loading ? <loading/> : */}
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
               <td class="alignRight"><span>Date </span>{Date?.substring(0,10)}</td>
             </tr>
             <tr>
               <td><span>Gate Pass Code : </span>{gatePassId}</td>
               <td ></td>
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
               <tr><td><span>Address </span>{dealerInfo.address},{dealerInfo.state_name},{dealerInfo.city_name},{dealerInfo.zipcode}</td></tr>	
               <tr><td><span>Contact </span>{dealerInfo.phone_no }</td></tr>	
               <tr><td><span>Email id </span>{dealerInfo.email}</td></tr>		  		  
            
              
                       
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
               <tr><td><span>Name </span>{sellerInfo.dealer_name}</td></tr>
               <tr><td><span>Adresss </span>{sellerInfo.address},{sellerInfo.state_name},{sellerInfo.city_name},{sellerInfo.zipcode}</td></tr>
               <tr><td><span>Contact </span>{sellerInfo.phone_no}</td></tr>
               <tr><td><span>Email id </span>{sellerInfo.email}</td></tr>
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
               <td>Vehicle Price +Lot Fee 
               <p>{Make}({Model}-{Year} model)</p>
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
             
             <tfoot>
             <tr>
             {billOfSales !== null?
                <td>Already paid </td>
               :<td> Amount due from the buyer</td>}
               
               
               {/* <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number(transportationCharge)+0+0}</span></td> */}
               {/* <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number(Transportation == 'yes' ? 300 : 0)+0+0}</span></td> */}
               <td><span>{Number(vechileprice+lotFee)+Number(getFeeDetails())+Number(Transportation == 'yes' ? transportationCharge : 0)+0+0}</span></td>
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
{/* } */}
        </div>
    )
}
export default InVoice;