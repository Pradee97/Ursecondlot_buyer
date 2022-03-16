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
            setLights(response.data?.data[0].Lights);
            setTitle(response.data?.data[0].Title);
            setMielageRadio(response.data?.data[0].Mileage);

        // //  setLoading(false);
        //     ls.set('billOfSaleCarId', response.data.data[0]?.car_id);
        //     ls.set('billOfSaleSellerDealerId', response.data.data[0]?.seller_dealer_id);
            
        });
    }

    useEffect(()=>{
		
        billofSaleView();

	}, [])

  return (
  <div class="page-wrapper emp-sec">
        <div class="container-fluid">
            <h4><a onClick={()=>history.goBack()} class="btn btn-outline-primary"><i
                        class="fas fa-chevron-left me-2"></i>Back</a>
                <span>View Bill of Sale</span>
            </h4>
            <div class="col-lg-12 col-xlg-12 col-md-12">
                <form>
                    <div class="card custom-card">
                        <div class="card-body">
                            <div class="row">
                                <h5 class="text-color mb-4">Bill of Sale info</h5>
                              
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="BillofSale#" class="form-label">Gate Pass ID</label>
                                    <input type="text" class="form-control" id="BillofSale#" defaultValue={BOSList?.gatepass_id} disabled/>
                                </div>
                                <h5 class="text-color mb-4 mt-4">Auto Information</h5>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Inventory#" class="form-label">Inventory #</label>
                                    <input type="number" class="form-control" id="Inventory#"defaultValue={BOSList?.car_id} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="vin" class="form-label">Vin #</label>
                                    <div class="input-group">
                                        <input type="search" class="form-control rounded-1"
                                            aria-label="Recipient's username" aria-describedby="button-addon2" defaultValue={BOSList?.vin_no} disabled/>
                                        {/* <button class="btn btn-outline-secondary rounded-1 ms-2" type="button"
                                            id="button-addon2"><i class="fas fa-search"></i></button> */}
                                    </div>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Model" class="form-label">Model</label>
                                    <input type="text" class="form-control" id="Model" defaultValue={BOSList?.model} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Year" class="form-label">Year</label>
                                    <input type="text" class="form-control" id="Year" defaultValue={BOSList?.year} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Color" class="form-label">Color</label>
                                    <input type="text" class="form-control" id="Color" defaultValue={BOSList?.color} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Make" class="form-label">Make</label>
                                    <input type="text" class="form-control" id="Make" defaultValue={BOSList?.make} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Mileage" class="form-label">Mileage</label>
                                    <input type="text" class="form-control" id="Mileage" defaultValue={BOSList?.mileage} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Body" class="form-label">Body</label>
                                    <input type="text" class="form-control" id="Body" defaultValue={BOSList?.body} disabled/>
                                </div>
                                <h5 class="text-color mb-4 mt-4">Seller Information</h5>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="seller" class="form-label">Seller#</label>
                                    <div class="input-group">
                                        <input type="search" id="seller" class="form-control rounded-1"
                                            aria-label="Recipient's username" aria-describedby="button-addon2" defaultValue={BOSList?.seller_dealer_name} disabled/>
                                        {/* <button class="btn btn-outline-secondary rounded-1 ms-2" type="button"
                                            id="button-addon2">Seller#</button> */}
                                    </div>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="Name" defaultValue={BOSList?.seller_dealer_name} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="organization" class="form-label">Organization</label>
                                    <input type="text" class="form-control" id="organization" defaultValue={BOSList?.seller_organisation} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="License#" class="form-label">License#</label>
                                    <input type="text" class="form-control" id="License#" defaultValue={BOSList?.sellerlicense} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="address" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="address" defaultValue={BOSList?.address} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="state" class="form-label">State</label>
                                    <input type="text" class="form-control" id="state" defaultValue={BOSList?.seller_state_name} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="city" class="form-label">City</label>
                                    <input type="text" class="form-control" id="city" defaultValue={BOSList?.seller_city_name} disabled/>
                                </div>

                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="zip" class="form-label">zip code</label>
                                    <input type="number" class="form-control" id="zip" defaultValue={BOSList?.seller_zipcode} disabled/>
                                </div>

                               
                                <div class="col-md-12 col-lg-12 mb-3 mt-3 text-start">
                                    <button type="button" class="btn btn-dark me-2" onClick={()=>history.push('/SellerNote')}>Seller notes</button>
                                    <button type="button" class="btn btn-dark me-2">IF Info</button>
                                    <button type="button" class="btn btn-dark me-2">Seller Check</button>
                                    <button type="button" class="btn btn-dark me-2">Enter Title</button>
                                    <button type="button" class="btn btn-dark me-2">Deliver Check</button>
                                    <button type="button" class="btn btn-dark me-2">Car Charges</button>
                                </div>

                                <h5 class="text-color mb-4 mt-4">Buyer Information</h5>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Buyer#" class="form-label">Buyer#</label>
                                    <div class="input-group">
                                        <input type="search" id="Buyer#" class="form-control rounded-1"
                                            aria-label="Recipient's username" aria-describedby="button-addon2" defaultValue={BOSList?.buyer_dealer_name} disabled/>
                                        {/* <button class="btn btn-outline-secondary rounded-1 ms-2" type="button"
                                            id="button-addon2">Buyer#</button> */}
                                    </div>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Name1" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="Name1" defaultValue={BOSList?.buyer_dealer_name} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="organization1" class="form-label">Organization</label>
                                    <input type="text" class="form-control" id="organization1" defaultValue={BOSList?.buyer_organisation} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="License#1" class="form-label">License#</label>
                                    <input type="text" class="form-control" id="License#1" defaultValue={BOSList?.buyerlicense} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="address1" class="form-label">Address</label>
                                    <input type="text" class="form-control" id="address1" defaultValue={BOSList?.buyer_city_name} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="state1" class="form-label">State</label>
                                    <input type="text" class="form-control" id="state1" defaultValue={BOSList?.buyer_state_name} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="city1" class="form-label">City</label>
                                    <input type="text" class="form-control" id="city1" defaultValue={BOSList?.buyer_city_name} disabled/>
                                </div>

                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="zip1" class="form-label">zip code</label>
                                    <input type="number" class="form-control" id="zip1" defaultValue={BOSList?.buyer_zipcode} disabled/>
                                </div>

                               
                                <div class="col-md-12 col-lg-12 mb-3 mt-3 text-start">
                                    <button type="button" class="btn btn-dark me-2">Buyer notes</button>
                                    <button type="button" class="btn btn-dark me-2">Arb</button>
                                    <button type="button" class="btn btn-dark me-2">PSI</button>
                                    <button type="button" class="btn btn-dark me-2">Apply Pmt</button>
                                    <button type="button" class="btn btn-dark me-2">Floor/CC Pmt</button>
                                    <button type="button" class="btn btn-dark me-2">Gate pass</button>
                                    <button type="button" class="btn btn-dark me-2">Mail Log</button>
                                    <button type="button" class="btn btn-dark me-2">Deliver Title</button>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4" >
                                    <h5 class="text-color mb-4 mt-4">Lights</h5>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"  value="As is" checked= {lights == "As is" ? true : false} 
                                            id="As"/>
                                        <label class="form-check-label ms-2 text-color1" for="As">
                                            As is
                                        </label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"  value="With Conditions" checked= {lights == "With Conditions" ? true : false} 
                                            id="Conditions"/>
                                        <label class="form-check-label ms-2 text-color1" for="Conditions">
                                            With Conditions</label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="flexRadioDefault"  value="Actuation guarantee" checked= {lights == "Actuation guarantee" ? true : false} 
                                            id="Actuation"/>
                                        <label class="form-check-label ms-2 text-color1" for="Actuation">
                                            Actuation guarantee </label>
                                    </div>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4" >
                                    <h5 class="text-color mb-4 mt-4">Title</h5>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="flexRadio"  value="Yes" checked= {title == "Yes" ? true : false} 
                                            id="Yes"/>
                                        <label class="form-check-label ms-2 text-color1" for="Yes">
                                            Yes
                                        </label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="flexRadio"  value="Delayed (TA)" checked= {title == "Delayed (TA)" ? true : false} 
                                            id="Delayed"/>
                                        <label class="form-check-label ms-2 text-color1" for="Delayed">
                                            Delayed (TA)</label>
                                    </div>
                                    <div class="form-check mb-3"> 
                                        <input class="form-check-input" type="radio" name="flexRadio"  value="No" checked= {title == "No" ? true : false} 
                                            id="No"/>
                                        <label class="form-check-label ms-2 text-color1" for="No">
                                            No</label>
                                    </div>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4" >
                                    <h5 class="text-color mb-4 mt-4">Mileage</h5>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="RadioDefault"  value="Actual" checked= {mileageRadio == "Actual" ? true : false} 
                                            id="Actual"/>
                                        <label class="form-check-label ms-2 text-color1" for="Actual">
                                            Actual
                                        </label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="RadioDefault" value="Over (Exceeds)" checked= {mileageRadio == "Over (Exceeds)" ? true : false} 
                                            id="Over"/>
                                        <label class="form-check-label ms-2 text-color1" for="Over">
                                            Over (Exceeds)</label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="radio" name="RadioDefault"  value="Unknown (TMU)" checked= {mileageRadio == "Unknown (TMU)" ? true : false} 
                                            id="Unknown"/>
                                        <label class="form-check-label ms-2 text-color1" for="Unknown">
                                            Unknown (TMU)</label>
                                    </div>
                                </div>
                                {/* <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Sale" class="form-label">Sale</label>
                                    <select class="form-select" aria-label="Default select example" id="Sale">
                                        <option selected></option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div> */}
                                {/* <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Conditions" class="form-label">Conditions</label>
                                    <input type="number" class="form-control" id="Conditions" />
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="Title#" class="form-label">Title #</label>
                                    <input type="number" class="form-control" id="Title#" />
                                </div> */}
                                <h5 class="text-color mb-4 mt-4">Buyer Fee</h5>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="BidPrice" class="form-label">Bid Price</label>
                                    <input type="number" class="form-control" id="BidPrice" defaultValue={BOSList?.bid} disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="BuyersFee" class="form-label">Buyer's Fee</label>
                                    <input type="number" class="form-control" id="BuyersFee" disabled />
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="DocumentFee" class="form-label">Document Fee</label>
                                    <input type="number" class="form-control" id="DocumentFee" disabled />
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="FloatFee" class="form-label">Float Fee</label>
                                    <input type="number" class="form-control" id="FloatFee" disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="TitleFee" class="form-label">Title Fee</label>
                                    <input type="number" class="form-control" id="TitleFee" disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="miscellaneous" class="form-label">Miscellaneous Fee</label>
                                    <input type="number" class="form-control" id="miscellaneous" disabled/>
                                </div>
                                <div class="mb-2 col-md-6 col-lg-4">
                                    <label for="SaleTax" class="form-label">Sale Tax</label>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control" id="SaleTax" disabled/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control" id="SaleTax" disabled/>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default BillofSale