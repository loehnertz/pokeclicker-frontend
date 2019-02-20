import { Reducer, combineReducers } from 'redux'

import { State } from './types'
import { userReducer } from './reducers/user'
import { itemsReducer } from './reducers/item'
import { pokemonsReducer } from './reducers/pokemon'

const entitiesReducer = combineReducers({
    user: userReducer,
    items: itemsReducer,
    pokemons: pokemonsReducer
});

const reducer: Reducer<State> = combineReducers({
    entities: entitiesReducer
});

export default reducer;
