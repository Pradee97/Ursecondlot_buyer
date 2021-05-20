import React from 'react';
import { useHistory } from "react-router-dom";
import checkImg from '../../src/assets/img/check.svg';




const Success = () => {
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
                                        <h2>successfully submitted</h2>
                                        <p>Please Activate your account with the link shared to the given email Id</p>
                                    </div>
                                    <div class="modalfooter ">
                                        <a class="cta-btns" href="/">OK</a>
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

export default Success;