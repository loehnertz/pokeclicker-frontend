import { Reducer } from "redux";
import { User } from "../../models/user";
import { UserAction, UserActionType, WebSocketAction, WebSocketActionType } from "../actions/types";

export const userReducer: Reducer<User | null, UserAction | WebSocketAction> = (user = null, action) => {
    switch(action.type) {
        case UserActionType.SET:
            return {...action.user};
    }
    if(user === null) {
        return null;
    }

    switch(action.type) {
        case WebSocketActionType.RECEIVE:
            if(action.name === "balance") {
                return {...user, pokeDollars: parseInt(action.message, 10)};
            }
            break;
    }

    return {...user};
};
