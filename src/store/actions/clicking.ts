import { BoosterpackResource } from "../../api/api";
import { Boosterpack, NotificationType } from '../../models';
import { notifyWithTimeout } from "./globalappstate";
import { addOrReplacePokemon } from "./pokemon";
import {
    BoosterpackAction,
    BoosterpackActionType,
    BoosterpackThunk,
    PokemonAction,
    PokemonThunk,
    WebSocketThunk
} from "./types";
import {API_ROOT} from "../../api/util";

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

export function openWebSocket(endpoint: string, token: string): WebSocketThunk  {
    return (dispatch) => {
        const webSocket = new WebSocket(`ws://${API_ROOT}/${endpoint}?token=${token}`);
        webSocket.send("click")
    };
}
