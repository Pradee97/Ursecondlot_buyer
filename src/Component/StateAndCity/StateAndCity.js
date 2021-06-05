import React, {useState, useEffect} from "react"
import API from "../../Services/BaseService";

const StateAndCity = props => {

    console.log("pppppp",props)
    // const [defaultZipcodeValue, setDefaultZipcodeValue] = useState(props.defaultZipcodeValue !== undefined ? props.defaultZipcodeValue : "");
    const [defaultZipcodeValue, setDefaultZipcodeValue] = useState(props.defaultZipcodeValue);
    const [zipCodeId, setZipcodeId] = useState("");
    const [isEdit, setIsEdit] = useState(props?.isEdit || false);
    const [country, setCountry] = useState("");
    // const [defaultStateValue, setDefaultStateValue] = useState(props.defaultStateValue !== undefined ? props.defaultStateValue  :  "");
    const [defaultStateValue, setDefaultStateValue] = useState(props.defaultStateValue);
    const [stateName, setStateName] = useState("");
    const [stateNameList, setStateNameList] = useState([]);
    // const [defaultCityValue, setDefaultCityValue] = useState(props.defaultCityValue !== undefined ?  props.defaultCityValue : "");
    const [defaultCityValue, setDefaultCityValue] = useState(props.defaultCityValue);
    const [cityName, setCityName] = useState("");
    const [cityNameList, setCityNameList] = useState([]);
    
    

    async function fetchCountry() {
        const country = API.get('country');
        country.then(res => {
            setCountry(res.data.data[0].country_id);
        })
            .catch(err => { console.log(err); });
    }

    async function fetchState() {
        let request = {
            country_id: 1
        };
        const state = API.post('state/condition', request);
        state.then(res => {
            console.log("res", res.data.data)
            setStateNameList(res.data.data);
        })
            .catch(err => { console.log(err); });
    }

    function fetchCity(e) {
        let request = {
            state_id: e
        };
        const state = API.post('city/condition', request);
        state.then(res => {
            console.log("city", res.data.data)
            setCityNameList(res.data.data);
        })
            .catch(err => { console.log(err); });
    }

    // useEffect(() => {
    //     if (props.isEdit !==undefined || !props.isEdit) {
    //         console.log("triggering-----------")
    //         setStateName(props?.defaultStateValue || "");
    //         setCityName(props?.defaultCityValue || "");
    //         setZipcodeId(props?.defaultZipcodeValue || "");
    //     }
        
    // }, []);

    useEffect(() => {
       
        props.setStateValue(stateName);
        props.setCityValue(cityName);
        props.setZipcodeValue(zipCodeId);
       
    }, [stateName,cityName,zipCodeId]);

    useEffect (()=>{
        if(isEdit){
            // setDefaultZipCodeId(props.defaultStateValue)
            console.log("is edit=====>",isEdit);
            console.log("props.defaultStateValue=====>",props.defaultStateValue);
            console.log("props.defaultCityValue=====>",props.defaultCityValue);
            console.log("setDefaultZipcodeValue====>",props.defaultZipcodeValue)
            setDefaultStateValue(props.defaultStateValue);
            setDefaultCityValue(props.defaultCityValue);
            setDefaultZipcodeValue(props.defaultZipcodeValue);
        }
    })
    // useEffect (()=>{
    //     if (props.isEdit !==undefined || !props.isEdit) {
    //             console.log("triggering-----------")
    //             setStateName(props.defaultStateValue );
    //             setCityName(props.defaultCityValue );
    //             setZipcodeId(props.defaultZipcodeValue );
    //         }
    // },[stateName, cityName, zipCodeId])

    useEffect(() => {
        fetchCountry();
        !isEdit && fetchState();
    }, [isEdit]);

    useEffect(() => { setZipcodeId( zipCodeId) }, [zipCodeId])


    const getAlert = () => {
        alert('clicked');
      }
    

    const handleState = (e) => {  
        console.log("--------handleState") 
        setStateName( stateNameList.filter(data=>data.state_id == e.target.value)[0].state_name)
        fetchCity(e.target.value)
        setZipcodeId("")
    }

    const handleCity = (e) => {
        console.log("--------handleCity")
        setCityName(e.target.value)
        setZipcodeId("")
    }

    const setZipcodeNormal = (data) => {
        console.log("--------setZipcodeNormal",data)
        setIsEdit(false)
        if(data.length ===0 ){
            setZipcodeId("")
            setCityName('')
            setStateName('') 
        }
        if(data.length==5 ){
            setZipcodeId(data)
            console.log("====setIsEdit=====>",!isEdit)
        }
    }

    

return (
    <>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">                
                        <div className="selcetclass"> 
                        {"test"}{props.defaultStateValue}
                    <select className="form-control custom-select browser-default textbox" required defaultValue={isEdit ? props.defaultStateValue : stateName}  onChange={handleState}>
                        <option style={{"display":"none"}}></option>
                        {stateNameList.length>0 &&
                            <>
                                {stateNameList.map((state, index) => <option key={state.state_id} value={state.state_id}>{state.state_name}</option>)}
                            </>
                        }
                    </select>
                    <label  for="state_id" className={"input-has-value"}>State</label>
                    </div>
                    
               
            </div>
        </div>
        <div className="col-sm-4 form-group selectTbox">
            <div className="tbox">              
                <div className="selcetclass"> 
                    <select id="City" className="form-control custom-select browser-default textbox" required defaultValue={isEdit ? props.defaultCityValue : cityName} onChange={setCityName}>
                    <option style={{"display":"none"}}></option>
                        {cityNameList.length>0 &&
                            <>
                                {cityNameList.map((city, index) => <option key={city.city_id} value={city.city_name}>{city.city_name}</option>)}
                            </>
                        }
                    </select>
                    <label  for="city_id" className={"input-has-value"}>City</label>
                </div>                   
            </div>
        </div>
        <div className="col-sm-4 form-group">
            <div className="tbox">
                <div className="selcetclass">                 
                    <>
                        <input type="text" className="form-control textbox" defaultValue={isEdit ? defaultZipcodeValue : zipCodeId} placeholder="" required maxLength="5" onChange={(e) => setZipcodeId(e.target.value)} />
                        {<label  for="zipcode_id" className={"input-has-value"}>Zipcode</label>}
                    </>                       
                </div>
            </div>
        </div>
    </>
)}

export default StateAndCity;