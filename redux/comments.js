import * as ActionTypes from './ActionRedux';

export const comments = (state = { errMess: null, comments:[  {
  id: 0,
  dishId: 0,
  rating: 5,
  comment: "Imagine all the eatables, living in conFusion!",
  author: "John Lemon",
  date: new Date().getDate()
}]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.ADD_COMMENTE:
      const newState = [...state.comments , action.payload]
      return{errMess : null , comments : newState}

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};