import { User, UserAction, UserActionType } from '../types';
import { Reducer } from 'redux';


const initialUser: User = {
    id: null,
    name: null,
    avatarUri: null,
    pokeDollars: null,
}
export const userReducer: Reducer<User> = (user = initialUser, action: UserAction) => {
    switch(action.type) {
        case UserActionType.SET:
            return {...action.user};
    }
    return {...user};
}


