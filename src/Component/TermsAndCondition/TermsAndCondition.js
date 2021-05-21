import React from 'react';



const Terms = (props) => {
  return (
    <>
        <div id="termspage" class="termspage">
      
            <div class="termspageblock">
                <div class="row content">
                        <div class="modalcontent">
                    
                            <div class="modalbody">
                                <h2>Terms And Conditions </h2>
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                                industry's standard dummy text ever since the 1500s,
                                </p>
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the 
                                release of Letraset sheets containing Lorem Ipsum passages Lorem Ipsum has been the industry's standard 
                                dummy text ever since the 1500s,
                                </p>
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s,
                                </p>
                            </div>
                            <div class="modalfooter ">
                                <a class="cta-btns" href="JavaScript:void(0)" onClick={props.toggle}>Close</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Terms;