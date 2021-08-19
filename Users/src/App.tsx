import React, {SyntheticEvent, useEffect, useState} from 'react';
import './App.css';
import {store} from "./store/store";
import { CircularProgress} from "@material-ui/core";
import {updateObject} from "./store/actions/utility";
import SignIn from "./Components/LoginForm";
import {makeStyles} from "@material-ui/core/styles";
import { AlertTitle, Alert} from "@material-ui/lab";
import * as globalactions from "./store/actions/global.actionsCreator";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const initialUserState = {
    token: "",
    error: {},
    loading: false,
    authFail: {
        try:false,
        hw:0,
        payload: {}
    },
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
function App() {
    const [state, setState] = useState<IState["user"]>(initialUserState)
    useEffect(() => {
        setState((state) : IState["user"] => {
            console.log("store dans le useEffect", store.GetGlobalState()["spaApp"]["userAuth"])
            return store.GetGlobalState()["spaApp"]["userAuth"]
        })

    },[store.GetGlobalState()["spaApp"]["userAuth"]])

    const handleLogin = (e: SyntheticEvent, username: string, password: string) => {
        e.preventDefault()
        // @ts-ignore
        globalactions.authLogin(username, password)
        setState((state) : IState["user"] => {
            console.log("store apres le submit",store.GetGlobalState()["spaApp"]["userAuth"])
            return store.GetGlobalState()["spaApp"]["userAuth"]
        })
    }
    const classes=useStyles()
    return (
    <div className="App">
        <h1 className={classes.paper}>composant qui gère l'authentification et les users dans l'ensemble</h1>
        <div className="{classes.paper}">
            <h3> { state.authFail?.hw}</h3>
            <h3> { state.authFail?.try}</h3>
            <h3> { Object.values(state.error)}</h3>
            <h3> { state.token}</h3>
        </div>
        


        {/*{ !state.authFail && <div className={classes.paper}><Alert severity="error">*/}
        {/*    <AlertTitle>Error - Authentification fail</AlertTitle>*/}
        {/*    Wrong id — <strong>check it out!</strong>*/}
        {/*</Alert></div>*/}
        {/*}*/}
        {/*{ !state.isAuthenticate && <div className={classes.paper}><Alert severity="success">*/}
        {/*    <AlertTitle>Authentification Reussie</AlertTitle>*/}
        {/*</Alert></div>*/}
        {/*}*/}
        {/*{*/}
        {/*    loading ? <div className={classes.paper}><CircularProgress /></div> :*/}
                <SignIn handleLogin={handleLogin}/>
        {/*}*/}

    </div>
  );
}

export default App;
