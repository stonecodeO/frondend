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
// @ts-ignore
export const updateObject = (oldObject, updateProperties: object | IState["user"]) : object | IState["user"]=> {
    const newState = {
        ...oldObject,
        ...updateProperties
    }
    console.log("old state:", newState)
    console.log("update object:", newState)
    return newState
}
