import React, { Component } from "react";
import { connect, MapDispatchToPropsNonObject } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../store/types";
import StoreFront from "../StoreFront/StoreFront";
import UserRegistration from "../UserRegistration/UserRegistration";
import "./App.css";
import logo from "./logo.svg";

function isState(state: any): state is State {
    return state instanceof Object && state.hasOwnProperty("entities");
}

class App extends Component {
    public render() {
        if (!isState(this.props)) {
            return <div className="App"><p>Redux state is missing</p></div>;
        }

        const notifications = this.props.globalAppState.notifications.map((n) =>
            <div className={`notification notification-${n.notificationType}`}>{n.message}</div>
        );

        let mode;
        if(this.props.globalAppState.authentication.token === null) {
            mode = <UserRegistration/>;
        } else {
            mode = <StoreFront />;
        }
        return (
            <div className="App">
                <div className="Notifications">{notifications}</div>
                <main>
                    {mode}
                </main>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return state;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
