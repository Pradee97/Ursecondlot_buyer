const CarListConst = {
    SELLERID: 'SELLERID',
    COUNTERBID: 'COUNTERBID',
    ERROR: 'ERROR'
};

const CarListAction = {
    sellerid,
    counterbid,
    error
};


function sellerid(payload) {
    return { type: CarListConst.SELLERID, payload };
}

function counterbid(payload) {
    return { type: CarListConst.COUNTERBID, payload };
}

function error(payload) {
    return { type: CarListConst.ERROR, payload };
}

export default CarListAction;