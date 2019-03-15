import { Pokemon } from '../../models';
import { PokemonAction, PokemonActionType } from "./types";

export function addOrReplacePokemon(pokemon: Pokemon): PokemonAction {
    return {
        type: PokemonActionType.ADD_OR_UPDATE,
        pokemon
    };
}

export function setAllPokemons(pokemons: Pokemon[]): PokemonAction {
    return {
        type: PokemonActionType.SET_ALL,
        pokemons
    };
}

export function clearPokemons(): PokemonAction {
    return {
        type: PokemonActionType.CLEAR_ALL
    };
}
