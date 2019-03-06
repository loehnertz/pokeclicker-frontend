
import { User, Pokemon, Item, Boosterpack } from '../models';
import { Session } from './util';


const API_ROOT = (process.env.REACT_APP_POKECLICKER_API_ROOT as string).replace(/[\/]*$/, '/');

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
        const r = await Session.getInstance().safeFetch(url`users/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<User[]>{
        const r = await Session.getInstance().safeFetch(url`users/`);
        return r.json();
    }
}


export class PokemonResource implements Resource<Pokemon> {
    async fetchById(id: number): Promise<Pokemon> {
        const r = await Session.getInstance().safeFetch(url`pokemon/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<Pokemon[]>{
        const r = await Session.getInstance().safeFetch(url`pokemon/`);
        return r.json();
    }
}


export class ItemResource implements Resource<Item> {
    async fetchById(id: number): Promise<Item> {
        const r = await Session.getInstance().safeFetch(url`items/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<Item[]> {
        const r = await Session.getInstance().safeFetch(url`items/`);
        return r.json();
    }
}


export class BoosterpackResource implements Resource<Boosterpack> {
    async fetchById(id: number): Promise<Boosterpack> {
        const r = await Session.getInstance().safeFetch(url`store/boosterpacks/${id}`);
        return r.json();
    }
    async fetchAll(): Promise<Boosterpack[]> {
        const r = await Session.getInstance().safeFetch(url`store/boosterpacks/`);
        return r.json();
    }
}
