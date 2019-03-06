import { User } from '../../models';
import { UserAction, UserActionType, PokemonAction } from '../types';
import { Reducer, AnyAction } from 'redux';
import { PokemonResource } from '../../api/api';
import { addOrReplacePokemon } from '../actions/pokemon';

const initialUser: User = {
    id: 0,
    name: "undefined user",
    avatarUri: null,
    pokeDollars: 0,
}


export const userReducer: Reducer<User, UserAction & {asyncDispatch(action: (PokemonAction)): void}> = (user = initialUser, action) => {
    switch(action.type) {
        case UserActionType.SET:
            const resource = new PokemonResource();
            resource.fetchAll().then(pokemons => {
                for(const pokemon of pokemons){
                    action.asyncDispatch(addOrReplacePokemon(pokemon));
                }
            }).catch(e => console.error(e));
            return {...action.user};
    }
    return {...user};
}
