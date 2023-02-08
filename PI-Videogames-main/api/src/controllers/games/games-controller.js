const axios = require('axios');
const { DB_NAME, API_KEY, API_URL } = process.env;

const { connection } = require('../../db.js');

const { Videogames, Genres } = connection(DB_NAME);

const getApiVideoGames = async () => {
	let games = [];
	try {
		//`${API_URL}games?key=${API_KEY}&page=${pagina}???
		const response = await axios.get(
			`https://api.rawg.io/api/games?key=a048125597044c678682ee8606ebb406`
		);
		const resultResponse = response.data.results;

		const pag1 = await axios.get(response.data.next);
		const resultPag1 = pag1.data.results;

		const pag2 = await axios.get(pag1.data.next);
		const resultPag2 = pag2.data.results;

		const pag3 = await axios.get(pag2.data.next);
		const resultPag3 = pag3.data.results;

		const pag4 = await axios.get(pag3.data.next);
		const resultPag4 = pag4.data.results;

		const allPages = [
			...resultResponse,
			...resultPag1,
			...resultPag2,
			...resultPag3,
			...resultPag4,
		];

		// let acc = 1;
		games = allPages.map((el) => {
			return {
				// acc: acc++,
				id: el.id,
				name: el.name,
				image: el.background_image,
				description: el.platforms.filter(
					(el) => el.requirements_en !== null || el.requirements_ru !== null
				),
				released: el.released,
				rating: el.rating,
				platforms: el.platforms.map((p) => p.platform.name),
				genres: el.genres.map((g) => g.name),
			};
		});
		// console.log(games)
	} catch (err) {
		games = {
			error: "Can't Fetch Video Games",
			originalError: err,
		};
	} finally {
		return games;
	}
};

const getDBVideoGames = async () => {
	return await Videogames.findAll({
		include: {
			model: Genres,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
};

const getVideoGames = async () => {
	let games = await getApiVideoGames();
	let dbInfo = await getDBVideoGames();
	let getInfoTotal = [...games, ...dbInfo];
	return getInfoTotal;
};

const filterGames = async (id) => {
	if (isNaN(id)) {
		return await Videogames.findOne({
			where: {
				id: id,
			},
			include: {
				model: Genres,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		});
	} else {
		const response = await axios.get(`${API_URL}games/${id}?key=${API_KEY}`);
		return {
			// acc: acc++,
			id: response.data.id,
			createdInDB: false,
			name: response.data.name,
			image: response.data.background_image,
			description: response.data.description,
			released: response.data.released,
			rating: response.data.rating,
			platforms: response.data.platforms.map((p) => p.platform.name),
			genres: response.data.genres.map((g) => g.name),
		};
	}
};

module.exports = {
	getApiVideoGames,
	getDBVideoGames,
	getVideoGames,
	filterGames,
};
