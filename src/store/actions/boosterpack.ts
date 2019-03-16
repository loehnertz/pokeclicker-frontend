import { Dispatch } from "redux";
import { BoosterpackResource } from "../../api/api";
import { Boosterpack, NotificationType, Pokemon } from '../../models';
import { notifyWithTimeout } from "./globalappstate";
import { addOrReplacePokemon, showcaseAddPokemon, showcaseRemovePokemon } from "./pokemon";
import { BoosterpackAction, BoosterpackActionType, BoosterpackThunk, PokemonThunk } from "./types";

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
    return (dispatch) => {
        resource.fetchAll().then((packs) => {
            for(const pack of packs) {
                dispatch(addOrReplaceBoosterpack(pack));
            }
        }).catch((e) => dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000)));
    };
}

export function buyBoosterpack(resource: BoosterpackResource, id: number): PokemonThunk {
    return async (dispatch) => {
        try {
            const buildup = sleep(SHOWCASE_BUILDUP);
            const pokemons = await resource.buy(id);

            await buildup;

            const addAnimations = pokemons.map(async (pokemon, i) => {
                await pokemonAddAnimation(dispatch, pokemon, id, i);
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

async function sleep(n: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, n));
}
