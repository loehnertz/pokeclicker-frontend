import {Pokemon, User, Item, Boosterpack } from '../models';

interface ById<TValue> {
    [id: number]: TValue;
}

interface EntityCollection<TValue> {
    byId: ById<TValue>;
    allIds: number[];
}

export type PokemonById = ById<Pokemon>;

export type PokemonCollection = EntityCollection<Pokemon>;

export type ItemById = ById<Item>;

export type ItemCollection = EntityCollection<Item>;

export type BoosterpackById = ById<Boosterpack>;

export type BoosterpackCollection = EntityCollection<Boosterpack>;


export interface State {
    entities: {
        user: User;
        items: ItemCollection;
        pokemons: PokemonCollection;
        boosterpacks: BoosterpackCollection;
    }
}

//
// Actions
//

export enum UserActionType {
    SET = 'USER_SET',
}

export type UserAction
    = { type: UserActionType.SET, user: User };

export enum PokemonActionType {
    ADD_OR_UPDATE = 'POKEMON_ADD_OR_UPDATE',
    CLEAR_ALL = 'POKEMON_CLEAR_ALL',
}

export type PokemonAction
    = { type: PokemonActionType.ADD_OR_UPDATE, pokemon: Pokemon }
    | { type: PokemonActionType.CLEAR_ALL };

export enum ItemActionType {
    ADD_OR_UPDATE = 'ITEM_ADD_OR_UPDATE',
    CLEAR_ALL = 'ITEM_CLEAR_ALL',
}

export type ItemAction
    = { type: ItemActionType.ADD_OR_UPDATE, item: Item }
    | { type: ItemActionType.CLEAR_ALL };


export enum BoosterpackActionType {
    ADD_OR_UPDATE = 'BOOSTERPACK_ADD_OR_UPDATE',
    CLEAR_ALL = 'BOOSTERPACK_CLEAR_ALL',
}

export type BoosterpackAction
    = { type: BoosterpackActionType.ADD_OR_UPDATE, boosterpack: Boosterpack }
    | { type: BoosterpackActionType.CLEAR_ALL };


