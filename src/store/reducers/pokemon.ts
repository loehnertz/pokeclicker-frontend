import { Pokemon, PokemonById, PokemonCollection, PokemonAction, PokemonActionType } from '../types';
import { Reducer, combineReducers } from 'redux';

const pokemonById: Reducer<PokemonById> = (collection = {}, action: PokemonAction) => {
    switch(action.type){
        case PokemonActionType.ADD_OR_UPDATE:
            return {...collection, [action.pokemon.id]: action.pokemon};

        case PokemonActionType.CLEAR_ALL:
            return {};
    }
    return {...collection};
}

const pokemonIds: Reducer<number[]> = (ids = [], action: PokemonAction) => {
    switch(action.type){
        case PokemonActionType.ADD_OR_UPDATE:
            if(ids.indexOf(action.pokemon.id) < 0) {
                return ids.concat([action.pokemon.id]);
            }
            break;

        case PokemonActionType.CLEAR_ALL:
            return [];

    }
    return ids;
}

export const pokemonsReducer: Reducer<PokemonCollection> = combineReducers({byId: pokemonById, allIds: pokemonIds});
