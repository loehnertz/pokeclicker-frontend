import { Component, Dispatch, FormEvent } from "react";
import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";
import { UserResource } from "../../api/api";
import { NotificationType } from "../../models";
import { UserRegistrationRequest } from "../../models/user";
import { notifyWithTimeout, requestRegistration } from "../../store/actions/globalappstate";
import { State } from "../../store/types";

interface UserRegistrationProps {
    userResource: UserResource;
}

interface UserRegistrationDispatchProps {
    onNotifyDispatchProps(message: string, notificationType: NotificationType, timeout: number): any;
    onRegister(resource: UserResource, user: UserRegistrationRequest): any;
}

class UserRegistration extends Component<UserRegistrationProps & UserRegistrationDispatchProps> {

    public onSubmit(e: FormEvent<HTMLFormElement>) {
        const form = e.target as HTMLFormElement;
        const valid = form.reportValidity();
        if(!valid) { return; }

        const formdata = new FormData(form);
        const formentries = Array.from(formdata.entries()).map(([k, v]) => ({[k]: v}));
        const user: UserRegistrationRequest = Object.assign({}, ...formentries);
        this.props.onRegister(this.props.userResource, user);
    }

    public render() {
        return <form className="UserRegistration" onSubmit={(e) => {e.preventDefault(); this.onSubmit(e); }}>
        <p>
           <label>Username: <input type="text" name="username" required/></label>
        </p>
        <p>
            <label>Email: <input type="email" name="email" required/></label>
        </p>
        <p>
            <label>Password: <input type="password" name="password" required/></label>
        </p>
        <p>
            <button type="submit">Register</button>
        </p>
        </form>;
    }

}

function mapStateToProps(state: State): UserRegistrationProps {
    return {
        userResource: new UserResource(state.globalAppState.authentication.token)
    }
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>, props: any): UserRegistrationDispatchProps {
    return {
        onNotifyDispatchProps: bindActionCreators(notifyWithTimeout as any, dispatch as any),
        onRegister: bindActionCreators(requestRegistration as any, dispatch as any)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
