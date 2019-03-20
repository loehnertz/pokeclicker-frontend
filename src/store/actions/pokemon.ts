import { Pokemon } from '../../models';
import { PokemonAction, PokemonActionType, PokemonThunk } from "./types";


export function addOrReplacePokemon(pokemon: Pokemon): PokemonAction {
    return {
        type: PokemonActionType.ADD_OR_UPDATE,
        pokemon
    };
}

export function deletePokemons(pokemons: Pokemon[]): PokemonAction {
    return {
        type: PokemonActionType.DELETE,
        pokemons
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

export function showcaseAddPokemon(pokemon: Pokemon, packId: number): PokemonAction {
    return {
        type: PokemonActionType.SHOWCASE,
        pokemon,
        packId
    };
}

export function showcaseRemovePokemon(pokemon: Pokemon): PokemonAction {
    return {
        type: PokemonActionType.UNSHOWCASE,
        pokemon
    };
}
