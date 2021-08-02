const LoginConst = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

const LoginAction = {
    success,
    error
};


function success(payload) {
    return { type: LoginConst.SUCCESS, payload };
}

function error(payload) {
    return { type: LoginConst.ERROR, payload };
}

export default LoginAction;