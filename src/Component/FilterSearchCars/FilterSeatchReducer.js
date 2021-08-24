export const FilterSearchConst = {
    SEARCHREQUEST: 'SEARCHREQUEST',
    SEARCHRESULT:   'SEARCHRESULT',
    APINAME:    'APINAME',
    ERROR: 'ERROR'
};
const initialState =  {}
console.log("initialState===",initialState)

const FilterSearchReducer = (state = {payload:initialState}, action) => {
    switch (action.type) {
        case FilterSearchConst.SEARCHREQUEST:
            console.log("inside success reducer")
            console.log("Payload",action)
            return {
                filtersearch: 'filtersearch-searchrequest',
                payload: action.payload

            };
        case FilterSearchConst.SEARCHRESULT:
            console.log("inside success reducer")
            console.log("Payload",action)
            return {
                filtersearch: 'filtersearch-searchresult',
                payload: action.payload

            };
        case FilterSearchConst.APINAME:
            console.log("inside err reducer")
            console.log("Payload",action.payload)
            return {
                filtersearch: 'filtersearch-apiname',
                payload: action.payload
            };
        case FilterSearchConst.ERROR:
            console.log("inside err reducer")
            console.log("Payload",action.payload)
            return {
                filtersearch: 'filtersearch-fail',
                payload: action.payload
            };
       
        default:
            console.log("Inside default of the reducer");
            console.log("Payload - state",state)
            return state
            
    }
    

}

export default FilterSearchReducer; 