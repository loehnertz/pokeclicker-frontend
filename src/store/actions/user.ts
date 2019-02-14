import { User, UserAction, UserActionType } from '../types';


function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}
