import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'antd';
import API from "../../Services/BaseService";
import Loading from"../../Component/Loading/Loading";

const Fees = () => {
    const [loading,setLoading] = useState(true);
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

    return (
        <div>
            <main id="main" className="inner-page">


                <div id="fees" className="fees">
                    <div className="container">
                        <div className="feesblock col-lg-12">
                            <div className="section-title">
                                <h2>FEES</h2>
                                <p>Thank you for interesting in our platform, We wish you make money and come back to buy more cars</p>
                            </div>
                            <div className="row content">
                                <div className="col-lg-6 pt-4 pt-lg-0 feestableBlock">
                                    <div className="feestable">
                                        {/* <h2>Buyer Fee</h2> */}
                                        {loading?<Loading/>:
                                        <Table columns={columns} dataSource={feeDetails} pagination={false} ></Table>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="playstoreBlock" className="playstoreBlock">
                    <div className="container">


                        <div className="row content">
                            <div className="col-lg-12">
                                <img src={process.env.PUBLIC_URL +"/images/appstore.png"} />
                                <img src={process.env.PUBLIC_URL +"/images/googleplay.png"} />
                            </div>

                        </div>

                    </div>
                </section>





            </main>

        </div>
    );
};

export default Fees;