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
    return { type: FilterSearchConst.SEARCHREQUEST, payload };
}
function searchresult(payload) {
    return { type: FilterSearchConst.SEARCHRESULT, payload };
}
function apiname(payload) {
    return { type: FilterSearchConst.APINAME, payload };
}
function error(payload) {
    return { type: FilterSearchConst.ERROR, payload };
}

export default FilterSearchAction;