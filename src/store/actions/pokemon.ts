import { Pokemon } from '../../models';
import { PokemonAction, PokemonActionType } from "./types";

export function addOrReplacePokemon(pokemon: Pokemon): PokemonAction {
    return {
        type: PokemonActionType.ADD_OR_UPDATE,
        pokemon
    };
}

export function clearPokemons(): PokemonAction {
    return {
        type: PokemonActionType.CLEAR_ALL
    };
}
