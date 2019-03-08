import { UserAction, UserActionType } from "./types";
import { User } from "../../models/user";

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}
