import { BoosterpackById, BoosterpackCollection, BoosterpackAction, BoosterpackActionType } from '../types';
import { Reducer, combineReducers } from 'redux';

const boosterpackById: Reducer<BoosterpackById, BoosterpackAction> = (collection = {}, action) => {
    switch (action.type) {
        case BoosterpackActionType.ADD_OR_UPDATE:
            return { ...collection, [action.boosterpack.locationAreaId]: action.boosterpack };

        case BoosterpackActionType.CLEAR_ALL:
            return {};
    }
    return { ...collection };
}

const boosterpackIds: Reducer<number[], BoosterpackAction> = (ids = [], action) => {
    switch (action.type) {
        case BoosterpackActionType.ADD_OR_UPDATE:
            if (ids.indexOf(action.boosterpack.locationAreaId) < 0) {
                return ids.concat([action.boosterpack.locationAreaId]);
            }
            break;

        case BoosterpackActionType.CLEAR_ALL:
            return [];

    }
    return ids;
}

export const boosterpacksReducer: Reducer<BoosterpackCollection, BoosterpackAction> = combineReducers({ byId: boosterpackById, allIds: boosterpackIds });
