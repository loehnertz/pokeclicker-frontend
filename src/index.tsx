import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import storeReducer from './store';
import { Store, createStore, applyMiddleware, compose } from 'redux';
import { State } from './store/types';
import { setUser } from './store/actions/user';
import { asyncDispatchMiddleware } from './middleware';
import { UserResource, BoosterpackResource } from './api/api';
import { addOrReplaceBoosterpack } from './store/actions/boosterpack';
import { Provider } from 'react-redux';

/* eslint-disable no-underscore-dangle */
const store: Store<State> = createStore(
    storeReducer, 
    compose(
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(asyncDispatchMiddleware)
    )
);
/* eslint-enable */

console.log(store);

new UserResource().fetchById(1).then(user => {
    store.dispatch(setUser(user));
}).catch(e => console.error(e));

new BoosterpackResource().fetchAll().then(boosterpacks => {
    console.log(boosterpacks);
    for(const boosterpack of boosterpacks){
        store.dispatch(addOrReplaceBoosterpack(boosterpack));
    }
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
