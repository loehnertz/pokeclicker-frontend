import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../store/types";
import Clicking from "../Clicking/Clicking";
import StoreFront from "../StoreFront/StoreFront";
import UserLogin from "../UserLogin/UserLogin";
import UserRegistration from "../UserRegistration/UserRegistration";
import "./App.css";


class App extends Component<State | null> {
    componentDidMount() {
        document.title = "Login - PokéClicker";
    }

    public render() {
        const notifications = this.props.globalAppState.notifications.map((n) =>
            <div className={`notification notification-${n.notificationType}`}>{n.message}</div>
        );

        let mode;
        if (this.props.globalAppState.authentication.token === null) {
            mode = <div className="App-welcome"><UserRegistration/><UserLogin/></div>;
        } else {
            mode = (
                <div className="Game">
                    <Clicking/>
                    <StoreFront/>
                </div>
            );
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

function mapStateToProps(state: State): State {
    return state;
}

function mapDispatchToProps(dispatch: Dispatch): {} {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
