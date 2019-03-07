import { Pokemon, User, Item, Boosterpack, AppNotification } from '../../models';
import { State } from '../types';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Action } from 'redux';


export enum NotificationActionType{
    NOTIFY = "NOTIFICATION_NOTIFY",
    WITHDRAW = "NOTIFICATION_WITHDRAW",
}

export type AppNotificationAction = {
    type: NotificationActionType.NOTIFY;
    notification: AppNotification;
} | {
    type: NotificationActionType.WITHDRAW;
    notification: AppNotification;
};

export enum UserActionType {
    SET = 'USER_SET'
}


export type UserAction = {
    type: UserActionType.SET;
    user: User;
};


export enum PokemonActionType {
    ADD_OR_UPDATE = 'POKEMON_ADD_OR_UPDATE',
    CLEAR_ALL = 'POKEMON_CLEAR_ALL'
}


export type PokemonAction = {
    type: PokemonActionType.ADD_OR_UPDATE;
    pokemon: Pokemon;
} | {
    type: PokemonActionType.CLEAR_ALL;
};


export enum ItemActionType {
    ADD_OR_UPDATE = 'ITEM_ADD_OR_UPDATE',
    CLEAR_ALL = 'ITEM_CLEAR_ALL'
}


export type ItemAction = {
    type: ItemActionType.ADD_OR_UPDATE;
    item: Item;
} | {
    type: ItemActionType.CLEAR_ALL;
};


export enum BoosterpackActionType {
    ADD_OR_UPDATE = 'BOOSTERPACK_ADD_OR_UPDATE',
    CLEAR_ALL = 'BOOSTERPACK_CLEAR_ALL',
}


export type BoosterpackAction = {
    type: BoosterpackActionType.ADD_OR_UPDATE;
    boosterpack: Boosterpack;
} | {
    type: BoosterpackActionType.CLEAR_ALL;
};

type ThunkActionBase<A extends AnyAction> = ThunkAction<void, State, void, A>;

export type BoosterpackThunk = ThunkActionBase<BoosterpackAction>;
export type ItemThunk = ThunkActionBase<ItemAction>;
export type UserThunk = ThunkActionBase<UserAction>;
export type PokemonThunk = ThunkActionBase<PokemonAction>;