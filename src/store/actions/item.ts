import { ItemAction, ItemActionType, Item } from '../types';

export function addOrReplaceItem(item: Item): ItemAction {
    return {
        type: ItemActionType.ADD_OR_UPDATE,
        item
    };
}

export function clearItems(): ItemAction {
    return {
        type: ItemActionType.CLEAR_ALL
    };
}
