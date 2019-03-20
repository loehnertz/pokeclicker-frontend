import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AnyAction, applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { BoosterpackResource } from "./api/api";
import App from "./components/App/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import storeReducer from "./store";
import { authorizeFromCookie } from "./store/actions/authentication";
import { loadAllBoosterpacks } from "./store/actions/boosterpack";
import { State } from "./store/types";
import webSocketMiddleware from "./websocketmiddleware";

function windowHasReduxTools(window: Window)
    : window is Window & {__REDUX_DEVTOOLS_EXTENSION__: (...args: any[]) => any} {

    return typeof (window as any).__REDUX_DEVTOOLS_EXTENSION__ === "function";
}

function createEnhancers(): StoreEnhancer<{dispatch: ThunkDispatch<State, undefined, AnyAction>}> {
    const middleware = applyMiddleware(
        thunk,
        webSocketMiddleware
    );
    if(windowHasReduxTools(window)) {
        const reduxtools = window.__REDUX_DEVTOOLS_EXTENSION__();
        return compose(middleware, reduxtools);
    }
    return middleware;
}

const store = createStore(
    storeReducer,
    createEnhancers()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

store.dispatch(loadAllBoosterpacks(new BoosterpackResource()));
store.dispatch(authorizeFromCookie());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

interface IThingy { 
}

function IsThingy(x: IThingy){
    if(x == "[object Object]") return true;
}
