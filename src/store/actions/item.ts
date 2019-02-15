import { ItemAction, ItemActionType, Item } from '../types';

export function addOrReplaceItem(item: Item): ItemAction {
    return {
        type: ItemActionType.ADD_OR_REPLACE,
        item
    };
}

export function clearItem(): ItemAction {
    return {
        type: ItemActionType.CLEAR
    };
}
