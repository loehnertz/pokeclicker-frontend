import { combineReducers, Reducer } from "redux";
import { AppNotificationAction, AuthenticationAction, AuthenticationActionType, NotificationActionType } from "../actions/types";
import { AuthenticationState, GlobalAppState, Notifications } from "../types";

const authenticationReducer: Reducer<AuthenticationState, AuthenticationAction> = (state = {token: null}, action) => {
    if(action.type === AuthenticationActionType.TOKEN_RETRIEVED) {
        return {token: action.token};
    }
    return {...state};
};


const errorNotificationReducer: Reducer<Notifications, AppNotificationAction> = (notifications = [], action) => {
    switch(action.type) {
        case NotificationActionType.NOTIFY:
            return ([] as Notifications).concat(notifications, {...action.notification});
        case NotificationActionType.WITHDRAW:
            return notifications.filter((n) => n.id != action.notification.id);
    }
    return Array.from(notifications);
};

export default combineReducers({
    authentication: authenticationReducer,
    notifications: errorNotificationReducer
}) as Reducer<GlobalAppState>;
