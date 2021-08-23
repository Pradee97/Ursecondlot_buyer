export const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    ERROR: 'ERROR'
};
const initialState =  {}


const CarDetailsReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case CarDetailsConst.HIGHBID:
            return {
                carlist: 'cardetails-highbid',
                payload: action.payload

            };
        case CarDetailsConst.ERROR:
            return {
                carlist: 'cardetails-fail',
                payload: action.payload
            };
        default:
            return state
            
    }
    

}

export default CarDetailsReducer; 