import React from 'react';
import { useHistory } from "react-router-dom";
import checkImg from '../../src/assets/img/check.svg';
import { Button } from 'antd';




const Emailsuccess = () => {
    const history = useHistory();
    return (
        <div>
            <main id="main" className="inner-page">
                <div id="Successfullform" className="Successfullform">
                    <div className="container">
                        <div className="Successfullformblock col-lg-6">
                            <div className="row content">
                                <div className="modalcontent">
                                    <div className="Successfull-icon">
                                    <img alt="" src={checkImg} />
                                    </div>
                                    <div className="modalbody">
                                        <h2> Account Successfully Activated </h2>
                                        <p>Our Administrater Will Contact You</p>
                                    </div>
                                    <div className="modalfooter ">
                                    {/* <a className="cta-btns" href="/">OK</a> */}
                                    <Button className="cta-btns" onClick={() => history.push("/")}>OK</Button>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </main>




        </div>


    )
}

export default Emailsuccess;