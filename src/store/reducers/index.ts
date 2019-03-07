import { combineReducers, Dispatch, Reducer } from 'redux';

import { State } from '../types';
import { pokemonsReducer } from './pokemon';
import { itemsReducer } from './item';
import { userReducer } from './user';
import { boosterpacksReducer } from './boosterpack';
import globalAppStateReducer from './globalappstate';

const entitiesReducer = combineReducers({
	user: userReducer,
	pokemons: pokemonsReducer,
	items: itemsReducer,
	boosterpacks: boosterpacksReducer
});

const reducer: Reducer<State> = combineReducers({
	globalAppState: globalAppStateReducer,
	entities: entitiesReducer
});

export default reducer;
