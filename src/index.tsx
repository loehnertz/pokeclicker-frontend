import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import storeReducer from './store';
import { Store, createStore } from 'redux';
import { State } from './store/types';
import { setUser } from './store/actions/user';

/* eslint-disable no-underscore-dangle */
const store: Store<State> = createStore(
    storeReducer, 
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() 
);
/* eslint-enable */

console.log(store);

store.dispatch(setUser({name: 'Jakob', id: 0, 'pokeDollars': 30, avatarUri: null}));

ReactDOM.render(<App state={store.getState()} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
