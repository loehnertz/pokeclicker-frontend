<<<<<<< HEAD
import { AppNotification, Boosterpack, Item, Maybe, Pokemon } from '../models';
import { User } from "../models/user";
=======
import { AppNotification, Boosterpack, Item, Pokemon, User } from '../models';

>>>>>>> develop

interface ById<TValue> {
    [id: number]: TValue;
}

interface EntityCollection<TValue> {
    byId: ById<TValue>;
    allIds: number[];
}

export interface AuthenticationState {
    token: string | null;
}

export type Notifications = AppNotification[];

export interface GlobalAppState {
    authentication: AuthenticationState;
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
        user: Maybe<User>;
        items: ItemCollection;
        pokemons: PokemonCollection;
        boosterpacks: BoosterpackCollection;
    };
}

