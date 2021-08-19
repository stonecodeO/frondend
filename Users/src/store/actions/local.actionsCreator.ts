import * as actionTypes from './actionsTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token: string )=> {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}
export const authFail = (error: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        error: error
    }
}
export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}




