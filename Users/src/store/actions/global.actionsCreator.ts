import axios from 'axios';
import * as actionTypes from './actionsTypes';
import {store} from "../store";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
        payload: null
    }
}
export const authSuccess = (token: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: token
    }
}


export const authFail = (error: object)=> {
    return {
        type: actionTypes.AUTH_FAIL,
        payload: error
    }
}
export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT,
        payload: null
    }
}

const checkAuthTimeout = (expirationTime: number) => {
    return setTimeout(() => {
        store.DispatchAction("spaApp", logout())
    }, expirationTime * 1000)
}
export const authLogin = (username: string, password: string) => {
    store.DispatchAction("spaApp", authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        username: username,
        password: password
    }).then (res => {
        console.log(res)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600*1000);
        localStorage.setItem('token', token)
        // @ts-ignore
        localStorage.setItem('expirationDate', expirationDate);
        store.DispatchAction("spaApp", authSuccess(token));
        checkAuthTimeout(3600);

    }).catch(err => {
        store.DispatchAction("spaApp", authFail(err))
    })
}
export const authCheckUSerStatus= () => {
    const token = localStorage.getItem('token');
    if(token === null){
        store.DispatchAction("spaApp", logout());
    } else {
        // @ts-ignore
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if (expirationDate <= new Date()) {
            store.DispatchAction("spaApp", logout());
        } else {
            // @ts-ignore
            store.DispatchAction("spaApp", authSuccess(token));
            checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000));
        }
    }
}