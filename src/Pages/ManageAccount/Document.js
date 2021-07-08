import React from 'react';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import ls from 'local-storage';
import ManageAccountLinks from "../../Component/ManageAccountLinks/ManageAccountLinks"
import API from "../../Services/BaseService";
import Popup from '../../Component/Popup/Popup';
import '../../Component/Popup/popup.css';
import CommonPopup from '../../Component/CommonPopup/CommonPopup';
import FileBase64 from 'react-file-base64';
import { Button, Upload } from 'antd';
import Loading from "../../Component/Loading/Loading";

const { Dragger } = Upload;

const Document = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    let userDetails = ls.get('userDetails');
    const [docList, setDocList] = useState("");
    const [doc1, setDoc1] = useState("");
    const [doc2, setDoc2] = useState("");
    const [doc3, setDoc3] = useState("");
    const [doc4, setDoc4] = useState("");
    const [doc5, setDoc5] = useState("");
    const [doc6, setDoc6] = useState("");
    const [doc7, setDoc7] = useState("");
    const [doc8, setDoc8] = useState("");
    const [doc9, setDoc9] = useState("");
    const [doc10, setDoc10] = useState("");
    const [doc11, setDoc11] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [popupMsg, setPopupMsg] = useState("");
    const [popupType, setPopupType] = useState("");
    const [popupActionType, setPopupActionType] = useState("");
    const [popupActionValue, setPopupActionValue] = useState("");
    const [popupActionPath, setPopupActionPath] = useState("")
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
  const [loading,setloading]=useState("");

    async function getDocuments() {
    console.log("inside get document");
        setloading(true);

        let request = {
            buyer_id: userDetails.user_id
        };
        const state = API.post('buyer_document/condition', request);
        state.then(res => {
            let document = res.data.data;
            console.log("====document====>",document)
            for (let x in document) {
                if (document[x].buyer_doc_type_id === 1) {
                    setDoc1(document[x])
                } else if (document[x].buyer_doc_type_id === 2) {
                    setDoc2(document[x])
                } else if (document[x].buyer_doc_type_id === 3) {
                    setDoc3(document[x])
                } else if (document[x].buyer_doc_type_id === 4) {
                    setDoc4(document[x])
                } else if (document[x].buyer_doc_type_id === 5) {
                    setDoc5(document[x])
                } else if (document[x].buyer_doc_type_id === 6) {
                    setDoc6(document[x])
                } else if (document[x].buyer_doc_type_id === 7) {
                    setDoc7(document[x])
                } else if (document[x].buyer_doc_type_id === 8) {
                    setDoc8(document[x])
                } else if (document[x].buyer_doc_type_id === 9) {
                    setDoc9(document[x])
                } else if (document[x].buyer_doc_type_id === 10) {
                    setDoc10(document[x])
                } else if (document[x].buyer_doc_type_id === 11) {
                    setDoc11(document[x])
                }
            }
            setDocList(res.data.data);
        })
            .catch(err => { console.log(err); });
      setloading(false);

    }

    useEffect(() => {
        getDocuments();
    }, []);


    const deleteFileConfirmation = (document_id) => {
        // console.log("document_id====",document_id)
        localStorage.setItem("deletDocumentId",document_id)
        togglePopup()
        setPopupTitle("Document Delete");
        setPopupMsg("Are you sure, You want to delete this!");
        setPopupType("confirm");
        setPopupActionType("confirm");
    }

    const deleteingFile= ()=>{
        setIsOpen(false);
         const document_id = localStorage.getItem("deletDocumentId")
        let request = {
            document_id
        };
        const deleteFile=API.post('documentDelete/update',request)
        deleteFile.then(response=>{
            console.log("====response.data====>",response.data)
            let document = response.data.data;
            //console.log("========>>",document.buyer_doc_type_id);
            if (document[0].buyer_doc_type_id === 1) {
                setDoc1("")
            } else if (document[0].buyer_doc_type_id ===  2) {
                setDoc2("")
            } else if (document[0].buyer_doc_type_id === 3) {
                setDoc3("")
            } else if (document[0].buyer_doc_type_id === 4) {
                setDoc4("")
            } else if (document[0].buyer_doc_type_id === 5) {
                setDoc5("")
            } else if (document[0].buyer_doc_type_id === 6) {
                setDoc6("")
            } else if (document[0].buyer_doc_type_id === 7) {
                setDoc7("")
            } else if (document[0].buyer_doc_type_id === 8) {
                setDoc8("")
            } else if (document[0].buyer_doc_type_id === 9) {
                setDoc9("")
            } else if (document[0].buyer_doc_type_id === 10) {
                setDoc10("")
            } else if (document[0].buyer_doc_type_id === 11) {
                setDoc11("")
            }
            if (response.data.success) {
                //getDocuments();
                setIsOpen(true);
                setPopupTitle("Document Delete");
                setPopupMsg("Document Successfully Deleted");
                setPopupType("success");
                setPopupActionType("close");
                setPopupActionValue("ok");
                //getDocuments();
                //setPopupActionPath("/document");
            } else {
                setIsOpen(true);
                setPopupTitle("Document Deleted");
                // setPopupMsg("Document is not Deleted, Please try Again");
                setPopupMsg( response.data.error.err );
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            }
        })
    }
    const updateFiles = (file, document_id) => {
        let request = {
            document_id: document_id,
            doc_name: file.length > 0 ? file : [file]
        };
        const upload = API.post('buyer_document/update', request);
        upload.then(response => {
            if (response.data.success) {
                console.log("====response.data====>",response.data)
                let document = response.data.data;
                //console.log("========>>",document.buyer_doc_type_id);
                if (document[0].buyer_doc_type_id === 1) {
                    setDoc1(document[0])
                } else if (document[0].buyer_doc_type_id ===  2) {
                    setDoc2(document[0])
                } else if (document[0].buyer_doc_type_id === 3) {
                    setDoc3(document[0])
                } else if (document[0].buyer_doc_type_id === 4) {
                    setDoc4(document[0])
                } else if (document[0].buyer_doc_type_id === 5) {
                    setDoc5(document[0])
                } else if (document[0].buyer_doc_type_id === 6) {
                    setDoc6(document[0])
                } else if (document[0].buyer_doc_type_id === 7) {
                    setDoc7(document[0])
                } else if (document[0].buyer_doc_type_id === 8) {
                    setDoc8(document[0])
                } else if (document.buyer_doc_type_id === 9) {
                    setDoc9(document[0])
                } else if (document[0].buyer_doc_type_id === 10) {
                    setDoc10(document[0])
                } else if (document[0].buyer_doc_type_id === 11) {
                    setDoc11(document[0])
                }
                togglePopup()
                setPopupTitle("Document Upload");
                setPopupMsg("Document Successfully Updated");
                setPopupType("success");
                setPopupActionType("close");
                setPopupActionValue("ok");
               // getDocuments();
                //setPopupActionPath("/document")
            } else {
                togglePopup()
                setPopupTitle("Document Upload");
                // setPopupMsg("Document is not Updated, Please try Again");
                setPopupMsg( response.data.error.err );
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            }
        })
    }
    const getFiles = (file, value) => {
        let request = {
            buyer_id: userDetails.user_id,
            buyer_doc_type: value,
            doc_name: file.length > 0 ? file : [file],
        };
        const upload = API.post('buyer_document/add', request);
        upload.then(response => {
            if (response.data.success) {
                console.log("====response.data====>",response.data)
                let document = response.data.data;
                //console.log("========>>",document.buyer_doc_type_id);
                if (document.buyer_doc_type_id === 1) {
                    setDoc1(document)
                } else if (document.buyer_doc_type_id ===  2) {
                    setDoc2(document)
                } else if (document.buyer_doc_type_id === 3) {
                    setDoc3(document)
                } else if (document.buyer_doc_type_id === 4) {
                    setDoc4(document)
                } else if (document.buyer_doc_type_id === 5) {
                    setDoc5(document)
                } else if (document.buyer_doc_type_id === 6) {
                    setDoc6(document)
                } else if (document.buyer_doc_type_id === 7) {
                    setDoc7(document)
                } else if (document.buyer_doc_type_id === 8) {
                    setDoc8(document)
                } else if (document.buyer_doc_type_id === 9) {
                    setDoc9(document)
                } else if (document.buyer_doc_type_id === 10) {
                    setDoc10(document)
                } else if (document.buyer_doc_type_id === 11) {
                    setDoc11(document)
                }
            
                togglePopup()
                setPopupTitle("Document Upload");
                setPopupMsg("Document Successfully Uploaded");
                setPopupType("success");
                setPopupActionType("close");
                setPopupActionValue("close");
                //getDocuments();
                //setPopupActionPath("/document")
            } else {
                togglePopup()
                setPopupTitle("Document Upload");
                // setPopupMsg("Document is not Uploaded, Please try Again");
                setPopupMsg( response.data.error.err );
                setPopupType("error");
                setPopupActionType("close");
                setPopupActionValue("close");
            }
        })
    }

    return (
        <div>
      {loading?<Loading/>:
            <main id="main" className="inner-page">
                <div id="documentspage" className="documentspage">
                    <div className="container" >
                        <div className="documentspageblock col-lg-12">
                            <div className="section-title">
                                <h2>Documents</h2>
                            </div>
                            <div className="row content">
                                <div className="col-lg-3 col-md-4 col-sm-12 accountleftblock">
                                    
                                    <ManageAccountLinks />
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12 pt-4 pt-lg-0 documentsrightblock">
                                    <div className="documentspage-inner">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4">
                                                    {doc1 === "" ? <div className="docdetails">
                                                    <h5>Copy of Dealer license</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p><div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "Dealer license")} />
                                                            </div>
                                                            </p>   
                                                    </div> :
                                                        <div className="docdetails">
                                                            <h5>Copy of Dealer license</h5>
                                                            <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc1.doc_name} className="img-fluid" alt="" />
                                                            <div><a href={doc1.doc_name} target="_blank">{doc1.doc_name.split("_")[1]}</a></div>
                                                            <p>
                                                                <div className="upload-btn-wrapper updateFile">
                                                                    <a className="btn"> Update File</a>
                                                                    <FileBase64 onDone={(e) => updateFiles(e, doc1.document_id)} />
                                                                </div>
                                                                <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc1.document_id)}> Delete File</a>
                                                            </p>
                                                        </div>}
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                    {doc2 === "" ? <div className="docdetails">
                                                        <h5>Certificate of liability insurance.</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "liability insurance")} />
                                                            </div>
                                                        </p>
                                                    </div> :
                                                        <div className="docdetails">
                                                            <h5>Certificate of liability insurance.</h5>
                                                            <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc2.doc_name} className="img-fluid" alt="" />
                                                            <div><a href={doc2.doc_name} target="_blank">{doc2.doc_name.split("_")[1]}</a></div>
                                                            <p>
                                                                <div className="upload-btn-wrapper updateFile">
                                                                    <a className="btn"> Update File</a>
                                                                    <FileBase64 onDone={(e) => updateFiles(e, doc2.document_id)} />
                                                                </div>

                                                                <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc2.document_id)}> Delete File</a>
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                    {doc3 === "" ? <div className="docdetails">
                                                        <h5>Copy of Company check.</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />

                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "company check")} />
                                                            </div>
                                                        </p>
                                                    </div> : <div className="docdetails">
                                                        <h5>Copy of Dealer license</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc3.doc_name} className="img-fluid" alt="" />
                                                        <div><a href={doc3.doc_name} target="_blank">{doc3.doc_name.split("_")[1]}</a></div>
                                                        <p>
                                                            <div className="upload-btn-wrapper updateFile">
                                                                <a className="btn"> Update File</a>
                                                                <FileBase64 onDone={(e) => updateFiles(e, doc3.document_id)} />
                                                            </div>

                                                            <a className="btn deleteFile" onclick={(e)=>deleteFileConfirmation(doc3.document_id)}> Delete File</a>
                                                        </p>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 pt-2 mt-2">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4">
                                                    {doc4 === "" ? <div className="docdetails">
                                                        <h5>Copy of state sales tax certificate.</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />

                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "state sales tax")} />
                                                            </div>
                                                        </p>
                                                    </div> :
                                                        <div className="docdetails">
                                                            <h5>Copy of Dealer license</h5>
                                                            <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc4.doc_name} className="img-fluid" alt="" />
                                                            <div><a href={doc4.doc_name} target="_blank">{doc4.doc_name.split("_")[1]}</a></div>
                                                            <p>
                                                                <div className="upload-btn-wrapper updateFile">
                                                                    <a className="btn"> Update File</a>
                                                                    <FileBase64 onDone={(e) => updateFiles(e, doc4.document_id)} />
                                                                </div>
                                                                <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc4.document_id)}> Delete File</a>
                                                            </p>
                                                        </div>}
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                    {doc5 === "" ? <div className="docdetails">
                                                        <h5>Copy of surety bond (if required by you state).</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "surety bond")} />
                                                            </div>
                                                        </p>
                                                    </div> :
                                                        <div className="docdetails">
                                                            <h5>Copy of Dealer license</h5>
                                                            <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc5.doc_name} className="img-fluid" alt="" />
                                                            <div><a href={doc5.doc_name} target="_blank">{doc5.doc_name.split("_")[1]}</a></div>
                                                            <p>
                                                                <div className="upload-btn-wrapper updateFile">
                                                                    <a className="btn"> Update File</a>
                                                                    <FileBase64 onDone={(e) => updateFiles(e, doc5.document_id)} />
                                                                </div>
                                                                <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc5.document_id)}> Delete File</a>
                                                            </p>
                                                        </div>}
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                {doc6 === "" ?<div className="docdetails">
                                                        <h5>Copy of DMV vehicle dealer bond (in required states).</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "DMV vehicle")} />
                                                            </div>
                                                        </p>
                                                    </div>:
                                                     <div className="docdetails">
                                                     <h5>Copy of Dealer license</h5>
                                                     <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc6.doc_name} className="img-fluid" alt="" />
                                                     <div><a href={doc6.doc_name} target="_blank">{doc6.doc_name.split("_")[1]}</a></div>
                                                     <p>
                                                         <div className="upload-btn-wrapper updateFile">
                                                             <a className="btn"> Update File</a>
                                                             <FileBase64 onDone={(e) => updateFiles(e, doc6.document_id)} />
                                                         </div>
                                                         <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc6.document_id)}> Delete File</a>
                                                     </p>
                                                 </div>}
                                                </div>                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-12 pt-2 mt-2">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4">
                                                {doc7 === "" ?<div className="docdetails">
                                                        <h5>Signed individual guaranty for each owner.</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "individual guaranty")} />
                                                            </div>
                                                        </p>
                                                    </div>:
                                                    <div className="docdetails">
                                                    <h5>Copy of Dealer license</h5>
                                                    <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc7.doc_name} className="img-fluid" alt="" />
                                                    <div><a href={doc7.doc_name} target="_blank">{doc7.doc_name.split("_")[1]}</a></div>
                                                    <p>
                                                        <div className="upload-btn-wrapper updateFile">
                                                            <a className="btn"> Update File</a>
                                                            <FileBase64 onDone={(e) => updateFiles(e, doc7.document_id)} />
                                                        </div>
                                                        <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc7.document_id)}> Delete File</a>
                                                    </p>
                                                </div>}
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                {doc8 === "" ?<div className="docdetails">
                                                        <h5>Legible copy of driver’s license for owners and representatives</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "owners and representatives")} />
                                                            </div>
                                                        </p>
                                                    </div>:
                                                    <div className="docdetails">
                                                    <h5>Copy of Dealer license</h5>
                                                    <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc8.doc_name} className="img-fluid" alt="" />
                                                    <div><a href={doc8.doc_name} target="_blank">{doc8.doc_name.split("_")[1]}</a></div>
                                                    <p>
                                                        <div className="upload-btn-wrapper updateFile">
                                                            <a className="btn"> Update File</a>
                                                            <FileBase64 onDone={(e) => updateFiles(e, doc8.document_id)} />
                                                        </div>
                                                        <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc8.document_id)}> Delete File</a>
                                                    </p>
                                                </div>}
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                {doc9 === "" ?<div className="docdetails">
                                                        <h5>Signed bank Authorization letter for bank to release information.</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "bank Authorization")} />
                                                            </div>
                                                        </p>
                                                    </div>:
                                                    <div className="docdetails">
                                                    <h5>Copy of Dealer license</h5>
                                                    <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc9.doc_name} className="img-fluid" alt="" />
                                                    <div><a href={doc9.doc_name} target="_blank">{doc9.doc_name.split("_")[1]}</a></div>
                                                    <p>
                                                        <div className="upload-btn-wrapper updateFile">
                                                            <a className="btn"> Update File</a>
                                                            <FileBase64 onDone={(e) => updateFiles(e, doc9.document_id)} />
                                                        </div>
                                                        <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc9.document_id)}> Delete File</a>
                                                    </p>
                                                </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 pt-2 mt-2">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4">
                                                {doc10 === "" ?<div className="docdetails">
                                                        <h5>Legible copy of driver’s license for owners and representatives</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "representatives")} />
                                                            </div>
                                                        </p>
                                                    </div>:
                                                    <div className="docdetails">
                                                    <h5>Copy of Dealer license</h5>
                                                    <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc10.doc_name} className="img-fluid" alt="" />
                                                    <div><a href={doc10.doc_name} target="_blank">{doc10.doc_name.split("_")[1]}</a></div>
                                                    <p>
                                                        <div className="upload-btn-wrapper updateFile">
                                                            <a className="btn"> Update File</a>
                                                            <FileBase64 onDone={(e) => updateFiles(e, doc10.document_id)} />
                                                        </div>
                                                        <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc10.document_id)}> Delete File</a>
                                                    </p>
                                                </div>}
                                                </div>
                                                <div className="col-lg-4 col-md-4">
                                                {doc11 === "" ?<div className="docdetails">
                                                        <h5>Articles of incorporation.</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />

                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, "Articles of incorporation")} />
                                                            </div>
                                                        </p>
                                                    </div>:
                                                    <div className="docdetails">
                                                    <h5>Copy of Dealer license</h5>
                                                    <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={doc11.doc_name} className="img-fluid" alt="" />
                                                    <div><a href={doc11.doc_name} target="_blank">{doc11.doc_name.split("_")[1]}</a></div>
                                                    <p>
                                                        <div className="upload-btn-wrapper updateFile">
                                                            <a className="btn"> Update File</a>
                                                            <FileBase64 onDone={(e) => updateFiles(e, doc11.document_id)} />
                                                        </div>
                                                        <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(doc11.document_id)}> Delete File</a>
                                                    </p>
                                                </div>}
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
                        Confirmation={deleteingFile}
                    />}
            </main>
            }
        </div>
    )
}
export default Document;