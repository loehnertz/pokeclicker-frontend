import { User, UserAction, UserActionType } from '../types';

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}
