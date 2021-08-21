export const FilterSearchConst = {
    SEARCHREQUEST: 'SEARCHREQUEST',
    SEARCHRESULT:   'SEARCHRESULT',
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
                search: 'filtersearch-searchrequest',
                payload: action.payload

            };
        case FilterSearchConst.SEARCHRESULT:
            console.log("inside success reducer")
            console.log("Payload",action)
            return {
                search: 'filtersearch-searchresult',
                payload: action.payload

            };
        case FilterSearchConst.ERROR:
            console.log("inside err reducer")
            console.log("Payload",action.payload)
            return {
                search: 'filtersearch-fail',
                payload: action.payload
            };
        default:
            console.log("Inside default of the reducer");
            console.log("Payload - state",state)
            return state
            
    }
    

}

export default FilterSearchReducer; 