import { ItemAction, ItemActionType, Item } from '../types';


function addOrCreateItem(item: Item): ItemAction {
    return {
        type: ItemActionType.ADD_OR_REPLACE,
        item
    };
}

function clearItem(): ItemAction {
    return {
        type: ItemActionType.CLEAR
    };
}


