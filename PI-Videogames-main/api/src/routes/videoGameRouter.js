const {
    Router
} = require('express');
const axios = require('axios');
const router = Router();
const {
    DB_NAME,
    API_KEY,
    API_URL,
} = process.env;

const {
    connection
} = require('../db.js');

const {
    Videogame,
    Genres
} = connection(DB_NAME);

const getApiVideoGames = async() => {
    let games = [];
    try {
        //`${API_URL}games?key=${API_KEY}&page=${pagina}???
        const response = await axios.get(`${API_URL}games?key=${API_KEY}`);
        const resultResponse = response.data.results;

        const pag1 = await axios.get(response.data.next);
        const resultPag1 = pag1.data.results;

        const pag2 = await axios.get(pag1.data.next);
        const resultPag2 = pag2.data.results;

        const pag3 = await axios.get(pag2.data.next);
        const resultPag3 = pag3.data.results;

        const pag4 = await axios.get(pag3.data.next);
        const resultPag4 = pag4.data.results;

        const allPages = [...resultResponse, ...resultPag1, ...resultPag2, ...resultPag3, ...resultPag4];

        // let acc = 1;
        games = await allPages.map(el => {
            return {
                // acc: acc++,
                id: el.id,
                name: el.name,
                image: el.background_image,
                description: el.platforms.filter(el => el.requirements_en !== null || el.requirements_ru !== null),
                released: el.released,
                rating: el.rating,
                platforms: el.platforms.map(p => p.platform.name),
                genres: el.genres.map(g => g.name)
            }
        });
        // console.log(games)
    } catch (err) {
        games = {
            error: "Can't Fetch Video Games",
            originalError: err
        }
    } finally {
        return games;
    }
};

const getDBVideoGames = async() => {
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
};

const getVideoGames = async() => {
    let games = await getApiVideoGames();
    let dbInfo = await getDBVideoGames();
    let getInfoTotal = [...games, ...dbInfo];
    return getInfoTotal;
};

//RUTAS

router.get(`/`, async(req, res) => {
    let games = await getVideoGames();
    const name = req.query.name;
    if (name) {
        let gamesNames = await games.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        gamesNames.length ?
            res.status(200).send(gamesNames) :
            res.status(404).send("The game you are looking for cannot be Found");
    } else {
        res.status(200).send(games)
    }
});

router.get('/:id', async(req, res) => {
    let games = await getVideoGames();
    const id = req.params.id;
    if (id) {
        let gameId = await games.filter(el => el.id == id);
        gameId.length ?
            res.status(200).send(gameId) :
            res.status(404).send("The id You looking for cannot be Found");
    } else {
        res.status(200).send(games)
    }
});

router.post(`/`, async(req, res) => {
    let {
        id,
        createdInDB,
        name,
        image,
        description,
        released,
        rating,
        platforms,
        genres
    } = req.body;

    const createVideoGame = await Videogame.create({
        id,
        createdInDB,
        name,
        image,
        description,
        released,
        rating,
        platforms,
        genres
    });

    let genreGameDB = await Genres.findAll({
        where: {
            name: genres
        }
    });

    console.log(createVideoGame);

    createVideoGame.addGenres(genreGameDB);
    res.status(200).send("Videogame created successfully")
});

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await Videogame.destroy({ where: { id: id } }, { truncate: false })
    res.status(200).send("Video Game Deleted Successfully");
});


module.exports = router;