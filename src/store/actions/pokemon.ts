import { PokemonAction, PokemonActionType, Pokemon } from '../types';


function addOrCreatePokemon(pokemon: Pokemon): PokemonAction {
    return {
        type: PokemonActionType.ADD_OR_REPLACE,
        pokemon
    };
}

function clearPokemon(): PokemonAction {
    return {
        type: PokemonActionType.CLEAR
    };
}


