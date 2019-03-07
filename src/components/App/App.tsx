import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { State } from '../../store/types';
import StoreFront from '../Store/StoreFront';
import { connect, MapDispatchToPropsNonObject } from 'react-redux';
import { Dispatch } from 'redux';


function isState(state: any): state is State {
    return state instanceof Object && state.hasOwnProperty('entities');
}

class App extends Component {
    render() {
        if (!isState(this.props)) {
            return <div className="App"><p>Redux state is missing</p></div>
        }
        
        const notifications = this.props.globalAppState.notifications.map(n => 
            <div className={`notification notification-${n.notificationType}`}>{n.message}</div>
        );

        return (
            <div className="App">
                <div className="Notifications">{notifications}</div>
                <main>
                    <StoreFront />
                </main>
            </div>
        );
    }
}

function mapStateToProps(state: State){
    return state;
}

function mapDispatchToProps(dispatch: Dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
