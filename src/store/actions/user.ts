import { ThunkAction } from "redux-thunk";
import { PokemonResource, UserResource } from "../../api/api";
import { User } from "../../models/user";
import { State } from "../types";
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
        const user = await new UserResource(token).fetchCurrentUser();
        dispatch(setUser(user));
        const pokemons = await new PokemonResource(token).fetchAll();
        dispatch(setAllPokemons(pokemons));
    };
}
