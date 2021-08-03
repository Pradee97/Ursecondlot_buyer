const CarListConst = {
    SELLERID: 'SELLERID',
    ERROR: 'ERROR'
};

const CarListAction = {
    sellerid,
    error
};


function sellerid(payload) {
    return { type: CarListConst.SELLERID, payload };
}

function error(payload) {
    return { type: CarListConst.ERROR, payload };
}

export default CarListAction;