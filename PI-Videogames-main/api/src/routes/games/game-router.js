const { Router } = require('express');

const router = Router();
const { DB_NAME } = process.env;

const { connection } = require('../../db.js');

const { Videogames, Genres } = connection(DB_NAME);

const {
	getApiVideoGames,
	getDBVideoGames,
	getVideoGames,
	filterGames,
} = require('../../controllers/games/games-controller.js');

router.get(`/`, async (req, res) => {
	let games = await getVideoGames();
	const name = req.query.name;
	if (name) {
		let gamesNames = await games.filter((el) =>
			el.name.toLowerCase().includes(name.toLowerCase())
		);
		gamesNames.length
			? res.status(200).send(gamesNames)
			: res.status(404).send('The game you are looking for cannot be Found');
	} else {
		res.status(200).send(games);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		let games = await filterGames(id);
		res.status(200).send([games]);
	} catch (err) {
		res.status(404).send('The id You looking for cannot be Found');
	}
});

router.post(`/`, async (req, res) => {
	let {
		id,
		createdInDB,
		name,
		image,
		description,
		released,
		rating,
		platforms,
		genres,
	} = req.body;

	if(!image){
		image= 'https://media.rawg.io/media/games/a8b/a8bf6f31bfbdaf7d4b86c1953c62cee0.jpg'
	}

	const createVideoGame = await Videogames.create({
		id,
		createdInDB,
		name,
		image,
		description,
		released,
		rating,
		platforms,
		genres,
	});

	let genreGameDB = await Genres.findAll({
		where: {
			name: genres,
		},
	});

	createVideoGame.addGenres(genreGameDB);
	res.status(200).send('Videogame created successfully');
});

//unos metodos extras :')
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const vG = await Videogames.findOne({
		where: {
			id: id,
		},
	});
	await vG.destroy();
	res.status(200).send('Video Game Deleted Successfully');
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const game = req.body;
	const vG = await Videogames.update(game, {
		where: {
			id: id,
		},
	});
	res.status(200).send('Video Game Updated Successfully!!!');
});

module.exports = router;
