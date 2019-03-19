import { Reference } from "./index";

export interface User {
    id: Reference<User>;
    name: string;
    avatarUri: string | null;
    pokeDollars: number;
    pokeDollarRate: number;
    lastBalanceTimestamp: number;
}

export interface UserRegistrationRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserLoginRequest {
    username: string;
    password: string;
}

export type UserAuthenticationResponse = {
    ok: true;
    token: string;
    tokenExpiryInSeconds: number;
} | {
    ok: false;
    error: string;
};
