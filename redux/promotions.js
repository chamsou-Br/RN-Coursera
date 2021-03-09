import * as ActionTypes from './ActionRedux';

export const promotions = (state  = { isLoading: true,
                                        errMess: null,
                                        promotions:[
                                            {
                                              id: 0,
                                              name: 'Weekend Grand Buffet',
                                              image: '/assets/images/buffet.png',
                                              label: 'New',
                                              price: '19.99',
                                              featured: true,
                                              description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person'
                                            }
                                          ]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
        return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};
