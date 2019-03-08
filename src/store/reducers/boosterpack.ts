import { BoosterpackById, BoosterpackCollection } from '../types';
import { BoosterpackAction, BoosterpackActionType } from "../actions/types";
import { Reducer, combineReducers, Action } from 'redux';
import { BoosterpackResource } from '../../api/api';
import { addOrReplaceBoosterpack } from '../actions/boosterpack';

const boosterpackById: Reducer<BoosterpackById, BoosterpackAction | {type: 'APP_INITIALIZE'}> = (collection = {}, action) => {
    switch (action.type) {
        case BoosterpackActionType.ADD_OR_UPDATE:
            return { ...collection, [action.boosterpack.locationId]: action.boosterpack };

        case BoosterpackActionType.CLEAR_ALL:
            return {};
    }
    return { ...collection };
}


const boosterpackIds: Reducer<number[], BoosterpackAction> = (ids = [], action) => {
    switch (action.type) {
        case BoosterpackActionType.ADD_OR_UPDATE:
            if (ids.indexOf(action.boosterpack.locationId) < 0) {
                return ids.concat([action.boosterpack.locationId]);
            }
            break;

        case BoosterpackActionType.CLEAR_ALL:
            return [];
    }
    return ids;
}


export const boosterpacksReducer: Reducer<BoosterpackCollection, BoosterpackAction> 
    = combineReducers({ byId: boosterpackById, allIds: boosterpackIds });
