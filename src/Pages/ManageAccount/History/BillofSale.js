import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import API from '../../../Services/BaseService';

const BillofSale = (props) => {

    const history = useHistory();
    const [BOSList,setBOSList] = useState("");
    const [loading,setLoading] = useState(true);
    const {BillofSale} = props.location.state;

    console.log("BillofSale",BillofSale)

    const [lights,setLights]= useState("");
    const [title,setTitle]= useState("");
    const [mileageRadio,setMielageRadio]= useState("");

    const billofSaleView = () =>{

        let request = {
            bill_of_sale_id : BillofSale
        }


        API.post("billofsaleById/condition",request).then(response=>{
    
            console.log("gatepass_list Details response", response.data?.data)
            setBOSList(response.data?.data[0]);
            // setLights(response.data?.data[0].Lights);
            // setTitle(response.data?.data[0].Title);
            // setMielageRadio(response.data?.data[0].Mileage);

        // //  setLoading(false);
        //     ls.set('billOfSaleCarId', response.data.data[0]?.car_id);
        //     ls.set('billOfSaleSellerDealerId', response.data.data[0]?.seller_dealer_id);
            
        });
    }

    useEffect(()=>{
		
        billofSaleView();

	}, [])

  return (
 
        <div class="container billof-sec">
        <a class="back-btn-paymentform backBtn" onClick={()=>history.push('/history')}><i class="icofont-arrow-left"></i> Back</a>

            <h5>
              View Bill of Sale
            </h5>
            <div className='card-body'>
                 <div className='row'>
      <div className='col-sm-12'>
                                <h4>Bill of Sale info</h4>
                                </div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.bill_of_sale_id} disabled/><label for="Gate_Pass#" class="input-has-value">Bill Of Sale #</label></div></div>
                                <div className='col-sm-12'>
                                <h4>Auto Information</h4>
                                </div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.car_id} disabled/><label for="Gate_Pass#" class="input-has-value"> Inventory #</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.vin_no} disabled/><label for="Gate_Pass#" class="input-has-value">Vin #</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.model} disabled/><label for="Gate_Pass#" class="input-has-value"> Model</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.year} disabled/><label for="Gate_Pass#" class="input-has-value"> Year</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.color} disabled/><label for="Gate_Pass#" class="input-has-value"> Color</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.make} disabled/><label for="Gate_Pass#" class="input-has-value"> Make</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.mileage} disabled/><label for="Gate_Pass#" class="input-has-value"> Mileage</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.body} disabled/><label for="Gate_Pass#" class="input-has-value"> Body</label></div></div>
                                <div className='col-sm-12'>
                                <h4>Seller Information</h4>
                                </div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.seller_dealer_name} disabled/><label for="Gate_Pass#" class="input-has-value">Seller #</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.seller_dealer_name} disabled/><label for="Gate_Pass#" class="input-has-value">Name</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.seller_organisation} disabled/><label for="Gate_Pass#" class="input-has-value">Organization</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.sellerlicense} disabled/><label for="Gate_Pass#" class="input-has-value">License</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.address} disabled/><label for="Gate_Pass#" class="input-has-value">Address</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.seller_state_name} disabled/><label for="Gate_Pass#" class="input-has-value">State</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.seller_city_name} disabled/><label for="Gate_Pass#" class="input-has-value">City</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.seller_zipcode} disabled/><label for="Gate_Pass#" class="input-has-value">Zipcode</label></div></div>
                                <div class="col-md-12 col-lg-12 mb-4 mt-2 flex-wrap d-flex justify-content-start"><button type="button" class="btn btn-dark me-2">Seller notes</button><button type="button" class="btn btn-dark me-2">IF Info</button><button type="button" class="btn btn-dark me-2">Seller Check</button><button type="button" class="btn btn-dark me-2">Enter Title</button><button type="button" class="btn btn-dark me-2">Deliver Check</button><button type="button" class="btn btn-dark me-2">Car Charges</button></div>

                                <div className='col-sm-12'>
                                <h4>Buyer Information</h4>
                                </div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_dealer_name} disabled/><label for="Gate_Pass#" class="input-has-value">Buyer #</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_dealer_name} disabled/><label for="Gate_Pass#" class="input-has-value">Name</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_organisation} disabled/><label for="Gate_Pass#" class="input-has-value">Organization</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyerlicense} disabled/><label for="Gate_Pass#" class="input-has-value">License</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_city_name} disabled/><label for="Gate_Pass#" class="input-has-value">Address</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_state_name} disabled/><label for="Gate_Pass#" class="input-has-value">State</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_city_name} disabled/><label for="Gate_Pass#" class="input-has-value">City</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_zipcode} disabled/><label for="Gate_Pass#" class="input-has-value">Zipcode</label></div></div>

                                <div class="col-md-12 col-lg-12 mb-4 mt-2 flex-wrap d-flex justify-content-start"><button type="button" class="btn btn-dark me-2">Buyer notes</button><button type="button" class="btn btn-dark me-2">Arb</button><button type="button" class="btn btn-dark me-2">PSI</button><button type="button" class="btn btn-dark me-2">Apply Pmt</button><button type="button" class="btn btn-dark me-2">Floor/CC Pmt</button><button type="button" class="btn btn-dark me-2">Gate pass</button><button type="button" class="btn btn-dark me-2">Mail Log</button><button type="button" class="btn btn-dark me-2">Deliver Title</button></div>

                                <div class="mb-2 col-md-6 col-lg-4"><h5 class="text-color">Lights</h5>
                                <div class="radio input-group"><input id="radio-btn1" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {lights == "As is" ? true : false}/><label for="radio-btn1" class="radio-label">As is</label></div>
                                    
                                <div class="radio input-group"><input id="radio-btn2" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {lights == "With Conditions" ? true : false} /><label for="radio-btn2" class="radio-label">With Conditions</label></div>
                                <div class="radio input-group"><input id="radio-btn3" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {lights == "Actuation guarantee" ? true : false} /><label for="radio-btn3" class="radio-label">Actutation guarantee</label></div>
                                    </div>
                                 
                                    <div class="mb-2 col-md-6 col-lg-4"><h5 class="text-color">Title</h5>
                                <div class="radio input-group"><input id="radio-btn4" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {title == "Yes" ? true : false}/><label for="radio-btn4" class="radio-label">Yes</label></div>
                                    
                                <div class="radio input-group"><input id="radio-btn5" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {title == "Delayed (TA)" ? true : false}/><label for="radio-btn5" class="radio-label">Delayed(TA)</label></div>
                                <div class="radio input-group"><input id="radio-btn6" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {title == "No" ? true : false} /><label for="radio-btn6" class="radio-label">No</label></div>
                                    </div>
                                    <div class="mb-2 col-md-6 col-lg-4"><h5 class="text-color">Mileage</h5>
                                <div class="radio input-group"><input id="radio-btn7" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {mileageRadio == "Actual" ? true : false}  /><label for="radio-btn7" class="radio-label">Actual</label></div>
                                    
                                <div class="radio input-group"><input id="radio-btn8" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {mileageRadio == "Over (Exceeds)" ? true : false} /><label for="radio-btn8" class="radio-label">Over(Exceeds)</label></div>
                                <div class="radio input-group"><input id="radio-btn9" name="lowerEngineNoiceRadio" type="radio" value="Any" checked= {mileageRadio == "Unknown (TMU)" ? true : false}/><label for="radio-btn9" class="radio-label">UnKnown(TMU)</label></div>
                                    </div>
                                    <div className='col-sm-12'>
                                <h4>Buyer Fee</h4>
                                </div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.carprice} disabled/><label for="Gate_Pass#" class="input-has-value">Bid Price</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.buyer_fee} disabled/><label for="Gate_Pass#" class="input-has-value">Buyer's Fee</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.document_fee} disabled/><label for="Gate_Pass#" class="input-has-value">Documnet Fee</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.float_fee} disabled/><label for="Gate_Pass#" class="input-has-value">Float Fee</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.title_fee} disabled/><label for="Gate_Pass#" class="input-has-value">Title Fee</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.miscellaneous_fee} disabled/><label for="Gate_Pass#" class="input-has-value">Miscellaneous Fee</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.sale_tax} disabled/><label for="Gate_Pass#" class="input-has-value">Sale Tax</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.county_tax} disabled/><label for="Gate_Pass#" class="input-has-value">Country Tax</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.city_tax} disabled/><label for="Gate_Pass#" class="input-has-value">City Tax</label></div></div>
                                <div class="col-md-6 col-lg-4  form-group"><div class="tbox"><input type="text" class="textbox" placeholder="" value="" defaultValue={BOSList?.total_amt} disabled/><label for="Gate_Pass#" class="input-has-value">Total Amount</label></div></div>
        </div>
            </div>

                 </div>

  )
}

export default BillofSale