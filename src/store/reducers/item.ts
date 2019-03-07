import { ItemById, ItemCollection } from '../types';
import { ItemAction, ItemActionType } from "../actions/types";
import { Reducer, combineReducers } from 'redux';

const itemById: Reducer<ItemById, ItemAction> = (collection = {}, action) => {
    switch(action.type){
        case ItemActionType.ADD_OR_UPDATE:
            return {...collection, [action.item.id]: action.item};

        case ItemActionType.CLEAR_ALL:
            return {};
    }
    return {...collection};
}

const itemIds: Reducer<number[], ItemAction> = (ids = [], action) => {
    switch(action.type){
        case ItemActionType.ADD_OR_UPDATE:
            if(ids.indexOf(action.item.id) < 0) {
                return ids.concat([action.item.id]);
            }
            break;

        case ItemActionType.CLEAR_ALL:
            return [];

    }
    return ids;
}

export const itemsReducer: Reducer<ItemCollection, ItemAction> 
    = combineReducers({byId: itemById, allIds: itemIds});
