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

export enum EvolutionStatus {
    PENDING = "PENDING",
    EVOLVING = "EVOLVING",
    NONE = "NONE"
}

export type EvolutionState = {
    status: EvolutionStatus.EVOLVING;
    data: {
        pokemonOrigin: Pokemon;
        pokemonEvolution: Pokemon;
        evolutionStartTimestamp: number;
    }
} | {
    status: EvolutionStatus.PENDING | EvolutionStatus.NONE;
}

export interface GlobalAppState {
    authentication: AuthenticationState;
    notifications: Notifications;
    openSockets: string[];
    showcase: Array<[Pokemon, number]>;
    pokemonStoragePage: number;
    evolutionState: EvolutionState;
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

