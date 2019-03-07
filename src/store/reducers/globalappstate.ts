import { Reducer, combineReducers } from "redux";
import { Notifications, GlobalAppState } from "../types";
import { AppNotificationAction, NotificationActionType } from "../actions/types";


const errorNotificationReducer: Reducer<Notifications, AppNotificationAction> = (notifications = [], action) => {
    switch(action.type){
        case NotificationActionType.NOTIFY:
            return ([] as Notifications).concat(notifications, {...action.notification});
        case NotificationActionType.WITHDRAW:
            return notifications.filter(n => n.id != action.notification.id);
    }
    return Array.from(notifications);
}

export default combineReducers({
    notifications: errorNotificationReducer
}) as Reducer<GlobalAppState>;
