import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../store/types";
import Clicking from "../Clicking/Clicking";
import Pokemon from "../Pokemon/Pokemon";
import StoreFront from "../StoreFront/StoreFront";
import UserLogin from "../UserLogin/UserLogin";
import UserMenu from "../UserMenu/UserMenu";
import UserRegistration from "../UserRegistration/UserRegistration";
import "./App.css";

enum Mode {
    login = "login",
    closing = "closing",
    disconnected = "disconnected",
    online = "online"
}

class App extends Component<State | null> {

    private currentMode(): Mode {
        if (this.props.globalAppState.authentication.token === null) {
            if(this.props.globalAppState.openSockets.length > 0) {
                return Mode.closing;
            }
            return Mode.login;
        }
        if(this.props.entities.user === null) {
            return Mode.disconnected;
        }
        return Mode.online;
    }

    componentDidMount() {
        document.title = "Login - PokéClicker";
    }

    public render() {
        const notifications = this.props.globalAppState.notifications.map((n) =>
            <div className={`notification notification-${n.notificationType}`}>{n.message}</div>
        );

        let contents;
        switch(this.currentMode()) {
            case Mode.login:
                contents = <div className="App-welcome"><UserRegistration/><UserLogin/></div>;
                break;
            case Mode.closing:
                contents = <div className="App-welcome"><p>Closing connection...</p></div>;
                break;
            case Mode.disconnected:
                contents = (
                    <div className="App-welcome">
                    <p>Connection to the server was lost. Do you have another tab open?</p>
                </div>);
                break;
            case Mode.online:
                contents = (
                        <div className="Game">
                            <Pokemon/>
                            <Clicking/>
                            <StoreFront/>
                        </div>);
                break;
        }
        return (
            <div className="App">
                <div className="Notifications">{notifications}</div>
                <UserMenu/>
                <main>
                    {contents}
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
