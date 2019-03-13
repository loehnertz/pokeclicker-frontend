import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { UserResource } from "../../api/api";
import { NotificationType } from "../../models";
import { UserLoginRequest, UserRegistrationRequest } from "../../models/user";
import { State } from "../types";
import { notifyWithTimeout } from "./globalappstate";
import { AuthenticationAction, AuthenticationActionType } from "./types";


export function requestLogin(userResource: UserResource, userCredentials: UserLoginRequest)
: ThunkAction<void, State, void, AnyAction> {
    return async (dispatch) => {
        const response = await userResource.login(userCredentials);
        if(!response.ok) {
            dispatch(notifyWithTimeout(response.error + "", NotificationType.ERROR, 5000));
            return;
        }
        const token = response.token;
        dispatch(authorizationTokenReceived(token));
    };
}

export function requestRegistration(resource: UserResource, user: UserRegistrationRequest)
    : ThunkAction<void, State, void, AuthenticationAction> {

    return async (dispatch) => {
        const response = await resource.register(user);
        if(!response.ok) {
            dispatch(notifyWithTimeout(response.error + "", NotificationType.ERROR, 5000));
            return;
        }
        const token = response.token;
        dispatch(authorizationTokenReceived(token));
    };
}

export function authorizationTokenReceived(token: string): AuthenticationAction {
    return {
        type: AuthenticationActionType.TOKEN_RETRIEVED,
        token
    };
}
