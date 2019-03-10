import { Reducer } from "redux";
import { Maybe } from "../../models";
import { User } from "../../models/user";
import { UserAction, UserActionType } from "../actions/types";

export const userReducer: Reducer<Maybe<User>, UserAction> = (user = null, action) => {
    switch(action.type) {
        case UserActionType.SET:
            return {...action.user};
    }
    if(user === null) {
        return null;
    }
    return {...user};
};
