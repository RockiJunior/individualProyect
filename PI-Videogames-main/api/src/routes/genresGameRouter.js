const { Router } = require('express');
const router = Router();
const axios = require('axios');

const {
    Videogame,
    Genres
} = require('../db.js');

const {
    API_KEY,
    API_URL
} = process.env;

const getGenresGames = async() => {
    let allGenres = [];
    try {
        const res = await axios.get(`${API_URL}genres?key=${API_KEY}`);
        let genres = res.data.results;
        console.log(genres)
        allGenres = await genres.map(el => {
            return {
                genreId: el.id,
                genreName: el.name,
                genreGames: el.games.map(el => el.name),
            }
        })

    } catch (err) {
        allGenres = {
            error: "Can't Fetch Genres",
            originalError: err
        }
    } finally {
        return allGenres
    }

};

router.get(`/`, async(req, res) => {
    const genres = await getGenresGames();
    if (genres) {
        res.status(200).send(genres)
    } else {
        res.status(404).send("Genre is invalid")
    }
});


module.exports = router;