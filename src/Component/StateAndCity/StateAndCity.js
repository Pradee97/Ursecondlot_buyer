import React, {useState, useEffect} from "react"
import API from "../../Services/BaseService";

const StateAndCity = props => {

    console.log("pppppp",props)
    const [defaultZipcodeValue, setDefaultZipcodeValue] = useState(props.defaultZipcodeValue);
    const [zipCodeId, setZipcodeId] = useState("");
    const [isEdit, setIsEdit] = useState(props?.isEdit || false);
    const [country, setCountry] = useState("");
    const [defaultStateValue, setDefaultStateValue] = useState(props.defaultStateValue);
    const [stateName, setStateName] = useState("");
    const [stateNameList, setStateNameList] = useState([]);
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
            if(props.isEdit){
                res.data.data.filter(data=> {
                    data.state_name?.toLowerCase() === defaultStateValue ?.toLowerCase() && fetchCity(data.state_id)
                })
               
            }
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

    useEffect(() => {
        props.setStateValue(stateName);
        props.setCityValue(cityName);
        props.setZipcodeValue(zipCodeId);
       
    }, [stateName, cityName, zipCodeId]);

    useEffect (()=>{
        if(isEdit){
            setDefaultStateValue(props.defaultStateValue);
            setDefaultCityValue(props.defaultCityValue);
            setDefaultZipcodeValue(props.defaultZipcodeValue);
        }
    })
    
    useEffect(() => fetchCountry(),[])
    
    useEffect(() => {
        fetchState();
    }, [defaultStateValue]);

    useEffect(() => { setZipcodeId( zipCodeId) }, [zipCodeId])

    const handleState = (e) => {  
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
                    <select className="form-control custom-select browser-default textbox" required defaultValue={stateName}  onChange={handleState}>
                        <option style={{"display":"none"}}></option>
                        {stateNameList.length>0 &&
                            <>
                                {stateNameList.map((state, index) => <option key={state.state_id} value={state.state_id} selected = { isEdit ?  state.state_name === defaultStateValue ? true : false : false} >{state.state_name}</option>)}
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
                    <select id="City" className="form-control custom-select browser-default textbox" required defaultValue={cityName} onChange={handleCity}>
                    <option style={{"display":"none"}}></option>
                        {cityNameList.length>0 &&
                            <>
                                {cityNameList.map((city, index) => <option key={city.city_id} value={city.city_name} selected = { isEdit ?  city.city_name === defaultCityValue ? true : false : false} >{city.city_name}</option>)}
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