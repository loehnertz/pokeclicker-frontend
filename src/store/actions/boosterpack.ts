import { BoosterpackAction, BoosterpackActionType, BoosterpackThunk } from "./types";
import { Boosterpack } from '../../models';
import { BoosterpackResource } from "../../api/api";

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
        new BoosterpackResource().fetchAll().then(packs => {
            for(const pack of packs){
                dispatch(addOrReplaceBoosterpack(pack));
            }
        })
    }
}