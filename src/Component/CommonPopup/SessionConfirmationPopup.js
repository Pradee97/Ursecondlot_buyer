import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import "./commonPopup.css"

const SessionConfirmationPopup = props => {
    const history = useHistory();
    const [isContinue, setIsContinue] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [countDown, setCountDown] = useState(30)

    useEffect(() => {
        props.isToggle(isOpen);
        const timeout = setTimeout(()=>{
            if(!isContinue){    
                window.localStorage.clear();
                history.push("/")
                setIsOpen(false)
            }
        },30000)
        return () => clearTimeout(timeout);
    }, [isContinue,isOpen]);

    useEffect(() => {
        if(countDown>0){
            const interval = setInterval(() => {
                setCountDown(countDown-1)
              }, 1000);
            return () => clearInterval(interval);
        }        
      }, [countDown]);


    const Continue = () => {
        setIsContinue(true)
        setIsOpen(false)
    }

    const Close = () => {
        setIsContinue(false)
        setIsOpen(false)
        window.localStorage.clear();
        history.push("/")
    }

    return (
        <div className="popup-box">
            <div id="" class="CommonModels-box">
                <div class="Commonfullformblock col-lg-9">
                    <div class="CommonContainer">
                        <div class="CommonModalcontent">
                            <div class="CommonModalbody">
                                <h2>{"Session Timeout"}</h2>
                                <p>{`The current session is about to expire in ${countDown}sec`}</p>
                                <p>{`Would you like to continue the session?`}</p>
                            </div>
                            <div class="CommonModalfooter session">
                                <button class="cta-btns" onClick={Continue} >continue</button> 
                                <button class="cta-btns" onClick={Close} >logout</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SessionConfirmationPopup;