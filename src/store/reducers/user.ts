<<<<<<< HEAD
import { Reducer } from "redux";
import { Maybe } from "../../models";
import { User } from "../../models/user";
import { UserAction, UserActionType } from "../actions/types";

export const userReducer: Reducer<Maybe<User>, UserAction> = (user = null, action) => {
=======
import { Reducer } from 'redux';
import { User } from '../../models';
import { UserAction, UserActionType } from "../actions/types";

const initialUser: User = {
    id: 0,
    name: "undefined user",
    avatarUri: null,
    pokeDollars: 0,
};


export const userReducer: Reducer<User, UserAction> = (user = initialUser, action) => {
>>>>>>> develop
    switch(action.type) {
        case UserActionType.SET:
            return {...action.user};
    }
    if(user === null) {
        return null;
    }
    return {...user};
};
