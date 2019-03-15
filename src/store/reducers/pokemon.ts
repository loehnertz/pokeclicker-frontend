import { combineReducers, Reducer } from 'redux';
import { ItemAction, PokemonAction, PokemonActionType } from "../actions/types";
import { PokemonById, PokemonCollection } from '../types';

const pokemonById: Reducer<PokemonById, PokemonAction> = (collection = {}, action) => {
    switch(action.type) {
        case PokemonActionType.ADD_OR_UPDATE:
            return {...collection, [action.pokemon.id]: action.pokemon};
        case PokemonActionType.SET_ALL:
            const kvs = action.pokemons.map((pkmn) => ({[pkmn.id]: pkmn}));
            return Object.assign({}, ...kvs);
        case PokemonActionType.CLEAR_ALL:
            return {};
    }
    return {...collection};
};

const pokemonIds: Reducer<number[], PokemonAction> = (ids = [], action) => {
    switch(action.type) {
        case PokemonActionType.ADD_OR_UPDATE:
            if(ids.indexOf(action.pokemon.id) < 0) {
                return ids.concat([action.pokemon.id]);
            }
            break;
        case PokemonActionType.SET_ALL:
            return action.pokemons.map((pkmn) => pkmn.id);
        case PokemonActionType.CLEAR_ALL:
            return [];

    }
    return ids;
};

export const pokemonsReducer: Reducer<PokemonCollection, ItemAction>
    = combineReducers({byId: pokemonById, allIds: pokemonIds});
