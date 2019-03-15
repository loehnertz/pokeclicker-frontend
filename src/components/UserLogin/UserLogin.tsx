import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import { UserResource } from "../../api/api";
import { UserLoginRequest } from "../../models/user";
import { requestLogin } from "../../store/actions/authentication";
import { State } from "../../store/types";


interface UserLoginProps {
    userResource: UserResource;
}

interface UserLoginDispatchProps {
    onLoginRequest(resource: UserResource, credentials: UserLoginRequest): void;
}

class UserLogin extends Component<UserLoginProps & UserLoginDispatchProps> {
    onSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!form.reportValidity()) {
            return;
        }
        const formData = new FormData(form);
        const credentials = {
            username: formData.get('username') as string,
            password: formData.get('password') as string
        };
        this.props.onLoginRequest(this.props.userResource, credentials);
    }

    render() {
        return <form className="UserLogin" onSubmit={(e) => {
            e.preventDefault();
            this.onSubmit(e);
        }}>
            <p>
                <label>Username: <input type="text" name="username" required/></label>
            </p>
            <p>
                <label>Password: <input type="password" name="password" required/></label>
            </p>
            <p>
                <button type="submit">Login</button>
            </p>
        </form>;
    }
}

function mapStateToProps(state: State): UserLoginProps {
    return {
        userResource: new UserResource(state.globalAppState.authentication.token)
    };
}

function mapDispatchToProps(dispatch: Dispatch): UserLoginDispatchProps {
    return {
        onLoginRequest: bindActionCreators(requestLogin, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
