import React from 'react';
import { useState, useEffect } from 'react';
import Countdown from "react-countdown";
import API from "../../Services/BaseService";


const LateFee = (props) => {

    const [lateFee, setLateFee] = useState("");

    const Completionist = () => <span>{""}</span>;


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {

            return <Completionist />;
        } else {

            return (
                <span>
                    {hours}:{minutes}:{seconds}
                </span>
            );
        }
    };

    const getLateFee = () => {

        let request = {
            buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id,
        }

        API.post("getlatefee/condition", request).then(response => {

            console.log("count details check the value", response)

            setLateFee(response.data.data[0])
            console.log("==================>", response.data.data[0])

        });
    }

    useEffect(() => {

        getLateFee();

    }, []);

    return (

        <div id="makeyourbid" class="makeyourbid"><div class="container"><div class="makeyourbidblock col-lg-12">

            <div>


                {lateFee.late_fee > 0 ?


                    <div>
                        <div class="section-title">

                            <h2>Alert</h2>
                            <i class="icofont-warning"></i>
                        </div>

                        <p>If you dont make a payment, you will be charged late fee $ 75</p>

                    </div>

                    :
                    <div class="section-title">
                        <p>Please make the pending payments</p>
                        <div class="section-title">

                            <h2>Alert</h2>
                            
                        </div>
                        <i class="icofont-warning"></i>
                        
                        <div>
                           {console.log("===days===>",lateFee)}
                           {Number(lateFee.days)>1?
                           <a > <span> Days: {lateFee.days}</span> </a> 
                           :""}
                                
                            
                        </div>
                        <div class= {(lateFee.time!==null && lateFee.time < 5000)?"countownBlock":""} >
                    <Countdown date={Date.now() + (lateFee.time!==null && lateFee.time < 5000 ? lateFee.time*60*1000 :0)  } renderer={renderer} />
                    </div>
                    </div>


                }

                <div class="col-lg-12 makeyourbid-btn">

                    <a class="cta-btns mr-2" href="/cart" >Make Payment</a>
                    <a class="cta-btns-primary" onClick={props.toggle}>Cancel</a>

                </div>
            </div>
        </div>





        </div>

        </div>



    )
}

export default LateFee;