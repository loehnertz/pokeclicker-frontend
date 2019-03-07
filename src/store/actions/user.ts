import { UserAction, UserActionType } from "./types";
import { User } from '../../models';

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}
