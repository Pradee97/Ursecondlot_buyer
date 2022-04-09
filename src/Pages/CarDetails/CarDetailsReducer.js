export const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    MINBID : 'MINBID',
    SAVEPURCHASE: 'SAVEPURCHASE',
    ERROR: 'ERROR'
};
const initialState =  {}


const CarDetailsReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case CarDetailsConst.HIGHBID:
            console.log("")
            return {
                
                cardetails: 'cardetails-highbid',
                payload: action.payload
            };
        case CarDetailsConst.MINBID:
            return {
                cardetails: 'cardetails-minbid',
                payload: action.payload

            };
        case CarDetailsConst.SAVEPURCHASE:
        return {
            cardetails: 'cardetails-savepurchase',
            payload: action.payload

        };
        case CarDetailsConst.ERROR:
            return {
                cardetails: 'cardetails-fail',
                payload: action.payload
            };
        default:
            return state
            
    }
    

}

export default CarDetailsReducer; 