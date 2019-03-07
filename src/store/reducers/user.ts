import { User } from '../../models';
import { UserAction, UserActionType } from "../actions/types";
import { Reducer } from 'redux';

const initialUser: User = {
    id: 0,
    name: "undefined user",
    avatarUri: null,
    pokeDollars: 0,
}


export const userReducer: Reducer<User, UserAction> = (user = initialUser, action) => {
    switch(action.type) {
        case UserActionType.SET:
            return {...action.user};
    }
    return {...user};
}
