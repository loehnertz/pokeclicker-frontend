import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AnyAction, applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
import App from "./components/App/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import storeReducer from "./store";
import { State } from "./store/types";

import thunk, { ThunkDispatch } from "redux-thunk";
import { loadAllBoosterpacks } from "./store/actions/boosterpack";

function createEnhancers(): StoreEnhancer<{dispatch: ThunkDispatch<State, undefined, AnyAction>}> {
    const reduxtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

    const middleware = applyMiddleware(
        thunk
    );
    return compose(middleware, reduxtools);
}

const store = createStore(
    storeReducer,
    createEnhancers()
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

store.dispatch(loadAllBoosterpacks());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
