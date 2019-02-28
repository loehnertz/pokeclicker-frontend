import { combineReducers, Dispatch, Reducer } from 'redux';

import { State } from '../types';
import { pokemonsReducer } from './pokemon';
import { itemsReducer } from './item';
import { userReducer } from './user';

const entitiesReducer = combineReducers({
	user: userReducer,
	pokemons: pokemonsReducer,
	items: itemsReducer
});

const reducer: Reducer<State> = combineReducers({
	entities: entitiesReducer
});

export default reducer;
