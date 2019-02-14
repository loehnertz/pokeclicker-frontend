import { Pokemon, PokemonById, PokemonCollection, PokemonAction, PokemonActionType } from '../types';
import { Reducer, combineReducers } from 'redux';

const pokemonById: Reducer<PokemonById> = (collection = {}, action: PokemonAction) => {
    switch(action.type){
        case PokemonActionType.ADD_OR_REPLACE:
            return {...collection, [action.pokemon.id]: action.pokemon};

        case PokemonActionType.CLEAR:
            return {};
    }
    return {...collection};
}


const pokemonIds: Reducer<number[]> = (ids = [], action: PokemonAction) => {
    switch(action.type){
        case PokemonActionType.ADD_OR_REPLACE:
            if(ids.indexOf(action.pokemon.id) < 0) {
                return ids.concat([action.pokemon.id]);
            }
            break;

        case PokemonActionType.CLEAR:
            return [];

    }
    return ids;
}

export const pokemonReducer: Reducer<PokemonCollection> = combineReducers({byId: pokemonById, allIds: pokemonIds});





