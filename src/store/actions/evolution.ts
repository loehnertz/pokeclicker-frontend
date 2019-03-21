import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { PokemonResource } from "../../api/api";
import { NotificationType, Pokemon } from "../../models";
import { sleep } from "../../util/async";
import { EvolutionStatus, State } from "../types";
import { notifyWithTimeout } from "./globalappstate";
import { addOrReplacePokemon, deletePokemons } from "./pokemon";
import { EvolutionAction, EvolutionActionType } from "./types";

const EVOLUTION_DURATION = 12000;

export function initiateEvolution(origin: Pokemon, evolution: Pokemon): EvolutionAction {
    return {
        type: EvolutionActionType.INITIATE,
        pokemonOrigin: origin,
        pokemonEvolution: evolution
    };
}

export function finishEvolution(): EvolutionAction {
    return {
        type: EvolutionActionType.DONE
    };
}

export function waitEvolution(): EvolutionAction {
    return {
        type: EvolutionActionType.LOCK
    };
}

export function requestPokemonMerge(resource: PokemonResource, pokemons: [Pokemon, Pokemon, Pokemon])
    : ThunkAction<void, State, void, AnyAction> {

    if(!pokemons.every((pkmn) => pkmn.pokeNumber === pokemons[0].pokeNumber)) {
        throw new Error("Only pokemon of the same type can be merged.");
    }
    return async (dispatch, getState) => {
        const currentState = getState().globalAppState.evolutionState;
        if(currentState.status !== EvolutionStatus.NONE) {
            return;
        }
        dispatch(waitEvolution());
        try {
            const pokemon = await resource.merge({pokemons});
            dispatch(deletePokemons(pokemons));
            dispatch(initiateEvolution(pokemons[0], pokemon));
            await sleep(EVOLUTION_DURATION);
            dispatch(finishEvolution());
            dispatch(addOrReplacePokemon(pokemon));
        } catch(e) {
            handleError(dispatch, e);
            dispatch(finishEvolution());
        }
    };
}

function handleError(dispatch: ThunkDispatch<State, void, AnyAction>, error: any) {
    dispatch(notifyWithTimeout(error + "", NotificationType.ERROR, 5000));

    // tslint:disable-next-line: no-console
    console.error(error);
}
