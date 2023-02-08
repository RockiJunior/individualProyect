const axios = require('axios');
const { DB_NAME, API_KEY, API_URL } = process.env;

const { connection } = require('../../db.js');

const { Genres } = connection(DB_NAME);

const getGenresGames = async () => {
	let allGenres = [];
	try {
		const response = await axios.get(`${API_URL}genres?key=${API_KEY}`);
		let genres = response.data.results.map((el) => el.name);
		console.log(genres)
		genres.forEach((el) => {
			Genres.findOrCreate({
				where: {
					name: el,
				},
			});
		});
	} catch (err) {
		allGenres = {
			error: "Can't Fetch Genres",
			originalError: err,
		};
	} finally {
		return allGenres;
	}
};
module.exports = getGenresGames;
