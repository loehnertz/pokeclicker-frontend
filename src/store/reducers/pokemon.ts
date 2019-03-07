import { PokemonById, PokemonCollection } from '../types';
import { PokemonAction, PokemonActionType, ItemAction } from "../actions/types";
import { Reducer, combineReducers } from 'redux';

const pokemonById: Reducer<PokemonById, PokemonAction> = (collection = {}, action) => {
    switch(action.type){
        case PokemonActionType.ADD_OR_UPDATE:
            return {...collection, [action.pokemon.id]: action.pokemon};

        case PokemonActionType.CLEAR_ALL:
            return {};
    }
    return {...collection};
}

const pokemonIds: Reducer<number[], PokemonAction> = (ids = [], action) => {
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

export const pokemonsReducer: Reducer<PokemonCollection, ItemAction> 
    = combineReducers({byId: pokemonById, allIds: pokemonIds});
