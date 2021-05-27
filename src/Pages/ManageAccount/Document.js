import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import ls from 'local-storage';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import API from "../../Services/BaseService";
import Popup from '../../Component/Popup/Popup';
import '../../Component/Popup/popup.css';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import FileBase64 from 'react-file-base64';


const Document = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("")

    
    let userDetails = ls.get('userDetails');
    console.log("======12345====>", ls.get('userDetails'))

   
    const getFiles=(file,value)=>{
        let request = {
            buyer_id: userDetails.user_id,
            buyer_doc_type:value,
            doc_name:file,
        };
        console.log("======12345====>",request)
        const upload=API.post('buyer_document/add', request);
        upload.then(response=>{
            console.log("=========>",response)
            if (response.data.success) {
            togglePopup()
                    setPopupTitle("Document Upload");
                    setPopupMsg("Document Successfully Uploaded");
                    setPopupType("success");
                    setPopupActionType("redirect");
                    setPopupActionValue("ok");
                    setPopupActionPath("/document")
            }else {
                togglePopup()
                setPopupTitle("Document Upload");
                setPopupMsg("Document is not Uploaded, Please try Again");
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            }
        })
      }

    return (
        <div>

            <main id="main" crassName="inner-page">


                <div id="documentspage" class="documentspage">
                    <div class="container" >
                        <div class="documentspageblock col-lg-12">
                            <div class="section-title">
                                <h2>Documents</h2>
                            </div>
                            <div className="row content">
                                <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                                    <div className="mgaccountuser">
                                        <div className="mgaccountuserleft">
                                            <img src={process.env.PUBLIC_URL + "/images/userimg.jpg"} className="img-fluid" alt="..." />
                                        </div>
                                        <div className="mgaccountuserright">
                                            <h3>Fernand</h3>
                                            <div className="d-flex align-items-center">
                                                <p className="details"><img src={process.env.PUBLIC_URL + "/images/Path.svg"} className="img-fluid" alt="..." /><span>California, Cl</span></p>
                                            </div>

                                        </div>
                                    </div>
                                    <ManageAccountLinks />
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 documentsrightblock">
                                    <div class="documentspage-inner">
                                        <div class="col-lg-12">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Copy of Dealer license</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"Dealer license") } />
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Certificate of liability insurance.</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"liability insurance") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Copy of Company check.</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"company check") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 pt-2 mt-2">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Copy of state sales tax certificate.</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"state sales tax") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Copy of surety bond (if required by you state).</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"surety bond") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Copy of DMV vehicle dealer bond (in required states).</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"DMV vehicle") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 pt-2 mt-2">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Signed individual guaranty for each owner.</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"individual guaranty") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Legible copy of driver’s license for owners and representatives</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"owners and representatives") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Signed bank Authorization letter for bank to release information.</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"bank Authorization") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12 pt-2 mt-2">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Legible copy of driver’s license for owners and representatives</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"owners and representatives") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-4">
                                                    <div class="docdetails">
                                                        <h5>Articles of incorporation.</h5>
                                                        <img src={process.env.PUBLIC_URL+"/images/uploadblack.png"} class="img-fluid" alt="" />
                                                        <FileBase64  onDone={(e)=>getFiles(e,"Articles of incorporation") }/>
                                                        <p> Drag and drop her or<a href="#"> upload file</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                <img src={process.env.PUBLIC_URL + "/images/appstore.png"} />
                                <img src={process.env.PUBLIC_URL + "/images/googleplay.png"} />
                            </div>

                        </div>

                    </div>
                </section>
                {isOpen &&
                    <CommonPopup
                        handleClose={togglePopup}
                        popupTitle={popupTitle}
                        popupMsg={popupMsg}
                        popupType={popupType}
                        popupActionType={popupActionType}
                        popupActionValue={popupActionValue}
                        popupActionPath={popupActionPath}
                    />}
            </main>
        </div>


    )
}

export default Document;