import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';



const EmailError = () => {
    const history = useHistory();
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
                        <h2>Email ALready Exists</h2>
                        <p>Please provide Different Email </p>
                    </div>
                    <div className="modalfooter ">
                        {/* <a className="cta-btns" href="registration">OK</a> */}
                        <Button className="cta-btns" onClick={() => history.push("/registration")}>OK</Button>
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

export default EmailError;