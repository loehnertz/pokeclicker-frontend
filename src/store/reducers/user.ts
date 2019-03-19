import { Reducer } from "redux";
import { User } from "../../models/user";
import { UserAction, UserActionType, WebSocketAction, WebSocketActionType } from "../actions/types";

interface KeyValuePair {key: string; value: string; }

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
            if(action.name === "balance" && action.message) {
                const keyvalue = toKeyValuePair(action.message);
                if(keyvalue != null) {
                    return handleKeyValuePair(user, keyvalue);
                }

                // legacy
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

function handleKeyValuePair(user: User | null, message: KeyValuePair): User | null {
    if(user == null) {
        return null;
    }
    const intValue = parseInt(message.value, 10);
    switch(message.key) {
        case "balance":
            return {...user, pokeDollars: intValue};
        case "rate":
            return {...user, pokeDollarRate: intValue };
    }
    return {...user};
}

function toKeyValuePair(data: string): KeyValuePair | null {
    const match = data.match(/^(\w+):(.*)$/);
    if(match) {
        return {key: match[1], value: match[2]};
    }
    return null;
}
