

// Just a number, but with a nice name.
export type Reference<T> = number & { __reference__?: T };


export enum NotificationType {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success'
}

export interface AppNotification {
    id: number;
    message: string;
    notificationType: NotificationType;
}

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

export interface Boosterpack {
    locationId: number,
    name: string,
    price: number,
    hexColor: string;
}