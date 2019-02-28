
import { User, Pokemon, Item } from '../models';


const API_ROOT = "/";

interface Resource<T>{

    fetchById?(id: number): Promise<T>;
    fetchAll?(): Promise<T[]>;
}


function url(parts: TemplateStringsArray, ...params: any[]): string{
    const result: any[] = [API_ROOT];
    let i;
    for(i = 0; i < parts.length; i++){
        result.push(parts[i]);
        result.push(params[i]);
    }
    result.push(parts[i]);
    return result.join("");
}


export class UserResource implements Resource<User> {
    async fetchById(id: number): Promise<User> {
        const r = await fetch(url`users/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<User[]>{
        const r = await fetch(url`users/`);
        return r.json();
    }
}


export class PokemonResource implements Resource<Pokemon> {
    async fetchById(id: number): Promise<Pokemon> {
        const r = await fetch(url`pokemon/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<Pokemon[]>{
        const r = await fetch(url`pokemon/`);
        return r.json();
    }
}


export class ItemResource implements Resource<Item> {
    async fetchById(id: number): Promise<Item> {
        const r = await fetch(url`items/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<Item[]> {
        const r = await fetch(url`items/`);
        return r.json();
    }
}
