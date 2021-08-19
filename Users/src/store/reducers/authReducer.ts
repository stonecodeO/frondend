import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../actions/utility';

const initialUserState = {
    token: "",
    error: <object>{},
    loading:false,
    authFail:{
        try:false,
        hw:0,
        payload: <object>{}
    }
}

interface IAuthFail{
    authFail:{
        try?:boolean,
        hw: number
        payload: object
    }
}
interface IState{
    user:{
        token: string,
        error: object,
        loading: boolean,
        authFail?: IAuthFail["authFail"]
    },

}

const authStart = (state: IState["user"], action: any) => {
    return updateObject(state, {
        error: {},
        loading: true,
        authFail:{
            qte: 1,
            payload: action.payload
        }
    });
}
const authSuccess = (state: IState["user"], action: { token: any; }) => {
    return updateObject(state, {
        token: action.token,
        error:{},
        loading: false
    });
}
const authFail = (state:IState["user"], action: { error: any; }) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}
const authLogout = (state: IState["user"], action: any) => {
    return updateObject(state, {
        token: "null",
    });
}
const reducer = (state = initialUserState, action: { type?: any; token?: any; error?: any; }) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            // @ts-ignore
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            // @ts-ignore
            return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state,action);
        default:
            return state;

    }
}

export default reducer
