const SearchConst = {
    SEARCHREQUEST: 'SEARCHREQUEST',
    ERROR: 'ERROR'
};

const SearchAction = {
    searchrequest,
    error
};


function searchrequest(payload) {
    return { type: SearchConst.SEARCHREQUEST, payload };
}

function error(payload) {
    return { type: SearchConst.ERROR, payload };
}

export default SearchAction;