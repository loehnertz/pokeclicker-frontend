import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { BoosterpackResource } from "../../api/api";
import { Boosterpack, NotificationType, Pokemon } from '../../models';
import { sleep } from "../../util/async";
import { State } from "../types";
import { notifyWithTimeout, setPage } from "./globalappstate";
import { addOrReplacePokemon, showcaseAddPokemon, showcaseRemovePokemon } from "./pokemon";
import { BoosterpackAction, BoosterpackActionType, BoosterpackThunk, PokemonAction, StoragePageAction } from "./types";

const SHOWCASE_DURATION = 2000;
const SHOWCASE_BUILDUP = 500;

export function addOrReplaceBoosterpack(boosterpack: Boosterpack): BoosterpackAction {
    return {
        type: BoosterpackActionType.ADD_OR_UPDATE,
        boosterpack
    };
}

export function clearBoosterpacks(): BoosterpackAction {
    return {
        type: BoosterpackActionType.CLEAR_ALL
    };
}


export function loadAllBoosterpacks(resource: BoosterpackResource): BoosterpackThunk  {
    return async (dispatch) => {
        let loaded = false;
        for(let i = 0; !loaded; i++) {
            try {
                const boosterpacks = await resource.fetchAll();
                loaded = true;
                for(const pack of boosterpacks) {
                    dispatch(addOrReplaceBoosterpack(pack));
                }
            } catch(e) {
                if(i === 0) {
                    dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000));
                }
            }
            await sleep(500);
        }
    };
}

export function buyBoosterpack(resource: BoosterpackResource, id: number)
    : ThunkAction<void, State, void, PokemonAction | StoragePageAction> {

    return async (dispatch, getState) => {
        try {
            const buildup = sleep(SHOWCASE_BUILDUP);
            const pokemons = await resource.buy(id);

            await buildup;

            const addAnimations = pokemons.map(async (pokemon, i) => {
                await pokemonAddAnimation(dispatch, pokemon, id, i);
                dispatch(setPage(Math.floor(getState().entities.pokemons.allIds.length / 64)));
            });

            await Promise.all(addAnimations);

        } catch (e) {
            dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000));
        }

    };
}

async function pokemonAddAnimation(dispatch: Dispatch, pokemon: Pokemon, packId: number, i: number) {
    await sleep(400 * i);
    dispatch(showcaseAddPokemon(pokemon, packId));
    await sleep(SHOWCASE_DURATION);
    dispatch(showcaseRemovePokemon(pokemon));
    dispatch(addOrReplacePokemon(pokemon));
}
