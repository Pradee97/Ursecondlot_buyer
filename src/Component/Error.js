import React from 'react';

const Error = () => {
    return (
        <div>
            <main id="main" className="inner-page">

                <div id="errorform" className="errorform">
                    <div className="container">
                        <div className="errorformblock col-lg-6">
                            <div className="content">
                                <div className="modalcontent">

                                    <div className="errorform-icon">
                                        <img alt="" src="error.svg" />
                                    </div>
                                    <div className="modalbody">
                                        <h2>Login Failure</h2>
                                        <p>Please provide correct Email/Password </p>
                                    </div>
                                    <div className="modalfooter ">
                                        <a className="cta-btns" href="login">OK</a>
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

export default Error;