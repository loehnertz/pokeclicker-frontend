<<<<<<< HEAD
import { User } from "../../models/user";
=======
import { User } from '../../models';
>>>>>>> develop
import { UserAction, UserActionType } from "./types";

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}
