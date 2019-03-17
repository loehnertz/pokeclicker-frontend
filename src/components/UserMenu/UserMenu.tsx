import React, { Component } from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { User } from "../../models/user";
import { logout } from "../../store/actions/authentication";
import { State } from "../../store/types";
import './UserMenu.css';

interface UserMenuProps {
    user: User | null;
}

interface UserMenuDispatchProps {
    onLogout(): void;
}

interface ClosedState {
    closed: boolean;
}

class UserMenu extends Component<UserMenuProps & UserMenuDispatchProps, ClosedState> {
    public avatar(): string {
        const defaultAvatar = "https://en.wikipedia.org/w/skins/Vector/images/user-avatar.png?59494";
        return (this.props.user && this.props.user.avatarUri) || defaultAvatar;
    }

    public toggleMenu() {
        this.setState((state) => ({closed: !state.closed}));
    }


    public render() {
        const username = this.props.user && this.props.user.name;
        const closed = this.state ? this.state.closed : true;
        return (
            <div className={`UserMenu  ${closed ? "closed" : ""}`}>
                <div className="UserMenu-dropdown">
                    <p className="UserMenu-userdetails"
                        onClick={() => this.toggleMenu()}>
                        <img className="UserMenu-avatar" src={this.avatar()} />
                        {username}
                    </p>
                    <ul className="UserMenu-actions">
                        <li onClick={() => this.props.onLogout()}>Logout</li>
                    </ul>
                </div>
            </div>);
    }

    public componentDidMount() {
        this.setState(() => ({closed: true}));
    }
}

function mapStateToProps(state: State): UserMenuProps {
    return {
        user: state.entities.user
    };
}

function mapDispatchToProps(dispatch: Dispatch): UserMenuDispatchProps {
    return {
        onLogout: bindActionCreators(logout, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
