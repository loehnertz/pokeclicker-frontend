import { Component, Dispatch, FormEvent } from "react";
import { connect } from "react-redux";
import React from "react";
import { bindActionCreators, Action, AnyAction } from "redux";
import { notifyWithTimeout } from "../../store/actions/globalappstate";
import { NotificationType } from "../../models";

interface UserRegistrationDispatchProps {
    onNotifyDispatchProps(message: string, notificationType: NotificationType, timeout: number): any;
}

class UserRegistration extends Component<UserRegistrationDispatchProps> {

    onSubmit(e: FormEvent<HTMLFormElement>){
        const formdata = new FormData(e.target as HTMLFormElement);
    }

    render(){
        return <form className="UserRegistration" onSubmit={e => {e.preventDefault(); this.onSubmit(e);}}>
        <p>
           <label>Username: <input type="text" name="username"/></label>
        </p>
        <p>
            <label>Email: <input type="email" name="email"/></label>
        </p>
        <p>
            <label>Password: <input type="password" name="password"/></label>
        </p>
        <p>
            <button type="submit">Register</button>
        </p>
        </form>
    }
    
}


function mapDispatchToProps(dispatch: Dispatch<AnyAction>): UserRegistrationDispatchProps{
    return {
        onNotifyDispatchProps: bindActionCreators(notifyWithTimeout as any, dispatch as any)
    }
}

export default connect(() => {}, mapDispatchToProps)(UserRegistration);