import { BoosterpackResource } from "../../api/api";
import { Boosterpack, NotificationType } from '../../models';
import { notifyWithTimeout } from "./globalappstate";
import { addOrReplacePokemon } from "./pokemon";
import { BoosterpackAction, BoosterpackActionType, BoosterpackThunk, PokemonAction, PokemonThunk } from "./types";

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
    return (dispatch) => {
        resource.buy(id).then((pokemons) => {
            for(const pokemon of pokemons) {
                dispatch(addOrReplacePokemon(pokemon));
            }
        }).catch((e) => dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000)));
    };
}
