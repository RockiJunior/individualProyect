const { Router } = require('express');
const router = Router();

const { DB_NAME } = process.env;

const { connection } = require('../../db.js');

const { Genres } = connection(DB_NAME);
const getGenresGames = require('../../controllers/genres/genre-controller.js');

router.get(`/`, async (req, res) => {
	getGenresGames();
	const getGenresDB = await Genres.findAll();
	if (getGenresDB.length > 0) {
		res.status(200).send(getGenresDB);
	} else {
		res.status(404).send('Genre DB is Empty');
	}
});

module.exports = router;
