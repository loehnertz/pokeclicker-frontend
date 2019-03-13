import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppNotification, Boosterpack, Item, Pokemon } from '../../models';
import { User } from "../../models/user";
import { State } from '../types';


export enum NotificationActionType {
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

export enum AuthenticationActionType {
    TOKEN_RETRIEVED = "AUTHENTICATION_TOKEN_RETRIEVED"
}

export interface AuthenticationAction {
    type: AuthenticationActionType.TOKEN_RETRIEVED;
    token: string;
}

export enum UserActionType {
    SET = 'USER_SET',
}


export interface UserAction {
    type: UserActionType.SET;
    user: User;
}


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

export enum WebSocketActionType {
    OPEN = 'WEBSOCKET_OPEN',
    SEND = 'WEBSOCKET_SEND',
    RECEIVE = 'WEBSOCKET_RECEIVE',
    CLOSED = 'WEBSOCKET_CLOSED'
}


export type BoosterpackAction = {
    type: BoosterpackActionType.ADD_OR_UPDATE;
    boosterpack: Boosterpack;
} | {
    type: BoosterpackActionType.CLEAR_ALL;
};

export type WebSocketAction = {
    type: WebSocketActionType.OPEN;
    name: string;
    endpoint: string;
    token: string;
} | {
    type: WebSocketActionType.SEND;
    name: string;
    message: string;
} | {
    type: WebSocketActionType.RECEIVE;
    name: string;
    message: string;
    event: MessageEvent;
} | {
    type: WebSocketActionType.CLOSED;
    name: string;
    event: CloseEvent;
};

type ThunkActionBase<A extends AnyAction> = ThunkAction<void, State, void, A>;

export type BoosterpackThunk = ThunkActionBase<BoosterpackAction>;
export type ItemThunk = ThunkActionBase<ItemAction>;
export type UserThunk = ThunkActionBase<UserAction>;
export type PokemonThunk = ThunkActionBase<PokemonAction>;
export type WebSocketThunk = ThunkActionBase<WebSocketAction>;
