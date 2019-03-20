import { AppNotification, Boosterpack, Item, Pokemon } from '../models';
import { User } from "../models/user";

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

export interface EvolutionState {
    pokemonOrigin: Pokemon;
    pokemonEvolution: Pokemon;
    evolutionStartTimestamp: number;
}

export interface GlobalAppState {
    authentication: AuthenticationState;
    notifications: Notifications;
    openSockets: string[];
    showcase: Array<[Pokemon, number]>;
    pokemonStoragePage: number;
    evolutionState: EvolutionState | null;
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
        user: User | null;
        items: ItemCollection;
        pokemons: PokemonCollection;
        boosterpacks: BoosterpackCollection;
    };
}

