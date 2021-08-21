const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    ERROR: 'ERROR'
};

const CarDetailsAction = {
    highBid,
    error
};

function highBid(payload) {
    return { type: CarDetailsConst.HIGHBID, payload };
}

function error(payload) {
    return { type: CarDetailsConst.ERROR, payload };
}

export default CarDetailsAction;