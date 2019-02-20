
// Just a number, but with a nice name.
type Reference<T> = number & { __reference__?: T };

export interface User {
    id: Reference<User>,
    name: string,
    avatarUri: string | null,
    pokeDollars: number
}

export interface Pokemon {
    id: Reference<Pokemon>;
    pokeNumber: number;
    owner: Reference<User>;
    xp: number;
    aquisitionDateTime: Date;
}

export interface Item {
    id: Reference<Item>;
    itemNumber: number;
    owner: Reference<User>;
    aquisitionDateTime: Date;
}

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

export interface State {
    entities: {
        user: User;
        items: ItemCollection;
        pokemons: PokemonCollection;
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
