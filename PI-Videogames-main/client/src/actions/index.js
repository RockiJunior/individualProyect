import axios from 'axios';
import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_NAMES,
    GET_GENRES,
    GET_DETAILS,
    FILTER_BY_GENRE,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
} from './types.js';

export function getVideoGames() {
    return async function(dispatch) {
        let response = await axios.get(`http://localhost:3001/videogames`, {

        });
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
        });
    }
};

export function getVideoGameNames(name) {
    return async function(dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAME_NAMES,
                payload: response.data
            })
        } catch (err) {
            return {
                error: "Can't Get Videogames Names",
                originalError: err
            }
        }
    }
};

export function getGenres() {
    return async function(dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/genres`)
            return dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (err) {
            return {
                error: "Can't Fetch Genres",
                originalError: err
            }
        }
    }
};

export function postVideoGame(payload) {
    return async function() {
        try {
            let response = await axios.post(`http://localhost:3001/videogames`, payload)
            return response;
        } catch (err) {
            return {
                error: "Can't Create Videogame",
                originalError: err
            }
        }
    }
};

export function getDetails(id) {
    return async function(dispatch) {
        try {
            let response = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload: response.data
            })
        } catch (err) {
            return {
                error: "Can't Get Details",
                originalError: err
            }
        }
    }
}

export function filterVideoGamesByGenres(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    };
};

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}