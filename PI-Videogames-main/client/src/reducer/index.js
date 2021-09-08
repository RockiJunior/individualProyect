import { GET_VIDEOGAMES, FILTER_BY_GENRE, FILTER_CREATED, ORDER_BY_NAME } from '../actions/types';

const initialState = {
    videogames: [],
    allVideogames: []
};

function rootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        case FILTER_BY_GENRE:
            const allVideogames = state.allVideogames;
            const statusFiltered = payload === 'All' ?
                allVideogames :
                allVideogames.filter(el => el.genres.includes(payload))
            return {
                ...state,
                videogames: statusFiltered,
            };
        case FILTER_CREATED:
            const createdFiltered = payload === 'Created' ?
                state.allVideogames.filter(el => el.createdInDB === true) :
                state.allVideogames.filter(el => !el.createdInDB)
            return {
                ...state,
                videogames: createdFiltered
            }
        case ORDER_BY_NAME:
            const sortedArr = payload === 'asc' ? state.allVideogames.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.allVideogames.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    } else {
                        return 0
                    }
                })
            return {
                ...state,
                videogames: sortedArr
            }
        default:
            return state;

    }

};


export default rootReducer;