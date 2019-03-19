import { combineReducers, Dispatch, Reducer } from 'redux';

import { number } from 'prop-types';
import { State } from '../types';
import { boosterpacksReducer } from './boosterpack';
import globalAppStateReducer from './globalappstate';
import { itemsReducer } from './item';
import { pokemonsReducer } from './pokemon';
import { userReducer } from './user';

const entitiesReducer = combineReducers({
    user: userReducer,
    pokemons: pokemonsReducer,
    items: itemsReducer,
    boosterpacks: boosterpacksReducer,
});

const reducer: Reducer<State> = combineReducers({
    globalAppState: globalAppStateReducer,
    entities: entitiesReducer
});

export default reducer;
