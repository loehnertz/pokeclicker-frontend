
import { Boosterpack, Item, Pokemon } from '../models';
import { User, UserAuthenticationResponse, UserLoginRequest, UserRegistrationRequest } from '../models/user';
import { Session, url } from './util';

interface Resource<T> {
    fetchById?(id: number): Promise<T>;
    fetchAll?(): Promise<T[]>;
}

abstract class SessionResource {
    session: Session;

    constructor(token?: string | null) {
        this.session = new Session();
        if(token != null) {
            this.session.setToken(token);
        }
    }
}

export class UserResource extends SessionResource implements Resource<User> {
    async fetchCurrentUser(): Promise<User> {
        const r = await this.session.safeFetch(url`users/`);
        return r.json();
    }

    async fetchById(id: number): Promise<User> {
        const r = await this.session.safeFetch(url`users/${id}`);
        return r.json();
    }

    async fetchAll(): Promise<User[]> {
        const r = await this.session.safeFetch(url`users/`);
        return r.json();
    }

    async register(registerRequest: UserRegistrationRequest): Promise<UserAuthenticationResponse> {
        const r = await this.session.postJson(url`users/register/`, registerRequest);
        return r.json();
    }

    async login(loginRequest: UserLoginRequest): Promise<UserAuthenticationResponse> {
        const r = await this.session.postJson(url`users/login/`, loginRequest);
        return r.json();
    }
}


export interface UserPokemonMergeRequest {
    pokemons: [Pokemon, Pokemon, Pokemon];
}


export class PokemonResource extends SessionResource implements Resource<Pokemon> {
    async fetchById(id: number): Promise<Pokemon> {
        const r = await this.session.safeFetch(url`users/pokemon/${id}`);
        return r.json();
    }

    async fetchAll(): Promise<Pokemon[]> {
        const r = await this.session.safeFetch(url`users/pokemon/`);
        return r.json();
    }

    async merge(mergeRequest: UserPokemonMergeRequest): Promise<Pokemon> {
        const data = {pokemonIds: mergeRequest.pokemons.map((pkmn) => pkmn.id)};
        const r = await this.session.postJson(url`users/pokemon/merge`, data);
        return r.json();
    }
}

export class ItemResource extends SessionResource implements Resource<Item> {
    async fetchById(id: number): Promise<Item> {
        const r = await this.session.safeFetch(url`items/${id}`);
        return r.json();
    }

    async fetchAll(): Promise<Item[]> {
        const r = await this.session.safeFetch(url`items/`);
        return r.json();
    }
}

export class BoosterpackResource extends SessionResource implements Resource<Boosterpack> {
    async fetchById(id: number): Promise<Boosterpack> {
        const r = await this.session.safeFetch(url`store/boosterpacks/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<Boosterpack[]> {
        const r = await this.session.safeFetch(url`store/boosterpacks/`);
        return r.json();
    }

    async buy(id: number): Promise<Pokemon[]> {
        const r = await this.session.safeFetch(url`store/boosterpacks/buy/${id}`);
        return r.json();
    }
}

