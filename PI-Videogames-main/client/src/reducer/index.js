import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_NAMES,
    GET_GENRES,
    GET_DETAILS,
    FILTER_BY_GENRE,
    POST_VIDEOGAME,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    DELETE_VIDEO_GAME_DB,
} from '../actions/types';

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    details: [],
};

function rootReducer(state = initialState, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            };

        case GET_VIDEOGAME_NAMES:
            return {
                ...state,
                videogames: payload
            };

        case GET_GENRES:
            return {
                ...state,
                genres: payload
            };

        case GET_DETAILS:
            return {
                ...state,
                details: payload
            };

        case POST_VIDEOGAME:
            return {
                ...state
            };

        case DELETE_VIDEO_GAME_DB:
            const eliminated = state.allVideogames.filter(el => el.id !== payload)
            return {
                ...state,
                videogames: eliminated
            };

        case FILTER_BY_GENRE:
            const allVideogames = state.allVideogames;
            const genresFiltered = payload === 'All' ?
                allVideogames :
                allVideogames.filter(el => el.genres.includes(payload));
            return {
                ...state,
                videogames: genresFiltered,
            };

        case FILTER_CREATED:
            const createdFiltered = payload === 'Created' ?
                state.allVideogames.filter(el => el.createdInDB === true) :
                state.allVideogames.filter(el => !el.createdInDB)
            return {
                ...state,
                videogames: createdFiltered
            };

        case ORDER_BY_RATING:
            const ratingFiltered = payload === 'max' ? state.allVideogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return 1
                    }
                    if (b.rating < a.rating) {
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.allVideogames.sort((a, b) => {
                    if (a.rating < b.rating) {
                        return -1
                    }
                    if (b.rating < a.rating) {
                        return 1
                    } else {
                        return 0
                    }
                });
            return {
                ...state,
                videogames: ratingFiltered
            };


        case ORDER_BY_NAME:
            const sortedArr = payload === 'asc' ?
                state.allVideogames.sort((a, b) => {
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
                });
            return {
                ...state,
                videogames: sortedArr
            };

        default:
            return state;

    }

};


export default rootReducer;