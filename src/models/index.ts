

// Just a number, but with a nice name.
export type Reference<T> = number & { __reference__?: T };

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
