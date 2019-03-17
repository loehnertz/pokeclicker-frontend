import { User } from "./user";

// Just a number, but with a nice name.
export type Reference<T> = number & { __reference__?: T };

export enum NotificationType {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success"
}

export interface AppNotification {
    id: number;
    message: string;
    notificationType: NotificationType;
}

export interface Session {
    token: string | null;
}

export interface Pokemon {
    id: Reference<Pokemon>;
    pokeNumber: number;
    owner: {};
    xp: number;
    aquisitionDateTime: {millis: number} | number;
    thinApiInfo?: {
        id: number,
        name: string,
        xp: number,
        sprite: string
    };
}

export interface Item {
    id: Reference<Item>;
    itemNumber: number;
    owner: Reference<User>;
    aquisitionDateTime: Date;
}

export interface Boosterpack {
    locationId: number;
    name: string;
    price: number;
    hexColor: string;
    pokemons?: Array<{
        id: number;
        name: string;
        sprite: string;
        xp: number;
    }>;
}
