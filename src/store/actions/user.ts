import { ThunkAction } from "redux-thunk";
import { PokemonResource, UserResource } from "../../api/api";
import { NotificationType } from "../../models";
import { User } from "../../models/user";
import { State } from "../types";
import { notifyWithTimeout } from "./globalappstate";
import { setAllPokemons } from "./pokemon";
import { PokemonAction, UserAction, UserActionType } from "./types";

export function setUser(user: User): UserAction {
    return {
        type: UserActionType.SET,
        user
    };
}

export function unsetUser(): UserAction {
    return {
        type: UserActionType.UNSET
    };
}

export function requestUserDetails(token: string): ThunkAction<void, State, void, UserAction | PokemonAction> {
    return async (dispatch) => {
        try {
            const user = new UserResource(token).fetchCurrentUser();
            const pokemons = new PokemonResource(token).fetchAll();

            dispatch(setUser(await user));
            dispatch(setAllPokemons(await pokemons));
        } catch(e) {
            dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000));
        }
    };
}
