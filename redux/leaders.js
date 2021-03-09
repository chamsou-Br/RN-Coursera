import * as ActionTypes from './ActionRedux';

export const leaders = (state  = { isLoading: true,
                                    errMess: null,
                                    leaders:[{
                                        id: 3,
                                        name: 'Alberto Somayya',
                                        image: '/assets/images/alberto.png',
                                        designation: 'Executive Chef',
                                        abbr: 'EC',
                                        featured: true,
                                        description: 'Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!'
                                      }]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
        return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};