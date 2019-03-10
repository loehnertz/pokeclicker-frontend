import { ThunkAction } from "redux-thunk";
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


export function loadAllBoosterpacks(): BoosterpackThunk  {
    return (dispatch) => {
        new BoosterpackResource().fetchAll().then((packs) => {
            for(const pack of packs) {
                dispatch(addOrReplaceBoosterpack(pack));
            }
        }).catch((e) => dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000)));
    };
}

export function buyBoosterpack(id: number): PokemonThunk {
    return (dispatch) => {
        new BoosterpackResource().buy(id).then((pokemons) => {
            for(const pokemon of pokemons) {
                dispatch(addOrReplacePokemon(pokemon));
            }
        }).catch((e) => dispatch(notifyWithTimeout(e.toString(), NotificationType.ERROR, 5000)));
    };
}
