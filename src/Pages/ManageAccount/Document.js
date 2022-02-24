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
import LateFee from '../../Pages/LateFee/LateFee';

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
    const [popupActionPath, setPopupActionPath] = useState("");

    const [isLateFee, setIsLateFee] = useState(false);
    const [lateFeeValue, setLateFeeValue] = useState(0);
    const [docLists,setDocLists]=useState("");

    const [Type,setType]=useState("");
    const [UpdateType,setUpdateType]=useState("");

	const toggleLateFee = () => {
		setIsLateFee(!isLateFee);
  	}


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
  const [loading,setloading]=useState("");

  const viewDoc= () =>{

    let request = {
        buyer_dealer_id: userDetails.buyer_dealer_id
    };
   
    API.post("buyerdoclist/condition",request).then(response=>{
        console.log("view Identify", response.data.data)
        setDocLists(response.data.data);
    });
}
useEffect(()=>{
    viewDoc();
     
}, [])

    async function getDocuments() {
    console.log("inside get document");
        setloading(true);

        let request = {
            buyer_dealer_id: userDetails.buyer_dealer_id
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
        getlateFee();

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
                viewDoc();
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
    const updateFiles = (file, document_id,  value) => {

        console.log("====value====>",value)
        console.log("====document file====>",file)
        console.log("====document_id====>",document_id)
        if (value == "Dealer license" && !isValidFile(file))
        { 
            setUpdateType("1");
            console.log("====setType1====>")
            
         }
        else if (value =="liability insurance" && !isValidFile(file))
        {
            setUpdateType("2");
            

        }
        else if (value == "company check" && !isValidFile(file))
        {
            setUpdateType("3");
            

        }
        else if (value === "state sales tax" && !isValidFile(file))
        {
            setUpdateType("4");
            

        }
        else if (value === "surety bond" && !isValidFile(file))
        {
            setUpdateType("5");
            

        }
        else if (value === "DMV vehicle" && !isValidFile(file))
        {
            setUpdateType("6");
            

        }
        else if (value === "individual guaranty" && !isValidFile(file))
        {
            setUpdateType("7");
            

        }
        else if (value === "owners and representatives" && !isValidFile(file))
        {
            setUpdateType("8");
            

        }
        else if (value === "bank Authorization" && !isValidFile(file))
        {
            setUpdateType("9");
            

        }
        else if (value === "representatives" && !isValidFile(file))
        {
            setUpdateType("10");
            

        }
        else if (value === "Articles of incorporation" && !isValidFile(file))
        {
            setUpdateType("11");
            

        }
        else{
           
            console.log("====else calli=ng===>")
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
                } else if (document[0].buyer_doc_type_id === 9) {
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
                viewDoc();
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
    }

    const isValidFile = (file) => {
        let filesArray = Object.values(file);  
        // console.log("====filesArray====>",filesArray[0])
        let fileExtension = filesArray[0].split('.').pop(); 
        // console.log("====fileExtension====>",fileExtension)

        let isValid = (fileExtension == 'txt' || 
        fileExtension == 'doc' ||
        fileExtension == 'pdf' ||
        fileExtension == 'png' || 
        fileExtension == 'jpeg' || 
        fileExtension == 'jpg' );
        return isValid;
    }

    const getFiles = (file, value) => {

        console.log("====file====>",file)
        console.log("====value====>",value)
        console.log("==== txt ==== ", isValidFile(file))
        setType("")
        console.log("==== condition ==== ", (value == "Dealer license" && !isValidFile(file)))
        
        if (value == "Dealer license" && !isValidFile(file))
        { 
            setType("1");
            console.log("====setType1====>")
            
         }
        // else if (value =="liability insurance" && !isValidFile(file))
        // {
        //     setType("2");
            

        // }
        // else if (value == "company check" && !isValidFile(file))
        // {
        //     setType("3");
            

        // }
        // else if (value === "state sales tax" && !isValidFile(file))
        // {
        //     setType("4");
            

        // }
        // else if (value === "surety bond" && !isValidFile(file))
        // {
        //     setType("5");
            

        // }
        // else if (value === "DMV vehicle" && !isValidFile(file))
        // {
        //     setType("6");
            

        // }
        // else if (value === "individual guaranty" && !isValidFile(file))
        // {
        //     setType("7");
            

        // }
        // else if (value === "owners and representatives" && !isValidFile(file))
        // {
        //     setType("8");
            

        // }
        // else if (value === "bank Authorization" && !isValidFile(file))
        // {
        //     setType("9");
            

        // }
        // else if (value === "representatives" && !isValidFile(file))
        // {
        //     setType("10");
            

        // }
        // else if (value === "Articles of incorporation" && !isValidFile(file))
        // {
        //     setType("11");
            

        // }
        else{
           
            console.log("====else calli=ng===>")
        let request = {
            buyer_dealer_id: userDetails.buyer_dealer_id,
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
                viewDoc();
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
    }

    const getlateFee=()=>{
		let request={
		  buyer_dealer_id: JSON.parse(localStorage.getItem("userDetails")).buyer_dealer_id
		}
		
		API.post('getlatefee/condition',request).then(res=>{
		   if(res.data.data.length){
		  
		 console.log("check +++++ ", res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" )
		  const lateFeeValueStatus=res.data.data.filter(value=>value.status=="yes")[0]?.status || "no" 
		  setIsLateFee(lateFeeValueStatus==="yes")
		  setLateFeeValue(res.data.data.filter(value=>value.late_fee>0)[0]?.late_fee || 0)
		   }
		  
	  
		}).catch(err=>{console.log(err);});
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
                                                 {docLists.length > 0 ? docLists.map((docLists)=>

                                     
                                                  <div className="col-lg-4 col-md-4 mb-3 ">
                                                  {docLists.doc_name == ""  || docLists.doc_name == null || docLists.doc_name === undefined || docLists.doc_name === "0" ?
                                                   <div className="docdetails">
                                                        <h5>{docLists.buyer_doc_type}</h5>
                                                        <img src={process.env.PUBLIC_URL + "/images/uploadblack.png"} className="img-fluid" alt="" />
                                                        <p>  
                                                        <div className="upload-btn-wrapper">
                                                                <a className="btn"> Upload File</a>
                                                                <FileBase64 onDone={(e) => getFiles(e, docLists.buyer_doc_type)} />
                                                            </div>
                                                        </p>
                                                        {Type=== docLists.buyer_doc_type_id ?<p className="form-input-error">Only TXT,DOC,PDF,JPG,PNG,JPEG file formats can be uploaded</p>:""} 
                                                    </div> :
                                                      (<>  
                                                       {/* {docLists.buyer_doc_type == doc.buyer_doc_type && doc.buyer_doc_type_id  ? */}
                                                        
                                                      <div className="docdetails">
                                                            <h5>{docLists.buyer_doc_type}</h5>
                                                         

                                                            <img src={process.env.PUBLIC_URL + "/images/fileDocIcon.png"} href={docLists.doc_name} className="img-fluid" alt="" />

                                                            <div><a href={docLists.doc_name} target="_blank">{docLists.doc_name.split('_')[1]}</a></div>
                                                        <p>
                                                                <div className="upload-btn-wrapper updateFile">
                                                                    <a className="btn"> Update File</a>
                                                                    <FileBase64 onDone={(e) => updateFiles(e, docLists.document_id,docLists.buyer_doc_type)} />
                                                                </div>
                                                                <a className="btn deleteFile" onClick={(e)=>deleteFileConfirmation(docLists.document_id)}> Delete File</a>
                                                                {UpdateType=== docLists.buyer_doc_type_id ?<p className="form-input-error">Only TXT,DOC,PDF,JPG,PNG,JPEG file formats can be uploaded</p>:""} 
                                                            </p>
                                                        </div>
                                                       {/* <div className="docdetails">
                                                       <h5>{docLists.buyer_doc_type}</h5>
                                                       <img src={uploadblack} className="img-fluid" alt="" />
                                                       <p>  
                                                      
                                                       <div className="upload-btn-wrapper">
                                                               <a className="btn"> Upload File</a>
                                                               <FileBase64 onDone={(e) => getFiles(e, docLists.buyer_doc_type)} />
                                                           </div>
                                                       </p>
                                                       {Type=== docLists.buyer_doc_type_id ?<p className="form-input-error">Only TXT,DOC,PDF,JPG,PNG,JPEG file formats can be uploaded</p>:""} 
                                                   </div> */}
                                                         
                                                        </>)}
                                                  </div> ): ""}
                                               
                                               
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


{isLateFee && <Popup
          isClose={false}
          content={<>
            <LateFee toggle={toggleLateFee} />
          </>}
          handleClose={toggleLateFee}
        />} 

            </main>
            }
        </div>
    )
}
export default Document;