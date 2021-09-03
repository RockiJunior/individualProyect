const {
    Router
} = require('express');
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
        const response = await axios.get(`${API_URL}genres?key=${API_KEY}`);
        let genres = response.data.results.map(el => el.name);
        genres.forEach(el => {
            Genres.findOrCreate({
                where: {
                    name: el
                }
            })
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

// RUTAS

router.get(`/`, async(req, res) => {
    getGenresGames();
    const getGenresDB = await Genres.findAll();
    if (getGenresDB) {
        res.status(200).send(getGenresDB)
    } else {
        res.status(404).send("Genre DB is Empty")
    }
});

module.exports = router;
// module.exports = { getGenresGames }