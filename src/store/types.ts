import { AppNotification, Boosterpack, Item, Pokemon, User } from '../models';


interface ById<TValue> {
    [id: number]: TValue;
}

interface EntityCollection<TValue> {
    byId: ById<TValue>;
    allIds: number[];
}


export type Notifications = AppNotification[];


export interface GlobalAppState {
    notifications: Notifications;
}

export type PokemonById = ById<Pokemon>;

export type PokemonCollection = EntityCollection<Pokemon>;

export type ItemById = ById<Item>;

export type ItemCollection = EntityCollection<Item>;

export type BoosterpackById = ById<Boosterpack>;

export type BoosterpackCollection = EntityCollection<Boosterpack>;


export interface State {
    globalAppState: GlobalAppState;
    entities: {
        user: User;
        items: ItemCollection;
        pokemons: PokemonCollection;
        boosterpacks: BoosterpackCollection;
    };
}

