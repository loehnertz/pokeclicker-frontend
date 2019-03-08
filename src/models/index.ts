import { User } from "./user";

// Just a number, but with a nice name.
export type Reference<T> = number & { __reference__?: T };

export type Maybe<T> = T | null;

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

export interface Boosterpack {
    locationAreaId: number;
    name: string;
    price: number;
    hexColor: string;
}
