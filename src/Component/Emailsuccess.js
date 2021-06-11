import React from 'react';
import { useHistory } from "react-router-dom";
import checkImg from '../../src/assets/img/check.svg';
import { Button } from 'antd';




const Emailsuccess = () => {
    const history = useHistory();
    return (
        <div>
            <main id="main" class="inner-page">
                <div id="Successfullform" class="Successfullform">
                    <div class="container">
                        <div class="Successfullformblock col-lg-6">
                            <div class="row content">
                                <div class="modalcontent">
                                    <div class="Successfull-icon">
                                    <img alt="" src={checkImg} />
                                    </div>
                                    <div class="modalbody">
                                        <h2> Account Successfully Activated </h2>
                                        <p>Our Administrater Will Contact You</p>
                                    </div>
                                    <div class="modalfooter ">
                                    {/* <a class="cta-btns" href="/">OK</a> */}
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