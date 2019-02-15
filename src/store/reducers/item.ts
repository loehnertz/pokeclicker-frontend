import { Item, ItemById, ItemCollection, ItemAction, ItemActionType } from '../types';
import { Reducer, combineReducers } from 'redux';

const itemById: Reducer<ItemById> = (collection = {}, action: ItemAction) => {
    switch(action.type){
        case ItemActionType.ADD_OR_REPLACE:
            return {...collection, [action.item.id]: action.item};

        case ItemActionType.CLEAR:
            return {};
    }
    return {...collection};
}

const itemIds: Reducer<number[]> = (ids = [], action: ItemAction) => {
    switch(action.type){
        case ItemActionType.ADD_OR_REPLACE:
            if(ids.indexOf(action.item.id) < 0) {
                return ids.concat([action.item.id]);
            }
            break;

        case ItemActionType.CLEAR:
            return [];

    }
    return ids;
}

export const itemsReducer: Reducer<ItemCollection> = combineReducers({byId: itemById, allIds: itemIds});
