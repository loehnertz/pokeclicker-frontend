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

class UserMenu extends Component<UserMenuProps & UserMenuDispatchProps> {

    public avatar(): string {
        const defaultAvatar = "https://en.wikipedia.org/w/skins/Vector/images/user-avatar.png?59494";
        return (this.props.user && this.props.user.avatarUri) || defaultAvatar;
    }


    public render() {
        const username = this.props.user && this.props.user.name;
        return (
            <div className="UserMenu">
                <img className="UserMenu-avatar" src={this.avatar()} />
                <p className="UserMenu-username">
                    {username} <button onClick={() => this.props.onLogout()}>Logout</button>
                </p>
            </div>);
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
