import { GET_VIDEOGAMES } from '../actions/types';

const initialState = {
    videogames: [],
}

function rootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload
            }
        default:
            return state;
    }

};


export default rootReducer;