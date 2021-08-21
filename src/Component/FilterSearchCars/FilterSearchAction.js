const FilterSearchConst = {
    SEARCHREQUEST: 'SEARCHREQUEST',
    SEARCHRESULT: 'SEARCHRESULT',
    ERROR: 'ERROR'
};

const FilterSearchAction = {
    searchrequest,
    searchresult,
    error
};


function searchrequest(payload) {
    return { type: SearchConst.SEARCHREQUEST, payload };
}
function searchresult(payload) {
    return { type: SearchConst.SEARCHRESULT, payload };
}
function error(payload) {
    return { type: SearchConst.ERROR, payload };
}

export default FilterSearchAction;