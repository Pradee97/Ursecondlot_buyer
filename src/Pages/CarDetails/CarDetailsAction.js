const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    MINBID: 'MINBID',
    ERROR: 'ERROR'
};

const CarDetailsAction = {
    highBid,
    minBid,
    error
};

function highBid(highBid) {
    return { type: CarDetailsConst.HIGHBID, highBid };
}

function minBid(payload) {
    return { type: CarDetailsConst.MINBID, payload };
}

function error(payload) {
    return { type: CarDetailsConst.ERROR, payload };
}

export default CarDetailsAction;