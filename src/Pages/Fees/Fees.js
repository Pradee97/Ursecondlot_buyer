import React from 'react';
import API from "../../Services/BaseService";
import { useHistory } from "react-router-dom";

// import '../../assets/css/styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Table
} from 'antd';


import '../../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../assets/vendor/icofont/icofont.min.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/venobox/venobox.css';
import '../../assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import '../../assets/vendor/aos/aos.css';


import '../../assets/css/style.css';
import { Modal, Button } from 'antd';



const Fees = () => {
    const history = useHistory();

    const [feeDetails, setFeeDetails] = useState("");
    const columns = [
        {
            title: 'Buying Price',
            dataIndex: 'fee_price',
            key: 'fee_price',
        },
        {
            title: 'Buy Fee',
            dataIndex: 'fee',
            key: 'fee',
        }
    ];
    async function fetchBuyerFees() {
        let request = {
            type: "Buyer"
        };
        const state = API.post('http://ec2-52-87-245-126.compute-1.amazonaws.com:4000/urs2ndlot/v1/fees/condition', request);
        state.then(res => {
            console.log("res", res)
            setFeeDetails(res.data.data);
        })
            .catch(err => { console.log(err); });
    }
    useEffect(() => {
        fetchBuyerFees();
    }, []);

    return (
        <div>
            <main id="main" class="inner-page">


                <div id="fees" class="fees">
                    <div class="container">
                        <div class="feesblock col-lg-12">
                            <div class="section-title">
                                <h2>FEES</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                            </div>
                            <div class="row content">
                                <div class="col-lg-6 pt-4 pt-lg-0 feestableBlock">
                                    <div class="feestable">
                                        <h2>Buyer Fee</h2>
                                        <Table columns={columns} dataSource={feeDetails}></Table>
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
                                <img src="appstore.png" />
                                <img src="googleplay.png" />

                            </div>

                        </div>

                    </div>
                </section>





            </main>
            <script src="assets/vendor/jquery/jquery.min.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/jquery.easing/jquery.easing.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/vendor/waypoints/jquery.waypoints.min.js"></script>
            <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="assets/vendor/venobox/venobox.min.js"></script>
            <script src="assets/vendor/owl.carousel/owl.carousel.min.js"></script>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/js/main.js"></script>



        </div>
    );
};

export default Fees;