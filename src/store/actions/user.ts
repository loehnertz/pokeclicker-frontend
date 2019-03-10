import { User } from '../../models';
import { UserAction, UserActionType } from "./types";

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}
