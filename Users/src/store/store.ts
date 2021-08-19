import { GlobalStore} from "redux-micro-frontend";
import { createStore, compose, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

function configureStore(){
    // @ts-ignore
    const composeEhances = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
    const enhancer = composeEhances(applyMiddleware(thunk));
    const globalStore = GlobalStore.Get();
    //create users store
    const store = createStore(reducers(), enhancer)
    // @ts-ignore
    globalStore.RegisterStore("spaApp", store)

    return globalStore;

}

export const store = configureStore();


