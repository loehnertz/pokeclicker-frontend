import { UserResource } from "../../api/api";
import { User } from "../../models/user";
import { UserAction, UserActionType, UserThunk } from "./types";

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}


export function requestUserDetails(token: string): UserThunk {
    return async (dispatch) => {
        const user = await new UserResource(token).fetchCurrentUser();
        dispatch(setUser(user));
    };
}
