import { combineReducers, Dispatch, Reducer } from 'redux';

import { State } from '../types';
import { pokemonReducer } from './pokemon';
import { itemReducer } from './item';
import { userReducer } from './user';

const entitiesReducer = combineReducers({
	user: userReducer,
	pokemons: pokemonReducer,
	items: itemReducer
});

const reducer: Reducer<State> = combineReducers({
	entities: entitiesReducer
});

export default reducer;

