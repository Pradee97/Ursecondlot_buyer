const CarDetailsConst = {
    HIGHBID: 'HIGHBID',
    ERROR: 'ERROR'
};

const CarDetailsAction = {
    cardetails,
    error
};


function cardetails(payload) {
    return { type: CarDetailsConst.HIGHBID, payload };
}

function error(payload) {
    return { type: CarDetailsConst.ERROR, payload };
}

export default CarDetailsAction;