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
                const [msgBalance, msgRate] = action.message.split(",");
                const balance = parseInt(msgBalance, 10);
                const rate = parseInt(msgRate, 10);
                return {...user, pokeDollars: balance, pokeDollarRate: rate, lastBalanceTimestamp: Date.now()};
            }
            break;
        case WebSocketActionType.CLOSED:
            return null;
    }

    return {...user};
};
