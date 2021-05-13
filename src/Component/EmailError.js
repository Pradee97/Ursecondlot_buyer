import React from 'react';
import { useHistory } from "react-router-dom";



const EmailError = () => {
    const history = useHistory();
    return (
        <div>
<main id="main" class="inner-page">

<div id="errorform" class="errorform">
    <div class="container">
        <div class="errorformblock col-lg-6">
            <div class="content">
                <div class="modalcontent">

                    <div class="errorform-icon">
                        <img alt="" src="error.svg" />
                    </div>
                    <div class="modalbody">
                        <h2>Email ALready Exists</h2>
                        <p>Please provide Different Email </p>
                    </div>
                    <div class="modalfooter ">
                        <a class="cta-btns" href="registration">OK</a>
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