import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { UserResource } from "../../api/api";
import { NotificationType } from "../../models";
import { User, UserLoginRequest, UserRegistrationRequest } from "../../models/user";
import { State } from "../types";
import { notifyWithTimeout } from "./globalappstate";
import { closeBalanceSocket, closeClickingSocket, openBalanceSocket, openClickingSocket } from "./sockets";
import { AuthenticationAction, AuthenticationActionType } from "./types";
import { requestUserDetails, setUser } from "./user";

const COOKIE = 'pkclkr_creds';

function getTokenCookie(): string | null {
    const kvs = document.cookie
        .split(';')
        .map((s) => s.trim().match(/^([^=]+)=(.*)$/) || ['null', 'null'])
        .map((match) => [match[1], match[2]] as [string, string]);
    const map = new Map<string, string>(kvs);
    const cookie = map.get(COOKIE);
    return cookie == null ? null : cookie;
}

function setTokenCookie(token: string): void {
    document.cookie = `${COOKIE}=${token}`;
}


function notifyLoginSuccess(dispatch: Dispatch<AnyAction | ThunkAction<void, State, void, AnyAction>>, token: string) {
    setTokenCookie(token);
    dispatch(requestUserDetails(token));
    dispatch(authorizationTokenReceived(token));
    dispatch(openClickingSocket(token));
    dispatch(openBalanceSocket(token));
}

export function requestLogin(userResource: UserResource, userCredentials: UserLoginRequest)
: ThunkAction<void, State, void, AnyAction> {
    return async (dispatch) => {
        const response = await userResource.login(userCredentials);
        if(!response.ok) {
            dispatch(notifyWithTimeout(response.error + "", NotificationType.ERROR, 5000));
            return;
        }
        notifyLoginSuccess(dispatch, response.token);
    };
}

export function requestRegistration(resource: UserResource, user: UserRegistrationRequest)
    : ThunkAction<void, State, void, AnyAction> {

    return async (dispatch) => {
        const response = await resource.register(user);
        if(!response.ok) {
            dispatch(notifyWithTimeout(response.error + "", NotificationType.ERROR, 5000));
            return;
        }
        notifyLoginSuccess(dispatch, response.token);
    };
}

export function authorizeFromCookie(): ThunkAction<void, State, void, AnyAction> {
    return async (dispatch) => {
        const token = getTokenCookie();
        if(token == null) {
            return;
        }
        const resource = new UserResource(token);
        try {
            await resource.fetchCurrentUser();
            notifyLoginSuccess(dispatch, token);
        } catch(e) {
            // noop
        }
    };
}


export function logout(): ThunkAction<void, State, void, AnyAction> {
    return (dispatch) => {
        setTokenCookie('');
        dispatch(closeBalanceSocket());
        dispatch(closeClickingSocket());
        dispatch(authorizationTokenDestroy());
    };
}


export function authorizationTokenReceived(token: string): AuthenticationAction {
    return {
        type: AuthenticationActionType.TOKEN_RETRIEVED,
        token
    };
}

export function authorizationTokenDestroy(): AuthenticationAction {
    return {
        type: AuthenticationActionType.TOKEN_DESTROY,
    };
}
