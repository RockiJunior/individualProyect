import axios from 'axios';
import { GET_VIDEOGAMES } from './types.js';

export function getVideoGames() {
    return async function(dispatch) {
        let response = await axios.get('http://localhost:3001/videogames', {

        });
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
        });
    }
}