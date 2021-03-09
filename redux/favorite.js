import * as ActionTypes from './ActionRedux';

export const favorites = (state  =  [0,1] , action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        
        case ActionTypes.DELETE_FAVORITE : 
            if (state.some(el => el === action.payload)) {
                const newState = state.filter((fav) => fav !== action.payload)
                state = newState;
                return newState
            }else 
                return state
        default:
          return state;
    }
};