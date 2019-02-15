import { PokemonAction, PokemonActionType, Pokemon } from '../types';

export function addOrReplacePokemon(pokemon: Pokemon): PokemonAction {
    return {
        type: PokemonActionType.ADD_OR_REPLACE,
        pokemon
    };
}

export function clearPokemon(): PokemonAction {
    return {
        type: PokemonActionType.CLEAR
    };
}
