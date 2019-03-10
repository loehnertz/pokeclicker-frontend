import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { UserResource } from "../../api/api";
import { AppNotification, NotificationType } from "../../models";
import { UserRegistrationRequest } from "../../models/user";
import { State } from "../types";
import { AppNotificationAction, AuthenticationAction, AuthenticationActionType, NotificationActionType } from './types';

let autoincrement = 0;

function createNotification(message: string, notificationType: NotificationType): AppNotification {
    return {
        id: autoincrement++,
        message,
        notificationType
    };
}

export function notifyWithTimeout(
    message: string,
    notificationType: NotificationType,
    timeout: number
): ThunkAction<void, State, void, AppNotificationAction> {

    return (dispatch) => {
        const notification = createNotification(message, notificationType);
        dispatch(notify(notification));
        setTimeout(() => dispatch(withdraw(notification)), timeout);
    };
}

export function notify(notification: AppNotification): AppNotificationAction {
    return {
        type: NotificationActionType.NOTIFY,
        notification
    };
}

export function withdraw(notification: AppNotification): AppNotificationAction {
    return {
        type: NotificationActionType.WITHDRAW,
        notification
    };
}

export function loginSuccess(token: string): AuthenticationAction {
    return {
        type: AuthenticationActionType.TOKEN_RETRIEVED,
        token
    };
}

export function requestRegistration(resource: UserResource, user: UserRegistrationRequest)
    : ThunkAction<void, State, void, AuthenticationAction> {

    return async (dispatch) => {
        const response = await resource.register(user);
        if(!response.ok) {
            dispatch(notifyWithTimeout(response.error + "", NotificationType.ERROR, 5000));
        }
        const r = response as {ok: true, token: string};
        const token = r.token;
        dispatch(loginSuccess(token));
    };
}
