import { ThunkAction } from "redux-thunk";
import { AppNotification, NotificationType } from "../../models";
import { State } from "../types";
import { AppNotificationAction, NotificationActionType } from './types';

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
