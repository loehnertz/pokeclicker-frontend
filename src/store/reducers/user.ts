import { User, Maybe } from '../../models';
import { UserAction, UserActionType } from "../actions/types";
import { Reducer } from 'redux';


export const userReducer: Reducer<Maybe<User>, UserAction> = (user = null, action) => {
    switch(action.type) {
        case UserActionType.SET:
            return {...action.user};
    }
    if(user === null){
        return null;
    }
    return {...user};
}
