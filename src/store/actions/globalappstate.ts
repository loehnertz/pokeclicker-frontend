import { ThunkAction } from "redux-thunk";
import { AppNotification, NotificationType } from "../../models";
import { sleep } from "../../util/async";
import { State } from "../types";
import { AppNotificationAction, NotificationActionType, StoragePageAction, StoragePageActionType } from './types';

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
    return async (dispatch) => {
        const notification = createNotification(message, notificationType);
        dispatch(notify(notification));
        await sleep(timeout);
        dispatch(withdraw(notification));
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

export function incrPage(): StoragePageAction {
    return {
        type: StoragePageActionType.INCR
    };
}

export function decrPage(): StoragePageAction {
    return {
        type: StoragePageActionType.DECR
    };
}

export function setPage(page: number): StoragePageAction {
    return {
        type: StoragePageActionType.SET,
        page
    };
}
