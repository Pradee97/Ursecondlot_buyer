const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    MINBID: 'MINBID',
    SAVEPURCHASE: 'SAVEPURCHASE',
    ERROR: 'ERROR'
};

const CarDetailsAction = {
    highBid,
    minBid,
    savePurchase,
    error
};

function highBid(payload) {
    return { type: CarDetailsConst.HIGHBID, payload };
}

function minBid(payload) {
    return { type: CarDetailsConst.MINBID, payload };
}

function savePurchase(payload) {
    return { type: CarDetailsConst.SAVEPURCHASE, payload };
}

function error(payload) {
    return { type: CarDetailsConst.ERROR, payload };
}

export default CarDetailsAction;