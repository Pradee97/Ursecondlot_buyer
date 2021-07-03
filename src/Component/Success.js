import React from 'react';
import checkImg from '../../src/assets/img/check.svg';

const Success = () => {

    return (
        <div>
            <main id="main" className="inner-page">
                <div id="Successfullform" className="Successfullform">
                    <div className="container">
                        <div className="Successfullformblock col-lg-6">
                            <div className="content">
                                <div className="modalcontent">
                                    <div className="Successfull-icon">
                                        <img alt="" src={checkImg} />
                                    </div>
                                    <div className="modalbody">
                                        <h2>successfully submitted</h2>
                                        <p>Please Activate your account with the link shared to the given email Id</p>
                                    </div>
                                    <div className="modalfooter ">
                                        <a className="cta-btns" href="/">OK</a>
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