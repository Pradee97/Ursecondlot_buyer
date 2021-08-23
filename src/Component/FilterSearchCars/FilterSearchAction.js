const FilterSearchConst = {
    SEARCHREQUEST: 'SEARCHREQUEST',
    SEARCHRESULT: 'SEARCHRESULT',
    APINAME:    'APINAME',
    ERROR: 'ERROR'
};

const FilterSearchAction = {
    searchrequest,
    searchresult,
    apiname,
    error
};


function searchrequest(payload) {
    return { type: SearchConst.SEARCHREQUEST, payload };
}
function searchresult(payload) {
    return { type: SearchConst.SEARCHRESULT, payload };
}
function apiname(payload) {
    return { type: SearchConst.APINAME, payload };
}
function error(payload) {
    return { type: SearchConst.ERROR, payload };
}

export default FilterSearchAction;